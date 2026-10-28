'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Plot, PlotStatus, ApprovalType } from '@/lib/types';
import {
  Building2,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Sparkles,
  Trash2,
  Edit,
  Eye,
  ShieldCheck,
  AlertCircle,
  MapPin,
  IndianRupee,
  Layers,
  Download,
  LayoutGrid,
  List,
  X,
  Check,
  RefreshCw,
  ExternalLink,
  Tag
} from 'lucide-react';

export default function AdminPropertiesPage() {
  const [plots, setPlots] = useState<Plot[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [approvalFilter, setApprovalFilter] = useState<string>('all');
  const [locationFilter, setLocationFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');

  // Modal State for Add / Edit
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlot, setEditingPlot] = useState<Partial<Plot> | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [modalError, setModalError] = useState('');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Fetch plots from backend
  const fetchPlots = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/plots');
      const data = await res.json();
      if (data.success && data.plots) {
        setPlots(data.plots);
      }
    } catch (err) {
      console.error('Error fetching plots:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlots();
  }, []);

  // Filtered plots
  const filteredPlots = plots.filter((plot) => {
    const matchesSearch =
      plot.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      plot.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      plot.project.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (plot.sellerName && plot.sellerName.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus =
      statusFilter === 'all'
        ? true
        : statusFilter === 'featured'
        ? plot.isFeatured
        : plot.status.toLowerCase() === statusFilter.toLowerCase();

    const matchesApproval =
      approvalFilter === 'all'
        ? true
        : plot.approval.toLowerCase().includes(approvalFilter.toLowerCase());

    const matchesLocation =
      locationFilter === 'all'
        ? true
        : plot.location.toLowerCase() === locationFilter.toLowerCase();

    return matchesSearch && matchesStatus && matchesApproval && matchesLocation;
  });

  // Unique locations for filter dropdown
  const uniqueLocations = Array.from(new Set(plots.map((p) => p.location)));

  // KPI Metrics
  const totalPlots = plots.length;
  const activePlots = plots.filter((p) => p.status === 'Available').length;
  const underReviewPlots = plots.filter((p) => p.status === 'Under Review').length;
  const featuredPlots = plots.filter((p) => p.isFeatured).length;
  const soldPlots = plots.filter((p) => p.status === 'Sold').length;

  // Toggle Featured status
  const handleToggleFeatured = async (plot: Plot) => {
    try {
      const updated = { ...plot, isFeatured: !plot.isFeatured };
      const res = await fetch(`/api/plots/${plot.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated)
      });
      if (res.ok) {
        setPlots((prev) => prev.map((p) => (p.id === plot.id ? updated : p)));
      }
    } catch (e) {
      console.error('Failed to toggle featured status:', e);
    }
  };

  // Quick Change Status
  const handleStatusChange = async (plot: Plot, newStatus: PlotStatus) => {
    try {
      const updated = { ...plot, status: newStatus };
      const res = await fetch(`/api/plots/${plot.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated)
      });
      if (res.ok) {
        setPlots((prev) => prev.map((p) => (p.id === plot.id ? updated : p)));
      }
    } catch (e) {
      console.error('Failed to change plot status:', e);
    }
  };

  // Delete Plot
  const handleDeletePlot = async (id: string) => {
    try {
      const res = await fetch(`/api/plots/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setPlots((prev) => prev.filter((p) => p.id !== id));
        setDeleteConfirmId(null);
      }
    } catch (e) {
      console.error('Failed to delete plot:', e);
    }
  };

  // Open modal for editing
  const handleOpenEdit = (plot: Plot) => {
    setEditingPlot({ ...plot });
    setModalError('');
    setIsModalOpen(true);
  };

  // Open modal for new plot
  const handleOpenNew = () => {
    setEditingPlot({
      title: '',
      project: 'AP Rajan Garden',
      location: 'Tharuvaikulam',
      price: 1800000,
      pricePerSqFt: 1250,
      areaSqFt: 1440,
      areaCents: 3.3,
      dimensions: '30 x 48 ft',
      facing: 'East Facing',
      roadWidth: '40 ft',
      approval: 'DTCP Approved',
      status: 'Available',
      isFeatured: true,
      description: 'Prime DTCP approved residential plot with 40ft wide internal tar road and sweet groundwater.',
      images: ['/images/ap-rajan-garden-layout.jpg'],
      amenities: ['DTCP Approved Layout', '40ft Tar Road', 'Sweet Groundwater', 'Clear Individual Patta'],
      sellerName: 'Plot 4 Tuty Direct Verified',
      sellerPhone: '+91 98421 55678',
      sellerEmail: 'contact@plot4tuty.com',
      reraNumber: 'TNRERA/AGT/THY/0182/2023'
    });
    setModalError('');
    setIsModalOpen(true);
  };

  // Save Plot (Create or Update)
  const handleSavePlot = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPlot?.title || !editingPlot?.location || !editingPlot?.price) {
      setModalError('Title, Location, and Price are required fields.');
      return;
    }

    try {
      setIsSaving(true);
      setModalError('');

      const isUpdate = Boolean(editingPlot.id);
      const url = isUpdate ? `/api/plots/${editingPlot.id}` : '/api/plots';
      const method = isUpdate ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingPlot)
      });

      const data = await res.json();
      if (data.success && data.plot) {
        if (isUpdate) {
          setPlots((prev) => prev.map((p) => (p.id === data.plot.id ? data.plot : p)));
        } else {
          setPlots((prev) => [data.plot, ...prev]);
        }
        setIsModalOpen(false);
        setEditingPlot(null);
      } else {
        setModalError(data.error || 'Failed to save plot listing.');
      }
    } catch (err) {
      console.error('Error saving plot:', err);
      setModalError('Failed to communicate with server.');
    } finally {
      setIsSaving(false);
    }
  };

  // Export to CSV
  const handleExportCSV = () => {
    const headers = ['ID', 'Title', 'Project', 'Location', 'Price (INR)', 'Area (cents)', 'Area (sqft)', 'Approval', 'Status', 'Seller Name', 'Phone'];
    const rows = filteredPlots.map((p) => [
      p.id,
      `"${p.title.replace(/"/g, '""')}"`,
      `"${p.project.replace(/"/g, '""')}"`,
      `"${p.location.replace(/"/g, '""')}"`,
      p.price,
      p.areaCents,
      p.areaSqFt,
      `"${p.approval}"`,
      p.status,
      `"${p.sellerName || 'N/A'}"`,
      `"${p.sellerPhone || 'N/A'}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `plot4tuty_properties_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Heading */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#DADDD5] shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-[#668F35] uppercase tracking-wider bg-[#EBF2DE] px-3 py-1 rounded-full border border-[#D5E3C3]">
            <Building2 className="w-3.5 h-3.5" />
            <span>Plot Inventory &amp; Moderation</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#1F271B] mt-2">
            Property Listings Management
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Oversee, approve, feature, and edit residential plot inventory across Thoothukudi district corridors.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={fetchPlots}
            className="p-2.5 rounded-full border border-gray-200 hover:bg-gray-50 text-gray-700 transition-colors"
            title="Refresh Listings"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>

          <button
            onClick={handleExportCSV}
            className="inline-flex items-center space-x-1.5 px-4 py-2.5 rounded-full border border-gray-200 hover:bg-gray-50 text-xs font-bold text-gray-700 transition-colors shadow-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={handleOpenNew}
            className="inline-flex items-center space-x-1.5 px-5 py-2.5 rounded-full bg-[#B7E436] hover:bg-[#A6D42A] text-[#1C2618] text-xs font-black shadow-xs transition-transform active:scale-95"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Add New Plot</span>
          </button>
        </div>
      </div>

      {/* KPI Metric Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-4">
        <div className="bg-white rounded-2xl p-4 border border-[#DADDD5] shadow-xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500">Total Plots</span>
          <div className="text-2xl font-black text-[#1F271B] mt-1">{totalPlots}</div>
          <span className="text-[10px] text-gray-400">All inventory</span>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-[#DADDD5] shadow-xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600">Active / Live</span>
          <div className="text-2xl font-black text-emerald-600 mt-1">{activePlots}</div>
          <span className="text-[10px] text-emerald-700">Ready for buyers</span>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-[#DADDD5] shadow-xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-amber-600">Under Review</span>
          <div className="text-2xl font-black text-amber-600 mt-1">{underReviewPlots}</div>
          <span className="text-[10px] text-amber-700">Pending survey check</span>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-[#DADDD5] shadow-xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#668F35]">Featured</span>
          <div className="text-2xl font-black text-[#668F35] mt-1">{featuredPlots}</div>
          <span className="text-[10px] text-gray-500">Home banner spots</span>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-[#DADDD5] shadow-xs col-span-2 sm:col-span-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Marked Sold</span>
          <div className="text-2xl font-black text-gray-500 mt-1">{soldPlots}</div>
          <span className="text-[10px] text-gray-400">Archived transactions</span>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="bg-white rounded-3xl p-4 sm:p-6 border border-[#DADDD5] shadow-xs space-y-4">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, location, promoter, survey no..."
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-hidden focus:border-[#668F35] focus:bg-white transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Filter Dropdowns */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 focus:outline-hidden focus:border-[#668F35]"
            >
              <option value="all">All Statuses</option>
              <option value="available">Available / Live</option>
              <option value="under review">Under Review</option>
              <option value="sold">Sold</option>
              <option value="featured">Featured Only</option>
            </select>

            {/* Approval Filter */}
            <select
              value={approvalFilter}
              onChange={(e) => setApprovalFilter(e.target.value)}
              className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 focus:outline-hidden focus:border-[#668F35]"
            >
              <option value="all">All Approvals</option>
              <option value="dtcp">DTCP Approved</option>
              <option value="tnrera">TNRERA Registered</option>
              <option value="panchayat">Panchayat Approved</option>
              <option value="patta">Individual Patta</option>
            </select>

            {/* Locality Filter */}
            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 focus:outline-hidden focus:border-[#668F35]"
            >
              <option value="all">All Localities</option>
              {uniqueLocations.map((loc) => (
                <option key={loc} value={loc.toLowerCase()}>
                  {loc}
                </option>
              ))}
            </select>

            {/* View Mode Toggle */}
            <div className="flex items-center border border-gray-200 rounded-xl p-0.5 bg-gray-50">
              <button
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === 'table' ? 'bg-white shadow-xs text-[#1F271B]' : 'text-gray-400 hover:text-gray-600'
                }`}
                title="Table View"
              >
                <List className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === 'grid' ? 'bg-white shadow-xs text-[#1F271B]' : 'text-gray-400 hover:text-gray-600'
                }`}
                title="Grid View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Active Filter Tags */}
        {(statusFilter !== 'all' || approvalFilter !== 'all' || locationFilter !== 'all' || searchQuery) && (
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-gray-100 text-xs">
            <span className="text-gray-500 font-medium">Active filters:</span>
            {searchQuery && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-gray-100 rounded-lg text-gray-700 font-semibold">
                Keyword: &quot;{searchQuery}&quot;
                <button onClick={() => setSearchQuery('')}><X className="w-3 h-3" /></button>
              </span>
            )}
            {statusFilter !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-gray-100 rounded-lg text-gray-700 font-semibold">
                Status: {statusFilter}
                <button onClick={() => setStatusFilter('all')}><X className="w-3 h-3" /></button>
              </span>
            )}
            {approvalFilter !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-gray-100 rounded-lg text-gray-700 font-semibold">
                Approval: {approvalFilter}
                <button onClick={() => setApprovalFilter('all')}><X className="w-3 h-3" /></button>
              </span>
            )}
            {locationFilter !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-gray-100 rounded-lg text-gray-700 font-semibold">
                Locality: {locationFilter}
                <button onClick={() => setLocationFilter('all')}><X className="w-3 h-3" /></button>
              </span>
            )}
            <button
              onClick={() => {
                setSearchQuery('');
                setStatusFilter('all');
                setApprovalFilter('all');
                setLocationFilter('all');
              }}
              className="text-[#668F35] font-bold hover:underline ml-2"
            >
              Clear All
            </button>
          </div>
        )}
      </div>

      {/* Main Listings Presentation: Table vs Grid */}
      {loading ? (
        <div className="bg-white rounded-3xl p-12 border border-[#DADDD5] text-center space-y-3">
          <RefreshCw className="w-8 h-8 text-[#668F35] animate-spin mx-auto" />
          <p className="text-sm font-bold text-gray-600">Loading plot inventory...</p>
        </div>
      ) : filteredPlots.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 border border-[#DADDD5] text-center space-y-3">
          <AlertCircle className="w-10 h-10 text-gray-400 mx-auto" />
          <h3 className="text-base font-bold text-gray-800">No matching plots found</h3>
          <p className="text-xs text-gray-500 max-w-sm mx-auto">
            Try adjusting your search query, status, or locality filters to view more plots.
          </p>
        </div>
      ) : viewMode === 'table' ? (
        /* TABLE VIEW */
        <div className="bg-white rounded-3xl border border-[#DADDD5] shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-gray-50/80 border-b border-gray-200 text-gray-600 font-bold uppercase tracking-wider text-[10px]">
                  <th className="py-3.5 px-4">Plot &amp; Locality</th>
                  <th className="py-3.5 px-4">Price &amp; Rate</th>
                  <th className="py-3.5 px-4">Area &amp; Dimensions</th>
                  <th className="py-3.5 px-4">Approval &amp; Road</th>
                  <th className="py-3.5 px-4">Status &amp; Feature</th>
                  <th className="py-3.5 px-4">Promoter / Seller</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredPlots.map((plot) => (
                  <tr key={plot.id} className="hover:bg-gray-50/60 transition-colors">
                    {/* Plot Title & Thumbnail */}
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="relative h-12 w-12 rounded-xl overflow-hidden bg-gray-100 border border-gray-200 shrink-0">
                          <Image
                            src={plot.images?.[0] || '/images/ap-rajan-garden-layout.jpg'}
                            alt={plot.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="space-y-0.5 max-w-[220px]">
                          <Link
                            href={`/plots/${plot.slug || plot.id}`}
                            target="_blank"
                            className="font-bold text-[#1F271B] hover:text-[#668F35] line-clamp-1 flex items-center gap-1 group"
                          >
                            <span>{plot.title}</span>
                            <ExternalLink className="w-3 h-3 text-gray-400 group-hover:text-[#668F35] shrink-0" />
                          </Link>
                          <div className="flex items-center space-x-1 text-[11px] text-gray-500">
                            <MapPin className="w-3 h-3 text-gray-400 shrink-0" />
                            <span className="truncate">{plot.location} &bull; {plot.project}</span>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Price & Rate */}
                    <td className="py-3 px-4">
                      <div className="font-extrabold text-[#1F271B] text-sm">
                        ₹{(plot.price / 100000).toFixed(2)} Lakhs
                      </div>
                      <div className="text-[10px] text-gray-500">
                        ₹{plot.pricePerSqFt}/sq.ft &bull; ₹{Math.round(plot.price / (plot.areaCents || 1)).toLocaleString()}/cent
                      </div>
                    </td>

                    {/* Area & Dimensions */}
                    <td className="py-3 px-4">
                      <div className="font-bold text-gray-800">
                        {plot.areaCents} Cents
                      </div>
                      <div className="text-[10px] text-gray-500">
                        {plot.areaSqFt} sq.ft &bull; {plot.dimensions || 'Standard'}
                      </div>
                    </td>

                    {/* Approval & Road Width */}
                    <td className="py-3 px-4 space-y-1">
                      <span className="inline-block px-2 py-0.5 rounded-md bg-[#EBF2DE] text-[#4F7026] font-bold text-[10px] border border-[#D5E3C3]">
                        {plot.approval}
                      </span>
                      <div className="text-[10px] text-gray-500">
                        {plot.roadWidth ? `${plot.roadWidth}ft Road` : 'Wide Road'} &bull; {plot.facing}
                      </div>
                    </td>

                    {/* Status & Featured Toggle */}
                    <td className="py-3 px-4 space-y-1">
                      <div>
                        <select
                          value={plot.status}
                          onChange={(e) => handleStatusChange(plot, e.target.value as PlotStatus)}
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                            plot.status === 'Available'
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              : plot.status === 'Under Review'
                              ? 'bg-amber-50 text-amber-700 border-amber-200'
                              : 'bg-gray-100 text-gray-700 border-gray-300'
                          }`}
                        >
                          <option value="Available">Available</option>
                          <option value="Under Review">Under Review</option>
                          <option value="Sold">Sold</option>
                        </select>
                      </div>

                      <button
                        onClick={() => handleToggleFeatured(plot)}
                        className={`inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-[10px] font-bold transition-colors ${
                          plot.isFeatured
                            ? 'bg-[#B7E436]/30 text-[#4F7026] border border-[#B7E436]'
                            : 'bg-gray-100 text-gray-400 hover:text-gray-600'
                        }`}
                        title="Toggle Home Featured spot"
                      >
                        <Sparkles className="w-2.5 h-2.5" />
                        <span>{plot.isFeatured ? 'Featured' : 'Standard'}</span>
                      </button>
                    </td>

                    {/* Promoter / Seller Info */}
                    <td className="py-3 px-4">
                      <div className="font-semibold text-gray-800 text-[11px] truncate max-w-[140px]">
                        {plot.sellerName || 'Direct Verification'}
                      </div>
                      <div className="text-[10px] text-gray-500 truncate max-w-[140px]">
                        {plot.sellerPhone || '+91 98421 55678'}
                      </div>
                    </td>

                    {/* Action Buttons */}
                    <td className="py-3 px-4 text-right">
                      <div className="inline-flex items-center space-x-1">
                        <Link
                          href={`/plots/${plot.slug || plot.id}`}
                          target="_blank"
                          className="p-1.5 rounded-lg text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                          title="View on Public Site"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </Link>

                        <button
                          onClick={() => handleOpenEdit(plot)}
                          className="p-1.5 rounded-lg text-gray-500 hover:text-[#668F35] hover:bg-emerald-50 transition-colors"
                          title="Edit Plot"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => setDeleteConfirmId(plot.id)}
                          className="p-1.5 rounded-lg text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors"
                          title="Delete Plot"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* GRID VIEW */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredPlots.map((plot) => (
            <div
              key={plot.id}
              className="bg-white rounded-3xl border border-[#DADDD5] overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                {/* Image & Top Badges */}
                <div className="relative h-44 w-full bg-gray-100">
                  <Image
                    src={plot.images?.[0] || '/images/ap-rajan-garden-layout.jpg'}
                    alt={plot.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-bold">
                      {plot.approval}
                    </span>
                    {plot.isFeatured && (
                      <span className="px-2 py-1 rounded-full bg-[#B7E436] text-[#142016] text-[10px] font-black flex items-center gap-1 shadow-sm">
                        <Sparkles className="w-2.5 h-2.5" /> Featured
                      </span>
                    )}
                  </div>

                  <div className="absolute top-3 right-3">
                    <select
                      value={plot.status}
                      onChange={(e) => handleStatusChange(plot, e.target.value as PlotStatus)}
                      className="px-2.5 py-1 rounded-full bg-white text-[10px] font-bold shadow-md border border-gray-200"
                    >
                      <option value="Available">Available</option>
                      <option value="Under Review">Under Review</option>
                      <option value="Sold">Sold</option>
                    </select>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#668F35]">
                      {plot.project}
                    </span>
                    <h3 className="text-base font-black text-[#1F271B] mt-0.5 line-clamp-1">
                      {plot.title}
                    </h3>
                    <div className="flex items-center space-x-1 text-xs text-gray-500 mt-1">
                      <MapPin className="w-3 h-3 text-gray-400" />
                      <span>{plot.location}</span>
                    </div>
                  </div>

                  <div className="flex items-baseline justify-between pt-2 border-t border-gray-100">
                    <div>
                      <div className="text-lg font-black text-[#1F271B]">
                        ₹{(plot.price / 100000).toFixed(2)} Lakhs
                      </div>
                      <div className="text-[10px] text-gray-500">
                        ₹{plot.pricePerSqFt}/sq.ft
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-extrabold text-gray-800">
                        {plot.areaCents} Cents
                      </div>
                      <div className="text-[10px] text-gray-500">
                        {plot.areaSqFt} sq.ft
                      </div>
                    </div>
                  </div>

                  {/* Highlights Strip */}
                  <div className="flex flex-wrap gap-1 text-[10px] text-gray-600">
                    <span className="px-2 py-0.5 bg-gray-100 rounded-md">{plot.facing}</span>
                    {plot.roadWidth && (
                      <span className="px-2 py-0.5 bg-gray-100 rounded-md">{plot.roadWidth}ft Road</span>
                    )}
                    {plot.sellerName && (
                      <span className="px-2 py-0.5 bg-gray-100 rounded-md truncate max-w-[120px]">
                        {plot.sellerName}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                <button
                  onClick={() => handleToggleFeatured(plot)}
                  className={`text-[11px] font-bold flex items-center gap-1 ${
                    plot.isFeatured ? 'text-[#4F7026]' : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  <Sparkles className="w-3 h-3" />
                  <span>{plot.isFeatured ? 'Featured on Home' : 'Promote to Home'}</span>
                </button>

                <div className="flex items-center space-x-1">
                  <Link
                    href={`/plots/${plot.slug || plot.id}`}
                    target="_blank"
                    className="p-1.5 rounded-lg text-gray-600 hover:bg-gray-200 transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={() => handleOpenEdit(plot)}
                    className="p-1.5 rounded-lg text-gray-600 hover:text-[#668F35] hover:bg-emerald-100 transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setDeleteConfirmId(plot.id)}
                    className="p-1.5 rounded-lg text-gray-600 hover:text-red-600 hover:bg-red-100 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full space-y-4 shadow-xl">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <div className="text-center space-y-1">
              <h3 className="text-lg font-bold text-gray-900">Confirm Plot Deletion</h3>
              <p className="text-xs text-gray-500">
                Are you sure you want to permanently remove this plot from Plot 4 Tuty? This action cannot be undone.
              </p>
            </div>
            <div className="flex items-center space-x-3 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="flex-1 py-2.5 rounded-xl border border-gray-300 text-xs font-bold text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeletePlot(deleteConfirmId)}
                className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-colors shadow-sm"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Plot Modal Dialog */}
      {isModalOpen && editingPlot && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 border border-[#DADDD5] shadow-2xl my-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-[#668F35] bg-[#EBF2DE] px-2.5 py-0.5 rounded-full">
                  {editingPlot.id ? 'Edit Plot Details' : 'Create New Listing'}
                </span>
                <h2 className="text-xl font-black text-[#1F271B] mt-1">
                  {editingPlot.id ? editingPlot.title : 'Add Residential Plot Listing'}
                </h2>
              </div>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setEditingPlot(null);
                }}
                className="p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {modalError && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600 font-semibold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{modalError}</span>
              </div>
            )}

            <form onSubmit={handleSavePlot} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Title */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Plot Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingPlot.title || ''}
                    onChange={(e) => setEditingPlot({ ...editingPlot, title: e.target.value })}
                    placeholder="e.g. AP Rajan Garden – Beachside Villa Plot"
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:bg-white focus:border-[#668F35]"
                  />
                </div>

                {/* Project / Layout */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Project / Layout Name
                  </label>
                  <input
                    type="text"
                    value={editingPlot.project || ''}
                    onChange={(e) => setEditingPlot({ ...editingPlot, project: e.target.value })}
                    placeholder="e.g. AP Rajan Garden"
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:bg-white focus:border-[#668F35]"
                  />
                </div>

                {/* Location / Locality */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Location / Locality *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingPlot.location || ''}
                    onChange={(e) => setEditingPlot({ ...editingPlot, location: e.target.value })}
                    placeholder="e.g. Tharuvaikulam, Korampallam, NH 138"
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:bg-white focus:border-[#668F35]"
                  />
                </div>

                {/* Price (INR) */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Total Price (INR) *
                  </label>
                  <input
                    type="number"
                    required
                    value={editingPlot.price || 0}
                    onChange={(e) => {
                      const price = Number(e.target.value);
                      const areaSqFt = editingPlot.areaSqFt || 1200;
                      setEditingPlot({
                        ...editingPlot,
                        price,
                        pricePerSqFt: Math.round(price / areaSqFt)
                      });
                    }}
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:bg-white focus:border-[#668F35]"
                  />
                </div>

                {/* Area in Cents */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Area in Cents *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={editingPlot.areaCents || 0}
                    onChange={(e) => {
                      const cents = Number(e.target.value);
                      const sqft = Math.round(cents * 435.6);
                      setEditingPlot({
                        ...editingPlot,
                        areaCents: cents,
                        areaSqFt: sqft,
                        pricePerSqFt: editingPlot.price ? Math.round(editingPlot.price / sqft) : editingPlot.pricePerSqFt
                      });
                    }}
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:bg-white focus:border-[#668F35]"
                  />
                </div>

                {/* Dimensions */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Dimensions (e.g. 30 x 40 ft)
                  </label>
                  <input
                    type="text"
                    value={editingPlot.dimensions || ''}
                    onChange={(e) => setEditingPlot({ ...editingPlot, dimensions: e.target.value })}
                    placeholder="30 x 40 ft"
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:bg-white focus:border-[#668F35]"
                  />
                </div>

                {/* Facing */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Facing</label>
                  <select
                    value={editingPlot.facing || 'East Facing'}
                    onChange={(e) => setEditingPlot({ ...editingPlot, facing: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:bg-white focus:border-[#668F35]"
                  >
                    <option value="East Facing">East Facing</option>
                    <option value="North Facing">North Facing</option>
                    <option value="South Facing">South Facing</option>
                    <option value="West Facing">West Facing</option>
                    <option value="North-East Corner">North-East Corner</option>
                    <option value="South-East Corner">South-East Corner</option>
                  </select>
                </div>

                {/* Road Width */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Road Width (e.g. 40 ft)</label>
                  <input
                    type="text"
                    value={editingPlot.roadWidth || '30 ft'}
                    onChange={(e) => setEditingPlot({ ...editingPlot, roadWidth: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:bg-white focus:border-[#668F35]"
                  />
                </div>

                {/* Approval Type */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Approval Type</label>
                  <select
                    value={editingPlot.approval || 'DTCP Approved'}
                    onChange={(e) => setEditingPlot({ ...editingPlot, approval: e.target.value as ApprovalType })}
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:bg-white focus:border-[#668F35]"
                  >
                    <option value="DTCP Approved">DTCP Approved</option>
                    <option value="RERA Registered">RERA Registered</option>
                    <option value="DTCP & RERA Approved">DTCP & RERA Approved</option>
                    <option value="Panchayat Approved">Panchayat Approved</option>
                  </select>
                </div>

                {/* Status */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Listing Status</label>
                  <select
                    value={editingPlot.status || 'Available'}
                    onChange={(e) => setEditingPlot({ ...editingPlot, status: e.target.value as PlotStatus })}
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:bg-white focus:border-[#668F35]"
                  >
                    <option value="Available">Available (Live)</option>
                    <option value="Under Review">Under Review</option>
                    <option value="Fast Selling">Fast Selling</option>
                    <option value="Reserved">Reserved</option>
                    <option value="Sold">Sold</option>
                  </select>
                </div>

                {/* Featured Checkbox */}
                <div className="flex items-center pt-6">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={Boolean(editingPlot.isFeatured)}
                      onChange={(e) => setEditingPlot({ ...editingPlot, isFeatured: e.target.checked })}
                      className="w-4 h-4 rounded text-[#668F35] focus:ring-[#668F35]"
                    />
                    <span className="text-xs font-bold text-gray-800">
                      Feature on Home Screen Banner
                    </span>
                  </label>
                </div>

                {/* Image Path */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Primary Plot Image URL / Path
                  </label>
                  <input
                    type="text"
                    value={editingPlot.images?.[0] || ''}
                    onChange={(e) => setEditingPlot({ ...editingPlot, images: [e.target.value] })}
                    placeholder="/images/ap-rajan-garden-layout.jpg"
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:bg-white focus:border-[#668F35]"
                  />
                </div>

                {/* Description */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-gray-700 mb-1">Description</label>
                  <textarea
                    rows={3}
                    value={editingPlot.description || ''}
                    onChange={(e) => setEditingPlot({ ...editingPlot, description: e.target.value })}
                    placeholder="Enter full plot description, water source details, road connectivity, landmark proximity..."
                    className="w-full px-3.5 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:bg-white focus:border-[#668F35]"
                  />
                </div>

                {/* Seller / Contact Info */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Seller / Promoter Name</label>
                  <input
                    type="text"
                    value={editingPlot.sellerName || ''}
                    onChange={(e) => setEditingPlot({ ...editingPlot, sellerName: e.target.value })}
                    placeholder="Sri Balaji Promoters"
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:bg-white focus:border-[#668F35]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Seller Phone / WhatsApp</label>
                  <input
                    type="text"
                    value={editingPlot.sellerPhone || ''}
                    onChange={(e) => setEditingPlot({ ...editingPlot, sellerPhone: e.target.value })}
                    placeholder="+91 98421 55678"
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:bg-white focus:border-[#668F35]"
                  />
                </div>
              </div>

              {/* Form Buttons */}
              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setEditingPlot(null);
                  }}
                  className="px-5 py-2.5 rounded-full border border-gray-300 text-xs font-bold text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-6 py-2.5 rounded-full bg-[#B7E436] hover:bg-[#A6D42A] text-[#1C2618] text-xs font-black shadow-xs transition-transform active:scale-95 disabled:opacity-50 flex items-center gap-1.5"
                >
                  {isSaving ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-4 h-4 stroke-[3]" />}
                  <span>{editingPlot.id ? 'Save Changes' : 'Create Plot'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
