import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, MapPin, Maximize2, ShieldCheck } from 'lucide-react';

interface PlotItem {
  id: string;
  slug: string;
  title: string;
  location: string;
  area: string;
  ratePerSqft: string;
  price: string;
  image: string;
  badge: string;
}

const featuredListings: PlotItem[] = [
  {
    id: '1',
    slug: 'ap-rajan-garden-beachside-villa-plot-tharuvaikulam',
    title: 'AP Rajan Garden',
    location: 'Tharuvaikulam (Beachside)',
    area: '1,200 sq.ft (2.75 Cents)',
    ratePerSqft: '₹1,208 / sq.ft',
    price: '₹ 14.5 Lakhs',
    image: '/images/product.png',
    badge: '🌊 Walk to Beach',
  },
  {
    id: '2',
    slug: 'pearl-haven-corner-villa-plot-korampallam',
    title: 'Pearl Haven Phase 1',
    location: 'Korampallam, Thoothukudi',
    area: '1,500 sq.ft (3.44 Cents)',
    ratePerSqft: '₹2,133 / sq.ft',
    price: '₹ 32.0 Lakhs',
    image: '/images/product_land1.png',
    badge: 'DTCP #48/2023',
  },
  {
    id: '3',
    slug: 'harbour-view-enclave-east-facing-muthiapuram',
    title: 'Harbour Enclave Phase 1',
    location: 'Harbour Bypass Road Corridor',
    area: '1,200 sq.ft (2.75 Cents)',
    ratePerSqft: '₹1,650 / sq.ft',
    price: '₹ 19.8 Lakhs',
    image: '/images/product_land3.png',
    badge: 'Near Port Corridor',
  },
  {
    id: '4',
    slug: 'palayam-greenfield-residential-plot-nh138',
    title: 'Palayam Greens Avenue',
    location: 'Palayamkottai Road (NH 138)',
    area: '2,400 sq.ft (5.51 Cents)',
    ratePerSqft: '₹1,125 / sq.ft',
    price: '₹ 27.0 Lakhs',
    image: '/images/product_land2.png',
    badge: 'Corner Plot',
  },
];

export default function ExploreCategories() {
  return (
    <section className="px-3 sm:px-6 lg:px-8 py-8 sm:py-12 bg-[#F4F5F0]">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <div>
            <div className="flex items-center space-x-2 text-xs font-bold text-[#668F35] uppercase tracking-wider">
              <span className="w-4 h-0.5 bg-[#668F35]"></span>
              <span>VERIFIED PLOTS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#222222] tracking-tight mt-1">
              Explore Property Types &amp; Corridors
            </h2>
          </div>
          <Link
            href="/plots"
            className="hidden sm:inline-flex items-center space-x-1 text-xs sm:text-sm font-bold text-[#222222] hover:text-[#668F35] transition-colors"
          >
            <span>View All Listings</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 4-card horizontal row matching reference screenshot */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featuredListings.map((plot) => (
            <div
              key={plot.id}
              className="bg-white rounded-2xl overflow-hidden border border-[#DADDD5] hover:border-[#B7E436] hover:shadow-lg transition-all duration-300 flex flex-col group"
            >
              {/* Image Container with Top Badge */}
              <div className="relative h-44 w-full overflow-hidden bg-gray-100">
                <Image
                  src={plot.image}
                  alt={plot.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md text-white text-[10px] font-semibold flex items-center space-x-1">
                  <ShieldCheck className="w-3 h-3 text-[#B7E436]" />
                  <span>{plot.badge}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-extrabold text-[#222222] text-base group-hover:text-[#668F35] transition-colors line-clamp-1">
                    {plot.title}
                  </h3>
                  <p className="text-xs text-[#666A5D] flex items-center space-x-1 mt-1">
                    <MapPin className="w-3 h-3 text-[#668F35] shrink-0" />
                    <span className="truncate">{plot.location}</span>
                  </p>

                  {/* Specs */}
                  <div className="mt-3 pt-3 border-t border-[#EAECE4] flex items-center justify-between text-[11px] text-[#55594D]">
                    <div className="flex items-center space-x-1">
                      <Maximize2 className="w-3 h-3 text-gray-400" />
                      <span>{plot.area}</span>
                    </div>
                    <span className="font-medium text-[#222222]">{plot.ratePerSqft}</span>
                  </div>
                </div>

                {/* Price & Action Button (matching [Ver ->] in reference) */}
                <div className="mt-4 pt-3 border-t border-[#EAECE4] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-gray-400 block font-medium">Price</span>
                    <span className="text-base font-extrabold text-[#1F271B]">
                      {plot.price}
                    </span>
                  </div>

                  <Link
                    href={`/plots/${plot.slug}`}
                    className="inline-flex items-center space-x-1 px-3.5 py-1.5 rounded-full bg-[#B7E436] hover:bg-[#A3CE2A] text-[#1F271B] text-xs font-bold transition-all group-hover:px-4"
                  >
                    <span>View</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
