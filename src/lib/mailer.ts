import nodemailer from 'nodemailer';

// Clean Google App Password by removing any spaces
const rawPass = process.env.SMTP_PASS || '';
const cleanPass = rawPass.replace(/\s+/g, '');
const smtpUser = process.env.SMTP_USER || '';

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: Number(process.env.SMTP_PORT) || 465,
  secure: true, // true for 465, false for 587
  auth: {
    user: smtpUser,
    pass: cleanPass
  },
  tls: {
    rejectUnauthorized: false
  }
});

/**
 * Send 6-digit OTP Email for Buyer / User Authentication
 */
export async function sendOtpEmail({
  to,
  otp,
  name
}: {
  to: string;
  otp: string;
  name?: string;
}): Promise<{ success: boolean; messageId?: string; error?: string }> {
  const greeting = name ? `Hello ${name},` : 'Hello,';

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Plot 4 Tuty Verification Code</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #F4F5F0; margin: 0; padding: 24px; color: #1F271B; }
          .container { max-width: 540px; margin: 0 auto; background: #ffffff; border-radius: 16px; border: 1px solid #DADDD5; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
          .header { background: #142016; padding: 28px; text-align: center; }
          .logo-text { color: #ffffff; font-size: 20px; font-weight: 900; letter-spacing: -0.5px; margin: 0; }
          .logo-highlight { color: #B7E436; }
          .tagline { color: #A9BA99; font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; margin-top: 4px; font-weight: 700; }
          .content { padding: 32px 28px; }
          .otp-card { background: #F8FAF6; border: 2px dashed #B7E436; border-radius: 12px; padding: 20px; text-align: center; margin: 24px 0; }
          .otp-code { font-size: 34px; font-weight: 900; letter-spacing: 8px; color: #142016; font-family: monospace; }
          .timer-text { font-size: 12px; color: #666A5D; margin-top: 8px; font-weight: 600; }
          .footer { background: #FAFBF9; padding: 20px; text-align: center; font-size: 11px; color: #8F9489; border-top: 1px solid #EAECE6; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 class="logo-text">PLOT 4 TUTY<span class="logo-highlight">.</span></h1>
            <div class="tagline">Residential Land &amp; Plot Marketplace &bull; Thoothukudi</div>
          </div>
          <div class="content">
            <h2 style="font-size: 18px; font-weight: 800; margin-top: 0;">Buyer Account Login Verification</h2>
            <p style="font-size: 14px; line-height: 1.6; color: #444;">${greeting}</p>
            <p style="font-size: 14px; line-height: 1.6; color: #444;">Use the following one-time password (OTP) to securely sign in to your <strong>Plot 4 Tuty</strong> buyer account:</p>
            
            <div class="otp-card">
              <div class="otp-code">${otp}</div>
              <div class="timer-text">⏳ Valid for 10 minutes &bull; Do not share with anyone</div>
            </div>

            <p style="font-size: 13px; line-height: 1.6; color: #666A5D;">
              Once verified, you can explore DTCP-approved plots in Thoothukudi, save favorite parcels, compare price trends, and connect directly with verified landowners &amp; promoters.
            </p>
          </div>
          <div class="footer">
            &copy; ${new Date().getFullYear()} Plot 4 Tuty &bull; Palayamkottai Road, Thoothukudi - 628008, Tamil Nadu.<br>
            If you did not request this login code, please ignore this email.
          </div>
        </div>
      </body>
    </html>
  `;

  try {
    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM || `"Plot 4 Tuty" <${smtpUser}>`,
      to,
      subject: `Plot 4 Tuty — Your Login Code is ${otp}`,
      text: `Your Plot 4 Tuty verification OTP is: ${otp}. It is valid for 10 minutes.`,
      html: htmlContent
    });

    console.log(`[SMTP] OTP email sent successfully to ${to}. MessageId: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error(`[SMTP Error] Failed to send email to ${to}:`, error);
    return { success: false, error: (error as Error).message };
  }
}

/**
 * Send notification email when a buyer books an enquiry or site visit
 */
export async function sendEnquiryAlertEmail({
  name,
  phone,
  email,
  plotTitle,
  message
}: {
  name: string;
  phone: string;
  email: string;
  plotTitle?: string;
  message: string;
}): Promise<boolean> {
  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM || `"Plot 4 Tuty Alerts" <${smtpUser}>`,
      to: smtpUser, // Platform Administrator receives lead
      subject: `🚨 New Buyer Lead: ${name} (${phone}) for ${plotTitle || 'Thoothukudi Plot'}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; max-width: 500px; border: 1px solid #ccc; border-radius: 8px;">
          <h2 style="color: #668F35;">New Buyer Enquiry Received</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Phone:</strong> <a href="tel:${phone}">${phone}</a> | <a href="https://wa.me/${phone.replace(/[^0-9]/g, '')}">WhatsApp</a></p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Property:</strong> ${plotTitle || 'General Thoothukudi Plot Enquiry'}</p>
          <p><strong>Message / Requirement:</strong><br>${message}</p>
          <hr/>
          <p style="font-size: 11px; color: #888;">Plot 4 Tuty Marketplace Lead Notification</p>
        </div>
      `
    });
    return true;
  } catch (err) {
    console.error('[SMTP Alert Error]', err);
    return false;
  }
}
