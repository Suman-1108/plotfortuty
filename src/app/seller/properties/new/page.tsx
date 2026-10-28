'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Building2,
  MapPin,
  IndianRupee,
  Layers,
  Compass,
  ShieldCheck,
  Upload,
  CheckCircle2,
  ArrowLeft,
  Sparkles
} from 'lucide-react';

export default function NewPlotPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const [form, setForm] = useState({
    title: '',
    project: 'Pearl Haven Layout',
    location: 'Korampallam',
    address: '',
    price: '',
    areaCents: '3.5',
    areaSqFt: '1524',
    dimensions: '30 ft x 50.8 ft',
    facing: 'North-East',
    roadWidth: '40 ft Wide Blacktop Tar Road',
    approval: 'DTCP & RERA Approved',
    approvalNumber: 'DTCP No. 128/2023',
    pattaStatus: 'Individual Clear Patta Ready',
    description: '',
    groundwater: 'Sweet Water at 35 ft',
    status: 'Available',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const priceNum = Number(form.price) || 2500000;
      const areaCentsNum = Number(form.areaCents) || 3.5;
      const areaSqFtNum = Number(form.areaSqFt) || Math.round(areaCentsNum * 435.6);

      const payload = {
        title: form.title || 'Executive Residential Plot in Thoothukudi',
        project: form.project,
        location: form.location,
        address: form.address || `${form.location}, Thoothukudi, Tamil Nadu`,
        price: priceNum,
        priceDisplay: `₹${(priceNum / 100000).toFixed(2)} Lakhs`,
        pricePerSqFt: Math.round(priceNum / areaSqFtNum),
        pricePerCent: Math.round(priceNum / areaCentsNum),
        areaSqFt: areaSqFtNum,
        areaCents: areaCentsNum,
        dimensions: form.dimensions,
        facing: form.facing,
        roadWidth: form.roadWidth,
        approval: form.approval,
        approvalNumber: form.approvalNumber,
        pattaStatus: form.pattaStatus,
        status: 'Available',
        isFeatured: false,
        description: form.description || 'Verified residential plot in prime Thoothukudi layout with clear patta and sweet groundwater.',
        amenities: [
          form.roadWidth,
          form.groundwater,
          'Underground Drainage',
          'Solar Streetlights',
          'Clear Title Deed'
        ],
        landmarks: [
          { name: 'Collectorate Complex', distance: '2.0 km' },
          { name: 'Main Road Access', distance: '300 m' }
        ],
        images: ['/images/real_estate.png'],
        layoutPlotNumber: 'Plot #New',
        createdAt: new Date().toISOString().split('T')[0]
      };

      const res = await fetch('/api/plots', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setSuccess(true);
        setTimeout(() => {
          router.push('/seller/properties');
        }, 1500);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Back button */}
      <div className="flex items-center justify-between">
        <Link
          href="/seller/properties"
          className="inline-flex items-center space-x-1.5 text-xs font-bold text-[#668F35] hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to My Plots</span>
        </Link>
        <span className="text-xs font-semibold text-gray-500">Growth Plan Quota: 3 slots remaining</span>
      </div>

      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#DADDD5] shadow-xs">
        <div className="flex items-center space-x-2 text-[#668F35] text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-4 h-4" />
          <span>Authentic Property Verification</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-[#1F271B] mt-1">
          Add New Residential Plot
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          Provide genuine land dimensions, road access width, survey details, and DTCP/RERA references.
        </p>

        {success && (
          <div className="mt-4 p-4 rounded-2xl bg-[#EBF2DE] border border-[#D5E3C3] text-xs font-bold text-[#486725] flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>Plot listing submitted successfully! Redirecting to inventory...</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-6 text-xs sm:text-sm">
          {/* Section 1: Basic Information */}
          <div className="space-y-4">
            <h3 className="font-extrabold text-sm text-[#1F271B] border-b pb-2">
              1. Basic Land Identification
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Listing Title *
                </label>
                <input
                  type="text"
                  required
                  name="title"
                  placeholder="e.g. Pearl Haven - 4 Cents Corner Plot"
                  value={form.title}
                  onChange={handleChange}
                  className="w-full p-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#668F35] font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Project / Layout Name *
                </label>
                <input
                  type="text"
                  required
                  name="project"
                  placeholder="e.g. Pearl Haven Gated Community"
                  value={form.project}
                  onChange={handleChange}
                  className="w-full p-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#668F35] font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Thoothukudi Locality / Corridor *
                </label>
                <select
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  className="w-full p-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#668F35] font-bold"
                >
                  <option value="Korampallam">Korampallam (Collectorate)</option>
                  <option value="Palayamkottai Road">Palayamkottai Road (NH 138)</option>
                  <option value="Harbour Bypass Road">Harbour Bypass Road</option>
                  <option value="Millerpuram">Millerpuram (City Center)</option>
                  <option value="Muthiapuram">Muthiapuram &amp; Port Zone</option>
                  <option value="Ettayapuram Road">Ettayapuram Road</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Exact Site Address &amp; Landmarks
                </label>
                <input
                  type="text"
                  name="address"
                  placeholder="Near SPIC Nagar, 2 mins from Collectorate"
                  value={form.address}
                  onChange={handleChange}
                  className="w-full p-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#668F35]"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Dimensions & Pricing */}
          <div className="space-y-4 pt-2">
            <h3 className="font-extrabold text-sm text-[#1F271B] border-b pb-2">
              2. Dimensions, Area &amp; Pricing
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Total Area in Cents *
                </label>
                <input
                  type="number"
                  step="0.01"
                  required
                  name="areaCents"
                  placeholder="e.g. 4.13"
                  value={form.areaCents}
                  onChange={handleChange}
                  className="w-full p-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#668F35] font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Dimensions (L x W)
                </label>
                <input
                  type="text"
                  name="dimensions"
                  placeholder="e.g. 40 ft x 45 ft"
                  value={form.dimensions}
                  onChange={handleChange}
                  className="w-full p-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#668F35]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Total Price in ₹ *
                </label>
                <input
                  type="number"
                  required
                  name="price"
                  placeholder="e.g. 3200000"
                  value={form.price}
                  onChange={handleChange}
                  className="w-full p-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#668F35] font-bold text-[#1F271B]"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Orientation & Access Road */}
          <div className="space-y-4 pt-2">
            <h3 className="font-extrabold text-sm text-[#1F271B] border-b pb-2">
              3. Orientation, Road Access &amp; Infrastructure
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Facing / Orientation *
                </label>
                <select
                  name="facing"
                  value={form.facing}
                  onChange={handleChange}
                  className="w-full p-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#668F35] font-semibold"
                >
                  <option value="North">North Facing</option>
                  <option value="East">East Facing</option>
                  <option value="North-East">North-East Facing</option>
                  <option value="South">South Facing</option>
                  <option value="West">West Facing</option>
                  <option value="Corner">Corner Plot</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Approach Road Width *
                </label>
                <select
                  name="roadWidth"
                  value={form.roadWidth}
                  onChange={handleChange}
                  className="w-full p-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#668F35] font-semibold"
                >
                  <option value="40 ft Wide Blacktop Tar Road">40 ft Wide Blacktop Tar Road</option>
                  <option value="30 ft Wide Blacktop Tar Road">30 ft Wide Blacktop Tar Road</option>
                  <option value="50 ft Avenue Tar Road">50 ft Avenue Tar Road</option>
                  <option value="60 ft Arterial Road">60 ft Arterial Road</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Groundwater Depth
                </label>
                <input
                  type="text"
                  name="groundwater"
                  placeholder="Sweet Water at 35 ft"
                  value={form.groundwater}
                  onChange={handleChange}
                  className="w-full p-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#668F35]"
                />
              </div>
            </div>
          </div>

          {/* Section 4: Legal Approvals */}
          <div className="space-y-4 pt-2">
            <h3 className="font-extrabold text-sm text-[#1F271B] border-b pb-2">
              4. Legal Approval References &amp; Patta Status
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Approval Authority *
                </label>
                <select
                  name="approval"
                  value={form.approval}
                  onChange={handleChange}
                  className="w-full p-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#668F35] font-bold"
                >
                  <option value="DTCP & RERA Approved">DTCP &amp; RERA Approved</option>
                  <option value="DTCP Approved">DTCP Approved</option>
                  <option value="RERA Registered">RERA Registered</option>
                  <option value="Panchayat Approved">Panchayat Approved</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Approval Reference / Order Number *
                </label>
                <input
                  type="text"
                  required
                  name="approvalNumber"
                  placeholder="DTCP No. 128/2023 | TNRERA/P/1094"
                  value={form.approvalNumber}
                  onChange={handleChange}
                  className="w-full p-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#668F35] font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Patta Status *
                </label>
                <select
                  name="pattaStatus"
                  value={form.pattaStatus}
                  onChange={handleChange}
                  className="w-full p-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#668F35] font-semibold"
                >
                  <option value="Individual Clear Patta Ready">Individual Clear Patta Ready</option>
                  <option value="Patta Transfer in Progress">Patta Transfer in Progress</option>
                  <option value="Joint Patta with Sub-Division Ordered">Joint Patta with Sub-Division Ordered</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Upload Survey Sketch / Plan (Simulated)
                </label>
                <div className="p-3 border border-dashed border-gray-300 rounded-xl flex items-center justify-center space-x-2 text-xs text-gray-500 bg-gray-50 cursor-pointer hover:bg-gray-100">
                  <Upload className="w-4 h-4 text-[#668F35]" />
                  <span>Attach Layout Blueprint (PDF or PNG)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4 border-t flex justify-end">
            <button
              type="submit"
              disabled={submitting}
              className="px-8 py-3 rounded-2xl bg-[#B7E436] hover:bg-[#A6D42A] text-[#1C2618] font-black text-sm transition-all shadow-md cursor-pointer disabled:opacity-50"
            >
              {submitting ? 'Submitting Verification...' : 'Publish Plot to Marketplace'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
