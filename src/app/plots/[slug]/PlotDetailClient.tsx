'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Plot } from '@/lib/types';
import PlotCard from '@/components/plots/PlotCard';
import UnitConverter from '@/components/plots/UnitConverter';
import {
  MapPin,
  ShieldCheck,
  Compass,
  Maximize2,
  Calendar,
  CheckCircle2,
  MessageSquare,
  Phone,
  Send,
  ArrowLeft,
  Share2,
  Check,
  Building,
  FileCheck,
  AlertCircle
} from 'lucide-react';

interface PlotDetailClientProps {
  plot: Plot;
  similarPlots: Plot[];
}

export default function PlotDetailClient({ plot, similarPlots }: PlotDetailClientProps) {
  const [selectedImage, setSelectedImage] = useState<number>(0);
  const [copied, setCopied] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: `I am interested in ${plot.title} (${plot.layoutPlotNumber}) in ${plot.location}. Please arrange an on-site visit.`,
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const staticUrl = `https://plot4tuty.com/plots/${plot.slug}`;
  const [whatsappUrl, setWhatsappUrl] = useState(
    `https://wa.me/917845985551?text=${encodeURIComponent(
      `Hello Plot 4 Tuty, I am interested in ${plot.title} (${plot.layoutPlotNumber}) at ${plot.location}. Price: ${plot.priceDisplay}. Link: ${staticUrl}`
    )}`
  );

  useEffect(() => {
    setWhatsappUrl(
      `https://wa.me/917845985551?text=${encodeURIComponent(
        `Hello Plot 4 Tuty, I am interested in ${plot.title} (${plot.layoutPlotNumber}) at ${plot.location}. Price: ${plot.priceDisplay}. Link: ${window.location.href}`
      )}`
    );
  }, [plot]);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleEnquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          plotId: plot.id,
          plotTitle: `${plot.title} (${plot.layoutPlotNumber})`,
          preferredLocation: plot.location,
          budget: plot.priceDisplay,
          ...formData,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setSuccess(true);
      } else {
        setError(data.error || 'Submission failed');
      }
    } catch {
      setError('Network error. Please call or WhatsApp us directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-8 sm:py-12 bg-[#F4F5F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between mb-6 text-xs text-[#666A5D]">
          <Link
            href="/plots"
            className="inline-flex items-center space-x-1.5 hover:text-[#222222] font-medium"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Plots</span>
          </Link>

          <button
            onClick={handleShare}
            className="inline-flex items-center space-x-1.5 px-3 py-1 bg-white border border-[#DADDD5] rounded-md hover:border-[#668F35] text-[#222222] transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-[#668F35]" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{copied ? 'Link Copied' : 'Share Plot'}</span>
          </button>
        </div>

        {/* Title & Top Specs Bar */}
        <div className="bg-white rounded-xl border border-[#DADDD5] p-6 sm:p-8 editorial-shadow mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[#DADDD5]">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 text-xs font-semibold rounded bg-[#EDF3E4] text-[#53752A] border border-[#668F35]/30">
                  {plot.approval}
                </span>
                <span className="px-2.5 py-0.5 text-xs font-semibold rounded bg-[#222222] text-white">
                  {plot.layoutPlotNumber}
                </span>
                <span className="px-2.5 py-0.5 text-xs font-semibold rounded bg-amber-100 text-amber-800">
                  {plot.status}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#222222]">
                {plot.title}
              </h1>

              <div className="flex items-center space-x-2 text-xs sm:text-sm text-[#666A5D] mt-2">
                <MapPin className="w-4 h-4 text-[#668F35] shrink-0" />
                <span>{plot.address}</span>
              </div>
            </div>

            {/* Price block */}
            <div className="lg:text-right shrink-0">
              <span className="block text-xs uppercase tracking-wider text-[#666A5D]">Total Price</span>
              <span className="text-3xl sm:text-4xl font-extrabold text-[#222222]">
                {plot.priceDisplay}
              </span>
              <div className="text-xs text-[#668F35] font-semibold mt-1">
                ₹{plot.pricePerSqFt} / sq.ft • ₹{plot.pricePerCent.toLocaleString('en-IN')} / Cent
              </div>
            </div>
          </div>

          {/* Quick Specs Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 text-xs text-[#55594D]">
            <div className="bg-[#F4F5F0] p-3 rounded-lg border border-[#DADDD5]/70">
              <span className="block text-[11px] text-[#666A5D]">Plot Area</span>
              <span className="text-sm sm:text-base font-bold text-[#222222]">
                {plot.areaCents} Cents
              </span>
              <span className="block text-[11px] text-gray-500">({plot.areaSqFt} Sq.Ft)</span>
            </div>

            <div className="bg-[#F4F5F0] p-3 rounded-lg border border-[#DADDD5]/70">
              <span className="block text-[11px] text-[#666A5D]">Dimensions</span>
              <span className="text-sm sm:text-base font-bold text-[#222222]">
                {plot.dimensions}
              </span>
              <span className="block text-[11px] text-gray-500">Length x Breadth</span>
            </div>

            <div className="bg-[#F4F5F0] p-3 rounded-lg border border-[#DADDD5]/70">
              <span className="block text-[11px] text-[#666A5D]">Facing & Vastu</span>
              <span className="text-sm sm:text-base font-bold text-[#222222]">
                {plot.facing}
              </span>
              <span className="block text-[11px] text-gray-500">100% Vastu Compliant</span>
            </div>

            <div className="bg-[#F4F5F0] p-3 rounded-lg border border-[#DADDD5]/70">
              <span className="block text-[11px] text-[#666A5D]">Road Width</span>
              <span className="text-sm sm:text-base font-bold text-[#222222]">
                {plot.roadWidth}
              </span>
              <span className="block text-[11px] text-gray-500">Heavy Vehicle Access</span>
            </div>
          </div>
        </div>

        {/* Gallery & Sidebar Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          {/* Main Left Column: Gallery & Details */}
          <div className="lg:col-span-8 space-y-8">
            {/* Gallery */}
            <div className="bg-white rounded-xl border border-[#DADDD5] p-4 editorial-shadow">
              <div className="relative aspect-land w-full rounded-lg overflow-hidden bg-[#EAECE4] mb-3">
                <Image
                  src={plot.images[selectedImage] || plot.images[0]}
                  alt={plot.title}
                  fill
                  priority
                  className="object-cover"
                />
              </div>

              {/* Thumbnails */}
              {plot.images.length > 1 && (
                <div className="grid grid-cols-4 gap-2.5">
                  {plot.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`relative aspect-video rounded overflow-hidden border-2 transition-all ${
                        selectedImage === idx ? 'border-[#668F35] ring-2 ring-[#668F35]/30' : 'border-[#DADDD5] opacity-70 hover:opacity-100'
                      }`}
                    >
                      <Image src={img} alt={`Thumbnail ${idx + 1}`} fill className="object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Description & Overview */}
            <div className="bg-white rounded-xl border border-[#DADDD5] p-6 sm:p-8 editorial-shadow space-y-4">
              <h2 className="text-xl font-bold text-[#222222]">
                Property Overview & Location Highlights
              </h2>
              <p className="text-sm text-[#55594D] leading-relaxed">
                {plot.description}
              </p>

              {/* Legal Checklist */}
              <div className="pt-4 border-t border-[#DADDD5] grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="flex items-center space-x-2 text-[#222222]">
                  <FileCheck className="w-4 h-4 text-[#668F35] shrink-0" />
                  <span>Approval: <strong>{plot.approvalNumber}</strong></span>
                </div>
                <div className="flex items-center space-x-2 text-[#222222]">
                  <ShieldCheck className="w-4 h-4 text-[#668F35] shrink-0" />
                  <span>Patta: <strong>{plot.pattaStatus}</strong></span>
                </div>
                <div className="flex items-center space-x-2 text-[#222222]">
                  <CheckCircle2 className="w-4 h-4 text-[#668F35] shrink-0" />
                  <span>Encumbrance: <strong>Nil / Zero Encumbrance</strong></span>
                </div>
                <div className="flex items-center space-x-2 text-[#222222]">
                  <Building className="w-4 h-4 text-[#668F35] shrink-0" />
                  <span>Bank Loan: <strong>Pre-approved by SBI / HDFC</strong></span>
                </div>
              </div>
            </div>

            {/* Amenities Grid */}
            <div className="bg-white rounded-xl border border-[#DADDD5] p-6 sm:p-8 editorial-shadow">
              <h2 className="text-xl font-bold text-[#222222] mb-4">
                Layout Amenities & Infrastructure
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {plot.amenities.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center space-x-2.5 p-3 rounded-lg bg-[#F4F5F0] border border-[#DADDD5]/60 text-xs font-semibold text-[#222222]"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#668F35] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Proximity & Distance to Landmarks */}
            <div className="bg-white rounded-xl border border-[#DADDD5] p-6 sm:p-8 editorial-shadow">
              <h2 className="text-xl font-bold text-[#222222] mb-4">
                Nearby Landmarks & Connectivity
              </h2>
              <div className="space-y-3">
                {plot.landmarks.map((landmark, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 rounded-lg bg-[#F4F5F0] border border-[#DADDD5]/60 text-xs"
                  >
                    <div className="flex items-center space-x-2 text-[#222222] font-semibold">
                      <MapPin className="w-3.5 h-3.5 text-[#668F35]" />
                      <span>{landmark.name}</span>
                    </div>
                    <span className="text-[#668F35] font-bold bg-white px-2 py-1 rounded border border-[#DADDD5]">
                      {landmark.distance}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Unit Converter */}
            <UnitConverter />
          </div>

          {/* Right Column: Sticky Enquiry & Call Card */}
          <div className="lg:col-span-4 sticky top-28 space-y-6">
            <div className="bg-white rounded-xl border border-[#DADDD5] p-6 editorial-shadow">
              <div className="text-center pb-4 mb-4 border-b border-[#DADDD5]">
                <span className="text-xs uppercase tracking-wider text-[#668F35] font-semibold block">
                  Direct Enquiry
                </span>
                <h3 className="text-xl font-bold text-[#222222] mt-0.5">
                  Interested in this Plot?
                </h3>
                <p className="text-xs text-[#666A5D] mt-1">
                  Connect directly with the land promoter. No middleman brokerage.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 mb-6">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center space-x-2 py-3 px-4 bg-[#668F35] hover:bg-[#53752A] text-white rounded-lg text-xs font-bold transition-colors shadow-sm"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Enquire on WhatsApp</span>
                </a>

                <a
                  href="tel:+917845985551"
                  className="w-full flex items-center justify-center space-x-2 py-3 px-4 bg-white border border-[#DADDD5] hover:border-[#668F35] text-[#222222] rounded-lg text-xs font-semibold transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#668F35]" />
                  <span>Call: +91 78459 85551</span>
                </a>
              </div>

              {/* Instant Form */}
              <div className="pt-4 border-t border-[#DADDD5]">
                <h4 className="text-xs font-bold text-[#222222] uppercase tracking-wider mb-3">
                  Or Send an On-Site Visit Request
                </h4>

                {success ? (
                  <div className="bg-[#EDF3E4] border border-[#668F35] p-4 rounded text-center text-xs space-y-2">
                    <CheckCircle2 className="w-6 h-6 text-[#668F35] mx-auto" />
                    <p className="font-bold text-[#222222]">Request Sent!</p>
                    <p className="text-[#55594D]">We will call you shortly with the layout blueprint.</p>
                  </div>
                ) : (
                  <form onSubmit={handleEnquirySubmit} className="space-y-3">
                    {error && (
                      <div className="p-2 bg-red-50 text-red-700 text-xs rounded border border-red-200">
                        {error}
                      </div>
                    )}
                    <div>
                      <input
                        type="text"
                        required
                        placeholder="Your Full Name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3 py-2 text-xs bg-[#F4F5F0] border border-[#DADDD5] rounded focus:outline-none focus:border-[#668F35]"
                      />
                    </div>
                    <div>
                      <input
                        type="tel"
                        required
                        placeholder="WhatsApp / Phone Number"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3 py-2 text-xs bg-[#F4F5F0] border border-[#DADDD5] rounded focus:outline-none focus:border-[#668F35]"
                      />
                    </div>
                    <div>
                      <textarea
                        rows={2}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-3 py-2 text-xs bg-[#F4F5F0] border border-[#DADDD5] rounded focus:outline-none focus:border-[#668F35]"
                      ></textarea>
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-2.5 bg-[#222222] hover:bg-[#668F35] text-white text-xs font-semibold rounded transition-colors flex items-center justify-center space-x-1.5"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{loading ? 'Submitting...' : 'Request Inspection Visit'}</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Similar Listings Section */}
        {similarPlots.length > 0 && (
          <div className="mt-16 pt-12 border-t border-[#DADDD5]">
            <div className="mb-8">
              <span className="text-xs uppercase tracking-wider text-[#668F35] font-semibold">
                Alternative Choices
              </span>
              <h2 className="text-2xl font-bold text-[#222222] mt-1">
                Similar Available Plots in Thoothukudi
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {similarPlots.map((item) => (
                <PlotCard key={item.id} plot={item} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
