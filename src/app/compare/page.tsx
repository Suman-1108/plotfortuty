import { Metadata } from 'next';
import { getPlots } from '@/lib/storage';
import CompareClient from '@/components/compare/CompareClient';

export const metadata: Metadata = {
  title: 'Compare Residential Plots in Thoothukudi | Plot 4 Tuty',
  description:
    'Compare Thoothukudi plots side-by-side by price per cent, road width, dimensions, facing, DTCP/TNRERA approval, and infrastructure.',
};

export default async function ComparePage() {
  const plots = await getPlots();
  return (
    <div className="bg-[#F4F5F0] min-h-screen py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center max-w-2xl mx-auto">
          <span className="text-xs uppercase font-extrabold tracking-widest text-[#668F35] bg-[#E5ECD9] px-3.5 py-1 rounded-full border border-[#D0DFC0]">
            Plot Comparison Tool
          </span>
          <h1 className="text-2xl sm:text-4xl font-black text-[#1F271B] tracking-tight mt-3">
            Compare Plots Side-by-Side
          </h1>
          <p className="text-xs sm:text-sm text-[#556046] mt-2">
            Evaluate plot dimensions, legal clearances, blacktop road width, and pricing per sq.ft to make an informed land investment in Thoothukudi.
          </p>
        </div>

        <CompareClient initialPlots={plots} />
      </div>
    </div>
  );
}
