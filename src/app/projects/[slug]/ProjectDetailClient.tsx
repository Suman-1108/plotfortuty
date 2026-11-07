'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Project, Plot, ConstructionPackage } from '@/lib/types';
import InteractivePlotLayout from '@/components/projects/InteractivePlotLayout';
import {
  ShieldCheck,
  MapPin,
  CheckCircle2,
  Phone,
  MessageSquare,
  ArrowRight,
  Sparkles,
  Building2,
  Calendar,
  Layers,
  Search,
  Filter,
  Check,
  Info,
  Clock,
  Compass,
  FileSpreadsheet,
  Banknote,
  Waves,
  Eye,
  Download
} from 'lucide-react';

interface ProjectDetailClientProps {
  project: Project;
  initialPlots: Plot[];
}

export default function ProjectDetailClient({ project, initialPlots }: ProjectDetailClientProps) {
  // Explorer Filters
  const [selectedGroup, setSelectedGroup] = useState<'All' | 'Group 1' | 'Group 2'>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [selectedFacing, setSelectedFacing] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedPlot, setSelectedPlot] = useState<Plot | null>(initialPlots[1] || initialPlots[0] || null);

  // Construction Calculator State
  const [selectedPackage, setSelectedPackage] = useState<string>('pkg-basic');
  const [builtUpArea, setBuiltUpArea] = useState<number>(1000);

  // Enquiry Form State
  const [enquiryForm, setEnquiryForm] = useState({
    name: '',
    phone: '',
    email: '',
    siteVisitDate: '',
    plotNumber: selectedPlot?.plotNumber || '',
    message: ''
  });
  const [enquirySubmitting, setEnquirySubmitting] = useState(false);
  const [enquirySuccess, setEnquirySuccess] = useState(false);
  const [enquiryError, setEnquiryError] = useState('');

  // Filtered Plots for Explorer
  const filteredPlots = useMemo(() => {
    return initialPlots.filter((p) => {
      if (selectedGroup !== 'All' && p.layoutGroup !== selectedGroup) return false;
      if (selectedStatus !== 'All' && p.status !== selectedStatus) return false;
      if (selectedFacing !== 'All' && !p.facing.toLowerCase().includes(selectedFacing.toLowerCase())) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const match =
          p.title.toLowerCase().includes(q) ||
          p.plotNumber?.toLowerCase().includes(q) ||
          p.layoutPlotNumber.toLowerCase().includes(q) ||
          p.dimensions.toLowerCase().includes(q);
        if (!match) return false;
      }
      return true;
    });
  }, [initialPlots, selectedGroup, selectedStatus, selectedFacing, searchQuery]);

  // Statistics
  const stats = useMemo(() => {
    const total = initialPlots.length;
    const available = initialPlots.filter((p) => p.status === 'Available' || p.status === 'Fast Selling').length;
    const reserved = initialPlots.filter((p) => p.status === 'Reserved').length;
    const booked = initialPlots.filter((p) => p.status === 'Booked').length;
    const sold = initialPlots.filter((p) => p.status === 'Sold').length;
    return { total, available, reserved, booked, sold };
  }, [initialPlots]);

  // Pricing formula calculator for selected plot
  const pricingDetails = useMemo(() => {
    if (!selectedPlot) return null;
    const cents = selectedPlot.areaCents || 2.75;
    const ratePerCent = selectedPlot.pricePerCent || 527272;
    const cornerPremium = selectedPlot.isCornerPlot ? Math.round(cents * ratePerCent * 0.05) : 0;
    const baseCost = Math.round(cents * ratePerCent);
    const totalPlotPrice = baseCost + cornerPremium;
    const regCharges = Math.round(totalPlotPrice * 0.07); // ~7% stamp duty and registration
    return {
      cents,
      ratePerCent,
      baseCost,
      cornerPremium,
      totalPlotPrice,
      regCharges,
      grandTotal: totalPlotPrice + regCharges
    };
  }, [selectedPlot]);

  // Construction Package Cost Calculation
  const constructionPackages: ConstructionPackage[] =
    project.constructionPackages || [
      {
        id: 'pkg-basic',
        name: 'Basic Villa Package',
        tagline: 'High Durability Standard Construction',
        ratePerSqFt: 1950,
        specs: {
          foundation: 'Isolated RCC Column Footing with anti-termite treatment',
          structure: 'RCC framed structure with brick masonry',
          flooring: '2x2 vitrified tiles',
          doorsWindows: 'Teak wood main entrance door, UPVC glass windows',
          kitchen: 'Granite counter with SS sink',
          bathrooms: 'Anti-skid ceramic tiles with branded CP fittings',
          electrical: 'Finolex flame-retardant wiring with modular switches',
          painting: 'Interior 2 coats putty with tractor emulsion'
        },
        highlights: ['Sweet groundwater layout link', 'Overhead PVC water tank', '6-Month complete handover'],
        estimatedTimelineMonths: 6,
        isActive: true
      },
      {
        id: 'pkg-premium',
        name: 'Premium Beachside Villa',
        tagline: 'Contemporary Architecture & Fine Teak Woodwork',
        ratePerSqFt: 2450,
        specs: {
          foundation: 'Deep reinforced RCC Raft / Column footing',
          structure: 'M25 grade RCC framed structure with fly-ash clay bricks',
          flooring: 'Large 4x2 glossy vitrified tiles',
          doorsWindows: 'First quality Burma Teak entrance door with biometric lock',
          kitchen: 'Quartz counter with double bowl sink & modular cabinetry',
          bathrooms: 'Jaguar / Kohler concealed diverters & wall-hung EWCs',
          electrical: 'Legrand modular switches with smart automation prep',
          painting: 'Asian Paints Royale luxury emulsion'
        },
        highlights: ['Individual 4000L water sump', 'Corrosion-resistant GI railings', '8-Month turnkey handover'],
        estimatedTimelineMonths: 8,
        isActive: true
      },
      {
        id: 'pkg-luxury',
        name: 'Luxury Holiday Home',
        tagline: 'Bespoke Coastal Retreat with Private Terrace Deck',
        ratePerSqFt: 3100,
        specs: {
          foundation: 'Marine-grade reinforced RCC foundation with waterproof membranes',
          structure: 'Monolithic RCC frame with hollow clay block thermal insulation',
          flooring: 'Italian Marble in living & wooden-finish bedroom tiles',
          doorsWindows: 'Solid 8ft Teakwood door with Video Phone, double-glazed facade',
          kitchen: 'Soft-close acrylic modular kitchen with quartz island',
          bathrooms: 'Kohler rain showers, glass cubicles & heated towel rails',
          electrical: 'Full Smart Home IoT automation with solar power prep',
          painting: 'Texture wall accents with PU wooden polish'
        },
        highlights: ['Rooftop stargazing deck', 'Architectural landscape garden', '10-Year structural warranty'],
        estimatedTimelineMonths: 10,
        isActive: true
      }
    ];

  const currentPkg = constructionPackages.find((p) => p.id === selectedPackage) || constructionPackages[0];
  const calculatedConstructionCost = Math.round(builtUpArea * currentPkg.ratePerSqFt);

  // Handle Enquiry Submit
  const handleEnquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEnquirySubmitting(true);
    setEnquiryError('');

    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: enquiryForm.name,
          phone: enquiryForm.phone,
          email: enquiryForm.email,
          projectId: project.id,
          plotId: selectedPlot?.id,
          plotTitle: selectedPlot ? `${project.name} - ${selectedPlot.title}` : project.name,
          preferredLocation: project.location,
          message: `${enquiryForm.message || 'General site visit & enquiry'} | Plot: #${enquiryForm.plotNumber || selectedPlot?.plotNumber || 'Any'} | Date: ${enquiryForm.siteVisitDate || 'Not specified'}`
        })
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to submit enquiry');
      }

      setEnquirySuccess(true);
      setEnquiryForm({
        name: '',
        phone: '',
        email: '',
        siteVisitDate: '',
        plotNumber: '',
        message: ''
      });
    } catch (err: unknown) {
      setEnquiryError(err instanceof Error ? err.message : 'Submission failed. Please call us directly.');
    } finally {
      setEnquirySubmitting(false);
    }
  };

  return (
    <div className="bg-[#F4F5F0] text-[#1F271B] min-h-screen">
      {/* =========================================================================
          SECTION 1: PROJECT HERO
      ========================================================================== */}
      <section className="relative bg-[#1F271B] text-white pt-12 pb-20 sm:pt-16 sm:pb-28 overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#B7E436]/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Hero Text */}
            <div className="lg:col-span-7 space-y-5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black tracking-wide uppercase bg-[#B7E436] text-[#1F271B]">
                  <ShieldCheck className="w-4 h-4 stroke-[2.5]" />
                  <span>100% DTCP Approved &amp; CRZ Cleared</span>
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-gray-200 border border-white/15">
                  DTCP No. 112/2024
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-gray-200 border border-white/15">
                  181 Scheduled Entries
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
                {project.name}
              </h1>

              <p className="text-base sm:text-xl font-medium text-[#B7E436]">
                {project.tagline}
              </p>

              <p className="text-sm sm:text-base text-gray-300 max-w-2xl leading-relaxed">
                Experience beachside living in Tharuvaikulam, Thoothukudi District. Master-planned plotted layout featuring 33ft &amp; 40ft blacktop roads, sweet groundwater, 24/7 security, turnkey villa construction, and up to 90% pre-approved bank loans.
              </p>

              {/* Quick Hero Highlights */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-3">
                  <div className="text-xs text-gray-400">Total Entries</div>
                  <div className="text-xl font-black text-white">181 Plots</div>
                  <div className="text-[10px] text-gray-400">G1: 145 | G2: 36</div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-3">
                  <div className="text-xs text-gray-400">Beach Distance</div>
                  <div className="text-xl font-black text-[#B7E436]">350 Meters</div>
                  <div className="text-[10px] text-gray-400">3-min walk</div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-3">
                  <div className="text-xs text-gray-400">Plot Sizes</div>
                  <div className="text-xl font-black text-white">2.3 - 5.5 Cents</div>
                  <div className="text-[10px] text-gray-400">1000 - 2400 sq.ft</div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-3">
                  <div className="text-xs text-gray-400">Bank Loan</div>
                  <div className="text-xl font-black text-[#B7E436]">Up to 90%</div>
                  <div className="text-[10px] text-gray-400">Composite loan</div>
                </div>
              </div>

              {/* Hero Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-4">
                <a
                  href="#layout-section"
                  className="px-6 py-3.5 rounded-2xl bg-[#B7E436] hover:bg-[#A6D42A] text-[#1C2618] text-sm font-extrabold shadow-md transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Explore Interactive Layout</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </a>
                <a
                  href="#enquiry-section"
                  className="px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white text-sm font-extrabold border border-white/20 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Free Site Visit</span>
                </a>
                <a
                  href="https://wa.me/919443152633?text=Hello%20Plot%204%20Tuty,%20I%20am%20interested%20in%20AP%20Rajan%20Garden%20plots%20and%20turnkey%20villa%20construction."
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-extrabold shadow-md transition-all flex items-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp Desk</span>
                </a>
              </div>
            </div>

            {/* Right Column: Hero Visual Card */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden border border-white/15 shadow-2xl bg-black aspect-4/3 group">
                <Image
                  src={project.image || '/images/ap-rajan-garden-layout.jpg'}
                  alt="AP Rajan Garden Layout View"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20"></div>
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-black/60 backdrop-blur-md border border-white/15">
                  <div className="flex items-center justify-between text-xs text-gray-200">
                    <span className="flex items-center gap-1.5 font-bold text-[#B7E436]">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>Tharuvaikulam Coastal Belt</span>
                    </span>
                    <span className="text-[11px] bg-white/20 px-2 py-0.5 rounded text-white font-mono">
                      ECR Road (0.5 km)
                    </span>
                  </div>
                  <p className="text-white font-bold text-sm mt-1">
                    Promoted by Sri Balaji Promoters &amp; Builders
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: PROJECT OVERVIEW
      ========================================================================== */}
      <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#DADDD5] shadow-xs space-y-6">
          <div className="max-w-3xl">
            <span className="text-xs uppercase font-extrabold tracking-wider text-[#668F35] bg-[#EBF2DE] px-3 py-1 rounded-full border border-[#D5E3C3]">
              Project Overview
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#1F271B] mt-2">
              About AP Rajan Garden
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mt-2 leading-relaxed">
              {project.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-4">
            <div className="p-5 rounded-2xl bg-[#F8F9F6] border border-gray-200 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-[#EBF2DE] flex items-center justify-center text-[#668F35]">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-base font-black text-[#1F271B]">Two Well-Planned Groups</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                <strong>Group 1:</strong> 145 residential plots with central 40ft and 33ft tar avenues.<br />
                <strong>Group 2:</strong> 36 exclusive beachside sanctuary plots.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#F8F9F6] border border-gray-200 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-[#EBF2DE] flex items-center justify-center text-[#668F35]">
                <Building2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-black text-[#1F271B]">Plot + Turnkey Villa Support</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Purchase your plot with complete turnkey construction support. Choose from Basic, Premium, or Luxury coastal villa packages with architectural 2D/3D planning.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#F8F9F6] border border-gray-200 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-[#EBF2DE] flex items-center justify-center text-[#668F35]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-black text-[#1F271B]">Clear Title &amp; Immediate Patta</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                100% legal title clearance verified by leading advocates. Layout is DTCP approved and compliant with coastal regulatory norms with immediate individual patta transfer.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: LOCATION ADVANTAGES
      ========================================================================== */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#DADDD5] shadow-xs space-y-8">
          <div>
            <span className="text-xs uppercase font-extrabold tracking-wider text-[#668F35] bg-[#EBF2DE] px-3 py-1 rounded-full border border-[#D5E3C3]">
              Location &amp; Connectivity
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#1F271B] mt-2">
              Strategic Advantages in Tharuvaikulam Coastal Belt
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1 max-w-2xl">
              Situated in the fastest appreciating tourism and residential belt of Thoothukudi, adjacent to the ECR corridor and 53-acre tourism project.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {project.landmarks.map((landmark, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-[#F8F9F6] border border-gray-200 hover:border-[#668F35] transition-all flex items-start space-x-3"
              >
                <div className="p-2 rounded-xl bg-white border border-gray-200 text-[#668F35] shrink-0 mt-0.5">
                  <Compass className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#1F271B]">{landmark.name}</h4>
                  <p className="text-xs font-semibold text-[#668F35] mt-0.5">{landmark.distance}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: INTERACTIVE PLOT LAYOUT
      ========================================================================== */}
      <section id="layout-section" className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <InteractivePlotLayout
          plots={initialPlots}
          layoutImageUrl={project.layoutImageUrl || '/images/ap-rajan-garden-layout.jpg'}
          onSelectPlot={(p) => {
            setSelectedPlot(p);
            setEnquiryForm((prev) => ({ ...prev, plotNumber: p.plotNumber || '' }));
          }}
        />
      </section>

      {/* =========================================================================
          SECTION 5: INDIVIDUAL PLOT EXPLORER (SEARCH, FILTER & 181 ENTRIES TABLE)
      ========================================================================== */}
      <section id="explorer-section" className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#DADDD5] shadow-xs space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-gray-100">
            <div>
              <span className="text-xs uppercase font-extrabold tracking-wider text-[#668F35] bg-[#EBF2DE] px-3 py-1 rounded-full border border-[#D5E3C3]">
                Schedule Inventory Explorer
              </span>
              <h2 className="text-2xl font-black text-[#1F271B] mt-2">
                All 181 Scheduled Entries
              </h2>
              <p className="text-xs text-gray-500">
                Filter and inspect individual plots across Group 1 (145 plots) and Group 2 (36 plots).
              </p>
            </div>

            <div className="flex items-center gap-2">
              <a
                href="/api/plots/export?projectId=proj-ap-rajan-garden"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-gray-300 text-xs font-bold text-gray-700 hover:bg-gray-50 shadow-2xs"
              >
                <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                <span>Export Excel</span>
              </a>
            </div>
          </div>

          {/* Filter Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search plot #, size..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-300 text-xs text-gray-800 focus:outline-hidden focus:ring-2 focus:ring-[#668F35]"
              />
            </div>

            {/* Group Filter */}
            <div>
              <select
                value={selectedGroup}
                onChange={(e) => setSelectedGroup(e.target.value as 'All' | 'Group 1' | 'Group 2')}
                className="w-full px-3 py-2.5 rounded-xl border border-gray-300 text-xs text-gray-800 bg-white focus:outline-hidden focus:ring-2 focus:ring-[#668F35]"
              >
                <option value="All">All Groups (181 Plots)</option>
                <option value="Group 1">Group 1 (145 Plots)</option>
                <option value="Group 2">Group 2 (36 Plots)</option>
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-gray-300 text-xs text-gray-800 bg-white focus:outline-hidden focus:ring-2 focus:ring-[#668F35]"
              >
                <option value="All">All Statuses</option>
                <option value="Available">Available (Green)</option>
                <option value="Reserved">Reserved (Yellow)</option>
                <option value="Booked">Booked (Blue)</option>
                <option value="Sold">Sold (Red)</option>
              </select>
            </div>

            {/* Facing Filter */}
            <div>
              <select
                value={selectedFacing}
                onChange={(e) => setSelectedFacing(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-gray-300 text-xs text-gray-800 bg-white focus:outline-hidden focus:ring-2 focus:ring-[#668F35]"
              >
                <option value="All">All Facings</option>
                <option value="East">East Facing</option>
                <option value="North">North Facing</option>
                <option value="West">West Facing</option>
                <option value="South">South Facing</option>
              </select>
            </div>
          </div>

          {/* Results Summary */}
          <div className="flex items-center justify-between text-xs text-gray-500 pt-1">
            <span>Showing <strong>{filteredPlots.length}</strong> matching plots</span>
            {selectedGroup !== 'All' && <span>Filter active: {selectedGroup}</span>}
          </div>

          {/* Plots Table */}
          <div className="overflow-x-auto rounded-2xl border border-gray-200 max-h-[480px]">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-[#F8F9F6] sticky top-0 border-b border-gray-200 z-10 text-gray-700 uppercase tracking-wider font-extrabold text-[11px]">
                <tr>
                  <th className="p-3">Plot #</th>
                  <th className="p-3">Phase Group</th>
                  <th className="p-3">Size (Cents / Sq.Ft)</th>
                  <th className="p-3">Dimensions</th>
                  <th className="p-3">Facing</th>
                  <th className="p-3">Road Width</th>
                  <th className="p-3">Price</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white">
                {filteredPlots.map((plot) => {
                  const isSelected = selectedPlot?.id === plot.id;
                  return (
                    <tr
                      key={plot.id}
                      onClick={() => {
                        setSelectedPlot(plot);
                        setEnquiryForm((prev) => ({ ...prev, plotNumber: plot.plotNumber || '' }));
                      }}
                      className={`hover:bg-[#F8F9F6] transition-colors cursor-pointer ${
                        isSelected ? 'bg-[#EBF2DE]/50 font-semibold' : ''
                      }`}
                    >
                      <td className="p-3 font-mono font-bold text-[#1F271B]">
                        #{plot.plotNumber}
                        {plot.isCornerPlot && (
                          <span className="ml-1 text-[9px] px-1.5 py-0.5 rounded bg-purple-100 text-purple-700">
                            Corner
                          </span>
                        )}
                      </td>
                      <td className="p-3 text-gray-600">{plot.layoutGroup}</td>
                      <td className="p-3">
                        <span className="font-bold text-[#1F271B]">{plot.areaCents} Cents</span>
                        <span className="text-[11px] text-gray-400 block">{plot.areaSqFt} sq.ft</span>
                      </td>
                      <td className="p-3 font-mono text-gray-600">
                        {plot.dimensions}
                        {!plot.isVerified && (
                          <span className="text-[10px] text-amber-600 block">Pending Survey</span>
                        )}
                      </td>
                      <td className="p-3 text-gray-700">{plot.facing}</td>
                      <td className="p-3 text-gray-600">{plot.roadWidth}</td>
                      <td className="p-3 font-bold text-[#1F271B]">{plot.priceDisplay}</td>
                      <td className="p-3">
                        <span
                          className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            plot.status === 'Available'
                              ? 'bg-emerald-100 text-emerald-800'
                              : plot.status === 'Reserved'
                              ? 'bg-amber-100 text-amber-800'
                              : plot.status === 'Booked'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {plot.status}
                        </span>
                      </td>
                      <td className="p-3 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedPlot(plot);
                            setEnquiryForm((prev) => ({ ...prev, plotNumber: plot.plotNumber || '' }));
                            const el = document.getElementById('pricing-section');
                            if (el) el.scrollIntoView({ behavior: 'smooth' });
                          }}
                          className="px-2.5 py-1 rounded-lg bg-gray-100 hover:bg-[#B7E436] text-[#1F271B] text-[11px] font-bold transition-all"
                        >
                          Details
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6 & 7: PLOT PRICING & AVAILABILITY BREAKDOWN
      ========================================================================== */}
      <section id="pricing-section" className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Pricing Formula Calculator for Selected Plot */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-[#DADDD5] shadow-xs space-y-6">
            <div>
              <span className="text-xs uppercase font-extrabold tracking-wider text-[#668F35] bg-[#EBF2DE] px-3 py-1 rounded-full border border-[#D5E3C3]">
                Transparent Pricing
              </span>
              <h2 className="text-2xl font-black text-[#1F271B] mt-2">
                Plot Cost Breakdown &amp; Calculation
              </h2>
              <p className="text-xs text-gray-500">
                Formula: Cents × Price Per Cent + Corner Premium (if applicable) + Registration Estimate.
              </p>
            </div>

            {selectedPlot && pricingDetails ? (
              <div className="bg-[#F8F9F6] p-5 rounded-2xl border border-gray-200 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-gray-200">
                  <div>
                    <h3 className="font-extrabold text-base text-[#1F271B]">
                      {selectedPlot.title}
                    </h3>
                    <p className="text-xs text-gray-500">
                      Phase: {selectedPlot.layoutGroup} • Facing: {selectedPlot.facing}
                    </p>
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                    {selectedPlot.status}
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between py-1">
                    <span className="text-gray-600">Plot Area:</span>
                    <span className="font-bold text-[#1F271B]">
                      {pricingDetails.cents} Cents ({selectedPlot.areaSqFt} sq.ft)
                    </span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-gray-600">Base Rate per Cent:</span>
                    <span className="font-bold text-[#1F271B]">
                      ₹{pricingDetails.ratePerCent.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-gray-600">Base Land Value:</span>
                    <span className="font-bold text-[#1F271B]">
                      ₹{pricingDetails.baseCost.toLocaleString('en-IN')}
                    </span>
                  </div>
                  {selectedPlot.isCornerPlot && (
                    <div className="flex justify-between py-1 text-purple-700">
                      <span>Corner Plot Premium (5%):</span>
                      <span className="font-bold">+ ₹{pricingDetails.cornerPremium.toLocaleString('en-IN')}</span>
                    </div>
                  )}
                  <div className="flex justify-between py-1.5 border-t border-gray-200 text-sm font-black text-[#1F271B]">
                    <span>Total Selling Price:</span>
                    <span className="text-[#668F35]">{selectedPlot.priceDisplay}</span>
                  </div>
                  <div className="flex justify-between py-1 text-gray-500">
                    <span>Est. Registration &amp; Stamp Duty (~7%):</span>
                    <span>₹{pricingDetails.regCharges.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between py-2 border-t border-dashed border-gray-300 text-sm font-black text-gray-900">
                    <span>Est. All-Inclusive Budget:</span>
                    <span>₹{pricingDetails.grandTotal.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href="#enquiry-section"
                    className="w-full py-3 rounded-xl bg-[#B7E436] hover:bg-[#A6D42A] text-[#1C2618] text-xs font-black flex items-center justify-center gap-1.5 shadow-xs transition-all"
                  >
                    <span>Reserve Plot #{selectedPlot.plotNumber} Now</span>
                    <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                  </a>
                </div>
              </div>
            ) : (
              <div className="p-8 text-center text-xs text-gray-500">
                Please select a plot from the layout or explorer table to calculate its exact pricing.
              </div>
            )}
          </div>

          {/* Right Column: Live Availability Counts */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-[#DADDD5] shadow-xs space-y-6">
            <div>
              <span className="text-xs uppercase font-extrabold tracking-wider text-[#668F35] bg-[#EBF2DE] px-3 py-1 rounded-full border border-[#D5E3C3]">
                Inventory Status
              </span>
              <h2 className="text-2xl font-black text-[#1F271B] mt-2">
                Live Plot Availability
              </h2>
              <p className="text-xs text-gray-500">
                Real-time booking status across all 181 scheduled entries in AP Rajan Garden.
              </p>
            </div>

            <div className="space-y-3">
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-4 h-4 rounded-full bg-emerald-500"></span>
                  <div>
                    <h4 className="text-sm font-extrabold text-emerald-950">Available Plots</h4>
                    <p className="text-[11px] text-emerald-700">Ready for instant booking &amp; registration</p>
                  </div>
                </div>
                <span className="text-2xl font-black text-emerald-800">{stats.available}</span>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-4 h-4 rounded-full bg-amber-400"></span>
                  <div>
                    <h4 className="text-sm font-extrabold text-amber-950">Reserved</h4>
                    <p className="text-[11px] text-amber-700">Token deposit placed under verification</p>
                  </div>
                </div>
                <span className="text-2xl font-black text-amber-800">{stats.reserved}</span>
              </div>

              <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-4 h-4 rounded-full bg-blue-500"></span>
                  <div>
                    <h4 className="text-sm font-extrabold text-blue-950">Booked</h4>
                    <p className="text-[11px] text-blue-700">Agreement executed, loan processing</p>
                  </div>
                </div>
                <span className="text-2xl font-black text-blue-800">{stats.booked}</span>
              </div>

              <div className="p-4 rounded-2xl bg-red-50 border border-red-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-4 h-4 rounded-full bg-red-500"></span>
                  <div>
                    <h4 className="text-sm font-extrabold text-red-950">Sold &amp; Registered</h4>
                    <p className="text-[11px] text-red-700">Patta handed over to owner</p>
                  </div>
                </div>
                <span className="text-2xl font-black text-red-800">{stats.sold}</span>
              </div>
            </div>

            <div className="pt-2 text-center text-xs text-gray-500">
              Total Scheduled Capacity: <strong>181 Plots</strong> (Group 1: 145 + Group 2: 36)
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 8: FACILITIES & AMENITIES
      ========================================================================== */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#DADDD5] shadow-xs space-y-8">
          <div>
            <span className="text-xs uppercase font-extrabold tracking-wider text-[#668F35] bg-[#EBF2DE] px-3 py-1 rounded-full border border-[#D5E3C3]">
              Layout Infrastructure
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#1F271B] mt-2">
              Community Facilities &amp; Amenities
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1 max-w-2xl">
              Engineered layout specifications designed for peaceful beachside living and lasting capital appreciation.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {project.amenities.map((amenity, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-[#F8F9F6] border border-gray-200 flex items-start space-x-3"
              >
                <div className="p-1.5 rounded-lg bg-[#EBF2DE] text-[#668F35] shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-[#1F271B]">{amenity}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 9: HOUSE CONSTRUCTION SERVICES MODULE
      ========================================================================== */}
      <section id="construction-section" className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#DADDD5] shadow-xs space-y-8">
          <div>
            <span className="text-xs uppercase font-extrabold tracking-wider text-[#668F35] bg-[#EBF2DE] px-3 py-1 rounded-full border border-[#D5E3C3]">
              Turnkey House Construction
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#1F271B] mt-2">
              Buy Plot + Build Your Dream Villa in One Place
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1 max-w-2xl">
              Turnkey villa construction services with pre-approved building plans, soil testing, sweet groundwater connections, individual water sumps, and up to 90% bank loan assistance.
            </p>
          </div>

          {/* 3 Package Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {constructionPackages.map((pkg) => {
              const isSelected = selectedPackage === pkg.id;
              return (
                <div
                  key={pkg.id}
                  onClick={() => setSelectedPackage(pkg.id)}
                  className={`rounded-3xl p-6 border transition-all flex flex-col justify-between cursor-pointer ${
                    isSelected
                      ? 'bg-white border-[#668F35] ring-3 ring-[#668F35]/30 shadow-md'
                      : 'bg-[#F8F9F6] border-gray-200 hover:border-gray-400'
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#668F35]">
                        {pkg.name}
                      </span>
                      {pkg.id === 'pkg-premium' && (
                        <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-[#B7E436] text-[#1F271B]">
                          Most Popular
                        </span>
                      )}
                    </div>

                    <div>
                      <div className="text-3xl font-black text-[#1F271B]">
                        ₹{pkg.ratePerSqFt.toLocaleString('en-IN')}{' '}
                        <span className="text-xs text-gray-400 font-semibold">/ sq.ft.</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{pkg.tagline}</p>
                    </div>

                    <div className="space-y-2 text-xs border-t border-gray-200 pt-4">
                      <div className="font-bold text-gray-700">Specifications:</div>
                      <p className="text-[11px] text-gray-600">
                        <strong>Structure:</strong> {pkg.specs.structure}
                      </p>
                      <p className="text-[11px] text-gray-600">
                        <strong>Flooring:</strong> {pkg.specs.flooring}
                      </p>
                      <p className="text-[11px] text-gray-600">
                        <strong>Doors:</strong> {pkg.specs.doorsWindows}
                      </p>
                      <p className="text-[11px] text-gray-600">
                        <strong>Timeline:</strong> {pkg.estimatedTimelineMonths} Months handover
                      </p>
                    </div>

                    <ul className="space-y-1.5 pt-2 text-xs text-gray-700">
                      {pkg.highlights.map((h, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-[#668F35] shrink-0" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-6">
                    <button
                      className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all ${
                        isSelected
                          ? 'bg-[#B7E436] text-[#1F271B]'
                          : 'bg-white border border-gray-300 text-gray-700'
                      }`}
                    >
                      {isSelected ? 'Selected Package' : 'Select Package'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Interactive Cost Calculator */}
          <div className="bg-[#EBF2DE]/40 rounded-3xl p-6 sm:p-8 border border-[#D5E3C3] space-y-6">
            <h3 className="text-lg font-black text-[#1F271B]">
              Villa Construction Cost Estimator
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="space-y-3">
                <label className="text-xs font-bold text-gray-700 block">
                  Select Desired Built-Up Area: <strong>{builtUpArea} sq.ft.</strong>
                </label>
                <input
                  type="range"
                  min="600"
                  max="3500"
                  step="50"
                  value={builtUpArea}
                  onChange={(e) => setBuiltUpArea(Number(e.target.value))}
                  className="w-full accent-[#668F35] cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-gray-500">
                  <span>600 sq.ft (1 BHK)</span>
                  <span>1,200 sq.ft (2 BHK)</span>
                  <span>2,000 sq.ft (3 BHK Duplex)</span>
                  <span>3,500 sq.ft (Luxury)</span>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-[#DADDD5] flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-gray-500 uppercase tracking-wider font-semibold block">
                    Estimated Construction Cost ({currentPkg.name})
                  </span>
                  <span className="text-2xl sm:text-3xl font-black text-[#1F271B]">
                    ₹{(calculatedConstructionCost / 100000).toFixed(2)} Lakhs
                  </span>
                  <span className="text-[11px] text-gray-500 block mt-0.5">
                    ({builtUpArea} sq.ft × ₹{currentPkg.ratePerSqFt}/sq.ft)
                  </span>
                </div>

                <a
                  href="#enquiry-section"
                  className="px-4 py-2.5 rounded-xl bg-[#B7E436] hover:bg-[#A6D42A] text-[#1C2618] text-xs font-bold shrink-0 shadow-xs"
                >
                  Request Plan
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 10: FINANCING INFORMATION
      ========================================================================== */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#DADDD5] shadow-xs space-y-6">
          <div>
            <span className="text-xs uppercase font-extrabold tracking-wider text-[#668F35] bg-[#EBF2DE] px-3 py-1 rounded-full border border-[#D5E3C3]">
              Pre-Approved Bank Loans
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#1F271B] mt-2">
              Up to 90% Loan Financing Support
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1 max-w-2xl">
              Composite loan assistance covering both plot purchase and turnkey villa construction from India&apos;s leading financial institutions.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {['State Bank of India (SBI)', 'HDFC Bank', 'Canara Bank', 'Indian Bank'].map((bank, i) => (
              <div key={i} className="p-4 rounded-2xl bg-[#F8F9F6] border border-gray-200 text-center space-y-1">
                <Banknote className="w-6 h-6 text-[#668F35] mx-auto mb-1" />
                <h4 className="text-sm font-bold text-[#1F271B]">{bank}</h4>
                <p className="text-[11px] text-gray-500">Up to 90% Approved</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 11: PROJECT GALLERY
      ========================================================================== */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#DADDD5] shadow-xs space-y-6">
          <div>
            <span className="text-xs uppercase font-extrabold tracking-wider text-[#668F35] bg-[#EBF2DE] px-3 py-1 rounded-full border border-[#D5E3C3]">
              Project Visuals
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#1F271B] mt-2">
              Masterplan, Model Villa &amp; Progress Gallery
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {project.gallery.map((img, idx) => (
              <div key={idx} className="relative rounded-2xl overflow-hidden aspect-4/3 bg-gray-100 group border border-gray-200">
                <Image
                  src={img}
                  alt={`AP Rajan Garden Gallery ${idx + 1}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 12: CUSTOMER ENQUIRY & SITE VISIT BOOKING
      ========================================================================== */}
      <section id="enquiry-section" className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#DADDD5] shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs uppercase font-extrabold tracking-wider text-[#668F35] bg-[#EBF2DE] px-3 py-1 rounded-full border border-[#D5E3C3]">
                Direct Promoter Booking
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#1F271B]">
                Schedule a Free Physical Site Visit
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Walk the layout in Tharuvaikulam, inspect sweet drinking groundwater points, and review DTCP certified title deeds directly with the promoter.
              </p>

              <div className="p-4 rounded-2xl bg-[#F8F9F6] border border-gray-200 space-y-2 text-xs">
                <div className="font-bold text-gray-800">What to expect on your site visit:</div>
                <div className="flex items-center gap-2 text-gray-600">
                  <CheckCircle2 className="w-4 h-4 text-[#668F35]" />
                  <span>Physical boundary stone demarcation of selected plot</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <CheckCircle2 className="w-4 h-4 text-[#668F35]" />
                  <span>350m beach stroll and 53-acre tourism area walk</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <CheckCircle2 className="w-4 h-4 text-[#668F35]" />
                  <span>Instant bank loan eligibility verification</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              {enquirySuccess ? (
                <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                  <h3 className="text-xl font-black text-emerald-950">Site Visit Booked Successfully!</h3>
                  <p className="text-xs text-emerald-800 max-w-md mx-auto">
                    Thank you. Our project sales officer will coordinate with you at your phone number to confirm timing and pickup assistance from Thoothukudi.
                  </p>
                  <button
                    onClick={() => setEnquirySuccess(false)}
                    className="mt-3 px-5 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold"
                  >
                    Submit Another Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleEnquirySubmit} className="space-y-4">
                  {enquiryError && (
                    <div className="p-3 rounded-xl bg-red-50 text-red-800 text-xs border border-red-200">
                      {enquiryError}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-gray-700 block mb-1">Your Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Suman / Rajendran"
                        value={enquiryForm.name}
                        onChange={(e) => setEnquiryForm({ ...enquiryForm, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs text-gray-800 focus:outline-hidden focus:ring-2 focus:ring-[#668F35]"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-gray-700 block mb-1">Mobile Number (WhatsApp) *</label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. 98422 12345"
                        value={enquiryForm.phone}
                        onChange={(e) => setEnquiryForm({ ...enquiryForm, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs text-gray-800 focus:outline-hidden focus:ring-2 focus:ring-[#668F35]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-gray-700 block mb-1">Email Address</label>
                      <input
                        type="email"
                        placeholder="name@example.com"
                        value={enquiryForm.email}
                        onChange={(e) => setEnquiryForm({ ...enquiryForm, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs text-gray-800 focus:outline-hidden focus:ring-2 focus:ring-[#668F35]"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-gray-700 block mb-1">Preferred Site Visit Date</label>
                      <input
                        type="date"
                        value={enquiryForm.siteVisitDate}
                        onChange={(e) => setEnquiryForm({ ...enquiryForm, siteVisitDate: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs text-gray-800 bg-white focus:outline-hidden focus:ring-2 focus:ring-[#668F35]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">Preferred Plot #</label>
                    <input
                      type="text"
                      placeholder="e.g. Plot #02 (Group 1)"
                      value={enquiryForm.plotNumber}
                      onChange={(e) => setEnquiryForm({ ...enquiryForm, plotNumber: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs text-gray-800 focus:outline-hidden focus:ring-2 focus:ring-[#668F35]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">Message or Questions</label>
                    <textarea
                      rows={3}
                      placeholder="e.g. Interested in turnkey villa construction and bank loan assistance."
                      value={enquiryForm.message}
                      onChange={(e) => setEnquiryForm({ ...enquiryForm, message: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs text-gray-800 focus:outline-hidden focus:ring-2 focus:ring-[#668F35]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={enquirySubmitting}
                    className="w-full py-3.5 rounded-2xl bg-[#B7E436] hover:bg-[#A6D42A] text-[#1C2618] text-xs font-black shadow-md transition-all disabled:opacity-50 cursor-pointer"
                  >
                    {enquirySubmitting ? 'Submitting...' : 'Confirm Site Visit Request'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 13: CONTACT INFORMATION & DESK
      ========================================================================== */}
      <section className="py-12 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#1F271B] text-white rounded-3xl p-6 sm:p-10 border border-white/10 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div>
              <span className="text-xs uppercase font-extrabold text-[#B7E436]">Project Desk</span>
              <h3 className="text-xl font-black mt-1">Sri Balaji Promoters</h3>
              <p className="text-xs text-gray-300 mt-1">
                42/A Beach Road, Tharuvaikulam, Thoothukudi District, Tamil Nadu 628105
              </p>
            </div>

            <div className="space-y-1">
              <div className="text-xs text-gray-400">Direct Phone Helpline</div>
              <a href="tel:+919443152633" className="text-lg font-black text-white hover:text-[#B7E436] flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#B7E436]" />
                <span>+91 94431 52633</span>
              </a>
              <div className="text-[11px] text-gray-400">9:00 AM – 7:30 PM (All 7 Days)</div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="https://wa.me/919443152633?text=Hello%20Sri%20Balaji%20Promoters,%20I%20am%20interested%20in%20AP%20Rajan%20Garden%20plots."
                target="_blank"
                rel="noreferrer"
                className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold flex items-center justify-center gap-2 transition-all shadow-md"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>
              <a
                href="https://maps.google.com/?q=Tharuvaikulam,Thoothukudi"
                target="_blank"
                rel="noreferrer"
                className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-extrabold flex items-center justify-center gap-2 border border-white/15 transition-all"
              >
                <MapPin className="w-4 h-4 text-[#B7E436]" />
                <span>Google Maps</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
