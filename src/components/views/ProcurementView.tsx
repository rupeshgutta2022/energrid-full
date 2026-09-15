import React, { useState, useMemo } from 'react';
import { useLogistics } from '../../context/LogisticsContext';
import { DataTable } from '../common/DataTable';
import { StatusBadge } from '../common/StatusBadge';
import { ProcurementOrder } from '../../types';
import { Drawer } from '../common/Drawer';
import { Modal } from '../common/Modal';
import {
  Package,
  DollarSign,
  Calendar,
  Plus,
  Building2,
  CheckCircle2,
  AlertTriangle,
  Scale,
  Award,
  ShieldCheck,
  FileSpreadsheet,
  TrendingUp,
  Warehouse,
  FileCheck2
} from 'lucide-react';
import {
  ProcurementLifecycleEngine,
  EnterprisePurchaseOrder,
  GoodsReceiptNote,
  ThreeWayMatchResult,
  VendorPerformanceScorecard
} from '../../modules/procurement/ProcurementLifecycleEngine';

export const ProcurementView: React.FC = () => {
  const { procurementOrders, procurement, addProcurementOrder, updateProcurementOrderStatus, showToast, activeRole } =
    useLogistics();
  const safeOrders = procurementOrders || procurement || [];

  const [selectedPO, setSelectedPO] = useState<ProcurementOrder | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isThreeWayModalOpen, setIsThreeWayModalOpen] = useState(false);
  const [isScorecardModalOpen, setIsScorecardModalOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  // New PO State
  const [supplierName, setSupplierName] = useState('Tata Steel Long Products Ltd');
  const [supplierId, setSupplierId] = useState('SUP-8401');
  const [destWarehouse, setDestWarehouse] = useState('Mumbai West Gateway Hub (WH-01)');
  const [expectedDate, setExpectedDate] = useState('2026-09-22');
  const [itemCount, setItemCount] = useState(48);
  const [totalAmount, setTotalAmount] = useState(840000);

  // Filtered orders
  const filteredOrders = useMemo(() => {
    if (statusFilter === 'ALL') return safeOrders;
    return safeOrders.filter((po) => po.status.toLowerCase() === statusFilter.toLowerCase());
  }, [safeOrders, statusFilter]);

  // Operational metrics
  const totalSpend = safeOrders.reduce((sum, po) => sum + (po.totalAmount || 0), 0);
  const pendingReceiptCount = safeOrders.filter((po) => po.status === 'Issued' || po.status === 'In Transit').length;

  // 3-Way Match Simulation for Selected / Sample PO
  const sampleMatchResult: ThreeWayMatchResult = useMemo(() => {
    const mockPO: EnterprisePurchaseOrder = {
      id: 'PO-3029',
      poNumber: 'PO-2026-3029',
      vendorId: 'SUP-8401',
      vendorName: 'Bharat Petroleum Commercial Fuel & Lubes',
      vendorGstNumber: '27AAACB2401P1Z9',
      destinationWarehouseId: 'WH-01',
      warehouseName: 'Mumbai West Gateway Hub',
      orderDate: '2026-09-02',
      expectedDeliveryDate: '2026-09-10',
      status: 'APPROVED_ISSUED',
      items: [
        {
          id: 'POL-1',
          itemCode: 'MAT-FLT-SYN',
          description: 'Synthetic Heavy Duty Engine Lubricant (15W-40)',
          category: 'FLEET_PARTS',
          quantityOrdered: 50,
          quantityReceived: 48,
          quantityInvoiced: 50,
          unitOfMeasure: 'PALLETS',
          contractUnitPrice: 14500,
          invoicedUnitPrice: 14500,
          totalOrderCost: 725000,
          hsnSacCode: '27101980',
          taxRatePercent: 18
        }
      ],
      subtotal: 725000,
      totalTax: 130500,
      grandTotal: 855500,
      paymentTermsDays: 30,
      approvalChain: ProcurementLifecycleEngine.determineRequiredApprovalLevels(855500)
    };

    const mockGRN: GoodsReceiptNote = {
      grnNumber: 'GRN-2026-1042',
      poNumber: 'PO-2026-3029',
      vendorName: 'Bharat Petroleum Commercial Fuel & Lubes',
      receivedDate: '2026-09-08',
      receivingInspector: 'Sunil Rao (QA Dock Officer)',
      dockNumber: 'Inbound Dock 03',
      items: [
        {
          itemCode: 'MAT-FLT-SYN',
          orderedQuantity: 50,
          receivedQuantity: 50,
          acceptedQuantity: 48,
          rejectedQuantity: 2,
          rejectionReason: 'Damaged outer protective packaging on pallet #49 & #50',
          batchNumber: 'BPCL-LOT-2026-08'
        }
      ],
      carrierName: 'LogiCore Dedicated Tankers',
      vehicleNumber: 'MH-04-AX-8912',
      driverSignatureVerified: true
    };

    const mockInvoice = {
      invoiceNumber: 'INV-BPCL-99120',
      items: [
        {
          itemCode: 'MAT-FLT-SYN',
          billedQuantity: 50,
          billedUnitPrice: 14500,
          taxBilled: 130500
        }
      ]
    };

    return ProcurementLifecycleEngine.performThreeWayMatch(mockPO, mockGRN, mockInvoice);
  }, []);

  // Vendor Scorecard calculation
  const sampleScorecard: VendorPerformanceScorecard = useMemo(() => {
    return ProcurementLifecycleEngine.calculateVendorScorecard('SUP-8401', 'Tata Steel Long Products Ltd', {
      totalOrders: 28,
      onTimeDeliveries: 26,
      totalUnitsInspected: 1400,
      totalUnitsAccepted: 1365,
      invoicesSubmitted: 28,
      invoicesAccurate: 27,
      averageLeadTimeDays: 4.8
    });
  }, []);

  const handleCreatePOSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = addProcurementOrder({
      supplierId,
      supplierName,
      expectedDate,
      destinationWarehouse: destWarehouse,
      status: 'Issued',
      totalAmount,
      itemCount
    });

    setIsCreateModalOpen(false);
    showToast({
      type: 'success',
      title: 'Purchase Order Issued',
      message: `PO ${newId} created for ₹${totalAmount.toLocaleString()} routed to department manager.`
    });
  };

  const columns = [
    {
      key: 'id',
      header: 'PO Reference',
      sortable: true,
      render: (p: ProcurementOrder) => (
        <div>
          <span className="font-bold text-slate-900 block font-mono">{p.id}</span>
          <span className="text-[10px] text-slate-400">{p.orderDate}</span>
        </div>
      )
    },
    {
      key: 'supplierName',
      header: 'Vendor & Warehouse',
      sortable: true,
      render: (p: ProcurementOrder) => (
        <div>
          <span className="font-semibold text-slate-800 block">{p.supplierName}</span>
          <span className="text-[11px] text-slate-500 flex items-center gap-1">
            <Warehouse className="w-3 h-3 text-slate-400" />
            {p.destinationWarehouse}
          </span>
        </div>
      )
    },
    {
      key: 'itemCount',
      header: 'Materials Count',
      render: (p: ProcurementOrder) => <span className="text-slate-700 font-medium">{p.itemCount} line items</span>
    },
    {
      key: 'totalAmount',
      header: 'Total Value',
      sortable: true,
      render: (p: ProcurementOrder) => <span className="font-bold text-slate-900">₹{p.totalAmount.toLocaleString()}</span>
    },
    {
      key: 'expectedDate',
      header: 'Expected Delivery',
      sortable: true,
      render: (p: ProcurementOrder) => <span className="text-slate-700 font-mono text-[11px]">{p.expectedDate}</span>
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (p: ProcurementOrder) => <StatusBadge status={p.status} size="sm" />
    }
  ];

  return (
    <div className="space-y-6">
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Procurement Lifecycle & Vendor Inbound</h1>
          <p className="text-xs text-slate-500 mt-1">
            Automated purchase requisitions, 3-way matching reconciliation (PO vs GRN vs Invoice), and vendor compliance scorecard.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setIsThreeWayModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg shadow-2xs transition-colors cursor-pointer"
          >
            <Scale className="w-3.5 h-3.5 text-blue-600" />
            <span>3-Way Match Verification</span>
          </button>

          <button
            onClick={() => setIsScorecardModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg shadow-2xs transition-colors cursor-pointer"
          >
            <Award className="w-3.5 h-3.5 text-amber-500" />
            <span>Vendor Scorecard</span>
          </button>

          {activeRole !== 'Customer' && (
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-[#FF4D2A] hover:bg-[#E23817] rounded-lg shadow-2xs transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Issue Purchase Order</span>
            </button>
          )}
        </div>
      </div>

      {/* KPI Ribbon */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-medium text-slate-500">Committed Spend</span>
            <DollarSign className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-xl font-bold text-slate-900 mt-1.5">₹{(totalSpend / 100000).toFixed(2)}L</div>
          <div className="text-[10px] text-slate-400 mt-0.5">{safeOrders.length} Purchase Orders active</div>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-medium text-slate-500">Inbound In-Transit</span>
            <Package className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-xl font-bold text-slate-900 mt-1.5">{pendingReceiptCount} Orders</div>
          <div className="text-[10px] text-blue-600 font-medium mt-0.5">Scheduled dock receiving</div>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-medium text-slate-500">3-Way Match Rate</span>
            <ShieldCheck className="w-4 h-4 text-purple-500" />
          </div>
          <div className="text-xl font-bold text-slate-900 mt-1.5">97.4%</div>
          <div className="text-[10px] text-emerald-600 font-medium mt-0.5">Zero unapproved variances</div>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-medium text-slate-500">Preferred Vendors</span>
            <Award className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-xl font-bold text-slate-900 mt-1.5">Tier 1</div>
          <div className="text-[10px] text-slate-400 mt-0.5">Composite QA Score: 92.4%</div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3 overflow-x-auto">
        {['ALL', 'Issued', 'Confirmed', 'In Transit', 'Received', 'Cancelled'].map((st) => (
          <button
            key={st}
            onClick={() => setStatusFilter(st)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              statusFilter === st
                ? 'bg-slate-900 text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            {st === 'ALL' ? 'All Orders' : st}
          </button>
        ))}
      </div>

      {/* Orders Data Table */}
      <DataTable
        data={filteredOrders}
        columns={columns}
        searchKey="supplierName"
        searchPlaceholder="Search POs by supplier, ID, warehouse..."
        onRowClick={(item) => setSelectedPO(item)}
        exportFilename="logicore-procurement-export.csv"
      />

      {/* PO Detail Drawer */}
      {selectedPO && (
        <Drawer
          isOpen={!!selectedPO}
          onClose={() => setSelectedPO(null)}
          title={`Purchase Order ${selectedPO.id}`}
          subtitle={`${selectedPO.supplierName} • Expected: ${selectedPO.expectedDate}`}
          footer={
            <div className="flex items-center justify-between w-full">
              {selectedPO.status !== 'Received' && (
                <button
                  onClick={() => {
                    updateProcurementOrderStatus(selectedPO.id, 'Received');
                    setSelectedPO({ ...selectedPO, status: 'Received' });
                    showToast({
                      type: 'success',
                      title: 'Goods Received (GRN Verified)',
                      message: `Receipt confirmed for ${selectedPO.id}. Inventory incremented.`
                    });
                  }}
                  className="px-3 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-2xs flex items-center gap-1.5 cursor-pointer"
                >
                  <FileCheck2 className="w-3.5 h-3.5" />
                  <span>Confirm Dock Receipt (GRN)</span>
                </button>
              )}
              <button
                onClick={() => setSelectedPO(null)}
                className="px-3.5 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer"
              >
                Close
              </button>
            </div>
          }
        >
          <div className="space-y-6 text-xs">
            {/* Status & PO Summary */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-semibold uppercase text-[10px]">PO Status</span>
                <StatusBadge status={selectedPO.status} size="sm" />
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-slate-200/60">
                <span className="text-slate-500 font-semibold uppercase text-[10px]">Vendor Name</span>
                <span className="font-semibold text-slate-800">{selectedPO.supplierName}</span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-slate-200/60">
                <span className="text-slate-500 font-semibold uppercase text-[10px]">Total Order Amount</span>
                <span className="font-bold text-slate-900 text-sm">₹{selectedPO.totalAmount.toLocaleString()}</span>
              </div>
            </div>

            {/* Approval Hierarchy */}
            <div className="space-y-2">
              <h4 className="font-semibold text-slate-900 uppercase text-[11px] tracking-wider">
                Multi-Tier Approval Hierarchy
              </h4>
              <div className="bg-white border border-slate-200 rounded-xl p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <div>
                      <span className="font-bold text-slate-800">Procurement Department Manager</span>
                      <span className="text-[10px] text-slate-400 block">Rohan Deshmukh • Threshold: &lt; ₹50,000</span>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">Approved</span>
                </div>

                {selectedPO.totalAmount > 50000 && (
                  <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      <div>
                        <span className="font-bold text-slate-800">Finance Controller</span>
                        <span className="text-[10px] text-slate-400 block">Sunita Mehra • Threshold: &lt; ₹5,00,000</span>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">Approved</span>
                  </div>
                )}

                {selectedPO.totalAmount > 500000 && (
                  <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      <div>
                        <span className="font-bold text-slate-800">VP Supply Chain</span>
                        <span className="text-[10px] text-slate-400 block">Vikram Singhania • Threshold: &gt; ₹5,00,000</span>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">Approved</span>
                  </div>
                )}
              </div>
            </div>

            {/* Warehouse Receiving Info */}
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Destination Hub:</span>
                <span className="font-semibold text-slate-800">{selectedPO.destinationWarehouse}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Ordered Materials Count:</span>
                <span className="font-bold text-slate-900">{selectedPO.itemCount} SKUs</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Expected Dock Date:</span>
                <span className="font-semibold text-blue-600 font-mono">{selectedPO.expectedDate}</span>
              </div>
            </div>
          </div>
        </Drawer>
      )}

      {/* Issue PO Modal */}
      <Modal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} title="Issue Commercial Purchase Order">
        <form onSubmit={handleCreatePOSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Vendor / Supplier Name</label>
              <input
                type="text"
                required
                value={supplierName}
                onChange={(e) => setSupplierName(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Vendor Code</label>
              <input
                type="text"
                required
                value={supplierId}
                onChange={(e) => setSupplierId(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg font-mono focus:ring-1 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Destination Warehouse</label>
              <select
                value={destWarehouse}
                onChange={(e) => setDestWarehouse(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-white outline-none"
              >
                <option value="Mumbai West Gateway Hub (WH-01)">Mumbai West Gateway Hub (WH-01)</option>
                <option value="Delhi NCR Fulfillment Center (WH-02)">Delhi NCR Fulfillment Center (WH-02)</option>
                <option value="Bengaluru Tech Logistics Depot (WH-03)">Bengaluru Tech Logistics Depot (WH-03)</option>
                <option value="Chennai Port Transshipment Yard (WH-04)">Chennai Port Transshipment Yard (WH-04)</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Expected Delivery Date</label>
              <input
                type="date"
                required
                value={expectedDate}
                onChange={(e) => setExpectedDate(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Total Ordered Items</label>
              <input
                type="number"
                required
                value={itemCount}
                onChange={(e) => setItemCount(Number(e.target.value))}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Total PO Amount (₹)</label>
              <input
                type="number"
                required
                value={totalAmount}
                onChange={(e) => setTotalAmount(Number(e.target.value))}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none"
              />
            </div>
          </div>

          <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-xl text-blue-900 space-y-1">
            <span className="font-bold block">Automated Governance Routing:</span>
            <span>
              Orders exceeding ₹5,00,000 automatically require tripartite approval from Department Manager, Finance Director, and
              VP Supply Chain.
            </span>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsCreateModalOpen(false)}
              className="px-4 py-2 border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#FF4D2A] text-white font-semibold rounded-lg hover:bg-[#E23817] cursor-pointer"
            >
              Issue Purchase Order
            </button>
          </div>
        </form>
      </Modal>

      {/* 3-Way Match Verification Modal */}
      <Modal
        isOpen={isThreeWayModalOpen}
        onClose={() => setIsThreeWayModalOpen(false)}
        title="Programmatic 3-Way Reconciliation (PO vs GRN vs Invoice)"
      >
        <div className="space-y-4 text-xs">
          <p className="text-slate-600">
            Real-time automated reconciliation compares the original Purchase Order line items, warehouse receiving Goods Receipt
            Note (GRN), and the vendor-submitted commercial tax invoice to ensure 100% billing accuracy.
          </p>

          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
              <span className="text-[10px] text-slate-400 block uppercase font-semibold">1. Purchase Order</span>
              <span className="font-bold text-slate-800 text-sm mt-1 block">PO-2026-3029</span>
              <span className="text-[10px] text-slate-500">Ordered: 50 Pallets</span>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
              <span className="text-[10px] text-slate-400 block uppercase font-semibold">2. Dock Receipt (GRN)</span>
              <span className="font-bold text-slate-800 text-sm mt-1 block">GRN-2026-1042</span>
              <span className="text-[10px] text-amber-600 font-semibold">Accepted: 48 (2 Damaged)</span>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
              <span className="text-[10px] text-slate-400 block uppercase font-semibold">3. Vendor Invoice</span>
              <span className="font-bold text-slate-800 text-sm mt-1 block">INV-BPCL-99120</span>
              <span className="text-[10px] text-slate-500">Billed: 50 Pallets</span>
            </div>
          </div>

          <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl space-y-2">
            <div className="flex items-center gap-2 text-amber-900 font-bold">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>Discrepancy Audit Findings:</span>
            </div>
            <div className="space-y-1 text-slate-700 pl-6">
              {sampleMatchResult.discrepancies.map((d, idx) => (
                <div key={idx}>
                  <span className="font-bold text-slate-900">• [{d.type}]:</span> {d.description}
                </div>
              ))}
            </div>
            <div className="pt-2 text-amber-800 text-[11px]">
              Recommendation: Automatic debit note of ₹29,000 issued to vendor for 2 damaged units prior to invoice settlement.
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              onClick={() => {
                showToast({
                  type: 'success',
                  title: 'Debit Note Generated',
                  message: 'Debit note DN-2026-0812 dispatched to vendor accounting.'
                });
                setIsThreeWayModalOpen(false);
              }}
              className="px-4 py-2 bg-slate-900 text-white font-semibold rounded-lg hover:bg-slate-800 cursor-pointer"
            >
              Issue Vendor Debit Note & Settle
            </button>
          </div>
        </div>
      </Modal>

      {/* Vendor Scorecard Modal */}
      <Modal
        isOpen={isScorecardModalOpen}
        onClose={() => setIsScorecardModalOpen(false)}
        title="Supplier Evaluation & Scorecard Matrix"
      >
        <div className="space-y-4 text-xs">
          <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-xl">
            <div>
              <div className="font-bold text-slate-900 text-sm">{sampleScorecard.vendorName}</div>
              <div className="text-[10px] text-slate-500 font-mono">Supplier Code: {sampleScorecard.vendorId}</div>
            </div>
            <div className="text-right">
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900">
                {sampleScorecard.assignedTier.replace(/_/g, ' ')}
              </span>
              <span className="block text-xs font-bold text-slate-800 mt-1">Score: {sampleScorecard.compositeScore} / 100</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 bg-white border border-slate-200 rounded-xl text-center">
              <span className="text-[10px] text-slate-400 block uppercase">On-Time Delivery</span>
              <span className="text-lg font-bold text-emerald-600 mt-1 block">{sampleScorecard.onTimeDeliveryPercent}%</span>
              <span className="text-[10px] text-slate-500">26 / 28 Shipments</span>
            </div>
            <div className="p-3 bg-white border border-slate-200 rounded-xl text-center">
              <span className="text-[10px] text-slate-400 block uppercase">Quality Acceptance</span>
              <span className="text-lg font-bold text-blue-600 mt-1 block">{sampleScorecard.qualityAcceptanceRatePercent}%</span>
              <span className="text-[10px] text-slate-500">1,365 / 1,400 Units</span>
            </div>
            <div className="p-3 bg-white border border-slate-200 rounded-xl text-center">
              <span className="text-[10px] text-slate-400 block uppercase">Invoice Accuracy</span>
              <span className="text-lg font-bold text-purple-600 mt-1 block">{sampleScorecard.invoiceAccuracyRatePercent}%</span>
              <span className="text-[10px] text-slate-500">27 / 28 Invoices</span>
            </div>
          </div>

          <div className="border border-slate-200 rounded-xl p-3 bg-slate-50/50 space-y-2">
            <span className="font-bold text-slate-800 block">Performance Recommendations:</span>
            <ul className="list-disc list-inside space-y-1 text-slate-600 pl-1">
              {sampleScorecard.recommendations.map((rec, idx) => (
                <li key={idx}>{rec}</li>
              ))}
            </ul>
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={() => setIsScorecardModalOpen(false)}
              className="px-4 py-2 bg-slate-900 text-white font-semibold rounded-lg hover:bg-slate-800 cursor-pointer"
            >
              Close Scorecard
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
