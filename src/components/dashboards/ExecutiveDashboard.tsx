import React from 'react';
import { useLogistics } from '../../context/LogisticsContext';
import { StatCard } from '../common/StatCard';
import { StatusBadge } from '../common/StatusBadge';
import {
  TrendingUp,
  DollarSign,
  Package,
  Truck,
  CheckCircle2,
  Building2,
  AlertTriangle,
  ArrowUpRight,
  ShieldAlert,
  Percent,
  Compass,
  FileSpreadsheet
} from 'lucide-react';

export const ExecutiveDashboard: React.FC = () => {
  const { shipments, customers, warehouses, notifications, setActiveView } = useLogistics();

  const businessAlerts = notifications.filter(
    (n) => n.severity === 'Critical' || n.severity === 'Warning'
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Executive Overview</h1>
            <span className="text-xs bg-slate-100 text-slate-700 font-medium px-2 py-0.5 rounded-md">
              C-Suite & Board Summary
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Real-time supply chain enterprise performance, operating margins, and asset capacity across all regions.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setActiveView('analytics')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-white text-slate-700 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors shadow-2xs"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-slate-500" />
            <span>Full Financial BI</span>
          </button>
          <button
            onClick={() => setActiveView('operations-dashboard')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-2xs"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Go to Operations Room</span>
          </button>
        </div>
      </div>

      {/* Critical Business Alerts Strip */}
      {businessAlerts.length > 0 && (
        <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-100 text-amber-800 shrink-0">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div>
              <span className="font-semibold text-amber-900">
                {businessAlerts.length} operational items require senior management review:
              </span>
              <span className="text-amber-800 ml-1.5">{businessAlerts[0]?.message}</span>
            </div>
          </div>
          <button
            onClick={() => setActiveView('notifications')}
            className="text-xs font-semibold text-amber-900 hover:text-amber-950 underline whitespace-nowrap"
          >
            Review all alerts →
          </button>
        </div>
      )}

      {/* Primary KPI Grid (6 Metrics) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard
          title="Revenue (MTD)"
          value="₹24.8M"
          change="+12.4%"
          changeType="positive"
          subtitle="vs previous month (₹22.1M)"
          icon={DollarSign}
          accentColor="emerald"
        />
        <StatCard
          title="On-Time Delivery"
          value="94.8%"
          change="+3.2%"
          changeType="positive"
          subtitle="Target SLA: 95.0%"
          icon={CheckCircle2}
          accentColor="blue"
        />
        <StatCard
          title="Active Shipments"
          value={shipments.length.toString()}
          change="4 require attention"
          changeType="negative"
          subtitle="Across 5 national hubs"
          icon={Package}
          accentColor="indigo"
          onClick={() => setActiveView('shipments')}
        />
        <StatCard
          title="Fleet Utilization"
          value="87.6%"
          change="+4.8%"
          changeType="positive"
          subtitle="7 of 8 heavy haulers assigned"
          icon={Truck}
          accentColor="emerald"
          onClick={() => setActiveView('fleet')}
        />
        <StatCard
          title="Warehouse Fill"
          value="77.8%"
          change="+1.5%"
          changeType="neutral"
          subtitle="1 hub reaching 91% capacity"
          icon={Building2}
          accentColor="amber"
          onClick={() => setActiveView('warehouses')}
        />
        <StatCard
          title="Operating Margin"
          value="18.2%"
          change="+0.8%"
          changeType="positive"
          subtitle="Cost per ton-km: ₹4.82"
          icon={Percent}
          accentColor="slate"
        />
      </div>

      {/* Middle Section: Regional Performance & Financial Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Regional Performance Card */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-semibold text-slate-900 tracking-tight">Regional Hub Throughput & Profitability</h3>
              <p className="text-xs text-slate-500 mt-0.5">Performance index across national logistics zones</p>
            </div>
            <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
              Q3 Targets on Track
            </span>
          </div>

          <div className="mt-4 space-y-4">
            {[
              { region: 'Western Corridor (Mumbai - Pune)', volume: '4,280 tons', onTime: 96.2, margin: '21.4%', health: 'Optimal' },
              { region: 'Southern Spine (Bengaluru - Hyderabad)', volume: '3,890 tons', onTime: 95.1, margin: '19.8%', health: 'Optimal' },
              { region: 'Northern NCR Corridor (Delhi NCR)', volume: '2,450 tons', onTime: 92.4, margin: '16.5%', health: 'Congested' },
              { region: 'Deccan Transit Belt (Solapur - Nagpur)', volume: '1,980 tons', onTime: 94.0, margin: '17.2%', health: 'Optimal' }
            ].map((r) => (
              <div key={r.region} className="p-3 bg-slate-50 rounded-lg border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="space-y-1">
                  <div className="font-semibold text-slate-900">{r.region}</div>
                  <div className="text-slate-500">Total freight moved: <span className="font-medium text-slate-700">{r.volume}</span></div>
                </div>

                <div className="flex items-center gap-6">
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase">On-Time Rate</div>
                    <div className="font-semibold text-slate-800">{r.onTime}%</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase">Gross Margin</div>
                    <div className="font-semibold text-emerald-600">{r.margin}</div>
                  </div>
                  <StatusBadge status={r.health} size="sm" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Operating Cost Breakdown */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-semibold text-slate-900 tracking-tight">Operating Cost Distribution</h3>
            <p className="text-xs text-slate-500 mt-0.5">Total OPEX MTD: ₹19.4M</p>

            <div className="mt-5 space-y-3.5 text-xs">
              <div>
                <div className="flex justify-between font-medium text-slate-700 mb-1">
                  <span>Fuel & Energy</span>
                  <span className="font-semibold text-slate-900">38.4% (₹7.45M)</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 rounded-full" style={{ width: '38.4%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between font-medium text-slate-700 mb-1">
                  <span>Fleet Maintenance & Tolls</span>
                  <span className="font-semibold text-slate-900">22.1% (₹4.28M)</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500 rounded-full" style={{ width: '22.1%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between font-medium text-slate-700 mb-1">
                  <span>Warehouse Labor & Leases</span>
                  <span className="font-semibold text-slate-900">24.5% (₹4.75M)</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: '24.5%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between font-medium text-slate-700 mb-1">
                  <span>Customs & Regulatory Fees</span>
                  <span className="font-semibold text-slate-900">15.0% (₹2.92M)</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: '15.0%' }} />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500">Net operating efficiency</span>
            <span className="font-semibold text-emerald-600 inline-flex items-center">
              <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
              +4.2% YoY
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Section: Top Key Accounts (Enterprise Customers) */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-sm font-semibold text-slate-900 tracking-tight">Key Enterprise Customer Accounts</h3>
            <p className="text-xs text-slate-500 mt-0.5">Top revenue contributors and current contract SLA fulfillment</p>
          </div>
          <button
            onClick={() => setActiveView('customers')}
            className="text-xs font-semibold text-blue-600 hover:text-blue-700"
          >
            Manage all accounts →
          </button>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 uppercase text-[10px] tracking-wider">
                <th className="py-2.5 px-3 font-semibold">Account</th>
                <th className="py-2.5 px-3 font-semibold">Industry</th>
                <th className="py-2.5 px-3 font-semibold">Active Shipments</th>
                <th className="py-2.5 px-3 font-semibold">Lifetime Revenue</th>
                <th className="py-2.5 px-3 font-semibold">Target SLA</th>
                <th className="py-2.5 px-3 font-semibold">Payment Terms</th>
                <th className="py-2.5 px-3 font-semibold">Credit Utilization</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {customers.map((c) => {
                const creditPercent = Math.round((c.creditUsed / c.creditLimit) * 100);
                return (
                  <tr key={c.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-3 font-semibold text-slate-900">{c.companyName}</td>
                    <td className="py-3 px-3 text-slate-600">{c.industry}</td>
                    <td className="py-3 px-3">
                      <span className="font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                        {c.activeShipmentsCount} in transit
                      </span>
                    </td>
                    <td className="py-3 px-3 font-semibold text-slate-900">
                      ₹{(c.lifetimeRevenue / 100000).toFixed(1)} Lakhs
                    </td>
                    <td className="py-3 px-3 font-medium text-emerald-600">{c.slaOnTimeTarget}%</td>
                    <td className="py-3 px-3 text-slate-600">{c.paymentTerms}</td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${creditPercent > 75 ? 'bg-amber-500' : 'bg-emerald-500'}`}
                            style={{ width: `${creditPercent}%` }}
                          />
                        </div>
                        <span className="text-[11px] text-slate-500 font-medium">{creditPercent}%</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
