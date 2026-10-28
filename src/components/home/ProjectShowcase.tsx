import Image from 'next/image';
import Link from 'next/link';
import { Project } from '@/lib/types';
import { Anchor, Trees, ArrowRight, ShieldCheck, MapPin } from 'lucide-react';

interface ProjectShowcaseProps {
  projects: Project[];
}

export default function ProjectShowcase({ projects }: ProjectShowcaseProps) {
  return (
    <section className="py-14 sm:py-20 bg-[#F4F5F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Asymmetric 3-Card Block (matching "Tour Packages" in reference screenshot) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {/* Card 1: Solid Tinted Editorial Card (matching the blue-grey solid card in screenshot) */}
          <div className="bg-[#8A9A86]/40 border border-[#8A9A86]/60 rounded-3xl p-8 flex flex-col justify-between editorial-shadow min-h-[380px]">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-[#53752A] font-bold block mb-2">
                Curated Townships
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#222222] tracking-tight">
                Plotted Layout Packages
              </h2>
              <p className="text-xs sm:text-sm text-[#55594D] mt-3 leading-relaxed">
                Affordable, 100% DTCP-approved, and unencumbered residential plots engineered for generational living in Thoothukudi.
              </p>
            </div>

            <div className="pt-6">
              <Link
                href="/projects"
                className="inline-block px-6 py-2.5 rounded-full bg-[#222222] hover:bg-[#668F35] text-white text-xs font-bold transition-all shadow-sm"
              >
                Browse all projects
              </Link>
            </div>
          </div>

          {/* Card 2: Harbour Enclave Phase 1 (Featured prominently as requested!) */}
          <Link
            href="/projects#harbour-enclave-phase-1"
            className="group relative rounded-3xl overflow-hidden border border-[#DADDD5] min-h-[380px] flex flex-col justify-between p-6 editorial-shadow"
          >
            <Image
              src="/images/product_land3.png"
              alt="Harbour Enclave Phase 1 Plotted Community"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/35"></div>

            {/* Circular Category Badge (matching boat icon in reference) */}
            <div className="relative z-10">
              <div className="w-10 h-10 rounded-full bg-white/30 backdrop-blur-md border border-white/40 flex items-center justify-center text-white">
                <Anchor className="w-5 h-5 text-white" />
              </div>
            </div>

            {/* Overlay Details */}
            <div className="relative z-10 text-white space-y-1.5">
              <span className="text-[10px] uppercase font-bold text-[#EDF3E4] tracking-wider block">
                Coastal Port Enclave
              </span>
              <h3 className="text-xl font-bold group-hover:text-[#EDF3E4] transition-colors">
                Harbour Enclave Phase 1
              </h3>
              <p className="text-xs text-gray-200 line-clamp-2 leading-relaxed">
                Coastal residential plots along Harbour Bypass with 30ft blacktop tar roads, sweet groundwater, and minutes to VOC Port.
              </p>
              <div className="pt-2 text-xs font-semibold text-[#668F35] flex items-center space-x-1">
                <span>Starts at ₹18.0 L</span>
                <span>•</span>
                <span className="text-white">11 Plots Left</span>
              </div>
            </div>
          </Link>

          {/* Card 3: Pearl Haven Layout (Executive Villa Plots) */}
          <Link
            href="/projects#pearl-haven-layout"
            className="group relative rounded-3xl overflow-hidden border border-[#DADDD5] min-h-[380px] flex flex-col justify-between p-6 editorial-shadow"
          >
            <Image
              src="/images/product_land1.png"
              alt="Pearl Haven Layout Executive Plots"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/35"></div>

            {/* Circular Category Badge (matching mountain hiker icon in reference) */}
            <div className="relative z-10">
              <div className="w-10 h-10 rounded-full bg-white/30 backdrop-blur-md border border-white/40 flex items-center justify-center text-white">
                <Trees className="w-5 h-5 text-white" />
              </div>
            </div>

            {/* Overlay Details */}
            <div className="relative z-10 text-white space-y-1.5">
              <span className="text-[10px] uppercase font-bold text-[#EDF3E4] tracking-wider block">
                Opposite Collectorate
              </span>
              <h3 className="text-xl font-bold group-hover:text-[#EDF3E4] transition-colors">
                Pearl Haven Villa Plots
              </h3>
              <p className="text-xs text-gray-200 line-clamp-2 leading-relaxed">
                40ft avenue tar roads, underground stormwater drainage, avenue tree plantation, and instant individual patta handover.
              </p>
              <div className="pt-2 text-xs font-semibold text-[#668F35] flex items-center space-x-1">
                <span>Starts at ₹22.5 L</span>
                <span>•</span>
                <span className="text-white">14 Plots Left</span>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
