import { v2 as cloudinary } from 'cloudinary';

export interface CloudinarySignedParams {
  timestamp: number;
  signature: string;
  apiKey: string;
  cloudName: string;
  folder: string;
}

export class CloudinaryService {
  private static cloudName = process.env.CLOUDINARY_CLOUD_NAME || '';
  private static apiKey = process.env.CLOUDINARY_API_KEY || '';
  private static apiSecret = process.env.CLOUDINARY_API_SECRET || '';

  static {
    if (this.isConfigured()) {
      cloudinary.config({
        cloud_name: this.cloudName,
        api_key: this.apiKey,
        api_secret: this.apiSecret,
        secure: true
      });
    }
  }

  /**
   * Check if Cloudinary credentials are set
   */
  public static isConfigured(): boolean {
    return Boolean(this.cloudName && this.apiKey && this.apiSecret);
  }

  /**
   * Generate server-side signed parameters for direct secure client upload
   */
  public static getSignedUploadParams(folder = 'plot4tuty/plots'): CloudinarySignedParams | null {
    if (!this.isConfigured()) {
      return null;
    }

    const timestamp = Math.round(new Date().getTime() / 1000);
    const signature = cloudinary.utils.api_sign_request(
      {
        folder,
        timestamp
      },
      this.apiSecret
    );

    return {
      timestamp,
      signature,
      apiKey: this.apiKey,
      cloudName: this.cloudName,
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
        error: 'Cloudinary is not configured. Please supply CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET.'
      };
    }

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

    return urlOrPublicId.replace('/upload/', `/upload/c_fill,w_${width},h_${height},q_auto,f_auto/`);
  }
}
