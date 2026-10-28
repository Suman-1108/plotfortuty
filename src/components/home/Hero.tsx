'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Search,
  MapPin,
  Check,
  ShieldCheck,
  Layers,
  Sparkles,
  ArrowRight,
  IndianRupee,
  Compass,
  Building2,
  PhoneCall
} from 'lucide-react';

export default function Hero() {
  const router = useRouter();
  const [activeType, setActiveType] = useState<'buy' | 'gated' | 'villa' | 'commercial'>('buy');
  const [corridor, setCorridor] = useState('all');
  const [budget, setBudget] = useState('all');
  const [plotSize, setPlotSize] = useState('all');
  const [facing, setFacing] = useState('all');
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (corridor !== 'all') params.set('location', corridor);
    if (budget !== 'all') params.set('budgetRange', budget);
    if (plotSize !== 'all') params.set('plotSize', plotSize);
    if (facing !== 'all') params.set('facing', facing);
    if (query.trim()) params.set('q', query.trim());
    router.push(params.toString() ? `/plots?${params.toString()}` : '/plots');
  };

  const handleQuickTag = (tag: string, type: 'location' | 'budget' = 'location') => {
    if (type === 'budget') {
      router.push(`/plots?budgetRange=${encodeURIComponent(tag)}`);
    } else {
      setCorridor(tag);
      router.push(`/plots?location=${encodeURIComponent(tag)}`);
    }
  };

  return (
    <section
      suppressHydrationWarning
      className="relative w-full overflow-hidden min-h-[640px] lg:min-h-[720px] flex flex-col justify-between"
    >
      {/* 100% Full-Bleed Aerial Photography with real_estate.png */}
      <Image
        src="/images/real_estate.png"
        alt="Aerial masterplanned residential gated layout in Thoothukudi, Tamil Nadu"
        fill
        priority
        sizes="100vw"
        quality={92}
        className="object-cover object-center transform transition-transform duration-1000 ease-out"
      />

      {/* Atmospheric Contrast Overlays - Preserves Sunset Glow while Ensuring High Text Legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0e160b]/95 via-[#121c0e]/45 to-black/65 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-transparent pointer-events-none" />

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 pb-14 sm:pb-16 flex flex-col justify-between flex-1">
        {/* Top Badges & Live Status Strip */}
        <div className="flex items-center justify-between gap-3 mb-4 sm:mb-6">
          <div className="inline-flex items-center space-x-2.5 px-4 py-1.5 rounded-full bg-black/55 backdrop-blur-md border border-white/20 text-white text-xs font-semibold shadow-lg">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#B7E436] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#B7E436]"></span>
            </span>
            <span className="tracking-widest uppercase text-[11px] font-bold text-white/95">
              PLOT 4 TUTY
            </span>
            <span className="hidden sm:inline-block text-white/30">|</span>
            <span className="hidden sm:inline-block text-[11px] text-[#D8FF54] font-medium">
              Verified Residential Land Marketplace
            </span>
          </div>
        </div>

        {/* Central Hero Body with Headline, Action Buttons & Search */}
        <div className="max-w-3xl my-auto py-4 sm:py-6">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#B7E436]/20 border border-[#B7E436]/40 text-[#D8FF54] text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Actual Land Surveys • 40ft Tar Roads • Clear Individual Patta</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.12] drop-shadow-xl">
            Find Your Perfect Plot in{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#F4F5F0] to-[#D8FF54]">
              Thoothukudi
            </span>
            <span className="text-[#B7E436]">.</span>
          </h1>

          <p className="mt-3 text-xs sm:text-sm md:text-base text-gray-200/90 max-w-2xl leading-relaxed drop-shadow-sm font-normal">
            Browse verified residential land parcels, approved gated layout drawings, and direct seller listings with road dimensions, groundwater depth, and instant legal documentation.
          </p>

          {/* 3 Prominent Quick Action Buttons */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              href="/plots"
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-[#B7E436] hover:bg-[#A6D42A] text-[#1C2618] text-xs sm:text-sm font-extrabold shadow-md hover:shadow-xl transition-all"
            >
              <Search className="w-4 h-4 stroke-[2.5]" />
              <span>Explore Plots</span>
            </Link>

            <Link
              href="/projects"
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-white/20 hover:bg-white/30 text-white border border-white/35 backdrop-blur-md text-xs sm:text-sm font-bold shadow-xs transition-all"
            >
              <Building2 className="w-4 h-4 text-[#D8FF54]" />
              <span>View Layout</span>
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-black/45 hover:bg-black/65 text-white border border-white/25 backdrop-blur-md text-xs sm:text-sm font-bold shadow-xs transition-all"
            >
              <PhoneCall className="w-4 h-4 text-[#B7E436]" />
              <span>Contact Seller</span>
            </Link>
          </div>

          {/* Unified Multi-Criteria Search Engine Bar (Locality, Budget, Size, Facing) */}
          <form
            onSubmit={handleSearch}
            className="mt-6 bg-white/95 backdrop-blur-xl rounded-2xl p-2.5 sm:p-3 border border-white/60 shadow-2xl flex flex-col gap-2.5"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
              {/* 1. Locality / Corridor */}
              <div className="flex items-center space-x-2 px-3 py-2 rounded-xl bg-gray-50 border border-gray-200/80 focus-within:border-[#668F35] focus-within:bg-white transition-all">
                <MapPin className="w-4 h-4 text-[#668F35] shrink-0" />
                <div className="flex-1 min-w-0">
                  <label className="block text-[10px] uppercase font-bold text-gray-500 tracking-wider">
                    Locality
                  </label>
                  <select
                    value={corridor}
                    onChange={(e) => setCorridor(e.target.value)}
                    className="w-full bg-transparent text-xs sm:text-sm font-bold text-[#1F271B] focus:outline-none cursor-pointer truncate"
                  >
                    <option value="all">All Localities</option>
                    <option value="Korampallam">Korampallam (Collectorate)</option>
                    <option value="Harbour Bypass Road">Harbour Bypass Road</option>
                    <option value="Palayamkottai Road">Palayamkottai Rd (NH 138)</option>
                    <option value="Millerpuram">Millerpuram (City Center)</option>
                    <option value="Muthiapuram">Muthiapuram &amp; Port Zone</option>
                    <option value="Ettayapuram Road">Ettayapuram Road</option>
                    <option value="Tharuvaikulam">Tharuvaikulam (Beach &amp; ECR)</option>
                  </select>
                </div>
              </div>

              {/* 2. Budget Range */}
              <div className="flex items-center space-x-2 px-3 py-2 rounded-xl bg-gray-50 border border-gray-200/80 focus-within:border-[#668F35] focus-within:bg-white transition-all">
                <IndianRupee className="w-4 h-4 text-[#668F35] shrink-0" />
                <div className="flex-1 min-w-0">
                  <label className="block text-[10px] uppercase font-bold text-gray-500 tracking-wider">
                    Budget
                  </label>
                  <select
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full bg-transparent text-xs sm:text-sm font-bold text-[#1F271B] focus:outline-none cursor-pointer truncate"
                  >
                    <option value="all">Any Budget</option>
                    <option value="under-15">Under ₹15 Lakhs</option>
                    <option value="15-25">₹15L - ₹25 Lakhs</option>
                    <option value="25-35">₹25L - ₹35 Lakhs</option>
                    <option value="above-35">Above ₹35 Lakhs</option>
                  </select>
                </div>
              </div>

              {/* 3. Plot Size */}
              <div className="flex items-center space-x-2 px-3 py-2 rounded-xl bg-gray-50 border border-gray-200/80 focus-within:border-[#668F35] focus-within:bg-white transition-all">
                <Layers className="w-4 h-4 text-[#668F35] shrink-0" />
                <div className="flex-1 min-w-0">
                  <label className="block text-[10px] uppercase font-bold text-gray-500 tracking-wider">
                    Plot Size
                  </label>
                  <select
                    value={plotSize}
                    onChange={(e) => setPlotSize(e.target.value)}
                    className="w-full bg-transparent text-xs sm:text-sm font-bold text-[#1F271B] focus:outline-none cursor-pointer truncate"
                  >
                    <option value="all">Any Size</option>
                    <option value="under-3-cents">Under 3 Cents (~1,200 sq.ft)</option>
                    <option value="3-5-cents">3 to 5 Cents (~1,800 sq.ft)</option>
                    <option value="above-5-cents">Above 5 Cents (~2,400+ sq.ft)</option>
                  </select>
                </div>
              </div>

              {/* 4. Facing / Orientation */}
              <div className="flex items-center space-x-2 px-3 py-2 rounded-xl bg-gray-50 border border-gray-200/80 focus-within:border-[#668F35] focus-within:bg-white transition-all">
                <Compass className="w-4 h-4 text-[#668F35] shrink-0" />
                <div className="flex-1 min-w-0">
                  <label className="block text-[10px] uppercase font-bold text-gray-500 tracking-wider">
                    Facing
                  </label>
                  <select
                    value={facing}
                    onChange={(e) => setFacing(e.target.value)}
                    className="w-full bg-transparent text-xs sm:text-sm font-bold text-[#1F271B] focus:outline-none cursor-pointer truncate"
                  >
                    <option value="all">Any Facing</option>
                    <option value="North">North Facing</option>
                    <option value="East">East Facing</option>
                    <option value="North-East">North-East Facing</option>
                    <option value="South">South Facing</option>
                    <option value="West">West Facing</option>
                    <option value="Corner">Corner Plot</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Bottom Search Row with Keyword & Action CTA */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-1 border-t border-gray-100">
              <div className="flex-1 flex items-center px-3 py-1.5 bg-gray-50 sm:bg-transparent rounded-xl sm:rounded-none">
                <Search className="w-4 h-4 text-gray-400 mr-2 shrink-0" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Keyword (e.g. 40ft road, sweet water, near bus stand, corner)..."
                  className="w-full bg-transparent text-xs sm:text-sm text-[#1F271B] placeholder-gray-400 focus:outline-none font-medium"
                />
              </div>

              <button
                type="submit"
                className="px-6 py-2.5 sm:py-3 rounded-xl bg-[#B7E436] hover:bg-[#A6D42A] text-[#1C2618] text-xs sm:text-sm font-extrabold transition-all shadow-md hover:shadow-xl flex items-center justify-center space-x-2 shrink-0 cursor-pointer group"
              >
                <span>Search Plots</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </form>

          {/* Quick Filter Tags Row */}
          <div className="mt-3.5 flex flex-wrap items-center gap-2 text-xs text-white/90">
            <span className="text-[11px] text-gray-300 font-semibold flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#B7E436]" /> Trending Localities:
            </span>
            <button
              type="button"
              onClick={() => handleQuickTag('Korampallam')}
              className="px-3 py-1 rounded-full bg-black/45 hover:bg-black/70 border border-white/20 text-[11px] text-white font-medium transition-colors cursor-pointer"
            >
              Korampallam Collectorate
            </button>
            <button
              type="button"
              onClick={() => handleQuickTag('Tharuvaikulam')}
              className="px-3 py-1 rounded-full bg-[#B7E436]/20 hover:bg-[#B7E436]/35 border border-[#B7E436]/50 text-[11px] text-[#D8FF54] font-bold transition-colors cursor-pointer"
            >
              AP Rajan Garden (Beachside)
            </button>
            <button
              type="button"
              onClick={() => handleQuickTag('Harbour Bypass Road')}
              className="px-3 py-1 rounded-full bg-black/45 hover:bg-black/70 border border-white/20 text-[11px] text-white font-medium transition-colors cursor-pointer"
            >
              Harbour Enclave Phase 1
            </button>
            <button
              type="button"
              onClick={() => handleQuickTag('Palayamkottai Road')}
              className="px-3 py-1 rounded-full bg-black/45 hover:bg-black/70 border border-white/20 text-[11px] text-white font-medium transition-colors cursor-pointer"
            >
              Palayamkottai Road (NH 138)
            </button>
            <button
              type="button"
              onClick={() => handleQuickTag('15-25', 'budget')}
              className="px-3 py-1 rounded-full bg-black/45 hover:bg-black/70 border border-[#B7E436]/40 text-[11px] text-[#D8FF54] font-medium transition-colors cursor-pointer"
            >
              Plots Under ₹25L
            </button>
          </div>
        </div>

        {/* Bottom Trust & Feature Highlights Strip */}
        <div className="pt-4 border-t border-white/15 grid grid-cols-2 md:grid-cols-4 gap-4 text-white text-xs">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-black/40 border border-white/20 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4 h-4 text-[#B7E436]" />
            </div>
            <div>
              <div className="font-bold text-white">100% Clear Titles</div>
              <div className="text-[11px] text-gray-300">DTCP &amp; TNRERA Approved</div>
            </div>
          </div>

          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-black/40 border border-white/20 flex items-center justify-center shrink-0">
              <IndianRupee className="w-4 h-4 text-[#B7E436]" />
            </div>
            <div>
              <div className="font-bold text-white">Bank Loan Approved</div>
              <div className="text-[11px] text-gray-300">SBI, HDFC &amp; Axis Ready</div>
            </div>
          </div>

          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-black/40 border border-white/20 flex items-center justify-center shrink-0">
              <Layers className="w-4 h-4 text-[#B7E436]" />
            </div>
            <div>
              <div className="font-bold text-white">40ft Tar Roads</div>
              <div className="text-[11px] text-gray-300">Sweet Water &amp; Electricity</div>
            </div>
          </div>

          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-black/40 border border-white/20 flex items-center justify-center shrink-0">
              <MapPin className="w-4 h-4 text-[#B7E436]" />
            </div>
            <div>
              <div className="font-bold text-white">Free Site Visit</div>
              <div className="text-[11px] text-gray-300">Cab Pickup in Thoothukudi</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
