import React from 'react';
import { useLogistics } from '../../context/LogisticsContext';
import { ROLE_CONFIGS } from '../../data/authUsers';
import {
  ShieldAlert,
  ArrowLeft,
  CheckCircle2,
  Lock,
  ExternalLink,
  UserCheck,
  RefreshCw
} from 'lucide-react';

interface RoleAccessRestrictedProps {
  attemptedView: string;
}

export const RoleAccessRestricted: React.FC<RoleAccessRestrictedProps> = ({ attemptedView }) => {
  const { activeRole, currentUser, setActiveView, setShowLandingPage, login } = useLogistics();
  const roleConfig = ROLE_CONFIGS[activeRole] || ROLE_CONFIGS['Operations'];

  // Human-readable labels for view IDs
  const VIEW_LABELS: Record<string, string> = {
    'executive-dashboard': 'Executive C-Suite Dashboard',
    'operations-dashboard': 'Operations Command Center',
    'logistics-dashboard': 'Logistics Planning Dashboard',
    'fleet-dashboard': 'Fleet & Telematics Console',
    'warehouse-dashboard': 'Fulfillment Terminal (WH-01)',
    'driver-dashboard': 'Driver Mobile Terminal',
    'customer-dashboard': 'Enterprise Customer Portal',
    'admin-dashboard': 'System Administration Console',
    shipments: 'Shipments Registry',
    tracking: 'Live Freight GPS Tracking',
    orders: 'Sales & Customer Orders',
    routes: 'Corridors & Route Planning',
    fleet: 'Fleet Registry & Assets',
    drivers: 'Drivers Roster & HOS',
    warehouses: 'Warehouses & Facilities',
    inventory: 'Inventory & SKU Balances',
    customers: 'Customer Master Accounts',
    suppliers: 'Suppliers & Vendors',
    procurement: 'Procurement Purchase Orders',
    invoices: 'Financial Invoices & Billing',
    returns: 'Returns (RMA) Processing',
    analytics: 'Enterprise BI & Analytics',
    notifications: 'Operational Alerts & Incident Logs',
    documents: 'Document Vault & e-BOLs',
    settings: 'Tenant & Security Settings'
  };

  const formattedAttempted = VIEW_LABELS[attemptedView] || attemptedView;

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-2xl bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        {/* Top security accent stripe */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-red-500 via-[#FF4D2A] to-amber-500" />

        <div className="flex flex-col items-center text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-red-50 border border-red-200 text-red-600 flex items-center justify-center shadow-inner">
            <ShieldAlert className="w-8 h-8" />
          </div>

          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-red-700 border border-red-200 text-xs font-semibold">
              <Lock className="w-3.5 h-3.5" />
              <span>Role-Based Access Control (RBAC) Enforced</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight pt-1">
              Restricted Operational Workspace
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
              Your active session profile does not have clearance to view <span className="font-semibold text-slate-900 bg-slate-100 px-2 py-0.5 rounded font-mono text-xs">{formattedAttempted}</span>.
            </p>
          </div>

          {/* Active Persona Profile Card */}
          <div className="w-full bg-slate-50 border border-slate-200/80 rounded-xl p-4 text-left flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-900 text-white font-black text-sm flex items-center justify-center shrink-0">
                {currentUser?.avatarText || 'US'}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-900">{currentUser?.name}</span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-200 text-slate-700">
                    {activeRole}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500">{currentUser?.title} • {currentUser?.organization}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowLandingPage(true)}
                className="text-xs font-semibold text-[#FF4D2A] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Switch Portal</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Permitted Views for this role */}
          <div className="w-full text-left space-y-2 pt-2">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
              <span>Authorized Workspaces for {activeRole}</span>
              <span className="text-[10px] font-mono text-emerald-600 font-semibold">{roleConfig.allowedViews.length} Permitted</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {roleConfig.allowedViews.map((viewKey) => (
                <button
                  key={viewKey}
                  onClick={() => setActiveView(viewKey)}
                  className="p-2.5 bg-white hover:bg-[#FFF2EE] border border-slate-200 hover:border-[#FFD2C7] rounded-xl text-left transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-800 group-hover:text-[#FF4D2A] truncate">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span className="truncate">{VIEW_LABELS[viewKey] || viewKey}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="w-full flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-slate-100">
            <button
              onClick={() => setActiveView(roleConfig.defaultView)}
              className="w-full sm:flex-1 py-2.5 px-4 bg-[#FF4D2A] hover:bg-[#E23817] text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-[#FF4D2A]/20 flex items-center justify-center gap-2 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Return to {activeRole} Dashboard</span>
            </button>
            <button
              onClick={() => setShowLandingPage(true)}
              className="w-full sm:w-auto py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
              <span>Select Different Role</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
