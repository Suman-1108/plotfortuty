'use client';

import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Compass, ShieldCheck, ArrowRight, MessageSquare, Maximize2 } from 'lucide-react';
import { Plot } from '@/lib/types';

interface PlotCardProps {
  plot: Plot;
}

export default function PlotCard({ plot }: PlotCardProps) {
  const whatsappUrl = `https://wa.me/919842155678?text=${encodeURIComponent(
    `Hello Plot 4 Tuty, I am interested in: ${plot.title} (${plot.layoutPlotNumber}) located at ${plot.location}. Please share complete layout plan and price breakdown.`
  )}`;

  return (
    <div className="group bg-white rounded-lg border border-[#DADDD5] overflow-hidden editorial-shadow hover:shadow-md transition-all duration-300 flex flex-col h-full">
      {/* Property Image Container */}
      <div className="relative aspect-land w-full bg-[#EAECE4] overflow-hidden">
        <Image
          src={plot.images[0] || '/images/real_estate.png'}
          alt={plot.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <span className="inline-flex items-center space-x-1 px-2.5 py-1 text-xs font-semibold bg-white/95 backdrop-blur-sm text-[#222222] rounded border border-[#DADDD5] shadow-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-[#668F35]" />
            <span>{plot.approval}</span>
          </span>

          <span
            className={`px-2.5 py-1 text-xs font-semibold rounded shadow-xs uppercase tracking-wider ${
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
        <div className="absolute bottom-3 left-3 bg-[#222222]/90 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded font-medium">
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
          <Link href={`/plots/${plot.slug}`} className="block">
            <h3 className="text-base sm:text-lg font-semibold text-[#222222] group-hover:text-[#668F35] transition-colors line-clamp-1 mb-2">
              {plot.title}
            </h3>
          </Link>

          {/* Key Metric Pills */}
          <div className="grid grid-cols-2 gap-2 py-3 border-y border-[#DADDD5]/80 text-xs text-[#55594D] my-3 bg-[#F4F5F0]/60 rounded p-2">
            <div>
              <span className="block text-[11px] text-[#666A5D]">Plot Area</span>
              <span className="font-semibold text-[#222222]">
                {plot.areaCents} Cents <span className="font-normal text-gray-500">({plot.areaSqFt} sq.ft)</span>
              </span>
            </div>
            <div>
              <span className="block text-[11px] text-[#666A5D]">Facing & Road</span>
              <span className="font-semibold text-[#222222] flex items-center space-x-1">
                <Compass className="w-3 h-3 text-[#668F35]" />
                <span>{plot.facing} • {plot.roadWidth.split(' ')[0]} ft</span>
              </span>
            </div>
          </div>
        </div>

        {/* Pricing & Actions */}
        <div className="pt-2">
          <div className="flex items-baseline justify-between mb-3">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-[#666A5D] block">Price</span>
              <span className="text-xl font-bold text-[#222222]">{plot.priceDisplay}</span>
            </div>
            <div className="text-right">
              <span className="text-xs text-[#666A5D]">₹{plot.pricePerSqFt} / sq.ft</span>
              <span className="text-[11px] text-[#668F35] block font-medium">Clear Title</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center space-x-1.5 py-2 px-3 text-xs font-semibold rounded bg-white text-[#222222] border border-[#DADDD5] hover:border-[#668F35] hover:bg-[#EDF3E4] transition-all"
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#668F35]" />
              <span>WhatsApp</span>
            </a>

            <Link
              href={`/plots/${plot.slug}`}
              className="inline-flex items-center justify-center space-x-1 py-2 px-3 text-xs font-semibold rounded bg-[#222222] hover:bg-[#668F35] text-white transition-all"
            >
              <span>View Details</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
