import React, { useState } from 'react';
import { useLogistics } from '../../context/LogisticsContext';
import { StatusBadge } from '../common/StatusBadge';
import { Bell, CheckCircle2, AlertTriangle, AlertCircle, Info, Trash2 } from 'lucide-react';

export const NotificationsView: React.FC = () => {
  const { notifications, markNotificationRead, markAllNotificationsRead } = useLogistics();
  const [filterSeverity, setFilterSeverity] = useState<string>('all');

  const filtered = notifications.filter((n) => {
    if (filterSeverity === 'all') return true;
    return n.severity.toLowerCase() === filterSeverity.toLowerCase();
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">System Incident & Notification Center</h1>
          <p className="text-xs text-slate-500 mt-1">
            Real-time highway incidents, reefer temperature excursion warnings, ETA deviations, and compliance alarms.
          </p>
        </div>

        <button
          onClick={markAllNotificationsRead}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg shadow-2xs transition-colors"
        >
          <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
          <span>Mark All as Read</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 text-xs">
        {['all', 'critical', 'warning', 'info'].map((sev) => (
          <button
            key={sev}
            onClick={() => setFilterSeverity(sev)}
            className={`px-3 py-1.5 rounded-lg font-medium capitalize transition-colors ${
              filterSeverity === sev
                ? 'bg-blue-600 text-white'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {sev}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs divide-y divide-slate-100 overflow-hidden">
        {filtered.length === 0 ? (
          <div className="p-8 text-center text-xs text-slate-400">
            No incidents or alerts matching the selected filter.
          </div>
        ) : (
          filtered.map((item) => (
            <div
              key={item.id}
              onClick={() => markNotificationRead(item.id)}
              className={`p-4 hover:bg-slate-50 transition-colors flex items-start justify-between gap-4 text-xs cursor-pointer ${
                !item.read ? 'bg-blue-50/20' : ''
              }`}
            >
              <div className="flex items-start gap-3.5">
                <div className="mt-0.5">
                  <StatusBadge status={item.severity} size="sm" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900">{item.title}</span>
                    <span className="text-[10px] text-slate-400 font-medium">Category: {item.category}</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed">{item.message}</p>
                </div>
              </div>

              <div className="text-right shrink-0">
                <span className="text-[10px] text-slate-400 block">{item.timestamp}</span>
                {!item.read && (
                  <span className="text-[10px] font-bold text-blue-600 mt-1 inline-block">New</span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
