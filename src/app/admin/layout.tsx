'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Building2,
  FolderKanban,
  UserCheck,
  Users,
  MessageSquare,
  CreditCard,
  Receipt,
  FileBarChart,
  Settings,
  ShieldAlert,
  ShieldCheck,
  ExternalLink,
  Menu,
  X,
  Activity,
  LogOut
} from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const adminNav = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Plot Listings', href: '/admin/properties', icon: Building2 },
    { name: 'Projects & Layouts', href: '/admin/projects', icon: FolderKanban },
    { name: 'Sellers & KYC', href: '/admin/sellers', icon: UserCheck },
    { name: 'Users & Buyers', href: '/admin/users', icon: Users },
    { name: 'Enquiries & Visits', href: '/admin/enquiries', icon: MessageSquare },
    { name: 'Subscriptions', href: '/admin/subscriptions', icon: CreditCard },
    { name: 'Payments & Revenue', href: '/admin/payments', icon: Receipt },
    { name: 'Reports & Audit Logs', href: '/admin/reports', icon: FileBarChart },
    { name: 'Settings & Localities', href: '/admin/settings', icon: Settings },
  ];

  const isActive = (href: string) => {
    if (href === '/admin') return pathname === '/admin' || pathname === '/admin/dashboard';
    return pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-[#F4F5F0] text-[#1F271B] flex flex-col font-sans">
      {/* Top Header */}
      <header className="bg-[#142016] border-b border-[#253527] sticky top-0 z-50 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Brand Logo & Admin Badge */}
            <div className="flex items-center space-x-3">
              <Link href="/admin" className="flex items-center space-x-2.5">
                <div className="relative h-9 w-9 rounded-full overflow-hidden bg-white border border-[#B7E436]">
                  <Image src="/logo-round.png" alt="Logo" fill className="object-cover" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-black tracking-tight text-white leading-none">
                    Plot 4 Tuty
                  </span>
                  <span className="text-[10px] font-bold text-[#B7E436] tracking-wider uppercase mt-0.5">
                    Platform Administrator
                  </span>
                </div>
              </Link>

              <span className="hidden sm:inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-red-900/40 border border-red-700/50 text-red-300 text-[10px] font-bold">
                <ShieldAlert className="w-3 h-3" />
                <span>RESTRICTED ACCESS</span>
              </span>
            </div>

            {/* Right Admin Controls */}
            <div className="flex items-center space-x-3">
              <div className="hidden md:flex items-center space-x-2 text-xs text-gray-300 mr-2">
                <Activity className="w-3.5 h-3.5 text-[#B7E436] animate-pulse" />
                <span>Marketplace Health: Active</span>
              </div>

              <Link
                href="/"
                target="_blank"
                className="hidden sm:inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-semibold text-gray-200 transition-colors border border-white/10"
              >
                <span>View Public Site</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>

              <Link
                href="/seller"
                target="_blank"
                className="hidden sm:inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-[#B7E436]/20 hover:bg-[#B7E436]/30 text-xs font-semibold text-[#D8FF54] transition-colors border border-[#B7E436]/30"
              >
                <span>Seller Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-white hover:bg-[#253527] rounded-lg"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#161F13] border-t border-[#253527] px-4 py-3 space-y-1">
            {adminNav.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs font-semibold ${
                    isActive(item.href)
                      ? 'bg-[#B7E436] text-[#1C2618] font-bold'
                      : 'text-gray-300 hover:bg-[#253527]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>
        )}
      </header>

      {/* Main Content Area with Desktop Sidebar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 w-full flex gap-8">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-64 shrink-0">
          <div className="bg-white rounded-3xl p-5 border border-[#DADDD5] shadow-xs sticky top-24 space-y-6">
            <div className="p-3.5 rounded-2xl bg-[#1C2618] text-white border border-[#2C3826]">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-[#B7E436]" />
                <span className="text-xs font-black">Super Admin</span>
              </div>
              <p className="text-[11px] text-gray-300 mt-1">
                admin@plot4thoothukudi.com
              </p>
              <div className="mt-2 pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-[#D8FF54] font-bold">
                <span>FULL ACCESS</span>
                <span className="bg-[#B7E436] text-[#1C2618] px-2 py-0.5 rounded-full">ACTIVE</span>
              </div>
            </div>

            {/* Navigation Menu */}
            <nav className="space-y-1">
              <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider px-3">
                Administrative Sections
              </span>
              {adminNav.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center space-x-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                      active
                        ? 'bg-[#1C2618] text-[#B7E436] shadow-xs'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Dynamic Admin Body */}
        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </div>
  );
}
