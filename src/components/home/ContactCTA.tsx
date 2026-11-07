'use client';

import { useState } from 'react';
import { MessageSquare, Phone, Send, CheckCircle2, ShieldCheck, AlertCircle } from 'lucide-react';

export default function ContactCTA() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    preferredLocation: 'Tharuvaikulam (AP Rajan Garden)',
    budget: '₹15L – ₹25L',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          plotTitle: `Discovery Inquiry (${formData.preferredLocation})`,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setSuccess(true);
        setFormData({
          name: '',
          phone: '',
          email: '',
          preferredLocation: 'Tharuvaikulam (AP Rajan Garden)',
          budget: '₹15L – ₹25L',
          message: '',
        });
      } else {
        setError(data.error || 'Failed to submit enquiry. Please try again.');
      }
    } catch {
      setError('Network connection error. Please call us or WhatsApp directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 sm:py-24 bg-[#F4F5F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-[#DADDD5] p-6 sm:p-12 editorial-shadow-lg grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Direct Call & WhatsApp Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center space-x-1.5 text-xs font-semibold uppercase tracking-wider text-[#668F35]">
              <ShieldCheck className="w-4 h-4" />
              <span>Direct Developer Assistance</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-[#222222] leading-tight">
              Ready to Visit Your Future Plot in Thoothukudi?
            </h2>

            <p className="text-sm text-[#666A5D] leading-relaxed">
              Schedule an exclusive on-site property walkthrough with our senior land consultants. We provide transportation, mother deed inspection files, and government DTCP layout copies.
            </p>

            <div className="pt-2 space-y-3">
              <a
                href="https://wa.me/919842155678?text=Hello%20Plot%204%20Tuty,%20I%20would%20like%20to%20schedule%20a%20site%20visit%20for%20residential%20plots."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 p-3.5 bg-[#EDF3E4] border border-[#668F35]/30 rounded-xl hover:bg-[#668F35] hover:text-white transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center text-[#668F35] group-hover:text-[#668F35] shrink-0">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-xs font-semibold text-[#53752A] group-hover:text-white">
                    Instant WhatsApp Enquiry
                  </span>
                  <span className="text-sm font-bold text-[#222222] group-hover:text-white">
                    +91 98421 55678
                  </span>
                </div>
              </a>

              <a
                href="tel:+919842155678"
                className="flex items-center space-x-3 p-3.5 bg-[#F4F5F0] border border-[#DADDD5] rounded-xl hover:bg-white transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center text-[#222222] shrink-0 border border-[#DADDD5]">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-xs font-semibold text-[#666A5D]">
                    Direct Office Telephone
                  </span>
                  <span className="text-sm font-bold text-[#222222]">
                    +91 98421 55678
                  </span>
                </div>
              </a>
            </div>

            <p className="text-xs text-gray-500">
              * No brokerage fee. Direct transparent land pricing.
            </p>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7 bg-[#F4F5F0] p-6 sm:p-8 rounded-xl border border-[#DADDD5]">
            <h3 className="text-lg font-bold text-[#222222] mb-1">
              Request Site Visit & Price Catalog
            </h3>
            <p className="text-xs text-[#666A5D] mb-5">
              Fill out your requirements below; our team will reply within 30 minutes.
            </p>

            {success ? (
              <div className="bg-[#EDF3E4] border border-[#668F35] p-6 rounded-lg text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-[#668F35] mx-auto" />
                <h4 className="text-base font-bold text-[#222222]">Enquiry Submitted Successfully!</h4>
                <p className="text-xs text-[#55594D]">
                  Thank you. Our Thoothukudi land specialist will contact you on your mobile with the layout map and price sheet.
                </p>
                <button
                  onClick={() => setSuccess(false)}
                  className="mt-2 text-xs font-semibold text-[#668F35] underline"
                >
                  Submit another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-md flex items-center space-x-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#222222] mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. S. Murugesan"
                      className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-[#DADDD5] rounded-md focus:outline-none focus:border-[#668F35]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#222222] mb-1">
                      Mobile Number (WhatsApp) *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. +91 98421 XXXXX"
                      className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-[#DADDD5] rounded-md focus:outline-none focus:border-[#668F35]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#222222] mb-1">
                      Preferred Layout / Category
                    </label>
                    <select
                      value={formData.preferredLocation}
                      onChange={(e) => setFormData({ ...formData, preferredLocation: e.target.value })}
                      className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-[#DADDD5] rounded-md focus:outline-none focus:border-[#668F35]"
                    >
                      <option value="Tharuvaikulam (AP Rajan Garden)">AP Rajan Garden (Beachside Villa Plot)</option>
                      <option value="AP Rajan Garden - Plot + Construction">AP Rajan Garden (Plot + Turnkey Construction)</option>
                      <option value="AP Rajan Garden - Grand Villa">AP Rajan Garden (Grand Villa Plot - 5.5 Cents)</option>
                      <option value="AP Rajan Garden - 90% Loan Support">AP Rajan Garden (90% Loan Financing Support)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#222222] mb-1">
                      Estimated Budget
                    </label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-[#DADDD5] rounded-md focus:outline-none focus:border-[#668F35]"
                    >
                      <option value="Under ₹15L">Under ₹15 Lakhs</option>
                      <option value="₹15L – ₹25L">₹15 Lakhs – ₹25 Lakhs</option>
                      <option value="₹25L – ₹35L">₹25 Lakhs – ₹35 Lakhs</option>
                      <option value="Above ₹35L">Above ₹35 Lakhs</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#222222] mb-1">
                    Your Requirements / Specific Plot Preference
                  </label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="e.g. Looking for an East-facing 3 Cents plot in Korampallam for immediate villa construction..."
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-[#DADDD5] rounded-md focus:outline-none focus:border-[#668F35]"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2.5 px-4 bg-[#668F35] hover:bg-[#53752A] text-white text-xs sm:text-sm font-semibold rounded-md flex items-center justify-center space-x-2 transition-all disabled:opacity-50 shadow-sm"
                >
                  <Send className="w-4 h-4" />
                  <span>{loading ? 'Submitting Details...' : 'Request On-Site Inspection & Details'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
