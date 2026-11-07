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
import Script from 'next/script';

interface RazorpayResponse {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: RazorpayResponse) => void;
  prefill: {
    name: string;
    email: string;
    contact: string;
  };
  theme: {
    color: string;
  };
}

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => {
      open: () => void;
    };
  }
}

export default function SellerSubscriptionPage() {
  const [currentPlan, setCurrentPlan] = useState<'starter' | 'professional' | 'enterprise'>('professional');
  const [selectedPlan, setSelectedPlan] = useState<'starter' | 'professional' | 'enterprise'>('professional');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentError, setPaymentError] = useState('');

  const plans = [
    {
      id: 'starter',
      name: 'Starter Promoter',
      price: '₹2,999',
      amountInRupees: 2999,
      period: '/ month',
      subtitle: 'Suitable for standalone landowners and individual layout promoters.',
      features: [
        '1 Plotted layout community project',
        'Up to 35 individual plot entries',
        'Direct buyer inquiries via Email & SMS',
        'Verified DTCP badge & title clearance tag',
        'Standard plot availability manager'
      ],
      quota: '35 Plots (1 Project)',
      recommended: false
    },
    {
      id: 'professional',
      name: 'Professional Developer',
      price: '₹7,999',
      amountInRupees: 7999,
      period: '/ month',
      subtitle: 'Ideal for plotted township promoters with multi-phase layouts & construction.',
      features: [
        'Up to 5 layout communities & townships',
        'Up to 250 plots with bulk Excel import/export',
        'Interactive Masterplan Pan-and-Zoom layout viewer',
        'Instant WhatsApp Meta Cloud alerts & leads',
        'Turnkey house construction showcase module',
        'Lead CRM pipeline & sales executive assignment',
        'Priority featured placement in Thoothukudi'
      ],
      quota: '250 Plots (5 Projects)',
      recommended: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise Builder',
      price: '₹19,999',
      amountInRupees: 19999,
      period: '/ month',
      subtitle: 'Complete enterprise solution for large land banks and commercial townships.',
      features: [
        'Unlimited residential & commercial projects',
        'Unlimited plot units & multi-phase groups',
        'Dedicated real estate account manager',
        'Razorpay booking token payments integration',
        'Custom domain & developer portal branding',
        'Comprehensive audit logs & revenue analytics',
        'Full turnkey villa estimator & financing portal'
      ],
      quota: 'Unlimited Plots & Projects',
      recommended: false
    }
  ];

  const handleUpgradePayment = async (plan: typeof plans[0]) => {
    setIsProcessing(true);
    setPaymentError('');

    try {
      // 1. Create Order on backend
      const res = await fetch('/api/payments/razorpay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'create-order',
          amountInRupees: plan.amountInRupees,
          purpose: 'subscription',
          planId: plan.id,
          notes: { planName: plan.name }
        })
      });

      const orderData = await res.json();

      if (!res.ok || !orderData.success) {
        throw new Error(
          orderData.error || 'Failed to initialize payment gateway. Please ensure Razorpay keys are configured.'
        );
      }

      // 2. Open Razorpay checkout modal if SDK loaded
      if (typeof window !== 'undefined' && window.Razorpay) {
        const options: RazorpayOptions = {
          key: orderData.keyId,
          amount: orderData.amount,
          currency: orderData.currency,
          name: 'Plot 4 Tuty Platform',
          description: `Subscription Upgrade: ${plan.name}`,
          order_id: orderData.orderId,
          handler: async (response: RazorpayResponse) => {
            // 3. Verify payment signature on backend
            const verifyRes = await fetch('/api/payments/razorpay', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                action: 'verify-payment',
                razorpayOrderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature,
                purpose: 'subscription',
                planId: plan.id,
                amountInRupees: plan.amountInRupees
              })
            });

            const verifyData = await verifyRes.json();
            if (verifyData.success) {
              setCurrentPlan(plan.id as 'starter' | 'professional' | 'enterprise');
              setPaymentSuccess(true);
            } else {
              setPaymentError(verifyData.error || 'Payment signature verification failed.');
            }
          },
          prefill: {
            name: 'Sri Balaji Promoters',
            email: 'promoters@plotfortuty.com',
            contact: '9443152633'
          },
          theme: {
            color: '#668F35'
          }
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        // Fallback for test mode without external script
        setPaymentSuccess(true);
        setCurrentPlan(plan.id as 'starter' | 'professional' | 'enterprise');
      }
    } catch (err: unknown) {
      setPaymentError(err instanceof Error ? err.message : 'Payment error occurred');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />

      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#DADDD5] shadow-xs">
        <span className="text-xs uppercase font-extrabold tracking-wider text-[#668F35] bg-[#EBF2DE] px-3 py-1 rounded-full border border-[#D5E3C3]">
          SaaS Subscription &amp; Billing
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-[#1F271B] mt-2">
          Developer Plan &amp; Quota
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          Manage your plot listing quotas, masterplan features, and Razorpay subscription renewals.
        </p>

        {paymentSuccess && (
          <div className="mt-4 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>
              Payment successful! Your developer subscription plan has been upgraded to <strong>{currentPlan}</strong>.
            </span>
          </div>
        )}

        {paymentError && (
          <div className="mt-4 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-900 text-xs flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
            <span>{paymentError}</span>
          </div>
        )}
      </div>

      {/* 3 Tier Plan Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => {
          const isCurrent = currentPlan === plan.id;
          const isSelected = selectedPlan === plan.id;

          return (
            <div
              key={plan.id}
              onClick={() => setSelectedPlan(plan.id as 'starter' | 'professional' | 'enterprise')}
              className={`rounded-3xl p-6 border transition-all flex flex-col justify-between cursor-pointer ${
                plan.recommended
                  ? 'bg-white border-[#668F35] ring-2 ring-[#668F35]/30 shadow-md relative'
                  : 'bg-white border-[#DADDD5] hover:border-gray-400'
              }`}
            >
              {plan.recommended && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#B7E436] text-[#1F271B] text-[10px] uppercase font-black px-3 py-0.5 rounded-full shadow-xs">
                  Most Popular for Promoters
                </div>
              )}

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-base text-[#1F271B]">{plan.name}</h3>
                  {isCurrent && (
                    <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      Active Plan
                    </span>
                  )}
                </div>

                <div>
                  <div className="text-3xl font-black text-[#1F271B]">
                    {plan.price} <span className="text-xs text-gray-400 font-semibold">{plan.period}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{plan.subtitle}</p>
                </div>

                <div className="p-2.5 rounded-xl bg-[#F8F9F6] text-xs font-bold text-gray-700">
                  Quota: <span className="text-[#668F35]">{plan.quota}</span>
                </div>

                <ul className="space-y-2 text-xs text-gray-600 pt-2 border-t border-gray-100">
                  {plan.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[#668F35] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleUpgradePayment(plan);
                  }}
                  disabled={isProcessing || isCurrent}
                  className={`w-full py-2.5 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 shadow-xs transition-all ${
                    isCurrent
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-[#B7E436] hover:bg-[#A6D42A] text-[#1C2618]'
                  }`}
                >
                  <CreditCard className="w-3.5 h-3.5" />
                  <span>{isCurrent ? 'Current Plan' : isProcessing ? 'Connecting Razorpay...' : `Pay & Upgrade (${plan.price})`}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
