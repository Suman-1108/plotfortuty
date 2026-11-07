import { v2 as cloudinary } from 'cloudinary';

export interface CloudinarySignedParams {
  timestamp: number;
  signature: string;
  apiKey: string;
  cloudName: string;
  folder: string;
}

export class CloudinaryService {
  private static getCredentials() {
    let cloudName =
      process.env.CLOUDINARY_CLOUD_NAME ||
      process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ||
      '';
    let apiKey = process.env.CLOUDINARY_API_KEY || '';
    let apiSecret = process.env.CLOUDINARY_API_SECRET || '';

    if ((!cloudName || !apiKey || !apiSecret) && process.env.CLOUDINARY_URL) {
      const match = process.env.CLOUDINARY_URL.match(/^cloudinary:\/\/([^:]+):([^@]+)@(.+)$/);
      if (match) {
        apiKey = apiKey || match[1];
        apiSecret = apiSecret || match[2];
        cloudName = cloudName || match[3];
      }
    }

    return { cloudName, apiKey, apiSecret };
  }

  private static ensureConfig() {
    const { cloudName, apiKey, apiSecret } = this.getCredentials();
    if (cloudName && apiKey && apiSecret) {
      cloudinary.config({
        cloud_name: cloudName,
        api_key: apiKey,
        api_secret: apiSecret,
        secure: true
      });
    }
  }

  /**
   * Check if Cloudinary credentials are set
   */
  public static isConfigured(): boolean {
    const { cloudName, apiKey, apiSecret } = this.getCredentials();
    return Boolean(cloudName && apiKey && apiSecret);
  }

  /**
   * Generate server-side signed parameters for direct secure client upload
   */
  public static getSignedUploadParams(folder = 'plot4tuty/plots'): CloudinarySignedParams | null {
    if (!this.isConfigured()) {
      return null;
    }

    const { cloudName, apiKey, apiSecret } = this.getCredentials();
    this.ensureConfig();

    const timestamp = Math.round(new Date().getTime() / 1000);
    const signature = cloudinary.utils.api_sign_request(
      {
        folder,
        timestamp
      },
      apiSecret
    );

    return {
      timestamp,
      signature,
      apiKey,
      cloudName,
      folder
    };
  }

  /**
   * Upload base64 or file buffer directly from server
   */
  public static async uploadImage(
    fileDataUri: string,
    folder = 'plot4tuty/properties'
  ): Promise<{ success: boolean; url?: string; publicId?: string; error?: string }> {
    if (!this.isConfigured()) {
      return {
        success: false,
        error:
          'Cloudinary is not configured. Please supply CLOUDINARY_URL or CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET.'
      };
    }

    this.ensureConfig();

    try {
      const result = await cloudinary.uploader.upload(fileDataUri, {
        folder,
        resource_type: 'image',
        transformation: [{ quality: 'auto', fetch_format: 'auto' }]
      });

      return {
        success: true,
        url: result.secure_url,
        publicId: result.public_id
      };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Cloudinary upload failed';
      console.error('Cloudinary upload error:', msg);
      return {
        success: false,
        error: msg
      };
    }
  }

  /**
   * Delete image by public ID
   */
  public static async deleteImage(publicId: string): Promise<boolean> {
    if (!this.isConfigured()) return false;
    this.ensureConfig();
    try {
      const res = await cloudinary.uploader.destroy(publicId);
      return res.result === 'ok';
    } catch (err) {
      console.error('Cloudinary delete error:', err);
      return false;
    }
  }

  /**
   * Return responsive optimized image URL
   */
  public static getOptimizedUrl(urlOrPublicId: string, width = 800, height = 600): string {
    if (!urlOrPublicId) return '/images/product.png';
    if (!urlOrPublicId.includes('cloudinary.com')) return urlOrPublicId;

    return urlOrPublicId.replace(
      '/upload/',
      `/upload/c_fill,w_${width},h_${height},q_auto,f_auto/`
    );
  }
}
