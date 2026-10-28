'use client';

import { useState } from 'react';
import {
  UserCheck,
  ShieldCheck,
  CheckCircle2,
  Building2,
  Phone,
  Mail,
  MapPin,
  FileText,
  Save
} from 'lucide-react';

export default function SellerProfilePage() {
  const [saved, setSaved] = useState(false);
  const [profile, setProfile] = useState({
    businessName: 'Sri Balaji Promoters & Land Developers',
    contactPerson: 'S. Ramanathan',
    phone: '+91 98421 55678',
    whatsapp: '+91 98421 55678',
    email: 'contact@sribalajipromoters.com',
    officeAddress: 'No. 42, Palayamkottai Road, Opp. Collectorate, Thoothukudi, Tamil Nadu - 628008',
    reraRegNumber: 'TNRERA/AGT/THY/0182/2023',
    gstin: '33AAACS1429B1Z8',
    panNumber: 'AAACS1429B',
    kycStatus: 'VERIFIED',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#DADDD5] shadow-xs">
        <div className="flex items-center space-x-2 text-[#668F35] text-xs font-bold uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4" />
          <span>Government Verified Identity</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-[#1F271B] mt-1">
          Seller Profile &amp; KYC Verification
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          Buyers trust verified sellers. Keep your legal identity, promoter registration, and contact details up to date.
        </p>

        {saved && (
          <div className="mt-4 p-3 rounded-2xl bg-[#EBF2DE] border border-[#D5E3C3] text-xs font-bold text-[#486725] flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>Profile details updated successfully!</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-5 text-xs sm:text-sm">
          <div className="p-4 rounded-2xl bg-[#EBF2DE] border border-[#D5E3C3] flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <CheckCircle2 className="w-5 h-5 text-[#486725]" />
              <div>
                <span className="font-extrabold text-[#1F271B] block">KYC Verification Status: VERIFIED</span>
                <span className="text-[11px] text-[#556046]">PAN &amp; Aadhaar Verified on 15 Jan 2026</span>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full bg-[#B7E436] text-[#1C2618] text-[10px] font-black uppercase">
              Badge Active
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Business / Firm Name
              </label>
              <input
                type="text"
                value={profile.businessName}
                onChange={(e) => setProfile({ ...profile, businessName: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-gray-300 font-bold text-gray-800 focus:outline-none focus:border-[#668F35]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Authorized Contact Person
              </label>
              <input
                type="text"
                value={profile.contactPerson}
                onChange={(e) => setProfile({ ...profile, contactPerson: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-gray-300 font-medium text-gray-800 focus:outline-none focus:border-[#668F35]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="text"
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-gray-300 font-mono text-gray-800 focus:outline-none focus:border-[#668F35]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                WhatsApp Business Number
              </label>
              <input
                type="text"
                value={profile.whatsapp}
                onChange={(e) => setProfile({ ...profile, whatsapp: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-gray-300 font-mono text-gray-800 focus:outline-none focus:border-[#668F35]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                TNRERA Agent / Promoter Reg. No.
              </label>
              <input
                type="text"
                value={profile.reraRegNumber}
                onChange={(e) => setProfile({ ...profile, reraRegNumber: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-gray-300 font-mono text-gray-800 focus:outline-none focus:border-[#668F35]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Official Email
              </label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-gray-300 text-gray-800 focus:outline-none focus:border-[#668F35]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Office Address in Thoothukudi
            </label>
            <textarea
              rows={2}
              value={profile.officeAddress}
              onChange={(e) => setProfile({ ...profile, officeAddress: e.target.value })}
              className="w-full p-2.5 rounded-xl border border-gray-300 text-gray-800 focus:outline-none focus:border-[#668F35]"
            />
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#B7E436] hover:bg-[#A6D42A] text-[#1C2618] font-bold text-xs flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Save Profile Details</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
