'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, Plus, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function PropertySuggestions() {
  const router = useRouter();
  const [filter1, setFilter1] = useState('new');
  const [filter2, setFilter2] = useState('investment');

  return (
    <section className="px-3 sm:px-6 lg:px-8 pt-4 pb-8 bg-[#F4F5F0]">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#222222] tracking-tight mb-5">
          Suggestions of land plots you might like
        </h2>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            {/* Pill Dropdown 1 */}
            <div className="relative inline-flex items-center">
              <select
                value={filter1}
                onChange={(e) => {
                  setFilter1(e.target.value);
                  router.push(`/plots?status=available`);
                }}
                className="appearance-none bg-white border border-[#DADDD5] hover:border-[#668F35] text-[#222222] text-xs sm:text-sm font-semibold rounded-full px-5 py-3 pr-10 shadow-xs focus:outline-none cursor-pointer transition-colors"
              >
                <option value="new">Beachside Villa Plots (Walk to Beach)</option>
                <option value="ready">Plot + Turnkey House Construction</option>
                <option value="gated">Gated Layout with 33ft Roads</option>
              </select>
              <ChevronDown className="w-4 h-4 text-gray-500 absolute right-4 pointer-events-none" />
            </div>

            {/* Pill Dropdown 2 */}
            <div className="relative inline-flex items-center">
              <select
                value={filter2}
                onChange={(e) => {
                  setFilter2(e.target.value);
                  router.push(`/plots`);
                }}
                className="appearance-none bg-white border border-[#DADDD5] hover:border-[#668F35] text-[#222222] text-xs sm:text-sm font-semibold rounded-full px-5 py-3 pr-10 shadow-xs focus:outline-none cursor-pointer transition-colors"
              >
                <option value="investment">Composite 90% Loan Approved</option>
                <option value="budget">Starter Plots Under ₹15 Lakhs</option>
                <option value="highway">ECR Corridor &bull; Tourism Zone</option>
              </select>
              <ChevronDown className="w-4 h-4 text-gray-500 absolute right-4 pointer-events-none" />
            </div>
          </div>

          {/* Right Vibrant Lime Pill Button matching [Anuncie agora +] */}
          <Link
            href="/contact"
            className="inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-full bg-[#B7E436] hover:bg-[#A3CE2A] text-[#1F271B] font-bold text-xs sm:text-sm shadow-sm transition-all hover:scale-105 shrink-0"
          >
            <span>Book Site Visit / Enquire</span>
            <div className="w-6 h-6 rounded-full bg-black/10 flex items-center justify-center">
              <Plus className="w-4 h-4 text-[#1F271B] stroke-[3]" />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
