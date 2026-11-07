import { Resend } from 'resend';
import { sendOtpEmail as sendNodemailerOtp } from '@/lib/mailer';
import nodemailer from 'nodemailer';

export class EmailService {
  private static resendApiKey = process.env.RESEND_API_KEY || '';
  private static resendClient = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
  private static fromEmail = process.env.EMAIL_FROM || process.env.SMTP_FROM || 'Plot 4 Tuty <notifications@plotfortuty.com>';

  /**
   * Check if Resend is configured
   */
  public static isResendConfigured(): boolean {
    return Boolean(this.resendApiKey && this.resendApiKey.startsWith('re_'));
  }

  /**
   * Send general transactional HTML email
   */
  public static async sendEmail(params: {
    to: string;
    subject: string;
    html: string;
    text?: string;
  }): Promise<{ success: boolean; messageId?: string; error?: string }> {
    // 1. Try Resend if configured
    if (this.resendClient && this.isResendConfigured()) {
      try {
        const response = await this.resendClient.emails.send({
          from: this.fromEmail,
          to: params.to,
          subject: params.subject,
          html: params.html,
          text: params.text || ''
        });

        if (response.error) {
          console.warn('Resend API returned error, attempting SMTP fallback:', response.error);
        } else {
          return { success: true, messageId: response.data?.id };
        }
      } catch (err: unknown) {
        console.warn('Resend exception, trying nodemailer fallback:', err);
      }
    }

    // 2. Fallback to existing Nodemailer SMTP configuration
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: parseInt(process.env.SMTP_PORT || '465', 10),
        secure: process.env.SMTP_SECURE !== 'false',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS
        }
      });

      const info = await transporter.sendMail({
        from: process.env.SMTP_FROM || this.fromEmail,
        to: params.to,
        subject: params.subject,
        html: params.html,
        text: params.text
      });

      return { success: true, messageId: info.messageId };
    } catch (smtpErr: unknown) {
      const msg = smtpErr instanceof Error ? smtpErr.message : 'SMTP delivery failed';
      console.error('All email delivery options failed:', msg);
      return { success: false, error: msg };
    }
  }

  /**
   * Send OTP Code
   */
  public static async sendOtp(toEmail: string, otp: string): Promise<boolean> {
    const subject = `${otp} is your Plot 4 Tuty Verification Code`;
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 540px; margin: 0 auto; padding: 24px; border: 1px solid #DADDD5; border-radius: 16px; background-color: #ffffff;">
        <div style="text-align: center; margin-bottom: 24px;">
          <h2 style="color: #1F271B; margin: 0; font-size: 24px; font-weight: 800;">PLOT 4 TUTY</h2>
          <p style="color: #668F35; font-size: 13px; font-weight: 600; text-transform: uppercase; margin-top: 4px;">Thoothukudi Real Estate SaaS</p>
        </div>
        <p style="font-size: 15px; color: #333333; line-height: 1.5;">Hello,</p>
        <p style="font-size: 15px; color: #333333; line-height: 1.5;">Your one-time verification passcode for logging into Plot 4 Tuty is:</p>
        <div style="text-align: center; margin: 28px 0;">
          <span style="font-size: 36px; font-weight: 900; letter-spacing: 8px; color: #1F271B; background: #EBF2DE; padding: 12px 28px; border-radius: 12px; border: 1px dashed #668F35; display: inline-block;">
            ${otp}
          </span>
        </div>
        <p style="font-size: 13px; color: #777777; line-height: 1.4;">This code is valid for 10 minutes. For security, never share this code with anyone.</p>
        <hr style="border: 0; border-top: 1px solid #EEEEEE; margin: 24px 0;" />
        <p style="font-size: 11px; color: #999999; text-align: center;">Thoothukudi District, Tamil Nadu • Plot 4 Tuty Platform</p>
      </div>
    `;

    const res = await this.sendEmail({ to: toEmail, subject, html, text: `Your code is ${otp}` });
    return res.success;
  }

  /**
   * Send New Lead Alert to Developer
   */
  public static async sendNewLeadNotification(params: {
    toEmail: string;
    developerName: string;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    projectName: string;
    plotNumber?: string;
    message?: string;
  }): Promise<boolean> {
    const subject = `🏡 New Buyer Lead: ${params.customerName} for ${params.projectName}`;
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #DADDD5; border-radius: 16px; background-color: #ffffff;">
        <h3 style="color: #1F271B; font-size: 20px; font-weight: bold;">New Buyer Enquiry Received!</h3>
        <p style="font-size: 14px; color: #555555;">Hi ${params.developerName}, a buyer has submitted an enquiry on your project listing.</p>
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0; font-size: 14px;">
          <tr style="border-bottom: 1px solid #EEEEEE;"><td style="padding: 8px; font-weight: bold; width: 140px;">Project:</td><td style="padding: 8px;">${params.projectName}</td></tr>
          <tr style="border-bottom: 1px solid #EEEEEE;"><td style="padding: 8px; font-weight: bold;">Plot:</td><td style="padding: 8px;">${params.plotNumber || 'General Project'}</td></tr>
          <tr style="border-bottom: 1px solid #EEEEEE;"><td style="padding: 8px; font-weight: bold;">Buyer Name:</td><td style="padding: 8px;">${params.customerName}</td></tr>
          <tr style="border-bottom: 1px solid #EEEEEE;"><td style="padding: 8px; font-weight: bold;">Phone:</td><td style="padding: 8px;"><a href="tel:${params.customerPhone}">${params.customerPhone}</a></td></tr>
          <tr style="border-bottom: 1px solid #EEEEEE;"><td style="padding: 8px; font-weight: bold;">Email:</td><td style="padding: 8px;">${params.customerEmail}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold;">Message:</td><td style="padding: 8px;">${params.message || 'Interested in property inspection and pricing.'}</td></tr>
        </table>
        <div style="text-align: center; margin-top: 24px;">
          <a href="https://plotfortuty.com/seller/enquiries" style="background-color: #B7E436; color: #1C2618; font-weight: bold; padding: 12px 24px; border-radius: 8px; text-decoration: none; display: inline-block;">
            Open Developer CRM Portal →
          </a>
        </div>
      </div>
    `;

    const res = await this.sendEmail({ to: params.toEmail, subject, html });
    return res.success;
  }
}
