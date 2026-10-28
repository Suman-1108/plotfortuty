'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Plot } from '@/lib/types';
import {
  Check,
  X,
  Scale,
  ShieldCheck,
  MapPin,
  IndianRupee,
  Layers,
  Compass,
  ArrowRight,
  MessageSquare,
  CheckCircle2,
  Plus
} from 'lucide-react';

interface CompareClientProps {
  initialPlots: Plot[];
}

export default function CompareClient({ initialPlots }: CompareClientProps) {
  // Default to first 2 plots if available
  const [selectedIds, setSelectedIds] = useState<string[]>(
    initialPlots.slice(0, 2).map((p) => p.id)
  );

  const selectedPlots = selectedIds
    .map((id) => initialPlots.find((p) => p.id === id))
    .filter((p): p is Plot => Boolean(p));

  const handleSelectPlot = (plotId: string, slotIndex: number) => {
    const next = [...selectedIds];
    next[slotIndex] = plotId;
    setSelectedIds(next);
  };

  const handleAddSlot = () => {
    if (selectedIds.length < 3) {
      const remaining = initialPlots.find((p) => !selectedIds.includes(p.id));
      if (remaining) {
        setSelectedIds([...selectedIds, remaining.id]);
      }
    }
  };

  const handleRemoveSlot = (index: number) => {
    if (selectedIds.length > 1) {
      setSelectedIds(selectedIds.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="space-y-8">
      {/* Selector Cards Bar */}
      <div className="bg-white rounded-3xl p-6 border border-[#DADDD5] shadow-sm">
        <div className="flex flex-col sm:flex-row items-center justify-between pb-4 border-b border-gray-100 gap-3">
          <div className="flex items-center space-x-2">
            <Scale className="w-5 h-5 text-[#668F35]" />
            <h2 className="text-base sm:text-lg font-bold text-[#1F271B]">
              Selected Plots for Evaluation ({selectedPlots.length}/3)
            </h2>
          </div>
          {selectedIds.length < 3 && (
            <button
              onClick={handleAddSlot}
              className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-full bg-[#EBF2DE] hover:bg-[#DFECCB] text-[#1F271B] text-xs font-bold transition-all border border-[#CEE0B4] cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 text-[#668F35]" />
              <span>Add Another Plot</span>
            </button>
          )}
        </div>

        {/* Slot Selection Dropdowns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
          {selectedIds.map((id, index) => (
            <div key={index} className="p-3 bg-gray-50 rounded-2xl border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold text-[#668F35] uppercase tracking-wider">
                  Plot Slot #{index + 1}
                </span>
                {selectedIds.length > 1 && (
                  <button
                    onClick={() => handleRemoveSlot(index)}
                    className="text-gray-400 hover:text-red-500 text-xs font-semibold cursor-pointer"
                  >
                    Remove
                  </button>
                )}
              </div>
              <select
                value={id}
                onChange={(e) => handleSelectPlot(e.target.value, index)}
                className="w-full text-xs sm:text-sm font-bold text-[#1F271B] bg-white border border-gray-200 rounded-xl p-2.5 focus:outline-none focus:border-[#668F35] cursor-pointer"
              >
                {initialPlots.map((plot) => (
                  <option key={plot.id} value={plot.id}>
                    {plot.title} — {plot.location} ({plot.priceDisplay})
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      </div>

      {/* Comparison Table */}
      <div className="overflow-x-auto bg-white rounded-3xl border border-[#DADDD5] shadow-sm">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr className="border-b border-[#DADDD5] bg-[#F9FAF7]">
              <th className="p-4 sm:p-5 w-1/4 text-xs font-extrabold text-[#556046] uppercase tracking-wider">
                Specification
              </th>
              {selectedPlots.map((plot) => (
                <th key={plot.id} className="p-4 sm:p-5 w-1/3 align-top border-l border-[#EAECE4]">
                  <div className="relative h-36 w-full rounded-2xl overflow-hidden mb-3 bg-gray-100 border border-gray-200">
                    <Image
                      src={plot.images?.[0] || '/images/real_estate.png'}
                      alt={plot.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full bg-white/95 text-[10px] font-extrabold text-[#1F271B] shadow-xs">
                      {plot.status}
                    </div>
                  </div>
                  <h3 className="font-extrabold text-sm sm:text-base text-[#1F271B] leading-tight">
                    {plot.title}
                  </h3>
                  <div className="text-xs text-[#668F35] font-semibold mt-1 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 shrink-0" />
                    <span>{plot.location}</span>
                  </div>
                  <div className="text-lg font-black text-[#1F271B] mt-2">
                    {plot.priceDisplay}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EAECE4] text-xs sm:text-sm">
            {/* Price Per Sq.Ft */}
            <tr className="hover:bg-gray-50/70">
              <td className="p-4 sm:p-5 font-bold text-gray-700 bg-gray-50/50">Rate / Sq.Ft</td>
              {selectedPlots.map((p) => (
                <td key={p.id} className="p-4 sm:p-5 border-l border-[#EAECE4] font-semibold text-[#1F271B]">
                  ₹{p.pricePerSqFt?.toLocaleString('en-IN') || '—'} / sq.ft
                </td>
              ))}
            </tr>

            {/* Price Per Cent */}
            <tr className="hover:bg-gray-50/70">
              <td className="p-4 sm:p-5 font-bold text-gray-700 bg-gray-50/50">Rate / Cent</td>
              {selectedPlots.map((p) => (
                <td key={p.id} className="p-4 sm:p-5 border-l border-[#EAECE4] font-semibold text-[#1F271B]">
                  ₹{(p.pricePerCent / 100000).toFixed(2)} Lakhs / Cent
                </td>
              ))}
            </tr>

            {/* Total Area */}
            <tr className="hover:bg-gray-50/70">
              <td className="p-4 sm:p-5 font-bold text-gray-700 bg-gray-50/50">Plot Area</td>
              {selectedPlots.map((p) => (
                <td key={p.id} className="p-4 sm:p-5 border-l border-[#EAECE4] font-semibold text-[#1F271B]">
                  {p.areaCents} Cents ({p.areaSqFt?.toLocaleString('en-IN')} sq.ft)
                </td>
              ))}
            </tr>

            {/* Dimensions */}
            <tr className="hover:bg-gray-50/70">
              <td className="p-4 sm:p-5 font-bold text-gray-700 bg-gray-50/50">Dimensions</td>
              {selectedPlots.map((p) => (
                <td key={p.id} className="p-4 sm:p-5 border-l border-[#EAECE4] text-gray-800">
                  {p.dimensions || 'Standard Rectangular'}
                </td>
              ))}
            </tr>

            {/* Facing */}
            <tr className="hover:bg-gray-50/70">
              <td className="p-4 sm:p-5 font-bold text-gray-700 bg-gray-50/50">Orientation / Facing</td>
              {selectedPlots.map((p) => (
                <td key={p.id} className="p-4 sm:p-5 border-l border-[#EAECE4] font-medium text-gray-800">
                  {p.facing}
                </td>
              ))}
            </tr>

            {/* Road Access */}
            <tr className="hover:bg-gray-50/70">
              <td className="p-4 sm:p-5 font-bold text-gray-700 bg-gray-50/50">Road Access</td>
              {selectedPlots.map((p) => (
                <td key={p.id} className="p-4 sm:p-5 border-l border-[#EAECE4] font-medium text-gray-800">
                  {p.roadWidth}
                </td>
              ))}
            </tr>

            {/* Legal Approval */}
            <tr className="hover:bg-gray-50/70">
              <td className="p-4 sm:p-5 font-bold text-gray-700 bg-gray-50/50">Approval Status</td>
              {selectedPlots.map((p) => (
                <td key={p.id} className="p-4 sm:p-5 border-l border-[#EAECE4]">
                  <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#EBF2DE] text-[#486725] text-xs font-bold border border-[#D5E3C3]">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{p.approval}</span>
                  </span>
                  <div className="text-[11px] text-gray-500 font-mono mt-1">
                    {p.approvalNumber}
                  </div>
                </td>
              ))}
            </tr>

            {/* Patta Status */}
            <tr className="hover:bg-gray-50/70">
              <td className="p-4 sm:p-5 font-bold text-gray-700 bg-gray-50/50">Patta Status</td>
              {selectedPlots.map((p) => (
                <td key={p.id} className="p-4 sm:p-5 border-l border-[#EAECE4] font-medium text-gray-800">
                  {p.pattaStatus}
                </td>
              ))}
            </tr>

            {/* Actions */}
            <tr className="bg-[#F9FAF7]">
              <td className="p-4 sm:p-5 font-bold text-gray-700">Actions</td>
              {selectedPlots.map((p) => (
                <td key={p.id} className="p-4 sm:p-5 border-l border-[#EAECE4] space-y-2">
                  <Link
                    href={`/plots/${p.slug || p.id}`}
                    className="block w-full py-2.5 text-center rounded-xl bg-[#B7E436] hover:bg-[#A6D42A] text-[#1C2618] font-bold text-xs transition-colors shadow-xs"
                  >
                    View Full Details
                  </Link>
                  <a
                    href={`https://wa.me/919842155678?text=Hello%20Plot%20For%20Thoothukudi,%20I%20am%20comparing%20plot:%20${encodeURIComponent(
                      p.title
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full py-2 text-center rounded-xl bg-white border border-[#DADDD5] hover:border-[#668F35] text-[#1F271B] font-semibold text-xs transition-colors"
                  >
                    Enquire on WhatsApp
                  </a>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
