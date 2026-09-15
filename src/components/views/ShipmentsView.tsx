import React, { useState, useMemo } from 'react';
import { useLogistics } from '../../context/LogisticsContext';
import { DataTable } from '../common/DataTable';
import { StatusBadge } from '../common/StatusBadge';
import { Drawer } from '../common/Drawer';
import { Shipment, ShipmentStatus } from '../../types';
import {
  Truck,
  Package,
  MapPin,
  Clock,
  User,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Plus,
  FileSignature,
  Download,
  Phone,
  Calendar,
  Layers,
  Thermometer
} from 'lucide-react';

export const ShipmentsView: React.FC = () => {
  const {
    shipments,
    selectedShipmentId,
    setSelectedShipmentId,
    updateShipmentStatus,
    assignDriverAndVehicle,
    addShipmentNote,
    setTrackingShipmentId,
    setActiveView,
    setIsCreateShipmentModalOpen,
    drivers,
    vehicles,
    showToast,
    activeRole,
    currentUser
  } = useLogistics();

  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [noteInput, setNoteInput] = useState('');

  // Apply Role-Based Data Scoping
  const roleScopedShipments = useMemo(() => {
    const allShipments = Array.isArray(shipments) ? shipments : [];
    if (activeRole === 'Customer') {
      return allShipments.filter(
        (s) =>
          (s.customerName && s.customerName.toLowerCase().includes('northstar')) ||
          (currentUser?.organization && s.customerName && s.customerName.toLowerCase().includes(currentUser.organization.toLowerCase()))
      );
    }
    if (activeRole === 'Driver') {
      return allShipments.filter(
        (s) =>
          (s.driverName && s.driverName.toLowerCase().includes('amit')) ||
          (s.driverName && s.driverName.toLowerCase().includes('patil')) ||
          s.vehicleId === 'TRK-2042'
      );
    }
    if (activeRole === 'Warehouse Supervisor') {
      return allShipments.filter(
        (s) =>
          s.origin?.facility?.includes('WH-01') ||
          s.destination?.facility?.includes('WH-01') ||
          s.origin?.city === 'Mumbai' ||
          s.destination?.city === 'Mumbai'
      );
    }
    return allShipments;
  }, [shipments, activeRole, currentUser]);

  const selectedShipment = roleScopedShipments.find((s) => s.id === selectedShipmentId) || null;

  const filteredShipments = useMemo(() => {
    if (filterStatus === 'all') return roleScopedShipments;
    return roleScopedShipments.filter((s) => s.status.toLowerCase() === filterStatus.toLowerCase());
  }, [roleScopedShipments, filterStatus]);

  const columns = [
    {
      key: 'id',
      header: 'Shipment ID',
      sortable: true,
      render: (s: Shipment) => (
        <div>
          <span className="font-bold text-slate-900 block">{s.id}</span>
          <span className="text-[10px] text-slate-400 font-mono">Track: {s.trackingNumber}</span>
        </div>
      )
    },
    {
      key: 'customerName',
      header: 'Customer',
      sortable: true,
      render: (s: Shipment) => (
        <div>
          <span className="font-semibold text-slate-800 block truncate">{s.customerName}</span>
          <span className="text-[11px] text-slate-500 truncate">{s.packageType}</span>
        </div>
      )
    },
    {
      key: 'route',
      header: 'Origin → Destination',
      render: (s: Shipment) => (
        <div className="text-xs">
          <div className="flex items-center gap-1.5 font-medium text-slate-700">
            <span>{s.origin.city}</span>
            <ArrowRight className="w-3 h-3 text-slate-400" />
            <span className="text-slate-900 font-semibold">{s.destination.city}</span>
          </div>
          <div className="text-[10px] text-slate-400 truncate mt-0.5">
            Dest: {s.destination.facility}
          </div>
        </div>
      )
    },
    {
      key: 'driverName',
      header: 'Driver & Vehicle',
      render: (s: Shipment) => (
        <div>
          <span className="font-medium text-slate-800 block">{s.driverName}</span>
          <span className="text-[11px] text-slate-500 font-mono">{s.vehiclePlate}</span>
        </div>
      )
    },
    {
      key: 'weightKg',
      header: 'Gross Weight',
      sortable: true,
      render: (s: Shipment) => (
        <span className="font-medium text-slate-700">{s.weightKg.toLocaleString()} kg</span>
      )
    },
    {
      key: 'eta',
      header: 'ETA',
      sortable: true,
      render: (s: Shipment) => (
        <div>
          <span className="font-semibold text-slate-900 block">{s.eta}</span>
          <span className="text-[10px] text-slate-400">Scheduled</span>
        </div>
      )
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (s: Shipment) => <StatusBadge status={s.status} size="sm" />
    }
  ];

  const handleAddNote = () => {
    if (!noteInput.trim() || !selectedShipment) return;
    addShipmentNote(selectedShipment.id, noteInput);
    setNoteInput('');
  };

  const statusOptions: ShipmentStatus[] = [
    'Pending',
    'Confirmed',
    'Assigned',
    'In Transit',
    'At Warehouse',
    'Out for Delivery',
    'Delivered',
    'Delayed',
    'Exception'
  ];

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Shipment Operations & Lifecycle</h1>
            <span className="text-xs bg-slate-100 text-slate-700 font-semibold px-2 py-0.5 rounded-md">
              {roleScopedShipments.length} Scoped Records
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            End-to-end consignment tracking, driver reassignment, exceptions escalation, and delivery certificates.
          </p>
        </div>

        {['Operations', 'Logistics Manager', 'Executive', 'System Admin', 'Customer'].includes(activeRole) && (
          <button
            onClick={() => setIsCreateShipmentModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-[#FF4D2A] hover:bg-[#E23817] rounded-lg shadow-2xs transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create New Shipment</span>
          </button>
        )}
      </div>

      {/* Role Clearance Scoping Notice */}
      {activeRole === 'Customer' && (
        <div className="bg-purple-50 border border-purple-200 rounded-xl p-3 text-xs text-purple-900 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-purple-600 animate-pulse" />
            <span className="font-bold">Enterprise Customer Clearance:</span>
            <span>Displaying consignments exclusively billed to {currentUser?.organization || 'NorthStar Retail'}. Non-client records and internal driver logs are restricted.</span>
          </div>
          <span className="text-[10px] font-mono uppercase bg-purple-100 px-2 py-0.5 rounded font-bold text-purple-700">RBAC Enforced</span>
        </div>
      )}

      {activeRole === 'Driver' && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-900 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse" />
            <span className="font-bold">Commercial Pilot Clearance:</span>
            <span>Displaying assigned runs for Vehicle TRK-2042. Select your consignment to execute milestone updates, log pre-trip inspections, or capture customer POD signatures.</span>
          </div>
          <span className="text-[10px] font-mono uppercase bg-amber-100 px-2 py-0.5 rounded font-bold text-amber-700">Driver Unit 2042</span>
        </div>
      )}

      {activeRole === 'Warehouse Supervisor' && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-xs text-blue-900 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
            <span className="font-bold">WH-01 Hub Clearance:</span>
            <span>Displaying inbound and outbound cross-dock consignments routing through Mumbai Port Terminal.</span>
          </div>
          <span className="text-[10px] font-mono uppercase bg-blue-100 px-2 py-0.5 rounded font-bold text-blue-700">WH-01 Terminal</span>
        </div>
      )}

      {/* Quick Filter Pill Buttons */}
      <div className="flex flex-wrap gap-2 text-xs">
        {['all', 'in transit', 'delayed', 'exception', 'delivered', 'assigned'].map((st) => (
          <button
            key={st}
            onClick={() => setFilterStatus(st)}
            className={`px-3 py-1.5 rounded-lg font-medium capitalize transition-colors ${
              filterStatus === st
                ? 'bg-blue-600 text-white shadow-2xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {st}
          </button>
        ))}
      </div>

      {/* Main Shipments Data Table */}
      <DataTable
        data={filteredShipments}
        columns={columns}
        searchKey="customerName"
        searchPlaceholder="Filter shipments by ID, customer name, destination city..."
        onRowClick={(item) => setSelectedShipmentId(item.id)}
        exportFilename="logicore-shipments-manifest.csv"
      />

      {/* Shipment Inspection & Action Drawer */}
      {selectedShipment && (
        <Drawer
          isOpen={!!selectedShipment}
          onClose={() => setSelectedShipmentId(null)}
          title={`Shipment ${selectedShipment.id}`}
          subtitle={`${selectedShipment.customerName} • Order Ref: ${selectedShipment.orderId}`}
          footer={
            <div className="flex items-center justify-between w-full">
              <button
                onClick={() => {
                  setTrackingShipmentId(selectedShipment.id);
                  setActiveView('tracking');
                  setSelectedShipmentId(null);
                }}
                className="px-3 py-1.5 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors flex items-center gap-1.5"
              >
                <Truck className="w-3.5 h-3.5" />
                <span>Live Route Map</span>
              </button>
              <button
                onClick={() => setSelectedShipmentId(null)}
                className="px-3.5 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50"
              >
                Done
              </button>
            </div>
          }
        >
          <div className="space-y-6 text-xs">
            {/* Status & Quick Transition */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                  Lifecycle Phase
                </span>
                <StatusBadge status={selectedShipment.status} size="md" />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Change Consignment Status
                </label>
                <select
                  value={selectedShipment.status}
                  onChange={(e) => updateShipmentStatus(selectedShipment.id, e.target.value as ShipmentStatus)}
                  className="w-full px-3 py-2 text-xs font-medium bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                >
                  {statusOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Carrier & Driver Assignment Section */}
            <div className="space-y-2">
              <h4 className="font-semibold text-slate-900 uppercase text-[11px] tracking-wider">
                Assigned Logistics Resources
              </h4>
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] text-slate-500 uppercase font-semibold mb-1">
                      Assigned Driver
                    </label>
                    <select
                      value={selectedShipment.driverName}
                      onChange={(e) => {
                        const drv = drivers.find((d) => d.name === e.target.value);
                        if (drv) {
                          assignDriverAndVehicle(
                            selectedShipment.id,
                            drv.id,
                            drv.name,
                            selectedShipment.vehicleId,
                            selectedShipment.vehiclePlate
                          );
                        }
                      }}
                      className="w-full px-2 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-hidden"
                    >
                      {drivers.map((d) => (
                        <option key={d.id} value={d.name}>
                          {d.name} ({d.status})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] text-slate-500 uppercase font-semibold mb-1">
                      Transport Vehicle
                    </label>
                    <select
                      value={selectedShipment.vehicleId}
                      onChange={(e) => {
                        const veh = vehicles.find((v) => v.id === e.target.value);
                        if (veh) {
                          assignDriverAndVehicle(
                            selectedShipment.id,
                            selectedShipment.driverId,
                            selectedShipment.driverName,
                            veh.id,
                            veh.licensePlate
                          );
                        }
                      }}
                      className="w-full px-2 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-hidden"
                    >
                      {vehicles.map((v) => (
                        <option key={v.id} value={v.id}>
                          {v.id} — {v.licensePlate} ({v.type})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex justify-between pt-2 border-t border-slate-200/60 text-slate-600">
                  <span>Driver Contact:</span>
                  <span className="font-semibold text-slate-800">{selectedShipment.driverPhone}</span>
                </div>
              </div>
            </div>

            {/* Electronic Proof of Delivery (if signed) */}
            {selectedShipment.podSignature && (
              <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-emerald-900 font-semibold">
                    <FileSignature className="w-4 h-4 text-emerald-600" />
                    <span>Verified Electronic Proof of Delivery</span>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                    Delivered
                  </span>
                </div>
                <div className="text-[11px] text-emerald-800">
                  Received by: <strong>{selectedShipment.podReceiverName}</strong> at {selectedShipment.podSignedAt}
                </div>
                <div className="p-2 bg-white rounded-lg border border-emerald-100 mt-2">
                  <img
                    src={selectedShipment.podSignature}
                    alt="Digital Signature"
                    className="h-16 w-auto object-contain mx-auto"
                  />
                </div>
              </div>
            )}

            {/* Audit History & Checkpoints */}
            <div className="space-y-2">
              <h4 className="font-semibold text-slate-900 uppercase text-[11px] tracking-wider">
                Corridor Stop Manifest
              </h4>
              <div className="border border-slate-100 rounded-xl divide-y divide-slate-100 overflow-hidden">
                {selectedShipment.stops.map((st, i) => (
                  <div key={st.id} className="p-3 bg-slate-50/50 flex items-center justify-between text-xs">
                    <div>
                      <div className="font-semibold text-slate-900">{st.name}</div>
                      <div className="text-[11px] text-slate-500">
                        {st.type} • Est: {st.scheduledTime}
                        {st.actualTime && ` (Actual: ${st.actualTime})`}
                      </div>
                    </div>
                    <StatusBadge status={st.status} size="sm" />
                  </div>
                ))}
              </div>
            </div>

            {/* Operational Notes & Incident Log */}
            <div className="space-y-2">
              <h4 className="font-semibold text-slate-900 uppercase text-[11px] tracking-wider">
                Dispatcher Notes & Telemetry Log
              </h4>
              <div className="space-y-1.5 max-h-40 overflow-y-auto">
                {selectedShipment.notes.map((n, i) => (
                  <div key={i} className="p-2.5 bg-slate-50 rounded-lg text-slate-700 text-[11px] border border-slate-100">
                    {n}
                  </div>
                ))}
              </div>

              <div className="flex gap-2 pt-2">
                <input
                  type="text"
                  value={noteInput}
                  onChange={(e) => setNoteInput(e.target.value)}
                  placeholder="Add dispatcher observation or road update..."
                  className="flex-1 px-3 py-1.5 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                  onKeyDown={(e) => e.key === 'Enter' && handleAddNote()}
                />
                <button
                  onClick={handleAddNote}
                  className="px-3 py-1.5 bg-slate-800 text-white rounded-lg font-medium text-xs hover:bg-slate-900"
                >
                  Log
                </button>
              </div>
            </div>
          </div>
        </Drawer>
      )}
    </div>
  );
};
