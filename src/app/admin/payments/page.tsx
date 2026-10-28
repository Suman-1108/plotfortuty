'use client';

import { useState } from 'react';
import {
  Receipt,
  Download,
  Search,
  CheckCircle2,
  Clock,
  AlertCircle,
  Filter,
  DollarSign,
  TrendingUp,
  FileSpreadsheet,
  ArrowUpRight,
  ShieldCheck,
  RefreshCw
} from 'lucide-react';

interface PaymentRecord {
  id: string;
  sellerName: string;
  sellerEmail: string;
  plan: string;
  amount: number;
  gst: number;
  gateway: 'Razorpay' | 'UPI' | 'NetBanking';
  gatewayRef: string;
  date: string;
  status: 'Successful' | 'Pending' | 'Refunded';
}

const INITIAL_PAYMENTS: PaymentRecord[] = [
  {
    id: 'TXN-2026-0891',
    sellerName: 'Vasantham Promoters',
    sellerEmail: 'contact@vasanthampromoters.com',
    plan: 'Growth Plan (15 listings)',
    amount: 1499,
    gst: 270,
    gateway: 'Razorpay',
    gatewayRef: 'pay_Nq99482103',
    date: '2026-10-25',
    status: 'Successful'
  },
  {
    id: 'TXN-2026-0889',
    sellerName: 'Subramanian Land Developers',
    sellerEmail: 'subbu.lands@gmail.com',
    plan: 'Developer Pro (50 listings)',
    amount: 3999,
    gst: 720,
    gateway: 'UPI',
    gatewayRef: 'upi_ref_77810398',
    date: '2026-10-24',
    status: 'Successful'
  },
  {
    id: 'TXN-2026-0872',
    sellerName: 'Kasi Viswanathan (Plot 14)',
    sellerEmail: 'kasi.viswa.tcr@gmail.com',
    plan: 'Starter Plan (3 listings)',
    amount: 499,
    gst: 90,
    gateway: 'NetBanking',
    gatewayRef: 'sbi_nb_992147',
    date: '2026-10-22',
    status: 'Successful'
  },
  {
    id: 'TXN-2026-0865',
    sellerName: 'Harbour Pearl Promoters',
    sellerEmail: 'support@harbourpearl.in',
    plan: 'Developer Pro (50 listings)',
    amount: 3999,
    gst: 720,
    gateway: 'Razorpay',
    gatewayRef: 'pay_Nq87319920',
    date: '2026-10-20',
    status: 'Successful'
  },
  {
    id: 'TXN-2026-0850',
    sellerName: 'Madasamy Real Estate',
    sellerEmail: 'madasamy.lands@yahoo.com',
    plan: 'Growth Plan (15 listings)',
    amount: 1499,
    gst: 270,
    gateway: 'UPI',
    gatewayRef: 'upi_ref_44102938',
    date: '2026-10-18',
    status: 'Successful'
  },
  {
    id: 'TXN-2026-0842',
    sellerName: 'Muthuvel Properties',
    sellerEmail: 'muthuvel.tcr@outlook.com',
    plan: 'Starter Plan (3 listings)',
    amount: 499,
    gst: 90,
    gateway: 'Razorpay',
    gatewayRef: 'pay_Nq76100234',
    date: '2026-10-15',
    status: 'Refunded'
  },
  {
    id: 'TXN-2026-0831',
    sellerName: 'Thoothukudi Greenfield Layouts',
    sellerEmail: 'greenfields.tcr@gmail.com',
    plan: 'Growth Plan (15 listings)',
    amount: 1499,
    gst: 270,
    gateway: 'UPI',
    gatewayRef: 'upi_ref_99182746',
    date: '2026-10-12',
    status: 'Pending'
  }
];

export default function AdminPaymentsPage() {
  const [payments, setPayments] = useState<PaymentRecord[]>(INITIAL_PAYMENTS);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Successful' | 'Pending' | 'Refunded'>('All');
  const [refundSuccessMsg, setRefundSuccessMsg] = useState('');

  const filteredPayments = payments.filter((p) => {
    const matchesSearch =
      p.sellerName.toLowerCase().includes(search.toLowerCase()) ||
      p.id.toLowerCase().includes(search.toLowerCase()) ||
      p.gatewayRef.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'All' || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalGrossRevenue = payments
    .filter((p) => p.status === 'Successful')
    .reduce((sum, p) => sum + p.amount + p.gst, 0);

  const totalGSTCollected = payments
    .filter((p) => p.status === 'Successful')
    .reduce((sum, p) => sum + p.gst, 0);

  const handleRefund = (id: string, name: string) => {
    if (confirm(`Are you sure you want to approve refund for transaction ${id} (${name})?`)) {
      setPayments((prev) =>
        prev.map((p) => (p.id === id ? { ...p, status: 'Refunded' as const } : p))
      );
      setRefundSuccessMsg(`Refund initiated for ${id}. Razorpay / UPI reversal reference generated.`);
      setTimeout(() => setRefundSuccessMsg(''), 4000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#DADDD5] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase font-extrabold tracking-wider text-[#668F35] bg-[#EBF2DE] px-3 py-1 rounded-full border border-[#D5E3C3]">
            Billing &amp; Treasury
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-[#1F271B] mt-2">
            Payments &amp; Gateway Transactions
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Reconcile Razorpay &amp; UPI settlements, monitor platform subscription fees, GST compliance, and process seller refunds.
          </p>
        </div>

        <button
          onClick={() => alert('Exporting Thoothukudi Marketplace GST & Reconciliation Sheet (CSV)...')}
          className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-[#142016] text-[#B7E436] font-bold text-xs hover:bg-[#203123] transition-colors border border-[#253527] self-start sm:self-auto cursor-pointer"
        >
          <FileSpreadsheet className="w-4 h-4" />
          <span>Export GST Report (CSV)</span>
        </button>
      </div>

      {refundSuccessMsg && (
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 p-4 rounded-2xl flex items-center space-x-3 text-sm">
          <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          <span>{refundSuccessMsg}</span>
        </div>
      )}

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-[#DADDD5] shadow-xs">
          <div className="flex items-center justify-between text-gray-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Gross Collections</span>
            <DollarSign className="w-4 h-4 text-[#668F35]" />
          </div>
          <div className="text-2xl font-black text-[#1F271B]">
            ₹{totalGrossRevenue.toLocaleString('en-IN')}
          </div>
          <p className="text-[11px] text-gray-500 mt-1 font-medium">All active promoter subscriptions</p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-[#DADDD5] shadow-xs">
          <div className="flex items-center justify-between text-gray-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">GST (18%) Handled</span>
            <Receipt className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-emerald-700">
            ₹{totalGSTCollected.toLocaleString('en-IN')}
          </div>
          <p className="text-[11px] text-gray-500 mt-1 font-medium">Tax invoices ready for download</p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-[#DADDD5] shadow-xs">
          <div className="flex items-center justify-between text-gray-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Success Rate</span>
            <TrendingUp className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-black text-blue-700">97.8%</div>
          <p className="text-[11px] text-gray-500 mt-1 font-medium">Razorpay &amp; NPCI UPI uptime</p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-[#DADDD5] shadow-xs">
          <div className="flex items-center justify-between text-gray-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Pending Settlements</span>
            <Clock className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-black text-amber-600">
            {payments.filter((p) => p.status === 'Pending').length} Pending
          </div>
          <p className="text-[11px] text-gray-500 mt-1 font-medium">T+1 bank credit clearance</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-[#DADDD5] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search transaction ID, seller, or gateway ref..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-[#668F35] bg-gray-50/50"
          />
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-gray-400" />
          <span className="text-xs font-bold text-gray-500">Status:</span>
          {(['All', 'Successful', 'Pending', 'Refunded'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                statusFilter === status
                  ? 'bg-[#142016] text-[#B7E436]'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-3xl border border-[#DADDD5] shadow-xs overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-sm font-black text-[#1F271B] uppercase tracking-wider">
            Reconciled Invoices &amp; Settlements ({filteredPayments.length})
          </h2>
          <span className="text-xs text-gray-400">Showing realtime gateway webhooks</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#FAFBF9] border-b border-[#EAECE6] text-[11px] font-black uppercase tracking-wider text-gray-500">
                <th className="py-3 px-5">Invoice / TXN ID</th>
                <th className="py-3 px-5">Seller / Entity</th>
                <th className="py-3 px-5">Plan</th>
                <th className="py-3 px-5">Gateway &amp; Ref</th>
                <th className="py-3 px-5">Net + 18% GST</th>
                <th className="py-3 px-5">Date</th>
                <th className="py-3 px-5">Status</th>
                <th className="py-3 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs">
              {filteredPayments.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50/80 transition-colors">
                  <td className="py-3.5 px-5 font-mono font-bold text-gray-800">{p.id}</td>
                  <td className="py-3.5 px-5">
                    <div className="font-bold text-[#1F271B]">{p.sellerName}</div>
                    <div className="text-[11px] text-gray-400">{p.sellerEmail}</div>
                  </td>
                  <td className="py-3.5 px-5 font-semibold text-gray-700">{p.plan}</td>
                  <td className="py-3.5 px-5">
                    <span className="inline-block px-2 py-0.5 rounded bg-gray-100 text-gray-700 text-[10px] font-bold">
                      {p.gateway}
                    </span>
                    <div className="text-[11px] font-mono text-gray-400 mt-0.5">{p.gatewayRef}</div>
                  </td>
                  <td className="py-3.5 px-5">
                    <div className="font-bold text-[#1F271B]">₹{(p.amount + p.gst).toLocaleString('en-IN')}</div>
                    <div className="text-[10px] text-gray-400">₹{p.amount} + ₹{p.gst} GST</div>
                  </td>
                  <td className="py-3.5 px-5 text-gray-600">{p.date}</td>
                  <td className="py-3.5 px-5">
                    {p.status === 'Successful' && (
                      <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Paid</span>
                      </span>
                    )}
                    {p.status === 'Pending' && (
                      <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800">
                        <Clock className="w-3 h-3" />
                        <span>Pending</span>
                      </span>
                    )}
                    {p.status === 'Refunded' && (
                      <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-gray-100 text-gray-600">
                        <RefreshCw className="w-3 h-3" />
                        <span>Refunded</span>
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-5 text-right space-x-2">
                    <button
                      onClick={() => alert(`Downloading GST Tax Invoice for ${p.id}`)}
                      className="px-2.5 py-1 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-100 font-medium text-[11px] cursor-pointer"
                    >
                      Invoice
                    </button>
                    {p.status === 'Successful' && (
                      <button
                        onClick={() => handleRefund(p.id, p.sellerName)}
                        className="px-2.5 py-1 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 font-medium text-[11px] cursor-pointer"
                      >
                        Refund
                      </button>
                    )}
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
