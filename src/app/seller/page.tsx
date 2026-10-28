import Link from 'next/link';
import Image from 'next/image';
import { getPlots, getEnquiries } from '@/lib/storage';
import {
  Building2,
  Users,
  Eye,
  TrendingUp,
  PlusCircle,
  MessageSquare,
  Phone,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  MapPin,
  Calendar
} from 'lucide-react';

export default async function SellerDashboard() {
  const plots = await getPlots();
  const enquiries = await getEnquiries();

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#DADDD5] shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase font-extrabold tracking-wider text-[#668F35] bg-[#EBF2DE] px-3 py-1 rounded-full border border-[#D5E3C3]">
            Seller Control Center
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-[#1F271B] mt-2">
            Welcome back, Sri Balaji Promoters!
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Manage your residential plot inventory, monitor buyer inquiries, and review site visits in Thoothukudi.
          </p>
        </div>

        <Link
          href="/seller/properties/new"
          className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-2xl bg-[#B7E436] hover:bg-[#A6D42A] text-[#1C2618] text-xs sm:text-sm font-extrabold shadow-xs transition-all shrink-0 cursor-pointer"
        >
          <PlusCircle className="w-4 h-4 stroke-[2.5]" />
          <span>Add New Plot Listing</span>
        </Link>
      </div>

      {/* 4 Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-[#DADDD5] shadow-xs">
          <div className="flex items-center justify-between text-gray-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Active Listings</span>
            <Building2 className="w-5 h-5 text-[#668F35]" />
          </div>
          <div className="text-3xl font-black text-[#1F271B]">12 <span className="text-sm font-semibold text-gray-400">/ 15</span></div>
          <p className="text-[11px] text-[#668F35] font-semibold mt-1">Growth Plan quota (80% used)</p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-[#DADDD5] shadow-xs">
          <div className="flex items-center justify-between text-gray-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Monthly Views</span>
            <Eye className="w-5 h-5 text-blue-600" />
          </div>
          <div className="text-3xl font-black text-[#1F271B]">4,820</div>
          <p className="text-[11px] text-blue-600 font-semibold mt-1">+24% from last month</p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-[#DADDD5] shadow-xs">
          <div className="flex items-center justify-between text-gray-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Buyer Enquiries</span>
            <MessageSquare className="w-5 h-5 text-amber-600" />
          </div>
          <div className="text-3xl font-black text-[#1F271B]">{enquiries.length || 28}</div>
          <p className="text-[11px] text-amber-600 font-semibold mt-1">6 site visits requested</p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-[#DADDD5] shadow-xs">
          <div className="flex items-center justify-between text-gray-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Subscription Status</span>
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-emerald-700">Active</div>
          <p className="text-[11px] text-gray-500 mt-1">Renews in 18 days (₹1,499/mo)</p>
        </div>
      </div>

      {/* Two Column Layout: Recent Enquiries & Active Plot Inventory */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Recent Buyer Leads */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-[#DADDD5] shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-gray-100">
            <div>
              <h2 className="text-base font-bold text-[#1F271B]">Recent Buyer Inquiries</h2>
              <p className="text-xs text-gray-500">Prospective buyers interested in your Thoothukudi plots</p>
            </div>
            <Link
              href="/seller/enquiries"
              className="text-xs font-bold text-[#668F35] hover:underline flex items-center gap-1"
            >
              View All <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-gray-100 mt-2">
            {(enquiries.slice(0, 4) || []).map((lead, idx) => (
              <div key={idx} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#1F271B]">{lead.name}</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#EBF2DE] text-[#486725]">
                      {lead.status}
                    </span>
                  </div>
                  <div className="text-[11px] text-gray-500 mt-0.5">
                    Interested in: <strong className="text-gray-700">{lead.plotTitle || 'Pearl Haven Layout'}</strong>
                  </div>
                  <div className="text-[11px] text-gray-400 mt-0.5 line-clamp-1 italic">
                    &quot;{lead.message || 'Looking for North-facing 4 cents plot with 40ft road'}&quot;
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href={`tel:${lead.phone}`}
                    className="p-2 rounded-xl bg-gray-100 hover:bg-[#B7E436] hover:text-[#1C2618] text-gray-700 transition-colors"
                    title="Call Buyer"
                  >
                    <Phone className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href={`https://wa.me/91${lead.phone.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1 transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Fast Plot Inventory Status */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-[#DADDD5] shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-gray-100">
            <div>
              <h2 className="text-base font-bold text-[#1F271B]">Active Plot Listings</h2>
              <p className="text-xs text-gray-500">Live on customer marketplace</p>
            </div>
            <Link
              href="/seller/properties"
              className="text-xs font-bold text-[#668F35] hover:underline flex items-center gap-1"
            >
              Manage <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3 mt-3">
            {plots.slice(0, 3).map((plot) => (
              <div
                key={plot.id}
                className="p-3 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-between gap-3"
              >
                <div className="flex items-center space-x-3 min-w-0">
                  <div className="relative h-12 w-12 rounded-xl overflow-hidden bg-gray-200 shrink-0">
                    <Image
                      src={plot.images?.[0] || '/images/real_estate.png'}
                      alt={plot.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-xs font-bold text-gray-900 truncate">{plot.title}</h3>
                    <div className="text-[11px] text-gray-500 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#668F35]" />
                      <span>{plot.location} &bull; {plot.areaCents} Cents</span>
                    </div>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="text-xs font-black text-[#1F271B]">{plot.priceDisplay}</div>
                  <span className="inline-block px-2 py-0.5 rounded-full text-[9px] font-bold bg-[#EBF2DE] text-[#486725]">
                    {plot.status}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <Link
            href="/seller/properties/new"
            className="mt-4 block w-full py-2.5 text-center rounded-xl bg-gray-100 hover:bg-[#EBF2DE] text-xs font-bold text-[#1F271B] transition-colors border border-gray-200"
          >
            + Add Another Plot (3 slots left)
          </Link>
        </div>
      </div>
    </div>
  );
}
