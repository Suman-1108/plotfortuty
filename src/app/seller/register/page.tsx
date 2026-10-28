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
  MapPin,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  FileCheck,
  CreditCard,
  UserCheck,
  HelpCircle
} from 'lucide-react';

export default function SellerRegisterPage() {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState<'starter' | 'growth' | 'pro'>('growth');
  const [businessName, setBusinessName] = useState('');
  const [promoterName, setPromoterName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [officeAddress, setOfficeAddress] = useState('');
  const [reraNumber, setReraNumber] = useState('');
  const [selectedCorridors, setSelectedCorridors] = useState<string[]>([
    'Korampallam',
    'Palayamkottai Road'
  ]);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const availableCorridors = [
    'Korampallam (Collectorate Hub)',
    'Palayamkottai Road (NH 138)',
    'Harbour Bypass & Coastal Corridor',
    'Millerpuram & Central City',
    'Muthiapuram Industrial Belt',
    'Ettayapuram Road High-Growth',
    'Tharuvaikulam Beachside'
  ];

  const toggleCorridor = (corridor: string) => {
    setSelectedCorridors((prev) =>
      prev.includes(corridor)
        ? prev.filter((c) => c !== corridor)
        : [...prev, corridor]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessName || !phone || !email) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        router.push('/seller');
      }, 1500);
    }, 1000);
  };

  return (
    <div className="bg-[#F4F5F0] min-h-screen py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#EBF2DE] text-[#668F35] text-xs font-bold border border-[#D5E3C3]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Thoothukudi Landowner &amp; Promoter Onboarding</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-[#1F271B] tracking-tight">
            Register as a Verified Plot Seller
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 max-w-xl mx-auto leading-relaxed">
            Showcase your residential plots and masterplanned layouts directly to vetted Thoothukudi buyers, NRIs, and investors.
          </p>
        </div>

        {/* Success Alert */}
        {success && (
          <div className="bg-emerald-50 border-2 border-emerald-500 rounded-3xl p-6 text-center space-y-2 animate-in fade-in zoom-in duration-300">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
            <h3 className="text-lg font-black text-emerald-900">Registration Successful!</h3>
            <p className="text-xs text-emerald-700">
              Welcome to Plot 4 Tuty! Redirecting you to your dedicated Seller Portal dashboard...
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Section 1: Subscription Tier Selection */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#DADDD5] shadow-xs space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base sm:text-lg font-black text-[#1F271B]">
                  1. Select Listing Subscription Plan
                </h3>
                <p className="text-xs text-gray-500">
                  Choose a listing capacity tailored to your inventory size. You can upgrade anytime.
                </p>
              </div>
              <Link
                href="/seller/subscription"
                className="text-xs font-bold text-[#668F35] hover:underline hidden sm:block"
              >
                Compare Full Features
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Starter */}
              <div
                onClick={() => setSelectedPlan('starter')}
                className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                  selectedPlan === 'starter'
                    ? 'border-[#668F35] bg-[#F7FAF2] shadow-sm'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-gray-600 uppercase">Starter</span>
                  {selectedPlan === 'starter' && <CheckCircle2 className="w-4 h-4 text-[#668F35]" />}
                </div>
                <div className="text-2xl font-black text-[#1F271B]">₹499<span className="text-xs font-normal text-gray-500">/mo</span></div>
                <p className="text-[11px] text-gray-500 mt-1">For individual landowners</p>
                <ul className="mt-3 space-y-1.5 text-xs text-gray-700">
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#668F35] shrink-0" /> Up to 3 active plot listings
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#668F35] shrink-0" /> Direct WhatsApp buyer inquiries
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#668F35] shrink-0" /> Standard survey photo uploads
                  </li>
                </ul>
              </div>

              {/* Growth (Recommended) */}
              <div
                onClick={() => setSelectedPlan('growth')}
                className={`p-5 rounded-2xl border-2 cursor-pointer transition-all relative ${
                  selectedPlan === 'growth'
                    ? 'border-[#668F35] bg-[#F7FAF2] shadow-sm'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                <span className="absolute -top-2.5 right-4 px-2.5 py-0.5 rounded-full bg-[#B7E436] text-[#142016] text-[10px] font-black uppercase">
                  Most Popular
                </span>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-gray-600 uppercase">Growth Plan</span>
                  {selectedPlan === 'growth' && <CheckCircle2 className="w-4 h-4 text-[#668F35]" />}
                </div>
                <div className="text-2xl font-black text-[#1F271B]">₹1,499<span className="text-xs font-normal text-gray-500">/mo</span></div>
                <p className="text-[11px] text-gray-500 mt-1">For active brokers &amp; developers</p>
                <ul className="mt-3 space-y-1.5 text-xs text-gray-700">
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#668F35] shrink-0" /> Up to 15 active plot listings
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#668F35] shrink-0" /> Verified Promoter badge
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#668F35] shrink-0" /> High-res FMB blueprint upload
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#668F35] shrink-0" /> Priority placement in search
                  </li>
                </ul>
              </div>

              {/* Pro Builder */}
              <div
                onClick={() => setSelectedPlan('pro')}
                className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                  selectedPlan === 'pro'
                    ? 'border-[#668F35] bg-[#F7FAF2] shadow-sm'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-gray-600 uppercase">Pro Builder</span>
                  {selectedPlan === 'pro' && <CheckCircle2 className="w-4 h-4 text-[#668F35]" />}
                </div>
                <div className="text-2xl font-black text-[#1F271B]">₹3,499<span className="text-xs font-normal text-gray-500">/mo</span></div>
                <p className="text-[11px] text-gray-500 mt-1">For township &amp; villa constructors</p>
                <ul className="mt-3 space-y-1.5 text-xs text-gray-700">
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#668F35] shrink-0" /> Unlimited plot listings
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#668F35] shrink-0" /> Dedicated constructor spotlight
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#668F35] shrink-0" /> Turnkey house construction leads
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#668F35] shrink-0" /> Dedicated account manager
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Section 2: Promoter / Company Information */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#DADDD5] shadow-xs space-y-4">
            <h3 className="text-base sm:text-lg font-black text-[#1F271B]">
              2. Promoter &amp; Business Details
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Promoter / Business Name *
                </label>
                <input
                  type="text"
                  required
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="e.g. Sri Balaji Promoters / Individual Landowner"
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:bg-white focus:border-[#668F35]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Contact Person Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={promoterName}
                  onChange={(e) => setPromoterName(e.target.value)}
                  placeholder="e.g. S. Ramanathan"
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:bg-white focus:border-[#668F35]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Mobile / WhatsApp Number *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. +91 98421 55678"
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:bg-white focus:border-[#668F35]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Official Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. contact@sribalajipromoters.com"
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:bg-white focus:border-[#668F35]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Office / Registered Address
                </label>
                <input
                  type="text"
                  value={officeAddress}
                  onChange={(e) => setOfficeAddress(e.target.value)}
                  placeholder="e.g. 142/B, Palayamkottai Road, 3rd Mile, Thoothukudi - 628008"
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:bg-white focus:border-[#668F35]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  TNRERA Registration Number (Optional for registered agents/promoters)
                </label>
                <input
                  type="text"
                  value={reraNumber}
                  onChange={(e) => setReraNumber(e.target.value)}
                  placeholder="e.g. TNRERA/AGT/THY/0182/2023 (or leave blank if individual landowner)"
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:bg-white focus:border-[#668F35]"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Operating Corridors in Thoothukudi */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#DADDD5] shadow-xs space-y-4">
            <div>
              <h3 className="text-base sm:text-lg font-black text-[#1F271B]">
                3. Primary Growth Corridors You Operate In
              </h3>
              <p className="text-xs text-gray-500">
                Select the areas where your plots are located. Buyers can discover you by locality.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {availableCorridors.map((corridor) => {
                const isSelected = selectedCorridors.includes(corridor);
                return (
                  <label
                    key={corridor}
                    onClick={() => toggleCorridor(corridor)}
                    className={`flex items-center space-x-2.5 p-3 rounded-xl border text-xs font-semibold cursor-pointer transition-colors ${
                      isSelected
                        ? 'border-[#668F35] bg-[#F7FAF2] text-[#2F4417]'
                        : 'border-gray-200 hover:border-gray-300 text-gray-700'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      readOnly
                      className="rounded text-[#668F35] focus:ring-[#668F35] w-4 h-4"
                    />
                    <span>{corridor}</span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Section 4: Terms & Submit */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#DADDD5] shadow-xs space-y-4">
            <label className="flex items-start space-x-3 cursor-pointer">
              <input
                type="checkbox"
                required
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="mt-0.5 rounded text-[#668F35] focus:ring-[#668F35] w-4 h-4"
              />
              <span className="text-xs text-gray-600 leading-relaxed">
                I hereby declare that all plot surveys, approvals (DTCP/TNRERA/Patta), dimensions, and road widths provided for listing on <strong>Plot 4 Tuty</strong> are accurate and legally verified. I agree to the platform listing and subscription terms.
              </span>
            </label>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-gray-100">
              <div className="text-xs text-gray-500">
                Already registered?{' '}
                <Link href="/seller/login" className="font-bold text-[#668F35] hover:underline">
                  Sign In to Seller Portal
                </Link>
              </div>

              <button
                type="submit"
                disabled={loading || !agreeTerms}
                className="w-full sm:w-auto px-8 py-3 rounded-full bg-[#B7E436] hover:bg-[#A6D42A] text-[#1C2618] text-xs font-black shadow-md transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <span>Processing Registration...</span>
                ) : (
                  <>
                    <span>Complete Seller Registration</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
