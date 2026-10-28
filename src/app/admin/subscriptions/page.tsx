'use client';

import { useState } from 'react';
import {
  CreditCard,
  CheckCircle2,
  Edit,
  ShieldCheck,
  TrendingUp,
  Sparkles,
  Users
} from 'lucide-react';

export default function AdminSubscriptionsPage() {
  const [plans, setPlans] = useState([
    {
      id: 'starter',
      name: 'Starter Plan',
      price: 499,
      billing: 'Monthly',
      listingLimit: 3,
      featuredLimit: 0,
      activeSellers: 14,
      monthlyRevenue: 6986,
      status: 'Active',
      description: 'Individual landowners selling 1 to 3 family plots.',
    },
    {
      id: 'growth',
      name: 'Growth Plan',
      price: 1499,
      billing: 'Monthly',
      listingLimit: 15,
      featuredLimit: 3,
      activeSellers: 28,
      monthlyRevenue: 41972,
      status: 'Active',
      description: 'Local real-estate agents and land promoters with active leads.',
    },
    {
      id: 'pro',
      name: 'Developer Pro',
      price: 3999,
      billing: 'Monthly',
      listingLimit: 50,
      featuredLimit: 10,
      activeSellers: 8,
      monthlyRevenue: 31992,
      status: 'Active',
      description: 'Gated community developers with masterplan layout uploads.',
    },
  ]);

  const totalMonthlyMRR = plans.reduce((acc, p) => acc + p.monthlyRevenue, 0);
  const totalSubscribers = plans.reduce((acc, p) => acc + p.activeSellers, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#DADDD5] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase font-extrabold tracking-wider text-[#668F35] bg-[#EBF2DE] px-3 py-1 rounded-full border border-[#D5E3C3]">
            Monetization &amp; Memberships
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-[#1F271B] mt-2">
            Subscription Packages &amp; Pricing
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Configure listing quotas, feature permissions, pricing, and view subscription revenue.
          </p>
        </div>

        <div className="text-right">
          <span className="text-xs text-gray-400 block font-bold uppercase">Monthly Recurring Revenue</span>
          <span className="text-2xl font-black text-[#668F35]">₹{totalMonthlyMRR.toLocaleString('en-IN')}/mo</span>
        </div>
      </div>

      {/* 3 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 bg-white rounded-2xl border border-[#DADDD5] shadow-xs">
          <span className="text-xs font-bold text-gray-500 uppercase">Total Paid Subscribers</span>
          <div className="text-3xl font-black text-[#1F271B] mt-1">{totalSubscribers} Sellers</div>
          <span className="text-[11px] text-[#668F35] font-semibold">Active billing across all 3 tiers</span>
        </div>
        <div className="p-5 bg-white rounded-2xl border border-[#DADDD5] shadow-xs">
          <span className="text-xs font-bold text-gray-500 uppercase">Average Revenue Per User (ARPU)</span>
          <div className="text-3xl font-black text-[#1F271B] mt-1">₹1,614 / mo</div>
          <span className="text-[11px] text-blue-600 font-semibold">Driven by Growth Plan adoption</span>
        </div>
        <div className="p-5 bg-white rounded-2xl border border-[#DADDD5] shadow-xs">
          <span className="text-xs font-bold text-gray-500 uppercase">Renewal Success Rate</span>
          <div className="text-3xl font-black text-emerald-700 mt-1">96.8%</div>
          <span className="text-[11px] text-emerald-600 font-semibold">Razorpay auto-debit verified</span>
        </div>
      </div>

      {/* Subscription Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="p-6 rounded-3xl bg-white border border-[#DADDD5] shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-black text-[#1F271B]">{plan.name}</h3>
                <span className="px-2.5 py-0.5 rounded-full bg-[#EBF2DE] text-[#486725] text-[10px] font-bold">
                  {plan.status}
                </span>
              </div>
              <div className="mt-3 flex items-baseline">
                <span className="text-3xl font-black text-[#1F271B]">₹{plan.price}</span>
                <span className="text-xs text-gray-500 font-semibold ml-1">/ {plan.billing.toLowerCase()}</span>
              </div>
              <p className="mt-2 text-xs text-gray-500">{plan.description}</p>

              <div className="mt-5 pt-4 border-t border-gray-100 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-500">Max Listing Quota:</span>
                  <strong className="text-gray-800">{plan.listingLimit} Plots</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Featured Credits:</span>
                  <strong className="text-gray-800">{plan.featuredLimit}x Priority</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Active Promoters:</span>
                  <strong className="text-[#668F35]">{plan.activeSellers} Subscribed</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Tier Monthly Revenue:</span>
                  <strong className="text-gray-900 font-bold">₹{plan.monthlyRevenue.toLocaleString('en-IN')}</strong>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100">
              <button
                onClick={() => alert(`Configuring rules for ${plan.name}`)}
                className="w-full py-2.5 rounded-xl bg-gray-100 hover:bg-[#EBF2DE] text-[#1F271B] font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Edit className="w-3.5 h-3.5" />
                <span>Configure Pricing &amp; Limits</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
