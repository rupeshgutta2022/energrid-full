import React from 'react';
import { useLogistics } from '../../context/LogisticsContext';
import { StatCard } from '../common/StatCard';
import { StatusBadge } from '../common/StatusBadge';
import {
  Activity,
  Truck,
  AlertTriangle,
  Clock,
  CheckCircle2,
  Users,
  Building2,
  ArrowRight,
  ShieldAlert,
  Radio,
  ExternalLink,
  Plus
} from 'lucide-react';

export const OperationsDashboard: React.FC = () => {
  const {
    shipments,
    orders,
    vehicles,
    drivers,
    warehouses,
    notifications,
    setActiveView,
    setSelectedShipmentId,
    setTrackingShipmentId,
    setIsCreateShipmentModalOpen
  } = useLogistics();

  const activeShipments = shipments.filter(
    (s) => s.status === 'In Transit' || s.status === 'Out for Delivery' || s.status === 'Assigned'
  );
  const delayedShipments = shipments.filter((s) => s.status === 'Delayed');
  const exceptions = shipments.filter((s) => s.status === 'Exception');
  const pendingOrders = orders.filter((o) => o.status === 'Confirmed' || o.status === 'Processing');
  const activeDrivers = drivers.filter((d) => d.status === 'On Duty');
  const availableVehicles = vehicles.filter((v) => v.status === 'Available');

  const operationalAlerts = notifications.filter(
    (n) => n.category === 'Shipment' || n.category === 'Fleet' || n.category === 'Warehouse'
  );

  return (
    <div className="space-y-6">
      {/* Top Banner: Operations Command Status */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Operations Command Center</h1>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Live Telematics Active
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {activeShipments.length} consignments in motion • {delayedShipments.length + exceptions.length} need immediate intervention
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setActiveView('tracking')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-white text-slate-700 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors shadow-2xs"
          >
            <Radio className="w-3.5 h-3.5 text-blue-600" />
            <span>Live Map Simulation</span>
          </button>
          <button
            onClick={() => setIsCreateShipmentModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-2xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Book New Dispatch</span>
          </button>
        </div>
      </div>

      {/* Primary KPI Grid (6 key operation metrics) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard
          title="Active Shipments"
          value={activeShipments.length.toString()}
          subtitle="Moving across 4 corridors"
          icon={Truck}
          accentColor="blue"
          onClick={() => setActiveView('shipments')}
        />
        <StatCard
          title="Delayed Shipments"
          value={delayedShipments.length.toString()}
          subtitle="Toll / bypass slowdowns"
          icon={Clock}
          accentColor="amber"
          onClick={() => setActiveView('shipments')}
        />
        <StatCard
          title="Exceptions"
          value={exceptions.length.toString()}
          subtitle="Temp / sensor alerts"
          icon={AlertTriangle}
          accentColor="rose"
          onClick={() => setActiveView('shipments')}
        />
        <StatCard
          title="Pending Orders"
          value={pendingOrders.length.toString()}
          subtitle="Ready for staging & packing"
          icon={CheckCircle2}
          accentColor="indigo"
          onClick={() => setActiveView('orders')}
        />
        <StatCard
          title="Active Drivers"
          value={activeDrivers.length.toString()}
          subtitle={`${drivers.length - activeDrivers.length} resting or on standby`}
          icon={Users}
          accentColor="emerald"
          onClick={() => setActiveView('drivers')}
        />
        <StatCard
          title="Ready Fleet"
          value={availableVehicles.length.toString()}
          subtitle="Available for instant dispatch"
          icon={Truck}
          accentColor="slate"
          onClick={() => setActiveView('fleet')}
        />
      </div>

      {/* Priority Action Board & Critical Consignments */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Consignments Needing Attention (Left 2 cols) */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200/90 shadow-xs p-5">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-semibold text-slate-900 tracking-tight">Active Consignments Radar</h3>
              <p className="text-xs text-slate-500 mt-0.5">High-priority dispatches, current positions, and ETAs</p>
            </div>
            <button
              onClick={() => setActiveView('shipments')}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700"
            >
              View all shipments →
            </button>
          </div>

          <div className="mt-4 space-y-3">
            {shipments.slice(0, 5).map((s) => (
              <div
                key={s.id}
                className="p-3.5 rounded-lg border border-slate-100 hover:border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900">{s.id}</span>
                    <span className="text-slate-400">•</span>
                    <span className="font-medium text-slate-700 truncate">{s.customerName}</span>
                    <StatusBadge status={s.status} size="sm" />
                  </div>
                  <div className="text-slate-500 flex items-center gap-1.5 truncate">
                    <span>{s.origin.city}</span>
                    <ArrowRight className="w-3 h-3 text-slate-400" />
                    <span className="font-medium text-slate-700">{s.destination.city}</span>
                    <span className="text-slate-400">•</span>
                    <span className="text-slate-500 truncate">Vehicle: {s.vehiclePlate} ({s.driverName})</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-right">
                    <div className="text-[10px] text-slate-400 uppercase">Estimated Arrival</div>
                    <div className="font-semibold text-slate-900">{s.eta}</div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => {
                        setTrackingShipmentId(s.id);
                        setActiveView('tracking');
                      }}
                      className="px-2.5 py-1 text-xs font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors"
                      title="Live Tracking Map"
                    >
                      Track
                    </button>
                    <button
                      onClick={() => {
                        setSelectedShipmentId(s.id);
                        setActiveView('shipments');
                      }}
                      className="px-2.5 py-1 text-xs font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 rounded-md transition-colors"
                    >
                      Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Operational Alerts & Dispatch Queue (Right 1 col) */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-sm font-semibold text-slate-900 tracking-tight">Real-Time Operational Alerts</h3>
              <span className="text-[10px] font-bold uppercase bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                Active Feed
              </span>
            </div>

            <div className="mt-4 space-y-3">
              {operationalAlerts.slice(0, 4).map((alert) => (
                <div
                  key={alert.id}
                  className="p-3 bg-slate-50 rounded-lg border border-slate-100 text-xs space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <StatusBadge status={alert.severity} size="sm" />
                    <span className="text-[10px] text-slate-400">{alert.timestamp}</span>
                  </div>
                  <div className="font-semibold text-slate-900">{alert.title}</div>
                  <p className="text-slate-600 text-[11px] leading-relaxed">{alert.message}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100">
            <button
              onClick={() => setActiveView('notifications')}
              className="w-full py-2 text-center text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Open Incident Resolution Log →
            </button>
          </div>
        </div>
      </div>

      {/* Warehouse Throughput & Dock Activity Strip */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-5">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-sm font-semibold text-slate-900 tracking-tight">Warehouse Network Dock Activity</h3>
            <p className="text-xs text-slate-500 mt-0.5">Live bay utilization, outbound staging, and pallet throughput</p>
          </div>
          <button
            onClick={() => setActiveView('warehouses')}
            className="text-xs font-semibold text-blue-600 hover:text-blue-700"
          >
            Warehouse dashboard →
          </button>
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
          {warehouses.map((w) => {
            const isHigh = w.utilizedCapacityPercent >= 85;
            return (
              <div
                key={w.id}
                className={`p-3.5 rounded-lg border text-xs space-y-2 ${
                  isHigh ? 'bg-amber-50/50 border-amber-200' : 'bg-slate-50/60 border-slate-200/80'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">{w.code}</span>
                  <StatusBadge status={w.status} size="sm" />
                </div>
                <div className="text-[11px] text-slate-600 truncate font-medium">{w.name}</div>

                <div>
                  <div className="flex justify-between text-[10px] text-slate-500 mb-1">
                    <span>Capacity Fill</span>
                    <span className="font-bold text-slate-700">{w.utilizedCapacityPercent}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        isHigh ? 'bg-amber-500' : 'bg-blue-600'
                      }`}
                      style={{ width: `${w.utilizedCapacityPercent}%` }}
                    />
                  </div>
                </div>

                <div className="flex justify-between text-[10px] text-slate-500 pt-1 border-t border-slate-200/50">
                  <span>Docks: {w.inboundActiveDocks + w.outboundActiveDocks} active</span>
                  <span>{w.dailyThroughputPallets} pal/day</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
