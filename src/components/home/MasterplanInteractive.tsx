'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ProjectLayoutPlot } from '@/lib/types';
import {
  ShieldCheck,
  MapPin,
  CheckCircle,
  MessageSquare,
  ArrowRight,
  Info,
  Layers,
  Compass,
  Maximize2,
  ZoomIn,
  CheckCircle2,
  PhoneCall,
  CalendarCheck
} from 'lucide-react';

const SAMPLE_LAYOUT: ProjectLayoutPlot[] = [
  { number: 1, size: '2400 sq.ft', cents: 5.51, facing: 'North', status: 'Sold', price: '₹42.0 L' },
  { number: 2, size: '1800 sq.ft', cents: 4.13, facing: 'North', status: 'Sold', price: '₹31.5 L' },
  { number: 3, size: '1800 sq.ft', cents: 4.13, facing: 'North', status: 'Reserved', price: '₹31.5 L' },
  { number: 4, size: '1500 sq.ft', cents: 3.44, facing: 'East', status: 'Available', price: '₹26.2 L' },
  { number: 5, size: '1500 sq.ft', cents: 3.44, facing: 'East', status: 'Available', price: '₹26.2 L' },
  { number: 6, size: '1200 sq.ft', cents: 2.75, facing: 'East', status: 'Sold', price: '₹21.0 L' },
  { number: 7, size: '1200 sq.ft', cents: 2.75, facing: 'East', status: 'Available', price: '₹21.0 L' },
  { number: 8, size: '1500 sq.ft', cents: 3.44, facing: 'North', status: 'Sold', price: '₹26.2 L' },
  { number: 9, size: '1800 sq.ft', cents: 4.13, facing: 'North', status: 'Sold', price: '₹31.5 L' },
  { number: 10, size: '2400 sq.ft', cents: 5.51, facing: 'North-East', status: 'Available', price: '₹43.5 L' },
  { number: 11, size: '1500 sq.ft', cents: 3.44, facing: 'South', status: 'Sold', price: '₹25.8 L' },
  { number: 12, size: '1200 sq.ft', cents: 2.75, facing: 'South', status: 'Available', price: '₹20.8 L' },
  { number: 13, size: '1500 sq.ft', cents: 3.44, facing: 'South', status: 'Available', price: '₹25.8 L' },
  { number: 14, size: '1800 sq.ft', cents: 4.13, facing: 'South', status: 'Sold', price: '₹31.0 L' },
  { number: 15, size: '1500 sq.ft', cents: 3.44, facing: 'East', status: 'Reserved', price: '₹26.2 L' },
  { number: 16, size: '1200 sq.ft', cents: 2.75, facing: 'East', status: 'Sold', price: '₹21.0 L' },
  { number: 17, size: '1500 sq.ft', cents: 3.44, facing: 'North', status: 'Sold', price: '₹26.2 L' },
  { number: 18, size: '1800 sq.ft', cents: 4.13, facing: 'North-East', status: 'Available', price: '₹32.0 L' },
];

export default function MasterplanInteractive() {
  const [mapLevel, setMapLevel] = useState<'level1' | 'level2' | 'level3'>('level3');
  const [selectedPlot, setSelectedPlot] = useState<ProjectLayoutPlot>(SAMPLE_LAYOUT[17]); // default to Plot #18
  const [selectedCorridor, setSelectedCorridor] = useState('Korampallam');

  const availableCount = SAMPLE_LAYOUT.filter((p) => p.status === 'Available').length;
  const reservedCount = SAMPLE_LAYOUT.filter((p) => p.status === 'Reserved').length;
  const soldCount = SAMPLE_LAYOUT.filter((p) => p.status === 'Sold').length;

  return (
    <section className="py-16 sm:py-20 bg-white border-y border-[#DADDD5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div className="max-w-2xl">
            <div className="inline-flex items-center space-x-1.5 text-xs font-extrabold uppercase tracking-wider text-[#668F35] bg-[#EBF2DE] px-3.5 py-1 rounded-full border border-[#D5E3C3] mb-2">
              <ShieldCheck className="w-4 h-4 text-[#668F35]" />
              <span>3-Level Geographic Land Explorer</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#1F271B] tracking-tight">
              Interactive Plotted Layout &amp; Location Map
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 mt-2">
              Navigate from Tamil Nadu state level down to Thoothukudi growth corridors, and zoom directly into individual approved layout site plans with real boundaries and live plot availability.
            </p>
          </div>

          {/* 3-Level Switcher Tabs */}
          <div className="flex items-center p-1.5 bg-[#F4F5F0] rounded-2xl border border-[#DADDD5] shrink-0">
            <button
              onClick={() => setMapLevel('level1')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                mapLevel === 'level1'
                  ? 'bg-[#1C2618] text-[#B7E436] shadow-xs'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Level 1: Tamil Nadu
            </button>
            <button
              onClick={() => setMapLevel('level2')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                mapLevel === 'level2'
                  ? 'bg-[#1C2618] text-[#B7E436] shadow-xs'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Level 2: Thoothukudi District
            </button>
            <button
              onClick={() => setMapLevel('level3')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                mapLevel === 'level3'
                  ? 'bg-[#1C2618] text-[#B7E436] shadow-xs'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Level 3: Layout Site Plan
            </button>
          </div>
        </div>

        {/* ================= LEVEL 1: TAMIL NADU STATE MAP ================= */}
        {mapLevel === 'level1' && (
          <div className="bg-[#F4F5F0] rounded-3xl p-6 sm:p-8 border border-[#DADDD5] shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs uppercase font-extrabold text-[#668F35] tracking-wider">
                Geographic Level 1 &bull; State Overview
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-[#1F271B]">
                Tamil Nadu &bull; Thoothukudi Strategic Coastal District
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Located on the south-eastern coast of Tamil Nadu along the Gulf of Mannar, Thoothukudi is known as the &quot;Pearl City&quot; and is one of India&apos;s leading maritime, energy, and commercial logistics powerhouses.
              </p>
              <div className="grid grid-cols-2 gap-3 text-xs pt-2">
                <div className="p-3 bg-white rounded-xl border border-gray-200">
                  <span className="text-gray-400 block text-[10px] uppercase font-bold">District Area</span>
                  <strong className="text-gray-800 text-sm">4,707 km²</strong>
                </div>
                <div className="p-3 bg-white rounded-xl border border-gray-200">
                  <span className="text-gray-400 block text-[10px] uppercase font-bold">Major Deep Port</span>
                  <strong className="text-gray-800 text-sm">V.O.C. Port Trust</strong>
                </div>
                <div className="p-3 bg-white rounded-xl border border-gray-200">
                  <span className="text-gray-400 block text-[10px] uppercase font-bold">Airport</span>
                  <strong className="text-gray-800 text-sm">Vagaikulam (TCR)</strong>
                </div>
                <div className="p-3 bg-white rounded-xl border border-gray-200">
                  <span className="text-gray-400 block text-[10px] uppercase font-bold">Key Arterial Highway</span>
                  <strong className="text-gray-800 text-sm">NH 138 &amp; NH 38</strong>
                </div>
              </div>
              <button
                onClick={() => setMapLevel('level2')}
                className="mt-4 px-6 py-2.5 rounded-full bg-[#B7E436] hover:bg-[#A6D42A] text-[#1C2618] text-xs font-black flex items-center gap-2 transition-all cursor-pointer shadow-xs"
              >
                <span>Zoom into Thoothukudi District Corridors</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Illustrated Tamil Nadu State Map with Thoothukudi Highlight */}
            <div className="lg:col-span-7 bg-[#1C2618] rounded-3xl p-6 relative overflow-hidden text-white min-h-[360px] flex items-center justify-center border border-[#2C3826]">
              <svg className="w-full h-80 max-w-md" viewBox="0 0 400 450" fill="none">
                {/* Simplified Tamil Nadu Coastline & Borders */}
                <path
                  d="M160,30 L220,50 L270,90 L290,140 L280,190 L260,240 L240,290 L220,330 L190,380 L160,420 L130,400 L110,360 L90,300 L80,240 L100,180 L120,110 Z"
                  fill="#2A3A24"
                  stroke="#4E6842"
                  strokeWidth="2"
                />
                {/* Major Districts */}
                <circle cx="270" cy="110" r="4" fill="#88A376" />
                <text x="280" y="115" fill="#88A376" fontSize="11" fontFamily="sans-serif">Chennai</text>

                <circle cx="210" cy="220" r="4" fill="#88A376" />
                <text x="220" y="225" fill="#88A376" fontSize="11" fontFamily="sans-serif">Tiruchirappalli</text>

                <circle cx="180" cy="300" r="4" fill="#88A376" />
                <text x="190" y="305" fill="#88A376" fontSize="11" fontFamily="sans-serif">Madurai</text>

                {/* THOOTHUKUDI DISTRICT HIGHLIGHT */}
                <path
                  d="M170,350 L210,355 L225,385 L195,405 L165,385 Z"
                  fill="#B7E436"
                  fillOpacity="0.8"
                  stroke="#D8FF54"
                  strokeWidth="3"
                  className="animate-pulse cursor-pointer"
                  onClick={() => setMapLevel('level2')}
                />
                <circle cx="210" cy="375" r="5" fill="#1C2618" stroke="#D8FF54" strokeWidth="2" />
                <text x="222" y="375" fill="#D8FF54" fontSize="13" fontWeight="bold" fontFamily="sans-serif">
                  ★ THOOTHUKUDI
                </text>
                <text x="222" y="392" fill="#CAD8BF" fontSize="10" fontFamily="sans-serif">
                  (Click to explore corridors)
                </text>
              </svg>

              <div className="absolute bottom-4 left-4 text-xs font-mono text-gray-400 bg-black/50 px-3 py-1.5 rounded-full border border-white/10">
                Lat: 8°45&apos;N &bull; Long: 78°08&apos;E &bull; Southern Tamil Nadu
              </div>
            </div>
          </div>
        )}

        {/* ================= LEVEL 2: THOOTHUKUDI DISTRICT CORRIDORS ================= */}
        {mapLevel === 'level2' && (
          <div className="bg-[#F4F5F0] rounded-3xl p-6 sm:p-8 border border-[#DADDD5] shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-gray-200">
              <div>
                <span className="text-xs uppercase font-extrabold text-[#668F35] tracking-wider">
                  Geographic Level 2 &bull; District Corridors
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-[#1F271B]">
                  Select a High-Growth Land Corridor in Thoothukudi
                </h3>
              </div>
              <button
                onClick={() => setMapLevel('level3')}
                className="px-4 py-2 rounded-full bg-[#1C2618] hover:bg-black text-[#B7E436] text-xs font-bold flex items-center gap-1.5 transition-colors self-start sm:self-auto cursor-pointer"
              >
                <span>Jump to Pearl Haven Site Plan</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { name: 'Korampallam', desc: 'Collectorate Administrative Corridor', plots: '14 Available', status: 'High Demand' },
                { name: 'Palayamkottai Road', desc: 'NH 138 Four-Lane Highway', plots: '9 Available', status: 'Fast Capital Growth' },
                { name: 'Harbour Bypass Road', desc: 'Port Logistics & Expressway Link', plots: '18 Available', status: 'Rental Yield' },
                { name: 'Tharuvaikulam', desc: 'AP Rajan Garden • Beachside & Turnkey House Construction', plots: '22 Available', status: 'Beach Living' },
                { name: 'Millerpuram', desc: 'City Center & Educational Heartland', plots: '3 Available', status: 'Prime Urban' },
                { name: 'Muthiapuram', desc: 'Port Zone & Thermal Energy Belt', plots: '11 Available', status: 'Industrial Focus' },
                { name: 'Ettayapuram Road', desc: 'New SIPCOT Northern Expansion', plots: '15 Available', status: 'Emerging Hub' }
              ].map((item) => (
                <div
                  key={item.name}
                  onClick={() => {
                    setSelectedCorridor(item.name);
                    setMapLevel('level3');
                  }}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    selectedCorridor === item.name
                      ? 'bg-white border-[#668F35] shadow-md ring-2 ring-[#B7E436]'
                      : 'bg-white border-gray-200 hover:border-[#668F35] hover:shadow-sm'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-extrabold text-sm text-[#1F271B]">{item.name}</span>
                    <span className="px-2 py-0.5 rounded-full bg-[#EBF2DE] text-[#486725] text-[10px] font-bold">
                      {item.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">{item.desc}</p>
                  <div className="mt-3 pt-2 border-t border-gray-100 flex items-center justify-between text-xs">
                    <span className="text-[#668F35] font-bold">{item.plots}</span>
                    <span className="text-gray-400 flex items-center gap-1 font-semibold text-[11px]">
                      View Layout <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= LEVEL 3: INDIVIDUAL PLOTTED LAYOUT SITE PLAN ================= */}
        {mapLevel === 'level3' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Layout Grid Blueprint */}
            <div className="lg:col-span-8 bg-[#F4F5F0] rounded-3xl border border-[#DADDD5] p-5 sm:p-7 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-3 border-b border-gray-200">
                <div>
                  <span className="text-xs uppercase font-extrabold text-[#668F35] tracking-wider">
                    Geographic Level 3 &bull; Project Site-Plan Layer
                  </span>
                  <h3 className="text-lg sm:text-xl font-black text-[#1F271B]">
                    Pearl Haven Layout &bull; Phase 1 Approved Drawing
                  </h3>
                  <div className="text-xs text-gray-500 font-mono">
                    DTCP Approval No. 128/2023 &bull; Korampallam, Thoothukudi
                  </div>
                </div>

                {/* Status Legend */}
                <div className="flex items-center gap-3 text-xs font-bold">
                  <span className="flex items-center gap-1.5 text-gray-700">
                    <span className="w-3 h-3 rounded-full bg-[#B7E436] border border-[#668F35]" />
                    <span>Available ({availableCount})</span>
                  </span>
                  <span className="flex items-center gap-1.5 text-gray-700">
                    <span className="w-3 h-3 rounded-full bg-amber-400 border border-amber-600" />
                    <span>Reserved ({reservedCount})</span>
                  </span>
                  <span className="flex items-center gap-1.5 text-gray-700">
                    <span className="w-3 h-3 rounded-full bg-gray-400 border border-gray-600" />
                    <span>Sold ({soldCount})</span>
                  </span>
                </div>
              </div>

              {/* Approach Blacktop Tar Road */}
              <div className="bg-[#1C2618] text-white text-xs font-bold py-2.5 px-4 rounded-2xl mb-4 text-center flex items-center justify-center space-x-2 border border-[#2C3826]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#B7E436] animate-pulse" />
                <span>40 FT MAIN AVENUE BLACKTOP ROAD (CONNECTS TO DISTRICT COLLECTORATE HIGHWAY)</span>
              </div>

              {/* Numbered Plot Grid matching seller's survey drawing */}
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5 mb-4">
                {SAMPLE_LAYOUT.map((plot) => {
                  const isSelected = selectedPlot.number === plot.number;
                  let bgBadge = 'bg-[#B7E436] text-[#1C2618]';
                  let borderClass = 'border-gray-200';
                  if (plot.status === 'Reserved') {
                    bgBadge = 'bg-amber-400 text-amber-950';
                  } else if (plot.status === 'Sold') {
                    bgBadge = 'bg-gray-300 text-gray-700';
                    borderClass = 'opacity-65';
                  }

                  return (
                    <button
                      key={plot.number}
                      onClick={() => setSelectedPlot(plot)}
                      className={`p-3 rounded-2xl border text-left transition-all relative cursor-pointer ${
                        isSelected
                          ? 'ring-3 ring-[#668F35] shadow-md border-transparent bg-white scale-[1.03]'
                          : `bg-white hover:border-[#668F35] ${borderClass}`
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-black text-[#1F271B]">#{plot.number}</span>
                        <span className={`px-1.5 py-0.5 rounded-md text-[9px] font-black uppercase ${bgBadge}`}>
                          {plot.status[0]}
                        </span>
                      </div>
                      <div className="text-[11px] font-bold text-gray-700 truncate">{plot.cents} Cents</div>
                      <div className="text-[10px] text-gray-400 truncate">{plot.facing}</div>
                    </button>
                  );
                })}
              </div>

              {/* Internal 30ft Blacktop Sub-road */}
              <div className="bg-gray-300 text-gray-800 text-[11px] font-bold py-1.5 px-4 rounded-xl text-center">
                30 FT INTERNAL CROSS TAR ROAD WITH UNDERGROUND DRAINAGE &amp; LED SOLAR LIGHTS
              </div>
            </div>

            {/* Right: Selected Plot Specification Card */}
            <div className="lg:col-span-4 bg-white rounded-3xl border border-[#DADDD5] p-6 shadow-sm sticky top-24 space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs uppercase font-extrabold text-[#668F35] tracking-wider">
                    Plot Specification
                  </span>
                  <h3 className="text-xl font-black text-[#1F271B]">
                    Plot #{selectedPlot.number} Details
                  </h3>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-extrabold uppercase ${
                    selectedPlot.status === 'Available'
                      ? 'bg-[#EBF2DE] text-[#486725] border border-[#D5E3C3]'
                      : selectedPlot.status === 'Reserved'
                      ? 'bg-amber-100 text-amber-800 border border-amber-200'
                      : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  {selectedPlot.status}
                </span>
              </div>

              {/* Details List */}
              <div className="space-y-3 divide-y divide-gray-100 text-xs">
                <div className="flex justify-between items-center pt-2">
                  <span className="text-gray-500 font-medium">Total Area</span>
                  <strong className="text-gray-800 font-bold">{selectedPlot.cents} Cents ({selectedPlot.size})</strong>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className="text-gray-500 font-medium">Facing / Orientation</span>
                  <strong className="text-gray-800 font-bold">{selectedPlot.facing} Facing</strong>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className="text-gray-500 font-medium">Approach Road</span>
                  <strong className="text-gray-800 font-bold">40 ft Blacktop Tar Road</strong>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className="text-gray-500 font-medium">Sweet Groundwater</span>
                  <strong className="text-emerald-700 font-bold">Tested at 35 ft</strong>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className="text-gray-500 font-medium">Legal Document</span>
                  <strong className="text-gray-800 font-bold">Individual Patta Ready</strong>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className="text-gray-500 font-medium">Total Indicative Price</span>
                  <strong className="text-base font-black text-[#1F271B]">{selectedPlot.price}</strong>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 space-y-2">
                {selectedPlot.status === 'Available' ? (
                  <>
                    <a
                      href={`https://wa.me/919842155678?text=Hello%20Plot%20For%20Thoothukudi,%20I%20am%20interested%20in%20Plot%20%23${selectedPlot.number}%20in%20Pearl%20Haven%20Layout%20(${selectedPlot.cents}%20Cents,%20${selectedPlot.price}).`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 rounded-2xl bg-[#B7E436] hover:bg-[#A6D42A] text-[#1C2618] text-xs font-black transition-all flex items-center justify-center space-x-2 shadow-xs cursor-pointer"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Enquire on WhatsApp</span>
                    </a>

                    <Link
                      href="/contact"
                      className="w-full py-2.5 rounded-2xl bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold transition-all flex items-center justify-center space-x-2"
                    >
                      <CalendarCheck className="w-4 h-4 text-[#668F35]" />
                      <span>Book Free Site Inspection</span>
                    </Link>
                  </>
                ) : (
                  <div className="p-3 bg-gray-50 rounded-2xl border border-gray-200 text-center text-xs text-gray-500">
                    This plot is currently marked as <strong>{selectedPlot.status}</strong>. Explore adjacent available plots #{SAMPLE_LAYOUT.find((p) => p.status === 'Available')?.number}.
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
