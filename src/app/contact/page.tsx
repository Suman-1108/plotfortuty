'use client';

import { useState } from 'react';
import { MapPin, Phone, Mail, MessageSquare, Clock, Send, CheckCircle2, ShieldCheck, AlertCircle } from 'lucide-react';

export default function ContactPage() {
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
          plotTitle: `Contact Page Inquiry (${formData.preferredLocation})`,
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
        setError(data.error || 'Failed to submit enquiry.');
      }
    } catch {
      setError('Network connection error. Please call or WhatsApp us.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-12 sm:py-16 bg-[#F4F5F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center space-x-1.5 text-xs font-semibold uppercase tracking-wider text-[#668F35] mb-2">
            <MapPin className="w-4 h-4" />
            <span>Thoothukudi Real Estate Advisory</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold text-[#222222] tracking-tight">
            Contact & On-Site Visits
          </h1>
          <p className="text-sm sm:text-base text-[#666A5D] mt-2 leading-relaxed">
            Have questions about DTCP approval records, layout blueprints, or wish to schedule a private on-site inspection in Thoothukudi? Our advisory team is at your service.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-14">
          {/* Left Column: Office Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-xl border border-[#DADDD5] p-6 sm:p-8 editorial-shadow space-y-6">
              <h3 className="text-lg font-bold text-[#222222] pb-3 border-b border-[#DADDD5]">
                Corporate Office
              </h3>

              <div className="space-y-4 text-xs text-[#55594D]">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-4 h-4 text-[#668F35] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#222222] text-sm">Plot 4 Tuty Headquarters</strong>
                    <p className="text-[#666A5D] mt-0.5">
                      Opposite District Collectorate Complex, Palayamkottai Road (NH 138), Thoothukudi, Tamil Nadu 628101
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-[#668F35] shrink-0" />
                  <div>
                    <span className="block text-[#666A5D]">Direct Telephone</span>
                    <a href="tel:+917845985551" className="text-sm font-bold text-[#222222] hover:text-[#668F35]">
                      +91 78459 85551
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <MessageSquare className="w-4 h-4 text-[#668F35] shrink-0" />
                  <div>
                    <span className="block text-[#666A5D]">WhatsApp Support (24/7)</span>
                    <a
                      href="https://wa.me/917845985551"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-bold text-[#668F35] hover:underline"
                    >
                      +91 78459 85551 (Click to Chat)
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-[#668F35] shrink-0" />
                  <div>
                    <span className="block text-[#666A5D]">Official Email</span>
                    <a href="mailto:plot4in@gmail.com" className="text-sm font-medium text-[#222222]">
                      plot4in@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3 pt-2 border-t border-[#DADDD5]">
                  <Clock className="w-4 h-4 text-[#668F35] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#222222]">Visiting Hours</strong>
                    <p className="text-[#666A5D]">Monday to Saturday: 9:00 AM – 7:30 PM</p>
                    <p className="text-[#666A5D]">Sunday: Guided On-Site Inspections by Pre-Appointment</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Guarantees Box */}
            <div className="bg-[#EDF3E4] border border-[#668F35]/30 rounded-xl p-5 text-xs text-[#53752A] space-y-2">
              <span className="font-bold flex items-center space-x-1.5 text-sm text-[#222222]">
                <ShieldCheck className="w-4 h-4 text-[#668F35]" />
                <span>Our Buyer Protection Pledge</span>
              </span>
              <p>
                We provide complete document inspection files (Mother Deed, DTCP layout plan, TNRERA registration copy, and Encumbrance Certificate) before any financial commitment.
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7 bg-white rounded-xl border border-[#DADDD5] p-6 sm:p-10 editorial-shadow">
            <h3 className="text-xl font-bold text-[#222222] mb-1">
              Send an Enquiry / Schedule Site Visit
            </h3>
            <p className="text-xs text-[#666A5D] mb-6">
              Our regional land expert will get back to you with maps, pricing, and available survey numbers.
            </p>

            {success ? (
              <div className="bg-[#EDF3E4] border border-[#668F35] p-8 rounded-lg text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-[#668F35] mx-auto" />
                <h4 className="text-lg font-bold text-[#222222]">Enquiry Successfully Registered</h4>
                <p className="text-xs text-[#55594D] max-w-sm mx-auto">
                  Thank you for reaching out. We will call you at {formData.phone || 'your phone number'} and share the project brochures on WhatsApp.
                </p>
                <button
                  onClick={() => setSuccess(false)}
                  className="mt-4 px-4 py-2 bg-[#668F35] text-white text-xs font-semibold rounded hover:bg-[#53752A]"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded flex items-center space-x-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#222222] mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. S. Murugesan"
                      className="w-full px-3 py-2 text-xs sm:text-sm bg-[#F4F5F0] border border-[#DADDD5] rounded focus:outline-none focus:border-[#668F35]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#222222] mb-1">
                      Mobile / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 78459 XXXXX"
                      className="w-full px-3 py-2 text-xs sm:text-sm bg-[#F4F5F0] border border-[#DADDD5] rounded focus:outline-none focus:border-[#668F35]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#222222] mb-1">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="you@example.com"
                      className="w-full px-3 py-2 text-xs sm:text-sm bg-[#F4F5F0] border border-[#DADDD5] rounded focus:outline-none focus:border-[#668F35]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#222222] mb-1">
                      Target Project / Package
                    </label>
                    <select
                      value={formData.preferredLocation}
                      onChange={(e) => setFormData({ ...formData, preferredLocation: e.target.value })}
                      className="w-full px-3 py-2 text-xs sm:text-sm bg-[#F4F5F0] border border-[#DADDD5] rounded focus:outline-none focus:border-[#668F35]"
                    >
                      <option value="Tharuvaikulam (AP Rajan Garden)">AP Rajan Garden (Beachside Villa Plot)</option>
                      <option value="AP Rajan Garden - Plot + Construction">AP Rajan Garden (Plot + Turnkey Construction)</option>
                      <option value="AP Rajan Garden - Grand Villa">AP Rajan Garden (Grand Villa Plot - 5.5 Cents)</option>
                      <option value="AP Rajan Garden - 90% Loan Support">AP Rajan Garden (90% Loan Financing Guidance)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#222222] mb-1">
                    Your Requirements / Query
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us what size of plot you are looking for, your preferred facing, and when you would like to visit the site..."
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-[#F4F5F0] border border-[#DADDD5] rounded focus:outline-none focus:border-[#668F35]"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-4 bg-[#668F35] hover:bg-[#53752A] text-white text-xs sm:text-sm font-semibold rounded transition-all flex items-center justify-center space-x-2 shadow-sm disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{loading ? 'Submitting...' : 'Send Enquiry & Schedule Walkthrough'}</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Location Map Visual Box */}
        <div className="bg-white rounded-xl border border-[#DADDD5] p-6 sm:p-8 editorial-shadow">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-[#DADDD5] gap-3">
            <div>
              <h3 className="text-base font-bold text-[#222222]">Strategic Thoothukudi Connectivity</h3>
              <p className="text-xs text-[#666A5D]">Easy road access to all our plotted developments from Thoothukudi Old/New Bus Stands and Airport</p>
            </div>
            <a
              href="https://maps.google.com/?q=Korampallam,Thoothukudi,Tamil+Nadu"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 text-xs font-semibold bg-[#F4F5F0] text-[#222222] border border-[#DADDD5] rounded hover:border-[#668F35]"
            >
              <MapPin className="w-3.5 h-3.5 text-[#668F35]" />
              <span>Open in Google Maps ↗</span>
            </a>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-[#55594D]">
            <div className="p-3 bg-[#F4F5F0] rounded border border-[#DADDD5]">
              <strong className="block text-[#222222]">District Collectorate</strong>
              <span className="text-gray-500">3 mins drive from Korampallam</span>
            </div>
            <div className="p-3 bg-[#F4F5F0] rounded border border-[#DADDD5]">
              <strong className="block text-[#222222]">VOC Port Trust</strong>
              <span className="text-gray-500">12 mins via Harbour Bypass</span>
            </div>
            <div className="p-3 bg-[#F4F5F0] rounded border border-[#DADDD5]">
              <strong className="block text-[#222222]">Vagaikulam Airport</strong>
              <span className="text-gray-500">15 mins via NH 138 4-Lane</span>
            </div>
            <div className="p-3 bg-[#F4F5F0] rounded border border-[#DADDD5]">
              <strong className="block text-[#222222]">New Bus Stand</strong>
              <span className="text-gray-500">8 mins from Millerpuram</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
