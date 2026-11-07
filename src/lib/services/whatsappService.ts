/**
 * WhatsApp Meta Cloud API Service with Direct Click-to-Chat Fallback
 */

export interface WhatsAppSendResult {
  success: boolean;
  mode: 'cloud_api' | 'click_to_chat_fallback';
  messageId?: string;
  fallbackUrl?: string;
  error?: string;
}

export class WhatsAppService {
  private static token = process.env.WHATSAPP_TOKEN || '';
  private static phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID || '';
  private static defaultContactNumber = process.env.WHATSAPP_DEFAULT_PHONE || '919443152633'; // Official Plot 4 Tuty desk

  /**
   * Check if Cloud API is fully configured
   */
  public static isCloudApiConfigured(): boolean {
    return Boolean(this.token && this.phoneNumberId && this.token.length > 10);
  }

  /**
   * Format phone number to international E.164 without '+'
   */
  public static cleanPhoneNumber(phone: string): string {
    let clean = phone.replace(/\D/g, '');
    if (clean.length === 10) {
      clean = '91' + clean; // Default India prefix
    }
    return clean;
  }

  /**
   * Generate direct WhatsApp Click-to-Chat URL
   */
  public static getClickToChatUrl(phone: string, text: string): string {
    const cleanNumber = this.cleanPhoneNumber(phone || this.defaultContactNumber);
    return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(text)}`;
  }

  /**
   * Send WhatsApp text message via Meta Cloud API or return click-to-chat fallback
   */
  public static async sendMessage(toPhone: string, text: string): Promise<WhatsAppSendResult> {
    const recipient = this.cleanPhoneNumber(toPhone);
    const fallbackUrl = this.getClickToChatUrl(recipient, text);

    if (!this.isCloudApiConfigured()) {
      return {
        success: true,
        mode: 'click_to_chat_fallback',
        fallbackUrl
      };
    }

    try {
      const url = `https://graph.facebook.com/v21.0/${this.phoneNumberId}/messages`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          recipient_type: 'individual',
          to: recipient,
          type: 'text',
          text: { preview_url: true, body: text }
        })
      });

      const data = await response.json();

      if (!response.ok) {
        console.warn('WhatsApp Cloud API call returned non-200:', data);
        return {
          success: false,
          mode: 'click_to_chat_fallback',
          error: data?.error?.message || 'Meta API returned error',
          fallbackUrl
        };
      }

      return {
        success: true,
        mode: 'cloud_api',
        messageId: data.messages?.[0]?.id
      };
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : 'Unknown network error';
      console.error('WhatsApp service exception:', errMsg);
      return {
        success: false,
        mode: 'click_to_chat_fallback',
        error: errMsg,
        fallbackUrl
      };
    }
  }

  /**
   * Send new lead alert notification to promoter/developer
   */
  public static async sendNewLeadAlert(params: {
    developerPhone: string;
    customerName: string;
    customerPhone: string;
    projectName: string;
    plotNumber?: string;
    message?: string;
  }): Promise<WhatsAppSendResult> {
    const text = `🏡 *New Lead Alert - Plot 4 Tuty SaaS*
Project: ${params.projectName}
Plot: ${params.plotNumber || 'General Project Enquiry'}
Buyer: ${params.customerName}
Phone: ${params.customerPhone}
Note: ${params.message || 'Customer requested consultation / site visit.'}

Review details in your Developer Portal: https://plotfortuty.com/seller/enquiries`;

    return this.sendMessage(params.developerPhone, text);
  }

  /**
   * Send site visit confirmation to customer
   */
  public static async sendSiteVisitConfirmation(params: {
    customerPhone: string;
    customerName: string;
    projectName: string;
    siteVisitDate: string;
    developerPhone: string;
  }): Promise<WhatsAppSendResult> {
    const text = `Dear ${params.customerName},
Your site visit for *${params.projectName}* (Thoothukudi) has been scheduled on *${params.siteVisitDate}*.

Our property executive will coordinate with you.
For immediate assistance, contact our project desk at +${params.developerPhone}.

Thank you for choosing Plot 4 Tuty!`;

    return this.sendMessage(params.customerPhone, text);
  }
}
