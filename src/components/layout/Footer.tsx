'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { MapPin, Phone, Mail, ShieldCheck, CheckCircle2, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  const pathname = usePathname();

  // If in seller or admin portals, do not render customer footer
  if (pathname.startsWith('/admin') || pathname.startsWith('/seller')) {
    return null;
  }

  return (
    <footer className="bg-[#1C2618] text-[#DCE6CE] pt-16 pb-10 border-t border-[#2C3826]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-[#2C3826]">
          {/* Brand Info (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative h-12 w-12 rounded-full overflow-hidden bg-white border border-[#3C4E34] group-hover:border-[#B7E436] shadow-sm shrink-0 transition-all">
                <Image
                  src="/logo-round.png"
                  alt="Plot 4 Tuty"
                  fill
                  className="object-cover rounded-full"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tight text-white leading-none">
                  Plot 4 Tuty<span className="text-[#B7E436]">.</span>
                </span>
                <span className="text-[10px] font-bold text-[#8FA57C] tracking-widest uppercase mt-1">
                  RESIDENTIAL LAND &amp; PLOT MARKETPLACE
                </span>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-[#A9BA99] leading-relaxed max-w-sm">
              Thoothukudi&apos;s dedicated residential land marketplace. Connecting homebuyers directly with verified DTCP-approved layouts, individual patta plots, and gated villa communities across prime corridors.
            </p>

            <div className="pt-2 flex items-center space-x-2 text-xs text-[#D8FF54]">
              <ShieldCheck className="w-4 h-4 text-[#B7E436]" />
              <span>100% Verified Survey Sketches &amp; Clear Titles</span>
            </div>
          </div>

          {/* Col 1: Explore Corridors */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white tracking-widest uppercase">
              Prime Corridors
            </h4>
            <ul className="space-y-2 text-xs text-[#A9BA99]">
              <li>
                <Link href="/plots?location=Korampallam" className="hover:text-[#B7E436] transition-colors">
                  Korampallam Collectorate
                </Link>
              </li>
              <li>
                <Link href="/plots?location=Palayamkottai+Road" className="hover:text-[#B7E436] transition-colors">
                  Palayamkottai Road (NH 138)
                </Link>
              </li>
              <li>
                <Link href="/plots?location=Harbour+Bypass+Road" className="hover:text-[#B7E436] transition-colors">
                  Harbour Bypass Road
                </Link>
              </li>
              <li>
                <Link href="/plots?location=Millerpuram" className="hover:text-[#B7E436] transition-colors">
                  Millerpuram Central
                </Link>
              </li>
              <li>
                <Link href="/locations" className="text-[#B7E436] hover:underline flex items-center gap-1 font-semibold">
                  All 6 Corridors <ArrowUpRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 2: Buyer Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white tracking-widest uppercase">
              Buyer Services
            </h4>
            <ul className="space-y-2 text-xs text-[#A9BA99]">
              <li>
                <Link href="/plots" className="hover:text-[#B7E436] transition-colors">
                  Search All Plots
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-[#B7E436] transition-colors">
                  Gated Township Projects
                </Link>
              </li>
              <li>
                <Link href="/compare" className="hover:text-[#B7E436] transition-colors">
                  Compare Plot Options
                </Link>
              </li>
              <li>
                <Link href="/locations" className="hover:text-[#B7E436] transition-colors">
                  Thoothukudi Location Map
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#B7E436] transition-colors">
                  Book Free Site Inspection
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Legal & Standards */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white tracking-widest uppercase">
              Legal Assurances
            </h4>
            <ul className="space-y-2 text-xs text-[#A9BA99]">
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#B7E436]" />
                <span>DTCP Layout Approval</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#B7E436]" />
                <span>TNRERA Registered</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#B7E436]" />
                <span>Individual Patta Ready</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#B7E436]" />
                <span>SBI &amp; HDFC Pre-Approved</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#B7E436]" />
                <span>Zero Encumbrance</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Contact Strip */}
        <div className="py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 border-b border-[#2C3826] text-xs">
          <div>
            <h5 className="text-sm font-bold text-white mb-1">
              Contact Advisory Desk
            </h5>
            <p className="text-[#A9BA99] leading-snug">
              Have questions regarding plot dimensions, patta, or registration? Speak with our Thoothukudi advisors.
            </p>
          </div>

          <div>
            <h6 className="text-[11px] font-bold uppercase tracking-wider text-[#8FA57C] mb-1">
              OFFICE ADDRESS
            </h6>
            <p className="text-white leading-snug">
              Palayamkottai Road, Near District Collectorate, Thoothukudi, Tamil Nadu - 628008
            </p>
          </div>

          <div>
            <h6 className="text-[11px] font-bold uppercase tracking-wider text-[#8FA57C] mb-1">
              TELEPHONE &amp; WHATSAPP
            </h6>
            <a
              href="tel:+919842155678"
              className="text-white hover:text-[#B7E436] transition-colors font-medium block"
            >
              +91 98421 55678
            </a>
            <span className="text-[11px] text-[#A9BA99]">Mon - Sat: 9:00 AM - 7:00 PM</span>
          </div>

          <div>
            <h6 className="text-[11px] font-bold uppercase tracking-wider text-[#8FA57C] mb-1">
              EMAIL INQUIRIES
            </h6>
            <a
              href="mailto:contact@plot4tuty.com"
              className="text-white hover:text-[#B7E436] transition-colors font-medium block"
            >
              contact@plot4tuty.com
            </a>
            <span className="text-[11px] text-[#A9BA99]">Quick response within 2 hours</span>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#7E906E] gap-3">
          <p>
            &copy; {new Date().getFullYear()} Plot 4 Tuty. All rights reserved.
          </p>
          <div className="flex items-center space-x-6">
            <Link href="/about" className="hover:text-white transition-colors">
              About Us
            </Link>
            <Link href="/contact" className="hover:text-white transition-colors">
              Terms &amp; Conditions
            </Link>
            <Link href="/contact" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
