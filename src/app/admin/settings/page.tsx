'use client';

import { useState } from 'react';
import {
  Settings,
  Save,
  MapPin,
  Shield,
  Phone,
  Mail,
  Building,
  CheckCircle2,
  AlertCircle,
  Plus,
  Trash2,
  Globe,
  Sliders,
  FileCheck
} from 'lucide-react';

export default function AdminSettingsPage() {
  const [savedSuccess, setSavedSuccess] = useState(false);

  // General Settings
  const [platformName, setPlatformName] = useState('Plot 4 Tuty');
  const [supportPhone, setSupportPhone] = useState('+91 94431 23456');
  const [supportEmail, setSupportEmail] = useState('contact@plot4thoothukudi.com');
  const [whatsappNumber, setWhatsappNumber] = useState('+91 94431 23456');
  const [officeAddress, setOfficeAddress] = useState(
    'No. 42/B, Palayamkottai Road, Near 3rd Mile, Thoothukudi - 628008, Tamil Nadu'
  );

  // Corridors Management
  const [corridors, setCorridors] = useState([
    'Korampallam (Collectorate & Judicial Hub)',
    'Palayamkottai Road (Commercial & Educational Belt)',
    'Harbour Express Bypass (Port & Industrial Corridor)',
    'Millerpuram (Prime City Residential)',
    'Muthiapuram (Harbour Suburb)',
    'Ettayapuram Road (SIPCOT Corridor)'
  ]);
  const [newCorridor, setNewCorridor] = useState('');

  // Regulatory & Moderation Defaults
  const [requireDTCPApproval, setRequireDTCPApproval] = useState(true);
  const [enableSurveyWatermark, setEnableSurveyWatermark] = useState(true);
  const [instantWhatsAppNotification, setInstantWhatsAppNotification] = useState(true);
  const [enableBuyerSelfServiceCompare, setEnableBuyerSelfServiceCompare] = useState(true);

  const handleAddCorridor = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCorridor.trim() && !corridors.includes(newCorridor.trim())) {
      setCorridors([...corridors, newCorridor.trim()]);
      setNewCorridor('');
    }
  };

  const handleRemoveCorridor = (index: number) => {
    setCorridors(corridors.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#DADDD5] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase font-extrabold tracking-wider text-[#668F35] bg-[#EBF2DE] px-3 py-1 rounded-full border border-[#D5E3C3]">
            Platform Governance
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-[#1F271B] mt-2">
            Settings &amp; Thoothukudi Localities
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Configure platform contacts, legal verification mandates, active Thoothukudi corridors, and system notifications.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-[#668F35] text-white font-bold text-xs hover:bg-[#55772C] transition-colors shadow-xs cursor-pointer self-start sm:self-auto"
        >
          <Save className="w-4 h-4" />
          <span>Save Changes</span>
        </button>
      </div>

      {savedSuccess && (
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 p-4 rounded-2xl flex items-center space-x-3 text-sm animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          <span>Platform configuration updated successfully. Cached across all three portals.</span>
        </div>
      )}

      {/* Grid of Settings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Section 1: General Platform Information */}
        <div className="bg-white p-6 rounded-3xl border border-[#DADDD5] shadow-xs space-y-4">
          <div className="flex items-center space-x-2.5 pb-3 border-b border-gray-100">
            <Building className="w-5 h-5 text-[#668F35]" />
            <h2 className="text-sm font-black text-[#1F271B] uppercase tracking-wider">
              Marketplace Identity &amp; Contact
            </h2>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Marketplace Brand Name</label>
            <input
              type="text"
              value={platformName}
              onChange={(e) => setPlatformName(e.target.value)}
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-[#668F35] bg-gray-50/50"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Helpline Phone</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                <input
                  type="text"
                  value={supportPhone}
                  onChange={(e) => setSupportPhone(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-[#668F35] bg-gray-50/50"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Official WhatsApp</label>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-emerald-600" />
                <input
                  type="text"
                  value={whatsappNumber}
                  onChange={(e) => setWhatsappNumber(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-[#668F35] bg-gray-50/50"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Administrative Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
              <input
                type="email"
                value={supportEmail}
                onChange={(e) => setSupportEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-[#668F35] bg-gray-50/50"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Thoothukudi Head Office Address</label>
            <textarea
              rows={2}
              value={officeAddress}
              onChange={(e) => setOfficeAddress(e.target.value)}
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-[#668F35] bg-gray-50/50"
            />
          </div>
        </div>

        {/* Section 2: Thoothukudi Corridors Configuration */}
        <div className="bg-white p-6 rounded-3xl border border-[#DADDD5] shadow-xs space-y-4">
          <div className="flex items-center space-x-2.5 pb-3 border-b border-gray-100">
            <MapPin className="w-5 h-5 text-[#668F35]" />
            <h2 className="text-sm font-black text-[#1F271B] uppercase tracking-wider">
              Thoothukudi Growth Corridors ({corridors.length})
            </h2>
          </div>

          <p className="text-xs text-gray-500">
            These corridors populate the search filters and dropdowns across Customer and Seller forms.
          </p>

          <form onSubmit={handleAddCorridor} className="flex gap-2">
            <input
              type="text"
              placeholder="e.g. Tiruchendur Highway (Suburban)"
              value={newCorridor}
              onChange={(e) => setNewCorridor(e.target.value)}
              className="flex-1 px-3.5 py-2 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-[#668F35] bg-gray-50/50"
            />
            <button
              type="submit"
              className="px-3.5 py-2 rounded-xl bg-[#142016] text-[#B7E436] font-bold text-xs hover:bg-[#203123] transition-colors flex items-center space-x-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add</span>
            </button>
          </form>

          <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
            {corridors.map((c, idx) => (
              <div
                key={c}
                className="flex items-center justify-between p-2.5 rounded-xl bg-[#FAFBF9] border border-gray-100 text-xs"
              >
                <div className="flex items-center space-x-2 font-medium text-gray-800">
                  <span className="w-5 h-5 rounded-full bg-[#EBF2DE] text-[#668F35] text-[10px] font-black flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <span>{c}</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveCorridor(idx)}
                  className="text-gray-400 hover:text-red-500 transition-colors p-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: Legal & Regulatory Rules */}
        <div className="bg-white p-6 rounded-3xl border border-[#DADDD5] shadow-xs space-y-4">
          <div className="flex items-center space-x-2.5 pb-3 border-b border-gray-100">
            <FileCheck className="w-5 h-5 text-[#668F35]" />
            <h2 className="text-sm font-black text-[#1F271B] uppercase tracking-wider">
              Legal &amp; Moderation Controls
            </h2>
          </div>

          <div className="space-y-3.5">
            <label className="flex items-start space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={requireDTCPApproval}
                onChange={(e) => setRequireDTCPApproval(e.target.checked)}
                className="mt-0.5 rounded text-[#668F35] focus:ring-[#668F35] w-4 h-4"
              />
              <div>
                <span className="text-xs font-bold text-[#1F271B] block">
                  Enforce DTCP / TNRERA Document Verification
                </span>
                <span className="text-[11px] text-gray-500">
                  Listings without approved survey numbers will remain in &quot;Pending Review&quot; until verified by admin.
                </span>
              </div>
            </label>

            <label className="flex items-start space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={enableSurveyWatermark}
                onChange={(e) => setEnableSurveyWatermark(e.target.checked)}
                className="mt-0.5 rounded text-[#668F35] focus:ring-[#668F35] w-4 h-4"
              />
              <div>
                <span className="text-xs font-bold text-[#1F271B] block">
                  Auto-Watermark Uploaded Survey Sketches
                </span>
                <span className="text-[11px] text-gray-500">
                  Embeds &quot;PLOT 4 TUTY VERIFIED&quot; stamp across high-resolution FMB sketches.
                </span>
              </div>
            </label>

            <label className="flex items-start space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={instantWhatsAppNotification}
                onChange={(e) => setInstantWhatsAppNotification(e.target.checked)}
                className="mt-0.5 rounded text-[#668F35] focus:ring-[#668F35] w-4 h-4"
              />
              <div>
                <span className="text-xs font-bold text-[#1F271B] block">
                  Instant WhatsApp Webhook on Buyer Enquiry
                </span>
                <span className="text-[11px] text-gray-500">
                  Sends direct buyer enquiry notifications to the seller&apos;s registered WhatsApp number.
                </span>
              </div>
            </label>

            <label className="flex items-start space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={enableBuyerSelfServiceCompare}
                onChange={(e) => setEnableBuyerSelfServiceCompare(e.target.checked)}
                className="mt-0.5 rounded text-[#668F35] focus:ring-[#668F35] w-4 h-4"
              />
              <div>
                <span className="text-xs font-bold text-[#1F271B] block">
                  Enable Buyer Side-by-Side Comparison Tool
                </span>
                <span className="text-[11px] text-gray-500">
                  Permits public buyers to compare rates, dimensions, and approval numbers on `/compare`.
                </span>
              </div>
            </label>
          </div>
        </div>

        {/* Section 4: Security & Access Policy */}
        <div className="bg-white p-6 rounded-3xl border border-[#DADDD5] shadow-xs space-y-4">
          <div className="flex items-center space-x-2.5 pb-3 border-b border-gray-100">
            <Shield className="w-5 h-5 text-[#668F35]" />
            <h2 className="text-sm font-black text-[#1F271B] uppercase tracking-wider">
              Security &amp; Portal Isolation
            </h2>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#FAFBF9] border border-gray-100 space-y-2 text-xs">
            <div className="flex items-center justify-between font-bold text-[#1F271B]">
              <span>Customer Portal Isolation</span>
              <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px]">Active</span>
            </div>
            <p className="text-[11px] text-gray-500">
              Customer navigation bar contains zero links or references to Seller or Admin portals.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#FAFBF9] border border-gray-100 space-y-2 text-xs">
            <div className="flex items-center justify-between font-bold text-[#1F271B]">
              <span>Seller Multi-Tenancy</span>
              <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px]">Enforced</span>
            </div>
            <p className="text-[11px] text-gray-500">
              Sellers can only inspect and modify their own plots, invoices, and direct inquiries.
            </p>
          </div>

          <div className="pt-2">
            <button
              onClick={handleSave}
              className="w-full py-2.5 rounded-xl bg-[#142016] text-[#B7E436] font-bold text-xs hover:bg-[#203123] transition-colors border border-[#253527] cursor-pointer"
            >
              Save Platform Policies
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
