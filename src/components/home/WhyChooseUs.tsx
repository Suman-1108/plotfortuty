import {
  MapPin,
  CalendarCheck,
  Headphones,
  Users,
  Award,
  ShieldCheck,
  Phone,
  MessageSquare,
  FileCheck,
  CheckCircle2
} from 'lucide-react';

export default function WhyChooseUs() {
  return (
    <section className="py-14 sm:py-20 bg-[#F4F5F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Title, Description, Socials & 3 Stat Pills (matching reference) */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#222222] tracking-tight leading-tight">
              Why Hundreds of Land Buyers Choose <br />
              <span className="text-[#668F35]">PLOT 4 TUTY</span> for Their Thoothukudi Land
            </h2>

            <p className="text-sm sm:text-base text-[#55594D] leading-relaxed max-w-xl">
              From the coastal breeze of Harbour Enclave to Korampallam administrative corridors, we make buying residential plots transparent, legally certified, and future-proof with expert-verified title search and ready on-ground development.
            </p>

            {/* Quick Contact Icons */}
            <div className="flex items-center space-x-3 pt-1">
              <a
                href="https://wa.me/917845985551"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white border border-[#DADDD5] flex items-center justify-center text-[#668F35] hover:bg-[#668F35] hover:text-white transition-colors"
                title="WhatsApp Direct"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
              <a
                href="tel:+917845985551"
                className="w-9 h-9 rounded-full bg-white border border-[#DADDD5] flex items-center justify-center text-[#222222] hover:bg-[#668F35] hover:text-white transition-colors"
                title="Direct Phone"
              >
                <Phone className="w-4 h-4" />
              </a>
              <div className="flex items-center space-x-1.5 text-xs text-[#666A5D] bg-white px-3 py-1.5 rounded-full border border-[#DADDD5]">
                <MapPin className="w-3.5 h-3.5 text-[#668F35]" />
                <span>Palayamkottai Road, Thoothukudi</span>
              </div>
            </div>

            {/* 3 Stats Row (matching the 3 circular icons in reference: 12k, 10yrs, 50+) */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#DADDD5]/80">
              <div className="text-center sm:text-left space-y-1">
                <div className="w-10 h-10 rounded-full bg-[#EDF3E4] border border-[#668F35]/30 flex items-center justify-center text-[#668F35] mx-auto sm:mx-0">
                  <Users className="w-5 h-5" />
                </div>
                <div className="text-xl sm:text-2xl font-black text-[#222222]">450+</div>
                <div className="text-[11px] text-[#666A5D] font-medium leading-tight">
                  Happy Plot Owners in Tuticorin
                </div>
              </div>

              <div className="text-center sm:text-left space-y-1">
                <div className="w-10 h-10 rounded-full bg-[#EDF3E4] border border-[#668F35]/30 flex items-center justify-center text-[#668F35] mx-auto sm:mx-0">
                  <Award className="w-5 h-5" />
                </div>
                <div className="text-xl sm:text-2xl font-black text-[#222222]">15+ Yrs</div>
                <div className="text-[11px] text-[#666A5D] font-medium leading-tight">
                  Regional Land Expertise
                </div>
              </div>

              <div className="text-center sm:text-left space-y-1">
                <div className="w-10 h-10 rounded-full bg-[#EDF3E4] border border-[#668F35]/30 flex items-center justify-center text-[#668F35] mx-auto sm:mx-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div className="text-xl sm:text-2xl font-black text-[#222222]">100%</div>
                <div className="text-[11px] text-[#666A5D] font-medium leading-tight">
                  DTCP &amp; TNRERA Clear Titles
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 3 Stacked Rounded Feature Cards (matching reference) */}
          <div className="lg:col-span-5 space-y-4">
            {/* Card 1: Local Expertise */}
            <div className="bg-[#8A9A86]/20 border border-[#8A9A86]/40 rounded-2xl p-5 sm:p-6 editorial-shadow flex items-start space-x-4">
              <div className="w-12 h-12 rounded-xl bg-[#668F35] text-white flex items-center justify-center shrink-0 shadow-sm">
                <FileCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#222222]">
                  Local Thoothukudi Expertise
                </h3>
                <p className="text-xs text-[#55594D] mt-1 leading-relaxed">
                  Our native real estate specialists craft unencumbered land offerings with verified 30-year mother deed searches you won&apos;t find through ordinary brokers.
                </p>
              </div>
            </div>

            {/* Card 2: All-in-One Booking & Registry */}
            <div className="bg-[#8A9A86]/20 border border-[#8A9A86]/40 rounded-2xl p-5 sm:p-6 editorial-shadow flex items-start space-x-4">
              <div className="w-12 h-12 rounded-xl bg-[#222222] text-white flex items-center justify-center shrink-0 shadow-sm">
                <CalendarCheck className="w-6 h-6 text-[#668F35]" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#222222]">
                  All-in-One Booking &amp; Registry
                </h3>
                <p className="text-xs text-[#55594D] mt-1 leading-relaxed">
                  Everything handled in one place: on-site vehicle inspection, layout map review, Sub-Registrar registration, and nationalized bank loan approvals.
                </p>
              </div>
            </div>

            {/* Card 3: 24/7 On-Ground Support */}
            <div className="bg-[#8A9A86]/20 border border-[#8A9A86]/40 rounded-2xl p-5 sm:p-6 editorial-shadow flex items-start space-x-4">
              <div className="w-12 h-12 rounded-xl bg-[#668F35] text-white flex items-center justify-center shrink-0 shadow-sm">
                <Headphones className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#222222]">
                  24/7 On-Ground Support
                </h3>
                <p className="text-xs text-[#55594D] mt-1 leading-relaxed">
                  We are here anytime on the ground in Thoothukudi. Get real-time WhatsApp video walkthroughs, boundary stone coordinates, and registration guidance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
