import React, { useState, useMemo } from 'react';
import { useLogistics } from '../../context/LogisticsContext';
import { DataTable } from '../common/DataTable';
import { StatusBadge } from '../common/StatusBadge';
import { ReturnRequest } from '../../types';
import { Drawer } from '../common/Drawer';
import { Modal } from '../common/Modal';
import {
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Plus,
  Package,
  Layers,
  Sparkles,
  Barcode,
  Truck,
  DollarSign,
  TrendingDown,
  ShieldAlert,
  ClipboardCheck,
  Building
} from 'lucide-react';
import {
  ReturnsLifecycleEngine,
  ReturnMerchandiseAuthorization,
  ReturnLineItem,
  DispositionGrade
} from '../../modules/returns/ReturnsLifecycleEngine';

export const ReturnsView: React.FC = () => {
  const { returnRequests, returns, updateReturnStatus, createReturnRequest, showToast, activeRole } = useLogistics();
  const safeReturns = returnRequests || returns || [];

  const [selectedRMA, setSelectedRMA] = useState<ReturnRequest | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDispositionModalOpen, setIsDispositionModalOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  // Create RMA Form State
  const [newCustomerName, setNewCustomerName] = useState('Mahindra Logistics Spares Division');
  const [newShipmentId, setNewShipmentId] = useState('LGX-2026-10482');
  const [newItemsCount, setNewItemsCount] = useState(14);
  const [newReason, setNewReason] = useState('Damaged packaging during interstate linehaul transit');

  const filteredReturns = useMemo(() => {
    if (statusFilter === 'ALL') return safeReturns;
    return safeReturns.filter((r) => r.status.toLowerCase() === statusFilter.toLowerCase());
  }, [safeReturns, statusFilter]);

  // Operational metrics
  const totalRmacount = safeReturns.length;
  const pendingInspectionCount = safeReturns.filter((r) => r.status === 'Requested' || r.status === 'In Transit to Hub').length;
  const totalUnits = safeReturns.reduce((sum, r) => sum + (r.quantity || 0), 0);

  // Sample items for settlement calculator
  const sampleReturnItems: ReturnLineItem[] = useMemo(
    () => [
      {
        itemId: 'RMI-1',
        sku: 'SKU-ENG-842',
        productDescription: 'Commercial Turbocharger Assembly',
        quantityReturned: 8,
        originalUnitPrice: 32500,
        inspectionResult: {
          inspectorEmployeeId: 'INSP-781',
          inspectedAt: '2026-09-08',
          grade: 'GRADE_B_REFURBISH_REPACK',
          eligibleRefundPercent: 90,
          restockingFeeDeductionInr: 3200,
          salvageDispositionBay: 'BAY-REFURB-02',
          inspectorNotes: 'Minor packaging cosmetic damage. Core turbine test passed 100% calibration.'
        }
      },
      {
        itemId: 'RMI-2',
        sku: 'SKU-FLT-110',
        productDescription: 'High-Density Fuel Filtration Unit',
        quantityReturned: 6,
        originalUnitPrice: 4200,
        inspectionResult: {
          inspectorEmployeeId: 'INSP-781',
          inspectedAt: '2026-09-08',
          grade: 'GRADE_A_RESTOCK_INVENTORY',
          eligibleRefundPercent: 100,
          restockingFeeDeductionInr: 0,
          salvageDispositionBay: 'BAY-RESTOCK-01',
          inspectorNotes: 'Factory seal unbroken. Cleared for immediate restocking.'
        }
      }
    ],
    []
  );

  const settlementReport = useMemo(() => {
    return ReturnsLifecycleEngine.calculateDispositionSettlement(sampleReturnItems);
  }, [sampleReturnItems]);

  const handleCreateRMASubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createReturnRequest({
      shipmentId: newShipmentId,
      customerName: newCustomerName,
      itemsCount: newItemsCount,
      reason: newReason
    });

    setIsCreateModalOpen(false);
    showToast({
      type: 'success',
      title: 'RMA Authorized',
      message: `Return Authorization issued for ${newCustomerName}. Reverse dispatch scheduled.`
    });
  };

  const columns = [
    {
      key: 'id',
      header: 'RMA Reference',
      sortable: true,
      render: (r: ReturnRequest) => (
        <div>
          <span className="font-bold text-slate-900 block font-mono">{r.id}</span>
          <span className="text-[10px] text-slate-400 font-mono">Consignment: {r.originalShipmentId}</span>
        </div>
      )
    },
    {
      key: 'customerName',
      header: 'Customer Account',
      sortable: true,
      render: (r: ReturnRequest) => <span className="font-semibold text-slate-800">{r.customerName}</span>
    },
    {
      key: 'quantity',
      header: 'Claim Units',
      render: (r: ReturnRequest) => <span className="font-medium text-slate-700">{r.quantity} units</span>
    },
    {
      key: 'reason',
      header: 'Return Reason',
      render: (r: ReturnRequest) => <span className="text-slate-600 text-xs truncate max-w-xs block">{r.reason}</span>
    },
    {
      key: 'requestedDate',
      header: 'Filing Date',
      sortable: true,
      render: (r: ReturnRequest) => <span className="text-slate-500 text-[11px] font-mono">{r.requestedDate}</span>
    },
    {
      key: 'status',
      header: 'RMA Status',
      sortable: true,
      render: (r: ReturnRequest) => <StatusBadge status={r.status} size="sm" />
    },
    {
      key: 'actions',
      header: 'Quick Stage',
      render: (r: ReturnRequest) => (
        <div className="flex items-center gap-1.5">
          {r.status === 'Requested' && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                updateReturnStatus(r.id, 'Approved');
              }}
              className="px-2 py-1 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded cursor-pointer"
            >
              Approve RMA
            </button>
          )}
          {r.status === 'Approved' && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                updateReturnStatus(r.id, 'In Transit to Hub');
              }}
              className="px-2 py-1 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded cursor-pointer"
            >
              Dispatch Pickup
            </button>
          )}
          {r.status === 'In Transit to Hub' && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                updateReturnStatus(r.id, 'Inspected');
              }}
              className="px-2 py-1 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded cursor-pointer"
            >
              Dock Inspect
            </button>
          )}
          {r.status === 'Inspected' && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                updateReturnStatus(r.id, 'Refunded');
              }}
              className="px-2 py-1 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded cursor-pointer"
            >
              Issue Credit
            </button>
          )}
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Reverse Logistics & RMA Dispositioning</h1>
          <p className="text-xs text-slate-500 mt-1">
            Reverse pickup dispatch, dock receiving inspection grading (Grades A-D), refurbishing triage, and credit note settlement.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setIsDispositionModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg shadow-2xs transition-colors cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Inspection Grading Advisor</span>
          </button>

          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-[#FF4D2A] hover:bg-[#E23817] rounded-lg shadow-2xs transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Initiate Return (RMA)</span>
          </button>
        </div>
      </div>

      {/* Operational KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-medium text-slate-500">Active RMA Claims</span>
            <RotateCcw className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-xl font-bold text-slate-900 mt-1.5">{totalRmacount} Claims</div>
          <div className="text-[10px] text-slate-400 mt-0.5">{totalUnits} total units in reverse pipe</div>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-medium text-slate-500">Pending Dock Triage</span>
            <AlertTriangle className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-xl font-bold text-slate-900 mt-1.5">{pendingInspectionCount} In Transit / Recv</div>
          <div className="text-[10px] text-amber-600 font-medium mt-0.5">Awaiting physical QA grading</div>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-medium text-slate-500">Salvage Recovery Rate</span>
            <TrendingDown className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-xl font-bold text-slate-900 mt-1.5">88.4%</div>
          <div className="text-[10px] text-emerald-600 font-medium mt-0.5">Restocked as new or B-stock</div>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-medium text-slate-500">Avg Settlement Cycle</span>
            <ClipboardCheck className="w-4 h-4 text-purple-500" />
          </div>
          <div className="text-xl font-bold text-slate-900 mt-1.5">3.2 Days</div>
          <div className="text-[10px] text-slate-400 mt-0.5">Dock inspection to credit note</div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3 overflow-x-auto">
        {['ALL', 'Requested', 'Approved', 'In Transit to Hub', 'Inspected', 'Refunded'].map((st) => (
          <button
            key={st}
            onClick={() => setStatusFilter(st)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              statusFilter === st
                ? 'bg-slate-900 text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            {st === 'ALL' ? 'All RMA Claims' : st}
          </button>
        ))}
      </div>

      {/* Returns Data Table */}
      <DataTable
        data={filteredReturns}
        columns={columns}
        searchKey="customerName"
        searchPlaceholder="Search RMAs by customer account or ID..."
        onRowClick={(item) => setSelectedRMA(item)}
        exportFilename="logicore-rma-returns.csv"
      />

      {/* RMA Detail Drawer */}
      {selectedRMA && (
        <Drawer
          isOpen={!!selectedRMA}
          onClose={() => setSelectedRMA(null)}
          title={`Return Authorization ${selectedRMA.id}`}
          subtitle={`${selectedRMA.customerName} • Consignment: ${selectedRMA.originalShipmentId}`}
          footer={
            <div className="flex items-center justify-between w-full">
              <button
                onClick={() => {
                  showToast({
                    type: 'info',
                    title: 'Barcode Label Generated',
                    message: `Reverse shipping waybill generated for ${selectedRMA.id}.`
                  });
                }}
                className="px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-2xs flex items-center gap-1.5 cursor-pointer"
              >
                <Barcode className="w-3.5 h-3.5" />
                <span>Print Return Waybill Barcode</span>
              </button>
              <button
                onClick={() => setSelectedRMA(null)}
                className="px-3.5 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer"
              >
                Close
              </button>
            </div>
          }
        >
          <div className="space-y-6 text-xs">
            {/* Status & Overview */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-slate-500 font-semibold uppercase text-[10px]">RMA Claim Status</span>
                <StatusBadge status={selectedRMA.status} size="sm" />
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-slate-200/60">
                <span className="text-slate-500 font-semibold uppercase text-[10px]">Returned Units</span>
                <span className="font-bold text-slate-900">{selectedRMA.quantity} units</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-slate-200/60">
                <span className="text-slate-500 font-semibold uppercase text-[10px]">Filing Timestamp</span>
                <span className="font-mono text-slate-700">{selectedRMA.requestedDate}</span>
              </div>
            </div>

            {/* Claim Reason & Evidence */}
            <div className="space-y-2">
              <h4 className="font-semibold text-slate-900 uppercase text-[11px] tracking-wider">Claim Description</h4>
              <div className="p-3.5 bg-white border border-slate-200 rounded-xl text-slate-700 leading-relaxed">
                {selectedRMA.reason}
              </div>
            </div>

            {/* Reverse Transport Milestone Timeline */}
            <div className="space-y-2">
              <h4 className="font-semibold text-slate-900 uppercase text-[11px] tracking-wider">
                Reverse Supply Chain Stages
              </h4>
              <div className="border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-100 bg-white">
                <div className="p-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span className="font-bold text-slate-800">1. Customer Claim Registration</span>
                  </div>
                  <span className="text-slate-500 font-mono">Completed</span>
                </div>
                <div className="p-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span className="font-bold text-slate-800">2. Reverse Courier Pickup Authorized</span>
                  </div>
                  <span className="text-slate-500 font-mono">Completed</span>
                </div>
                <div className="p-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-blue-500" />
                    <span className="font-bold text-slate-800">3. Inbound Haul to Return Center</span>
                  </div>
                  <span className="text-blue-600 font-semibold">Active Transit</span>
                </div>
                <div className="p-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ClipboardCheck className="w-4 h-4 text-slate-400" />
                    <span className="font-medium text-slate-600">4. Dock Inspection & Grading (A-D)</span>
                  </div>
                  <span className="text-slate-400">Pending</span>
                </div>
              </div>
            </div>
          </div>
        </Drawer>
      )}

      {/* Create RMA Modal */}
      <Modal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} title="Issue Return Merchandise Authorization">
        <form onSubmit={handleCreateRMASubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Customer / Consignee</label>
              <input
                type="text"
                required
                value={newCustomerName}
                onChange={(e) => setNewCustomerName(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Original Consignment ID</label>
              <input
                type="text"
                required
                value={newShipmentId}
                onChange={(e) => setNewShipmentId(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg font-mono outline-none"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Returned Units Quantity</label>
              <input
                type="number"
                required
                min={1}
                value={newItemsCount}
                onChange={(e) => setNewItemsCount(Number(e.target.value))}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Claim Reason Category</label>
              <select className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-white outline-none">
                <option value="TRANSIT_DAMAGE">Transit Physical Damage</option>
                <option value="DEFECTIVE">Product Operational Defect</option>
                <option value="INCORRECT_SPEC">Incorrect SKU / Spec Discrepancy</option>
                <option value="COMMERCIAL_RETURN">Customer Commercial Return</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Detailed Inspection Incident Notes</label>
            <textarea
              required
              rows={3}
              value={newReason}
              onChange={(e) => setNewReason(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none"
            />
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
              Issue RMA & Generate Waybill
            </button>
          </div>
        </form>
      </Modal>

      {/* Disposition Grading Advisor Modal */}
      <Modal
        isOpen={isDispositionModalOpen}
        onClose={() => setIsDispositionModalOpen(false)}
        title="Dock Inspection Triage & Disposition Grading (A-D)"
      >
        <div className="space-y-4 text-xs">
          <p className="text-slate-600">
            Automated economic disposition algorithm analyzes physical grade, remaining warranty period, and refurbishment costs to
            recommend the optimal recovery channel (Restock, B-Stock Resale, Component Salvage, or Hazardous Scrap).
          </p>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
            <div className="flex justify-between items-center">
              <div>
                <span className="font-bold text-slate-900 text-sm">Inspected Batch Manifest ({sampleReturnItems.length} SKUs)</span>
                <span className="text-[10px] text-slate-400 block font-mono">
                  Gross Value: ₹{settlementReport.totalOriginalValue.toLocaleString()}
                </span>
              </div>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900">
                Mixed Grade Triage
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center pt-1">
              <div className="p-2.5 bg-white border border-slate-200 rounded-lg">
                <span className="text-[10px] text-slate-400 uppercase">Grade A Restock</span>
                <span className="font-bold text-emerald-600 block mt-1">
                  {settlementReport.dispositionCounts.GRADE_A_RESTOCK_INVENTORY} Units
                </span>
              </div>
              <div className="p-2.5 bg-white border border-slate-200 rounded-lg">
                <span className="text-[10px] text-slate-400 uppercase">Grade B Refurb</span>
                <span className="font-bold text-blue-600 block mt-1">
                  {settlementReport.dispositionCounts.GRADE_B_REFURBISH_REPACK} Units
                </span>
              </div>
              <div className="p-2.5 bg-white border border-slate-200 rounded-lg">
                <span className="text-[10px] text-slate-400 uppercase">Net Credit Refund</span>
                <span className="font-bold text-emerald-700 block mt-1">
                  ₹{settlementReport.netRefundCredit.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="p-2 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-900 text-[11px]">
              <strong>Restocking Deduction:</strong> ₹{settlementReport.totalRestockingFees.toLocaleString()} deducted for repacking & testing. Net credit note ready for issuance.
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={() => {
                showToast({
                  type: 'success',
                  title: 'Disposition Committed',
                  message: 'Items routed to Hub Restock and Refurbishment Workstations.'
                });
                setIsDispositionModalOpen(false);
              }}
              className="px-4 py-2 bg-slate-900 text-white font-semibold rounded-lg hover:bg-slate-800 cursor-pointer"
            >
              Route to Refurbishment Bay
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
