'use client';

import { useState } from 'react';
import {
  CreditCard,
  Check,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Download,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export default function SellerSubscriptionPage() {
  const [currentPlan, setCurrentPlan] = useState<'Starter' | 'Growth' | 'Developer Pro'>('Growth');
  const [selectedPlan, setSelectedPlan] = useState<'Starter' | 'Growth' | 'Developer Pro'>('Growth');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const plans = [
    {
      name: 'Starter',
      price: '₹499',
      period: '/ month',
      subtitle: 'Suitable for individual landowners selling family or individual plots.',
      features: [
        'Up to 3 active plot listings',
        'Basic photo gallery and property details',
        'Standard search visibility',
        'Enquiry notifications via SMS/Email',
        'Direct buyer WhatsApp messaging',
        'Basic clear patta badge'
      ],
      quota: '3 Listings',
      recommended: false,
    },
    {
      name: 'Growth',
      price: '₹1,499',
      period: '/ month',
      subtitle: 'Suitable for local real-estate agents and small land promoters.',
      features: [
        'Up to 15 active plot listings',
        'Featured listing placement credits (3x)',
        'Full lead tracking & analytics dashboard',
        'Survey blueprint & document uploads',
        'Verified Seller Profile badge',
        'Instant enquiry alerts & priority buyer routing'
      ],
      quota: '15 Listings',
      recommended: true,
    },
    {
      name: 'Developer Pro',
      price: '₹3,999',
      period: '/ month',
      subtitle: 'Suitable for gated township promoters, developers, and colonizers.',
      features: [
        'Up to 50 active plot listings',
        'Project-level masterplan pages & blueprints',
        'Interactive layout availability maps',
        'Enhanced homepage visibility & top search ranking',
        'Multi-user team logins & dedicated account manager',
        'Custom marketing banners in Thoothukudi corridors'
      ],
      quota: '50 Listings',
      recommended: false,
    },
  ];

  const handleUpgrade = (planName: 'Starter' | 'Growth' | 'Developer Pro') => {
    setSelectedPlan(planName);
    setIsProcessing(true);
    setPaymentSuccess(false);

    setTimeout(() => {
      setIsProcessing(false);
      setCurrentPlan(planName);
      setPaymentSuccess(true);
    }, 1200);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#DADDD5] shadow-xs">
        <span className="text-xs uppercase font-extrabold tracking-wider text-[#668F35] bg-[#EBF2DE] px-3 py-1 rounded-full border border-[#D5E3C3]">
          Seller Subscriptions
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-[#1F271B] mt-2">
          Listing Plans &amp; Membership
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          Choose a transparent subscription plan to list residential plots in Thoothukudi with verified credentials.
        </p>

        {paymentSuccess && (
          <div className="mt-4 p-4 rounded-2xl bg-[#EBF2DE] border border-[#D5E3C3] text-xs font-bold text-[#486725] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#486725]" />
              <span>
                Payment simulated successfully! Active plan updated to <strong>{currentPlan}</strong>. Listing quota increased.
              </span>
            </div>
            <button
              onClick={() => alert('Invoice #INV-2026-THY downloaded.')}
              className="text-[11px] underline flex items-center gap-1 cursor-pointer"
            >
              <Download className="w-3 h-3" /> Download Invoice
            </button>
          </div>
        )}
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => {
          const isCurrent = currentPlan === plan.name;
          return (
            <div
              key={plan.name}
              className={`rounded-3xl p-6 sm:p-7 border flex flex-col justify-between transition-all relative ${
                plan.recommended
                  ? 'bg-white border-[#B7E436] shadow-md ring-2 ring-[#B7E436]'
                  : 'bg-white border-[#DADDD5] shadow-xs hover:shadow-sm'
              }`}
            >
              {plan.recommended && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#B7E436] text-[#1C2618] text-[10px] font-black uppercase tracking-wider shadow-xs">
                  Most Popular for Agents
                </div>
              )}

              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-black text-[#1F271B]">{plan.name}</h3>
                  {isCurrent && (
                    <span className="px-2.5 py-0.5 rounded-full bg-[#EBF2DE] text-[#486725] text-[10px] font-extrabold uppercase">
                      Current Active Plan
                    </span>
                  )}
                </div>

                <div className="mt-4 flex items-baseline">
                  <span className="text-3xl font-black text-[#1F271B]">{plan.price}</span>
                  <span className="text-xs text-gray-500 font-semibold ml-1">{plan.period}</span>
                </div>

                <p className="mt-2 text-xs text-gray-500 leading-relaxed min-h-[36px]">
                  {plan.subtitle}
                </p>

                <div className="mt-6 pt-6 border-t border-gray-100 space-y-2.5">
                  <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                    Included Capabilities
                  </span>
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-2 text-xs text-gray-700">
                      <Check className="w-3.5 h-3.5 text-[#668F35] shrink-0 mt-0.5 stroke-[2.5]" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-4">
                {isCurrent ? (
                  <button
                    disabled
                    className="w-full py-3 rounded-2xl bg-gray-100 text-gray-500 text-xs font-bold cursor-default"
                  >
                    Current Plan (Renews Automatically)
                  </button>
                ) : (
                  <button
                    onClick={() => handleUpgrade(plan.name as any)}
                    disabled={isProcessing}
                    className="w-full py-3 rounded-2xl bg-[#B7E436] hover:bg-[#A6D42A] text-[#1C2618] text-xs font-black transition-all shadow-xs cursor-pointer disabled:opacity-50"
                  >
                    {isProcessing && selectedPlan === plan.name
                      ? 'Processing Payment...'
                      : `Upgrade to ${plan.name}`}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Payment History & Rules */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#DADDD5] shadow-xs space-y-4">
        <h3 className="text-base font-bold text-[#1F271B]">Recent Subscription Invoices</h3>
        <div className="divide-y divide-gray-100 text-xs">
          <div className="py-3 flex items-center justify-between">
            <div>
              <span className="font-bold text-gray-800">Invoice #THY-SUB-9842</span>
              <span className="text-gray-400 block text-[11px]">Paid via Razorpay &bull; Growth Plan Renewal</span>
            </div>
            <div className="text-right">
              <span className="font-extrabold text-[#1F271B]">₹1,499.00</span>
              <span className="text-[10px] text-emerald-600 block font-bold">PAID</span>
            </div>
          </div>
          <div className="py-3 flex items-center justify-between">
            <div>
              <span className="font-bold text-gray-800">Invoice #THY-SUB-8219</span>
              <span className="text-gray-400 block text-[11px]">Paid via UPI &bull; Growth Plan Initial Activation</span>
            </div>
            <div className="text-right">
              <span className="font-extrabold text-[#1F271B]">₹1,499.00</span>
              <span className="text-[10px] text-emerald-600 block font-bold">PAID</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
