import React, { useState } from 'react';
import { useLogistics } from '../../context/LogisticsContext';
import { UserRole } from '../../types';
import { ROLE_CONFIGS } from '../../data/authUsers';
import { LogisticoLogo } from '../common/LogisticoLogo';
import { FreightQuoteModal } from './FreightQuoteModal';
import { GFSHeroSection } from './GFSHeroSection';
import { CommercialBLModal } from './CommercialBLModal';
import { AuthRequiredModal } from './AuthRequiredModal';
import { LeaveReviewModal } from './LeaveReviewModal';
import { UnloadingBookingModal } from './UnloadingBookingModal';
import { EnterpriseAccessModal } from './EnterpriseAccessModal';
import { AboutFiveLinesSection } from './AboutFiveLinesSection';
import { StatusBadge } from '../common/StatusBadge';
import {
  Mail,
  Phone,
  Search,
  ChevronDown,
  ArrowRight,
  Ship,
  Plane,
  Truck,
  Warehouse,
  ShieldCheck,
  Globe2,
  Globe,
  Activity,
  MapPin,
  Clock,
  Compass,
  CheckCircle2,
  TrendingUp,
  Boxes,
  Navigation,
  ShoppingBag,
  Shield,
  Layers,
  FileCheck2,
  ExternalLink,
  Users,
  ChevronRight,
  Menu,
  X,
  Lock,
  Eye,
  EyeOff,
  Star,
  Sparkles,
  Check,
  RotateCcw,
  DollarSign,
  AlertTriangle,
  Receipt,
  FileText,
  KeyRound,
  Building2,
  Target,
  Award,
  Leaf,
  Download,
  Headphones
} from 'lucide-react';

export const LogisticoLandingPage: React.FC = () => {
  const {
    shipments,
    login,
    logout,
    isAuthenticated,
    activeRole,
    currentUser,
    setShowLandingPage,
    setActiveView,
    setTrackingShipmentId,
    showToast
  } = useLogistics();

  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [quickTrackingId, setQuickTrackingId] = useState('LGX-2026-10482');
  const [trackedShipment, setTrackedShipment] = useState(
    shipments.find((s) => s.id === 'LGX-2026-10482') || shipments[0]
  );
  const [hasSearched, setHasSearched] = useState(true);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [servicesFilterTab, setServicesFilterTab] = useState<'all' | 'ocean' | 'air' | 'road'>('all');

  // GFS Modals State
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [isBLModalOpen, setIsBLModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalReason, setAuthModalReason] = useState(
    'To view real-time cargo telematics and official commercial Bills of Lading (B/L), please sign in with your enterprise credentials.'
  );
  const [authModalTarget, setAuthModalTarget] = useState('Commercial Bill of Lading (B/L)');
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isUnloadingModalOpen, setIsUnloadingModalOpen] = useState(false);

  // Interactive Quick Freight Estimator State
  const [estOrigin, setEstOrigin] = useState('Mumbai Port Hub (BOM)');
  const [estDestination, setEstDestination] = useState('Delhi NCR Fulfillment Hub (DEL)');
  const [estMode, setEstMode] = useState<'road' | 'air' | 'ocean'>('road');
  const [estWeightKg, setEstWeightKg] = useState(4200);
  const [estColdChain, setEstColdChain] = useState(false);
  const [estExpress, setEstExpress] = useState(true);

  // Calculate estimated rate live
  const baseRatePerKg = estMode === 'air' ? 85 : estMode === 'ocean' ? 14 : 28;
  const coldMultiplier = estColdChain ? 1.35 : 1.0;
  const expressMultiplier = estExpress ? 1.2 : 1.0;
  const calculatedEstimate = Math.round(estWeightKg * baseRatePerKg * coldMultiplier * expressMultiplier);
  const calculatedTransitDays = estMode === 'air' ? '1 Day (Next Flight)' : estMode === 'ocean' ? '6-8 Days' : '2-3 Days';

  const executeTrackSearch = (targetQuery?: string) => {
    const query = (targetQuery || quickTrackingId).trim().toUpperCase();
    const found = shipments.find(
      (s) =>
        s.id.toUpperCase().includes(query) ||
        s.trackingNumber.toUpperCase().includes(query) ||
        s.origin.city.toUpperCase().includes(query) ||
        s.origin.facility.toUpperCase().includes(query) ||
        s.destination.city.toUpperCase().includes(query) ||
        s.destination.facility.toUpperCase().includes(query)
    );
    setTrackedShipment(found || null);
    setHasSearched(true);
  };

  const handleTrack = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!isAuthenticated) {
      setAuthModalReason(
        'To track active container consignments and view live satellite GPS telematics, please sign in with your enterprise account.'
      );
      setAuthModalTarget('Consignment Telematics');
      setIsAuthModalOpen(true);
      return;
    }
    executeTrackSearch();
  };

  const handleRequestCommercialBL = (shipmentId?: string) => {
    if (!isAuthenticated) {
      setAuthModalReason(
        'Access to official international Commercial Bills of Lading (B/L), cargo container seal records, and customs clearance manifests requires verified enterprise credentials.'
      );
      setAuthModalTarget('Commercial Bill of Lading (B/L)');
      setIsAuthModalOpen(true);
      return;
    }
    setIsBLModalOpen(true);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDownloadBrochure = () => {
    const content = `LOGISTICO ENTERPRISE LOGISTICS CAPABILITIES & COMPANY PROFILE (2026)
===================================================================
Company: Logistico Inc. & LogiCore Supply Chain Operating System
Founded: 2012 | Enterprise Multimodal Infrastructure
Global HQ: Singapore | Primary Regional Hubs: Mumbai, Rotterdam, Dubai, Chicago

OPERATIONAL REACH & ASSETS:
- Corridors: 140+ National and Cross-Border Multimodal Corridors
- Fleet: 500+ Connected Heavy Commercial Vehicles (Tata Signa, BharatBenz)
- Smart Warehousing: 1.8M+ Sq. Ft. Grade-A Automated Fulfillment Centers
- Monthly Volume: 48,290+ Active Commercial Consignments
- SLA Performance: 99.8% On-Time Delivery Guarantee

CORE MULTIMODAL DIVISIONS:
1. Road Haulage: FTL / LCL with GPS real-time telematics, FASTag toll automation
2. Air Cargo & Cold Chain: Next-flight-out express, calibrated pharma sensors (-20C to +25C)
3. Ocean Freight & Drayage: FCL / LCL container forwarding, direct port terminal connectivity
4. Smart 3PL Warehousing: Automated sortation, dock scheduling, bin slotting, RF barcode verification

COMPLIANCE & SECURITY ACCREDITATIONS:
- ISO 9001:2015 Quality Management
- ISO 27001 & SOC2 Type II Certified Zero-Trust Cybersecurity
- IATA Cargo Agent Accredited
- GDP (Good Distribution Practice for Pharmaceuticals)
- Indian Customs AEO-T2 Authorized Economic Operator
- GST E-Way Bill Auto-Generation & Verification

DISPATCH & SUPPORT:
- 24/7 Global Command Center
- Email: dispatch@logicore.com
- Toll-Free: 1800-543-LOGI (5644)`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Logistico_Company_Capabilities_2026.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showToast({
      type: 'success',
      title: 'Company Profile Downloaded',
      message: 'Official Logistico 2026 Enterprise Capabilities document saved to your device.'
    });
  };

  const allRolesList: UserRole[] = [
    'Operations',
    'Customer',
    'Driver',
    'Warehouse Supervisor',
    'Executive',
    'Fleet Manager',
    'Logistics Manager',
    'System Admin'
  ];

  return (
    <div className="min-h-screen w-full bg-slate-50 text-slate-800 font-sans antialiased selection:bg-[#FF4D2A] selection:text-white overflow-x-hidden">
      {/* 1. Cinematic GFS Hero Section with Full-Bleed Ocean Ship & Floating Cards */}
      <GFSHeroSection
        onOpenQuote={() => setIsQuoteModalOpen(true)}
        onOpenTracking={() => {
          if (!isAuthenticated) {
            setAuthModalReason(
              'To search active container consignments and view live satellite GPS telematics, please sign in with your enterprise account.'
            );
            setAuthModalTarget('Consignment Telematics');
            setIsAuthModalOpen(true);
          } else {
            const el = document.getElementById('tracking-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }
        }}
        onOpenReview={() => setIsReviewModalOpen(true)}
        onOpenUnloading={() => setIsUnloadingModalOpen(true)}
        onOpenCommercialBL={() => handleRequestCommercialBL(trackedShipment?.id || 'LGX-2026-10482')}
        onOpenSignIn={() => setIsSignInModalOpen(true)}
      />

      {/* 2. Sticky Quick-Nav Strip for smooth desktop section jumps */}
      <nav className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 shadow-md text-white">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-13 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-2 font-black tracking-tight text-sm text-white hover:text-[#e98622] transition-colors cursor-pointer"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#e98622] animate-pulse" />
              <span>GFS LOGI-CORE</span>
            </button>
          </div>

          {/* Quick Nav Links */}
          <div className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-300">
            <button
              onClick={() => scrollToSection('about-company')}
              className="hover:text-[#e98622] transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Building2 className="w-3.5 h-3.5 text-[#e98622]" />
              <span>About</span>
            </button>
            <button
              onClick={() => {
                if (!isAuthenticated) {
                  setAuthModalReason(
                    'To track active container consignments and view live satellite GPS telematics, please sign in with your enterprise account.'
                  );
                  setAuthModalTarget('Consignment Telematics');
                  setIsAuthModalOpen(true);
                } else {
                  scrollToSection('tracking-section');
                }
              }}
              className="hover:text-[#e98622] transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Navigation className="w-3.5 h-3.5 text-[#e98622]" />
              <span>Live Tracking</span>
            </button>
            <button
              onClick={() => scrollToSection('rate-estimator')}
              className="hover:text-[#e98622] transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <DollarSign className="w-3.5 h-3.5 text-[#e98622]" />
              <span>Rate Calculator</span>
            </button>
            <button
              onClick={() => scrollToSection('services')}
              className="hover:text-[#e98622] transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Truck className="w-3.5 h-3.5 text-[#e98622]" />
              <span>Services</span>
            </button>
            <button
              onClick={() => scrollToSection('fleet-network')}
              className="hover:text-[#e98622] transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Ship className="w-3.5 h-3.5 text-[#e98622]" />
              <span>Fleet & Corridors</span>
            </button>
            <button
              onClick={() => scrollToSection('reviews-section')}
              className="hover:text-[#e98622] transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span>Reviews</span>
            </button>
            <button
              onClick={() => setIsSignInModalOpen(true)}
              className="hover:text-[#e98622] transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <KeyRound className="w-3.5 h-3.5 text-[#e98622]" />
              <span>Enterprise Portals</span>
            </button>
          </div>

          {/* Right CTA */}
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <button
                onClick={() => setShowLandingPage(false)}
                className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                <span>Enter {activeRole}</span>
              </button>
            ) : (
              <button
                onClick={() => setIsSignInModalOpen(true)}
                className="px-3.5 py-1.5 bg-[#e98622] hover:bg-[#d97515] text-white rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                <KeyRound className="w-3.5 h-3.5" />
                <span>Sign In</span>
              </button>
            )}

            {/* Mobile menu toggle */}
            <button
              onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
              className="md:hidden p-1.5 text-slate-300 hover:text-white cursor-pointer"
            >
              {isMobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Dropdown */}
        {isMobileNavOpen && (
          <div className="md:hidden bg-slate-900 border-b border-slate-800 px-4 py-3 space-y-2 text-xs font-semibold">
            <button
              onClick={() => {
                scrollToSection('about-company');
                setIsMobileNavOpen(false);
              }}
              className="block w-full text-left py-1 text-slate-200 hover:text-[#e98622]"
            >
              About
            </button>
            <button
              onClick={() => {
                scrollToSection('tracking-section');
                setIsMobileNavOpen(false);
              }}
              className="block w-full text-left py-1 text-slate-200 hover:text-[#e98622]"
            >
              Live Tracking
            </button>
            <button
              onClick={() => {
                scrollToSection('rate-estimator');
                setIsMobileNavOpen(false);
              }}
              className="block w-full text-left py-1 text-slate-200 hover:text-[#e98622]"
            >
              Rate Calculator
            </button>
            <button
              onClick={() => {
                scrollToSection('services');
                setIsMobileNavOpen(false);
              }}
              className="block w-full text-left py-1 text-slate-200 hover:text-[#e98622]"
            >
              Services & Fleet
            </button>
            <button
              onClick={() => {
                scrollToSection('reviews-section');
                setIsMobileNavOpen(false);
              }}
              className="block w-full text-left py-1 text-slate-200 hover:text-[#e98622]"
            >
              Customer Reviews
            </button>
            <button
              onClick={() => {
                setIsSignInModalOpen(true);
                setIsMobileNavOpen(false);
              }}
              className="block w-full text-left py-1 text-[#e98622]"
            >
              Enterprise Portals
            </button>
          </div>
        )}
      </nav>

      {/* 3. About Company Section - 5 Lines Only Interactive */}
      <AboutFiveLinesSection
        onCalculateRate={() => scrollToSection("rate-estimator")}
        onTrackShipment={() => {
          if (!isAuthenticated) {
            setAuthModalReason(
              "To track active container consignments and view live satellite GPS telematics, please sign in with your enterprise account."
            );
            setAuthModalTarget("Consignment Telematics");
            setIsAuthModalOpen(true);
          } else {
            scrollToSection("tracking-section");
          }
        }}
        onRequestBL={() => handleRequestCommercialBL(trackedShipment?.id || "LGX-2026-10482")}
        onBookUnloading={() => setIsUnloadingModalOpen(true)}
        onDownloadDeck={handleDownloadBrochure}
      />

      {/* 5. Interactive Live Consignment Tracking Section */}
      <section id="tracking-section" className="py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200">
            <div className="text-center max-w-xl mx-auto mb-6">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#FF4D2A] bg-[#FFF2EE] px-3 py-1 rounded-full inline-block mb-2">
                Public Cargo Search Gateway
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Track Any Consignment or Bill of Lading
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Enter your B/L or consignment ID to view transit status, checkpoint facilities, and assigned pilot.
              </p>
            </div>

            {/* Search Form */}
            <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={quickTrackingId}
                  onChange={(e) => setQuickTrackingId(e.target.value)}
                  placeholder="e.g. LGX-2026-10482 or TRK-US-8831"
                  className="w-full text-xs font-medium pl-10 pr-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#FF4D2A] focus:border-transparent transition-all"
                />
              </div>
              <button
                type="submit"
                className="px-7 py-3 bg-[#e98622] hover:bg-[#d97515] text-white text-xs font-bold uppercase tracking-wider rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Track Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Quick Sample Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-[11px] text-slate-500">
              <span className="font-medium">Quick inspect:</span>
              {shipments.slice(0, 4).map((s) => (
                <button
                  key={s.id}
                  onClick={() => {
                    setQuickTrackingId(s.id);
                    if (!isAuthenticated) {
                      setAuthModalReason(
                        'To track active container consignments and view live satellite GPS telematics, please sign in with your enterprise account.'
                      );
                      setAuthModalTarget('Consignment Telematics');
                      setIsAuthModalOpen(true);
                    } else {
                      setTrackedShipment(s);
                      setHasSearched(true);
                    }
                  }}
                  className="px-2.5 py-1 rounded bg-slate-100 hover:bg-amber-50 hover:text-[#e98622] text-slate-700 font-mono text-[10px] transition-colors cursor-pointer border border-slate-200"
                >
                  {s.id} ({s.status})
                </button>
              ))}
            </div>

            {/* Tracked Consignment Details Box */}
            {hasSearched && trackedShipment && (
              <div className="mt-8 p-6 bg-slate-50 rounded-xl border border-slate-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-black text-slate-900 font-mono">
                        {trackedShipment.id}
                      </span>
                      <StatusBadge status={trackedShipment.status} />
                    </div>
                    <span className="text-xs text-slate-500 font-medium">
                      Billed to: <strong className="text-slate-800">{trackedShipment.customerName}</strong>
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Estimated Arrival</span>
                    <span className="text-sm font-bold text-[#e98622] font-mono">
                      {trackedShipment.estimatedDelivery}
                    </span>
                  </div>
                </div>

                {/* Progress Visual */}
                <div className="py-4">
                  <div className="flex items-center justify-between text-xs text-slate-600 mb-1">
                    <span className="font-semibold">Transit Completion</span>
                    <span className="font-mono font-bold text-slate-900">{trackedShipment.progressPercent}%</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#e98622] rounded-full"
                      style={{ width: `${trackedShipment.progressPercent}%` }}
                    />
                  </div>
                </div>

                {/* Route Corridors */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Origin Departure</span>
                    <span className="font-bold text-slate-900">{trackedShipment.origin.city}</span>
                    <span className="text-[11px] text-slate-500 block">{trackedShipment.origin.facility}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Assigned Transport</span>
                    <span className="font-bold text-slate-900">{trackedShipment.driverName || 'Commercial Fleet'}</span>
                    <span className="text-[11px] text-slate-500 block font-mono">{trackedShipment.vehicleId}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Destination Arrival</span>
                    <span className="font-bold text-slate-900">{trackedShipment.destination.city}</span>
                    <span className="text-[11px] text-slate-500 block">{trackedShipment.destination.facility}</span>
                  </div>
                </div>

                {/* Gated Commercial B/L Action Bar */}
                <div className="mt-5 pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 bg-white -mx-6 -mb-6 p-4 rounded-b-xl">
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Verified Electronic Ocean Bill of Lading & Customs Seal #C88219</span>
                  </div>
                  <button
                    onClick={() => handleRequestCommercialBL(trackedShipment.id)}
                    className="w-full sm:w-auto px-5 py-2.5 bg-slate-900 hover:bg-[#e98622] text-white rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                  >
                    <span>Request Detailed Commercial B/L</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 6. Interactive Freight Rate Estimator Widget */}
      <section id="rate-estimator" className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-[#FF4D2A] bg-[#FFF2EE] px-3 py-1 rounded-full inline-block mb-3">
              Commercial Estimator
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Instant Freight Rate Calculator
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Select corridors, transport modality, and gross payload weight to preview real-time contract tariffs.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Origin Hub</label>
                  <select
                    value={estOrigin}
                    onChange={(e) => setEstOrigin(e.target.value)}
                    className="w-full text-xs font-medium p-2.5 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#FF4D2A]"
                  >
                    <option>Mumbai Port Hub (BOM)</option>
                    <option>Pune Automated Hub (PNQ)</option>
                    <option>Bengaluru Tech Cargo Hub (BLR)</option>
                    <option>Chennai Maritime Gate (MAA)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Destination Hub</label>
                  <select
                    value={estDestination}
                    onChange={(e) => setEstDestination(e.target.value)}
                    className="w-full text-xs font-medium p-2.5 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#FF4D2A]"
                  >
                    <option>Delhi NCR Fulfillment Hub (DEL)</option>
                    <option>Hyderabad Air Corridor (HYD)</option>
                    <option>Kolkata Eastern Hub (CCU)</option>
                    <option>Ahmedabad West Terminal (AMD)</option>
                  </select>
                </div>
              </div>

              {/* Mode Switcher */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Transport Modality</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setEstMode('road')}
                    className={`py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      estMode === 'road'
                        ? 'bg-[#FF4D2A] text-white shadow-xs'
                        : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    <Truck className="w-3.5 h-3.5" />
                    <span>Road Freight</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setEstMode('air')}
                    className={`py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      estMode === 'air'
                        ? 'bg-[#FF4D2A] text-white shadow-xs'
                        : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    <Plane className="w-3.5 h-3.5" />
                    <span>Air Cargo</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setEstMode('ocean')}
                    className={`py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      estMode === 'ocean'
                        ? 'bg-[#FF4D2A] text-white shadow-xs'
                        : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    <Ship className="w-3.5 h-3.5" />
                    <span>Ocean FCL</span>
                  </button>
                </div>
              </div>

              {/* Weight Slider */}
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-1">
                  <span>Gross Weight (kg)</span>
                  <span className="font-mono text-[#FF4D2A]">{estWeightKg.toLocaleString()} kg</span>
                </div>
                <input
                  type="range"
                  min="200"
                  max="24000"
                  step="200"
                  value={estWeightKg}
                  onChange={(e) => setEstWeightKg(Number(e.target.value))}
                  className="w-full accent-[#FF4D2A] cursor-pointer"
                />
              </div>

              {/* Options */}
              <div className="flex items-center gap-4 text-xs">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={estColdChain}
                    onChange={(e) => setEstColdChain(e.target.checked)}
                    className="accent-[#FF4D2A]"
                  />
                  <span>Cold Chain Telematics (+35%)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={estExpress}
                    onChange={(e) => setEstExpress(e.target.checked)}
                    className="accent-[#FF4D2A]"
                  />
                  <span>Guaranteed Express (+20%)</span>
                </label>
              </div>
            </div>

            {/* Calculated Quote Output Card */}
            <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Estimated Commercial Tariff</span>
                <div className="text-3xl font-black text-slate-900 font-mono mt-1">
                  ₹{calculatedEstimate.toLocaleString()}
                </div>
                <span className="text-[11px] text-slate-500">GST 18% & FASTag toll reconciliation included</span>
              </div>

              <div className="space-y-2 text-xs border-t border-slate-100 pt-3">
                <div className="flex items-center justify-between text-slate-600">
                  <span>Estimated Lead Time:</span>
                  <span className="font-bold text-slate-900">{calculatedTransitDays}</span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span>Corridor Transit:</span>
                  <span className="font-medium text-slate-800">{estOrigin.split(' ')[0]} → {estDestination.split(' ')[0]}</span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span>Carbon Offset Rating:</span>
                  <span className="font-mono text-emerald-600 font-bold">Class A (Low Emission)</span>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <button
                  onClick={() => handleRequestCommercialBL()}
                  className="w-full py-2.5 bg-slate-900 hover:bg-[#e98622] text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Request Detailed Commercial B/L</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setIsQuoteModalOpen(true)}
                  className="w-full py-2 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Lock In Rate & Get Official Quote</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Comprehensive Freight Services & Infrastructure Pillars */}
      <section id="services" className="py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#FF4D2A] bg-[#FFF2EE] px-3 py-1 rounded-full inline-block mb-3">
              Specialized Divisions
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Four Core Pillars of Global Logistics Excellence
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              From high-capacity inter-city freight corridors to temperature-sensitive pharmaceutical air-express.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-[#FF4D2A] hover:shadow-lg transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#FFF2EE] text-[#FF4D2A] flex items-center justify-center mb-4">
                  <Truck className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">Road Haulage & FTL/LCL</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  National fleet of heavy-duty Tata Signa and BharatBenz trucks equipped with real-time telematics and FASTag.
                </p>
              </div>
              <button
                onClick={() => {
                  setEstMode('road');
                  scrollToSection('rate-estimator');
                }}
                className="mt-5 w-full py-2.5 bg-slate-900 hover:bg-[#FF4D2A] text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
              >
                <span>Calculate Road Tariff</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-[#FF4D2A] hover:shadow-lg transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                  <Plane className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">Air Cargo & Cold Chain</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Next-flight-out express capacity across major metros with calibrated temperature sensors for pharmaceuticals.
                </p>
              </div>
              <button
                onClick={() => {
                  setEstMode('air');
                  scrollToSection('rate-estimator');
                }}
                className="mt-5 w-full py-2.5 bg-slate-900 hover:bg-[#FF4D2A] text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
              >
                <span>Calculate Air Express</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-[#FF4D2A] hover:shadow-lg transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center mb-4">
                  <Ship className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">Ocean Freight & Drayage</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Full container load (FCL) and consolidated (LCL) forwarding directly integrated with customs port terminals.
                </p>
              </div>
              <button
                onClick={() => {
                  setEstMode('ocean');
                  scrollToSection('rate-estimator');
                }}
                className="mt-5 w-full py-2.5 bg-slate-900 hover:bg-[#FF4D2A] text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
              >
                <span>Calculate Ocean FCL</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-[#FF4D2A] hover:shadow-lg transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                  <Warehouse className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">Smart 3PL Warehousing</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Automated sortation, dock scheduling, bin slotting, and inventory tracking at strategic national centers.
                </p>
              </div>
              <button
                onClick={() => setIsQuoteModalOpen(true)}
                className="mt-5 w-full py-2.5 bg-slate-900 hover:bg-[#FF4D2A] text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
              >
                <span>Book Warehouse Space</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Fleet & Infrastructure Network Showcase */}
      <section id="fleet-network" className="py-16 bg-slate-900 text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#e98622] bg-[#e98622]/15 px-3 py-1 rounded-full inline-block mb-3 border border-[#e98622]/30">
              Multimodal Infrastructure
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Global Fleet & Integrated Transit Corridors
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              Over 500+ heavy-haul commercial trucks, intercontinental container vessels, and bonded air cargo slots operating round the clock.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Fleet 1: Ocean Container Vessels */}
            <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 flex flex-col justify-between hover:border-[#e98622] transition-colors">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#e98622]/20 text-[#e98622] flex items-center justify-center">
                    <Ship className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-2 py-0.5 rounded">
                    14 Active Vessels
                  </span>
                </div>
                <h3 className="text-base font-bold text-white mb-2">Ocean Freight & Ultra Large Vessels</h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  Ultra-large container vessels (ULCV) covering trans-Pacific and trans-Atlantic trade lanes with certified hazardous cargo holds.
                </p>
                <div className="space-y-1.5 text-xs text-slate-300 font-mono">
                  <div className="flex justify-between py-1 border-b border-slate-700/50">
                    <span className="text-slate-500">Flagship Vessel:</span>
                    <span className="font-bold text-white">MV PACIFIC TRADER</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-700/50">
                    <span className="text-slate-500">Container Capacity:</span>
                    <span className="text-[#e98622] font-bold">18,500 TEU</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-500">Telemetry:</span>
                    <span className="text-emerald-400">Live Satellite AIS</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => handleRequestCommercialBL()}
                className="mt-6 w-full py-2 bg-white/10 hover:bg-[#e98622] text-white rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>Inspect Vessel Manifest & B/L</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Fleet 2: Heavy Haul Highway Fleet */}
            <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 flex flex-col justify-between hover:border-[#e98622] transition-colors">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
                    <Truck className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-mono text-blue-400 bg-blue-950/60 border border-blue-800 px-2 py-0.5 rounded">
                    520+ Commercial Trucks
                  </span>
                </div>
                <h3 className="text-base font-bold text-white mb-2">Highway Drayage & Cold-Chain Reefers</h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  BharatBenz 5528.T and Tata Signa multi-axle trailers with real-time temperature telematics and automated FASTag electronic toll passage.
                </p>
                <div className="space-y-1.5 text-xs text-slate-300 font-mono">
                  <div className="flex justify-between py-1 border-b border-slate-700/50">
                    <span className="text-slate-500">Primary Corridors:</span>
                    <span className="font-bold text-white">Golden Quadrilateral</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-700/50">
                    <span className="text-slate-500">Payload Rating:</span>
                    <span className="text-blue-400 font-bold">Up to 42 Tonnes FTL</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-500">GPS Rate:</span>
                    <span className="text-emerald-400">30s Heartbeat Telematics</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => {
                  setEstMode('road');
                  scrollToSection('rate-estimator');
                }}
                className="mt-6 w-full py-2 bg-white/10 hover:bg-[#e98622] text-white rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>Calculate Road Tariff</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Fleet 3: Bonded Air Cargo Freighters */}
            <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 flex flex-col justify-between hover:border-[#e98622] transition-colors">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
                    <Plane className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-mono text-purple-400 bg-purple-950/60 border border-purple-800 px-2 py-0.5 rounded">
                    Daily Scheduled Flights
                  </span>
                </div>
                <h3 className="text-base font-bold text-white mb-2">Intercontinental Air Cargo Express</h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  Dedicated Boeing 777F cargo slots with bonded airport transfers, high-priority customs tarmac release, and temperature control.
                </p>
                <div className="space-y-1.5 text-xs text-slate-300 font-mono">
                  <div className="flex justify-between py-1 border-b border-slate-700/50">
                    <span className="text-slate-500">Transit Speed:</span>
                    <span className="font-bold text-white">Same-Day / Next-Day</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-700/50">
                    <span className="text-slate-500">Bonded Gateways:</span>
                    <span className="text-purple-400 font-bold">BOM, DEL, FRA, ORD</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-500">Cold Compliance:</span>
                    <span className="text-emerald-400">Dry-Ice & Pharma Certified</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsQuoteModalOpen(true)}
                className="mt-6 w-full py-2 bg-white/10 hover:bg-[#e98622] text-white rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>Book Air Cargo Slot</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Customer Reviews & Ratings Showcase */}
      <section id="reviews-section" className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-xs font-bold text-slate-900 bg-amber-50 text-amber-900 border border-amber-200 px-2 py-0.5 rounded-full">
                  4.8 / 5.0 Rating (2,400+ Enterprise Reviews)
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Trusted by Shippers, Importers & Supply Chain Directors
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                See why leading manufacturers and retail networks choose Logistico GFS for critical freight movements.
              </p>
            </div>

            <button
              onClick={() => setIsReviewModalOpen(true)}
              className="px-6 py-3 bg-[#e98622] hover:bg-[#d97515] text-white rounded-xl text-xs font-bold transition-all shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer shrink-0"
            >
              <Star className="w-4 h-4 fill-white" />
              <span>Leave a Review</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 text-amber-400 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-slate-700 italic leading-relaxed mb-4">
                  "GFS container unloading services slashed our demurrage fees by 40% at Oakland. Their automated commercial bills of lading and real-time seal tracking give our executive team complete peace of mind."
                </p>
              </div>
              <div className="flex items-center gap-3 pt-3 border-t border-slate-200/80">
                <div className="w-9 h-9 rounded-full bg-[#071322] text-white font-bold text-xs flex items-center justify-center">
                  ML
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Marcus Lindqvist</h4>
                  <span className="text-[10px] text-slate-500">VP Supply Chain, Nordic Dynamics</span>
                </div>
              </div>
            </div>

            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 text-amber-400 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-slate-700 italic leading-relaxed mb-4">
                  "The cold chain monitoring on the Mumbai-Delhi pharmaceutical line is immaculate. Not a single temperature excursion across 120 FTL dispatches this fiscal quarter."
                </p>
              </div>
              <div className="flex items-center gap-3 pt-3 border-t border-slate-200/80">
                <div className="w-9 h-9 rounded-full bg-[#e98622] text-white font-bold text-xs flex items-center justify-center">
                  RS
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Radhika Subramaniam</h4>
                  <span className="text-[10px] text-slate-500">Director of Logistics, SunBio Life Sciences</span>
                </div>
              </div>
            </div>

            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 text-amber-400 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-slate-700 italic leading-relaxed mb-4">
                  "Their multi-role portal system is a game-changer. Our drivers have instant digital PODs, warehouse supervisors see live cross-dock ETAs, and our accountants get automated GST billing."
                </p>
              </div>
              <div className="flex items-center gap-3 pt-3 border-t border-slate-200/80">
                <div className="w-9 h-9 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
                  TC
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Timothy Chen</h4>
                  <span className="text-[10px] text-slate-500">Head of Distribution, Apex Manufacturing</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. Trusted Enterprise Clients */}
      <section className="py-12 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-6">
            Trusted by Leading Enterprise Shippers Across the Globe
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            {[
              { name: 'Tata Motors Limited', shipments: '1,420 monthly FTLs', route: 'Pune ↔ Mumbai' },
              { name: 'NorthStar Retail', shipments: '2,850 monthly pallets', route: 'Delhi ↔ Bengaluru' },
              { name: 'Meridian Foods', shipments: '920 reefer loads', route: 'Ahmedabad ↔ Chennai' },
              { name: 'Apex Manufacturing', shipments: '680 heavy containers', route: 'Kolkata ↔ Mumbai' },
              { name: 'Horizon Electronics', shipments: '1,150 air cargo consignments', route: 'Bengaluru ↔ Delhi' },
              { name: 'UrbanMart Logistics', shipments: '3,400 e-commerce dispatches', route: 'Nationwide' }
            ].map((client) => (
              <button
                key={client.name}
                onClick={() => {
                  showToast({
                    type: 'info',
                    title: `${client.name} Enterprise Partnership`,
                    message: `Active volume: ${client.shipments} on ${client.route} corridor. 99.9% SLA compliance.`
                  });
                }}
                className="px-4 py-2 bg-slate-50 hover:bg-[#FFF2EE] hover:text-[#FF4D2A] border border-slate-200 hover:border-[#FF4D2A]/40 rounded-xl text-xs font-bold text-slate-700 transition-all cursor-pointer shadow-2xs flex items-center gap-2"
              >
                <span>{client.name}</span>
                <span className="text-[10px] text-slate-400 font-normal hidden sm:inline">• {client.route}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 11. Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-800">
            <LogisticoLogo size="md" variant="light" showSubtext={true} />
            <div className="flex flex-wrap items-center justify-center gap-5 text-xs text-slate-400 font-medium">
              <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-white cursor-pointer">
                Home
              </button>
              <button onClick={() => scrollToSection('about-company')} className="hover:text-white cursor-pointer">
                About Company
              </button>
              <button onClick={() => scrollToSection('services')} className="hover:text-white cursor-pointer">
                Services
              </button>
              <button onClick={() => scrollToSection('fleet-network')} className="hover:text-white cursor-pointer">
                Fleet & Corridors
              </button>
              <button onClick={() => scrollToSection('tracking-section')} className="hover:text-white cursor-pointer">
                Live Tracking
              </button>
              <button onClick={() => scrollToSection('rate-estimator')} className="hover:text-white cursor-pointer">
                Rate Calculator
              </button>
              <button onClick={() => scrollToSection('reviews-section')} className="hover:text-white cursor-pointer">
                Customer Reviews
              </button>
              <button onClick={() => setIsSignInModalOpen(true)} className="hover:text-white cursor-pointer">
                Sign In Portals
              </button>
              <button onClick={() => setIsQuoteModalOpen(true)} className="hover:text-[#e98622] cursor-pointer">
                Get Free Quote
              </button>
              <a href="mailto:dispatch@logicore.com" className="hover:text-white transition-colors cursor-pointer">
                dispatch@logicore.com
              </a>
              <a href="tel:18005436780" className="hover:text-[#e98622] font-mono transition-colors cursor-pointer">
                1800-543-LOGI
              </a>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <p>© {new Date().getFullYear()} Logistico GFS Inc. & LogiCore Supply Chain Operating System. All rights reserved.</p>
            <div className="flex items-center gap-4 text-[11px] font-mono">
              <button
                onClick={() => showToast({ type: 'info', title: 'Security Governance', message: 'SOC2 Type II & ISO 27001 audit report verified.' })}
                className="hover:text-slate-300 underline cursor-pointer"
              >
                Security: ISO 27001
              </button>
              <span>•</span>
              <button
                onClick={() => showToast({ type: 'info', title: 'Regulatory Status', message: 'GST E-Way Bill & FASTag API endpoints active and synchronized.' })}
                className="hover:text-slate-300 underline cursor-pointer"
              >
                GST E-Way Bill Ready
              </button>
              <span>•</span>
              <button
                onClick={() => showToast({ type: 'info', title: 'Customs Accreditation', message: 'Indian Customs AEO-T2 green-channel status verified.' })}
                className="hover:text-slate-300 underline cursor-pointer"
              >
                AEO-T2 Certified
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* 12. Interactive Modal Layers */}
      <EnterpriseAccessModal isOpen={isSignInModalOpen} onClose={() => setIsSignInModalOpen(false)} />

      <FreightQuoteModal isOpen={isQuoteModalOpen} onClose={() => setIsQuoteModalOpen(false)} />

      <CommercialBLModal
        isOpen={isBLModalOpen}
        onClose={() => setIsBLModalOpen(false)}
        shipmentId={trackedShipment?.id || 'LGX-2026-10482'}
      />

      <AuthRequiredModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={() => {
          if (authModalTarget === 'Commercial Bill of Lading (B/L)') {
            setIsBLModalOpen(true);
          } else {
            executeTrackSearch();
            const el = document.getElementById('tracking-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }
        }}
        targetFeature={authModalTarget}
        reason={authModalReason}
      />

      <LeaveReviewModal isOpen={isReviewModalOpen} onClose={() => setIsReviewModalOpen(false)} />

      <UnloadingBookingModal isOpen={isUnloadingModalOpen} onClose={() => setIsUnloadingModalOpen(false)} />
    </div>
  );
};
