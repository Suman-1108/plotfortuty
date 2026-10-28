'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Building2,
  PlusCircle,
  MessageSquare,
  CreditCard,
  UserCheck,
  ShieldCheck,
  ExternalLink,
  Menu,
  X,
  Sparkles,
  PhoneCall,
  CheckCircle2,
  Receipt
} from 'lucide-react';

export default function SellerLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const sellerNav = [
    { name: 'Dashboard', href: '/seller', icon: LayoutDashboard },
    { name: 'My Plot Listings', href: '/seller/properties', icon: Building2 },
    { name: 'Add New Plot', href: '/seller/properties/new', icon: PlusCircle },
    { name: 'Buyer Enquiries', href: '/seller/enquiries', icon: MessageSquare },
    { name: 'Subscription & Plans', href: '/seller/subscription', icon: CreditCard },
    { name: 'Payments & Invoices', href: '/seller/payments', icon: Receipt },
    { name: 'Seller Profile & KYC', href: '/seller/profile', icon: UserCheck },
  ];

  const isActive = (href: string) => {
    if (href === '/seller') return pathname === '/seller';
    return pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-[#F0F2EB] flex flex-col">
      {/* Dedicated Seller Portal Header */}
      <header className="bg-[#1C2618] border-b border-[#2C3826] sticky top-0 z-40 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Brand + Portal Title */}
            <div className="flex items-center space-x-3">
              <Link href="/seller" className="flex items-center space-x-2.5">
                <div className="relative h-9 w-9 rounded-full overflow-hidden bg-white border border-[#B7E436]">
                  <Image src="/logo-round.png" alt="Logo" fill className="object-cover" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-black tracking-tight text-white leading-none">
                    Plot 4 Tuty
                  </span>
                  <span className="text-[10px] font-bold text-[#B7E436] tracking-wider uppercase mt-0.5">
                    Landowner &amp; Seller Portal
                  </span>
                </div>
              </Link>

              {/* Status Badge */}
              <div className="hidden sm:inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-[#B7E436]/20 border border-[#B7E436]/40 text-[#D8FF54] text-[11px] font-bold ml-4">
                <ShieldCheck className="w-3.5 h-3.5 text-[#B7E436]" />
                <span>Verified Seller: Sri Balaji Promoters</span>
              </div>
            </div>

            {/* Right Quick Controls */}
            <div className="flex items-center space-x-3">
              <div className="hidden md:flex items-center space-x-2 px-3 py-1 rounded-full bg-[#273521] border border-[#3C4E34] text-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#B7E436]" />
                <span className="text-gray-300">Plan:</span>
                <span className="font-bold text-[#D8FF54]">Growth (12/15 Plots)</span>
              </div>

              <Link
                href="/"
                target="_blank"
                className="hidden sm:inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-semibold text-gray-200 transition-colors border border-white/15"
              >
                <span>View Buyer Website</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-white hover:bg-[#273521] rounded-lg"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#161F13] border-t border-[#2C3826] px-4 py-3 space-y-1">
            {sellerNav.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs font-semibold ${
                    isActive(item.href)
                      ? 'bg-[#B7E436] text-[#1C2618] font-bold'
                      : 'text-gray-300 hover:bg-[#273521]'
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
            {/* Seller Info Card */}
            <div className="p-3.5 rounded-2xl bg-[#EBF2DE] border border-[#D5E3C3]">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#486725]" />
                <span className="text-xs font-black text-[#1F271B]">Sri Balaji Promoters</span>
              </div>
              <p className="text-[11px] text-[#556046] mt-1">
                Thoothukudi Real Estate Promoter &bull; Reg: TN-THY-2024
              </p>
              <div className="mt-2.5 pt-2 border-t border-[#D5E3C3] flex items-center justify-between text-[10px] font-bold text-[#486725]">
                <span>KYC VERIFIED</span>
                <span className="bg-[#B7E436] text-[#1C2618] px-2 py-0.5 rounded-full">ACTIVE</span>
              </div>
            </div>

            {/* Navigation Menu */}
            <nav className="space-y-1">
              <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider px-3">
                Seller Navigation
              </span>
              {sellerNav.map((item) => {
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

            {/* Plan Info Card */}
            <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-200 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-gray-800">Growth Plan</span>
                <span className="text-[10px] font-bold text-[#668F35]">₹1,499/mo</span>
              </div>
              <div className="w-full bg-gray-200 h-1.5 rounded-full mt-2 overflow-hidden">
                <div className="bg-[#668F35] h-full w-[80%] rounded-full" />
              </div>
              <div className="flex justify-between text-[10px] text-gray-500 mt-1">
                <span>12 Used</span>
                <span>15 Max Listings</span>
              </div>
              <Link
                href="/seller/subscription"
                className="mt-3 block w-full py-1.5 text-center rounded-xl bg-white border border-gray-300 hover:border-[#668F35] text-[11px] font-bold text-gray-800 transition-colors"
              >
                Upgrade to Pro (50)
              </Link>
            </div>
          </div>
        </aside>

        {/* Dynamic Portal Body */}
        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </div>
  );
}
