import mongoose from 'mongoose';

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
  mode: 'atlas' | 'local' | 'disconnected';
  activeUri: string;
}

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

const cached: MongooseCache = global.mongooseCache || {
  conn: null,
  promise: null,
  mode: 'disconnected',
  activeUri: ''
};

if (!global.mongooseCache) {
  global.mongooseCache = cached;
}

/**
 * Determines target URI based on environment mode switch:
 * - 'atlas' -> Cloud MongoDB Atlas cluster (duuumk7.mongodb.net)
 * - 'local' -> Local instance (mongodb://localhost:27017/tuty)
 */
export function getTargetMongoUri(): { uri: string; mode: 'atlas' | 'local' } {
  const mode = (process.env.MONGODB_MODE || 'atlas').toLowerCase().trim() as 'atlas' | 'local';
  const atlasUri = process.env.MONGODB_URI || '';
  const localUri = process.env.MONGODB_URI_LOCAL || 'mongodb://localhost:27017/tuty';

  if (mode === 'local') {
    return { uri: localUri, mode: 'local' };
  }

  return { uri: atlasUri, mode: 'atlas' };
}

export async function connectToDatabase(): Promise<{
  mongoose: typeof mongoose;
  mode: 'atlas' | 'local';
  connected: boolean;
}> {
  if (cached.conn && mongoose.connection.readyState === 1) {
    return {
      mongoose: cached.conn,
      mode: cached.mode === 'disconnected' ? 'atlas' : cached.mode,
      connected: true
    };
  }

  const { uri, mode } = getTargetMongoUri();

  if (!cached.promise) {
    const opts: mongoose.ConnectOptions = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 8000,
      connectTimeoutMS: 10000,
    };

    cached.promise = mongoose
      .connect(uri, opts)
      .then((m) => {
        cached.mode = mode;
        cached.activeUri = uri;
        console.log(`[MongoDB] Connected successfully via [${mode.toUpperCase()} MODE]: ${mode === 'atlas' ? 'Cloud Atlas' : 'Local MongoDB'}`);
        return m;
      })
      .catch(async (primaryError) => {
        console.warn(`[MongoDB] Failed to connect to primary [${mode.toUpperCase()}]:`, primaryError.message);
        
        // Automatic fallback switch if primary fails
        const fallbackMode = mode === 'atlas' ? 'local' : 'atlas';
        const fallbackUri =
          fallbackMode === 'local'
            ? process.env.MONGODB_URI_LOCAL || 'mongodb://localhost:27017/tuty'
            : process.env.MONGODB_URI ||
              'mongodb+srv://hellosuman29_db_user:leaPQLr3J4igwkdl@tuty.duuumk7.mongodb.net/tuty?retryWrites=true&w=majority';

        console.log(`[MongoDB] Attempting fallback to [${fallbackMode.toUpperCase()} MODE]...`);
        try {
          const fallbackM = await mongoose.connect(fallbackUri, opts);
          cached.mode = fallbackMode;
          cached.activeUri = fallbackUri;
          console.log(`[MongoDB] Fallback connection established to [${fallbackMode.toUpperCase()}].`);
          return fallbackM;
        } catch (fallbackError) {
          console.error(`[MongoDB] Both primary and fallback connections failed. Running in graceful offline mode.`, (fallbackError as Error).message);
          cached.promise = null;
          throw primaryError;
        }
      });
  }

  try {
    cached.conn = await cached.promise;
    return {
      mongoose: cached.conn,
      mode: cached.mode === 'disconnected' ? mode : cached.mode,
      connected: true
    };
  } catch (err) {
    cached.promise = null;
    return {
      mongoose,
      mode,
      connected: false
    };
  }
}

export function getConnectionStatus() {
  return {
    state: mongoose.connection.readyState, // 0: disconnected, 1: connected, 2: connecting, 3: disconnecting
    mode: cached.mode,
    activeUri: cached.activeUri ? cached.activeUri.replace(/:[^:]*@/, ':****@') : 'none'
  };
}
