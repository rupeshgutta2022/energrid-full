import React, { useState } from 'react';
import { useLogistics } from '../../context/LogisticsContext';
import {
  ChevronDown,
  Star,
  ArrowRight,
  Ship,
  Navigation,
  KeyRound,
  DollarSign,
  Truck,
  Building2,
  Menu,
  X,
  Lock,
  Search,
  ExternalLink,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

interface GFSHeroSectionProps {
  onOpenQuote: () => void;
  onOpenTracking: () => void;
  onOpenReview: () => void;
  onOpenUnloading: () => void;
  onOpenCommercialBL: () => void;
  onOpenSignIn?: () => void;
}

export const GFSHeroSection: React.FC<GFSHeroSectionProps> = ({
  onOpenQuote,
  onOpenTracking,
  onOpenReview,
  onOpenUnloading,
  onOpenCommercialBL,
  onOpenSignIn
}) => {
  const {
    isAuthenticated,
    activeRole,
    currentUser,
    setShowLandingPage,
    logout
  } = useLogistics();

  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative w-full min-h-[92vh] lg:min-h-screen bg-[#071322] text-white flex flex-col justify-between overflow-hidden">
      {/* Background Image: Giant Container Cargo Ship Cruising in Deep Ocean */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=2560&q=90"
          alt="GFS Global Freight Solutions Container Vessel"
          className="w-full h-full object-cover object-center scale-[1.02]"
          referrerPolicy="no-referrer"
        />

        {/* Top-Right Sun Flare Effect */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(circle at 82% 14%, rgba(255, 248, 220, 0.45) 0%, rgba(255, 255, 255, 0.15) 25%, rgba(0, 0, 0, 0) 55%)'
          }}
        />

        {/* Cinematic Ocean Vignettes and Left Contrast Gradient for Pure Typographic Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#071322]/90 via-[#071322]/60 to-transparent w-full sm:w-[65%]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#071322] via-[#071322]/70 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#071322]/80 to-transparent" />
      </div>

      {/* 1. Header Bar: Full-Bleed Desktop Fit (No side gaps) */}
      <header className="relative z-30 w-full px-6 sm:px-10 lg:px-16 pt-5 pb-3 flex items-center justify-between">
        {/* Brand Logo: GFS Waves + Typography */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-3 cursor-pointer group focus:outline-none"
        >
          {/* Triple Curved Horizontal Orange Wave Graphic */}
          <div className="flex flex-col gap-1 w-6">
            <span className="w-4 h-0.5 bg-[#e98622] rounded-full group-hover:w-6 transition-all" />
            <span className="w-6 h-0.5 bg-[#e98622] rounded-full" />
            <span className="w-5 h-0.5 bg-[#e98622] rounded-full group-hover:w-6 transition-all" />
          </div>
          <span className="font-extrabold text-2xl tracking-wider text-white">GFS</span>
        </button>

        {/* Center Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-7 text-xs font-semibold text-white/90">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-white hover:text-[#e98622] transition-colors cursor-pointer"
          >
            Home
          </button>

          {/* Services Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsServicesDropdownOpen(!isServicesDropdownOpen)}
              onMouseEnter={() => setIsServicesDropdownOpen(true)}
              className="flex items-center gap-1 hover:text-[#e98622] transition-colors cursor-pointer py-2"
            >
              <span>Services</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isServicesDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {isServicesDropdownOpen && (
              <div
                onMouseLeave={() => setIsServicesDropdownOpen(false)}
                className="absolute top-full left-0 mt-1 w-60 bg-[#0a182b]/95 backdrop-blur-xl border border-white/15 rounded-xl shadow-2xl p-2 z-50 text-xs space-y-1 animate-in fade-in zoom-in-95 duration-100"
              >
                <button
                  onClick={() => {
                    scrollToSection('services');
                    setIsServicesDropdownOpen(false);
                  }}
                  className="w-full text-left p-2 rounded-lg hover:bg-white/10 text-white flex items-center gap-2 cursor-pointer"
                >
                  <Ship className="w-4 h-4 text-[#e98622]" />
                  <div>
                    <div className="font-bold">Ocean Freight (FCL / LCL)</div>
                    <div className="text-[10px] text-white/60">Global container services</div>
                  </div>
                </button>
                <button
                  onClick={() => {
                    scrollToSection('services');
                    setIsServicesDropdownOpen(false);
                  }}
                  className="w-full text-left p-2 rounded-lg hover:bg-white/10 text-white flex items-center gap-2 cursor-pointer"
                >
                  <Truck className="w-4 h-4 text-[#e98622]" />
                  <div>
                    <div className="font-bold">Port Drayage & De-Vanning</div>
                    <div className="text-[10px] text-white/60">Dock-side unloading</div>
                  </div>
                </button>
                <button
                  onClick={() => {
                    scrollToSection('services');
                    setIsServicesDropdownOpen(false);
                  }}
                  className="w-full text-left p-2 rounded-lg hover:bg-white/10 text-white flex items-center gap-2 cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4 text-[#e98622]" />
                  <div>
                    <div className="font-bold">Customs Clearance</div>
                    <div className="text-[10px] text-white/60">Commercial B/L & Manifests</div>
                  </div>
                </button>
              </div>
            )}
          </div>

          <button
            onClick={onOpenTracking}
            className="hover:text-[#e98622] transition-colors cursor-pointer"
          >
            Track Your Shipment
          </button>

          <button
            onClick={() => scrollToSection('reviews-section')}
            className="hover:text-[#e98622] transition-colors cursor-pointer"
          >
            Reviews
          </button>

          <button
            onClick={() => scrollToSection('rate-estimator')}
            className="hover:text-[#e98622] transition-colors cursor-pointer"
          >
            Rate Calculator
          </button>

          <button
            onClick={() => scrollToSection('fleet-network')}
            className="hover:text-[#e98622] transition-colors cursor-pointer"
          >
            Fleet
          </button>

          <button
            onClick={() => scrollToSection('contact-footer')}
            className="hover:text-[#e98622] transition-colors cursor-pointer"
          >
            Contact
          </button>
        </nav>

        {/* Right CTA Actions: Get a Quote Pill Button + Portal Access */}
        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <button
              onClick={() => setShowLandingPage(false)}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-slate-800/80 hover:bg-slate-800 border border-white/20 rounded-full backdrop-blur-md transition-all cursor-pointer"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Enter {activeRole} Portal</span>
            </button>
          ) : (
            <button
              onClick={onOpenSignIn}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white/90 hover:text-white hover:bg-white/10 rounded-full transition-all cursor-pointer"
            >
              <KeyRound className="w-3.5 h-3.5 text-[#e98622]" />
              <span>Sign In</span>
            </button>
          )}

          {/* Warm Amber / Orange Rounded Pill Button (Identical to Picture) */}
          <button
            onClick={onOpenQuote}
            className="px-6 py-2.5 bg-[#e98622] hover:bg-[#d87617] text-white text-xs font-bold rounded-full shadow-lg hover:shadow-orange-500/20 transition-all cursor-pointer flex items-center gap-1.5"
          >
            <span>Get a Quote</span>
          </button>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-white hover:bg-white/10 rounded-lg cursor-pointer"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="relative z-40 md:hidden bg-[#071322]/95 backdrop-blur-xl border-b border-white/10 px-6 py-4 space-y-3 text-xs">
          <button
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setIsMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 font-bold text-[#e98622]"
          >
            Home
          </button>
          <button
            onClick={() => {
              scrollToSection('services');
              setIsMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 text-white/90"
          >
            Services & Corridors
          </button>
          <button
            onClick={() => {
              onOpenTracking();
              setIsMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 text-white/90"
          >
            Track Your Shipment
          </button>
          <button
            onClick={() => {
              scrollToSection('reviews-section');
              setIsMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 text-white/90"
          >
            Reviews
          </button>
          <button
            onClick={() => {
              scrollToSection('rate-estimator');
              setIsMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 text-white/90"
          >
            Rate Calculator
          </button>
          <button
            onClick={() => {
              scrollToSection('fleet-network');
              setIsMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 text-white/90"
          >
            Fleet Registry
          </button>
          <button
            onClick={() => {
              if (onOpenSignIn) onOpenSignIn();
              setIsMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 text-[#e98622] font-semibold"
          >
            Sign In Portal
          </button>
        </div>
      )}

      {/* 2. Main Hero Body */}
      <div className="relative z-20 w-full flex-1 px-6 sm:px-10 lg:px-16 pt-10 sm:pt-16 pb-12 flex flex-col justify-between">
        {/* Top Floating Card: Customer Reviews & Trust (Centered-Right above ship deck) */}
        <div className="w-full flex justify-end mb-6 lg:mb-0 lg:pr-12">
          <div className="bg-white text-slate-900 rounded-2xl p-4 sm:p-5 shadow-2xl border border-white/80 max-w-xs sm:max-w-sm backdrop-blur-md">
            <div className="flex items-center justify-between gap-3 mb-3">
              {/* Overlapping User Avatars */}
              <div className="flex items-center -space-x-2.5">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80"
                  alt="Customer Reviewer"
                  className="w-8 h-8 rounded-full border-2 border-white object-cover shadow-xs"
                  referrerPolicy="no-referrer"
                />
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80"
                  alt="Customer Reviewer"
                  className="w-8 h-8 rounded-full border-2 border-white object-cover shadow-xs"
                  referrerPolicy="no-referrer"
                />
                <img
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&h=120&q=80"
                  alt="Customer Reviewer"
                  className="w-8 h-8 rounded-full border-2 border-white object-cover shadow-xs"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Leave a Review Link */}
              <button
                onClick={onOpenReview}
                className="text-xs font-semibold text-slate-700 hover:text-blue-600 transition-colors cursor-pointer"
              >
                Leave a Review
              </button>
            </div>

            <p className="text-[11px] text-slate-600 leading-relaxed mb-2 font-medium">
              Trusted by businesses of all sizes. See why businesses trust our unloading services.
            </p>

            <div className="flex items-center gap-1.5 pt-1">
              <span className="text-2xl font-black text-slate-900 tracking-tight">4.8</span>
              <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
            </div>
          </div>
        </div>

        {/* Left Display Headline & CTA Buttons */}
        <div className="max-w-xl my-auto">
          <h1 className="text-5xl sm:text-6xl lg:text-[76px] font-black tracking-tight leading-[1.05] text-white">
            Global<br />
            Freight<br />
            Solutions
          </h1>

          <p className="text-xs sm:text-sm text-white/85 max-w-md leading-relaxed mt-5 mb-8 font-normal">
            Global Freight Solutions is a trusted provider of fast, reliable, and cost-effective container transportation services across international markets.
          </p>

          {/* Two Hero Pill Buttons */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            {/* 1. Amber/Orange Pill Button */}
            <button
              onClick={onOpenQuote}
              className="px-7 sm:px-8 py-3.5 bg-[#e98622] hover:bg-[#d87617] text-white text-xs sm:text-sm font-bold rounded-full shadow-xl hover:shadow-orange-500/25 transition-all cursor-pointer flex items-center gap-2"
            >
              <span>Get a Quote</span>
            </button>

            {/* 2. Dark Translucent Pill Button */}
            <button
              onClick={onOpenTracking}
              className="px-7 sm:px-8 py-3.5 bg-[#071322]/80 hover:bg-[#071322] text-white text-xs sm:text-sm font-semibold rounded-full border border-white/20 backdrop-blur-md shadow-xl transition-all cursor-pointer flex items-center gap-2"
            >
              <span>Track Shipment</span>
            </button>
          </div>
        </div>

        {/* Bottom Floating Cards Row: Unloading Today (Left) & Route Status (Right) */}
        <div className="w-full flex flex-col md:flex-row items-end justify-between gap-4 mt-8 pt-4">
          {/* Card 2: Bottom-Left Unloading Card */}
          <div className="bg-[#071322]/85 backdrop-blur-md border border-white/15 rounded-2xl p-4 sm:p-5 shadow-2xl max-w-xs w-full sm:w-auto">
            <div className="text-[10px] font-bold text-slate-400 tracking-wider uppercase mb-1">
              UNLOADING
            </div>
            <div className="text-sm font-bold text-white mb-2 leading-snug">
              Book Container<br />
              Unloading Today
            </div>
            <button
              onClick={onOpenUnloading}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#e98622] hover:text-[#ff9c3a] transition-colors cursor-pointer"
            >
              <span>Book Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 3: Bottom-Right Shipping Route / Live ETA Card */}
          <div className="bg-[#071322]/85 backdrop-blur-md border border-white/15 rounded-2xl p-4 sm:p-5 shadow-2xl min-w-[280px] sm:min-w-[340px] w-full sm:w-auto">
            {/* Top row: Port Codes & Ship Progress Line */}
            <div className="flex items-center justify-between text-xs font-bold text-white mb-2">
              <span className="font-mono text-sm tracking-tight">CN SHG</span>
              <div className="flex-1 mx-3 relative flex items-center">
                <div className="w-full h-0.5 bg-white/20 rounded-full" />
                <div className="absolute left-[55%] -top-2 w-5 h-5 rounded-full bg-[#e98622] flex items-center justify-center text-white shadow-md">
                  <Ship className="w-3 h-3" />
                </div>
              </div>
              <span className="font-mono text-sm tracking-tight">US OAK</span>
            </div>

            {/* Bottom row: ATD & ETA */}
            <div className="flex items-center justify-between text-[11px] text-white/70 font-mono pt-1">
              <div>
                <span className="text-white/40 block text-[9px] uppercase font-sans font-bold">ATD</span>
                <span>May 3 22:57</span>
              </div>
              <div className="text-right">
                <span className="text-white/40 block text-[9px] uppercase font-sans font-bold">ETA</span>
                <span className="text-[#e98622] font-bold">09:00 May 5</span>
              </div>
            </div>

            {/* Request Detailed Commercial B/L Button */}
            <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between">
              <span className="text-[10px] text-white/60">Vessel: MV PACIFIC TRADER</span>
              <button
                onClick={onOpenCommercialBL}
                className="text-[11px] font-bold text-[#e98622] hover:text-[#ff9c3a] underline cursor-pointer flex items-center gap-1"
              >
                <span>Commercial B/L</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
