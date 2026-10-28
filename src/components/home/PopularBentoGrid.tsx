import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, MapPin } from 'lucide-react';

export default function PopularBentoGrid() {
  return (
    <section className="px-3 sm:px-6 lg:px-8 py-8 sm:py-12 bg-[#F4F5F0]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header matching reference */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 sm:mb-8">
          <div>
            <div className="flex items-center space-x-2 text-xs font-bold text-[#668F35] uppercase tracking-wider">
              <span className="w-4 h-0.5 bg-[#668F35]"></span>
              <span>POPULAR</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#222222] tracking-tight mt-1">
              Most Popular Land Listings
            </h2>
          </div>
          <Link
            href="/plots"
            className="mt-3 sm:mt-0 inline-flex items-center space-x-1 text-xs sm:text-sm font-bold text-[#222222] hover:text-[#668F35] transition-colors"
          >
            <span>View All Plots</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
          {/* Left Large Card (7 cols) */}
          <Link
            href="/plots/pearl-haven-corner-villa-plot-korampallam"
            className="group relative lg:col-span-7 rounded-3xl overflow-hidden min-h-[440px] sm:min-h-[500px] border border-[#DADDD5] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-end p-6 sm:p-8"
          >
            <Image
              src="/images/product_land1.png"
              alt="Pearl Haven Enclave Phase 1 - Korampallam"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            {/* Soft gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10"></div>

            {/* Glowing Demarcated Plot Wireframe aligned to actual plotted parcels */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 600 500"
              preserveAspectRatio="none"
            >
              <polygon
                points="230,260 480,230 520,380 260,420"
                fill="rgba(183, 228, 54, 0.18)"
                stroke="#D8FF54"
                strokeWidth="2.5"
                strokeDasharray="6 4"
                className="animate-pulse"
              />
              <line x1="360" y1="245" x2="390" y2="400" stroke="#D8FF54" strokeWidth="1.5" strokeOpacity="0.8" />
              <line x1="245" y1="340" x2="500" y2="305" stroke="#D8FF54" strokeWidth="1.5" strokeOpacity="0.8" />
            </svg>

            {/* Glowing Map Pin on the demarcated plot matching reference */}
            <div className="absolute top-[58%] left-[62%] -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center pointer-events-none">
              <div className="w-8 h-8 rounded-full bg-[#2563EB] text-white flex items-center justify-center font-black text-xs shadow-xl border-2 border-white animate-bounce">
                P18
              </div>
              <div className="w-1.5 h-1.5 rounded-full bg-[#2563EB] mt-0.5 shadow-md"></div>
            </div>

            {/* Bottom Content */}
            <div className="relative z-10 flex items-end justify-between">
              <div>
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-[10px] font-bold text-white uppercase tracking-wider mb-2">
                  DTCP Approved • Ready to Build
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white leading-tight drop-shadow-sm">
                  Pearl Haven Enclave Phase 1
                </h3>
                <p className="text-xs sm:text-sm text-gray-300 flex items-center space-x-1 mt-1 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-[#B7E436]" />
                  <span>Korampallam (Near Collectorate), Thoothukudi</span>
                </p>
                <div className="text-2xl sm:text-3xl font-black text-[#B7E436] mt-3">
                  ₹ 32,00,000
                </div>
              </div>

              {/* Round Lime Arrow Button matching reference */}
              <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-[#B7E436] group-hover:bg-[#A3CE2A] text-[#1F271B] flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110 shrink-0 ml-4">
                <ArrowUpRight className="w-6 h-6 stroke-[2.5]" />
              </div>
            </div>
          </Link>

          {/* Right Column (5 cols, 3 cards stacked) */}
          <div className="lg:col-span-5 flex flex-col gap-4 sm:gap-6">
            {/* Top Wide Card */}
            <Link
              href="/plots/ap-rajan-garden-beachside-villa-plot-tharuvaikulam"
              className="group relative rounded-3xl overflow-hidden min-h-[230px] sm:min-h-[240px] border border-[#DADDD5] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-end p-5 sm:p-6"
            >
              <Image
                src="/images/ap-rajan-garden-layout.jpg"
                alt="AP Rajan Garden - Beachside Villa Plots & House Construction"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10"></div>

              {/* Glowing Wireframe */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                viewBox="0 0 500 240"
                preserveAspectRatio="none"
              >
                <polygon
                  points="260,110 430,95 470,180 300,195"
                  fill="rgba(183, 228, 54, 0.12)"
                  stroke="#D8FF54"
                  strokeWidth="2"
                  strokeDasharray="5 3"
                />
              </svg>

              <div className="relative z-10 flex items-end justify-between">
                <div>
                  <span className="inline-block px-2 py-0.5 rounded-full bg-cyan-900/80 border border-cyan-500 text-[9px] font-bold text-cyan-200 uppercase tracking-wider mb-1">
                    🌊 Walk to Beach &bull; Plot + Construction
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-white drop-shadow-sm">
                    AP Rajan Garden
                  </h3>
                  <p className="text-xs text-gray-300 mt-0.5">
                    Tharuvaikulam (ECR Belt), Thoothukudi
                  </p>
                  <div className="text-lg sm:text-xl font-extrabold text-[#B7E436] mt-1.5">
                    ₹ 14,50,000
                  </div>
                </div>

                <div className="w-10 h-10 rounded-full bg-[#B7E436] group-hover:bg-[#A3CE2A] text-[#1F271B] flex items-center justify-center shadow-md transition-all duration-300 group-hover:scale-110 shrink-0">
                  <ArrowUpRight className="w-5 h-5 stroke-[2.5]" />
                </div>
              </div>
            </Link>

            {/* Bottom Row (2 Equal Cards) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 flex-1">
              {/* Bottom Card 1 */}
              <Link
                href="/plots/palayam-greenfield-residential-plot-nh138"
                className="group relative rounded-3xl overflow-hidden min-h-[210px] border border-[#DADDD5] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-end p-4 sm:p-5"
              >
                <Image
                  src="/images/product_land2.png"
                  alt="Palayam Greens"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10"></div>

                {/* Pin */}
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-black/60 border border-white/60 text-white flex items-center justify-center text-[10px]">
                  📍
                </div>

                <div className="relative z-10 flex items-end justify-between">
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-white drop-shadow-sm">
                      Palayam Greens
                    </h3>
                    <p className="text-[11px] text-gray-300">
                      NH 138 Corridor
                    </p>
                    <div className="text-sm sm:text-base font-bold text-[#B7E436] mt-1">
                      ₹ 27,00,000
                    </div>
                  </div>

                  <div className="w-9 h-9 rounded-full bg-[#B7E436] group-hover:bg-[#A3CE2A] text-[#1F271B] flex items-center justify-center shadow-md transition-all duration-300 group-hover:scale-110 shrink-0">
                    <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                  </div>
                </div>
              </Link>

              {/* Bottom Card 2 */}
              <Link
                href="/plots/millerpuram-central-luxury-plot"
                className="group relative rounded-3xl overflow-hidden min-h-[210px] border border-[#DADDD5] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-end p-4 sm:p-5"
              >
                <Image
                  src="/images/product_land4.png"
                  alt="Millerpuram City Plot"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10"></div>

                {/* Pin */}
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-black/60 border border-white/60 text-white flex items-center justify-center text-[10px]">
                  📍
                </div>

                <div className="relative z-10 flex items-end justify-between">
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-white drop-shadow-sm">
                      Millerpuram City Plot
                    </h3>
                    <p className="text-[11px] text-gray-300">
                      Tuticorin Central
                    </p>
                    <div className="text-sm sm:text-base font-bold text-[#B7E436] mt-1">
                      ₹ 52,00,000
                    </div>
                  </div>

                  <div className="w-9 h-9 rounded-full bg-[#B7E436] group-hover:bg-[#A3CE2A] text-[#1F271B] flex items-center justify-center shadow-md transition-all duration-300 group-hover:scale-110 shrink-0">
                    <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
