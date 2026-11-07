'use client';

import { useState, useEffect } from 'react';
import {
  UserCheck,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Building2,
  Phone,
  Mail,
  Search,
  RefreshCw,
  ExternalLink
} from 'lucide-react';
import { Tenant } from '@/lib/types';

export default function AdminSellersPage() {
  const [developers, setDevelopers] = useState<Tenant[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [actionMessage, setActionMessage] = useState('');

  const fetchDevelopers = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/developers');
      const data = await res.json();
      if (data.success) {
        setDevelopers(data.developers);
      }
    } catch (err) {
      console.error('Failed to fetch developers:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDevelopers();
  }, []);

  const handleStatusChange = async (id: string, newStatus: Tenant['status']) => {
    try {
      const res = await fetch('/api/developers', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus })
      });
      const data = await res.json();
      if (data.success) {
        setDevelopers((prev) =>
          prev.map((d) => (d.id === id ? { ...d, status: newStatus } : d))
        );
        setActionMessage(`Developer status updated to ${newStatus}.`);
        setTimeout(() => setActionMessage(''), 3000);
      }
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  const filtered = developers.filter((d) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      d.companyName.toLowerCase().includes(q) ||
      d.name.toLowerCase().includes(q) ||
      d.email.toLowerCase().includes(q) ||
      d.phone.includes(q)
    );
  });

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#DADDD5] shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase font-extrabold tracking-wider text-[#668F35] bg-[#EBF2DE] px-3 py-1 rounded-full border border-[#D5E3C3]">
            Super Admin Control
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-[#1F271B] mt-2">
            Developer &amp; Promoter Accounts ({developers.length})
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Review onboarding requests, verify RERA credentials, and enforce multi-tenant quotas.
          </p>
        </div>

        <button
          onClick={fetchDevelopers}
          className="inline-flex items-center space-x-2 px-4 py-2 rounded-2xl bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 text-xs font-bold shadow-2xs transition-all"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh</span>
        </button>
      </div>

      {actionMessage && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-bold">
          {actionMessage}
        </div>
      )}

      {/* Search */}
      <div className="bg-white rounded-2xl p-4 border border-[#DADDD5] shadow-xs">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search developer company, promoter name, email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-gray-300 text-xs text-gray-800 focus:outline-hidden focus:ring-2 focus:ring-[#668F35]"
          />
        </div>
      </div>

      {/* Developer Table */}
      <div className="bg-white rounded-3xl border border-[#DADDD5] overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-[#F8F9F6] border-b border-gray-200 text-gray-700 uppercase tracking-wider font-extrabold text-[11px]">
              <tr>
                <th className="p-4">Company &amp; Promoter</th>
                <th className="p-4">Contact</th>
                <th className="p-4">RERA Number</th>
                <th className="p-4">Plan &amp; Quota</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Approval Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((dev) => (
                <tr key={dev.id} className="hover:bg-gray-50/70 transition-colors">
                  <td className="p-4">
                    <div className="font-extrabold text-sm text-[#1F271B]">{dev.companyName}</div>
                    <div className="text-xs text-gray-500">{dev.name} • {dev.district}</div>
                  </td>
                  <td className="p-4 space-y-0.5">
                    <div className="font-mono text-gray-800">{dev.phone}</div>
                    <div className="text-gray-500">{dev.email}</div>
                  </td>
                  <td className="p-4">
                    <span className="font-mono text-xs text-gray-700">
                      {dev.reraNumber || 'Pending Submission'}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="capitalize font-bold text-[#668F35]">{dev.subscriptionPlan}</span>
                    <div className="text-[11px] text-gray-400">Up to {dev.maxPlots} plots</div>
                  </td>
                  <td className="p-4">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                        dev.status === 'approved'
                          ? 'bg-emerald-100 text-emerald-800'
                          : dev.status === 'pending'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {dev.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      {dev.status !== 'approved' && (
                        <button
                          onClick={() => handleStatusChange(dev.id, 'approved')}
                          className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white font-bold text-[11px] hover:bg-emerald-700"
                        >
                          Approve
                        </button>
                      )}
                      {dev.status !== 'rejected' && dev.status !== 'suspended' && (
                        <button
                          onClick={() => handleStatusChange(dev.id, 'suspended')}
                          className="px-2.5 py-1 rounded-lg bg-red-100 text-red-700 font-bold text-[11px] hover:bg-red-200"
                        >
                          Suspend
                        </button>
                      )}
                    </div>
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
