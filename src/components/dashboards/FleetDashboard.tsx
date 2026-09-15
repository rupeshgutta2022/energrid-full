import React, { useState } from 'react';
import { useLogistics } from '../../context/LogisticsContext';
import { StatCard } from '../common/StatCard';
import { StatusBadge } from '../common/StatusBadge';
import { Drawer } from '../common/Drawer';
import { Vehicle } from '../../types';
import {
  Truck,
  Fuel,
  Wrench,
  CheckCircle2,
  AlertTriangle,
  FileCheck,
  Calendar,
  Gauge,
  UserCheck,
  Plus,
  Users,
  Route
} from 'lucide-react';

export const FleetDashboard: React.FC = () => {
  const {
    vehicles,
    updateVehicleStatus,
    setIsAddVehicleModalOpen,
    setIsOnboardDriverModalOpen,
    setIsCreateCorridorModalOpen
  } = useLogistics();
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

  const activeVehicles = vehicles.filter((v) => v.status === 'Active');
  const availableVehicles = vehicles.filter((v) => v.status === 'Available');
  const maintenanceVehicles = vehicles.filter((v) => v.status === 'Maintenance');
  const totalFleet = vehicles.length;
  const avgUtilization = Math.round(
    vehicles.reduce((acc, v) => acc + (v.utilizationPercent || 0), 0) / (totalFleet || 1)
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Fleet Telematics & Asset Operations</h1>
          <p className="text-xs text-slate-500 mt-1">
            Real-time vehicle health, odometer tracking, preventative maintenance logs, and telematics telemetry.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setIsCreateCorridorModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg shadow-2xs transition-colors cursor-pointer"
            title="Create Custom Highway Freight Corridor"
          >
            <Route className="w-3.5 h-3.5 text-blue-600" />
            <span>Add Corridor</span>
          </button>

          <button
            onClick={() => setIsOnboardDriverModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg shadow-2xs transition-colors cursor-pointer"
            title="Onboard Commercial Transport Driver"
          >
            <Users className="w-3.5 h-3.5 text-emerald-600" />
            <span>Onboard Driver</span>
          </button>

          <button
            onClick={() => setIsAddVehicleModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-2xs transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add New Vehicle</span>
          </button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Fleet Size"
          value={totalFleet.toString()}
          subtitle="Heavy haulers & reefers"
          icon={Truck}
          accentColor="blue"
        />
        <StatCard
          title="Active on Road"
          value={activeVehicles.length.toString()}
          subtitle={`${availableVehicles.length} available in depot`}
          icon={CheckCircle2}
          accentColor="emerald"
        />
        <StatCard
          title="Under Maintenance"
          value={maintenanceVehicles.length.toString()}
          change="TRK-2041 scheduled"
          changeType="neutral"
          subtitle="Depot bay service active"
          icon={Wrench}
          accentColor="amber"
        />
        <StatCard
          title="Fleet Utilization"
          value={`${avgUtilization}%`}
          change="+4.8%"
          changeType="positive"
          subtitle="Asset return on capital"
          icon={Gauge}
          accentColor="indigo"
        />
      </div>

      {/* Fleet Inventory Table */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-5">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-sm font-semibold text-slate-900 tracking-tight">Vehicle Roster & Live Status</h3>
            <p className="text-xs text-slate-500 mt-0.5">Click any vehicle to inspect telematics and compliance logs</p>
          </div>
          <span className="text-xs text-slate-500">{vehicles.length} units registered</span>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 uppercase text-[10px] tracking-wider">
                <th className="py-2.5 px-3 font-semibold">Vehicle ID</th>
                <th className="py-2.5 px-3 font-semibold">Make & Model</th>
                <th className="py-2.5 px-3 font-semibold">Type</th>
                <th className="py-2.5 px-3 font-semibold">Plate</th>
                <th className="py-2.5 px-3 font-semibold">Current Driver</th>
                <th className="py-2.5 px-3 font-semibold">Location</th>
                <th className="py-2.5 px-3 font-semibold">Fuel / Charge</th>
                <th className="py-2.5 px-3 font-semibold">Odometer</th>
                <th className="py-2.5 px-3 font-semibold">Status</th>
                <th className="py-2.5 px-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {vehicles.map((v) => (
                <tr
                  key={v.id}
                  onClick={() => setSelectedVehicle(v)}
                  className="hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <td className="py-3 px-3 font-bold text-slate-900">{v.id}</td>
                  <td className="py-3 px-3 font-medium text-slate-800">{v.model}</td>
                  <td className="py-3 px-3 text-slate-600">{v.type}</td>
                  <td className="py-3 px-3 font-mono text-slate-700">{v.licensePlate}</td>
                  <td className="py-3 px-3 text-slate-600">
                    {v.currentDriverName ? (
                      <span className="text-blue-700 font-medium">{v.currentDriverName}</span>
                    ) : (
                      <span className="text-slate-400 italic">Unassigned</span>
                    )}
                  </td>
                  <td className="py-3 px-3 text-slate-600">{v.currentLocationCity}</td>
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-1.5">
                      <Fuel className="w-3.5 h-3.5 text-slate-400" />
                      <span className="font-semibold text-slate-800">{v.fuelPercent}%</span>
                    </div>
                  </td>
                  <td className="py-3 px-3 text-slate-700 font-medium">
                    {v.odometerKm.toLocaleString()} km
                  </td>
                  <td className="py-3 px-3">
                    <StatusBadge status={v.status} size="sm" />
                  </td>
                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedVehicle(v);
                      }}
                      className="px-2.5 py-1 text-xs font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded"
                    >
                      Inspect
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Vehicle Inspection Drawer */}
      {selectedVehicle && (
        <Drawer
          isOpen={!!selectedVehicle}
          onClose={() => setSelectedVehicle(null)}
          title={`Vehicle Dossier — ${selectedVehicle.id}`}
          subtitle={`${selectedVehicle.model} • Plate: ${selectedVehicle.licensePlate}`}
          footer={
            <div className="flex items-center gap-2">
              {selectedVehicle.status !== 'Maintenance' ? (
                <button
                  onClick={() => {
                    updateVehicleStatus(selectedVehicle.id, 'Maintenance');
                    setSelectedVehicle({ ...selectedVehicle, status: 'Maintenance' });
                  }}
                  className="px-3 py-1.5 text-xs font-semibold text-amber-700 bg-amber-50 hover:bg-amber-100 rounded-lg transition-colors"
                >
                  Send to Maintenance
                </button>
              ) : (
                <button
                  onClick={() => {
                    updateVehicleStatus(selectedVehicle.id, 'Available');
                    setSelectedVehicle({ ...selectedVehicle, status: 'Available' });
                  }}
                  className="px-3 py-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors"
                >
                  Return to Active Duty
                </button>
              )}
              <button
                onClick={() => setSelectedVehicle(null)}
                className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50"
              >
                Close
              </button>
            </div>
          }
        >
          <div className="space-y-6 text-xs">
            {/* Health Indicators */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Fuel / Charge Level</span>
                <div className="text-lg font-bold text-slate-900 mt-1">{selectedVehicle.fuelPercent}%</div>
                <div className="h-1.5 w-full bg-slate-200 rounded-full mt-2 overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${selectedVehicle.fuelPercent}%` }} />
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Odometer</span>
                <div className="text-lg font-bold text-slate-900 mt-1">{selectedVehicle.odometerKm.toLocaleString()} km</div>
                <span className="text-[10px] text-slate-500 mt-1 block">
                  Next service: {selectedVehicle.nextServiceDueKm.toLocaleString()} km
                </span>
              </div>
            </div>

            {/* Specifications */}
            <div className="space-y-2">
              <h4 className="font-semibold text-slate-900 uppercase text-[11px] tracking-wider">Specifications & Capacity</h4>
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Payload Capacity:</span>
                  <span className="font-semibold text-slate-800">{selectedVehicle.capacityKg.toLocaleString()} kg</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Vehicle Classification:</span>
                  <span className="font-semibold text-slate-800">{selectedVehicle.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Current Base / Hub:</span>
                  <span className="font-semibold text-slate-800">{selectedVehicle.currentLocationCity}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Assigned Driver:</span>
                  <span className="font-semibold text-blue-700">
                    {selectedVehicle.currentDriverName || 'None'}
                  </span>
                </div>
              </div>
            </div>

            {/* Regulatory & Compliance Documents */}
            <div className="space-y-2">
              <h4 className="font-semibold text-slate-900 uppercase text-[11px] tracking-wider">Regulatory Compliance</h4>
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileCheck className="w-4 h-4 text-emerald-600" />
                    <div>
                      <div className="font-semibold text-slate-800">Commercial Insurance Policy</div>
                      <div className="text-[10px] text-slate-500">Valid until {selectedVehicle.insuranceExpiry}</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">Active</span>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-200/60">
                  <div className="flex items-center gap-2">
                    <FileCheck className="w-4 h-4 text-emerald-600" />
                    <div>
                      <div className="font-semibold text-slate-800">State Road Fitness Certificate</div>
                      <div className="text-[10px] text-slate-500">Valid until {selectedVehicle.fitnessExpiry}</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">Verified</span>
                </div>
              </div>
            </div>

            {/* Preventative Maintenance Log */}
            <div className="space-y-2">
              <h4 className="font-semibold text-slate-900 uppercase text-[11px] tracking-wider">Preventative Maintenance Log</h4>
              <div className="border border-slate-100 rounded-xl p-3 bg-slate-50/50 space-y-2 text-[11px]">
                <div className="flex justify-between font-medium text-slate-700">
                  <span>Last Oil & Filter Overhaul:</span>
                  <span>{selectedVehicle.lastServiceDate}</span>
                </div>
                <div className="flex justify-between font-medium text-slate-700">
                  <span>Tire Pressure & Brake Calipers:</span>
                  <span className="text-emerald-600">Passed Inspection</span>
                </div>
                <div className="flex justify-between font-medium text-slate-700">
                  <span>Telematics GPS Unit:</span>
                  <span className="text-blue-600">Syncing (4G Cellular)</span>
                </div>
              </div>
            </div>
          </div>
        </Drawer>
      )}
    </div>
  );
};
