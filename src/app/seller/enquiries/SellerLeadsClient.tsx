'use client';

import { useState } from 'react';
import { Enquiry, LeadStage } from '@/lib/types';
import {
  MessageSquare,
  Phone,
  Mail,
  Calendar,
  CheckCircle2,
  Clock,
  Filter,
  ArrowRight,
  ExternalLink,
  UserCheck
} from 'lucide-react';

interface SellerLeadsClientProps {
  initialEnquiries: Enquiry[];
}

const STAGES: LeadStage[] = [
  'New',
  'Contacted',
  'Interested',
  'Site Visit',
  'Negotiation',
  'Converted',
  'Closed'
];

export default function SellerLeadsClient({ initialEnquiries }: SellerLeadsClientProps) {
  const [leads, setLeads] = useState<Enquiry[]>(initialEnquiries);
  const [activeStage, setActiveStage] = useState<string>('All');
  const [schedulingLeadId, setSchedulingLeadId] = useState<string | null>(null);
  const [visitDate, setVisitDate] = useState<string>('');

  const filteredLeads = leads.filter((l) => {
    if (activeStage === 'All') return true;
    return (l.stage || l.status) === activeStage;
  });

  const handleStageChange = async (leadId: string, newStage: LeadStage) => {
    try {
      const res = await fetch('/api/leads', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: leadId,
          stage: newStage,
          status: newStage === 'Closed' ? 'Closed' : 'Follow-up'
        })
      });
      if (res.ok) {
        setLeads((prev) =>
          prev.map((l) => (l.id === leadId ? { ...l, stage: newStage } : l))
        );
      }
    } catch (err) {
      console.error('Failed to update stage:', err);
    }
  };

  const handleScheduleVisit = async (lead: Enquiry) => {
    if (!visitDate) return;
    try {
      const res = await fetch('/api/leads', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: lead.id,
          stage: 'Site Visit',
          siteVisitDate: visitDate,
          customerPhone: lead.phone,
          customerName: lead.name,
          projectName: 'AP Rajan Garden'
        })
      });
      if (res.ok) {
        setLeads((prev) =>
          prev.map((l) =>
            l.id === lead.id ? { ...l, stage: 'Site Visit', siteVisitDate: visitDate } : l
          )
        );
        setSchedulingLeadId(null);
        setVisitDate('');
      }
    } catch (err) {
      console.error('Failed to schedule site visit:', err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#DADDD5] shadow-xs">
        <span className="text-xs uppercase font-extrabold tracking-wider text-[#668F35] bg-[#EBF2DE] px-3 py-1 rounded-full border border-[#D5E3C3]">
          Lead &amp; Enquiry CRM
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-[#1F271B] mt-2">
          Buyer Leads &amp; Site Visits ({leads.length})
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          Track buyer progression through stages from initial enquiry to site inspection and plot registration.
        </p>

        {/* Stage Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 pt-4 mt-2 border-t border-gray-100">
          <button
            onClick={() => setActiveStage('All')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeStage === 'All'
                ? 'bg-[#1F271B] text-white shadow-xs'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            All Leads ({leads.length})
          </button>
          {STAGES.map((stg) => {
            const count = leads.filter((l) => (l.stage || l.status) === stg).length;
            return (
              <button
                key={stg}
                onClick={() => setActiveStage(stg)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activeStage === stg
                    ? 'bg-[#B7E436] text-[#1F271B] shadow-xs'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {stg} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Leads List */}
      <div className="bg-white rounded-3xl border border-[#DADDD5] overflow-hidden shadow-xs divide-y divide-gray-100">
        {filteredLeads.map((lead) => {
          const cleanPhone = lead.phone.replace(/\D/g, '');
          const waUrl = `https://wa.me/${cleanPhone.length === 10 ? '91' + cleanPhone : cleanPhone}?text=Hello%20${encodeURIComponent(lead.name)},%20thank%20you%20for%20your%20interest%20in%20AP%20Rajan%20Garden%20plots%20in%20Thoothukudi.`;

          return (
            <div
              key={lead.id}
              className="p-6 hover:bg-gray-50/70 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="space-y-2 max-w-xl">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-extrabold text-base text-[#1F271B]">{lead.name}</h3>
                  <span className="text-xs text-gray-400">• {lead.createdAt?.split('T')[0] || lead.createdAt}</span>
                  {lead.constructionInterest && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 border border-blue-200">
                      Turnkey Villa Requested
                    </span>
                  )}
                </div>

                <div className="text-xs text-gray-600 flex items-center gap-2">
                  <span className="font-semibold text-gray-800">Plot Requested:</span>
                  <span className="text-[#668F35] font-bold">{lead.plotTitle || 'AP Rajan Garden'}</span>
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
                  {lead.siteVisitDate && (
                    <span className="flex items-center gap-1 text-purple-700 font-bold bg-purple-50 px-2 py-0.5 rounded-md">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Site Visit: {lead.siteVisitDate}</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Action Controls */}
              <div className="flex flex-col sm:flex-row md:flex-col items-start md:items-end gap-2.5 shrink-0">
                {/* Stage Selector */}
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] text-gray-400 font-semibold">Stage:</span>
                  <select
                    value={lead.stage || lead.status || 'New'}
                    onChange={(e) => handleStageChange(lead.id, e.target.value as LeadStage)}
                    className="text-xs font-bold px-3 py-1.5 rounded-xl border border-gray-300 bg-white text-gray-800 focus:outline-hidden focus:ring-2 focus:ring-[#668F35]"
                  >
                    {STAGES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Direct Connect Buttons */}
                <div className="flex items-center gap-2">
                  <a
                    href={`tel:${lead.phone}`}
                    className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold transition-all"
                    title="Direct Call"
                  >
                    <Phone className="w-4 h-4" />
                  </a>

                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-2xs"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>

                  <button
                    onClick={() => setSchedulingLeadId(schedulingLeadId === lead.id ? null : lead.id)}
                    className="px-3 py-1.5 rounded-xl bg-[#B7E436] hover:bg-[#A6D42A] text-[#1C2618] text-xs font-extrabold flex items-center gap-1 shadow-2xs"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Site Visit</span>
                  </button>
                </div>

                {/* Inline Date Picker for Site Visit */}
                {schedulingLeadId === lead.id && (
                  <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 space-y-2 mt-1">
                    <label className="text-[10px] font-bold text-gray-600 block">Pick Date:</label>
                    <input
                      type="date"
                      value={visitDate}
                      onChange={(e) => setVisitDate(e.target.value)}
                      className="px-2 py-1 rounded text-xs border border-gray-300 bg-white"
                    />
                    <button
                      onClick={() => handleScheduleVisit(lead)}
                      disabled={!visitDate}
                      className="w-full py-1 rounded bg-[#668F35] text-white text-[11px] font-bold disabled:opacity-50"
                    >
                      Confirm &amp; Send WhatsApp Alert
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
