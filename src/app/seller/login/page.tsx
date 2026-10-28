'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  ShieldCheck,
  Building2,
  Phone,
  Mail,
  Lock,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  FileText
} from 'lucide-react';

export default function SellerLoginPage() {
  const router = useRouter();
  const [isRegister, setIsRegister] = useState(false);
  const [businessName, setBusinessName] = useState('Sri Balaji Promoters');
  const [contactName, setContactName] = useState('S. Ramanathan');
  const [phone, setPhone] = useState('+91 98421 55678');
  const [email, setEmail] = useState('contact@sribalajipromoters.com');
  const [reraNumber, setReraNumber] = useState('TNRERA/AGT/THY/0182/2023');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push('/seller');
    }, 1000);
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full bg-white rounded-3xl border border-[#DADDD5] p-6 sm:p-8 shadow-sm space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="relative h-12 w-12 rounded-full overflow-hidden bg-white border-2 border-[#B7E436] mx-auto">
            <Image src="/logo-round.png" alt="Logo" fill className="object-cover" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest text-[#668F35] bg-[#EBF2DE] px-3 py-1 rounded-full border border-[#D5E3C3]">
            Dedicated Landowner &amp; Promoter Portal
          </span>
          <h1 className="text-xl sm:text-2xl font-black text-[#1F271B]">
            {isRegister ? 'Seller Registration' : 'Seller & Promoter Sign In'}
          </h1>
          <p className="text-xs text-gray-500">
            {isRegister
              ? 'Register to list residential plots, verify survey blueprints, and receive direct buyer leads in Thoothukudi.'
              : 'Access your plot inventory, manage buyer inquiries, and review subscription listing limits.'}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex p-1 bg-gray-100 rounded-2xl text-xs font-bold">
          <button
            type="button"
            onClick={() => setIsRegister(false)}
            className={`flex-1 py-2 rounded-xl transition-all cursor-pointer ${
              !isRegister ? 'bg-[#1C2618] text-[#B7E436] shadow-xs' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Seller Login
          </button>
          <button
            type="button"
            onClick={() => setIsRegister(true)}
            className={`flex-1 py-2 rounded-xl transition-all cursor-pointer ${
              isRegister ? 'bg-[#1C2618] text-[#B7E436] shadow-xs' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Register as Seller
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
          {isRegister ? (
            <>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Company / Firm Name *</label>
                <div className="flex items-center px-3 py-2 bg-gray-50 border border-gray-300 rounded-xl focus-within:border-[#668F35] focus-within:bg-white">
                  <Building2 className="w-4 h-4 text-gray-400 mr-2 shrink-0" />
                  <input
                    type="text"
                    required
                    placeholder="Sri Balaji Promoters & Developers"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    className="w-full bg-transparent text-xs sm:text-sm font-semibold focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Contact Person Name *</label>
                <input
                  type="text"
                  required
                  placeholder="S. Ramanathan"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-gray-300 bg-gray-50 font-medium focus:outline-none focus:border-[#668F35]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">TNRERA Registration (Optional)</label>
                <div className="flex items-center px-3 py-2 bg-gray-50 border border-gray-300 rounded-xl focus-within:border-[#668F35] focus-within:bg-white">
                  <FileText className="w-4 h-4 text-gray-400 mr-2 shrink-0" />
                  <input
                    type="text"
                    placeholder="TNRERA/AGT/THY/0182/2023"
                    value={reraNumber}
                    onChange={(e) => setReraNumber(e.target.value)}
                    className="w-full bg-transparent text-xs sm:text-sm font-mono focus:outline-none"
                  />
                </div>
              </div>
            </>
          ) : null}

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Registered Phone / WhatsApp *</label>
            <div className="flex items-center px-3 py-2 bg-gray-50 border border-gray-300 rounded-xl focus-within:border-[#668F35] focus-within:bg-white">
              <Phone className="w-4 h-4 text-gray-400 mr-2 shrink-0" />
              <input
                type="tel"
                required
                placeholder="+91 98421 55678"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-transparent text-xs sm:text-sm font-medium focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Official Email Address *</label>
            <div className="flex items-center px-3 py-2 bg-gray-50 border border-gray-300 rounded-xl focus-within:border-[#668F35] focus-within:bg-white">
              <Mail className="w-4 h-4 text-gray-400 mr-2 shrink-0" />
              <input
                type="email"
                required
                placeholder="contact@sribalajipromoters.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent text-xs sm:text-sm font-medium focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-2xl bg-[#B7E436] hover:bg-[#A6D42A] text-[#1C2618] font-black text-xs sm:text-sm transition-all shadow-xs flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
          >
            <span>{loading ? 'Authenticating Seller...' : isRegister ? 'Register & Choose Plan' : 'Access Seller Dashboard'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-500">
          <span>Are you looking to buy a plot?</span>
          <Link href="/" className="text-[#668F35] font-bold hover:underline">
            Go to Buyer Website &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
