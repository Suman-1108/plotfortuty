'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { MapPin, Compass, ShieldCheck, ArrowRight, MessageSquare } from 'lucide-react';
import { Plot } from '@/lib/types';

interface PlotCardProps {
  plot: Plot;
}

export default function PlotCard({ plot }: PlotCardProps) {
  const router = useRouter();

  const whatsappUrl = `https://wa.me/919443152633?text=${encodeURIComponent(
    `Hello Plot 4 Tuty, I am interested in: ${plot.title} (${plot.layoutPlotNumber}) located at ${plot.location}. Price: ${plot.priceDisplay}. Please share complete layout plan and title deeds.`
  )}`;

  const handleCardClick = (e: React.MouseEvent) => {
    // If the click happened on the WhatsApp button or any link, allow its default action
    const target = e.target as HTMLElement;
    if (target.closest('a[href^="https://wa.me"]')) {
      return;
    }
    router.push(`/plots/${plot.slug}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className="group bg-white rounded-2xl border border-[#DADDD5] overflow-hidden editorial-shadow hover:shadow-xl hover:border-[#668F35] hover:-translate-y-1 active:scale-[0.99] transition-all duration-300 flex flex-col h-full cursor-pointer select-none"
      title={`Click anywhere to view full details for ${plot.title}`}
    >
      {/* Property Image Container */}
      <div className="relative aspect-land w-full bg-[#EAECE4] overflow-hidden pointer-events-none">
        <Image
          src={plot.images[0] || '/images/real_estate.png'}
          alt={plot.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <span className="inline-flex items-center space-x-1 px-2.5 py-1 text-xs font-semibold bg-white/95 backdrop-blur-sm text-[#222222] rounded-full border border-[#DADDD5] shadow-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-[#668F35]" />
            <span>{plot.approval}</span>
          </span>

          <span
            className={`px-2.5 py-1 text-xs font-bold rounded-full shadow-xs uppercase tracking-wider ${
              plot.status === 'Available'
                ? 'bg-[#668F35] text-white'
                : plot.status === 'Fast Selling'
                ? 'bg-[#B45309] text-white'
                : plot.status === 'Reserved'
                ? 'bg-[#1D4ED8] text-white'
                : 'bg-gray-600 text-white'
            }`}
          >
            {plot.status}
          </span>
        </div>

        {/* Plot Number Pill */}
        <div className="absolute bottom-3 left-3 bg-[#1F271B]/90 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-md font-medium">
          {plot.layoutPlotNumber} • {plot.project}
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Location */}
          <div className="flex items-center space-x-1.5 text-xs text-[#666A5D] mb-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#668F35] shrink-0" />
            <span className="font-medium text-[#222222]">{plot.location}</span>
            <span>• Thoothukudi</span>
          </div>

          {/* Title */}
          <h3 className="text-base sm:text-lg font-extrabold text-[#222222] group-hover:text-[#668F35] transition-colors line-clamp-1 mb-2">
            {plot.title}
          </h3>

          {/* Key Metric Pills */}
          <div className="grid grid-cols-2 gap-2 py-3 border-y border-[#DADDD5]/80 text-xs text-[#55594D] my-3 bg-[#F4F5F0]/60 rounded-xl p-2.5">
            <div>
              <span className="block text-[11px] text-[#666A5D]">Plot Area</span>
              <span className="font-bold text-[#222222]">
                {plot.areaCents} Cents <span className="font-normal text-gray-500">({plot.areaSqFt} sq.ft)</span>
              </span>
            </div>
            <div>
              <span className="block text-[11px] text-[#666A5D]">Facing &amp; Road</span>
              <span className="font-bold text-[#222222] flex items-center space-x-1">
                <Compass className="w-3 h-3 text-[#668F35]" />
                <span>{plot.facing} • {plot.roadWidth?.split(' ')[0]} ft</span>
              </span>
            </div>
          </div>
        </div>

        {/* Pricing & Actions */}
        <div className="pt-2">
          <div className="flex items-baseline justify-between mb-3">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-[#666A5D] font-bold block">Price</span>
              <span className="text-xl font-black text-[#1F271B]">{plot.priceDisplay}</span>
            </div>
            <div className="text-right">
              <span className="text-xs font-semibold text-[#666A5D]">₹{plot.pricePerSqFt?.toLocaleString('en-IN')} / sq.ft</span>
              <span className="text-[11px] text-[#668F35] block font-bold">Clear Title</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center justify-center space-x-1.5 py-2.5 px-3 text-xs font-bold rounded-xl bg-white text-[#222222] border border-[#DADDD5] hover:border-[#668F35] hover:bg-[#EDF3E4] transition-all shadow-2xs z-10"
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#668F35]" />
              <span>WhatsApp</span>
            </a>

            <div className="inline-flex items-center justify-center space-x-1 py-2.5 px-3 text-xs font-bold rounded-xl bg-[#1F271B] group-hover:bg-[#668F35] text-white transition-all shadow-xs">
              <span>View Details</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
