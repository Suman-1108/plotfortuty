'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone, MessageSquare, ArrowRight, Search, MapPin, User, LogOut } from 'lucide-react';

interface CurrentUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const pathname = usePathname();

  // Fetch current buyer session on mount
  useEffect(() => {
    fetch('/api/auth/me')
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated && data.user) {
          setCurrentUser(data.user);
        } else {
          setCurrentUser(null);
        }
      })
      .catch(() => setCurrentUser(null));
  }, [pathname]);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/me', { method: 'DELETE' });
      setCurrentUser(null);
      window.location.reload();
    } catch (e) {
      console.error('Logout error:', e);
    }
  };

  // If in seller or admin portals, do not render customer navbar (they use dedicated portal layouts)
  if (pathname.startsWith('/admin') || pathname.startsWith('/seller')) {
    return null;
  }

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Search', href: '/plots' },
    { name: 'Projects', href: '/projects' },
    { name: 'Compare', href: '/compare' },
    { name: 'Locations', href: '/locations' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact Us', href: '/contact' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#F4F5F0]/95 backdrop-blur-md border-b border-[#DADDD5]">
      {/* Top Utility Bar (Buyer Trust, Phone Assistance & Login) */}
      <div className="hidden lg:block bg-[#1F271B] text-[#F4F5F0] text-xs py-1.5 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <span className="flex items-center space-x-1.5 text-gray-300">
              <span className="inline-block w-2 h-2 rounded-full bg-[#B7E436]"></span>
              <span>100% DTCP Approved &amp; TNRERA Verified Plots in Thoothukudi, Tamil Nadu</span>
            </span>
            <span className="text-gray-500">|</span>
            <span className="text-gray-300 flex items-center space-x-1">
              <MapPin className="w-3 h-3 text-[#B7E436]" />
              <span>Office: Palayamkottai Road, Thoothukudi</span>
            </span>
          </div>

          <div className="flex items-center space-x-6">
            <a
              href="tel:+919842155678"
              className="flex items-center space-x-1.5 text-gray-300 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#B7E436]" />
              <span>Direct Assistance: +91 98421 55678</span>
            </a>
            <span className="text-gray-500">|</span>

            {/* Buyer Authentication State (Login / Profile) */}
            {currentUser ? (
              <div className="flex items-center space-x-2.5">
                <span className="flex items-center space-x-1 text-[#D8FF54] font-bold">
                  <User className="w-3.5 h-3.5 text-[#B7E436]" />
                  <span>{currentUser.name}</span>
                </span>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-gray-400 hover:text-red-400 transition-colors cursor-pointer text-[11px]"
                  title="Sign Out"
                >
                  <LogOut className="w-3 h-3" />
                  <span>Sign Out</span>
                </button>
              </div>
            ) : (
              <Link
                href="/customer/login"
                className="flex items-center space-x-1.5 text-gray-300 hover:text-[#B7E436] transition-colors font-semibold"
              >
                <User className="w-3.5 h-3.5 text-[#B7E436]" />
                <span>Buyer Login</span>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Main Customer Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo & Name: Plot 4 Tuty */}
          <Link href="/" className="flex items-center space-x-3 group py-1">
            <div className="relative h-11 w-11 sm:h-12 sm:w-12 rounded-full overflow-hidden bg-white border-2 border-[#DADDD5] group-hover:border-[#668F35] shadow-xs transition-all duration-200 group-hover:scale-105 shrink-0">
              <Image
                src="/logo-round.png"
                alt="Plot 4 Tuty"
                fill
                priority
                className="object-cover rounded-full"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-base sm:text-lg lg:text-xl font-black tracking-tight text-[#1F271B] leading-none group-hover:text-[#668F35] transition-colors">
                Plot 4 Tuty<span className="text-[#668F35]">.</span>
              </span>
              <span className="text-[9px] sm:text-[10px] font-bold text-[#666A5D] tracking-wider uppercase mt-1">
                RESIDENTIAL LAND &amp; PLOT MARKETPLACE
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3 py-1.5 text-xs lg:text-sm font-semibold transition-all relative rounded-full ${
                    active
                      ? 'text-[#1F271B] font-bold bg-[#E6ECE0]'
                      : 'text-[#55594D] hover:text-[#1F271B] hover:bg-[#EAECE4]'
                  }`}
                >
                  <span>{link.name}</span>
                  {active && (
                    <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#668F35] rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action CTA Buttons */}
          <div className="hidden sm:flex items-center space-x-3">
            <a
              href="https://wa.me/919842155678?text=Hello%20Plot%204%20Tuty,%20I%20am%20interested%20in%20residential%20plots."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1.5 px-3.5 py-2 text-xs font-semibold text-[#1F271B] bg-white border border-[#DADDD5] hover:border-[#668F35] rounded-full transition-all shadow-xs"
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#668F35]" />
              <span>WhatsApp</span>
            </a>

            <Link
              href="/plots"
              className="inline-flex items-center space-x-2 px-5 py-2 text-xs font-bold text-[#1C2618] bg-[#B7E436] hover:bg-[#A3CE2A] rounded-full transition-all shadow-sm hover:shadow-md"
            >
              <Search className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Find Your Plot</span>
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <div className="lg:hidden flex items-center space-x-2">
            <a
              href="https://wa.me/919842155678"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-[#668F35] bg-white border border-[#DADDD5] rounded-full"
              aria-label="WhatsApp"
            >
              <MessageSquare className="w-4 h-4" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-full text-[#222222] hover:bg-[#EAECE4] border border-[#DADDD5]"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#F4F5F0] border-b border-[#DADDD5] px-4 pt-2 pb-6 space-y-3">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  isActive(link.href)
                    ? 'bg-white text-[#1F271B] border-l-4 border-[#668F35] font-bold shadow-xs'
                    : 'text-[#55594D] hover:bg-[#EAECE4]'
                }`}
              >
                {link.name}
              </Link>
            ))}

            {/* Mobile Buyer Login */}
            {currentUser ? (
              <div className="px-3 py-2 bg-white rounded-xl border border-gray-200 flex items-center justify-between text-xs">
                <span className="font-bold text-[#1F271B] flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#668F35]" />
                  <span>{currentUser.name}</span>
                </span>
                <button
                  onClick={handleLogout}
                  className="text-red-600 font-bold hover:underline"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <Link
                href="/customer/login"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2.5 rounded-xl text-sm font-bold text-[#668F35] bg-[#EBF2DE] border border-[#D5E3C3]"
              >
                Buyer Login
              </Link>
            )}
          </div>

          <div className="pt-3 border-t border-[#DADDD5] space-y-2">
            <Link
              href="/plots"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center space-x-2 w-full py-2.5 px-4 bg-[#B7E436] hover:bg-[#A3CE2A] text-[#1C2618] rounded-full text-xs font-bold shadow-sm"
            >
              <Search className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Find Your Plot</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
