'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  CreditCard,
  Download,
  CheckCircle2,
  Receipt,
  ArrowRight,
  ShieldCheck,
  Calendar,
  AlertCircle
} from 'lucide-react';

const SAMPLE_PAYMENTS = [
  {
    id: 'TXN-THY-9021',
    invoice: 'INV-2026-0042',
    date: '15 March 2026',
    plan: 'Growth Plan (Monthly)',
    amount: '₹1,499.00',
    gateway: 'Razorpay / UPI',
    status: 'Success',
  },
  {
    id: 'TXN-THY-8419',
    invoice: 'INV-2026-0031',
    date: '15 February 2026',
    plan: 'Growth Plan (Monthly)',
    amount: '₹1,499.00',
    gateway: 'Net Banking (HDFC)',
    status: 'Success',
  },
  {
    id: 'TXN-THY-7811',
    invoice: 'INV-2026-0018',
    date: '15 January 2026',
    plan: 'Growth Plan Initial Activation',
    amount: '₹1,499.00',
    gateway: 'Credit Card (Visa)',
    status: 'Success',
  },
];

export default function SellerPaymentsPage() {
  const [downloading, setDownloading] = useState<string | null>(null);

  const handleDownloadInvoice = (inv: string) => {
    setDownloading(inv);
    setTimeout(() => {
      setDownloading(null);
      alert(`GST Tax Invoice ${inv} downloaded successfully.`);
    }, 800);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#DADDD5] shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase font-extrabold tracking-wider text-[#668F35] bg-[#EBF2DE] px-3 py-1 rounded-full border border-[#D5E3C3]">
            Billing &amp; Invoices
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-[#1F271B] mt-2">
            Subscription Payment History
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Download GST-compliant tax invoices, track gateway references, and check renewal dates.
          </p>
        </div>

        <Link
          href="/seller/subscription"
          className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-2xl bg-[#B7E436] hover:bg-[#A6D42A] text-[#1C2618] text-xs sm:text-sm font-extrabold shadow-xs transition-all shrink-0 cursor-pointer"
        >
          <CreditCard className="w-4 h-4" />
          <span>Change Subscription Plan</span>
        </Link>
      </div>

      {/* Current Active Subscription Summary */}
      <div className="p-6 rounded-3xl bg-[#1C2618] text-white border border-[#2C3826] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-[#D8FF54] uppercase tracking-wider">
              Active Tier
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#B7E436] text-[#1C2618]">
              AUTO-RENEW ACTIVE
            </span>
          </div>
          <h3 className="text-xl font-black text-white">Growth Plan &bull; ₹1,499 / month</h3>
          <p className="text-xs text-gray-300">
            Next billing date: <strong>15 April 2026</strong> &bull; Quota: <strong>12 of 15 Plot Listings Used</strong>
          </p>
        </div>

        <div className="text-right shrink-0">
          <span className="text-xs text-gray-400 block">Payment Method:</span>
          <span className="text-sm font-bold text-white flex items-center gap-1 justify-end">
            <ShieldCheck className="w-4 h-4 text-[#B7E436]" />
            <span>UPI / Auto-Debit Verified</span>
          </span>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-3xl border border-[#DADDD5] overflow-hidden shadow-xs">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-base font-bold text-[#1F271B]">Invoices &amp; Receipts ({SAMPLE_PAYMENTS.length})</h2>
          <span className="text-xs text-gray-500 font-medium">All payments processed via secure gateway</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50/70 text-gray-500 font-extrabold uppercase text-[10px]">
                <th className="p-4">Invoice #</th>
                <th className="p-4">Date</th>
                <th className="p-4">Description</th>
                <th className="p-4">Method</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Download</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium text-gray-800">
              {SAMPLE_PAYMENTS.map((txn) => (
                <tr key={txn.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="p-4 font-mono font-bold text-[#1F271B]">{txn.invoice}</td>
                  <td className="p-4 text-gray-600">{txn.date}</td>
                  <td className="p-4 font-semibold">{txn.plan}</td>
                  <td className="p-4 text-gray-600">{txn.gateway}</td>
                  <td className="p-4 font-black text-[#1F271B]">{txn.amount}</td>
                  <td className="p-4">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#EBF2DE] text-[#486725] text-[10px] font-bold">
                      <CheckCircle2 className="w-3 h-3 text-[#668F35]" />
                      <span>{txn.status}</span>
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => handleDownloadInvoice(txn.invoice)}
                      className="inline-flex items-center gap-1 text-xs font-bold text-[#668F35] hover:text-[#486725] hover:underline cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>{downloading === txn.invoice ? 'Downloading...' : 'PDF'}</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
