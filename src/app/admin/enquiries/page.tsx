import { getEnquiries } from '@/lib/storage';
import {
  MessageSquare,
  Phone,
  Mail,
  Calendar,
  CheckCircle2,
  Clock,
  MapPin,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';

export default async function AdminEnquiriesPage() {
  const enquiries = await getEnquiries();

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#DADDD5] shadow-xs">
        <span className="text-xs uppercase font-extrabold tracking-wider text-[#668F35] bg-[#EBF2DE] px-3 py-1 rounded-full border border-[#D5E3C3]">
          Platform Lead Oversight
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-[#1F271B] mt-2">
          Customer Enquiries &amp; Site Visits ({enquiries.length})
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          Monitor incoming property leads across all Thoothukudi corridors and check seller response rates.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-[#DADDD5] overflow-hidden shadow-xs divide-y divide-gray-100">
        {enquiries.map((lead) => (
          <div
            key={lead.id}
            className="p-6 hover:bg-gray-50/70 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div className="space-y-1.5 max-w-xl">
              <div className="flex items-center gap-3">
                <h3 className="font-extrabold text-base text-[#1F271B]">{lead.name}</h3>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-[#EBF2DE] text-[#486725] border border-[#D5E3C3]">
                  {lead.status}
                </span>
                <span className="text-xs text-gray-400">{lead.createdAt}</span>
              </div>

              <div className="text-xs text-gray-600 flex items-center gap-2">
                <span className="font-semibold text-gray-800">Target Layout:</span>
                <span className="text-[#668F35] font-bold">{lead.plotTitle || 'Pearl Haven Layout'}</span>
              </div>

              <p className="text-xs text-gray-600 bg-gray-50 p-3 rounded-xl border border-gray-100 italic">
                &quot;{lead.message}&quot;
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 pt-1">
                <span className="flex items-center gap-1 font-mono">
                  <Phone className="w-3.5 h-3.5 text-[#668F35]" />
                  <span>{lead.phone}</span>
                </span>
                {lead.email && (
                  <span className="flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-[#668F35]" />
                    <span>{lead.email}</span>
                  </span>
                )}
                {lead.budget && (
                  <span className="text-[11px] bg-gray-100 px-2 py-0.5 rounded-md font-semibold text-gray-700">
                    Budget: {lead.budget}
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2.5 shrink-0">
              <a
                href={`tel:${lead.phone}`}
                className="px-4 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold transition-colors flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Lead</span>
              </a>

              <a
                href={`https://wa.me/91${lead.phone.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors flex items-center gap-1.5 shadow-xs"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
