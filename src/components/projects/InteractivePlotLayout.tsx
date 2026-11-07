'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { Plot } from '@/lib/types';
import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
  CheckCircle2,
  Clock,
  Lock,
  XCircle,
  HelpCircle,
  Eye,
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface InteractivePlotLayoutProps {
  plots: Plot[];
  layoutImageUrl?: string;
  onSelectPlot?: (plot: Plot) => void;
}

export default function InteractivePlotLayout({
  plots,
  layoutImageUrl = '/images/ap-rajan-garden-layout.jpg',
  onSelectPlot
}: InteractivePlotLayoutProps) {
  const [zoom, setZoom] = useState(1);
  const [activeGroup, setActiveGroup] = useState<'All' | 'Group 1' | 'Group 2'>('All');
  const [hoveredPlot, setHoveredPlot] = useState<Plot | null>(null);
  const [selectedPlot, setSelectedPlot] = useState<Plot | null>(plots[1] || plots[0] || null);

  const containerRef = useRef<HTMLDivElement>(null);

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.25, 2.5));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.25, 0.75));
  const handleResetZoom = () => setZoom(1);

  const filteredPlots = plots.filter((p) => {
    if (activeGroup === 'All') return true;
    return p.layoutGroup === activeGroup;
  });

  const getStatusColor = (status: Plot['status']) => {
    switch (status) {
      case 'Available':
      case 'Fast Selling':
        return 'bg-emerald-500 border-emerald-600 text-white';
      case 'Reserved':
        return 'bg-amber-400 border-amber-500 text-amber-950';
      case 'Booked':
        return 'bg-blue-500 border-blue-600 text-white';
      case 'Sold':
        return 'bg-red-500 border-red-600 text-white';
      default:
        return 'bg-gray-400 border-gray-500 text-white';
    }
  };

  const getStatusDot = (status: Plot['status']) => {
    switch (status) {
      case 'Available':
      case 'Fast Selling':
        return 'bg-emerald-500';
      case 'Reserved':
        return 'bg-amber-400';
      case 'Booked':
        return 'bg-blue-500';
      case 'Sold':
        return 'bg-red-500';
      default:
        return 'bg-gray-400';
    }
  };

  const handlePlotClick = (plot: Plot) => {
    setSelectedPlot(plot);
    if (onSelectPlot) {
      onSelectPlot(plot);
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-[#DADDD5] p-5 sm:p-8 shadow-xs space-y-6">
      {/* Header and Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-gray-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-extrabold tracking-wider text-[#668F35] bg-[#EBF2DE] px-3 py-1 rounded-full border border-[#D5E3C3]">
              Approved Masterplan Layout
            </span>
            <span className="text-xs text-gray-400">• 181 Scheduled Entries</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-[#1F271B] mt-1.5">
            Interactive Plot Layout Map
          </h3>
          <p className="text-xs text-gray-500">
            Click any plot unit on the layout or inventory list to inspect exact dimensions, road widths, and pricing.
          </p>
        </div>

        {/* Layout Phase Group Selector */}
        <div className="flex items-center gap-1.5 p-1 bg-gray-100 rounded-2xl shrink-0">
          {(['All', 'Group 1', 'Group 2'] as const).map((group) => (
            <button
              key={group}
              onClick={() => setActiveGroup(group)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeGroup === group
                  ? 'bg-white text-[#1F271B] shadow-xs'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              {group === 'Group 1' ? 'Group 1 (145 Plots)' : group === 'Group 2' ? 'Group 2 (36 Plots)' : 'All 181 Plots'}
            </button>
          ))}
        </div>
      </div>

      {/* Status Legend Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#F8F9F6] p-3.5 rounded-2xl border border-gray-200 text-xs">
        <div className="flex flex-wrap items-center gap-4">
          <span className="font-bold text-gray-600">Availability Status:</span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
            <span className="font-semibold text-gray-700">Available (Green)</span>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-amber-400"></span>
            <span className="font-semibold text-gray-700">Reserved (Yellow)</span>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-blue-500"></span>
            <span className="font-semibold text-gray-700">Booked (Blue)</span>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500"></span>
            <span className="font-semibold text-gray-700">Sold (Red)</span>
          </span>
        </div>

        {/* Zoom Tool Buttons */}
        <div className="flex items-center gap-1">
          <button
            onClick={handleZoomIn}
            className="p-1.5 rounded-lg bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 shadow-2xs"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={handleZoomOut}
            className="p-1.5 rounded-lg bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 shadow-2xs"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={handleResetZoom}
            className="p-1.5 rounded-lg bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 shadow-2xs"
            title="Reset Zoom"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <span className="text-[11px] font-mono text-gray-500 pl-1">{Math.round(zoom * 100)}%</span>
        </div>
      </div>

      {/* Interactive Layout Image Viewer with Overlay */}
      <div
        ref={containerRef}
        className="relative overflow-auto max-h-[560px] rounded-2xl border border-gray-300 bg-gray-900 shadow-inner flex items-center justify-center p-4 cursor-grab"
      >
        <div
          className="relative transition-transform duration-200 origin-center"
          style={{ transform: `scale(${zoom})` }}
        >
          {/* Base Layout Drawing */}
          <div className="relative w-[960px] h-[640px] shadow-2xl rounded-xl overflow-hidden bg-white">
            <Image
              src={layoutImageUrl}
              alt="AP Rajan Garden Approved DTCP Layout Plan"
              fill
              className="object-contain"
              priority
            />

            {/* Plot Overlay Grid - Visual clickable indicators for layout entries */}
            <div className="absolute inset-0 p-8 grid grid-cols-12 gap-1.5 opacity-90">
              {filteredPlots.slice(0, 72).map((plot) => {
                const isSelected = selectedPlot?.id === plot.id;
                return (
                  <button
                    key={plot.id}
                    onClick={() => handlePlotClick(plot)}
                    onMouseEnter={() => setHoveredPlot(plot)}
                    onMouseLeave={() => setHoveredPlot(null)}
                    className={`relative p-1 rounded-md border text-[10px] font-mono font-bold transition-all flex flex-col items-center justify-center cursor-pointer ${getStatusColor(
                      plot.status
                    )} ${
                      isSelected
                        ? 'ring-3 ring-black shadow-lg scale-110 z-20'
                        : 'hover:scale-105 hover:z-10'
                    }`}
                    title={`${plot.title} • ${plot.dimensions} • ${plot.status}`}
                  >
                    <span>#{plot.plotNumber}</span>
                    <span className="text-[8px] opacity-80">{plot.areaCents}c</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Hover Floating Tooltip */}
        {hoveredPlot && (
          <div className="absolute bottom-4 left-4 bg-black/90 text-white text-xs p-3 rounded-xl pointer-events-none shadow-xl border border-gray-700 z-30">
            <div className="font-bold">{hoveredPlot.title}</div>
            <div className="text-gray-300 text-[11px] mt-0.5">
              Size: {hoveredPlot.dimensions} ({hoveredPlot.areaCents} Cents / {hoveredPlot.areaSqFt} sq.ft)
            </div>
            <div className="text-emerald-400 font-bold mt-1">
              Price: {hoveredPlot.priceDisplay} • {hoveredPlot.status}
            </div>
          </div>
        )}
      </div>

      {/* Selected Plot Detailed Inspection Drawer Card */}
      {selectedPlot && (
        <div className="bg-[#FAFBF9] rounded-2xl p-5 border border-[#668F35]/30 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${getStatusDot(selectedPlot.status)}`}></span>
              <span className="text-xs font-bold uppercase tracking-wider text-gray-700">
                {selectedPlot.layoutGroup} • Plot #{selectedPlot.plotNumber}
              </span>
              <span
                className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${getStatusColor(
                  selectedPlot.status
                )}`}
              >
                {selectedPlot.status}
              </span>
              {selectedPlot.isCornerPlot && (
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 border border-purple-200">
                  Corner Plot
                </span>
              )}
              {!selectedPlot.isVerified && (
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                  Pending Boundary Survey
                </span>
              )}
            </div>

            <h4 className="text-lg font-black text-[#1F271B]">{selectedPlot.title}</h4>

            <div className="flex flex-wrap gap-x-5 gap-y-1 text-xs text-gray-600">
              <span><strong>Dimensions:</strong> {selectedPlot.dimensions}</span>
              <span><strong>Area:</strong> {selectedPlot.areaCents} Cents ({selectedPlot.areaSqFt} sq.ft)</span>
              <span><strong>Facing:</strong> {selectedPlot.facing}</span>
              <span><strong>Road:</strong> {selectedPlot.roadWidth}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 shrink-0 w-full md:w-auto">
            <div className="text-left md:text-right">
              <span className="text-[11px] text-gray-500 uppercase tracking-wider font-semibold block">
                Total Selling Price
              </span>
              <span className="text-2xl font-black text-[#1F271B]">
                {selectedPlot.priceDisplay}
              </span>
              <span className="text-[11px] text-gray-500 block">
                @ ₹{selectedPlot.pricePerCent?.toLocaleString('en-IN') || '5,27,272'} / Cent
              </span>
            </div>

            <a
              href={`#enquire-plot`}
              onClick={() => {
                const el = document.getElementById('enquiry-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#B7E436] hover:bg-[#A6D42A] text-[#1C2618] text-xs font-extrabold flex items-center justify-center gap-1.5 shadow-xs transition-all"
            >
              <span>Enquire & Reserve</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
