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
    slug: 'ap-rajan-garden-beachside-villa-plot-02',
    title: 'AP Rajan Garden &bull; Plot #02',
    location: 'Tharuvaikulam (Beachside)',
    area: '1,200 sq.ft (2.75 Cents)',
    ratePerSqft: '₹1,208 / sq.ft',
    price: '₹ 14.5 Lakhs',
    image: '/images/product.png',
    badge: '🌊 Walk to Beach',
  },
  {
    id: '2',
    slug: 'ap-rajan-garden-grand-villa-plot-05',
    title: 'AP Rajan Garden &bull; Plot #05',
    location: 'Tharuvaikulam (ECR Corridor)',
    area: '2,400 sq.ft (5.51 Cents)',
    ratePerSqft: '₹1,187 / sq.ft',
    price: '₹ 28.5 Lakhs',
    image: '/images/completed-model-villa.jpg',
    badge: '⭐ 5.51 Cents Villa',
  },
  {
    id: '3',
    slug: 'ap-rajan-garden-avenue-plot-03',
    title: 'AP Rajan Garden &bull; Plot #03',
    location: 'Tharuvaikulam (33ft Road)',
    area: '1,500 sq.ft (3.44 Cents)',
    ratePerSqft: '₹1,213 / sq.ft',
    price: '₹ 18.2 Lakhs',
    image: '/images/plot-house-construction.jpg',
    badge: '33ft Avenue Road',
  },
  {
    id: '4',
    slug: 'ap-rajan-garden-villa-plot-10',
    title: 'AP Rajan Garden &bull; Plot #10',
    location: 'Tharuvaikulam (Park Avenue)',
    area: '1,800 sq.ft (4.13 Cents)',
    ratePerSqft: '₹1,222 / sq.ft',
    price: '₹ 22.0 Lakhs',
    image: '/images/ap-rajan-garden-layout.jpg',
    badge: 'East Facing Vastu',
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
              AP Rajan Garden Verified Parcels
            </h2>
          </div>
          <Link
            href="/plots"
            className="hidden sm:inline-flex items-center space-x-1 text-xs sm:text-sm font-bold text-[#222222] hover:text-[#668F35] transition-colors"
          >
            <span>View All AP Rajan Plots</span>
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
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[10px] font-bold text-white flex items-center gap-1 shadow-sm">
                  <ShieldCheck className="w-3 h-3 text-[#B7E436]" />
                  <span>DTCP #112/2024</span>
                </div>
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-[#B7E436] text-[10px] font-black text-[#1F271B] shadow-sm">
                  {plot.badge}
                </div>
              </div>

              {/* Content */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center space-x-1 text-xs text-gray-500 mb-1">
                    <MapPin className="w-3 h-3 text-[#668F35]" />
                    <span className="truncate">{plot.location}</span>
                  </div>
                  <Link href={`/plots/${plot.slug}`}>
                    <h3 className="font-extrabold text-base text-[#222222] group-hover:text-[#668F35] transition-colors line-clamp-1">
                      {plot.title}
                    </h3>
                  </Link>

                  <div className="mt-2 text-xs text-[#55594D] space-y-0.5">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Area:</span>
                      <span className="font-bold text-gray-700">{plot.area}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Rate:</span>
                      <span className="font-semibold text-gray-600">{plot.ratePerSqft}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <span className="block text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                      Price
                    </span>
                    <span className="text-base font-black text-[#1F271B]">
                      {plot.price}
                    </span>
                  </div>

                  <Link
                    href={`/plots/${plot.slug}`}
                    className="w-9 h-9 rounded-full bg-[#F4F5F0] group-hover:bg-[#B7E436] text-[#222222] flex items-center justify-center transition-colors shadow-xs"
                    aria-label={`View details of ${plot.title}`}
                  >
                    <ArrowRight className="w-4 h-4" />
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
