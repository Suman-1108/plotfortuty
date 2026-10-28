'use client';

import { useState } from 'react';
import {
  FileBarChart,
  Download,
  TrendingUp,
  MapPin,
  Calendar,
  Users,
  Eye,
  MessageSquare,
  ShieldCheck,
  Search,
  Filter,
  CheckCircle,
  AlertTriangle,
  ArrowUpRight
} from 'lucide-react';

interface AuditLog {
  id: string;
  adminUser: string;
  action: string;
  target: string;
  timestamp: string;
  ipAddress: string;
  status: 'Success' | 'Warning';
}

const AUDIT_LOGS: AuditLog[] = [
  {
    id: 'LOG-8812',
    adminUser: 'Suman (Super Admin)',
    action: 'Approved TNRERA Registration for Seller',
    target: 'Vasantham Promoters (TNRERA/TUT/014/2026)',
    timestamp: '2026-10-26 18:40',
    ipAddress: '106.198.112.44',
    status: 'Success'
  },
  {
    id: 'LOG-8811',
    adminUser: 'Suman (Super Admin)',
    action: 'Updated DTCP Verification Status to Verified',
    target: 'Harbour Enclave Phase 2 (Plot #12-18)',
    timestamp: '2026-10-26 17:15',
    ipAddress: '106.198.112.44',
    status: 'Success'
  },
  {
    id: 'LOG-8810',
    adminUser: 'Platform System',
    action: 'Subscription Renewal Invoice Generated',
    target: 'Subramanian Land Developers (₹3,999/mo)',
    timestamp: '2026-10-26 14:02',
    ipAddress: '127.0.0.1 (Cron)',
    status: 'Success'
  },
  {
    id: 'LOG-8809',
    adminUser: 'Security Guard',
    action: 'Suspicious Multiple Login Attempts Blocked',
    target: 'IP 49.37.199.12 flagged for rate-limiting',
    timestamp: '2026-10-25 23:19',
    ipAddress: '49.37.199.12',
    status: 'Warning'
  },
  {
    id: 'LOG-8808',
    adminUser: 'Suman (Super Admin)',
    action: 'Updated Featured Corridor Weights',
    target: 'Promoted Korampallam & Palayamkottai Road',
    timestamp: '2026-10-25 11:30',
    ipAddress: '106.198.112.44',
    status: 'Success'
  }
];

const CORRIDOR_STATS = [
  {
    name: 'Korampallam Collectorate Hub',
    searches: '3,840 views',
    enquiries: 98,
    avgPrice: '₹1,450 / sq.ft',
    growth: '+18.4% YoY',
    demand: 'Very High'
  },
  {
    name: 'Palayamkottai Road Corridor',
    searches: '3,210 views',
    enquiries: 84,
    avgPrice: '₹1,850 / sq.ft',
    growth: '+14.2% YoY',
    demand: 'High'
  },
  {
    name: 'Harbour Express Bypass',
    searches: '2,490 views',
    enquiries: 62,
    avgPrice: '₹1,200 / sq.ft',
    growth: '+22.5% YoY',
    demand: 'Very High'
  },
  {
    name: 'Millerpuram Residential',
    searches: '1,920 views',
    enquiries: 45,
    avgPrice: '₹2,650 / sq.ft',
    growth: '+9.1% YoY',
    demand: 'Moderate'
  },
  {
    name: 'Muthiapuram & Port Belt',
    searches: '1,640 views',
    enquiries: 38,
    avgPrice: '₹980 / sq.ft',
    growth: '+12.0% YoY',
    demand: 'Moderate'
  },
  {
    name: 'Ettayapuram Road / SIPCOT',
    searches: '1,280 views',
    enquiries: 29,
    avgPrice: '₹850 / sq.ft',
    growth: '+16.7% YoY',
    demand: 'High'
  }
];

export default function AdminReportsPage() {
  const [filterQuery, setFilterQuery] = useState('');

  const filteredLogs = AUDIT_LOGS.filter((l) =>
    l.action.toLowerCase().includes(filterQuery.toLowerCase()) ||
    l.target.toLowerCase().includes(filterQuery.toLowerCase()) ||
    l.adminUser.toLowerCase().includes(filterQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#DADDD5] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase font-extrabold tracking-wider text-[#668F35] bg-[#EBF2DE] px-3 py-1 rounded-full border border-[#D5E3C3]">
            Intelligence &amp; Compliance
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-[#1F271B] mt-2">
            Marketplace Analytics &amp; Audit Logs
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Real-time Thoothukudi real-estate demand trends, corridor traffic, lead conversions, and tamper-proof administrative actions.
          </p>
        </div>

        <button
          onClick={() => alert('Generating Executive Thoothukudi Land Market Quarterly Report (PDF)...')}
          className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-[#142016] text-[#B7E436] font-bold text-xs hover:bg-[#203123] transition-colors border border-[#253527] self-start sm:self-auto cursor-pointer"
        >
          <Download className="w-4 h-4" />
          <span>Export Executive Report</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-[#DADDD5] shadow-xs">
          <div className="flex items-center justify-between text-gray-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Total Plot Views</span>
            <Eye className="w-4 h-4 text-[#668F35]" />
          </div>
          <div className="text-2xl font-black text-[#1F271B]">14,380</div>
          <p className="text-[11px] text-emerald-600 font-semibold mt-1 flex items-center">
            <ArrowUpRight className="w-3 h-3 mr-0.5" /> +24% vs last month
          </p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-[#DADDD5] shadow-xs">
          <div className="flex items-center justify-between text-gray-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Site Visits Booked</span>
            <Calendar className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-emerald-700">184 Visits</div>
          <p className="text-[11px] text-gray-500 mt-1">72% attended with direct seller</p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-[#DADDD5] shadow-xs">
          <div className="flex items-center justify-between text-gray-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">WhatsApp Leads</span>
            <MessageSquare className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-black text-[#1F271B]">356 Inquiries</div>
          <p className="text-[11px] text-emerald-600 font-semibold mt-1">Direct buyer-seller chats</p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-[#DADDD5] shadow-xs">
          <div className="flex items-center justify-between text-gray-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Avg Lead Conversion</span>
            <TrendingUp className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-black text-blue-700">11.4%</div>
          <p className="text-[11px] text-gray-500 mt-1">Listing view to contact click</p>
        </div>
      </div>

      {/* Corridor Demand Breakdown */}
      <div className="bg-white rounded-3xl border border-[#DADDD5] p-6 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-black text-[#1F271B] uppercase tracking-wider">
              Thoothukudi Corridor Performance &amp; Capital Appreciation
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Traffic distribution and price escalation benchmarks across Thoothukudi micro-markets.
            </p>
          </div>
          <span className="text-xs font-bold text-[#668F35] bg-[#EBF2DE] px-3 py-1 rounded-full border border-[#D5E3C3]">
            Oct 2026 Live
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {CORRIDOR_STATS.map((c) => (
            <div
              key={c.name}
              className="p-4 rounded-2xl border border-gray-100 bg-[#FAFBF9] hover:border-[#668F35]/40 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-[#668F35] flex-shrink-0" />
                  <span className="text-xs font-black text-[#1F271B]">{c.name}</span>
                </div>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    c.demand === 'Very High'
                      ? 'bg-emerald-100 text-emerald-800'
                      : c.demand === 'High'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {c.demand}
                </span>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-2 text-[11px]">
                <div>
                  <span className="text-gray-400 block font-medium">Buyer Interest:</span>
                  <span className="font-bold text-[#1F271B]">{c.searches}</span>
                </div>
                <div>
                  <span className="text-gray-400 block font-medium">Enquiries:</span>
                  <span className="font-bold text-[#1F271B]">{c.enquiries} leads</span>
                </div>
                <div>
                  <span className="text-gray-400 block font-medium">Avg Plot Rate:</span>
                  <span className="font-bold text-[#668F35]">{c.avgPrice}</span>
                </div>
                <div>
                  <span className="text-gray-400 block font-medium">Price Trend:</span>
                  <span className="font-bold text-emerald-600">{c.growth}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Audit Logs Section */}
      <div className="bg-white rounded-3xl border border-[#DADDD5] shadow-xs overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-sm font-black text-[#1F271B] uppercase tracking-wider flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-[#668F35]" />
              <span>Administrative Compliance Audit Log</span>
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Immutable logging of administrative approvals, listings status toggles, and security events.
            </p>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search audit trail..."
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-[#668F35] bg-gray-50/50"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#FAFBF9] border-b border-[#EAECE6] text-[11px] font-black uppercase tracking-wider text-gray-500">
                <th className="py-3 px-5">Log ID</th>
                <th className="py-3 px-5">Operator</th>
                <th className="py-3 px-5">Action Performed</th>
                <th className="py-3 px-5">Entity / Scope</th>
                <th className="py-3 px-5">IP / Source</th>
                <th className="py-3 px-5">Timestamp</th>
                <th className="py-3 px-5 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50/80 transition-colors">
                  <td className="py-3 px-5 font-mono font-bold text-gray-700">{log.id}</td>
                  <td className="py-3 px-5 font-bold text-[#1F271B]">{log.adminUser}</td>
                  <td className="py-3 px-5 font-medium text-gray-800">{log.action}</td>
                  <td className="py-3 px-5 text-gray-600">{log.target}</td>
                  <td className="py-3 px-5 font-mono text-[11px] text-gray-400">{log.ipAddress}</td>
                  <td className="py-3 px-5 text-gray-500">{log.timestamp}</td>
                  <td className="py-3 px-5 text-right">
                    {log.status === 'Success' ? (
                      <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                        <CheckCircle className="w-2.5 h-2.5" />
                        <span>Logged</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                        <AlertTriangle className="w-2.5 h-2.5" />
                        <span>Security Flag</span>
                      </span>
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
