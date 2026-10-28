import Link from 'next/link';
import Image from 'next/image';
import { getPlots } from '@/lib/storage';
import {
  Building2,
  PlusCircle,
  MapPin,
  CheckCircle2,
  Clock,
  Layers,
  Compass,
  ArrowRight,
  ExternalLink,
  Edit,
  Sparkles
} from 'lucide-react';

export default async function SellerPropertiesPage() {
  const plots = await getPlots();

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#DADDD5] shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase font-extrabold tracking-wider text-[#668F35] bg-[#EBF2DE] px-3 py-1 rounded-full border border-[#D5E3C3]">
            Plot Inventory
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-[#1F271B] mt-2">
            My Plot Listings ({plots.length})
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Manage your land parcels, verify documents, and toggle sales status for buyers.
          </p>
        </div>

        <Link
          href="/seller/properties/new"
          className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-2xl bg-[#B7E436] hover:bg-[#A6D42A] text-[#1C2618] text-xs sm:text-sm font-extrabold shadow-xs transition-all shrink-0 cursor-pointer"
        >
          <PlusCircle className="w-4 h-4 stroke-[2.5]" />
          <span>Add New Plot Listing</span>
        </Link>
      </div>

      {/* Plots Table Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {plots.map((plot) => (
          <div
            key={plot.id}
            className="bg-white rounded-3xl border border-[#DADDD5] overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              {/* Photo & Status */}
              <div className="relative h-48 w-full bg-gray-100">
                <Image
                  src={plot.images?.[0] || '/images/real_estate.png'}
                  alt={plot.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="px-2.5 py-1 rounded-full bg-white/95 text-[11px] font-extrabold text-[#1F271B] shadow-xs">
                    {plot.status}
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-[#B7E436] text-[11px] font-extrabold text-[#1C2618] shadow-xs">
                    {plot.approval}
                  </span>
                </div>
                <div className="absolute bottom-3 right-3 px-3 py-1 rounded-xl bg-black/75 backdrop-blur-md text-white text-sm font-black">
                  {plot.priceDisplay}
                </div>
              </div>

              {/* Specs */}
              <div className="p-5 space-y-3">
                <h3 className="font-extrabold text-base text-[#1F271B] line-clamp-1">{plot.title}</h3>
                <div className="flex items-center text-xs text-gray-500 gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#668F35] shrink-0" />
                  <span className="truncate">{plot.address || plot.location}</span>
                </div>

                <div className="grid grid-cols-3 gap-2 py-2 border-y border-gray-100 text-xs">
                  <div>
                    <span className="text-[10px] text-gray-400 block uppercase">Area</span>
                    <strong className="text-gray-800">{plot.areaCents} Cents</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 block uppercase">Facing</span>
                    <strong className="text-gray-800">{plot.facing}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 block uppercase">Road</span>
                    <strong className="text-gray-800 truncate block">{plot.roadWidth?.split(' ')[0]} ft Tar</strong>
                  </div>
                </div>

                <div className="text-[11px] text-gray-500 font-mono flex items-center justify-between">
                  <span>Ref: {plot.approvalNumber || 'DTCP/2023'}</span>
                  <span className="text-[#668F35] font-semibold">{plot.pattaStatus}</span>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="p-5 pt-0 flex items-center gap-2">
              <Link
                href={`/plots/${plot.slug || plot.id}`}
                target="_blank"
                className="flex-1 py-2 text-center rounded-xl bg-gray-100 hover:bg-gray-200 text-xs font-bold text-gray-800 transition-colors flex items-center justify-center gap-1.5"
              >
                <span>View on Site</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>

              <button
                type="button"
                className="px-4 py-2 rounded-xl bg-[#EBF2DE] hover:bg-[#DFECCB] text-xs font-bold text-[#486725] transition-colors border border-[#D5E3C3] flex items-center gap-1"
              >
                <Edit className="w-3.5 h-3.5" />
                <span>Edit Plot</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
