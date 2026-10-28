'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  ShieldCheck,
  User,
  Phone,
  Mail,
  Lock,
  ArrowRight,
  CheckCircle2,
  KeyRound,
  RotateCcw,
  Sparkles,
  AlertCircle
} from 'lucide-react';

export default function CustomerLoginPage() {
  const router = useRouter();
  const [step, setStep] = useState<'email' | 'otp'>('email');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [resendCooldown, setResendCooldown] = useState(0);

  // Send 6-Digit Verification Code via SMTP
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), name: name.trim() })
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to send verification code.');
      }

      setSuccessMsg(data.message || `Code sent to ${email}`);
      setStep('otp');
      setResendCooldown(60);
      const timer = setInterval(() => {
        setResendCooldown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  // Verify OTP & Sign In to MongoDB
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          otp: otp.trim(),
          name: name.trim(),
          phone: phone.trim()
        })
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Invalid verification code.');
      }

      setSuccessMsg('Verification successful! Welcome to Plot 4 Tuty.');
      setTimeout(() => {
        router.push('/');
        router.refresh();
      }, 1200);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 bg-[#F4F5F0]">
      <div className="max-w-md w-full bg-white rounded-3xl border border-[#DADDD5] p-6 sm:p-8 shadow-sm space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center space-x-2">
            <div className="relative h-12 w-12 rounded-full overflow-hidden bg-white border-2 border-[#668F35] mx-auto shadow-xs">
              <Image src="/logo-round.png" alt="Plot 4 Tuty" fill className="object-cover" />
            </div>
          </Link>

          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-[#668F35] bg-[#EBF2DE] px-3 py-0.5 rounded-full border border-[#D5E3C3]">
              Buyer Authentication
            </span>
            <h1 className="text-2xl font-black text-[#1F271B] mt-2">
              Sign In to Plot 4 Tuty<span className="text-[#668F35]">.</span>
            </h1>
            <p className="text-xs text-gray-500 mt-1">
              Verify your email via secure one-time passcode (OTP) to browse, save, and enquire about verified plots in Thoothukudi.
            </p>
          </div>
        </div>

        {/* Error / Success Notifications */}
        {error && (
          <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-500" />
            <span>{error}</span>
          </div>
        )}

        {successMsg && (
          <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-emerald-600" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Step 1: Enter Email & Buyer Info */}
        {step === 'email' ? (
          <form onSubmit={handleSendOtp} className="space-y-4 text-xs sm:text-sm">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Your Email Address <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl focus-within:border-[#668F35] focus-within:bg-white transition-all">
                <Mail className="w-4 h-4 text-gray-400 mr-2 shrink-0" />
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent text-xs sm:text-sm font-medium focus:outline-none"
                />
              </div>
              <p className="text-[10px] text-gray-400 mt-1">
                We will email a 6-digit verification code to this address via our official SMTP service.
              </p>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Your Full Name (Optional)</label>
              <div className="flex items-center px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl focus-within:border-[#668F35] focus-within:bg-white transition-all">
                <User className="w-4 h-4 text-gray-400 mr-2 shrink-0" />
                <input
                  type="text"
                  placeholder="e.g. S. Ramanathan"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-transparent text-xs sm:text-sm font-medium focus:outline-none"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Mobile / WhatsApp Number (Optional)</label>
              <div className="flex items-center px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl focus-within:border-[#668F35] focus-within:bg-white transition-all">
                <Phone className="w-4 h-4 text-gray-400 mr-2 shrink-0" />
                <input
                  type="tel"
                  placeholder="+91 98421 XXXXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-transparent text-xs sm:text-sm font-medium focus:outline-none"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={loading || !email}
              className="w-full py-3.5 px-4 rounded-xl bg-[#668F35] hover:bg-[#53752A] text-white font-black text-xs sm:text-sm shadow-md transition-all flex items-center justify-center space-x-2 disabled:opacity-50 cursor-pointer"
            >
              {loading ? (
                <span>Sending Verification Code...</span>
              ) : (
                <>
                  <span>Send Login OTP</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        ) : (
          /* Step 2: Enter 6-Digit OTP */
          <form onSubmit={handleVerifyOtp} className="space-y-4 text-xs sm:text-sm">
            <div className="text-center bg-[#FAFBF9] p-3.5 rounded-2xl border border-gray-200">
              <span className="text-xs text-gray-500 block">Verification code sent to</span>
              <strong className="text-sm font-black text-[#1F271B]">{email}</strong>
              <button
                type="button"
                onClick={() => setStep('email')}
                className="text-[11px] text-[#668F35] hover:underline font-bold block mx-auto mt-1"
              >
                Change email address
              </button>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1 text-center">
                Enter 6-Digit Passcode
              </label>
              <div className="flex items-center justify-center">
                <input
                  type="text"
                  required
                  maxLength={6}
                  placeholder="&bull; &bull; &bull; &bull; &bull; &bull;"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ''))}
                  className="w-48 text-center tracking-[8px] text-2xl font-black font-mono py-2.5 px-3 bg-gray-50 border-2 border-[#668F35] rounded-xl focus:outline-none focus:bg-white"
                  autoFocus
                />
              </div>
              <p className="text-[10px] text-gray-400 text-center mt-1">
                Valid for 10 minutes &bull; Check your Inbox or Spam folder
              </p>
            </div>

            <button
              type="submit"
              disabled={loading || otp.length < 6}
              className="w-full py-3.5 px-4 rounded-xl bg-[#142016] hover:bg-[#203123] text-[#B7E436] font-black text-xs sm:text-sm shadow-md transition-all flex items-center justify-center space-x-2 disabled:opacity-50 cursor-pointer border border-[#253527]"
            >
              {loading ? <span>Verifying Passcode...</span> : <span>Verify &amp; Sign In</span>}
            </button>

            <div className="flex items-center justify-center pt-2">
              {resendCooldown > 0 ? (
                <span className="text-xs text-gray-400 font-medium">
                  Resend code in {resendCooldown}s
                </span>
              ) : (
                <button
                  type="button"
                  onClick={handleSendOtp}
                  disabled={loading}
                  className="text-xs font-bold text-[#668F35] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Resend Verification Code</span>
                </button>
              )}
            </div>
          </form>
        )}

        {/* Security & Multi-Role Policy */}
        <div className="pt-4 border-t border-gray-200 text-center space-y-2 text-xs text-gray-500">
          <div className="flex items-center justify-center space-x-1 text-[#668F35] font-semibold">
            <ShieldCheck className="w-4 h-4" />
            <span>Secure Passwordless OTP Verification</span>
          </div>
          <p className="text-[11px] leading-relaxed">
            Are you a landowner or promoter?{' '}
            <Link href="/seller/login" className="text-[#1F271B] font-bold hover:underline">
              Access Seller Portal &rarr;
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
