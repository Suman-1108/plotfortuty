import Link from 'next/link';
import { ArrowUpRight, ShieldCheck, MapPin, CheckCircle2 } from 'lucide-react';

export default function StatsBanner() {
  return (
    <section className="px-3 sm:px-6 lg:px-8 -mt-8 sm:-mt-12 mb-10 relative z-20">
      <div className="max-w-7xl mx-auto">
        <div className="bg-[#EBF2DE] border border-[#D5E3C3] rounded-3xl sm:rounded-[32px] p-6 sm:p-8 lg:p-10 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 items-center">
            {/* Stat 1 */}
            <div className="border-b md:border-b-0 md:border-r border-[#D5E3C3] pb-4 md:pb-0 pr-4">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#1F271B] tracking-tight">
                450<span className="text-[#668F35]">+</span>
              </div>
              <div className="text-xs sm:text-sm font-semibold text-[#556046] mt-1">
                Verified Plots Registered
              </div>
              <div className="text-[11px] text-[#7A8668] mt-0.5">
                Across Thoothukudi Corridors
              </div>
            </div>

            {/* Stat 2 */}
            <div className="border-b lg:border-b-0 lg:border-r border-[#D5E3C3] pb-4 lg:pb-0 pr-4">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#1F271B] tracking-tight">
                8.5<span className="text-[#668F35]">+</span> Lakhs sq.ft
              </div>
              <div className="text-xs sm:text-sm font-semibold text-[#556046] mt-1">
                Masterplanned Layout Area
              </div>
              <div className="text-[11px] text-[#7A8668] mt-0.5">
                With 30ft &amp; 40ft Blacktop Tar Roads
              </div>
            </div>

            {/* Stat 3 */}
            <div className="border-b md:border-b-0 md:border-r border-[#D5E3C3] pb-4 md:pb-0 pr-4">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#1F271B] tracking-tight">
                100<span className="text-[#668F35]">%</span>
              </div>
              <div className="text-xs sm:text-sm font-semibold text-[#556046] mt-1">
                DTCP &amp; TNRERA Clear Titles
              </div>
              <div className="text-[11px] text-[#7A8668] mt-0.5">
                Bank Loan Approval from SBI &amp; HDFC
              </div>
            </div>

            {/* Right Callout Box (Exact match to reference: "Crie seu anúncio...") */}
            <div className="bg-[#DFECCB] rounded-2xl p-4 sm:p-5 border border-[#CEE0B4] flex flex-col justify-between">
              <p className="text-xs sm:text-sm text-[#26311F] leading-snug font-medium">
                Direct developer pricing with instant legal verification and on-site physical inspection.
              </p>
              <Link
                href="/contact"
                className="mt-3 inline-flex items-center space-x-1.5 text-xs font-bold text-[#1F271B] underline hover:text-[#4F7327] transition-colors"
              >
                <span>Schedule a Site Visit Now</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
