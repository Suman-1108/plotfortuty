'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Plot } from '@/lib/types';
import {
  Building2,
  PlusCircle,
  FileSpreadsheet,
  Download,
  Upload,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  ExternalLink,
  Edit,
  Trash2,
  AlertTriangle,
  RefreshCw
} from 'lucide-react';

interface SellerPlotsClientProps {
  initialPlots: Plot[];
}

export default function SellerPlotsClient({ initialPlots }: SellerPlotsClientProps) {
  const [plots, setPlots] = useState<Plot[]>(initialPlots);
  const [groupFilter, setGroupFilter] = useState<'All' | 'Group 1' | 'Group 2'>('All');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [search, setSearch] = useState<string>('');
  const [importing, setImporting] = useState<boolean>(false);
  const [importResult, setImportResult] = useState<{ message: string; added: number; updated: number } | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const filteredPlots = plots.filter((p) => {
    if (groupFilter !== 'All' && p.layoutGroup !== groupFilter) return false;
    if (statusFilter !== 'All' && p.status !== statusFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase().trim();
      const match =
        p.title.toLowerCase().includes(q) ||
        p.plotNumber?.toLowerCase().includes(q) ||
        p.layoutPlotNumber.toLowerCase().includes(q) ||
        p.dimensions.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  const handleStatusChange = async (plotId: string, newStatus: Plot['status']) => {
    try {
      const res = await fetch(`/api/plots/${plotId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        setPlots((prev) =>
          prev.map((p) => (p.id === plotId ? { ...p, status: newStatus } : p))
        );
      }
    } catch (err) {
      console.error('Failed to update plot status:', err);
    }
  };

  const handleExcelUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImporting(true);
    setErrorMessage('');
    setImportResult(null);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('projectId', 'proj-ap-rajan-garden');

    try {
      const res = await fetch('/api/plots/import', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to import plots');
      }

      setImportResult({
        message: data.message,
        added: data.addedCount,
        updated: data.updatedCount
      });

      // Refresh plots
      const refreshed = await fetch('/api/plots?projectId=proj-ap-rajan-garden');
      const rData = await refreshed.json();
      if (rData.success) {
        setPlots(rData.plots);
      }
    } catch (err: unknown) {
      setErrorMessage(err instanceof Error ? err.message : 'Import failed');
    } finally {
      setImporting(false);
      e.target.value = '';
    }
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#DADDD5] shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase font-extrabold tracking-wider text-[#668F35] bg-[#EBF2DE] px-3 py-1 rounded-full border border-[#D5E3C3]">
            Plot Inventory Manager
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-[#1F271B] mt-2">
            My Plot Listings ({plots.length})
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Manage your land parcels, verify survey dimensions, and import/export bulk Excel schedules.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Excel Import button */}
          <label className="inline-flex items-center space-x-1.5 px-4 py-2.5 rounded-2xl bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 text-xs font-bold shadow-2xs transition-all cursor-pointer">
            <Upload className="w-4 h-4 text-[#668F35]" />
            <span>{importing ? 'Importing...' : 'Bulk Import Excel'}</span>
            <input
              type="file"
              accept=".xlsx,.xls,.csv"
              onChange={handleExcelUpload}
              disabled={importing}
              className="hidden"
            />
          </label>

          {/* Excel Export button */}
          <a
            href="/api/plots/export?projectId=proj-ap-rajan-garden"
            className="inline-flex items-center space-x-1.5 px-4 py-2.5 rounded-2xl bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 text-xs font-bold shadow-2xs transition-all"
          >
            <Download className="w-4 h-4 text-emerald-600" />
            <span>Export Excel</span>
          </a>

          <Link
            href="/seller/properties/new"
            className="inline-flex items-center space-x-1.5 px-5 py-2.5 rounded-2xl bg-[#B7E436] hover:bg-[#A6D42A] text-[#1C2618] text-xs font-extrabold shadow-xs transition-all"
          >
            <PlusCircle className="w-4 h-4 stroke-[2.5]" />
            <span>Add Single Plot</span>
          </Link>
        </div>
      </div>

      {/* Notifications */}
      {importResult && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>{importResult.message}</span>
          </div>
          <button onClick={() => setImportResult(null)} className="text-gray-500 hover:text-black">
            ✕
          </button>
        </div>
      )}

      {errorMessage && (
        <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-900 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-600 shrink-0" />
            <span>{errorMessage}</span>
          </div>
          <button onClick={() => setErrorMessage('')} className="text-gray-500 hover:text-black">
            ✕
          </button>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-[#DADDD5] shadow-xs grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search plot #, size, facing..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-gray-300 text-xs focus:outline-hidden focus:ring-2 focus:ring-[#668F35]"
          />
        </div>

        <div>
          <select
            value={groupFilter}
            onChange={(e) => setGroupFilter(e.target.value as 'All' | 'Group 1' | 'Group 2')}
            className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs text-gray-800 bg-white focus:outline-hidden focus:ring-2 focus:ring-[#668F35]"
          >
            <option value="All">All Groups (181 Entries)</option>
            <option value="Group 1">Group 1 (145 Plots)</option>
            <option value="Group 2">Group 2 (36 Plots)</option>
          </select>
        </div>

        <div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs text-gray-800 bg-white focus:outline-hidden focus:ring-2 focus:ring-[#668F35]"
          >
            <option value="All">All Availability Statuses</option>
            <option value="Available">Available (Green)</option>
            <option value="Reserved">Reserved (Yellow)</option>
            <option value="Booked">Booked (Blue)</option>
            <option value="Sold">Sold (Red)</option>
          </select>
        </div>
      </div>

      {/* Grid of Plots */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPlots.slice(0, 48).map((plot) => (
          <div
            key={plot.id}
            className="bg-white rounded-2xl border border-[#DADDD5] p-5 shadow-xs hover:border-[#668F35] transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-[#668F35] bg-[#EBF2DE] px-2.5 py-0.5 rounded-full border border-[#D5E3C3]">
                  {plot.layoutGroup || 'Group 1'} • #{plot.plotNumber}
                </span>

                <select
                  value={plot.status}
                  onChange={(e) => handleStatusChange(plot.id, e.target.value as Plot['status'])}
                  className={`text-[11px] font-bold px-2 py-0.5 rounded-full border cursor-pointer focus:outline-hidden ${
                    plot.status === 'Available'
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                      : plot.status === 'Reserved'
                      ? 'bg-amber-50 text-amber-800 border-amber-300'
                      : plot.status === 'Booked'
                      ? 'bg-blue-50 text-blue-800 border-blue-300'
                      : 'bg-red-50 text-red-800 border-red-300'
                  }`}
                >
                  <option value="Available">Available</option>
                  <option value="Reserved">Reserved</option>
                  <option value="Booked">Booked</option>
                  <option value="Sold">Sold</option>
                </select>
              </div>

              <h3 className="font-bold text-sm text-[#1F271B] line-clamp-1">{plot.title}</h3>

              <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 pt-1 border-t border-gray-100">
                <div>
                  <span className="text-gray-400 block text-[10px]">Area</span>
                  <strong>{plot.areaCents} Cents</strong> ({plot.areaSqFt} sq.ft)
                </div>
                <div>
                  <span className="text-gray-400 block text-[10px]">Facing</span>
                  <strong>{plot.facing}</strong>
                </div>
                <div>
                  <span className="text-gray-400 block text-[10px]">Dimensions</span>
                  <span className="font-mono">{plot.dimensions}</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-[10px]">Road</span>
                  <span>{plot.roadWidth?.split(' ')[0]} ft</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Selling Price</span>
                <span className="text-base font-black text-[#1F271B]">{plot.priceDisplay}</span>
              </div>

              <Link
                href={`/plots/${plot.slug}`}
                className="text-xs text-[#668F35] font-bold hover:underline flex items-center gap-1"
              >
                <span>View Public</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {filteredPlots.length > 48 && (
        <div className="text-center p-4 text-xs text-gray-500">
          Showing 48 of {filteredPlots.length} plots. Use search or group filter to view specific units.
        </div>
      )}
    </div>
  );
}
