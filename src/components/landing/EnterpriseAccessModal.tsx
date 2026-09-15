import React, { useState } from 'react';
import { useLogistics } from '../../context/LogisticsContext';
import { UserRole } from '../../types';
import { ROLE_CONFIGS } from '../../data/authUsers';
import { LogisticoLogo } from '../common/LogisticoLogo';
import { StatusBadge } from '../common/StatusBadge';
import {
  X,
  Lock,
  Mail,
  KeyRound,
  Eye,
  EyeOff,
  ArrowRight,
  TrendingUp,
  CheckCircle2,
  Truck,
  Navigation,
  ShieldCheck
} from 'lucide-react';

interface EnterpriseAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultRole?: UserRole;
}

export const EnterpriseAccessModal: React.FC<EnterpriseAccessModalProps> = ({
  isOpen,
  onClose,
  defaultRole = 'Operations'
}) => {
  const {
    shipments,
    login,
    setShowLandingPage,
    setActiveView,
    setTrackingShipmentId,
    showToast
  } = useLogistics();

  const [authMode, setAuthMode] = useState<'quick-roles' | 'credentials'>('quick-roles');
  const [selectedRoleForCreds, setSelectedRoleForCreds] = useState<UserRole>(defaultRole);
  const [emailInput, setEmailInput] = useState(ROLE_CONFIGS[defaultRole].user.email);
  const [passwordInput, setPasswordInput] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const trackedShipment = shipments.find((s) => s.id === 'LGX-2026-10482') || shipments[0];

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

  if (!isOpen) return null;

  const handleLaunchRolePortal = (role: UserRole) => {
    login(role);
    setShowLandingPage(false);
    onClose();
    showToast({
      type: 'success',
      title: `Logged in as ${ROLE_CONFIGS[role].user.name}`,
      message: `Access granted to ${ROLE_CONFIGS[role].portalName}`
    });
  };

  const handleSelectRolePersona = (role: UserRole) => {
    setSelectedRoleForCreds(role);
    setEmailInput(ROLE_CONFIGS[role].user.email);
    setPasswordInput('••••••••••••');
  };

  const handleCredentialsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthenticating(true);
    setTimeout(() => {
      setIsAuthenticating(false);
      login(selectedRoleForCreds);
      setShowLandingPage(false);
      onClose();
      showToast({
        type: 'success',
        title: 'Authentication Successful',
        message: `Welcome back, ${ROLE_CONFIGS[selectedRoleForCreds].user.name}. Clearance verified.`
      });
    }, 450);
  };

  const handleLaunchShipmentInWorkspace = (shipmentId: string) => {
    login('Operations');
    setTrackingShipmentId(shipmentId);
    setActiveView('tracking');
    setShowLandingPage(false);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-6xl bg-slate-950 text-white rounded-2xl shadow-2xl border border-slate-800 overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Tagline & Modal Close */}
        <div className="p-4 sm:p-6 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <LogisticoLogo size="md" variant="light" />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black text-white tracking-tight">
                  Enterprise Access Gateway
                </h2>
                <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-mono text-emerald-400 bg-emerald-950/70 border border-emerald-800 px-2 py-0.5 rounded">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  TLS 1.3 • SOC2 Type II
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Logistico enforces strict role-based access control (RBAC). Choose your specialized workspace.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Switcher Tabs */}
            <div className="hidden sm:flex items-center bg-slate-800 p-1 rounded-xl text-xs font-semibold">
              <button
                onClick={() => setAuthMode('quick-roles')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  authMode === 'quick-roles'
                    ? 'bg-[#e98622] text-white shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                1-Click Role Portals
              </button>
              <button
                onClick={() => setAuthMode('credentials')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  authMode === 'credentials'
                    ? 'bg-[#e98622] text-white shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Corporate Login
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              title="Close Gateway"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mobile Tab Switcher */}
        <div className="sm:hidden flex border-b border-slate-800 bg-slate-900/50 p-2 gap-2 text-xs font-semibold">
          <button
            onClick={() => setAuthMode('quick-roles')}
            className={`flex-1 py-2 rounded-lg text-center ${
              authMode === 'quick-roles' ? 'bg-[#e98622] text-white' : 'text-slate-400'
            }`}
          >
            1-Click Role Portals
          </button>
          <button
            onClick={() => setAuthMode('credentials')}
            className={`flex-1 py-2 rounded-lg text-center ${
              authMode === 'credentials' ? 'bg-[#e98622] text-white' : 'text-slate-400'
            }`}
          >
            Corporate Login
          </button>
        </div>

        {/* Dual-Column Interactive Console */}
        <div className="p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start max-h-[80vh] overflow-y-auto">
          {/* Left 7 Columns: Interactive Sign-In Studio */}
          <div className="lg:col-span-7 bg-white text-slate-900 rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
            {/* Tab 1: 1-Click Role Portals Grid */}
            {authMode === 'quick-roles' && (
              <div className="p-5 sm:p-6 space-y-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-700">Select Authorized Department Portal:</span>
                  <span className="text-[11px] text-slate-500 font-medium font-mono">8 Distinct RBAC Clearances</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {allRolesList.map((role) => {
                    const cfg = ROLE_CONFIGS[role];
                    return (
                      <div
                        key={role}
                        onClick={() => handleLaunchRolePortal(role)}
                        className="p-3.5 rounded-xl border border-slate-200 hover:border-[#e98622] hover:bg-amber-50/40 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${cfg.badgeColor}`}>
                              {role}
                            </span>
                            <span className="text-[10px] text-slate-400 font-mono">
                              {cfg.allowedViews.length} views
                            </span>
                          </div>

                          <div className="flex items-center gap-2 mb-1.5">
                            <div className="w-7 h-7 rounded-lg bg-slate-900 text-white font-bold text-[11px] flex items-center justify-center shrink-0">
                              {cfg.user.avatarText}
                            </div>
                            <div className="min-w-0">
                              <h3 className="text-xs font-bold text-slate-900 truncate group-hover:text-[#e98622] transition-colors">
                                {cfg.user.name}
                              </h3>
                              <p className="text-[10px] text-slate-500 truncate">{cfg.user.title}</p>
                            </div>
                          </div>

                          <p className="text-[11px] text-slate-600 line-clamp-2 leading-snug mb-2">
                            {cfg.tagline}
                          </p>
                        </div>

                        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-[#e98622]">
                          <span>Sign In to {role}</span>
                          <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Security Assurance Footer */}
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-600 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Lock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Zero trust access: unauthorized routes trigger automated RBAC protection guards.</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 font-semibold">AES-256</span>
                </div>
              </div>
            )}

            {/* Tab 2: Interactive Corporate Single Sign-On Form */}
            {authMode === 'credentials' && (
              <div className="p-5 sm:p-6 space-y-5">
                <div>
                  <span className="text-xs font-bold text-slate-700 block mb-2">
                    Quick Persona Autofill:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {allRolesList.map((role) => {
                      const isSelected = selectedRoleForCreds === role;
                      return (
                        <button
                          key={role}
                          type="button"
                          onClick={() => handleSelectRolePersona(role)}
                          className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-slate-900 text-white shadow-xs'
                              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                          }`}
                        >
                          {role}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Active Role Clearance Card */}
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-slate-900 text-white font-black text-xs flex items-center justify-center">
                      {ROLE_CONFIGS[selectedRoleForCreds].user.avatarText}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900">
                          {ROLE_CONFIGS[selectedRoleForCreds].user.name}
                        </span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${ROLE_CONFIGS[selectedRoleForCreds].badgeColor}`}>
                          {selectedRoleForCreds}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        {ROLE_CONFIGS[selectedRoleForCreds].portalName}
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-1 rounded border border-emerald-200 font-semibold">
                    Cleared
                  </span>
                </div>

                <form onSubmit={handleCredentialsSubmit} className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Corporate Email Address
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        required
                        value={emailInput}
                        onChange={(e) => setEmailInput(e.target.value)}
                        className="w-full pl-9 pr-3 py-2.5 text-xs font-medium border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e98622] focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-xs font-bold text-slate-700">
                        Security Password / SSO Token
                      </label>
                      <span className="text-[10px] text-slate-400">Enterprise Managed SSO</span>
                    </div>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={passwordInput}
                        onChange={(e) => setPasswordInput(e.target.value)}
                        className="w-full pl-9 pr-10 py-2.5 text-xs font-medium border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e98622] focus:border-transparent font-mono"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isAuthenticating}
                    className="w-full py-3 bg-[#e98622] hover:bg-[#d97515] text-white text-xs font-bold uppercase tracking-wider rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
                  >
                    {isAuthenticating ? (
                      <>
                        <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Verifying Credentials & RBAC Rules...</span>
                      </>
                    ) : (
                      <>
                        <KeyRound className="w-4 h-4" />
                        <span>Authenticate & Launch {selectedRoleForCreds} Workspace</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            )}
          </div>

          {/* Right 5 Columns: Live Fleet Telematics Showcase & Interactive Consignment Card */}
          <div className="lg:col-span-5 space-y-4">
            {/* Network Vital Statistics Ticker */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-900/90 border border-slate-800 p-3.5 rounded-xl">
                <div className="text-[10px] uppercase font-bold text-slate-400">Active Freight Movements</div>
                <div className="text-xl font-black text-white mt-1">48,290+</div>
                <div className="text-[10px] text-emerald-400 font-semibold mt-0.5 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" /> +14.2% MoM Throughput
                </div>
              </div>

              <div className="bg-slate-900/90 border border-slate-800 p-3.5 rounded-xl">
                <div className="text-[10px] uppercase font-bold text-slate-400">On-Time Delivery SLA</div>
                <div className="text-xl font-black text-white mt-1">99.8%</div>
                <div className="text-[10px] text-emerald-400 font-semibold mt-0.5 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Verified by Telematics
                </div>
              </div>

              <div className="bg-slate-900/90 border border-slate-800 p-3.5 rounded-xl">
                <div className="text-[10px] uppercase font-bold text-slate-400">National Corridors</div>
                <div className="text-xl font-black text-white mt-1">140+</div>
                <div className="text-[10px] text-slate-400 font-medium mt-0.5">Air, Road & Ocean</div>
              </div>

              <div className="bg-slate-900/90 border border-slate-800 p-3.5 rounded-xl">
                <div className="text-[10px] uppercase font-bold text-slate-400">Avg Dock Turnaround</div>
                <div className="text-xl font-black text-[#e98622] mt-1">&lt;18 min</div>
                <div className="text-[10px] text-slate-400 font-medium mt-0.5">FASTag Cross-docking</div>
              </div>
            </div>

            {/* Interactive Live Shipment Telematics Preview Card */}
            <div className="bg-slate-900/95 border border-slate-800 rounded-2xl p-4 shadow-xl">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#e98622] animate-pulse" />
                  <span className="text-xs font-bold text-white uppercase tracking-wider">
                    Live Telematics Preview
                  </span>
                </div>
                <span className="text-[10px] font-mono text-slate-400">GPS Interval: 30s</span>
              </div>

              {trackedShipment && (
                <div className="space-y-3.5">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-black text-white font-mono">
                          {trackedShipment.id}
                        </span>
                        <StatusBadge status={trackedShipment.status} size="sm" />
                      </div>
                      <span className="text-[11px] text-slate-400">
                        Customer: <span className="text-slate-200 font-semibold">{trackedShipment.customerName}</span>
                      </span>
                    </div>
                    <span className="text-xs text-[#e98622] font-bold font-mono bg-amber-500/15 px-2 py-1 rounded">
                      ETA: {trackedShipment.estimatedDelivery}
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div>
                    <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1 font-mono">
                      <span>Milestone Progress</span>
                      <span>{trackedShipment.progressPercent}% Completed</span>
                    </div>
                    <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-amber-400 to-[#e98622] rounded-full transition-all duration-500"
                        style={{ width: `${trackedShipment.progressPercent}%` }}
                      />
                    </div>
                  </div>

                  {/* Origin & Destination Checkpoints */}
                  <div className="grid grid-cols-2 gap-3 pt-2 text-xs border-t border-slate-800">
                    <div>
                      <div className="text-[10px] text-slate-500 uppercase font-bold">Origin</div>
                      <div className="font-bold text-white truncate">{trackedShipment.origin.city}</div>
                      <div className="text-[10px] text-slate-400 truncate">{trackedShipment.origin.facility}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-500 uppercase font-bold">Destination</div>
                      <div className="font-bold text-white truncate">{trackedShipment.destination.city}</div>
                      <div className="text-[10px] text-slate-400 truncate">{trackedShipment.destination.facility}</div>
                    </div>
                  </div>

                  {/* Assigned Pilot & Truck */}
                  <div className="p-2.5 bg-slate-800/80 rounded-xl text-xs flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Truck className="w-4 h-4 text-[#e98622]" />
                      <div>
                        <div className="font-bold text-white">{trackedShipment.driverName || 'Amit Patil'}</div>
                        <div className="text-[10px] text-slate-400 font-mono">Vehicle: {trackedShipment.vehicleId}</div>
                      </div>
                    </div>
                    {trackedShipment.temperatureCelsius !== undefined && (
                      <span className="text-[11px] font-mono text-cyan-400 font-bold bg-cyan-950 px-2 py-1 rounded border border-cyan-800">
                        {trackedShipment.temperatureCelsius}°C
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => handleLaunchShipmentInWorkspace(trackedShipment.id)}
                    className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Navigation className="w-3.5 h-3.5 text-[#e98622]" />
                    <span>Open Interactive Live Map in Operations</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
