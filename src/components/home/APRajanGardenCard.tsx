'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Waves,
  MapPin,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Building,
  Home,
  Banknote,
  PhoneCall,
  MessageSquare,
  Bus,
  Compass,
  Layers,
  ChevronRight,
  Clock,
  ArrowRight,
  Palmtree,
  CalendarCheck
} from 'lucide-react';

export default function APRajanGardenCard() {
  const [activeTab, setActiveTab] = useState<'layout' | 'construction' | 'completed'>('layout');

  const galleryTabs = [
    {
      id: 'layout' as const,
      label: 'Layout & Drone Masterplan',
      image: '/images/ap-rajan-garden-layout.jpg',
      caption: 'Aerial Masterplan of AP Rajan Garden layout with grand entrance arch, 33ft asphalt tar roads & coastal sea view.'
    },
    {
      id: 'construction' as const,
      label: 'Plot + House Construction In-Progress',
      image: '/images/plot-house-construction.jpg',
      caption: 'Turnkey house construction on demarcated Plot #18 with on-site architects, concrete framing & boundary stones.'
    },
    {
      id: 'completed' as const,
      label: 'Model Coastal Villa Preview',
      image: '/images/completed-model-villa.jpg',
      caption: 'Completed 2-storey contemporary coastal villa with paved driveway, coconut landscape & gated security.'
    }
  ];

  const currentMedia = galleryTabs.find((t) => t.id === activeTab) || galleryTabs[0];

  return (
    <section className="py-12 sm:py-16 bg-[#F4F5F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Card Container */}
        <div className="bg-white rounded-3xl border border-[#DADDD5] shadow-xl overflow-hidden">
          {/* Header Strip with Glowing Badge */}
          <div className="bg-[#142016] text-white px-6 sm:px-10 py-5 border-b border-[#253527] flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <span className="p-2 rounded-2xl bg-[#B7E436]/20 border border-[#B7E436]/40 text-[#D8FF54]">
                <Palmtree className="w-6 h-6" />
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] sm:text-xs font-black tracking-widest uppercase text-[#B7E436] bg-[#B7E436]/10 px-2.5 py-0.5 rounded-full border border-[#B7E436]/30">
                    FEATURED TOWNSHIP &amp; CONSTRUCTOR
                  </span>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-cyan-300 bg-cyan-950/80 px-2.5 py-0.5 rounded-full border border-cyan-800">
                    <Waves className="w-3 h-3" />
                    <span>Few Mins Walk to Beach</span>
                  </span>
                </div>
                <h2 className="text-xl sm:text-3xl font-black text-white tracking-tight mt-1">
                  AP RAJAN GARDEN
                </h2>
                <p className="text-xs sm:text-sm text-gray-300 font-medium">
                  Premium Residential Plots &amp; Turnkey House Construction &bull; Tharuvaikulam, Thoothukudi
                </p>
              </div>
            </div>

            {/* Quick Action Badges */}
            <div className="flex items-center gap-2">
              <a
                href="https://wa.me/919842155678?text=Hello%20AP%20Rajan%20Garden,%20I%20am%20interested%20in%20beachside%20plots%20and%20house%20construction%20packages%20in%20Tharuvaikulam."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold transition-all shadow-md"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Enquiry</span>
              </a>
              <a
                href="tel:+919842155678"
                className="inline-flex items-center space-x-1.5 px-4 py-2.5 rounded-xl bg-[#B7E436] hover:bg-[#A6D42A] text-[#142016] text-xs font-black transition-all shadow-md"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Call Builder</span>
              </a>
            </div>
          </div>

          {/* Interactive Visual Showcase */}
          <div className="p-6 sm:p-10 space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Multi-Tab Image Gallery (7 Cols) */}
              <div className="lg:col-span-7 space-y-3">
                {/* Image Switcher Tabs */}
                <div className="flex flex-wrap gap-2">
                  {galleryTabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        activeTab === tab.id
                          ? 'bg-[#142016] text-[#B7E436] shadow-xs'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Main Large Visual Frame */}
                <div className="relative h-72 sm:h-96 w-full rounded-2xl overflow-hidden border border-[#DADDD5] shadow-sm bg-gray-900 group">
                  <Image
                    src={currentMedia.image}
                    alt={currentMedia.caption}
                    fill
                    priority
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="text-[10px] font-bold text-[#B7E436] uppercase tracking-wider block">
                      Authentic Thoothukudi Project Photography
                    </span>
                    <p className="text-xs sm:text-sm font-medium text-gray-200 leading-snug">
                      {currentMedia.caption}
                    </p>
                  </div>
                </div>

                {/* Tagline Banner */}
                <div className="p-4 rounded-2xl bg-[#EBF2DE] border border-[#D5E3C3] flex items-center justify-between">
                  <div className="flex items-center space-x-2.5">
                    <Sparkles className="w-5 h-5 text-[#668F35] flex-shrink-0" />
                    <span className="text-xs sm:text-sm font-black text-[#1F271B]">
                      ✨ YOUR DREAM PLOT + YOUR DREAM HOME – ALL IN ONE PLACE!
                    </span>
                  </div>
                  <span className="hidden sm:inline-block text-[11px] font-bold text-[#668F35]">
                    🌴 Your Plot. Your Home. Your Future! 🏡
                  </span>
                </div>
              </div>

              {/* Right Column: Key Details & Special Financing (5 Cols) */}
              <div className="lg:col-span-5 space-y-4">
                {/* 90% Loan Financing Box */}
                <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-300 shadow-sm relative overflow-hidden">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-amber-800 bg-amber-200/80 px-2 py-0.5 rounded-md">
                        <Banknote className="w-3.5 h-3.5" />
                        <span>SPECIAL FINANCING OPPORTUNITY</span>
                      </span>
                      <h4 className="text-xl font-black text-[#7A3600] mt-1.5 leading-tight">
                        🔥 UP TO 90% LOAN FINANCING MAY BE AVAILABLE! 🔥
                      </h4>
                    </div>
                  </div>
                  <p className="text-xs text-gray-700 mt-2 font-medium leading-relaxed">
                    Explore composite bank financing options for plot purchase and house construction together. Build your dream home with low initial down payment!
                  </p>
                  <p className="text-[10px] text-gray-500 mt-2 italic">
                    📌 Loan percentage, CIBIL requirements, and eligibility are subject to bank/financing institution approval and terms.
                  </p>
                </div>

                {/* Plot + Construction Highlights */}
                <div className="p-5 rounded-2xl bg-[#FAFBF9] border border-gray-200 space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-gray-200">
                    <h4 className="text-xs font-black uppercase tracking-wider text-[#1F271B] flex items-center gap-1.5">
                      <Home className="w-4 h-4 text-[#668F35]" />
                      <span>PLOT + HOUSE CONSTRUCTION FACILITY</span>
                    </h4>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                      Turnkey Solution
                    </span>
                  </div>

                  <ul className="space-y-2 text-xs text-gray-700">
                    <li className="flex items-center space-x-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#668F35] flex-shrink-0" />
                      <span><strong>Buy Your Plot &amp; Build Your Dream Home:</strong> Zero hassle dual facility.</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#668F35] flex-shrink-0" />
                      <span><strong>Customized House Plans:</strong> Tailored 2BHK, 3BHK &amp; Villa architectural drawings.</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#668F35] flex-shrink-0" />
                      <span><strong>Basic, Premium &amp; Luxury Options:</strong> Choose finishes tailored to your budget.</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#668F35] flex-shrink-0" />
                      <span><strong>Complete Construction Assistance:</strong> From foundation &amp; slab to final key handover.</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#668F35] flex-shrink-0" />
                      <span><strong>Guidance on Plot &amp; Construction Financing:</strong> Pre-approved tie-ups.</span>
                    </li>
                  </ul>
                </div>

                {/* Quick Availability Badge */}
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-gray-50 border border-gray-200 text-xs">
                  <div>
                    <span className="font-bold text-[#1F271B] block">📢 Limited Plots Available</span>
                    <span className="text-gray-500 text-[11px]">Multiple plot dimensions (800 – 2400 sq.ft)</span>
                  </div>
                  <Link
                    href="/projects"
                    className="px-3 py-1.5 rounded-lg bg-[#142016] hover:bg-[#203123] text-[#B7E436] font-bold text-xs flex items-center gap-1 transition-colors"
                  >
                    <span>View Layout Plots</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Bottom 2-Grid: Location Advantages & Premium Amenities */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-200">
              {/* Grid 1: Prime Location Advantages */}
              <div className="p-6 rounded-2xl bg-[#FAFBF9] border border-gray-200 space-y-3.5">
                <div className="flex items-center space-x-2 pb-2 border-b border-gray-200">
                  <Compass className="w-5 h-5 text-[#668F35]" />
                  <h3 className="text-sm font-black uppercase tracking-wider text-[#1F271B]">
                    🌟 PRIME LOCATION ADVANTAGES — THARUVAIKULAM
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-gray-700">
                  <div className="flex items-center space-x-2 p-2 rounded-xl bg-white border border-gray-100">
                    <Waves className="w-4 h-4 text-cyan-600 flex-shrink-0" />
                    <span className="font-semibold">Walking Distance to the Beach</span>
                  </div>
                  <div className="flex items-center space-x-2 p-2 rounded-xl bg-white border border-gray-100">
                    <MapPin className="w-4 h-4 text-[#668F35] flex-shrink-0" />
                    <span className="font-semibold">Near ECR Main Road</span>
                  </div>
                  <div className="flex items-center space-x-2 p-2 rounded-xl bg-white border border-gray-100">
                    <Bus className="w-4 h-4 text-blue-600 flex-shrink-0" />
                    <span>24-Hour Bus Service in Area</span>
                  </div>
                  <div className="flex items-center space-x-2 p-2 rounded-xl bg-white border border-gray-100">
                    <Building className="w-4 h-4 text-purple-600 flex-shrink-0" />
                    <span>Near Resorts &amp; Tourist Spots</span>
                  </div>
                  <div className="flex items-center space-x-2 p-2 rounded-xl bg-white border border-gray-100">
                    <CheckCircle2 className="w-4 h-4 text-[#668F35] flex-shrink-0" />
                    <span>Near Churches &amp; Temples</span>
                  </div>
                  <div className="flex items-center space-x-2 p-2 rounded-xl bg-white border border-gray-100">
                    <Palmtree className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>Near 53-Acre Tourism Hub</span>
                  </div>
                </div>
              </div>

              {/* Grid 2: Premium Amenities */}
              <div className="p-6 rounded-2xl bg-[#FAFBF9] border border-gray-200 space-y-3.5">
                <div className="flex items-center space-x-2 pb-2 border-b border-gray-200">
                  <ShieldCheck className="w-5 h-5 text-[#668F35]" />
                  <h3 className="text-sm font-black uppercase tracking-wider text-[#1F271B]">
                    🏡 PREMIUM AMENITIES &amp; INFRASTRUCTURE
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-gray-700">
                  <div className="flex items-center space-x-2 p-2 rounded-xl bg-white border border-gray-100">
                    <CheckCircle2 className="w-4 h-4 text-[#668F35] flex-shrink-0" />
                    <span className="font-semibold">Gated Layout Community</span>
                  </div>
                  <div className="flex items-center space-x-2 p-2 rounded-xl bg-white border border-gray-100">
                    <ShieldCheck className="w-4 h-4 text-[#668F35] flex-shrink-0" />
                    <span className="font-semibold">24-Hour Security Service</span>
                  </div>
                  <div className="flex items-center space-x-2 p-2 rounded-xl bg-white border border-gray-100">
                    <Palmtree className="w-4 h-4 text-[#668F35] flex-shrink-0" />
                    <span>Garden Maintenance</span>
                  </div>
                  <div className="flex items-center space-x-2 p-2 rounded-xl bg-white border border-gray-100">
                    <Waves className="w-4 h-4 text-blue-500 flex-shrink-0" />
                    <span>Water Line Along Layout Roads</span>
                  </div>
                  <div className="flex items-center space-x-2 p-2 rounded-xl bg-white border border-gray-100">
                    <Home className="w-4 h-4 text-[#668F35] flex-shrink-0" />
                    <span>Individual Water Tank Provision</span>
                  </div>
                  <div className="flex items-center space-x-2 p-2 rounded-xl bg-white border border-gray-100">
                    <Layers className="w-4 h-4 text-[#668F35] flex-shrink-0" />
                    <span>Multiple Plot Sizes (Cents &amp; Sq.ft)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Callout Banner & Action Buttons */}
            <div className="bg-[#142016] rounded-2xl p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 border border-[#253527]">
              <div>
                <span className="text-xs uppercase font-extrabold text-[#B7E436] tracking-wider block">
                  💚 WHY WAIT? MAKE YOUR DREAM HOME A REALITY!
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
                  Book Your Free Physical Site Visit to AP Rajan Garden Today
                </h3>
                <p className="text-xs sm:text-sm text-gray-300 mt-1">
                  Direct builder pricing, customized architectural house floor plans, and comprehensive bank loan eligibility check.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <a
                  href="https://wa.me/919842155678?text=Hello%20AP%20Rajan%20Garden,%20I%20want%20to%20book%20a%20site%20visit%20for%20Tharuvaikulam%20plots."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 rounded-xl bg-[#B7E436] hover:bg-[#A6D42A] text-[#142016] font-black text-xs transition-all shadow-md flex items-center space-x-1.5"
                >
                  <CalendarCheck className="w-4 h-4" />
                  <span>Book Site Visit Now</span>
                </a>

                <a
                  href="tel:+919842155678"
                  className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs transition-all flex items-center space-x-1.5"
                >
                  <PhoneCall className="w-4 h-4 text-[#B7E436]" />
                  <span>+91 98421 55678</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
