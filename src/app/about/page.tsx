import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ShieldCheck, MapPin, CheckCircle, FileCheck, Users, Award, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Plot 4 Tuty | Trusted Residential Land Experts in Thoothukudi',
  description:
    'Plot 4 Tuty is Thoothukudi’s premier residential land discovery platform. Over 15 years of local land expertise, 100% DTCP approved layouts, and verified legal titles.',
};

export default function AboutPage() {
  const values = [
    {
      title: 'Zero-Brokerage Transparency',
      desc: 'We connect land buyers directly to approved plotted projects with clear per-cent and per-sq.ft pricing, eliminating inflated third-party agent markups.',
    },
    {
      title: '30-Year Title Search',
      desc: 'Every layout parcel is scrutinized by independent property legal advocates to verify unencumbered mother deeds, sub-division pattas, and lineage records.',
    },
    {
      title: 'Ready Physical Infrastructure',
      desc: 'We do not sell raw barren acreage. Every project features finished blacktop tar roads, underground stormwater drains, demarcation pillars, and potable water testing.',
    },
    {
      title: 'Turnkey Registration & Loan Desk',
      desc: 'From initial site visit to patta transfer at the Sub-Registrar Office, our team assists you with registration, guideline values, and bank housing loan sanctions.',
    },
  ];

  const testimonials = [
    {
      name: 'Dr. S. Karthikeyan',
      role: 'Consultant Surgeon, Thoothukudi',
      text: 'Purchased a 4.13 Cents corner plot at Pearl Haven Layout near Korampallam Collectorate. The entire DTCP approval paper trail, legal opinion, and registration took less than 10 days. Exceptional professionalism.',
    },
    {
      name: 'M. Anandha Kumar',
      role: 'Port Logistics Executive (VOC Port)',
      text: 'Having worked in maritime logistics, I needed a plot near Harbour Bypass with high sweet water quality and good road width. Plot 4 Tuty showed me clear layout maps and handled the patta name transfer seamlessly.',
    },
    {
      name: 'R. Meenakshi Sundaram',
      role: 'NRI Investor (Singapore / Native Tuticorin)',
      text: 'Living overseas, investing in real estate back home in Tamil Nadu is usually stressful. Plot 4 Tuty provided video walkthroughs, RERA certificates, and video call legal review before booking. Highly recommended.',
    },
  ];

  return (
    <div className="py-12 sm:py-16 bg-[#F4F5F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center space-x-1.5 text-xs font-semibold uppercase tracking-wider text-[#668F35] mb-2">
            <ShieldCheck className="w-4 h-4" />
            <span>Local Real Estate Authority</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold text-[#222222] tracking-tight">
            FIND YOUR LAND. <br />
            <span className="text-[#668F35]">BUILD YOUR FUTURE.</span>
          </h1>
          <p className="text-base sm:text-lg text-[#666A5D] mt-4 leading-relaxed">
            Plot 4 Tuty was established with a singular vision: to bring institutional transparency, legal rigor, and modern planning to residential land acquisition in Thoothukudi, Tamil Nadu.
          </p>
        </div>

        {/* Editorial Story Grid */}
        <div className="bg-white rounded-2xl border border-[#DADDD5] p-6 sm:p-12 editorial-shadow mb-16 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs uppercase tracking-wider text-[#668F35] font-semibold">
              Our Heritage & Philosophy
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#222222]">
              Rooted in the Pearl City of Tamil Nadu
            </h2>
            <p className="text-sm text-[#55594D] leading-relaxed">
              Thoothukudi is undergoing unprecedented infrastructure modernization—from the expansion of the VO Chidambaranar Port and the upcoming Kulasekarapattinam Spaceport to the fast-growing industrial manufacturing corridors along Palayamkottai Road and NH 138.
            </p>
            <p className="text-sm text-[#55594D] leading-relaxed">
              Amidst this growth, finding authentic, legally unencumbered land with sweet groundwater and sanctioned DTCP layout approvals can be challenging. Plot 4 Tuty bridges this gap. We curate only fully vetted, ready-to-build residential plots in premier residential enclaves.
            </p>

            <div className="pt-2 grid grid-cols-2 gap-4 text-xs">
              <div className="bg-[#F4F5F0] p-3 rounded-lg border border-[#DADDD5]">
                <strong className="block text-lg font-bold text-[#668F35]">450+</strong>
                <span className="text-[#666A5D]">Satisfied Plot Owners in Thoothukudi</span>
              </div>
              <div className="bg-[#F4F5F0] p-3 rounded-lg border border-[#DADDD5]">
                <strong className="block text-lg font-bold text-[#222222]">100%</strong>
                <span className="text-[#666A5D]">Clear Title & Patta Guarantee</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 relative aspect-land rounded-xl overflow-hidden border border-[#DADDD5] bg-[#EAECE4]">
            <Image
              src="/images/ap-rajan-garden-layout.jpg"
              alt="Plotted land layouts in Thoothukudi"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* 4 Pillars of Integrity */}
        <div className="mb-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#222222]">
              Our Guiding Principles
            </h2>
            <p className="text-xs sm:text-sm text-[#666A5D] mt-1">
              How we protect every rupee you invest into residential land.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <div key={i} className="bg-white p-6 rounded-xl border border-[#DADDD5] editorial-shadow">
                <span className="text-xs font-bold text-[#668F35] block mb-2">0{i + 1}.</span>
                <h3 className="text-base font-bold text-[#222222] mb-2">{v.title}</h3>
                <p className="text-xs text-[#666A5D] leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="bg-white rounded-2xl border border-[#DADDD5] p-6 sm:p-12 editorial-shadow mb-16">
          <div className="max-w-2xl mb-8">
            <span className="text-xs uppercase tracking-wider text-[#668F35] font-semibold">
              Client Experiences
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#222222] mt-1">
              Voices of Our Land Owners
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <div key={idx} className="bg-[#F4F5F0] p-6 rounded-xl border border-[#DADDD5] flex flex-col justify-between">
                <p className="text-xs text-[#55594D] leading-relaxed italic mb-6">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="pt-3 border-t border-[#DADDD5]">
                  <h4 className="text-xs font-bold text-[#222222]">{t.name}</h4>
                  <span className="text-[11px] text-[#668F35]">{t.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to action */}
        <div className="text-center py-8">
          <Link
            href="/plots"
            className="inline-flex items-center space-x-2 px-8 py-3.5 bg-[#668F35] hover:bg-[#53752A] text-white text-sm font-semibold rounded-lg shadow-sm transition-colors"
          >
            <span>Explore Current Available Plots in Thoothukudi</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
