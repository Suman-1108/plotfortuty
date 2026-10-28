'use client';

import { useState } from 'react';
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
  ExternalLink
} from 'lucide-react';

const SAMPLE_SELLERS = [
  {
    id: 'seller-1',
    name: 'Sri Balaji Promoters',
    contactPerson: 'S. Ramanathan',
    phone: '+91 98421 55678',
    email: 'contact@sribalajipromoters.com',
    rera: 'TNRERA/AGT/THY/0182/2023',
    plan: 'Growth Plan',
    quota: '12 / 15',
    kycStatus: 'Verified',
    totalListings: 12,
  },
  {
    id: 'seller-2',
    name: 'V.O.C. Land Promoters & Developers',
    contactPerson: 'K. Muthusamy',
    phone: '+91 94431 22890',
    email: 'voc.promoters@gmail.com',
    rera: 'TNRERA/AGT/THY/0094/2022',
    plan: 'Developer Pro',
    quota: '38 / 50',
    kycStatus: 'Verified',
    totalListings: 38,
  },
  {
    id: 'seller-3',
    name: 'Tuticorin Coastline Properties',
    contactPerson: 'P. Anthony Raj',
    phone: '+91 97914 88712',
    email: 'anthony.tuticorin@yahoo.com',
    rera: 'Pending Submission',
    plan: 'Starter Plan',
    quota: '2 / 3',
    kycStatus: 'Pending Verification',
    totalListings: 2,
  },
];

export default function AdminSellersPage() {
  const [sellers, setSellers] = useState(SAMPLE_SELLERS);
  const [search, setSearch] = useState('');

  const toggleStatus = (id: string) => {
    setSellers((prev) =>
      prev.map((s) => {
        if (s.id === id) {
          const nextStatus = s.kycStatus === 'Verified' ? 'Suspended' : 'Verified';
          return { ...s, kycStatus: nextStatus };
        }
        return s;
      })
    );
  };

  const filtered = sellers.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.contactPerson.toLowerCase().includes(search.toLowerCase()) ||
      s.phone.includes(search)
  );

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#DADDD5] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase font-extrabold tracking-wider text-[#668F35] bg-[#EBF2DE] px-3 py-1 rounded-full border border-[#D5E3C3]">
            Seller Governance
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-[#1F271B] mt-2">
            Seller &amp; Promoter Verification ({sellers.length})
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Review landowner identities, TNRERA numbers, listing quotas, and KYC credentials.
          </p>
        </div>

        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="Search seller by name or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full text-xs font-semibold p-2.5 rounded-xl border border-gray-300 bg-gray-50 focus:outline-none focus:border-[#668F35]"
          />
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-[#DADDD5] overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50/70 text-gray-500 font-extrabold uppercase text-[10px]">
                <th className="p-4">Seller / Firm</th>
                <th className="p-4">Contact</th>
                <th className="p-4">TNRERA Reference</th>
                <th className="p-4">Active Plan</th>
                <th className="p-4">Listings Used</th>
                <th className="p-4">KYC Status</th>
                <th className="p-4 text-right">Moderation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium text-gray-800">
              {filtered.map((seller) => (
                <tr key={seller.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="p-4">
                    <strong className="text-sm font-black text-[#1F271B] block">{seller.name}</strong>
                    <span className="text-gray-500 text-[11px]">{seller.contactPerson}</span>
                  </td>
                  <td className="p-4 text-gray-600">
                    <div className="font-mono">{seller.phone}</div>
                    <div className="text-[11px] text-gray-400">{seller.email}</div>
                  </td>
                  <td className="p-4 font-mono text-gray-600">{seller.rera}</td>
                  <td className="p-4">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#EBF2DE] text-[#486725] font-bold text-[10px]">
                      {seller.plan}
                    </span>
                  </td>
                  <td className="p-4 font-bold text-[#1F271B]">{seller.quota}</td>
                  <td className="p-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        seller.kycStatus === 'Verified'
                          ? 'bg-emerald-100 text-emerald-800'
                          : seller.kycStatus === 'Pending Verification'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {seller.kycStatus === 'Verified' ? (
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      ) : (
                        <AlertTriangle className="w-3 h-3" />
                      )}
                      <span>{seller.kycStatus}</span>
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => toggleStatus(seller.id)}
                      className={`px-3 py-1.5 rounded-xl font-bold text-[11px] transition-colors cursor-pointer ${
                        seller.kycStatus === 'Verified'
                          ? 'bg-red-50 text-red-600 hover:bg-red-100'
                          : 'bg-[#B7E436] text-[#1C2618] hover:bg-[#A6D42A]'
                      }`}
                    >
                      {seller.kycStatus === 'Verified' ? 'Suspend Seller' : 'Approve KYC'}
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
