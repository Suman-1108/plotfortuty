'use client';

import { Search, RotateCcw, MapPin, IndianRupee, Layers, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { SearchFilterState } from '@/lib/types';

interface PlotFiltersProps {
  filters: SearchFilterState;
  onChange: (filters: SearchFilterState) => void;
  onReset: () => void;
  totalCount: number;
}

export default function PlotFilters({ filters, onChange, onReset, totalCount }: PlotFiltersProps) {
  const handleChange = (key: keyof SearchFilterState, value: string) => {
    onChange({
      ...filters,
      [key]: value,
    });
  };

  const isFiltered =
    filters.location !== 'all' ||
    filters.budgetRange !== 'all' ||
    filters.plotSize !== 'all' ||
    filters.approval !== 'all' ||
    filters.status !== 'all' ||
    filters.searchQuery.trim() !== '';

  return (
    <div className="bg-white rounded-lg border border-[#DADDD5] p-5 editorial-shadow mb-8 space-y-4">
      {/* Search Input & Quick Info */}
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={filters.searchQuery}
            onChange={(e) => handleChange('searchQuery', e.target.value)}
            placeholder="Search by plot name, project, road width, or keyword..."
            className="w-full pl-10 pr-4 py-2 text-sm bg-[#F4F5F0] border border-[#DADDD5] rounded-md focus:outline-none focus:border-[#668F35] text-[#222222]"
          />
        </div>

        <div className="flex items-center justify-between md:justify-end space-x-3 text-xs text-[#666A5D]">
          <span className="font-semibold text-[#222222] bg-[#F4F5F0] px-3 py-1.5 rounded border border-[#DADDD5]">
            Showing <span className="text-[#668F35] font-bold">{totalCount}</span> Plots
          </span>

          {isFiltered && (
            <button
              onClick={onReset}
              className="inline-flex items-center space-x-1 px-3 py-1.5 text-xs font-medium text-gray-700 hover:text-red-600 bg-gray-100 hover:bg-red-50 rounded transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>
      </div>

      {/* Filter Selects Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-2">
        {/* Location / Layout */}
        <div>
          <label className="block text-xs font-semibold text-[#666A5D] mb-1">Project / Location</label>
          <select
            value={filters.location}
            onChange={(e) => handleChange('location', e.target.value)}
            className="w-full text-xs font-medium bg-[#F4F5F0] border border-[#DADDD5] rounded-md p-2 focus:outline-none focus:border-[#668F35]"
          >
            <option value="all">All AP Rajan Garden Plots</option>
            <option value="Tharuvaikulam">Tharuvaikulam (Beachside &amp; ECR)</option>
          </select>
        </div>

        {/* Budget */}
        <div>
          <label className="block text-xs font-semibold text-[#666A5D] mb-1">Budget</label>
          <select
            value={filters.budgetRange}
            onChange={(e) => handleChange('budgetRange', e.target.value)}
            className="w-full text-xs font-medium bg-[#F4F5F0] border border-[#DADDD5] rounded-md p-2 focus:outline-none focus:border-[#668F35]"
          >
            <option value="all">Any Price</option>
            <option value="under-15">Under ₹15 Lakhs</option>
            <option value="15-25">₹15L – ₹25 Lakhs</option>
            <option value="25-35">₹25L – ₹35 Lakhs</option>
            <option value="above-35">Above ₹35 Lakhs</option>
          </select>
        </div>

        {/* Area */}
        <div>
          <label className="block text-xs font-semibold text-[#666A5D] mb-1">Plot Area (Cents)</label>
          <select
            value={filters.plotSize}
            onChange={(e) => handleChange('plotSize', e.target.value)}
            className="w-full text-xs font-medium bg-[#F4F5F0] border border-[#DADDD5] rounded-md p-2 focus:outline-none focus:border-[#668F35]"
          >
            <option value="all">Any Size</option>
            <option value="under-3-cents">Under 3 Cents (&lt; 1,300 sq.ft)</option>
            <option value="3-5-cents">3 to 5 Cents (1,300 - 2,200 sq.ft)</option>
            <option value="above-5-cents">Above 5 Cents (&gt; 1 Ground)</option>
          </select>
        </div>

        {/* Approval */}
        <div>
          <label className="block text-xs font-semibold text-[#666A5D] mb-1">Approval</label>
          <select
            value={filters.approval}
            onChange={(e) => handleChange('approval', e.target.value)}
            className="w-full text-xs font-medium bg-[#F4F5F0] border border-[#DADDD5] rounded-md p-2 focus:outline-none focus:border-[#668F35]"
          >
            <option value="all">All Approvals</option>
            <option value="DTCP">DTCP Approved</option>
            <option value="RERA">TNRERA Registered</option>
            <option value="Panchayat">Panchayat Approved</option>
          </select>
        </div>

        {/* Status */}
        <div>
          <label className="block text-xs font-semibold text-[#666A5D] mb-1">Availability</label>
          <select
            value={filters.status}
            onChange={(e) => handleChange('status', e.target.value)}
            className="w-full text-xs font-medium bg-[#F4F5F0] border border-[#DADDD5] rounded-md p-2 focus:outline-none focus:border-[#668F35]"
          >
            <option value="all">All Statuses</option>
            <option value="Available">Available</option>
            <option value="Fast Selling">Fast Selling</option>
            <option value="Reserved">Reserved</option>
            <option value="Sold">Sold</option>
          </select>
        </div>
      </div>
    </div>
  );
}
