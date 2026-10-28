import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { Otp } from '@/lib/models/Otp';
import { User } from '@/lib/models/User';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, otp, name, phone } = body;

    if (!email || !otp) {
      return NextResponse.json(
        { success: false, error: 'Email and verification code are required.' },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();
    const cleanOtp = otp.toString().trim();

    await connectToDatabase();

    // Find the latest valid OTP in MongoDB
    const record = await Otp.findOne({
      email: normalizedEmail,
      otp: cleanOtp,
      expiresAt: { $gt: new Date() }
    });

    if (!record) {
      return NextResponse.json(
        { success: false, error: 'Invalid or expired verification code. Please request a new code.' },
        { status: 400 }
      );
    }

    // OTP is valid! Delete used OTP
    await Otp.deleteMany({ email: normalizedEmail });

    // Find or create User in MongoDB
    let user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      user = await User.create({
        email: normalizedEmail,
        name: name?.trim() || normalizedEmail.split('@')[0],
        phone: phone?.trim() || '',
        role: 'buyer',
        isVerified: true
      });
    } else {
      user.isVerified = true;
      if (name && name.trim()) user.name = name.trim();
      if (phone && phone.trim()) user.phone = phone.trim();
      await user.save();
    }

    const userData = {
      id: user._id.toString(),
      email: user.email,
      name: user.name,
      phone: user.phone || '',
      role: user.role,
      isVerified: user.isVerified
    };

    // Set secure HTTP-only cookie for session
    const response = NextResponse.json({
      success: true,
      message: 'Successfully verified and signed in to Plot 4 Tuty.',
      user: userData
    });

    response.cookies.set('plot4tuty_buyer_session', JSON.stringify(userData), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 30 * 24 * 60 * 60 // 30 days
    });

    return response;
  } catch (error) {
    console.error('Error in verify-otp API:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to verify OTP. Please try again.' },
      { status: 500 }
    );
  }
}
