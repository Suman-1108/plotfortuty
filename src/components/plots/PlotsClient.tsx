'use client';

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Plot, SearchFilterState } from '@/lib/types';
import PlotCard from '@/components/plots/PlotCard';
import PlotFilters from '@/components/plots/PlotFilters';
import UnitConverter from '@/components/plots/UnitConverter';
import { Layers, ShieldCheck, MapPin, Sparkles, Filter } from 'lucide-react';

interface PlotsClientProps {
  initialPlots: Plot[];
}

export default function PlotsClient({ initialPlots }: PlotsClientProps) {
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState<SearchFilterState>({
    location: searchParams.get('location') || 'all',
    budgetRange: searchParams.get('budgetRange') || 'all',
    plotSize: searchParams.get('plotSize') || 'all',
    approval: searchParams.get('approval') || 'all',
    status: searchParams.get('status') || 'all',
    searchQuery: searchParams.get('q') || '',
  });

  // Keep filters in sync if URL params change
  useEffect(() => {
    setFilters({
      location: searchParams.get('location') || 'all',
      budgetRange: searchParams.get('budgetRange') || 'all',
      plotSize: searchParams.get('plotSize') || 'all',
      approval: searchParams.get('approval') || 'all',
      status: searchParams.get('status') || 'all',
      searchQuery: searchParams.get('q') || '',
    });
  }, [searchParams]);

  const filteredPlots = useMemo(() => {
    return initialPlots.filter((p) => {
      // Location
      if (filters.location !== 'all' && p.location.toLowerCase() !== filters.location.toLowerCase()) {
        return false;
      }

      // Budget
      if (filters.budgetRange !== 'all') {
        if (filters.budgetRange === 'under-15' && p.price >= 1500000) return false;
        if (filters.budgetRange === '15-25' && (p.price < 1500000 || p.price > 2500000)) return false;
        if (filters.budgetRange === '25-35' && (p.price <= 2500000 || p.price > 3500000)) return false;
        if (filters.budgetRange === 'above-35' && p.price <= 3500000) return false;
      }

      // Plot Size (Cents)
      if (filters.plotSize !== 'all') {
        if (filters.plotSize === 'under-3-cents' && p.areaCents >= 3) return false;
        if (filters.plotSize === '3-5-cents' && (p.areaCents < 3 || p.areaCents > 5)) return false;
        if (filters.plotSize === 'above-5-cents' && p.areaCents <= 5) return false;
      }

      // Approval
      if (filters.approval !== 'all') {
        if (!p.approval.toLowerCase().includes(filters.approval.toLowerCase())) return false;
      }

      // Status
      if (filters.status !== 'all') {
        if (p.status.toLowerCase() !== filters.status.toLowerCase()) return false;
      }

      // Search Query
      if (filters.searchQuery.trim()) {
        const q = filters.searchQuery.toLowerCase();
        const matchTitle = p.title.toLowerCase().includes(q);
        const matchLoc = p.location.toLowerCase().includes(q);
        const matchProj = p.project.toLowerCase().includes(q);
        const matchDesc = p.description.toLowerCase().includes(q);
        const matchRoad = p.roadWidth.toLowerCase().includes(q);
        if (!matchTitle && !matchLoc && !matchProj && !matchDesc && !matchRoad) return false;
      }

      return true;
    });
  }, [initialPlots, filters]);

  const handleReset = () => {
    setFilters({
      location: 'all',
      budgetRange: 'all',
      plotSize: 'all',
      approval: 'all',
      status: 'all',
      searchQuery: '',
    });
  };

  return (
    <div className="py-10 sm:py-14 bg-[#F4F5F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="inline-flex items-center space-x-1.5 text-xs font-semibold uppercase tracking-wider text-[#668F35] mb-1.5">
            <Layers className="w-3.5 h-3.5" />
            <span>AP Rajan Garden &bull; Tharuvaikulam, Thoothukudi</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#222222]">
            AP Rajan Garden Residential Plots
          </h1>
          <p className="text-sm sm:text-base text-[#666A5D] mt-1 max-w-2xl">
            Explore verified beachside plots in AP Rajan Garden, Tharuvaikulam, Thoothukudi. Walking distance to the beach, turnkey house construction packages, 33ft blacktop roads, and up to 90% loan financing.
          </p>
        </div>

        {/* Filter Controls Component */}
        <PlotFilters
          filters={filters}
          onChange={setFilters}
          onReset={handleReset}
          totalCount={filteredPlots.length}
        />

        {/* Results Grid or Empty State */}
        {filteredPlots.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16">
            {filteredPlots.map((plot) => (
              <PlotCard key={plot.id} plot={plot} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-[#DADDD5] p-12 text-center my-8 editorial-shadow">
            <div className="w-12 h-12 rounded-full bg-[#EDF3E4] text-[#668F35] flex items-center justify-center mx-auto mb-4">
              <Filter className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#222222] mb-1">
              No matching residential plots found
            </h3>
            <p className="text-sm text-[#666A5D] max-w-md mx-auto mb-6">
              Try adjusting your price range, plot size, or corridor filters to find available properties.
            </p>
            <button
              onClick={handleReset}
              className="px-5 py-2.5 bg-[#668F35] hover:bg-[#53752A] text-white text-xs font-semibold rounded-md transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        )}

        {/* Unit Converter Helper on Listing Page */}
        <div className="mt-12 bg-white rounded-xl border border-[#DADDD5] p-6 sm:p-8 editorial-shadow">
          <div className="max-w-2xl mb-5">
            <h3 className="text-lg font-bold text-[#222222]">
              Tamil Nadu Plot Measurement Helper
            </h3>
            <p className="text-xs text-[#666A5D] mt-0.5">
              Easily convert between local Cents, Grounds, and Square Feet to understand actual dimensions before visiting.
            </p>
          </div>
          <UnitConverter />
        </div>
      </div>
    </div>
  );
}
