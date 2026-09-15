import React, { useState } from 'react';
import { useLogistics } from '../../context/LogisticsContext';
import { Modal } from '../common/Modal';
import { UserRole } from '../../types';
import { ROLE_CONFIGS } from '../../data/authUsers';
import {
  Lock,
  KeyRound,
  ShieldCheck,
  UserCheck,
  ArrowRight,
  Sparkles,
  Mail,
  Eye,
  EyeOff,
  FileText,
  Truck,
  Building2
} from 'lucide-react';

interface AuthRequiredModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  reasonText?: string;
  targetDocument?: string;
}

export const AuthRequiredModal: React.FC<AuthRequiredModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  reasonText = 'To track active consignments, view satellite telematics, and access official commercial Bills of Lading (B/L), please log in to your verified enterprise account.',
  targetDocument = 'Commercial Bill of Lading (B/L)'
}) => {
  const { login, setShowLandingPage, showToast } = useLogistics();

  const [authMode, setAuthMode] = useState<'quick' | 'credentials'>('quick');
  const [selectedRole, setSelectedRole] = useState<UserRole>('Customer');
  const [email, setEmail] = useState('ravi.patel@apeximports.com');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const quickRoles: { role: UserRole; label: string; desc: string; icon: string }[] = [
    {
      role: 'Customer',
      label: 'Corporate Consignee',
      desc: 'B/L clearance, invoice payments & delivery confirmations',
      icon: '🏢'
    },
    {
      role: 'Logistics Manager',
      label: 'Logistics Director',
      desc: 'Multi-corridor oversight, carrier contracts & rate matrices',
      icon: '🌐'
    },
    {
      role: 'Operations',
      label: 'Operations Dispatch',
      desc: 'Real-time GPS telemetry, driver dispatch & yard queues',
      icon: '⚡'
    },
    {
      role: 'Fleet Manager',
      label: 'Fleet & Asset Mgr',
      desc: 'Telematics sensors, reefer diagnostics & maintenance',
      icon: '🚛'
    },
    {
      role: 'Executive',
      label: 'Executive Leadership',
      desc: 'Global financial performance, SLA audits & risk analytics',
      icon: '📊'
    }
  ];

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    setEmail(ROLE_CONFIGS[role].user.email);
  };

  const handleQuickLogin = (role: UserRole) => {
    setIsSubmitting(true);
    setTimeout(() => {
      login(role);
      setIsSubmitting(false);
      onClose();
      showToast({
        type: 'success',
        title: 'Authentication Successful',
        message: `Welcome, ${ROLE_CONFIGS[role].user.name}. Clearance verified for ${targetDocument}.`
      });
      if (onSuccess) {
        onSuccess();
      }
    }, 400);
  };

  const handleCredentialsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      login(selectedRole);
      setIsSubmitting(false);
      onClose();
      showToast({
        type: 'success',
        title: 'Corporate Session Authenticated',
        message: `Clearance approved for ${ROLE_CONFIGS[selectedRole].user.name}. Loading ${targetDocument}...`
      });
      if (onSuccess) {
        onSuccess();
      }
    }, 450);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Enterprise Authentication Required"
      subtitle="Confidential document access and real-time cargo telemetry security gate."
      maxWidth="max-w-xl"
    >
      <div className="space-y-5">
        {/* Security Banner */}
        <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center shrink-0 text-amber-700">
            <Lock className="w-4 h-4" />
          </div>
          <div className="text-xs text-amber-900 space-y-1">
            <div className="font-bold flex items-center gap-1.5">
              <span>Restricted Commercial Clearance</span>
              <span className="text-[10px] uppercase font-mono bg-amber-200/80 px-1.5 py-0.5 rounded text-amber-800">
                SOC2 / AEO-T2
              </span>
            </div>
            <p className="text-amber-800/90 leading-relaxed">
              {reasonText}
            </p>
          </div>
        </div>

        {/* Auth Mode Toggle */}
        <div className="flex rounded-lg bg-slate-100 p-1">
          <button
            type="button"
            onClick={() => setAuthMode('quick')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-all ${
              authMode === 'quick'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            ⚡ One-Click Persona Login
          </button>
          <button
            type="button"
            onClick={() => setAuthMode('credentials')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-all ${
              authMode === 'credentials'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            🔑 Corporate Credentials
          </button>
        </div>

        {authMode === 'quick' ? (
          <div className="space-y-2.5">
            <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
              Select Authorized Corporate Account
            </label>
            <div className="space-y-2">
              {quickRoles.map((item) => (
                <button
                  key={item.role}
                  type="button"
                  onClick={() => handleQuickLogin(item.role)}
                  disabled={isSubmitting}
                  className="w-full p-3 bg-white hover:bg-slate-50 border border-slate-200 hover:border-blue-400 rounded-xl text-left transition-all flex items-center justify-between group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <div className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                        <span>{item.label}</span>
                        <span className="text-[10px] font-normal text-slate-500">
                          ({ROLE_CONFIGS[item.role].user.name})
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-500">{item.desc}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-semibold text-blue-600 group-hover:translate-x-0.5 transition-transform">
                    <span>Authorize</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <form onSubmit={handleCredentialsSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Account Role Preset</label>
              <select
                value={selectedRole}
                onChange={(e) => handleRoleSelect(e.target.value as UserRole)}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg bg-white"
              >
                {quickRoles.map((r) => (
                  <option key={r.role} value={r.role}>
                    {r.label} — {ROLE_CONFIGS[r.role].user.name} ({ROLE_CONFIGS[r.role].user.email})
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Corporate Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Password / Security Token</label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-9 py-2 text-xs border border-slate-200 rounded-lg font-mono focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3.5 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs transition-colors cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>{isSubmitting ? 'Authenticating...' : 'Sign In & Access B/L'}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </Modal>
  );
};
