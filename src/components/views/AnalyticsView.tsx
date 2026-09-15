import React from 'react';
import { useLogistics } from '../../context/LogisticsContext';
import { StatCard } from '../common/StatCard';
import {
  BarChart3,
  TrendingUp,
  Truck,
  Fuel,
  DollarSign,
  Percent,
  Clock,
  Building2,
  Download
} from 'lucide-react';

export const AnalyticsView: React.FC = () => {
  const { showToast } = useLogistics();

  const monthlyRevenue = [
    { month: 'Apr', rev: 18.2, cost: 14.8 },
    { month: 'May', rev: 19.5, cost: 15.6 },
    { month: 'Jun', rev: 21.0, cost: 16.9 },
    { month: 'Jul', rev: 22.4, cost: 17.8 },
    { month: 'Aug', rev: 23.9, cost: 18.9 },
    { month: 'Sep', rev: 24.8, cost: 19.4 }
  ];

  const corridorVelocity = [
    { corridor: 'Mumbai - Bengaluru', onTime: 96.2, avgSpeed: 64, costPerTonKm: 4.6 },
    { corridor: 'Mumbai - Delhi NCR', onTime: 92.8, avgSpeed: 58, costPerTonKm: 5.1 },
    { corridor: 'Bengaluru - Chennai', onTime: 97.5, avgSpeed: 62, costPerTonKm: 4.2 },
    { corridor: 'Nagpur - Kolkata', onTime: 93.9, avgSpeed: 55, costPerTonKm: 4.9 }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Supply Chain Business Intelligence & Analytics</h1>
          <p className="text-xs text-slate-500 mt-1">
            Corridor velocity benchmarking, fuel burn efficiency, margin per ton-km, and network throughput.
          </p>
        </div>

        <button
          onClick={() =>
            showToast({
              type: 'info',
              title: 'Executive BI Report',
              message: 'Q3 Board Report PDF bundle downloaded.'
            })
          }
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg shadow-2xs transition-colors"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export Executive Report</span>
        </button>
      </div>

      {/* KPI Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Avg Cost Per Ton-Km"
          value="₹4.82"
          change="-3.4%"
          changeType="positive"
          subtitle="Direct operating efficiency"
          icon={DollarSign}
          accentColor="emerald"
        />
        <StatCard
          title="Fleet Fuel Efficiency"
          value="4.62 km/L"
          change="+2.8%"
          changeType="positive"
          subtitle="Heavy 40-ton trailer class"
          icon={Fuel}
          accentColor="blue"
        />
        <StatCard
          title="Corridor Velocity Index"
          value="58.4 km/h"
          change="+4.2%"
          changeType="positive"
          subtitle="Including toll gate transit"
          icon={TrendingUp}
          accentColor="indigo"
        />
        <StatCard
          title="Total Freight Moved (MTD)"
          value="18,420 tons"
          change="+11.2%"
          changeType="positive"
          subtitle="Across 842 total dispatches"
          icon={Truck}
          accentColor="slate"
        />
      </div>

      {/* Visual Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue vs Operating Cost Chart */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-semibold text-slate-900 tracking-tight">Revenue vs. Operating Cost (₹ Millions)</h3>
              <p className="text-xs text-slate-500 mt-0.5">Rolling 6-month financial performance</p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1 text-slate-600">
                <span className="w-2.5 h-2.5 rounded bg-blue-600" /> Revenue
              </span>
              <span className="flex items-center gap-1 text-slate-600">
                <span className="w-2.5 h-2.5 rounded bg-slate-300" /> OPEX
              </span>
            </div>
          </div>

          <div className="h-56 flex items-end justify-between gap-3 pt-4 px-2">
            {monthlyRevenue.map((item) => (
              <div key={item.month} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                <div className="w-full flex items-end justify-center gap-1.5 h-44">
                  {/* Revenue Bar */}
                  <div
                    className="w-1/2 bg-blue-600 rounded-t-sm transition-all duration-300 relative group"
                    style={{ height: `${(item.rev / 30) * 100}%` }}
                  >
                    <div className="opacity-0 group-hover:opacity-100 absolute -top-7 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] py-0.5 px-1.5 rounded pointer-events-none whitespace-nowrap z-10 transition-opacity">
                      ₹{item.rev}M
                    </div>
                  </div>
                  {/* Cost Bar */}
                  <div
                    className="w-1/2 bg-slate-300 rounded-t-sm transition-all duration-300 relative group"
                    style={{ height: `${(item.cost / 30) * 100}%` }}
                  >
                    <div className="opacity-0 group-hover:opacity-100 absolute -top-7 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] py-0.5 px-1.5 rounded pointer-events-none whitespace-nowrap z-10 transition-opacity">
                      ₹{item.cost}M
                    </div>
                  </div>
                </div>
                <span className="text-xs font-semibold text-slate-700">{item.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Corridor Velocity & Cost Comparison */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-semibold text-slate-900 tracking-tight">National Corridors Cost & SLA Index</h3>
              <p className="text-xs text-slate-500 mt-0.5">Route efficiency metrics comparison</p>
            </div>
          </div>

          <div className="space-y-4 text-xs pt-1">
            {corridorVelocity.map((c) => (
              <div key={c.corridor} className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-2">
                <div className="flex items-center justify-between font-bold text-slate-900">
                  <span>{c.corridor}</span>
                  <span className="text-emerald-700">{c.onTime}% On-Time SLA</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-slate-600">
                  <div>
                    <span>Avg Velocity: </span>
                    <strong className="text-slate-900">{c.avgSpeed} km/h</strong>
                  </div>
                  <div>
                    <span>Operating Cost: </span>
                    <strong className="text-slate-900">₹{c.costPerTonKm} / ton-km</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
