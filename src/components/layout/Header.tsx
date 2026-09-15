import React, { useState } from 'react';
import { useLogistics } from '../../context/LogisticsContext';
import { ROLE_CONFIGS } from '../../data/authUsers';
import {
  Search,
  Bell,
  Plus,
  Truck,
  ShieldCheck,
  ChevronDown,
  LogOut,
  ExternalLink,
  Globe
} from 'lucide-react';
import { StatusBadge } from '../common/StatusBadge';

export const Header: React.FC = () => {
  const {
    activeRole,
    currentUser,
    logout,
    setShowLandingPage,
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
    setIsGlobalSearchOpen,
    setIsCreateShipmentModalOpen,
    setActiveView
  } = useLogistics();

  const [isNotifDropdownOpen, setIsNotifDropdownOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const roleConfig = ROLE_CONFIGS[activeRole] || ROLE_CONFIGS['Operations'];
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="sticky top-0 z-40 h-16 bg-white border-b border-slate-200/90 px-4 sm:px-6 flex items-center justify-between gap-4">
      {/* Left: Search Trigger */}
      <div className="flex items-center gap-3 flex-1 max-w-lg">
        <button
          onClick={() => setIsGlobalSearchOpen(true)}
          className="w-full flex items-center justify-between text-xs text-slate-400 bg-slate-50 hover:bg-slate-100/80 border border-slate-200 rounded-lg px-3.5 py-2 transition-colors cursor-pointer group shadow-2xs"
        >
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
            <span className="text-slate-500 font-normal">Search shipments, vehicles, hubs, drivers...</span>
          </div>
          <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-semibold text-slate-500 bg-white border border-slate-200 rounded shadow-2xs">
            <span className="text-xs">⌘</span>K
          </kbd>
        </button>
      </div>

      {/* Right actions: Portal Badge, Notifications, New Shipment CTA, User Avatar */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Landing Page public button */}
        <button
          onClick={() => setShowLandingPage(true)}
          className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-[#FF4D2A] hover:bg-[#FFF2EE] border border-slate-200 hover:border-[#FFD2C7] rounded-lg transition-colors cursor-pointer"
          title="Return to Public Logistico Landing Page"
        >
          <Globe className="w-3.5 h-3.5 text-[#FF4D2A]" />
          <span className="hidden sm:inline">Landing Page</span>
        </button>

        {/* Active Portal Badge */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs">
          <span className="w-2 h-2 rounded-full bg-[#FF4D2A] animate-pulse" />
          <span className="font-semibold text-slate-700">{roleConfig.portalName}</span>
        </div>

        {/* Notifications Popover */}
        <div className="relative">
          <button
            onClick={() => setIsNotifDropdownOpen(!isNotifDropdownOpen)}
            className="relative p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-rose-600 px-1 text-[10px] font-bold text-white ring-2 ring-white">
                {unreadCount}
              </span>
            )}
          </button>

          {isNotifDropdownOpen && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white border border-slate-200 rounded-xl shadow-xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-100">
              <div className="p-3.5 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-slate-900">System Notifications</span>
                  {unreadCount > 0 && (
                    <span className="text-[10px] font-semibold bg-rose-100 text-rose-700 px-1.5 py-0.5 rounded-full">
                      {unreadCount} new
                    </span>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllNotificationsRead}
                    className="text-[11px] font-medium text-blue-600 hover:text-blue-700 underline cursor-pointer"
                  >
                    Mark all read
                  </button>
                )}
              </div>

              <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                {notifications.length === 0 ? (
                  <div className="p-6 text-center text-xs text-slate-500">
                    No active notifications.
                  </div>
                ) : (
                  notifications.map((notif) => (
                    <div
                      key={notif.id}
                      onClick={() => markNotificationRead(notif.id)}
                      className={`p-3.5 hover:bg-slate-50 transition-colors cursor-pointer ${
                        !notif.read ? 'bg-blue-50/20' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-1.5">
                          <StatusBadge status={notif.severity} size="sm" />
                          <span className="text-xs font-semibold text-slate-900">{notif.title}</span>
                        </div>
                        <span className="text-[10px] text-slate-400 whitespace-nowrap">{notif.timestamp}</span>
                      </div>
                      <p className="text-xs text-slate-600 mt-1 leading-normal">{notif.message}</p>
                    </div>
                  ))
                )}
              </div>

              <div className="p-2.5 bg-slate-50 border-t border-slate-100 text-center">
                <button
                  onClick={() => {
                    setActiveView('notifications');
                    setIsNotifDropdownOpen(false);
                  }}
                  className="text-xs font-medium text-slate-600 hover:text-slate-900 cursor-pointer"
                >
                  View All Notifications Center →
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Create Shipment CTA */}
        {['Operations', 'Logistics Manager', 'Customer', 'Executive', 'System Admin'].includes(activeRole) && (
          <button
            onClick={() => setIsCreateShipmentModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-[#FF4D2A] hover:bg-[#E23817] rounded-lg shadow-xs hover:shadow-sm transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Create Shipment</span>
          </button>
        )}

        {/* User Profile & Logout Popover */}
        <div className="relative">
          <button
            onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
            className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full bg-[#FF4D2A] text-white font-bold text-xs flex items-center justify-center shadow-xs">
              {currentUser?.avatarText || 'LC'}
            </div>
            <div className="text-left hidden md:block">
              <div className="text-xs font-semibold text-slate-900 leading-tight">
                {currentUser?.name || 'Authorized User'}
              </div>
              <div className="text-[10px] text-slate-500 leading-tight">
                {activeRole}
              </div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
          </button>

          {isProfileMenuOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white border border-slate-200 rounded-xl shadow-xl py-2 z-50 animate-in fade-in zoom-in-95 duration-100">
              <div className="px-4 py-2 border-b border-slate-100">
                <div className="text-xs font-bold text-slate-900">{currentUser?.name}</div>
                <div className="text-[11px] text-slate-500">{currentUser?.email}</div>
                <div className="mt-1.5 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#FFF2EE] text-[#FF4D2A] border border-[#FFD2C7]">
                  <ShieldCheck className="w-3 h-3" />
                  <span>{activeRole}</span>
                </div>
              </div>

              <div className="px-2 py-1 space-y-0.5">
                <button
                  onClick={() => {
                    setIsProfileMenuOpen(false);
                    setShowLandingPage(true);
                  }}
                  className="w-full text-left px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 rounded-lg flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <Globe className="w-4 h-4 text-[#FF4D2A]" />
                  <span>View Public Landing Page</span>
                </button>

                <button
                  onClick={() => {
                    setIsProfileMenuOpen(false);
                    logout();
                  }}
                  className="w-full text-left px-3 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 rounded-lg flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Log Out & Switch Portal</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
