import React, { useState } from 'react';
import { useLogistics } from '../../context/LogisticsContext';
import { StatCard } from '../common/StatCard';
import { StatusBadge } from '../common/StatusBadge';
import {
  Shield,
  Users,
  Server,
  Key,
  Activity,
  Lock,
  FileCheck,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Clock
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { auditLogs, showToast } = useLogistics();

  const [activeTab, setActiveTab] = useState<'audit' | 'users' | 'system' | 'security'>('audit');

  const usersList = [
    { name: 'Vikram Malhotra', email: 'v.malhotra@logicore.io', role: 'Executive (C-Suite)', status: 'Active', mfa: true },
    { name: 'Kavita Rao', email: 'k.rao@logicore.io', role: 'Logistics Manager', status: 'Active', mfa: true },
    { name: 'Arjun Deshmukh', email: 'a.deshmukh@logicore.io', role: 'Fleet Manager', status: 'Active', mfa: true },
    { name: 'Pooja Iyer', email: 'p.iyer@logicore.io', role: 'Warehouse Supervisor', status: 'Active', mfa: true },
    { name: 'Amit Patil', email: 'a.patil@logicore.io', role: 'Driver', status: 'On Duty', mfa: false },
    { name: 'System Auditor', email: 'security@logicore.io', role: 'System Admin', status: 'Active', mfa: true }
  ];

  return (
    <div className="space-y-6">
      {/* Admin Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">System Administration & Governance</h1>
            <span className="text-xs bg-slate-900 text-white font-mono px-2 py-0.5 rounded-md">
              Root Console
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Enterprise RBAC permissions, immutable compliance audit trails, and platform telemetry health.
          </p>
        </div>

        <button
          onClick={() =>
            showToast({
              type: 'success',
              title: 'System Health Check Clean',
              message: 'Database replication status: OK. All 4 microservices operational.'
            })
          }
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg shadow-2xs transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
          <span>Run Diagnostic</span>
        </button>
      </div>

      {/* System Health KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Platform Uptime"
          value="99.98%"
          change="30 days rolling"
          changeType="positive"
          subtitle="Zero unmanaged downtime"
          icon={Server}
          accentColor="emerald"
        />
        <StatCard
          title="Audit Trail Entries"
          value={auditLogs.length.toString()}
          subtitle="Cryptographically verified"
          icon={FileCheck}
          accentColor="blue"
        />
        <StatCard
          title="Active System Users"
          value={usersList.length.toString()}
          subtitle="100% MFA enrollment on admins"
          icon={Users}
          accentColor="indigo"
        />
        <StatCard
          title="Telematics Ingestion"
          value="482 pings/sec"
          change="Latency: 18ms"
          changeType="positive"
          subtitle="Vehicle IoT telemetry live"
          icon={Activity}
          accentColor="slate"
        />
      </div>

      {/* Admin Subtabs */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="flex border-b border-slate-200 px-4 gap-4 bg-slate-50/50">
          {[
            { id: 'audit', label: 'Compliance Audit Trail', icon: FileCheck },
            { id: 'users', label: 'Users & RBAC Roles', icon: Users },
            { id: 'system', label: 'System Configuration', icon: Server },
            { id: 'security', label: 'Security & Access Keys', icon: Shield }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-3 px-2 text-xs font-semibold border-b-2 flex items-center gap-2 transition-colors cursor-pointer ${
                  isActive
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        <div className="p-5">
          {/* Tab 1: Audit Logs */}
          {activeTab === 'audit' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-slate-900">System Activity & Tamper-Proof Audit Trail</h3>
                  <p className="text-xs text-slate-500">Every dispatch, state transition, and user action is permanently timestamped</p>
                </div>
                <span className="text-xs text-slate-400 font-mono">Total events: {auditLogs.length}</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 text-slate-400 uppercase text-[10px] tracking-wider">
                      <th className="py-2.5 px-3 font-semibold">Timestamp</th>
                      <th className="py-2.5 px-3 font-semibold">Action</th>
                      <th className="py-2.5 px-3 font-semibold">User</th>
                      <th className="py-2.5 px-3 font-semibold">Entity Type</th>
                      <th className="py-2.5 px-3 font-semibold">Entity ID</th>
                      <th className="py-2.5 px-3 font-semibold">Details</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
                    {auditLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-slate-50 transition-colors">
                        <td className="py-2.5 px-3 text-slate-500 whitespace-nowrap">{log.timestamp}</td>
                        <td className="py-2.5 px-3 font-semibold text-slate-900 font-sans">{log.action}</td>
                        <td className="py-2.5 px-3 text-blue-700 font-sans">{log.userName}</td>
                        <td className="py-2.5 px-3 text-slate-600 font-sans">{log.entityType}</td>
                        <td className="py-2.5 px-3 text-slate-800 font-bold">{log.entityId}</td>
                        <td className="py-2.5 px-3 text-slate-600 font-sans text-xs">{log.details}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Tab 2: Users & RBAC */}
          {activeTab === 'users' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-slate-900">User Identity Directory</h3>
                  <p className="text-xs text-slate-500">Configured enterprise personas, roles, and authorization levels</p>
                </div>
                <button
                  onClick={() =>
                    showToast({
                      type: 'info',
                      title: 'Invite User',
                      message: 'Enterprise invite invitation link generated.'
                    })
                  }
                  className="px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-2xs"
                >
                  Invite New Operator
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 text-slate-400 uppercase text-[10px] tracking-wider">
                      <th className="py-2.5 px-3 font-semibold">Name</th>
                      <th className="py-2.5 px-3 font-semibold">Email</th>
                      <th className="py-2.5 px-3 font-semibold">Role</th>
                      <th className="py-2.5 px-3 font-semibold">2FA Security</th>
                      <th className="py-2.5 px-3 font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {usersList.map((u) => (
                      <tr key={u.email} className="hover:bg-slate-50 transition-colors">
                        <td className="py-3 px-3 font-semibold text-slate-900">{u.name}</td>
                        <td className="py-3 px-3 text-slate-600 font-mono">{u.email}</td>
                        <td className="py-3 px-3 font-medium text-blue-700">{u.role}</td>
                        <td className="py-3 px-3">
                          {u.mfa ? (
                            <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[11px] font-semibold">
                              <CheckCircle2 className="w-3 h-3" /> Enforced
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-slate-500 bg-slate-100 px-2 py-0.5 rounded text-[11px]">
                              Standard
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-3">
                          <StatusBadge status={u.status} size="sm" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Tab 3: System Configuration */}
          {activeTab === 'system' && (
            <div className="space-y-4 text-xs">
              <h3 className="text-sm font-semibold text-slate-900">System Parameters & Operating Rules</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-2">
                  <div className="font-semibold text-slate-900">Automated Dispatch Allocation</div>
                  <p className="text-slate-500">
                    Assign closest available driver and vehicle automatically when orders reach confirmed state.
                  </p>
                  <div className="pt-2 flex items-center justify-between font-medium">
                    <span>Status:</span>
                    <span className="text-emerald-600 font-bold">Enabled</span>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-2">
                  <div className="font-semibold text-slate-900">Refrigeration Sensor Excursion Alert</div>
                  <p className="text-slate-500">
                    Trigger critical alert if cargo reefer temperature rises above 6.0°C for more than 15 minutes.
                  </p>
                  <div className="pt-2 flex items-center justify-between font-medium">
                    <span>Threshold:</span>
                    <span className="text-blue-600 font-bold">+5.0°C Max</span>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-2">
                  <div className="font-semibold text-slate-900">Driver Shift Cap (Hours of Service)</div>
                  <p className="text-slate-500">
                    Strict adherence to regulatory guidelines: mandatory 45-minute rest after 4.5 continuous driving hours.
                  </p>
                  <div className="pt-2 flex items-center justify-between font-medium">
                    <span>Shift limit:</span>
                    <span className="text-slate-800 font-bold">10.0 hrs / day</span>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-2">
                  <div className="font-semibold text-slate-900">Electronic Proof of Delivery Mandate</div>
                  <p className="text-slate-500">
                    Require digital stylus signature before consignment can transition to "Delivered" state.
                  </p>
                  <div className="pt-2 flex items-center justify-between font-medium">
                    <span>Signature policy:</span>
                    <span className="text-emerald-600 font-bold">Mandatory</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 4: Security & Access Keys */}
          {activeTab === 'security' && (
            <div className="space-y-4 text-xs">
              <h3 className="text-sm font-semibold text-slate-900">Security Credentials & Internal Webhook Signers</h3>
              <div className="bg-slate-50 rounded-xl border border-slate-100 p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-slate-900">Fleet Telematics Ingestion Webhook</div>
                    <div className="text-[11px] text-slate-500 font-mono">https://api.logicore.io/v2/telematics/stream</div>
                  </div>
                  <span className="text-[11px] font-mono bg-white border border-slate-200 px-2 py-1 rounded">
                    lc_sec_live_9941a82f••••••••
                  </span>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-200/60">
                  <div>
                    <div className="font-semibold text-slate-900">National FASTag Toll Auto-Deduction Gateway</div>
                    <div className="text-[11px] text-slate-500 font-mono">Connected to NPCI FASTag switch</div>
                  </div>
                  <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-semibold text-[11px]">
                    Active
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
