import React, { useState, useMemo } from 'react';
import { useLogistics } from '../../context/LogisticsContext';
import { DataTable } from '../common/DataTable';
import { StatusBadge } from '../common/StatusBadge';
import { InventoryItem } from '../../types';
import { Drawer } from '../common/Drawer';
import { Modal } from '../common/Modal';
import {
  Boxes,
  AlertTriangle,
  RotateCcw,
  CheckCircle2,
  Plus,
  ArrowRight,
  TrendingUp,
  DollarSign,
  Scale,
  Sparkles,
  Calendar,
  Layers,
  Building,
  Sliders,
  ShieldCheck
} from 'lucide-react';
import {
  InventoryDemandForecastingEngine,
  EoqCalculationResult,
  ReorderPointSpecs,
  SeasonalForecastMonth
} from '../../modules/inventory/InventoryDemandForecastingEngine';

export const InventoryView: React.FC = () => {
  const { inventory, updateInventoryStock, showToast } = useLogistics();
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [isEoqModalOpen, setIsEoqModalOpen] = useState(false);
  const [isForecastModalOpen, setIsForecastModalOpen] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');

  // Interactive EOQ State
  const [annualDemand, setAnnualDemand] = useState(2400);
  const [orderSetupCost, setOrderSetupCost] = useState(1500);
  const [holdingCostPercent, setHoldingCostPercent] = useState(18); // 18% of unit cost
  const [unitCostInput, setUnitCostInput] = useState(32500);
  const [serviceLevel, setServiceLevel] = useState<'90%' | '95%' | '98%' | '99%'>('95%');

  const filteredInventory = useMemo(() => {
    if (categoryFilter === 'ALL') return inventory;
    return inventory.filter((i) => i.category.toLowerCase() === categoryFilter.toLowerCase());
  }, [inventory, categoryFilter]);

  // Inventory Metrics
  const totalValue = inventory.reduce((sum, it) => sum + (it.quantityOnHand || 0) * (it.unitCost || 0), 0);
  const totalUnits = inventory.reduce((sum, it) => sum + (it.quantityOnHand || 0), 0);
  const lowStockCount = inventory.filter((it) => it.quantityOnHand <= it.reorderLevel).length;

  // Working Capital metrics
  const healthMetrics = useMemo(() => {
    return InventoryDemandForecastingEngine.evaluateInventoryTurnoverAndDSI(totalValue * 3.4, totalValue, totalValue * 0.04);
  }, [totalValue]);

  // Calculated EOQ
  const holdingCostPerUnit = Math.max(1, (unitCostInput * holdingCostPercent) / 100);
  const eoqResult: EoqCalculationResult = useMemo(() => {
    return InventoryDemandForecastingEngine.calculateEconomicOrderQuantity(annualDemand, orderSetupCost, holdingCostPerUnit);
  }, [annualDemand, orderSetupCost, holdingCostPerUnit]);

  // Calculated ROP
  const ropResult: ReorderPointSpecs = useMemo(() => {
    const dailyDemand = annualDemand / 365;
    return InventoryDemandForecastingEngine.calculateDynamicReorderPoint(
      dailyDemand,
      dailyDemand * 0.35, // 35% std dev in demand
      14, // 14 days lead time
      2.5, // 2.5 days lead time std dev
      serviceLevel
    );
  }, [annualDemand, serviceLevel]);

  // Seasonal Forecast
  const seasonalForecast: SeasonalForecastMonth[] = useMemo(() => {
    // 12 monthly seasonality factors (higher in Q3/Q4 festival season)
    const seasonality = [0.85, 0.9, 0.95, 1.0, 1.05, 1.02, 0.98, 1.12, 1.25, 1.35, 1.2, 1.08];
    return InventoryDemandForecastingEngine.forecastSeasonalDemand(annualDemand / 12, 8.5, seasonality);
  }, [annualDemand]);

  const categories = ['ALL', ...Array.from(new Set(inventory.map((i) => i.category)))];

  const columns = [
    {
      key: 'sku',
      header: 'SKU Code',
      sortable: true,
      render: (i: InventoryItem) => (
        <div>
          <span className="font-mono font-bold text-slate-900 block">{i.sku}</span>
          <span className="text-[10px] text-slate-400">{i.category}</span>
        </div>
      )
    },
    {
      key: 'name',
      header: 'Product Description & Depot',
      sortable: true,
      render: (i: InventoryItem) => (
        <div>
          <span className="font-semibold text-slate-800 block">{i.name}</span>
          <span className="text-[11px] text-slate-500">{i.warehouseName}</span>
        </div>
      )
    },
    {
      key: 'bayLocation',
      header: 'Racking Bay',
      render: (i: InventoryItem) => (
        <span className="font-mono text-xs font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
          {i.bayLocation}
        </span>
      )
    },
    {
      key: 'quantityOnHand',
      header: 'On Hand',
      sortable: true,
      render: (i: InventoryItem) => (
        <div>
          <span
            className={`font-bold text-sm ${
              i.quantityOnHand <= i.reorderLevel ? 'text-rose-600' : 'text-slate-900'
            }`}
          >
            {i.quantityOnHand.toLocaleString()}
          </span>
          <span className="text-[10px] text-slate-400 block">Min: {i.reorderLevel}</span>
        </div>
      )
    },
    {
      key: 'unitCost',
      header: 'Unit Cost',
      sortable: true,
      render: (i: InventoryItem) => (
        <div>
          <span className="font-semibold text-slate-900">₹{i.unitCost.toLocaleString()}</span>
          <span className="text-[10px] text-slate-400 block">
            Val: ₹{(i.quantityOnHand * i.unitCost).toLocaleString()}
          </span>
        </div>
      )
    },
    {
      key: 'status',
      header: 'Stock State',
      sortable: true,
      render: (i: InventoryItem) => <StatusBadge status={i.status} size="sm" />
    },
    {
      key: 'actions',
      header: 'Quick Action',
      render: (i: InventoryItem) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            updateInventoryStock(i.id, i.quantityOnHand + 50);
            showToast({
              type: 'success',
              title: 'Inventory Replenished',
              message: `Added +50 units to ${i.sku} at ${i.bayLocation}.`
            });
          }}
          className="px-2.5 py-1 text-xs font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded cursor-pointer"
        >
          +50 Restock
        </button>
      )
    }
  ];

  return (
    <div className="space-y-6">
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Enterprise Inventory & Stock Optimization</h1>
          <p className="text-xs text-slate-500 mt-1">
            Economic Order Quantity (EOQ), dynamic safety stock ROP buffers, seasonal forecasting, and bin slotting management.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setIsEoqModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg shadow-2xs transition-colors cursor-pointer"
          >
            <Scale className="w-3.5 h-3.5 text-blue-600" />
            <span>EOQ & Safety Stock Planner</span>
          </button>

          <button
            onClick={() => setIsForecastModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg shadow-2xs transition-colors cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Seasonal Demand Forecast</span>
          </button>
        </div>
      </div>

      {/* Operational KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-medium text-slate-500">Gross Inventory Valuation</span>
            <DollarSign className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-xl font-bold text-slate-900 mt-1.5">₹{(totalValue / 100000).toFixed(2)}L</div>
          <div className="text-[10px] text-slate-400 mt-0.5">{totalUnits.toLocaleString()} units across bays</div>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-medium text-slate-500">Stockout Risk Alerts</span>
            <AlertTriangle className="w-4 h-4 text-rose-500" />
          </div>
          <div className="text-xl font-bold text-rose-600 mt-1.5">{lowStockCount} SKUs Below ROP</div>
          <div className="text-[10px] text-slate-400 mt-0.5">Automated PO requisition triggered</div>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-medium text-slate-500">Days Sales of Inventory (DSI)</span>
            <Calendar className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-xl font-bold text-slate-900 mt-1.5">{healthMetrics.daysSalesOfInventoryDsi} Days</div>
          <div className="text-[10px] text-emerald-600 font-medium mt-0.5">{healthMetrics.inventoryTurnoverRatio}x annual turnover</div>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-medium text-slate-500">Working Capital Health</span>
            <ShieldCheck className="w-4 h-4 text-purple-500" />
          </div>
          <div className="text-xl font-bold text-purple-700 mt-1.5">Balanced</div>
          <div className="text-[10px] text-slate-400 mt-0.5">&lt; 4% inactive dead stock</div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3 overflow-x-auto">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoryFilter(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              categoryFilter === cat
                ? 'bg-slate-900 text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            {cat === 'ALL' ? 'All Categories' : cat}
          </button>
        ))}
      </div>

      {/* Inventory Data Table */}
      <DataTable
        data={filteredInventory}
        columns={columns}
        searchKey="name"
        searchPlaceholder="Search inventory by SKU, product description, bay..."
        onRowClick={(item) => setSelectedItem(item)}
        exportFilename="logicore-inventory-stock.csv"
      />

      {/* Item Detail Drawer */}
      {selectedItem && (
        <Drawer
          isOpen={!!selectedItem}
          onClose={() => setSelectedItem(null)}
          title={`${selectedItem.sku}: ${selectedItem.name}`}
          subtitle={`Warehouse: ${selectedItem.warehouseName} • Bay: ${selectedItem.bayLocation}`}
          footer={
            <div className="flex items-center justify-between w-full">
              <button
                onClick={() => {
                  updateInventoryStock(selectedItem.id, selectedItem.quantityOnHand + 50);
                  setSelectedItem({ ...selectedItem, quantityOnHand: selectedItem.quantityOnHand + 50 });
                  showToast({
                    type: 'success',
                    title: 'Stock Increment Logged',
                    message: `Replenished +50 units of ${selectedItem.sku}.`
                  });
                }}
                className="px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-2xs flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Replenish (+50 Units)</span>
              </button>
              <button
                onClick={() => setSelectedItem(null)}
                className="px-3.5 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer"
              >
                Close
              </button>
            </div>
          }
        >
          <div className="space-y-6 text-xs">
            {/* Status & Level */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-slate-500 font-semibold uppercase text-[10px]">Stock Status</span>
                <StatusBadge status={selectedItem.status} size="sm" />
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-slate-200/60">
                <span className="text-slate-500 font-semibold uppercase text-[10px]">Current Quantity on Hand</span>
                <span
                  className={`font-bold text-sm ${
                    selectedItem.quantityOnHand <= selectedItem.reorderLevel ? 'text-rose-600' : 'text-slate-900'
                  }`}
                >
                  {selectedItem.quantityOnHand} Units
                </span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-slate-200/60">
                <span className="text-slate-500 font-semibold uppercase text-[10px]">Threshold Reorder Level (ROP)</span>
                <span className="font-bold text-slate-700">{selectedItem.reorderLevel} Units</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-slate-200/60">
                <span className="text-slate-500 font-semibold uppercase text-[10px]">Unit Cost</span>
                <span className="font-bold text-slate-900">₹{selectedItem.unitCost.toLocaleString()}</span>
              </div>
            </div>

            {/* Warehouse Bay Details */}
            <div className="space-y-2">
              <h4 className="font-semibold text-slate-900 uppercase text-[11px] tracking-wider">
                Storage Bay Architecture
              </h4>
              <div className="bg-white border border-slate-200 rounded-xl p-3.5 space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-600">Designated Facility:</span>
                  <span className="font-semibold text-slate-800">{selectedItem.warehouseName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Racking Bay Code:</span>
                  <span className="font-mono font-bold text-slate-900">{selectedItem.bayLocation}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Product Category:</span>
                  <span className="font-semibold text-slate-800">{selectedItem.category}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-slate-100">
                  <span className="text-slate-600">Gross Shelf Asset Value:</span>
                  <span className="font-bold text-emerald-700">
                    ₹{(selectedItem.quantityOnHand * selectedItem.unitCost).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Drawer>
      )}

      {/* EOQ & Safety Stock Planner Modal */}
      <Modal
        isOpen={isEoqModalOpen}
        onClose={() => setIsEoqModalOpen(false)}
        title="Economic Order Quantity (EOQ) & Stochastic Safety Stock Planner"
      >
        <div className="space-y-4 text-xs">
          <p className="text-slate-600">
            Calculates the mathematically optimal order quantity that minimizes total inventory holding and ordering setup costs,
            coupled with joint demand-lead time variance buffers.
          </p>

          {/* Interactive Inputs */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 p-3 bg-slate-50 border border-slate-200 rounded-xl">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Annual Demand (Units)</label>
              <input
                type="number"
                value={annualDemand}
                onChange={(e) => setAnnualDemand(Math.max(10, Number(e.target.value)))}
                className="w-full px-2.5 py-1.5 border border-slate-200 rounded bg-white font-mono"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">PO Ordering Cost (₹)</label>
              <input
                type="number"
                value={orderSetupCost}
                onChange={(e) => setOrderSetupCost(Math.max(100, Number(e.target.value)))}
                className="w-full px-2.5 py-1.5 border border-slate-200 rounded bg-white font-mono"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Unit Cost (₹)</label>
              <input
                type="number"
                value={unitCostInput}
                onChange={(e) => setUnitCostInput(Math.max(10, Number(e.target.value)))}
                className="w-full px-2.5 py-1.5 border border-slate-200 rounded bg-white font-mono"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Service Level (Z)</label>
              <select
                value={serviceLevel}
                onChange={(e) => setServiceLevel(e.target.value as any)}
                className="w-full px-2.5 py-1.5 border border-slate-200 rounded bg-white"
              >
                <option value="90%">90% (Z = 1.28)</option>
                <option value="95%">95% (Z = 1.645)</option>
                <option value="98%">98% (Z = 2.05)</option>
                <option value="99%">99% (Z = 2.33)</option>
              </select>
            </div>
          </div>

          {/* Results Summary */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-center">
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl">
              <span className="text-[10px] text-blue-600 uppercase font-semibold">Optimal Order (EOQ)</span>
              <span className="text-lg font-bold text-blue-950 block mt-1">
                {eoqResult.optimalOrderQuantityUnits} Units
              </span>
              <span className="text-[10px] text-slate-500">Every {eoqResult.orderCycleDays} days</span>
            </div>
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl">
              <span className="text-[10px] text-emerald-600 uppercase font-semibold">Safety Stock Buffer</span>
              <span className="text-lg font-bold text-emerald-950 block mt-1">
                {ropResult.safetyStockUnits} Units
              </span>
              <span className="text-[10px] text-slate-500">{ropResult.bufferCoverageDays} days buffer</span>
            </div>
            <div className="p-3 bg-purple-50 border border-purple-200 rounded-xl">
              <span className="text-[10px] text-purple-600 uppercase font-semibold">Reorder Point (ROP)</span>
              <span className="text-lg font-bold text-purple-950 block mt-1">
                {ropResult.reorderPointUnits} Units
              </span>
              <span className="text-[10px] text-slate-500">Trigger purchase order</span>
            </div>
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl">
              <span className="text-[10px] text-amber-600 uppercase font-semibold">Total Inventory Cost</span>
              <span className="text-lg font-bold text-amber-950 block mt-1">
                ₹{eoqResult.totalAnnualInventoryCostInr.toLocaleString()}
              </span>
              <span className="text-[10px] text-slate-500">Holding + Setup</span>
            </div>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 space-y-1">
            <span className="font-bold text-slate-900 block">Inventory Policy Summary:</span>
            <span>
              At a {serviceLevel} service level, maintain a safety stock of {ropResult.safetyStockUnits} units to reduce stockout
              risk to {ropResult.stockoutRiskPercent}%. Place a replenishment batch order of {eoqResult.optimalOrderQuantityUnits}{' '}
              units whenever on-hand stock drops to {ropResult.reorderPointUnits} units.
            </span>
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={() => setIsEoqModalOpen(false)}
              className="px-4 py-2 bg-slate-900 text-white font-semibold rounded-lg hover:bg-slate-800 cursor-pointer"
            >
              Apply Reorder Parameters
            </button>
          </div>
        </div>
      </Modal>

      {/* Seasonal Demand Forecast Modal */}
      <Modal
        isOpen={isForecastModalOpen}
        onClose={() => setIsForecastModalOpen(false)}
        title="Holt-Winters Seasonal Demand Forecasting Model"
      >
        <div className="space-y-4 text-xs">
          <p className="text-slate-600">
            Exponential smoothing projections incorporating 8.5% annual baseline growth and regional festive surge factors (Q3/Q4 peak
            volume).
          </p>

          <div className="border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-100 bg-white">
            <div className="p-2.5 bg-slate-50 font-semibold text-slate-600 grid grid-cols-4 text-[11px]">
              <span>Month</span>
              <span className="text-center">Seasonal Multiplier</span>
              <span className="text-center">Projected Demand</span>
              <span className="text-right">95% Confidence Band</span>
            </div>
            {seasonalForecast.map((m) => (
              <div key={m.monthIndex} className="p-2.5 grid grid-cols-4 items-center">
                <span className="font-bold text-slate-800">{m.monthName}</span>
                <span className="text-center font-mono font-medium text-slate-600">{m.seasonalityFactor}x</span>
                <span className="text-center font-bold text-blue-700">{m.projectedDemandUnits} units</span>
                <span className="text-right text-slate-400 font-mono text-[10px]">
                  {m.lowerConfidenceBound} - {m.upperConfidenceBound}
                </span>
              </div>
            ))}
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={() => setIsForecastModalOpen(false)}
              className="px-4 py-2 bg-slate-900 text-white font-semibold rounded-lg hover:bg-slate-800 cursor-pointer"
            >
              Close Forecast
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
