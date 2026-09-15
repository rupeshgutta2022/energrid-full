import React, { useState, useMemo } from 'react';
import { useLogistics } from '../../context/LogisticsContext';
import { DataTable } from '../common/DataTable';
import { StatusBadge } from '../common/StatusBadge';
import { Invoice } from '../../types';
import { Drawer } from '../common/Drawer';
import { Modal } from '../common/Modal';
import {
  Receipt,
  Download,
  CheckCircle2,
  Plus,
  DollarSign,
  AlertTriangle,
  Scale,
  ShieldCheck,
  FileText,
  Building,
  CreditCard,
  FileCheck2,
  Layers,
  ArrowRight,
  TrendingUp
} from 'lucide-react';
import {
  FinancialReconciliationEngine,
  FreightInvoiceAuditInput,
  AuditPaymentReport
} from '../../modules/billing/FinancialReconciliationEngine';

export const InvoicesView: React.FC = () => {
  const { invoices, updateInvoiceStatus, showToast, activeRole, currentUser } = useLogistics();
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  const roleScopedInvoices = useMemo(() => {
    const allInvoices = Array.isArray(invoices) ? invoices : [];
    let filtered = allInvoices;
    if (activeRole === 'Customer') {
      filtered = allInvoices.filter(
        (inv) =>
          (inv.customerName && inv.customerName.toLowerCase().includes('northstar')) ||
          (currentUser?.organization && inv.customerName && inv.customerName.toLowerCase().includes(currentUser.organization.toLowerCase()))
      );
    }
    if (statusFilter !== 'ALL') {
      filtered = filtered.filter((inv) => inv.status.toLowerCase() === statusFilter.toLowerCase());
    }
    return filtered;
  }, [invoices, activeRole, currentUser, statusFilter]);

  // Billing Metrics
  const totalBilled = roleScopedInvoices.reduce((sum, inv) => sum + (inv.totalAmount || 0), 0);
  const paidInvoices = roleScopedInvoices.filter((inv) => inv.status === 'Paid');
  const totalPaid = paidInvoices.reduce((sum, inv) => sum + (inv.totalAmount || 0), 0);
  const outstandingAR = totalBilled - totalPaid;

  // Sample Freight Bill Audit Simulation
  const sampleAuditReport: AuditPaymentReport = useMemo(() => {
    const auditInput: FreightInvoiceAuditInput = {
      invoiceNumber: selectedInvoice?.id || 'INV-2026-904',
      carrierOrVendorName: 'LogiCore National Freightlines',
      shipmentId: selectedInvoice?.shipmentId || 'LGX-2026-10482',
      originPostalCode: '400001',
      destinationPostalCode: '110001',
      distanceKm: 1420,
      actualWeightKg: 4200,
      chargeableWeightKg: 4500,
      billedLinehaulAmount: 112500,
      contractedLinehaulRatePerKg: 24.5, // Contract: 4500 * 24.5 = 110,250 (Overcharge of ₹2,250)
      billedFuelSurcharge: 16875,
      standardFuelSurchargePercent: 12.0, // Expected: 13,230 (Overcharge of ₹3,645)
      billedAccessorials: [
        {
          code: 'ACC-DET-01',
          description: 'Dock Detention Surcharge (3 Hours)',
          billedAmount: 4500,
          authorizedAmount: 3000,
          notes: 'Driver log confirms 2 hours authorized detention; 1 hour unverified.'
        },
        {
          code: 'ACC-LIFT-02',
          description: 'Hydraulic Liftgate Service at Destination',
          billedAmount: 2500,
          authorizedAmount: 2500
        }
      ],
      billedGstAmount: 24550,
      isInterstate: true
    };

    return FinancialReconciliationEngine.auditFreightInvoice(auditInput);
  }, [selectedInvoice]);

  const columns = [
    {
      key: 'id',
      header: 'Invoice #',
      sortable: true,
      render: (inv: Invoice) => (
        <div>
          <span className="font-bold text-slate-900 block font-mono">{inv.id}</span>
          <span className="text-[10px] text-slate-400 font-mono">Consignment: {inv.shipmentId}</span>
        </div>
      )
    },
    {
      key: 'customerName',
      header: 'Billed Entity',
      sortable: true,
      render: (inv: Invoice) => <span className="font-semibold text-slate-800">{inv.customerName}</span>
    },
    {
      key: 'issueDate',
      header: 'Issue Date',
      sortable: true,
      render: (inv: Invoice) => <span className="text-slate-600 text-[11px] font-mono">{inv.issueDate}</span>
    },
    {
      key: 'dueDate',
      header: 'Due Date',
      sortable: true,
      render: (inv: Invoice) => <span className="text-slate-700 font-medium text-[11px] font-mono">{inv.dueDate}</span>
    },
    {
      key: 'totalAmount',
      header: 'Total Amount (GST Incl)',
      sortable: true,
      render: (inv: Invoice) => (
        <div>
          <span className="font-bold text-slate-900 text-sm">₹{inv.totalAmount.toLocaleString()}</span>
          <span className="text-[10px] text-slate-400 block">GST 18% inclusive</span>
        </div>
      )
    },
    {
      key: 'status',
      header: 'Payment Status',
      sortable: true,
      render: (inv: Invoice) => <StatusBadge status={inv.status} size="sm" />
    },
    {
      key: 'action',
      header: 'Actions',
      render: (inv: Invoice) => (
        <div className="flex items-center gap-2">
          {inv.status !== 'Paid' ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                updateInvoiceStatus(inv.id, 'Paid');
              }}
              className="px-2 py-1 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded transition-colors cursor-pointer"
            >
              Mark Paid
            </button>
          ) : (
            <span className="text-[11px] text-emerald-600 font-medium flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Reconciled
            </span>
          )}
          <button
            onClick={(e) => {
              e.stopPropagation();
              showToast({
                type: 'info',
                title: 'Downloading GST Tax Invoice',
                message: `Commercial e-invoice PDF generated for ${inv.id}`
              });
            }}
            className="p-1 text-slate-400 hover:text-slate-700 rounded hover:bg-slate-100 cursor-pointer"
            title="Download PDF"
          >
            <Download className="w-3.5 h-3.5" />
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Freight Invoices & Financial Settlement</h1>
          <p className="text-xs text-slate-500 mt-1">
            Commercial billing, automated Freight Bill Audit (FBAP), fuel surcharge index adjustments, and General Ledger (GL) posting.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setIsAuditModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg shadow-2xs transition-colors cursor-pointer"
          >
            <Scale className="w-3.5 h-3.5 text-blue-600" />
            <span>FBAP Freight Audit Engine</span>
          </button>

          {activeRole !== 'Customer' && (
            <button
              onClick={() =>
                showToast({
                  type: 'info',
                  title: 'GST E-Way Bill Auto-Generation',
                  message: 'National NIC e-Way Bill portal synchronized.'
                })
              }
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-[#FF4D2A] hover:bg-[#E23817] rounded-lg shadow-2xs transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Issue Freight Invoice</span>
            </button>
          )}
        </div>
      </div>

      {/* Financial KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-medium text-slate-500">Gross Billed Revenue</span>
            <DollarSign className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-xl font-bold text-slate-900 mt-1.5">₹{(totalBilled / 100000).toFixed(2)}L</div>
          <div className="text-[10px] text-slate-400 mt-0.5">{roleScopedInvoices.length} Invoices Issued</div>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-medium text-slate-500">Settled & Collected</span>
            <CheckCircle2 className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-xl font-bold text-slate-900 mt-1.5">₹{(totalPaid / 100000).toFixed(2)}L</div>
          <div className="text-[10px] text-emerald-600 font-medium mt-0.5">
            {Math.round((totalPaid / (totalBilled || 1)) * 100)}% Collection Efficiency
          </div>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-medium text-slate-500">Outstanding A/R</span>
            <AlertTriangle className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-xl font-bold text-slate-900 mt-1.5">₹{(outstandingAR / 100000).toFixed(2)}L</div>
          <div className="text-[10px] text-slate-400 mt-0.5">Pending corporate transfer</div>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-medium text-slate-500">Audit Overcharge Recovery</span>
            <ShieldCheck className="w-4 h-4 text-purple-500" />
          </div>
          <div className="text-xl font-bold text-slate-900 mt-1.5">₹{sampleAuditReport.netVarianceAmount.toLocaleString()}</div>
          <div className="text-[10px] text-purple-600 font-medium mt-0.5">FBAP automated recovery</div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3 overflow-x-auto">
        {['ALL', 'Paid', 'Pending', 'Overdue'].map((st) => (
          <button
            key={st}
            onClick={() => setStatusFilter(st)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              statusFilter === st
                ? 'bg-slate-900 text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            {st === 'ALL' ? 'All Invoices' : st}
          </button>
        ))}
      </div>

      {/* Invoices Table */}
      <DataTable
        data={roleScopedInvoices}
        columns={columns}
        searchKey="customerName"
        searchPlaceholder="Search invoices by customer name, ID..."
        onRowClick={(item) => setSelectedInvoice(item)}
        exportFilename="logicore-commercial-invoices.csv"
      />

      {/* Invoice Detail Drawer */}
      {selectedInvoice && (
        <Drawer
          isOpen={!!selectedInvoice}
          onClose={() => setSelectedInvoice(null)}
          title={`Invoice ${selectedInvoice.id}`}
          subtitle={`${selectedInvoice.customerName} • Consignment: ${selectedInvoice.shipmentId}`}
          footer={
            <div className="flex items-center justify-between w-full">
              {selectedInvoice.status !== 'Paid' ? (
                <button
                  onClick={() => {
                    updateInvoiceStatus(selectedInvoice.id, 'Paid');
                    setSelectedInvoice({ ...selectedInvoice, status: 'Paid' });
                  }}
                  className="px-3 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-2xs flex items-center gap-1.5 cursor-pointer"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Settle & Mark Paid</span>
                </button>
              ) : (
                <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> Invoice Fully Reconciled
                </span>
              )}
              <button
                onClick={() => setSelectedInvoice(null)}
                className="px-3.5 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer"
              >
                Close
              </button>
            </div>
          }
        >
          <div className="space-y-6 text-xs">
            {/* Payment Summary */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-slate-500 font-semibold uppercase text-[10px]">Payment Status</span>
                <StatusBadge status={selectedInvoice.status} size="sm" />
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-slate-200/60">
                <span className="text-slate-500 font-semibold uppercase text-[10px]">Total Amount Billed</span>
                <span className="font-bold text-slate-900 text-sm">₹{selectedInvoice.totalAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-slate-200/60">
                <span className="text-slate-500 font-semibold uppercase text-[10px]">Issue / Due Dates</span>
                <span className="font-mono text-slate-800">
                  {selectedInvoice.issueDate} → {selectedInvoice.dueDate}
                </span>
              </div>
            </div>

            {/* Tax Breakdown */}
            <div className="space-y-2">
              <h4 className="font-semibold text-slate-900 uppercase text-[11px] tracking-wider">
                Statutory GST & Tariff Breakdown
              </h4>
              <div className="bg-white border border-slate-200 rounded-xl p-3.5 space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-600">Base Linehaul Freight:</span>
                  <span className="font-semibold text-slate-800">
                    ₹{Math.round((selectedInvoice.totalAmount / 1.18) * 0.88).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Fuel Surcharge (12% FSI):</span>
                  <span className="font-semibold text-slate-800">
                    ₹{Math.round((selectedInvoice.totalAmount / 1.18) * 0.12).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-slate-100">
                  <span className="text-slate-600">Integrated GST (IGST 18%):</span>
                  <span className="font-bold text-slate-900">
                    ₹{Math.round(selectedInvoice.totalAmount - selectedInvoice.totalAmount / 1.18).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-slate-200 text-slate-900 font-bold">
                  <span>Grand Total Payable:</span>
                  <span>₹{selectedInvoice.totalAmount.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </Drawer>
      )}

      {/* FBAP Freight Audit Modal */}
      <Modal
        isOpen={isAuditModalOpen}
        onClose={() => setIsAuditModalOpen(false)}
        title="Freight Bill Audit & Payment (FBAP) Automated Engine"
      >
        <div className="space-y-4 text-xs">
          <p className="text-slate-600">
            Performs programmatic line-item freight audit comparing carrier-submitted invoices against contracted tariff rate cards,
            FSI fuel indexes, and authorized detention logs.
          </p>

          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
              <span className="text-[10px] text-slate-400 block uppercase font-semibold">Carrier Billed</span>
              <span className="font-bold text-slate-800 text-sm mt-1 block">
                ₹{sampleAuditReport.carrierBilledTotal.toLocaleString()}
              </span>
            </div>
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl">
              <span className="text-[10px] text-emerald-600 block uppercase font-semibold">Audited Approved</span>
              <span className="font-bold text-emerald-900 text-sm mt-1 block">
                ₹{sampleAuditReport.systemApprovedTotal.toLocaleString()}
              </span>
            </div>
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl">
              <span className="text-[10px] text-amber-600 block uppercase font-semibold">Net Discrepancy</span>
              <span className="font-bold text-amber-900 text-sm mt-1 block">
                -₹{sampleAuditReport.netVarianceAmount.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Discrepancies Table */}
          <div className="border border-slate-200 rounded-xl p-3 bg-amber-50/50 space-y-2">
            <span className="font-bold text-slate-800 block">Flagged Discrepancy Breakdown:</span>
            <div className="space-y-1.5">
              {sampleAuditReport.discrepancies.map((d, idx) => (
                <div key={idx} className="p-2 bg-white rounded-lg border border-amber-200 text-slate-700">
                  <div className="flex justify-between font-bold">
                    <span>{d.chargeCategory}</span>
                    <span className="text-red-600">+₹{d.varianceAmount.toLocaleString()} Overcharge</span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">{d.reason}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Double-Entry General Ledger (GL) Postings */}
          <div className="space-y-1.5">
            <span className="font-bold text-slate-800 uppercase text-[10px]">
              Automated Double-Entry General Ledger (GL) Journal Entries
            </span>
            <div className="border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-100 bg-white">
              {sampleAuditReport.glJournalEntries.map((gl, idx) => (
                <div key={idx} className="p-2.5 flex items-center justify-between text-[11px]">
                  <div>
                    <span className="font-bold text-slate-900 font-mono">{gl.accountCode}</span>
                    <span className="text-slate-600 ml-2">{gl.accountName}</span>
                    <div className="text-[10px] text-slate-400">{gl.description}</div>
                  </div>
                  <div className="text-right font-mono font-semibold">
                    {gl.debitAmount > 0 && <span className="text-blue-700">DR: ₹{gl.debitAmount.toLocaleString()}</span>}
                    {gl.creditAmount > 0 && <span className="text-emerald-700">CR: ₹{gl.creditAmount.toLocaleString()}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              onClick={() => {
                showToast({
                  type: 'success',
                  title: 'Carrier Dispute Notice Issued',
                  message: `Dispute filed for ₹${sampleAuditReport.netVarianceAmount.toLocaleString()} overcharge on invoice ${sampleAuditReport.invoiceNumber}.`
                });
                setIsAuditModalOpen(false);
              }}
              className="px-4 py-2 bg-slate-900 text-white font-semibold rounded-lg hover:bg-slate-800 cursor-pointer"
            >
              Issue Carrier Dispute & Post Verified Ledger
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
