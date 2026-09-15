import React, { useState } from 'react';
import { useLogistics } from '../../context/LogisticsContext';
import { ROLE_CONFIGS } from '../../data/authUsers';
import {
  Menu,
  X,
  LayoutDashboard,
  Truck,
  MapPin,
  Navigation,
  Bell,
  Package,
  Building2,
  Users,
  Settings,
  Boxes,
  Receipt,
  LogOut,
  ShieldCheck,
  Globe
} from 'lucide-react';

export const MobileNav: React.FC = () => {
  const { activeView, setActiveView, activeRole, currentUser, logout, setShowLandingPage, notifications } = useLogistics();
  const [isOpen, setIsOpen] = useState(false);

  const roleConfig = ROLE_CONFIGS[activeRole] || ROLE_CONFIGS['Operations'];
  const allowed = new Set(roleConfig.allowedViews);
  const unreadCount = notifications.filter((n) => !n.read).length;

  const quickNav = [
    { id: roleConfig.defaultView, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'shipments', label: 'Shipments', icon: Truck },
    { id: 'tracking', label: 'Tracking', icon: MapPin },
    { id: 'notifications', label: 'Alerts', icon: Bell, badge: unreadCount > 0 ? unreadCount : undefined }
  ].filter((it) => allowed.has(it.id));

  const allNavItems = [
    { id: roleConfig.defaultView, label: `${activeRole} Dashboard` },
    { id: 'orders', label: 'Orders' },
    { id: 'shipments', label: 'Shipments' },
    { id: 'tracking', label: 'Live Tracking' },
    { id: 'routes', label: 'Routes & Corridors' },
    { id: 'fleet', label: 'Fleet Registry' },
    { id: 'drivers', label: 'Drivers Roster' },
    { id: 'warehouses', label: 'Warehouses' },
    { id: 'inventory', label: 'Inventory & SKUs' },
    { id: 'customers', label: 'Customers' },
    { id: 'suppliers', label: 'Suppliers' },
    { id: 'procurement', label: 'Procurement (POs)' },
    { id: 'invoices', label: 'Invoices' },
    { id: 'returns', label: 'Returns (RMA)' },
    { id: 'analytics', label: 'Analytics' },
    { id: 'documents', label: 'Documents' },
    { id: 'settings', label: 'Settings' }
  ].filter((item) => allowed.has(item.id));

  return (
    <>
      {/* Mobile Header Bar trigger */}
      <div className="md:hidden sticky top-0 z-40 bg-white border-b border-slate-200 px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#FF5733] to-[#E23817] text-white flex items-center justify-center font-black text-xs shadow-xs">
            L
          </div>
          <div>
            <span className="font-black text-sm text-slate-900 tracking-tight block leading-tight">LOGISTICO</span>
            <span className="text-[10px] text-slate-400 block leading-tight">{roleConfig.portalName}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowLandingPage(true)}
            className="p-1.5 text-xs text-slate-600 hover:text-[#FF4D2A] rounded-lg transition-colors cursor-pointer flex items-center gap-1"
            title="Public Site"
          >
            <Globe className="w-4 h-4 text-[#FF4D2A]" />
          </button>
          <button
            onClick={() => setIsOpen(true)}
            aria-label="Open navigation menu"
            className="p-1.5 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 z-50 overflow-hidden">
          <div
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs"
            onClick={() => setIsOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 w-4/5 max-w-xs bg-white shadow-2xl flex flex-col">
            <div className="p-4 border-b border-slate-200 flex items-center justify-between">
              <div>
                <span className="font-bold text-sm text-slate-900 block">{currentUser?.name}</span>
                <span className="text-[11px] text-[#FF4D2A] font-semibold block">{activeRole} Portal</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close navigation menu"
                className="p-1 text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-3 space-y-1">
              {allNavItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveView(item.id);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                    activeView === item.id
                      ? 'bg-[#FFF2EE] text-[#FF4D2A] font-semibold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Logout CTA in mobile drawer */}
            <div className="p-3 border-t border-slate-200 bg-slate-50 space-y-2">
              <button
                onClick={() => {
                  setIsOpen(false);
                  setShowLandingPage(true);
                }}
                className="w-full py-2 px-3 bg-white border border-[#FFD2C7] text-[#FF4D2A] rounded-lg text-xs font-semibold flex items-center justify-center gap-2 hover:bg-[#FFF2EE] transition-colors cursor-pointer"
              >
                <Globe className="w-4 h-4" />
                <span>Return to Public Site</span>
              </button>
              <button
                onClick={() => {
                  setIsOpen(false);
                  logout();
                }}
                className="w-full py-2 px-3 bg-white border border-rose-200 text-rose-600 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 hover:bg-rose-50 transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>Log Out & Switch Portal</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Sticky Quick Nav for Mobile */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-slate-200 flex items-center justify-around py-2 px-1 shadow-lg">
        {quickNav.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`flex flex-col items-center gap-1 py-1 px-2 rounded-lg text-[10px] font-medium relative transition-colors cursor-pointer ${
                isActive ? 'text-[#FF4D2A]' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{item.label}</span>
              {item.badge && (
                <span className="absolute top-0 right-2 w-3.5 h-3.5 bg-rose-600 text-white rounded-full text-[9px] flex items-center justify-center font-bold">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </>
  );
};
