import React from 'react';
import { useLogistics } from '../../context/LogisticsContext';
import { StatCard } from '../common/StatCard';
import { StatusBadge } from '../common/StatusBadge';
import {
  Compass,
  Route,
  Truck,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  MapPin,
  Calendar,
  Layers
} from 'lucide-react';

export const LogisticsDashboard: React.FC = () => {
  const { routes, shipments, setActiveView, setTrackingShipmentId } = useLogistics();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Logistics Planning & Routing Command</h1>
          <p className="text-xs text-slate-500 mt-1">
            Corridor optimization, carrier SLA fulfillment, dispatch schedules, and transit time efficiency.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveView('routes')}
            className="px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-2xs transition-colors"
          >
            Manage Corridors
          </button>
          <button
            onClick={() => setActiveView('tracking')}
            className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg shadow-2xs transition-colors"
          >
            Live Corridor Radar
          </button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Active Freight Corridors"
          value={routes.length.toString()}
          subtitle="4 key national trunk routes"
          icon={Route}
          accentColor="blue"
        />
        <StatCard
          title="Scheduled Dispatches"
          value="18 today"
          subtitle="14 departed, 4 staging"
          icon={Clock}
          accentColor="indigo"
        />
        <StatCard
          title="Average Transit Velocity"
          value="58.4 km/h"
          change="+3.1%"
          changeType="positive"
          subtitle="Toll plaza wait: 6.2 mins"
          icon={TrendingUp}
          accentColor="emerald"
        />
        <StatCard
          title="Route Exceptions"
          value="1 active"
          subtitle="Satara detour due to bridge work"
          icon={AlertTriangle}
          accentColor="amber"
        />
      </div>

      {/* Middle Grid: Corridor Status & Carrier Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Route Corridors */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200/90 shadow-xs p-5">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-semibold text-slate-900 tracking-tight">Trunk Route Optimization & Status</h3>
              <p className="text-xs text-slate-500 mt-0.5">National highway freight velocity and congestion telemetry</p>
            </div>
            <button
              onClick={() => setActiveView('routes')}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700"
            >
              Route details →
            </button>
          </div>

          <div className="mt-4 space-y-3">
            {routes.map((rt) => (
              <div
                key={rt.id}
                className="p-4 rounded-xl border border-slate-100 bg-slate-50/60 hover:bg-slate-50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900">{rt.name}</span>
                    <span className="text-slate-400">({rt.code})</span>
                    <StatusBadge status={rt.status} size="sm" />
                  </div>
                  <div className="text-slate-500 flex items-center gap-2">
                    <span>{rt.originCity}</span>
                    <ArrowRight className="w-3 h-3 text-slate-400" />
                    <span>{rt.destCity}</span>
                    <span className="text-slate-300">•</span>
                    <span>Distance: {rt.distanceKm} km</span>
                    <span className="text-slate-300">•</span>
                    <span>Avg Duration: {rt.avgDurationHours} hrs</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-[10px] text-slate-400 uppercase">Active Convoys</div>
                    <div className="font-bold text-slate-800">{rt.activeTrucks} trucks</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] text-slate-400 uppercase">Est Tolls</div>
                    <div className="font-bold text-slate-800">₹{rt.tollsCost}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Carrier SLA & Performance */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-5 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-semibold text-slate-900 tracking-tight">Dedicated Carrier Performance</h3>
            <p className="text-xs text-slate-500 mt-0.5">Fleet divisions & 3PL partner SLA scorecard</p>

            <div className="mt-4 space-y-4 text-xs">
              {[
                { carrier: 'LogiCore Express Fleet', onTime: 97.4, trips: 142, status: 'Optimal' },
                { carrier: 'LogiCore ThermoFleet (Reefer)', onTime: 98.9, trips: 68, status: 'Optimal' },
                { carrier: 'LogiCore EV EcoFleet', onTime: 96.5, trips: 84, status: 'Optimal' },
                { carrier: 'InterState Freightline', onTime: 92.1, trips: 56, status: 'Congested' }
              ].map((c) => (
                <div key={c.carrier} className="p-3 bg-slate-50 rounded-lg border border-slate-100 space-y-1.5">
                  <div className="flex items-center justify-between font-semibold text-slate-900">
                    <span>{c.carrier}</span>
                    <span className="text-emerald-700">{c.onTime}% SLA</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span>{c.trips} monthly runs completed</span>
                    <StatusBadge status={c.status} size="sm" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-500 flex justify-between">
            <span>Overall Carrier SLA</span>
            <span className="font-semibold text-emerald-600">96.2% compliance</span>
          </div>
        </div>
      </div>

      {/* Dispatches Scheduled for Today */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-5">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-sm font-semibold text-slate-900 tracking-tight">Live Scheduled Trips</h3>
            <p className="text-xs text-slate-500 mt-0.5">Real-time convoy progress and departure windows</p>
          </div>
          <button
            onClick={() => setActiveView('shipments')}
            className="text-xs font-semibold text-blue-600 hover:text-blue-700"
          >
            All shipments →
          </button>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 uppercase text-[10px] tracking-wider">
                <th className="py-2.5 px-3 font-semibold">Shipment ID</th>
                <th className="py-2.5 px-3 font-semibold">Customer</th>
                <th className="py-2.5 px-3 font-semibold">Vehicle</th>
                <th className="py-2.5 px-3 font-semibold">Driver</th>
                <th className="py-2.5 px-3 font-semibold">Origin → Destination</th>
                <th className="py-2.5 px-3 font-semibold">Progress</th>
                <th className="py-2.5 px-3 font-semibold">ETA</th>
                <th className="py-2.5 px-3 font-semibold">Status</th>
                <th className="py-2.5 px-3 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {shipments.map((s) => (
                <tr key={s.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-3 font-bold text-slate-900">{s.id}</td>
                  <td className="py-3 px-3 font-medium text-slate-700">{s.customerName}</td>
                  <td className="py-3 px-3 text-slate-600">{s.vehiclePlate}</td>
                  <td className="py-3 px-3 text-slate-600">{s.driverName}</td>
                  <td className="py-3 px-3 text-slate-600">{s.origin.city} → {s.destination.city}</td>
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-600 rounded-full" style={{ width: `${s.progressPercent}%` }} />
                      </div>
                      <span className="text-[11px] text-slate-500">{s.progressPercent}%</span>
                    </div>
                  </td>
                  <td className="py-3 px-3 font-semibold text-slate-900">{s.eta}</td>
                  <td className="py-3 px-3">
                    <StatusBadge status={s.status} size="sm" />
                  </td>
                  <td className="py-3 px-3">
                    <button
                      onClick={() => {
                        setTrackingShipmentId(s.id);
                        setActiveView('tracking');
                      }}
                      className="px-2 py-1 text-xs font-semibold text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded"
                    >
                      Track Route
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
