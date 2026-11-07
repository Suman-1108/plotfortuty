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
  CheckCircle2,
  Waves
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Tharuvaikulam Coastal Corridor & AP Rajan Garden | Plot 4 Tuty',
  description:
    'Explore the Tharuvaikulam coastal growth corridor in Thoothukudi, Tamil Nadu: home to AP Rajan Garden beachside villa plots, ECR road connectivity, 53-acre tourism area, and turnkey house construction.',
};

const CORRIDORS = [
  {
    name: 'Tharuvaikulam Coastal Corridor (Home of AP Rajan Garden)',
    tagline: 'Beachside Villa Living & High Appreciation Tourism Zone',
    image: '/images/ap-rajan-garden-layout.jpg',
    priceRange: '₹14.5L - ₹28.5L per Plot',
    roadWidths: '33ft & 30ft Blacktop Roads & ECR Main Road',
    description:
      'The premier coastal residential destination of Thoothukudi, located directly along the Thoothukudi–Rameswaram ECR Road, just minutes from the pristine Tharuvaikulam beach. Home to AP Rajan Garden gated community featuring turnkey house construction, individual water tank construction, and reported 53-acre tourism hub expansion.',
    landmarks: [
      { name: 'Tharuvaikulam Beach Promenade', distance: '350 m (Walking Distance)' },
      { name: 'Thoothukudi–Rameswaram ECR Main Road', distance: '500 m (2 mins)' },
      { name: 'Reported 53-Acre Tourism Development Area', distance: '1.2 km (3 mins)' },
      { name: 'St. Michael Church & Ancient Temples', distance: '800 m (2 mins)' },
      { name: 'Coastal Seafood Resorts & Dining', distance: '600 m (2 mins)' },
      { name: 'Thoothukudi New Bus Stand & City Center', distance: '11.5 km (15 mins)' },
    ],
    highlights: [
      'Walking Distance to Beach (350m)',
      'Plot + Turnkey House Construction',
      'Up to 90% Composite Loan Financing',
      '24-Hour Gated Community Security',
      'Water Line Along All Layout Roads',
      'Frequent 24-Hour Bus Service'
    ],
    slug: 'Tharuvaikulam',
  },
  {
    name: 'Thoothukudi–Rameswaram ECR Corridor',
    tagline: 'Scenic Coastal Highway & Industrial Connectivity',
    image: '/images/real_estate.png',
    priceRange: 'Strategic Coastal Real Estate',
    roadWidths: 'Four-Lane ECR Highway & 33ft Avenue Feeder',
    description:
      'Direct arterial coastal connection between Thoothukudi port city and Rameswaram pilgrimage corridor. Fast transit times to city administrative centers, colleges, hospitals, and VOC Port logistic zones while enjoying tranquil beachside living.',
    landmarks: [
      { name: 'Tharuvaikulam Bus Stop', distance: '400 m (1 min)' },
      { name: 'Tuticorin Old Railway Station', distance: '12 km (15 mins)' },
      { name: 'V.O.C. Port Trust Container Gates', distance: '16 km (20 mins)' },
      { name: 'Tuticorin Airport (TCR)', distance: '22 km (25 mins)' },
    ],
    highlights: [
      'Scenic ECR Highway Connectivity',
      'Direct Access to AP Rajan Garden',
      'High Capital Appreciation Potential',
      'Close to City Center'
    ],
    slug: 'Tharuvaikulam',
  }
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
            Prime Coastal Location &bull; Tharuvaikulam
          </h1>
          <p className="text-xs sm:text-sm text-[#556046] mt-2 leading-relaxed">
            Home to AP Rajan Garden — an exclusive DTCP approved beachside gated community offering plots and turnkey villa construction walking distance to the beach.
          </p>
        </div>

        {/* District Key Transport Hubs */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#DADDD5] shadow-xs mb-12">
          <h3 className="text-base sm:text-lg font-bold text-[#1F271B] mb-4 flex items-center gap-2">
            <Compass className="w-5 h-5 text-[#668F35]" />
            <span>AP Rajan Garden Strategic Connectivity Hubs</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200/80">
              <div className="flex items-center space-x-2 text-[#668F35] font-bold mb-1">
                <Waves className="w-4 h-4" />
                <span>Tharuvaikulam Beach</span>
              </div>
              <p className="text-gray-600">350 meters &bull; 3-5 mins walking distance directly from your plot</p>
            </div>

            <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200/80">
              <div className="flex items-center space-x-2 text-[#668F35] font-bold mb-1">
                <Car className="w-4 h-4" />
                <span>ECR Main Road</span>
              </div>
              <p className="text-gray-600">500 meters &bull; 24-hour frequent bus service &amp; easy transit to town</p>
            </div>

            <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200/80">
              <div className="flex items-center space-x-2 text-[#668F35] font-bold mb-1">
                <Train className="w-4 h-4" />
                <span>Thoothukudi New Bus Stand</span>
              </div>
              <p className="text-gray-600">11.5 km &bull; 15 mins drive to city center, schools &amp; hospitals</p>
            </div>

            <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200/80">
              <div className="flex items-center space-x-2 text-[#668F35] font-bold mb-1">
                <Anchor className="w-4 h-4" />
                <span>53-Acre Tourism Hub</span>
              </div>
              <p className="text-gray-600">1.2 km &bull; Government reported coastal tourism expansion zone</p>
            </div>
          </div>
        </div>

        {/* Corridor Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {CORRIDORS.map((corridor, idx) => (
            <div
              key={idx}
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
                    <span className="text-xs text-gray-500 font-semibold">Pricing / Values:</span>
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
                  href="/plots"
                  className="w-full py-3 rounded-2xl bg-[#B7E436] hover:bg-[#A6D42A] text-[#1C2618] font-bold text-xs sm:text-sm flex items-center justify-center space-x-2 transition-all shadow-xs"
                >
                  <span>Explore AP Rajan Garden Available Plots</span>
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
