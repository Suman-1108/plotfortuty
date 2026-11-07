import crypto from 'crypto';
import Razorpay from 'razorpay';

export interface RazorpayOrderResult {
  success: boolean;
  orderId?: string;
  amount?: number; // in paise
  amountInRupees?: number;
  currency?: string;
  keyId?: string;
  isTestMode?: boolean;
  error?: string;
}

export class RazorpayService {
  private static keyId = process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || '';
  private static keySecret = process.env.RAZORPAY_KEY_SECRET || '';
  private static webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET || '';

  /**
   * Check if Razorpay keys are configured
   */
  public static isConfigured(): boolean {
    return Boolean(this.keyId && this.keySecret && this.keyId.trim().length > 0);
  }

  /**
   * Check if running in Razorpay Test Mode
   */
  public static isTestMode(): boolean {
    return this.keyId.startsWith('rzp_test_') || !this.isConfigured();
  }

  /**
   * Get public Razorpay Key ID for frontend Checkout script
   */
  public static getPublicKey(): string {
    return this.keyId || 'rzp_test_placeholder';
  }

  /**
   * Initialize Razorpay client instance
   */
  private static getClient(): Razorpay | null {
    if (!this.isConfigured()) return null;
    return new Razorpay({
      key_id: this.keyId,
      key_secret: this.keySecret
    });
  }

  /**
   * Create an order in Razorpay (amount in Rupees)
   */
  public static async createOrder(params: {
    amountInRupees: number;
    receipt: string;
    notes?: Record<string, string>;
    currency?: string;
  }): Promise<RazorpayOrderResult> {
    const amountInPaise = Math.round(params.amountInRupees * 100);
    const currency = params.currency || 'INR';

    if (!this.isConfigured()) {
      return {
        success: false,
        error:
          'Razorpay payment gateway is not configured. Please set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in environment.'
      };
    }

    try {
      const client = this.getClient();
      if (!client) throw new Error('Razorpay client not initialized');

      const order = await client.orders.create({
        amount: amountInPaise,
        currency,
        receipt: params.receipt,
        notes: params.notes || {}
      });

      return {
        success: true,
        orderId: order.id,
        amount: Number(order.amount),
        amountInRupees: params.amountInRupees,
        currency: order.currency,
        keyId: this.keyId,
        isTestMode: this.isTestMode()
      };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Razorpay order creation failed';
      console.error('Razorpay createOrder error:', msg);
      return {
        success: false,
        error: msg
      };
    }
  }

  /**
   * Verify HMAC-SHA256 payment signature from client checkout
   */
  public static verifyPaymentSignature(
    orderId: string,
    paymentId: string,
    signature: string
  ): boolean {
    if (!this.keySecret) {
      console.warn('RAZORPAY_KEY_SECRET is missing; signature verification cannot succeed.');
      return false;
    }

    try {
      const body = `${orderId}|${paymentId}`;
      const expectedSignature = crypto
        .createHmac('sha256', this.keySecret)
        .update(body)
        .digest('hex');

      return expectedSignature === signature;
    } catch (err) {
      console.error('Signature verification exception:', err);
      return false;
    }
  }

  /**
   * Verify Razorpay Webhook signature
   */
  public static verifyWebhookSignature(rawBody: string, signature: string): boolean {
    if (!this.webhookSecret) {
      console.warn('RAZORPAY_WEBHOOK_SECRET is missing; webhook verification cannot succeed.');
      return false;
    }

    try {
      const expectedSignature = crypto
        .createHmac('sha256', this.webhookSecret)
        .update(rawBody)
        .digest('hex');

      return expectedSignature === signature;
    } catch (err) {
      console.error('Webhook signature verification exception:', err);
      return false;
    }
  }
}
