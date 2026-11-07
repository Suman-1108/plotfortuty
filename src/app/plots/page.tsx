import { Suspense } from 'react';
import type { Metadata } from 'next';
import { getPlots } from '@/lib/storage';
import PlotsClient from '@/components/plots/PlotsClient';

export const metadata: Metadata = {
  title: 'AP Rajan Garden Residential Plots | PLOT 4 TUTY',
  description:
    'Browse verified residential plots for sale at AP Rajan Garden in Tharuvaikulam, Thoothukudi, Tamil Nadu. Walking distance to beach, DTCP approved, turnkey house construction packages, and up to 90% bank loan financing.',
};

export default async function PlotsPage() {
  const plots = await getPlots();

  return (
    <Suspense
      fallback={
        <div className="py-20 text-center text-sm text-[#666A5D]">
          Loading Thoothukudi land listings...
        </div>
      }
    >
      <PlotsClient initialPlots={plots} />
    </Suspense>
  );
}
