import React, { useState } from 'react';
import { useLogistics } from '../../context/LogisticsContext';
import { DataTable } from '../common/DataTable';
import { StatusBadge } from '../common/StatusBadge';
import { Driver } from '../../types';
import { Drawer } from '../common/Drawer';
import {
  Users,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Phone,
  FileCheck,
  AlertTriangle,
  Award,
  Plus
} from 'lucide-react';

export const DriversListView: React.FC = () => {
  const { drivers, setIsOnboardDriverModalOpen } = useLogistics();
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);

  const columns = [
    {
      key: 'name',
      header: 'Driver Name',
      sortable: true,
      render: (d: Driver) => (
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center shrink-0">
            {d.name.split(' ').map((n) => n[0]).join('')}
          </div>
          <div>
            <span className="font-semibold text-slate-900 block">{d.name}</span>
            <span className="text-[10px] text-slate-400 font-mono">ID: {d.id}</span>
          </div>
        </div>
      )
    },
    {
      key: 'phone',
      header: 'Direct Phone',
      render: (d: Driver) => <span className="text-slate-600 font-mono text-xs">{d.phone}</span>
    },
    {
      key: 'safetyScore',
      header: 'Safety Rating',
      sortable: true,
      render: (d: Driver) => (
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span className="font-bold text-slate-900">{d.safetyScore}%</span>
        </div>
      )
    },
    {
      key: 'onTimeDeliveryRate',
      header: 'On-Time SLA',
      sortable: true,
      render: (d: Driver) => (
        <span className="font-semibold text-emerald-600">{d.onTimeDeliveryRate}%</span>
      )
    },
    {
      key: 'hoursLoggedToday',
      header: 'Hours Today',
      sortable: true,
      render: (d: Driver) => (
        <div>
          <span className="font-medium text-slate-800">{d.hoursLoggedToday} hrs</span>
          <span className="text-[10px] text-slate-400 block">Cap: 10 hrs</span>
        </div>
      )
    },
    {
      key: 'totalTripsCompleted',
      header: 'Completed Trips',
      sortable: true,
      render: (d: Driver) => (
        <span className="font-medium text-slate-700">{d.totalTripsCompleted}</span>
      )
    },
    {
      key: 'status',
      header: 'Shift Status',
      sortable: true,
      render: (d: Driver) => <StatusBadge status={d.status} size="sm" />
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Driver Roster & Telematics Scorecards</h1>
          <p className="text-xs text-slate-500 mt-1">
            Certified commercial drivers, safety scores, Hours of Service (HOS) logs, and compliance licensing.
          </p>
        </div>

        <button
          onClick={() => setIsOnboardDriverModalOpen(true)}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-2xs transition-colors cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Onboard New Driver</span>
        </button>
      </div>

      <DataTable
        data={drivers}
        columns={columns}
        searchKey="name"
        searchPlaceholder="Search drivers by name, ID, phone..."
        onRowClick={(item) => setSelectedDriver(item)}
        exportFilename="logicore-drivers-roster.csv"
      />

      {/* Driver Inspection Drawer */}
      {selectedDriver && (
        <Drawer
          isOpen={!!selectedDriver}
          onClose={() => setSelectedDriver(null)}
          title={`Driver Dossier — ${selectedDriver.name}`}
          subtitle={`Driver ID: ${selectedDriver.id} • License: ${selectedDriver.licenseNumber}`}
          footer={
            <button
              onClick={() => setSelectedDriver(null)}
              className="px-3.5 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50"
            >
              Done
            </button>
          }
        >
          <div className="space-y-6 text-xs">
            {/* Scorecard Strip */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Safety Score</span>
                <div className="text-xl font-bold text-slate-900 mt-1">{selectedDriver.safetyScore}%</div>
                <span className="text-[10px] text-emerald-600 mt-0.5 block">Zero harsh braking alerts</span>
              </div>
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">On-Time Reliability</span>
                <div className="text-xl font-bold text-emerald-600 mt-1">{selectedDriver.onTimeDeliveryRate}%</div>
                <span className="text-[10px] text-slate-500 mt-0.5 block">{selectedDriver.totalTripsCompleted} lifetime trips</span>
              </div>
            </div>

            {/* License & Credentials */}
            <div className="space-y-2">
              <h4 className="font-semibold text-slate-900 uppercase text-[11px] tracking-wider">
                Heavy Vehicle Commercial License
              </h4>
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">License Number:</span>
                  <span className="font-mono font-bold text-slate-800">{selectedDriver.licenseNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">License Expiry:</span>
                  <span className="font-semibold text-slate-800">{selectedDriver.licenseExpiry}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Emergency Phone:</span>
                  <span className="font-semibold text-blue-700">{selectedDriver.phone}</span>
                </div>
              </div>
            </div>

            {/* Regulatory Hours of Service */}
            <div className="space-y-2">
              <h4 className="font-semibold text-slate-900 uppercase text-[11px] tracking-wider">
                Hours of Service (HOS) Compliance
              </h4>
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 space-y-2">
                <div className="flex justify-between font-medium">
                  <span className="text-slate-600">Hours Logged Today:</span>
                  <span className="font-bold text-slate-900">{selectedDriver.hoursLoggedToday} / 10.0 hrs</span>
                </div>
                <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600 rounded-full"
                    style={{ width: `${(selectedDriver.hoursLoggedToday / 10) * 100}%` }}
                  />
                </div>
                <span className="text-[10px] text-slate-400 block pt-1">
                  Mandatory rest period in 3.8 operating hours
                </span>
              </div>
            </div>
          </div>
        </Drawer>
      )}
    </div>
  );
};
