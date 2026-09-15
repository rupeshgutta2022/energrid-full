import React, { useState } from 'react';
import { useLogistics } from '../../context/LogisticsContext';
import { StatCard } from '../common/StatCard';
import { StatusBadge } from '../common/StatusBadge';
import {
  Building2,
  Boxes,
  ArrowDownLeft,
  ArrowUpRight,
  AlertTriangle,
  CheckCircle2,
  Users,
  Thermometer,
  Layers,
  ArrowRight
} from 'lucide-react';

export const WarehouseDashboard: React.FC = () => {
  const { warehouses, inventory, shipments, setActiveView } = useLogistics();
  const [selectedWarehouseId, setSelectedWarehouseId] = useState<string>('WH-01');

  const selectedWarehouse = (warehouses && warehouses.find((w) => w.id === selectedWarehouseId)) || (warehouses && warehouses[0]);
  const lowStockItems = (inventory || []).filter((i) => i.status === 'Low Stock' || i.status === 'Critical Reorder');
  const inboundShipments = (shipments || []).filter(
    (s) =>
      (selectedWarehouse && s.destination?.facility?.includes(selectedWarehouse.code)) ||
      (selectedWarehouse && s.destination?.city === selectedWarehouse.city)
  );
  const outboundShipments = (shipments || []).filter(
    (s) =>
      (selectedWarehouse && s.origin?.facility?.includes(selectedWarehouse.code)) ||
      (selectedWarehouse && s.origin?.city === selectedWarehouse.city)
  );

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Warehouse & Fulfillment Command</h1>
          <p className="text-xs text-slate-500 mt-1">
            Network storage distribution, cross-dock sequencing, picking throughput, and stock alert monitoring.
          </p>
        </div>

        {/* Hub Selector */}
        <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg p-1 text-xs">
          <span className="text-slate-400 pl-2 font-medium">Select Hub:</span>
          <select
            value={selectedWarehouseId}
            onChange={(e) => setSelectedWarehouseId(e.target.value)}
            aria-label="Select warehouse hub"
            className="bg-transparent font-semibold text-slate-800 focus:outline-hidden pr-2 cursor-pointer"
          >
            {warehouses.map((w) => (
              <option key={w.id} value={w.id}>
                {w.code} — {w.city} ({w.utilizedCapacityPercent}% full)
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Warehouse Overview Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Utilized Capacity"
          value={`${selectedWarehouse.utilizedCapacityPercent}%`}
          change={selectedWarehouse.utilizedCapacityPercent > 85 ? 'Near threshold' : 'Normal buffer'}
          changeType={selectedWarehouse.utilizedCapacityPercent > 85 ? 'negative' : 'positive'}
          subtitle={`${selectedWarehouse.totalCapacitySqFt.toLocaleString()} sq.ft total`}
          icon={Building2}
          accentColor={selectedWarehouse.utilizedCapacityPercent > 85 ? 'amber' : 'blue'}
        />
        <StatCard
          title="Daily Throughput"
          value={`${selectedWarehouse.dailyThroughputPallets} pallets`}
          change="+6.2%"
          changeType="positive"
          subtitle="Inbound + Outbound loaded"
          icon={Layers}
          accentColor="emerald"
        />
        <StatCard
          title="Active Dock Bays"
          value={`${selectedWarehouse.inboundActiveDocks + selectedWarehouse.outboundActiveDocks} / ${selectedWarehouse.inboundDocks + selectedWarehouse.outboundDocks}`}
          subtitle={`${selectedWarehouse.inboundActiveDocks} Inbound • ${selectedWarehouse.outboundActiveDocks} Outbound`}
          icon={ArrowDownLeft}
          accentColor="indigo"
        />
        <StatCard
          title="Active Floor Staff"
          value={`${selectedWarehouse.activeWorkers} operators`}
          subtitle={`Led by ${selectedWarehouse.managerName}`}
          icon={Users}
          accentColor="slate"
        />
      </div>

      {/* Crossdock Operations & Fulfillment Pipeline */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Dock Bays & Staging Lanes */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200/90 shadow-xs p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-semibold text-slate-900 tracking-tight">
                Bay Allocation & Dock Operations — {selectedWarehouse.name}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">Live staging, picking queue, and outbound convoy loading</p>
            </div>
            <StatusBadge status={selectedWarehouse.status} size="sm" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            {/* Stage 1: Inbound Receiving */}
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-900 flex items-center gap-1.5">
                  <ArrowDownLeft className="w-3.5 h-3.5 text-blue-600" />
                  1. Receiving Docks
                </span>
                <span className="font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded text-[11px]">
                  {selectedWarehouse.inboundActiveDocks} bays
                </span>
              </div>
              <p className="text-slate-500 text-[11px]">
                {inboundShipments.length} consignments due for cross-dock deconsolidation today.
              </p>
              <div className="pt-2 border-t border-slate-200/60 flex justify-between text-[11px] text-slate-600">
                <span>Total inbound bays:</span>
                <span className="font-semibold">{selectedWarehouse.inboundDocks}</span>
              </div>
            </div>

            {/* Stage 2: Sorting & Picking */}
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-900 flex items-center gap-1.5">
                  <Boxes className="w-3.5 h-3.5 text-indigo-600" />
                  2. Picking & Pack
                </span>
                <span className="font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded text-[11px]">
                  Active
                </span>
              </div>
              <p className="text-slate-500 text-[11px]">
                High-density pallet racking with RF barcode scanning and cold storage integrity.
              </p>
              <div className="pt-2 border-t border-slate-200/60 flex justify-between text-[11px] text-slate-600">
                <span>Cold Storage:</span>
                <span className="font-semibold text-emerald-600">
                  {selectedWarehouse.temperatureControlled ? 'Enabled (4°C)' : 'Ambient only'}
                </span>
              </div>
            </div>

            {/* Stage 3: Outbound Staging */}
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-900 flex items-center gap-1.5">
                  <ArrowUpRight className="w-3.5 h-3.5 text-emerald-600" />
                  3. Outbound Staging
                </span>
                <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[11px]">
                  {selectedWarehouse.outboundActiveDocks} bays
                </span>
              </div>
              <p className="text-slate-500 text-[11px]">
                {outboundShipments.length} trucks queued for manifest verification and seal checks.
              </p>
              <div className="pt-2 border-t border-slate-200/60 flex justify-between text-[11px] text-slate-600">
                <span>Total outbound bays:</span>
                <span className="font-semibold">{selectedWarehouse.outboundDocks}</span>
              </div>
            </div>
          </div>

          {/* Connected Shipments */}
          <div className="pt-2">
            <h4 className="text-xs font-semibold text-slate-800 mb-2">Active Staging Queue for this Hub</h4>
            <div className="space-y-2">
              {shipments.slice(0, 3).map((s) => (
                <div
                  key={s.id}
                  className="p-2.5 rounded-lg border border-slate-100 bg-white flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900">{s.id}</span>
                    <span className="text-slate-400">•</span>
                    <span className="text-slate-600">{s.customerName}</span>
                    <span className="text-slate-400">•</span>
                    <span className="text-slate-500">{s.packageType}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <StatusBadge status={s.status} size="sm" />
                    <span className="text-slate-500 font-medium">{s.weightKg.toLocaleString()} kg</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Low-Stock & Reorder Alerts */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-sm font-semibold text-slate-900 tracking-tight">Stock Reorder Warnings</h3>
                <p className="text-xs text-slate-500 mt-0.5">SKUs below safety stock threshold</p>
              </div>
              <span className="text-[10px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full">
                {lowStockItems.length} alerts
              </span>
            </div>

            <div className="mt-4 space-y-3">
              {lowStockItems.map((item) => (
                <div key={item.id} className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">{item.sku}</span>
                    <StatusBadge status={item.status} size="sm" />
                  </div>
                  <div className="text-slate-700 font-medium truncate">{item.name}</div>
                  <div className="flex justify-between text-[11px] text-slate-500 pt-1">
                    <span>On hand: <strong className="text-rose-600">{item.quantityOnHand}</strong> units</span>
                    <span>Reorder at: {item.reorderLevel}</span>
                  </div>
                  <div className="text-[10px] text-slate-400 truncate">Bay: {item.bayLocation} ({item.warehouseName})</div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100">
            <button
              onClick={() => setActiveView('inventory')}
              className="w-full py-2 text-center text-xs font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
            >
              Open Full Inventory Manager →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
