import React from 'react';
import { useLogistics } from '../../context/LogisticsContext';
import { ROLE_CONFIGS } from '../../data/authUsers';
import { LogisticoLogo } from '../common/LogisticoLogo';
import {
  LayoutDashboard,
  Truck,
  Package,
  MapPin,
  Route,
  Users,
  Building2,
  Boxes,
  Briefcase,
  Layers,
  Receipt,
  RotateCcw,
  BarChart3,
  Bell,
  FileText,
  Settings,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Activity,
  Warehouse as WarehouseIcon,
  Shield,
  Navigation,
  Compass,
  ShoppingBag,
  LogOut,
  Globe,
  Cpu
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const {
    activeView,
    setActiveView,
    activeRole,
    currentUser,
    logout,
    setShowLandingPage,
    isSidebarCollapsed,
    setIsSidebarCollapsed,
    notifications,
    shipments
  } = useLogistics();

  const roleConfig = ROLE_CONFIGS[activeRole] || ROLE_CONFIGS['Operations'];
  const allowed = new Set(roleConfig.allowedViews);

  const unreadAlerts = notifications.filter((n) => !n.read && (n.severity === 'Critical' || n.severity === 'Warning')).length;
  const delayedShipmentsCount = shipments.filter((s) => s.status === 'Delayed' || s.status === 'Exception').length;

  // Single Role-Specific Dashboard entry for this authenticated user
  const roleDashboardIcon = {
    Executive: TrendingUp,
    Operations: Activity,
    'Logistics Manager': Compass,
    'Fleet Manager': Truck,
    'Warehouse Supervisor': WarehouseIcon,
    Driver: Navigation,
    Customer: ShoppingBag,
    'System Admin': Shield
  }[activeRole] || LayoutDashboard;

  const primaryDashboardItem = {
    id: roleConfig.defaultView,
    label: `${activeRole} Dashboard`,
    icon: roleDashboardIcon,
    badge: activeRole === 'Operations' && delayedShipmentsCount > 0 ? `${delayedShipmentsCount} alert` : undefined
  };

  const lifecycleItems = [
    { id: 'orders', label: 'Orders', icon: Package },
    { id: 'shipments', label: 'Shipments', icon: Truck, badge: shipments.length.toString() },
    { id: 'tracking', label: 'Live Tracking', icon: MapPin },
    { id: 'routes', label: 'Routes & Corridors', icon: Route }
  ].filter((it) => allowed.has(it.id));

  const networkItems = [
    { id: 'fleet', label: 'Fleet Registry', icon: Truck },
    { id: 'drivers', label: 'Drivers Roster', icon: Users },
    { id: 'warehouses', label: 'Warehouses', icon: Building2 },
    { id: 'inventory', label: 'Inventory & SKUs', icon: Boxes }
  ].filter((it) => allowed.has(it.id));

  const commercialItems = [
    { id: 'customers', label: 'Customers', icon: Briefcase },
    { id: 'suppliers', label: 'Suppliers', icon: Layers },
    { id: 'procurement', label: 'Procurement (POs)', icon: Package },
    { id: 'invoices', label: 'Invoices & Billing', icon: Receipt },
    { id: 'returns', label: 'Returns (RMA)', icon: RotateCcw }
  ].filter((it) => allowed.has(it.id));

  const systemItems = [
    { id: 'enterprise-suite', label: 'Enterprise Systems', icon: Cpu, badge: 'PROD' },
    { id: 'analytics', label: 'Analytics & BI', icon: BarChart3 },
    { id: 'notifications', label: 'Notifications', icon: Bell, badge: unreadAlerts > 0 ? `${unreadAlerts}` : undefined },
    { id: 'documents', label: 'Documents & BOL', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings }
  ].filter((it) => allowed.has(it.id));

  const renderNavGroup = (
    title: string,
    items: Array<{ id: string; label: string; icon: React.ComponentType<{ className?: string }>; badge?: string }>
  ) => {
    if (items.length === 0) return null;

    return (
      <div className="mb-4">
        {!isSidebarCollapsed && (
          <div className="px-3 mb-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            {title}
          </div>
        )}
        <div className="space-y-0.5">
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-all group relative cursor-pointer ${
                  isActive
                    ? 'bg-[#FFF2EE] text-[#FF4D2A] font-semibold shadow-2xs'
                    : 'text-slate-600 hover:bg-slate-100/70 hover:text-slate-900'
                }`}
                title={isSidebarCollapsed ? item.label : undefined}
              >
                <Icon
                  className={`w-4 h-4 shrink-0 transition-colors ${
                    isActive ? 'text-[#FF4D2A]' : 'text-slate-400 group-hover:text-slate-600'
                  }`}
                />
                {!isSidebarCollapsed && (
                  <span className="truncate flex-1 text-left">{item.label}</span>
                )}
                {!isSidebarCollapsed && item.badge && (
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full font-semibold ${
                      item.badge.includes('alert')
                        ? 'bg-rose-100 text-rose-700'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <aside
      className={`hidden md:flex flex-col bg-white border-r border-slate-200/90 transition-all duration-250 ease-in-out shrink-0 z-30 select-none ${
        isSidebarCollapsed ? 'w-18' : 'w-64'
      }`}
    >
      {/* Brand Header */}
      <div className="h-16 border-b border-slate-200/90 px-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5 overflow-hidden">
          {isSidebarCollapsed ? (
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#FF5733] to-[#E23817] text-white flex items-center justify-center font-black text-sm shadow-xs shrink-0 tracking-tight">
              L
            </div>
          ) : (
            <div className="min-w-0">
              <LogisticoLogo size="sm" variant="dark" showSubtext={false} />
              <span className="text-[10px] text-slate-400 font-medium block truncate pl-0.5">
                {roleConfig.portalName}
              </span>
            </div>
          )}
        </div>

        <button
          onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          aria-label={isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
        >
          {isSidebarCollapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Nav Scroll Area */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-4">
        {/* User's Dedicated Primary Dashboard */}
        {renderNavGroup('Primary Workspace', [primaryDashboardItem])}

        {/* Role-authorized functional modules */}
        {renderNavGroup('Fulfillment & Flow', lifecycleItems)}
        {renderNavGroup('Fleet & Facilities', networkItems)}
        {renderNavGroup('Commercial & Trade', commercialItems)}
        {renderNavGroup('Intelligence & Controls', systemItems)}
      </div>

      {/* Logged-In User Profile & Logout / Switch Portal Card */}
      <div className="p-3 border-t border-slate-200/90 bg-slate-50/70">
        {!isSidebarCollapsed ? (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-7 h-7 rounded-full bg-[#FF4D2A] text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-xs">
                  {currentUser?.avatarText || 'LC'}
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-semibold text-slate-900 truncate leading-tight">
                    {currentUser?.name || 'Authenticated User'}
                  </div>
                  <div className="text-[10px] text-slate-400 truncate leading-tight">
                    {activeRole}
                  </div>
                </div>
              </div>

              <button
                onClick={logout}
                title="Log Out / Switch Portal"
                className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-1.5 pt-1">
              <button
                onClick={() => setShowLandingPage(true)}
                className="py-1.5 px-2 bg-white hover:bg-[#FFF2EE] hover:text-[#FF4D2A] hover:border-[#FFD2C7] border border-slate-200 text-slate-700 rounded-lg text-[11px] font-medium flex items-center justify-center gap-1 transition-colors cursor-pointer"
                title="Return to Public Landing Page"
              >
                <Globe className="w-3 h-3 text-[#FF4D2A]" />
                <span className="truncate">Public Site</span>
              </button>
              <button
                onClick={logout}
                className="py-1.5 px-2 bg-white hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 border border-slate-200 text-slate-700 rounded-lg text-[11px] font-medium flex items-center justify-center gap-1 transition-colors cursor-pointer"
              >
                <LogOut className="w-3 h-3 text-slate-400" />
                <span className="truncate">Switch</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <div
              className="w-7 h-7 rounded-full bg-[#FF4D2A] text-white font-bold text-xs flex items-center justify-center cursor-default shadow-xs"
              title={`${currentUser?.name} (${activeRole})`}
            >
              {currentUser?.avatarText || 'LC'}
            </div>
            <button
              onClick={() => setShowLandingPage(true)}
              title="Return to Public Landing Page"
              className="p-1.5 text-slate-400 hover:text-[#FF4D2A] hover:bg-[#FFF2EE] rounded-lg transition-colors cursor-pointer"
            >
              <Globe className="w-4 h-4" />
            </button>
            <button
              onClick={logout}
              title="Logout"
              className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </aside>
  );
};

