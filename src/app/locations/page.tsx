import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  MapPin,
  Compass,
  ArrowRight,
  Building2,
  Car,
  Plane,
  Train,
  Anchor,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Thoothukudi Real Estate Locations & Growth Corridors | Plot 4 Tuty',
  description:
    'Explore prime residential plot corridors across Thoothukudi, Tamil Nadu: Korampallam, Palayamkottai Road (NH 138), Harbour Bypass, Millerpuram, Muthiapuram, and Ettayapuram Road.',
};

const CORRIDORS = [
  {
    name: 'Korampallam Corridor',
    tagline: 'Administrative Capital & Collectorate Enclave',
    image: '/images/product_land1.png',
    priceRange: '₹6.5L - ₹9.0L per Cent',
    roadWidths: '30ft & 40ft Blacktop Roads',
    description:
      'The prime residential expansion corridor of Thoothukudi, adjacent to the District Collectorate Complex, SP Office, and SPIC Nagar. High sweet groundwater table at 30-40 feet and supreme civic infrastructure.',
    landmarks: [
      { name: 'Thoothukudi District Collectorate', distance: '1.2 km (3 mins)' },
      { name: 'SPIC Nagar Hospital', distance: '3.5 km (8 mins)' },
      { name: 'St. Thomas Matriculation School', distance: '1.5 km (4 mins)' },
      { name: 'Tuticorin New Bus Stand', distance: '4.8 km (10 mins)' },
    ],
    highlights: ['Sweet Drinking Water', 'Collectorate Proximity', 'DTCP Approved Layouts', 'High Rental Demand'],
    slug: 'Korampallam',
  },
  {
    name: 'Palayamkottai Road (NH 138)',
    tagline: 'High-Speed 4-Lane Arterial Growth Highway',
    image: '/images/product_land2.png',
    priceRange: '₹5.5L - ₹8.0L per Cent',
    roadWidths: '40ft Internal & 100ft NH Frontage',
    description:
      'The most connected arterial link between Thoothukudi and Tirunelveli. Ideal for executive villas and long-term capital appreciation with direct NH 138 four-lane connectivity.',
    landmarks: [
      { name: 'Government Polytechnic College', distance: '800 m (2 mins)' },
      { name: 'Tirunelveli 4-Lane Highway Toll', distance: '6.2 km (9 mins)' },
      { name: 'Tuticorin Airport (TCR)', distance: '14.5 km (18 mins)' },
      { name: 'Apollo Speciality Hospital Clinic', distance: '4.1 km (8 mins)' },
    ],
    highlights: ['NH 138 Highway Access', 'Commercial Value', 'Fastest Capital Growth', '40ft Tar Roads'],
    slug: 'Palayamkottai Road',
  },
  {
    name: 'Harbour Bypass Road',
    tagline: 'Port Expressway & Industrial Logistic Corridor',
    image: '/images/product_land3.png',
    priceRange: '₹4.8L - ₹6.5L per Cent',
    roadWidths: '30ft & 40ft Blacktop Roads',
    description:
      'Fast-developing residential pockets linking the VOC Port Trust bypass with the outer ring road. Strong rental appreciation driven by maritime professionals and industrial executives.',
    landmarks: [
      { name: 'VOC Port Trust Terminal Gates', distance: '7.5 km (11 mins)' },
      { name: 'Harbour Express Toll Plaza', distance: '2.8 km (5 mins)' },
      { name: 'Tuticorin Railway Junction', distance: '8.2 km (14 mins)' },
      { name: 'Coastal Ring Highway', distance: '1.5 km (3 mins)' },
    ],
    highlights: ['Port Belt Proximity', 'Heavy Vehicle Segregation', 'High Yield Rentals', 'Clear Patta Ready'],
    slug: 'Harbour Bypass Road',
  },
  {
    name: 'Millerpuram Central',
    tagline: 'Premium City Center & Academic Heartland',
    image: '/images/product_land4.png',
    priceRange: '₹9.0L - ₹14.0L per Cent',
    roadWidths: '25ft, 30ft & 40ft Roads',
    description:
      'The most established, elite residential neighborhood in the heart of Thoothukudi city. Home to top CBSE schools, specialty clinics, shopping centers, and parks.',
    landmarks: [
      { name: 'Holy Cross Anglo Indian School', distance: '1.1 km (3 mins)' },
      { name: 'Millerpuram Commercial Center', distance: '400 m (1 min)' },
      { name: 'Tuticorin Old Bus Stand', distance: '3.0 km (7 mins)' },
      { name: 'Tuticorin Thermal Power Plant HQ', distance: '6.5 km (12 mins)' },
    ],
    highlights: ['Ready to Build Immediately', 'Elite Residential Hub', 'Walk to Schools', '100% City Amenities'],
    slug: 'Millerpuram',
  },
  {
    name: 'Tharuvaikulam Coastal Corridor (ECR)',
    tagline: 'Beachside Villa Living & Tourism Expansion Zone',
    image: '/images/product.png',
    priceRange: '₹4.5L - ₹6.8L per Cent',
    roadWidths: '30ft & 33ft Layout Roads & ECR Main Road',
    description:
      'Fast-appreciating coastal belt along the Thoothukudi–Rameswaram ECR Road, just minutes from the beach. Popular for AP Rajan Garden, 53-acre tourism hub, seafood resorts, and turnkey plot-plus-house construction.',
    landmarks: [
      { name: 'Tharuvaikulam Beach Promenade', distance: '350 m (Walking Distance)' },
      { name: 'Thoothukudi–Rameswaram ECR Main Road', distance: '500 m (2 mins)' },
      { name: '53-Acre Tourism Development Area', distance: '1.2 km (3 mins)' },
      { name: 'Tuticorin New Bus Stand', distance: '11.5 km (15 mins)' },
    ],
    highlights: ['Walking Distance to Beach', 'Turnkey House Construction', '90% Bank Loan Support', '24-Hour Bus Service'],
    slug: 'Tharuvaikulam',
  },
];

export default function LocationsPage() {
  return (
    <div className="bg-[#F4F5F0] min-h-screen py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="text-xs uppercase font-extrabold tracking-widest text-[#668F35] bg-[#E5ECD9] px-3.5 py-1 rounded-full border border-[#D0DFC0]">
            Tamil Nadu &bull; Thoothukudi District
          </span>
          <h1 className="text-2xl sm:text-4xl font-black text-[#1F271B] tracking-tight mt-3">
            Prime Residential Land Corridors
          </h1>
          <p className="text-xs sm:text-sm text-[#556046] mt-2 leading-relaxed">
            Every plot listed on Plot 4 Tuty is located in vetted growth zones with verified access roads, groundwater availability, and high infrastructure development potential.
          </p>
        </div>

        {/* District Key Transport Hubs */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#DADDD5] shadow-xs mb-12">
          <h3 className="text-base sm:text-lg font-bold text-[#1F271B] mb-4 flex items-center gap-2">
            <Compass className="w-5 h-5 text-[#668F35]" />
            <span>Thoothukudi Strategic Connectivity Hubs</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200/80">
              <div className="flex items-center space-x-2 text-[#668F35] font-bold mb-1">
                <Plane className="w-4 h-4" />
                <span>Tuticorin Airport (TCR)</span>
              </div>
              <p className="text-gray-600">Vagaikulam (NH 138) &bull; Flights to Chennai &amp; Bengaluru &bull; 15-20 mins</p>
            </div>

            <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200/80">
              <div className="flex items-center space-x-2 text-[#668F35] font-bold mb-1">
                <Anchor className="w-4 h-4" />
                <span>V.O.C. Port Trust</span>
              </div>
              <p className="text-gray-600">Major Indian Deep-Water Port &bull; Container Transshipment &bull; 12-15 mins</p>
            </div>

            <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200/80">
              <div className="flex items-center space-x-2 text-[#668F35] font-bold mb-1">
                <Train className="w-4 h-4" />
                <span>Railway Junction</span>
              </div>
              <p className="text-gray-600">Tuticorin Railway Terminal &bull; Direct Express to Chennai &amp; Madurai &bull; 10 mins</p>
            </div>

            <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200/80">
              <div className="flex items-center space-x-2 text-[#668F35] font-bold mb-1">
                <Car className="w-4 h-4" />
                <span>National Highways</span>
              </div>
              <p className="text-gray-600">NH 138 (Tirunelveli 4-lane) &bull; NH 38 (Madurai Expressway) &bull; Port Ring Road</p>
            </div>
          </div>
        </div>

        {/* Corridor Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {CORRIDORS.map((corridor) => (
            <div
              key={corridor.name}
              className="bg-white rounded-3xl border border-[#DADDD5] overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                {/* Photo Banner */}
                <div className="relative h-56 w-full bg-gray-100">
                  <Image
                    src={corridor.image}
                    alt={corridor.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#B7E436] text-[#1C2618]">
                      {corridor.roadWidths}
                    </span>
                    <h3 className="text-xl font-black mt-2">{corridor.name}</h3>
                    <p className="text-xs text-gray-200 font-medium">{corridor.tagline}</p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                    <span className="text-xs text-gray-500 font-semibold">Average Land Rate:</span>
                    <span className="text-sm font-extrabold text-[#1F271B]">{corridor.priceRange}</span>
                  </div>

                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    {corridor.description}
                  </p>

                  {/* Landmarks */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-[#1F271B] uppercase tracking-wider">
                      Nearby Landmarks (Calculated Travel Distance):
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {corridor.landmarks.map((landmark) => (
                        <div
                          key={landmark.name}
                          className="p-2 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-between"
                        >
                          <span className="font-medium text-gray-800 truncate mr-2">{landmark.name}</span>
                          <span className="text-[#668F35] font-bold text-[11px] shrink-0">
                            {landmark.distance}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {corridor.highlights.map((h) => (
                      <span
                        key={h}
                        className="inline-flex items-center space-x-1 text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-[#EBF2DE] text-[#486725]"
                      >
                        <CheckCircle2 className="w-3 h-3 text-[#668F35]" />
                        <span>{h}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-6 pt-0">
                <Link
                  href={`/plots?location=${encodeURIComponent(corridor.slug)}`}
                  className="w-full py-3 rounded-2xl bg-[#B7E436] hover:bg-[#A6D42A] text-[#1C2618] font-bold text-xs sm:text-sm flex items-center justify-center space-x-2 transition-all shadow-xs"
                >
                  <span>Explore Available Plots in {corridor.slug}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
