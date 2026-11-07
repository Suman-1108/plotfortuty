import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, MapPin } from 'lucide-react';

export default function PopularBentoGrid() {
  return (
    <section className="px-3 sm:px-6 lg:px-8 py-8 sm:py-12 bg-[#F4F5F0]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header matching editorial reference */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 sm:mb-8">
          <div>
            <div className="flex items-center space-x-2 text-xs font-bold text-[#668F35] uppercase tracking-wider">
              <span className="w-4 h-0.5 bg-[#668F35]"></span>
              <span>FEATURED SELECTIONS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#222222] tracking-tight mt-1">
              AP Rajan Garden Popular Plots
            </h2>
          </div>
          <Link
            href="/plots"
            className="mt-3 sm:mt-0 inline-flex items-center space-x-1 text-xs sm:text-sm font-bold text-[#222222] hover:text-[#668F35] transition-colors"
          >
            <span>View All AP Rajan Garden Plots</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
          {/* Left Large Card (7 cols) - Flagship Beachside Villa Plot #02 */}
          <Link
            href="/plots/ap-rajan-garden-beachside-villa-plot-02"
            className="group relative lg:col-span-7 rounded-3xl overflow-hidden min-h-[440px] sm:min-h-[500px] border border-[#DADDD5] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-end p-6 sm:p-8"
          >
            <Image
              src="/images/ap-rajan-garden-layout.jpg"
              alt="AP Rajan Garden Beachside Villa Plot #02"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            {/* Soft gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10"></div>

            {/* Glowing Demarcated Plot Wireframe */}
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

            {/* Glowing Map Pin on demarcated plot */}
            <div className="absolute top-[58%] left-[62%] -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center pointer-events-none">
              <div className="w-9 h-9 rounded-full bg-[#142016] text-[#B7E436] flex items-center justify-center font-black text-xs shadow-xl border-2 border-[#B7E436] animate-bounce">
                P02
              </div>
              <div className="w-1.5 h-1.5 rounded-full bg-[#B7E436] mt-0.5 shadow-md"></div>
            </div>

            {/* Bottom Content */}
            <div className="relative z-10 flex items-end justify-between">
              <div>
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-cyan-900/80 border border-cyan-400 text-[10px] font-bold text-cyan-200 uppercase tracking-wider mb-2">
                  🌊 Walk to Beach &bull; Plot + Construction &bull; 90% Loan
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white leading-tight drop-shadow-sm">
                  AP Rajan Garden &bull; Plot #02
                </h3>
                <p className="text-xs sm:text-sm text-gray-300 flex items-center space-x-1 mt-1 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-[#B7E436]" />
                  <span>Tharuvaikulam (ECR Coastal Road), Thoothukudi</span>
                </p>
                <div className="text-2xl sm:text-3xl font-black text-[#B7E436] mt-3">
                  ₹ 14,50,000
                </div>
              </div>

              {/* Round Lime Arrow Button */}
              <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-[#B7E436] group-hover:bg-[#A3CE2A] text-[#1F271B] flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110 shrink-0 ml-4">
                <ArrowUpRight className="w-6 h-6 stroke-[2.5]" />
              </div>
            </div>
          </Link>

          {/* Right Column (5 cols, 3 cards stacked) */}
          <div className="lg:col-span-5 flex flex-col gap-4 sm:gap-6">
            {/* Top Wide Card - Grand Beach Villa Plot #05 */}
            <Link
              href="/plots/ap-rajan-garden-grand-villa-plot-05"
              className="group relative rounded-3xl overflow-hidden min-h-[230px] sm:min-h-[240px] border border-[#DADDD5] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-end p-5 sm:p-6"
            >
              <Image
                src="/images/completed-model-villa.jpg"
                alt="AP Rajan Garden - Grand Beach Villa Plot #05"
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
                  <span className="inline-block px-2 py-0.5 rounded-full bg-[#1C2618]/80 border border-[#B7E436]/50 text-[9px] font-bold text-[#D8FF54] uppercase tracking-wider mb-1">
                    ⭐ Grand Villa Parcel &bull; 5.51 Cents (2,400 sq.ft)
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-white drop-shadow-sm">
                    Plot #05 &bull; Luxury Coastal Villa
                  </h3>
                  <p className="text-xs text-gray-300 mt-0.5">
                    AP Rajan Garden, Tharuvaikulam
                  </p>
                  <div className="text-lg sm:text-xl font-extrabold text-[#B7E436] mt-1.5">
                    ₹ 28,50,000
                  </div>
                </div>

                <div className="w-10 h-10 rounded-full bg-[#B7E436] group-hover:bg-[#A3CE2A] text-[#1F271B] flex items-center justify-center shadow-md transition-all duration-300 group-hover:scale-110 shrink-0">
                  <ArrowUpRight className="w-5 h-5 stroke-[2.5]" />
                </div>
              </div>
            </Link>

            {/* Bottom Row (2 Equal Cards) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 flex-1">
              {/* Bottom Card 1 - Plot #03 Avenue Villa */}
              <Link
                href="/plots/ap-rajan-garden-avenue-plot-03"
                className="group relative rounded-3xl overflow-hidden min-h-[210px] border border-[#DADDD5] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-end p-4 sm:p-5"
              >
                <Image
                  src="/images/plot-house-construction.jpg"
                  alt="Plot #03 Turnkey Construction - AP Rajan Garden"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10"></div>

                <div className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-black/60 border border-white/30 text-white text-[10px] font-bold">
                  Plot #03 &bull; 3.44 Cents
                </div>

                <div className="relative z-10 flex items-end justify-between">
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-white drop-shadow-sm">
                      33ft Avenue Plot #03
                    </h3>
                    <p className="text-[11px] text-gray-300">
                      North Facing &bull; Custom Plans
                    </p>
                    <div className="text-sm sm:text-base font-bold text-[#B7E436] mt-1">
                      ₹ 18,20,000
                    </div>
                  </div>

                  <div className="w-9 h-9 rounded-full bg-[#B7E436] group-hover:bg-[#A3CE2A] text-[#1F271B] flex items-center justify-center shadow-md transition-all duration-300 group-hover:scale-110 shrink-0">
                    <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                  </div>
                </div>
              </Link>

              {/* Bottom Card 2 - Plot #10 Park Avenue */}
              <Link
                href="/plots/ap-rajan-garden-villa-plot-10"
                className="group relative rounded-3xl overflow-hidden min-h-[210px] border border-[#DADDD5] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-end p-4 sm:p-5"
              >
                <Image
                  src="/images/product.png"
                  alt="Plot #10 AP Rajan Garden"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10"></div>

                <div className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-black/60 border border-white/30 text-white text-[10px] font-bold">
                  Plot #10 &bull; 4.13 Cents
                </div>

                <div className="relative z-10 flex items-end justify-between">
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-white drop-shadow-sm">
                      East Facing Plot #10
                    </h3>
                    <p className="text-[11px] text-gray-300">
                      1,800 sq.ft &bull; Park View
                    </p>
                    <div className="text-sm sm:text-base font-bold text-[#B7E436] mt-1">
                      ₹ 22,00,000
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
