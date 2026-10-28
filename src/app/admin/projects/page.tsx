import Image from 'next/image';
import Link from 'next/link';
import { getProjects } from '@/lib/storage';
import {
  FolderKanban,
  Building2,
  MapPin,
  CheckCircle2,
  PlusCircle,
  ExternalLink,
  Layers
} from 'lucide-react';

export default async function AdminProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#DADDD5] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase font-extrabold tracking-wider text-[#668F35] bg-[#EBF2DE] px-3 py-1 rounded-full border border-[#D5E3C3]">
            Township &amp; Layout Oversight
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-[#1F271B] mt-2">
            Plotted Layout Projects ({projects.length})
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Manage masterplan blueprints, internal plot subdivisions, road blacktopping status, and approvals.
          </p>
        </div>

        <button className="px-5 py-2.5 rounded-2xl bg-[#B7E436] hover:bg-[#A6D42A] text-[#1C2618] text-xs font-black shadow-xs flex items-center gap-1.5 cursor-pointer">
          <PlusCircle className="w-4 h-4" />
          <span>Add New Layout Project</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((proj) => (
          <div
            key={proj.id}
            className="bg-white rounded-3xl border border-[#DADDD5] overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="relative h-44 w-full bg-gray-100">
                <Image
                  src={proj.image || '/images/real_estate.png'}
                  alt={proj.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/95 text-[10px] font-black text-[#1F271B]">
                  {proj.approval}
                </div>
              </div>

              <div className="p-5 space-y-3">
                <h3 className="font-extrabold text-base text-[#1F271B] leading-tight">{proj.name}</h3>
                <p className="text-xs text-gray-500 line-clamp-2">{proj.description}</p>
                <div className="flex items-center text-xs text-gray-500 gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#668F35] shrink-0" />
                  <span>{proj.location}</span>
                </div>

                <div className="grid grid-cols-3 gap-2 py-2 border-y border-gray-100 text-xs">
                  <div>
                    <span className="text-[10px] text-gray-400 block uppercase">Total</span>
                    <strong className="text-gray-800">{proj.totalPlots}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 block uppercase">Available</span>
                    <strong className="text-[#668F35]">{proj.availablePlots}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 block uppercase">Sold</span>
                    <strong className="text-gray-800">{proj.soldPlots}</strong>
                  </div>
                </div>

                <div className="text-[11px] font-mono text-gray-500">
                  Ref: {proj.approvalNumber}
                </div>
              </div>
            </div>

            <div className="p-5 pt-0">
              <Link
                href="/projects"
                target="_blank"
                className="w-full py-2 text-center rounded-xl bg-gray-100 hover:bg-gray-200 text-xs font-bold text-gray-800 transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Inspect Masterplan</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
