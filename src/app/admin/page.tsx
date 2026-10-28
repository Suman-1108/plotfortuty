'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Plot, Enquiry, PlotStatus, ApprovalType } from '@/lib/types';
import {
  ShieldCheck,
  Lock,
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  Eye,
  MessageSquare,
  Phone,
  Mail,
  RefreshCw,
  Search,
  Check,
  X,
  Layers,
  ArrowUpRight,
  LogOut,
  IndianRupee,
  MapPin,
  Clock,
  Sparkles
} from 'lucide-react';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  // Data states
  const [activeTab, setActiveTab] = useState<'plots' | 'enquiries'>('plots');
  const [plots, setPlots] = useState<Plot[]>([]);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loadingData, setLoadingData] = useState(false);

  // Plot Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlot, setEditingPlot] = useState<Partial<Plot> | null>(null);
  const [savingPlot, setSavingPlot] = useState(false);
  const [plotFormError, setPlotFormError] = useState('');

  // Search in admin
  const [searchQuery, setSearchQuery] = useState('');

  // Check initial authentication
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/auth');
      const data = await res.json();
      if (data.authenticated) {
        setIsAuthenticated(true);
        fetchData();
      }
    } catch {
      // not authenticated
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError('');

    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();
      if (data.success) {
        setIsAuthenticated(true);
        setPassword('');
        fetchData();
      } else {
        setLoginError(data.error || 'Invalid credentials');
      }
    } catch {
      setLoginError('Authentication service unreachable');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/auth', { method: 'DELETE' });
    setIsAuthenticated(false);
  };

  const fetchData = async () => {
    setLoadingData(true);
    try {
      const [plotsRes, enqRes] = await Promise.all([
        fetch('/api/plots'),
        fetch('/api/enquiries'),
      ]);
      const plotsData = await plotsRes.json();
      const enqData = await enqRes.json();

      if (plotsData.success) setPlots(plotsData.plots);
      if (enqData.success) setEnquiries(enqData.enquiries);
    } catch (err) {
      console.error('Error fetching admin data:', err);
    } finally {
      setLoadingData(false);
    }
  };

  // Plot CRUD actions
  const handleOpenAddPlot = () => {
    setEditingPlot({
      title: '',
      project: 'Pearl Haven Layout',
      location: 'Korampallam',
      address: 'Near District Collectorate, Korampallam, Thoothukudi 628101',
      price: 2400000,
      priceDisplay: '₹24.00 Lakhs',
      pricePerSqFt: 1600,
      pricePerCent: 696960,
      areaSqFt: 1500,
      areaCents: 3.44,
      dimensions: '30 ft x 50 ft',
      facing: 'East',
      roadWidth: '40 ft Blacktop Tar Road',
      approval: 'DTCP & RERA Approved',
      approvalNumber: 'DTCP No. 128/2023',
      pattaStatus: 'Clear Legal Patta',
      status: 'Available',
      isFeatured: true,
      description: 'Prime residential plot with sweet ground water and wide tar road access.',
      layoutPlotNumber: `Plot #${plots.length + 1}`,
      images: [
        '/images/product.png',
        '/images/product_land1.png',
      ],
    });
    setPlotFormError('');
    setIsModalOpen(true);
  };

  const handleOpenEditPlot = (plot: Plot) => {
    setEditingPlot({ ...plot });
    setPlotFormError('');
    setIsModalOpen(true);
  };

  const handleSavePlot = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPlot?.title || !editingPlot.price) {
      setPlotFormError('Title and price are required.');
      return;
    }

    setSavingPlot(true);
    setPlotFormError('');

    try {
      const url = editingPlot.id ? `/api/plots/${editingPlot.id}` : '/api/plots';
      const method = editingPlot.id ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingPlot),
      });

      const data = await res.json();
      if (data.success) {
        setIsModalOpen(false);
        setEditingPlot(null);
        fetchData();
      } else {
        setPlotFormError(data.error || 'Failed to save plot.');
      }
    } catch {
      setPlotFormError('Network error saving plot.');
    } finally {
      setSavingPlot(false);
    }
  };

  const handleDeletePlot = async (id: string) => {
    if (!confirm('Are you sure you want to permanently delete this listing?')) return;
    try {
      const res = await fetch(`/api/plots/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        fetchData();
      }
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  const handleToggleStatus = async (plot: Plot, newStatus: PlotStatus) => {
    try {
      await fetch(`/api/plots/${plot.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      fetchData();
    } catch (err) {
      console.error('Status update error:', err);
    }
  };

  const handleToggleFeatured = async (plot: Plot) => {
    try {
      await fetch(`/api/plots/${plot.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isFeatured: !plot.isFeatured }),
      });
      fetchData();
    } catch (err) {
      console.error('Featured update error:', err);
    }
  };

  const handleUpdateEnquiryStatus = async (id: string, status: Enquiry['status']) => {
    try {
      await fetch(`/api/enquiries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      fetchData();
    } catch (err) {
      console.error('Enquiry status update error:', err);
    }
  };

  // Filtered lists for admin view
  const filteredPlots = plots.filter(
    (p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.layoutPlotNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredEnquiries = enquiries.filter(
    (e) =>
      e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.phone.includes(searchQuery) ||
      (e.plotTitle && e.plotTitle.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Login Gate View
  if (!isAuthenticated) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center py-16 px-4 bg-[#F4F5F0]">
        <div className="max-w-md w-full bg-white rounded-2xl border border-[#DADDD5] p-8 editorial-shadow space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-xl bg-[#EDF3E4] text-[#668F35] flex items-center justify-center mx-auto border border-[#668F35]/30">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold text-[#222222]">Plot 4 Tuty Admin</h1>
            <p className="text-xs text-[#666A5D]">
              Secure management portal for property inventory, prices, and leads.
            </p>
          </div>

          {loginError && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-md">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#222222] mb-1">
                Admin Security Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password (default: plot4tuty2026)"
                className="w-full px-3.5 py-2.5 text-sm bg-[#F4F5F0] border border-[#DADDD5] rounded-lg focus:outline-none focus:border-[#668F35]"
              />
              <span className="block text-[11px] text-gray-400 mt-1">
                Default credentials: <code>plot4tuty2026</code> or <code>admin123</code>
              </span>
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full py-2.5 px-4 bg-[#668F35] hover:bg-[#53752A] text-white text-sm font-semibold rounded-lg transition-colors flex items-center justify-center space-x-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{loginLoading ? 'Verifying...' : 'Access Admin Dashboard'}</span>
            </button>
          </form>

          <div className="pt-2 text-center">
            <Link href="/" className="text-xs text-[#668F35] hover:underline">
              ← Return to public website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Authenticated Admin Dashboard View
  return (
    <div className="py-8 sm:py-12 bg-[#F4F5F0] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-[#DADDD5] gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#668F35]"></span>
              <span className="text-xs font-bold uppercase tracking-wider text-[#668F35]">
                Plot 4 Tuty Administration
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#222222] mt-0.5">
              Property & Lead Management
            </h1>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={fetchData}
              className="p-2 bg-white border border-[#DADDD5] rounded-lg text-gray-700 hover:text-[#668F35] transition-colors"
              title="Refresh Data"
            >
              <RefreshCw className={`w-4 h-4 ${loadingData ? 'animate-spin' : ''}`} />
            </button>

            <button
              onClick={handleOpenAddPlot}
              className="inline-flex items-center space-x-1.5 px-4 py-2 bg-[#668F35] hover:bg-[#53752A] text-white text-xs font-semibold rounded-lg transition-colors shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Plot</span>
            </button>

            <button
              onClick={handleLogout}
              className="inline-flex items-center space-x-1 px-3 py-2 bg-white border border-[#DADDD5] text-red-600 hover:bg-red-50 text-xs font-medium rounded-lg transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Overview Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-5 rounded-xl border border-[#DADDD5] editorial-shadow">
            <span className="block text-xs text-[#666A5D]">Total Land Listings</span>
            <span className="text-2xl font-bold text-[#222222] mt-1 block">{plots.length}</span>
            <span className="text-[11px] text-[#668F35]">Active in database</span>
          </div>

          <div className="bg-white p-5 rounded-xl border border-[#DADDD5] editorial-shadow">
            <span className="block text-xs text-[#666A5D]">Available Plots</span>
            <span className="text-2xl font-bold text-[#668F35] mt-1 block">
              {plots.filter((p) => p.status === 'Available' || p.status === 'Fast Selling').length}
            </span>
            <span className="text-[11px] text-[#666A5D]">Ready for registration</span>
          </div>

          <div className="bg-white p-5 rounded-xl border border-[#DADDD5] editorial-shadow">
            <span className="block text-xs text-[#666A5D]">Customer Leads</span>
            <span className="text-2xl font-bold text-[#222222] mt-1 block">{enquiries.length}</span>
            <span className="text-[11px] text-amber-600">
              {enquiries.filter((e) => e.status === 'New').length} New Uncontacted
            </span>
          </div>

          <div className="bg-white p-5 rounded-xl border border-[#DADDD5] editorial-shadow">
            <span className="block text-xs text-[#666A5D]">Featured on Home</span>
            <span className="text-2xl font-bold text-[#222222] mt-1 block">
              {plots.filter((p) => p.isFeatured).length}
            </span>
            <span className="text-[11px] text-gray-500">Homepage showcase</span>
          </div>
        </div>

        {/* Tabs & Search Navigation */}
        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 mb-6">
          <div className="flex space-x-2 bg-white p-1 rounded-lg border border-[#DADDD5] self-start">
            <button
              onClick={() => setActiveTab('plots')}
              className={`px-4 py-2 text-xs font-semibold rounded-md transition-all ${
                activeTab === 'plots' ? 'bg-[#668F35] text-white' : 'text-[#55594D] hover:text-[#222222]'
              }`}
            >
              Plot Inventory ({plots.length})
            </button>
            <button
              onClick={() => setActiveTab('enquiries')}
              className={`px-4 py-2 text-xs font-semibold rounded-md transition-all ${
                activeTab === 'enquiries' ? 'bg-[#668F35] text-white' : 'text-[#55594D] hover:text-[#222222]'
              }`}
            >
              Customer Inquiries ({enquiries.length})
            </button>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Search ${activeTab}...`}
              className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-[#DADDD5] rounded-md focus:outline-none focus:border-[#668F35]"
            />
          </div>
        </div>

        {/* Tab 1: Plots Management Table */}
        {activeTab === 'plots' && (
          <div className="bg-white rounded-xl border border-[#DADDD5] overflow-hidden editorial-shadow">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-[#F4F5F0] border-b border-[#DADDD5] text-[#222222] font-semibold">
                    <th className="py-3 px-4">Plot Info</th>
                    <th className="py-3 px-4">Location</th>
                    <th className="py-3 px-4">Area & Facing</th>
                    <th className="py-3 px-4">Price</th>
                    <th className="py-3 px-4">Approval</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Featured</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#DADDD5]">
                  {filteredPlots.length > 0 ? (
                    filteredPlots.map((plot) => (
                      <tr key={plot.id} className="hover:bg-[#F4F5F0]/50 transition-colors">
                        <td className="py-3.5 px-4">
                          <div className="flex items-center space-x-3">
                            <div className="relative w-12 h-10 rounded overflow-hidden bg-gray-100 shrink-0">
                              <Image
                                src={plot.images[0] || '/images/real_estate.png'}
                                alt=""
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <div className="font-bold text-[#222222] flex items-center space-x-1.5">
                                <span>{plot.layoutPlotNumber}</span>
                                <span className="font-medium text-gray-500">• {plot.title}</span>
                              </div>
                              <span className="text-[11px] text-gray-500">{plot.project}</span>
                            </div>
                          </div>
                        </td>

                        <td className="py-3.5 px-4 font-medium text-[#222222]">{plot.location}</td>

                        <td className="py-3.5 px-4 text-[#55594D]">
                          <div>{plot.areaCents} Cents ({plot.areaSqFt} sq.ft)</div>
                          <div className="text-[11px] text-gray-500">{plot.facing} • {plot.roadWidth.split(' ')[0]} ft</div>
                        </td>

                        <td className="py-3.5 px-4 font-bold text-[#222222]">
                          {plot.priceDisplay}
                          <span className="block text-[10px] text-gray-500 font-normal">₹{plot.pricePerSqFt}/sq.ft</span>
                        </td>

                        <td className="py-3.5 px-4">
                          <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-[#EDF3E4] text-[#53752A]">
                            {plot.approval.split(' ')[0]}
                          </span>
                        </td>

                        <td className="py-3.5 px-4">
                          <select
                            value={plot.status}
                            onChange={(e) => handleToggleStatus(plot, e.target.value as PlotStatus)}
                            className={`text-xs font-semibold px-2 py-1 rounded border focus:outline-none cursor-pointer ${
                              plot.status === 'Available'
                                ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                                : plot.status === 'Fast Selling'
                                ? 'bg-amber-50 text-amber-800 border-amber-300'
                                : plot.status === 'Reserved'
                                ? 'bg-blue-50 text-blue-800 border-blue-300'
                                : 'bg-gray-100 text-gray-700 border-gray-300'
                            }`}
                          >
                            <option value="Available">Available</option>
                            <option value="Fast Selling">Fast Selling</option>
                            <option value="Reserved">Reserved</option>
                            <option value="Sold">Sold</option>
                          </select>
                        </td>

                        <td className="py-3.5 px-4">
                          <button
                            onClick={() => handleToggleFeatured(plot)}
                            className={`p-1.5 rounded transition-colors ${
                              plot.isFeatured ? 'bg-amber-100 text-amber-800' : 'bg-gray-100 text-gray-400'
                            }`}
                            title="Toggle Featured"
                          >
                            <Sparkles className="w-4 h-4" />
                          </button>
                        </td>

                        <td className="py-3.5 px-4 text-right space-x-1">
                          <Link
                            href={`/plots/${plot.slug}`}
                            target="_blank"
                            className="p-1.5 inline-block text-gray-500 hover:text-[#668F35]"
                            title="View Public Page"
                          >
                            <Eye className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => handleOpenEditPlot(plot)}
                            className="p-1.5 text-blue-600 hover:text-blue-800"
                            title="Edit Plot"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeletePlot(plot.id)}
                            className="p-1.5 text-red-600 hover:text-red-800"
                            title="Delete Plot"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={8} className="py-8 text-center text-gray-500">
                        No plots found matching &quot;{searchQuery}&quot;
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Enquiries Management Table */}
        {activeTab === 'enquiries' && (
          <div className="bg-white rounded-xl border border-[#DADDD5] overflow-hidden editorial-shadow">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-[#F4F5F0] border-b border-[#DADDD5] text-[#222222] font-semibold">
                    <th className="py-3 px-4">Lead Name</th>
                    <th className="py-3 px-4">Contact</th>
                    <th className="py-3 px-4">Plot Interest / Location</th>
                    <th className="py-3 px-4">Message</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Quick WhatsApp</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#DADDD5]">
                  {filteredEnquiries.length > 0 ? (
                    filteredEnquiries.map((enq) => {
                      const cleanPhone = enq.phone.replace(/[^0-9]/g, '');
                      const whatsappLeadUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
                        `Hello ${enq.name}, this is Plot 4 Tuty following up on your property inquiry regarding ${enq.plotTitle || 'residential plots in Thoothukudi'}.`
                      )}`;

                      return (
                        <tr key={enq.id} className="hover:bg-[#F4F5F0]/50 transition-colors">
                          <td className="py-3.5 px-4">
                            <strong className="block text-[#222222] text-sm">{enq.name}</strong>
                            <span className="text-[11px] text-gray-400">
                              {new Date(enq.createdAt).toLocaleDateString('en-IN', {
                                day: 'numeric',
                                month: 'short',
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </span>
                          </td>

                          <td className="py-3.5 px-4 text-[#55594D]">
                            <div className="font-semibold text-[#222222]">{enq.phone}</div>
                            {enq.email && <div className="text-[11px] text-gray-500">{enq.email}</div>}
                          </td>

                          <td className="py-3.5 px-4">
                            <span className="font-medium text-[#222222] block">{enq.plotTitle || 'General Enquiry'}</span>
                            <span className="text-[11px] text-[#668F35]">
                              {enq.preferredLocation} • {enq.budget || 'Any Budget'}
                            </span>
                          </td>

                          <td className="py-3.5 px-4 max-w-xs text-[#55594D]">
                            <p className="line-clamp-2 text-xs">{enq.message}</p>
                          </td>

                          <td className="py-3.5 px-4">
                            <select
                              value={enq.status}
                              onChange={(e) =>
                                handleUpdateEnquiryStatus(enq.id, e.target.value as Enquiry['status'])
                              }
                              className={`text-xs font-semibold px-2 py-1 rounded border focus:outline-none cursor-pointer ${
                                enq.status === 'New'
                                  ? 'bg-amber-50 text-amber-800 border-amber-300'
                                  : enq.status === 'Contacted'
                                  ? 'bg-blue-50 text-blue-800 border-blue-300'
                                  : enq.status === 'Follow-up'
                                  ? 'bg-purple-50 text-purple-800 border-purple-300'
                                  : 'bg-emerald-50 text-emerald-800 border-emerald-300'
                              }`}
                            >
                              <option value="New">New</option>
                              <option value="Contacted">Contacted</option>
                              <option value="Follow-up">Follow-up</option>
                              <option value="Closed">Closed</option>
                            </select>
                          </td>

                          <td className="py-3.5 px-4 text-right">
                            <a
                              href={whatsappLeadUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center space-x-1 px-3 py-1 bg-[#EDF3E4] text-[#53752A] rounded border border-[#668F35]/30 hover:bg-[#668F35] hover:text-white transition-colors"
                            >
                              <MessageSquare className="w-3.5 h-3.5" />
                              <span>WhatsApp</span>
                            </a>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-gray-500">
                        No inquiries found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Modal for Add / Edit Plot */}
        {isModalOpen && editingPlot && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-2xl border border-[#DADDD5] max-w-2xl w-full p-6 sm:p-8 editorial-shadow-lg max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center pb-4 mb-6 border-b border-[#DADDD5]">
                <h3 className="text-xl font-bold text-[#222222]">
                  {editingPlot.id ? 'Edit Property Listing' : 'Add New Residential Plot'}
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-1 rounded text-gray-400 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {plotFormError && (
                <div className="p-3 mb-4 bg-red-50 border border-red-200 text-red-700 text-xs rounded">
                  {plotFormError}
                </div>
              )}

              <form onSubmit={handleSavePlot} className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-[#222222] mb-1">Plot Title *</label>
                  <input
                    type="text"
                    required
                    value={editingPlot.title || ''}
                    onChange={(e) => setEditingPlot({ ...editingPlot, title: e.target.value })}
                    placeholder="e.g. Pearl Haven - Corner Villa Plot"
                    className="w-full px-3 py-2 bg-[#F4F5F0] border border-[#DADDD5] rounded focus:outline-none focus:border-[#668F35] text-xs font-medium"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-[#222222] mb-1">Layout Project</label>
                    <input
                      type="text"
                      value={editingPlot.project || ''}
                      onChange={(e) => setEditingPlot({ ...editingPlot, project: e.target.value })}
                      className="w-full px-3 py-2 bg-[#F4F5F0] border border-[#DADDD5] rounded focus:outline-none focus:border-[#668F35]"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-[#222222] mb-1">Plot Number</label>
                    <input
                      type="text"
                      value={editingPlot.layoutPlotNumber || ''}
                      onChange={(e) => setEditingPlot({ ...editingPlot, layoutPlotNumber: e.target.value })}
                      placeholder="e.g. Plot #18"
                      className="w-full px-3 py-2 bg-[#F4F5F0] border border-[#DADDD5] rounded focus:outline-none focus:border-[#668F35]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-[#222222] mb-1">Location Corridor *</label>
                    <select
                      value={editingPlot.location || 'Korampallam'}
                      onChange={(e) => setEditingPlot({ ...editingPlot, location: e.target.value })}
                      className="w-full px-3 py-2 bg-[#F4F5F0] border border-[#DADDD5] rounded focus:outline-none focus:border-[#668F35]"
                    >
                      <option value="Korampallam">Korampallam</option>
                      <option value="Millerpuram">Millerpuram</option>
                      <option value="Palayamkottai Road">Palayamkottai Road</option>
                      <option value="Harbour Bypass Road">Harbour Bypass Road</option>
                      <option value="Muthiapuram">Muthiapuram</option>
                      <option value="Spic Nagar">Spic Nagar</option>
                      <option value="Ettayapuram Road">Ettayapuram Road</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-[#222222] mb-1">Full Address</label>
                    <input
                      type="text"
                      value={editingPlot.address || ''}
                      onChange={(e) => setEditingPlot({ ...editingPlot, address: e.target.value })}
                      className="w-full px-3 py-2 bg-[#F4F5F0] border border-[#DADDD5] rounded focus:outline-none focus:border-[#668F35]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block font-semibold text-[#222222] mb-1">Price (₹ INR) *</label>
                    <input
                      type="number"
                      required
                      value={editingPlot.price || 0}
                      onChange={(e) => {
                        const p = Number(e.target.value);
                        setEditingPlot({
                          ...editingPlot,
                          price: p,
                          priceDisplay: `₹${(p / 100000).toFixed(2)} Lakhs`,
                        });
                      }}
                      className="w-full px-3 py-2 bg-[#F4F5F0] border border-[#DADDD5] rounded focus:outline-none focus:border-[#668F35]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-[#222222] mb-1">Area (Cents)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={editingPlot.areaCents || 0}
                      onChange={(e) => {
                        const c = parseFloat(e.target.value) || 0;
                        setEditingPlot({
                          ...editingPlot,
                          areaCents: c,
                          areaSqFt: Math.round(c * 435.6),
                        });
                      }}
                      className="w-full px-3 py-2 bg-[#F4F5F0] border border-[#DADDD5] rounded focus:outline-none focus:border-[#668F35]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-[#222222] mb-1">Area (Sq.Ft)</label>
                    <input
                      type="number"
                      value={editingPlot.areaSqFt || 0}
                      onChange={(e) => setEditingPlot({ ...editingPlot, areaSqFt: Number(e.target.value) })}
                      className="w-full px-3 py-2 bg-[#F4F5F0] border border-[#DADDD5] rounded focus:outline-none focus:border-[#668F35]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block font-semibold text-[#222222] mb-1">Dimensions</label>
                    <input
                      type="text"
                      value={editingPlot.dimensions || '30 ft x 50 ft'}
                      onChange={(e) => setEditingPlot({ ...editingPlot, dimensions: e.target.value })}
                      className="w-full px-3 py-2 bg-[#F4F5F0] border border-[#DADDD5] rounded focus:outline-none focus:border-[#668F35]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-[#222222] mb-1">Facing</label>
                    <select
                      value={editingPlot.facing || 'East'}
                      onChange={(e) => setEditingPlot({ ...editingPlot, facing: e.target.value })}
                      className="w-full px-3 py-2 bg-[#F4F5F0] border border-[#DADDD5] rounded focus:outline-none focus:border-[#668F35]"
                    >
                      <option value="North">North</option>
                      <option value="East">East</option>
                      <option value="South">South</option>
                      <option value="West">West</option>
                      <option value="North-East">North-East</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-[#222222] mb-1">Road Width</label>
                    <input
                      type="text"
                      value={editingPlot.roadWidth || '40 ft Blacktop Road'}
                      onChange={(e) => setEditingPlot({ ...editingPlot, roadWidth: e.target.value })}
                      className="w-full px-3 py-2 bg-[#F4F5F0] border border-[#DADDD5] rounded focus:outline-none focus:border-[#668F35]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block font-semibold text-[#222222] mb-1">Approval</label>
                    <select
                      value={editingPlot.approval || 'DTCP Approved'}
                      onChange={(e) => setEditingPlot({ ...editingPlot, approval: e.target.value as ApprovalType })}
                      className="w-full px-3 py-2 bg-[#F4F5F0] border border-[#DADDD5] rounded focus:outline-none focus:border-[#668F35]"
                    >
                      <option value="DTCP Approved">DTCP Approved</option>
                      <option value="DTCP & RERA Approved">DTCP & RERA Approved</option>
                      <option value="RERA Registered">RERA Registered</option>
                      <option value="Panchayat Approved">Panchayat Approved</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-[#222222] mb-1">Approval Number</label>
                    <input
                      type="text"
                      value={editingPlot.approvalNumber || ''}
                      onChange={(e) => setEditingPlot({ ...editingPlot, approvalNumber: e.target.value })}
                      className="w-full px-3 py-2 bg-[#F4F5F0] border border-[#DADDD5] rounded focus:outline-none focus:border-[#668F35]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-[#222222] mb-1">Status</label>
                    <select
                      value={editingPlot.status || 'Available'}
                      onChange={(e) => setEditingPlot({ ...editingPlot, status: e.target.value as PlotStatus })}
                      className="w-full px-3 py-2 bg-[#F4F5F0] border border-[#DADDD5] rounded focus:outline-none focus:border-[#668F35]"
                    >
                      <option value="Available">Available</option>
                      <option value="Fast Selling">Fast Selling</option>
                      <option value="Reserved">Reserved</option>
                      <option value="Sold">Sold</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-[#222222] mb-1">Primary Image URL</label>
                  <input
                    type="url"
                    value={editingPlot.images?.[0] || ''}
                    onChange={(e) => {
                      const newImages = [...(editingPlot.images || [])];
                      newImages[0] = e.target.value;
                      setEditingPlot({ ...editingPlot, images: newImages });
                    }}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full px-3 py-2 bg-[#F4F5F0] border border-[#DADDD5] rounded focus:outline-none focus:border-[#668F35]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#222222] mb-1">Description</label>
                  <textarea
                    rows={3}
                    value={editingPlot.description || ''}
                    onChange={(e) => setEditingPlot({ ...editingPlot, description: e.target.value })}
                    className="w-full px-3 py-2 bg-[#F4F5F0] border border-[#DADDD5] rounded focus:outline-none focus:border-[#668F35]"
                  ></textarea>
                </div>

                <div className="flex items-center space-x-2 pt-1">
                  <input
                    type="checkbox"
                    id="isFeatured"
                    checked={editingPlot.isFeatured || false}
                    onChange={(e) => setEditingPlot({ ...editingPlot, isFeatured: e.target.checked })}
                    className="w-4 h-4 text-[#668F35] rounded focus:ring-0"
                  />
                  <label htmlFor="isFeatured" className="font-semibold text-[#222222] cursor-pointer">
                    Display as Featured Property on Homepage
                  </label>
                </div>

                <div className="pt-4 border-t border-[#DADDD5] flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 border border-[#DADDD5] rounded text-gray-700 hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={savingPlot}
                    className="px-5 py-2 bg-[#668F35] hover:bg-[#53752A] text-white font-semibold rounded"
                  >
                    {savingPlot ? 'Saving...' : 'Save Plot Listing'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
