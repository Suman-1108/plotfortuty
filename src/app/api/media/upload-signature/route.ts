import { NextRequest, NextResponse } from 'next/server';
import { CloudinaryService } from '@/lib/services/cloudinaryService';
import { getSessionUser } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const sessionUser = getSessionUser(req);
  if (!sessionUser) {
    return NextResponse.json({ success: false, error: 'Authentication required' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const folder = searchParams.get('folder') || 'plot4tuty/plots';

  const signedParams = CloudinaryService.getSignedUploadParams(folder);

  if (!signedParams) {
    return NextResponse.json({
      success: false,
      isConfigured: false,
      message: 'Cloudinary environment variables not configured. Server will use local asset fallback.'
    });
  }

  return NextResponse.json({
    success: true,
    isConfigured: true,
    ...signedParams
  });
}

export async function POST(req: NextRequest) {
  try {
    const sessionUser = getSessionUser(req);
    if (!sessionUser) {
      return NextResponse.json({ success: false, error: 'Authentication required' }, { status: 401 });
    }

    const body = await req.json();
    const { imageBase64, folder } = body;

    if (!imageBase64) {
      return NextResponse.json({ success: false, error: 'No image data provided' }, { status: 400 });
    }

    const uploadRes = await CloudinaryService.uploadImage(imageBase64, folder || 'plot4tuty/properties');
    return NextResponse.json(uploadRes);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Media upload failed';
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
