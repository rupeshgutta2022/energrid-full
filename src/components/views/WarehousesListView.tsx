import React from 'react';
import { useLogistics } from '../../context/LogisticsContext';
import { StatusBadge } from '../common/StatusBadge';
import {
  Building2,
  MapPin,
  Boxes,
  ArrowDownLeft,
  ArrowUpRight,
  Thermometer,
  ShieldCheck,
  Plus
} from 'lucide-react';

export const WarehousesListView: React.FC = () => {
  const { warehouses, setActiveView, showToast } = useLogistics();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Fulfillment Hubs & Warehouse Network</h1>
          <p className="text-xs text-slate-500 mt-1">
            Distribution network infrastructure, active dock bay utilization, and cold chain storage nodes.
          </p>
        </div>

        <button
          onClick={() =>
            showToast({
              type: 'info',
              title: 'Hub Provisioning',
              message: 'Fulfillment network expansion wizard ready.'
            })
          }
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-2xs transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Provision New Node</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {warehouses.map((w) => {
          const isHigh = w.utilizedCapacityPercent >= 85;
          return (
            <div
              key={w.id}
              className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-5 space-y-4 hover:border-slate-300 transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                        {w.code}
                      </span>
                      <h3 className="text-base font-bold text-slate-900">{w.name}</h3>
                    </div>
                    <div className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{w.city}, {w.state}</span>
                    </div>
                  </div>
                  <StatusBadge status={w.status} size="sm" />
                </div>

                {/* Capacity Fill Bar */}
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="flex justify-between text-xs font-semibold text-slate-800 mb-1.5">
                    <span>Capacity Fill</span>
                    <span className={isHigh ? 'text-amber-600' : 'text-blue-600'}>
                      {w.utilizedCapacityPercent}%
                    </span>
                  </div>
                  <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${isHigh ? 'bg-amber-500' : 'bg-blue-600'}`}
                      style={{ width: `${w.utilizedCapacityPercent}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                    <span>Total Area: {w.totalCapacitySqFt.toLocaleString()} sq.ft</span>
                    <span>Daily: {w.dailyThroughputPallets} pallets</span>
                  </div>
                </div>

                {/* Docks & Cold Chain specs */}
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span>Inbound Bays:</span>
                    <span className="font-semibold text-slate-800">
                      {w.inboundActiveDocks} active / {w.inboundDocks} total
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Outbound Bays:</span>
                    <span className="font-semibold text-slate-800">
                      {w.outboundActiveDocks} active / {w.outboundDocks} total
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Cold Chain Reefer:</span>
                    <span className="font-semibold text-emerald-600">
                      {w.temperatureControlled ? 'Supported (2°C - 8°C)' : 'Ambient Only'}
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Floor Supervisor:</span>
                    <span className="font-semibold text-slate-800">{w.managerName}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100">
                <button
                  onClick={() => setActiveView('warehouse-dashboard')}
                  className="w-full py-2 text-center text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                >
                  Open Hub Command Dashboard →
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
