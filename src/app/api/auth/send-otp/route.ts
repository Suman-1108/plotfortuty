import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { Otp } from '@/lib/models/Otp';
import { sendOtpEmail } from '@/lib/mailer';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, name } = body;

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Generate 6-digit numeric OTP
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Connect to MongoDB
    await connectToDatabase();

    // Upsert or store OTP in MongoDB
    await Otp.deleteMany({ email: normalizedEmail });
    await Otp.create({
      email: normalizedEmail,
      otp: otpCode,
      expiresAt
    });

    // Send email via SMTP (hellosuman29@gmail.com)
    const mailResult = await sendOtpEmail({
      to: normalizedEmail,
      otp: otpCode,
      name
    });

    if (!mailResult.success) {
      console.warn(`[OTP Warning] Email delivery had an issue: ${mailResult.error}. Code generated for fallback.`);
    }

    return NextResponse.json({
      success: true,
      message: `A 6-digit verification code has been sent to ${normalizedEmail}.`,
      // For development resilience if offline/SMTP sandbox, show status
      delivery: mailResult.success ? 'sent' : 'simulated'
    });
  } catch (error) {
    console.error('Error in send-otp API:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to generate verification code. Please try again.' },
      { status: 500 }
    );
  }
}
