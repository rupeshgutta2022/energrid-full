import React, { useState } from 'react';
import { useLogistics } from '../../context/LogisticsContext';
import { UserRole } from '../../types';
import { ROLE_CONFIGS } from '../../data/authUsers';
import { LogisticoLogo } from '../common/LogisticoLogo';
import {
  TrendingUp,
  Activity,
  Compass,
  Truck,
  Warehouse,
  Navigation,
  ShoppingBag,
  Shield,
  Lock,
  ArrowRight,
  ShieldCheck,
  Building2,
  CheckCircle2,
  KeyRound,
  User,
  ArrowLeft,
  Globe
} from 'lucide-react';

const ROLE_ICONS: Record<UserRole, React.ComponentType<{ className?: string }>> = {
  Executive: TrendingUp,
  Operations: Activity,
  'Logistics Manager': Compass,
  'Fleet Manager': Truck,
  'Warehouse Supervisor': Warehouse,
  Driver: Navigation,
  Customer: ShoppingBag,
  'System Admin': Shield
};

export const LoginPortal: React.FC = () => {
  const { login, setShowLandingPage } = useLogistics();
  const [selectedRoleForManual, setSelectedRoleForManual] = useState<UserRole>('Operations');
  const [activeTab, setActiveTab] = useState<'portals' | 'credentials'>('portals');
  const [email, setEmail] = useState(ROLE_CONFIGS['Operations'].user.email);
  const [password, setPassword] = useState('••••••••••••');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePortalLogin = (role: UserRole) => {
    login(role);
  };

  const handleManualLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      login(selectedRoleForManual);
      setIsSubmitting(false);
    }, 400);
  };

  const handleSelectRoleForManual = (role: UserRole) => {
    setSelectedRoleForManual(role);
    setEmail(ROLE_CONFIGS[role].user.email);
  };

  return (
    <div className="min-h-screen w-full bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-[#FF4D2A] selection:text-white relative overflow-x-hidden">
      {/* Background vector highway grid lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#FF4D2A]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header */}
      <header className="relative z-10 border-b border-slate-800/80 bg-slate-900/70 backdrop-blur-md px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <LogisticoLogo variant="light" size="md" />
          <span className="hidden md:inline-flex text-[10px] font-mono font-semibold uppercase px-2 py-0.5 rounded bg-[#FF4D2A]/10 text-[#FF4D2A] border border-[#FF4D2A]/20">
            Enterprise Gateway
          </span>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <button
            onClick={() => setShowLandingPage(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Public Site</span>
          </button>
          
          <div className="hidden sm:flex items-center gap-1.5 text-emerald-400 bg-emerald-950/40 border border-emerald-800/50 px-3 py-1.5 rounded-full text-[11px] font-medium">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>SOC2 Type II & FASTag Gateway Active</span>
          </div>
        </div>
      </header>

      {/* Center Content */}
      <main className="relative z-10 flex-1 max-w-6xl w-full mx-auto px-4 py-8 sm:py-12 flex flex-col items-center">
        {/* Title */}
        <div className="text-center max-w-2xl mb-8 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700/70 text-slate-300 text-xs font-medium mb-1">
            <Lock className="w-3.5 h-3.5 text-[#FF4D2A]" />
            <span>Role-Segregated Access Control</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Authenticate to Your Operational Portal
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            Each role in the Logistico supply chain lifecycle provides a dedicated, permission-gated workspace. Select your department or sign in with enterprise credentials.
          </p>

          {/* Mode Switcher Tabs */}
          <div className="pt-2 flex justify-center">
            <div className="inline-flex p-1 bg-slate-900 border border-slate-800 rounded-xl">
              <button
                onClick={() => setActiveTab('portals')}
                className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  activeTab === 'portals'
                    ? 'bg-[#FF4D2A] text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                1-Click Role Portals (8 Dashboards)
              </button>
              <button
                onClick={() => setActiveTab('credentials')}
                className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  activeTab === 'credentials'
                    ? 'bg-[#FF4D2A] text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Enterprise Credentials Login
              </button>
            </div>
          </div>
        </div>

        {/* VIEW A: 8 Distinct Portal Cards */}
        {activeTab === 'portals' && (
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-in fade-in duration-200">
            {(Object.keys(ROLE_CONFIGS) as UserRole[]).map((roleKey) => {
              const cfg = ROLE_CONFIGS[roleKey];
              const Icon = ROLE_ICONS[roleKey];

              return (
                <div
                  key={roleKey}
                  className="bg-slate-900/80 hover:bg-slate-900 border border-slate-800/80 hover:border-[#FF4D2A]/50 rounded-2xl p-5 transition-all flex flex-col justify-between group shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700/80 flex items-center justify-center text-[#FF4D2A] group-hover:text-white group-hover:bg-[#FF4D2A] transition-colors">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-mono uppercase font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                        {cfg.role}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-sm font-bold text-white group-hover:text-[#FF4D2A] transition-colors">
                        {cfg.portalName}
                      </h3>
                      <p className="text-[11px] text-slate-400 line-clamp-2 mt-1 leading-snug">
                        {cfg.tagline}
                      </p>
                    </div>

                    {/* Authorized Persona Bio */}
                    <div className="pt-3 border-t border-slate-800/80 flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-slate-800 text-slate-300 font-bold text-[10px] flex items-center justify-center shrink-0 border border-slate-700">
                        {cfg.user.avatarText}
                      </div>
                      <div className="overflow-hidden">
                        <div className="text-xs font-semibold text-slate-200 truncate">{cfg.user.name}</div>
                        <div className="text-[10px] text-slate-500 truncate">{cfg.user.title}</div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 mt-3">
                    <button
                      onClick={() => handlePortalLogin(roleKey)}
                      className="w-full py-2.5 px-3 bg-[#FF4D2A]/15 hover:bg-[#FF4D2A] text-[#FF4D2A] hover:text-white border border-[#FF4D2A]/30 hover:border-[#FF4D2A] rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs group-hover:bg-[#FF4D2A] group-hover:text-white"
                    >
                      <span>Enter {roleKey} Portal</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* VIEW B: Manual Enterprise Sign In Form */}
        {activeTab === 'credentials' && (
          <div className="w-full max-w-md bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl animate-in fade-in duration-200 space-y-6">
            <div className="text-center space-y-1">
              <h2 className="text-lg font-bold text-white">Logistico Identity Service</h2>
              <p className="text-xs text-slate-400">Select persona profile to auto-fill credentials</p>
            </div>

            {/* Role quick pills */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Target Role Environment
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {(Object.keys(ROLE_CONFIGS) as UserRole[]).map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => handleSelectRoleForManual(r)}
                    className={`py-1.5 px-2.5 rounded-lg text-xs font-medium text-left truncate transition-colors cursor-pointer ${
                      selectedRoleForManual === r
                        ? 'bg-[#FF4D2A] text-white font-semibold'
                        : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 border border-slate-700/60'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleManualLogin} className="space-y-4 text-xs">
              <div>
                <label className="block font-medium text-slate-300 mb-1">Corporate Email Address</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-white placeholder-slate-600 focus:outline-hidden focus:border-[#FF4D2A] focus:ring-1 focus:ring-[#FF4D2A]"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="font-medium text-slate-300">Security Password</label>
                  <span className="text-[10px] text-[#FF4D2A] hover:underline cursor-pointer">Reset MFA?</span>
                </div>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-white placeholder-slate-600 focus:outline-hidden focus:border-[#FF4D2A] focus:ring-1 focus:ring-[#FF4D2A]"
                  />
                </div>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80 text-[11px] text-slate-400 space-y-1">
                <div className="flex items-center justify-between text-slate-300 font-semibold">
                  <span>Authorized User:</span>
                  <span>{ROLE_CONFIGS[selectedRoleForManual].user.name}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Access Scope:</span>
                  <span className="text-[#FF4D2A] font-mono font-medium">{ROLE_CONFIGS[selectedRoleForManual].defaultView}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2.5 px-4 bg-[#FF4D2A] hover:bg-[#E23817] text-white rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#FF4D2A]/25"
              >
                {isSubmitting ? (
                  <span>Authenticating Session...</span>
                ) : (
                  <>
                    <span>Sign In to {selectedRoleForManual} Workspace</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-800/80 bg-slate-900/40 px-6 py-4 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span>Logistico Logistics & Supply Chain Platform</span>
          <span>•</span>
          <span>End-to-End Encrypted Session</span>
        </div>
        <div className="text-[11px] text-slate-400">
          Strict separation of duties: Drivers, Customers, Dispatchers, and Executives retain segregated portals.
        </div>
      </footer>
    </div>
  );
};
