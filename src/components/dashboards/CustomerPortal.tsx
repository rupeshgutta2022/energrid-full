import React, { useState } from 'react';
import { useLogistics } from '../../context/LogisticsContext';
import { StatCard } from '../common/StatCard';
import { StatusBadge } from '../common/StatusBadge';
import { Modal } from '../common/Modal';
import {
  ShoppingBag,
  Package,
  Clock,
  CheckCircle2,
  FileText,
  RotateCcw,
  Receipt,
  Headphones,
  Plus,
  ArrowRight,
  Download,
  Search
} from 'lucide-react';

export const CustomerPortal: React.FC = () => {
  const {
    customers,
    shipments,
    invoices,
    setTrackingShipmentId,
    setActiveView,
    setIsCreateShipmentModalOpen,
    createReturnRequest,
    showToast
  } = useLogistics();

  // Active customer account simulation
  const [selectedCustomerId, setSelectedCustomerId] = useState<string>('CUST-101');
  const currentCustomer = (customers && customers.find((c) => c.id === selectedCustomerId)) || (customers && customers[0]);
  const companyName = (currentCustomer?.companyName || '').toLowerCase();

  const customerShipments = (shipments || []).filter(
    (s) =>
      companyName &&
      ((s.customerName && s.customerName.toLowerCase().includes(companyName)) ||
       companyName.includes(s.customerName?.toLowerCase() || ''))
  );

  const customerInvoices = (invoices || []).filter(
    (inv) =>
      companyName &&
      ((inv.customerName && inv.customerName.toLowerCase().includes(companyName)) ||
       companyName.includes(inv.customerName?.toLowerCase() || ''))
  );

  // Return modal state
  const [isReturnModalOpen, setIsReturnModalOpen] = useState(false);
  const [returnShipmentId, setReturnShipmentId] = useState(customerShipments[0]?.id || 'LGX-2026-10480');
  const [returnReason, setReturnReason] = useState('Damaged goods upon receipt');
  const [returnItemsCount, setReturnItemsCount] = useState(4);

  const handleCreateReturn = () => {
    createReturnRequest({
      shipmentId: returnShipmentId,
      customerName: currentCustomer.companyName,
      itemsCount: returnItemsCount,
      reason: returnReason
    });
    setIsReturnModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Customer Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Customer Freight Portal</h1>
            <span className="text-xs bg-blue-50 text-blue-700 font-semibold px-2 py-0.5 rounded-md">
              Self-Service B2B
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Enterprise consignment tracking, delivery manifests, freight invoices, and reverse logistics.
          </p>
        </div>

        {/* Customer Account Switcher for Demo */}
        <div className="flex items-center gap-2.5">
          <div className="bg-white border border-slate-200 rounded-lg p-1 text-xs flex items-center">
            <span className="text-slate-400 pl-2 font-medium">Customer:</span>
            <select
              value={selectedCustomerId}
              onChange={(e) => setSelectedCustomerId(e.target.value)}
              aria-label="Select customer account"
              className="bg-transparent font-semibold text-slate-800 focus:outline-hidden pr-2 cursor-pointer"
            >
              {customers.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.companyName} ({c.industry})
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={() => setIsCreateShipmentModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-2xs transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Book New Shipment</span>
          </button>
        </div>
      </div>

      {/* Account KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Active Consignments"
          value={customerShipments.length.toString()}
          subtitle="Currently in transit / out for delivery"
          icon={Package}
          accentColor="blue"
        />
        <StatCard
          title="Contract On-Time SLA"
          value={`${currentCustomer.slaOnTimeTarget}%`}
          change="+1.8%"
          changeType="positive"
          subtitle="Guaranteed transit SLA"
          icon={CheckCircle2}
          accentColor="emerald"
        />
        <StatCard
          title="Credit Available"
          value={`₹${((currentCustomer.creditLimit - currentCustomer.creditUsed) / 100000).toFixed(1)} Lakhs`}
          subtitle={`Limit: ₹${(currentCustomer.creditLimit / 100000).toFixed(1)} Lakhs`}
          icon={Receipt}
          accentColor="indigo"
        />
        <StatCard
          title="Total Lifetime Spend"
          value={`₹${(currentCustomer.lifetimeRevenue / 100000).toFixed(1)} Lakhs`}
          subtitle={`${currentCustomer.paymentTerms} terms`}
          icon={ShoppingBag}
          accentColor="slate"
        />
      </div>

      {/* Main Section: Active Consignments & Invoices */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Consignments List (2 cols) */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200/90 shadow-xs p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-semibold text-slate-900 tracking-tight">Active Consignments & Tracking</h3>
              <p className="text-xs text-slate-500 mt-0.5">Real-time status, ETA, and electronic Proof of Delivery</p>
            </div>
            <button
              onClick={() => setIsReturnModalOpen(true)}
              className="text-xs font-semibold text-slate-700 hover:text-slate-900 border border-slate-200 px-2.5 py-1 rounded-lg hover:bg-slate-50"
            >
              Request Return (RMA)
            </button>
          </div>

          <div className="space-y-3">
            {customerShipments.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-500">
                No active shipments for this account right now.
              </div>
            ) : (
              customerShipments.map((s) => (
                <div
                  key={s.id}
                  className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900">{s.id}</span>
                      <StatusBadge status={s.status} size="sm" />
                      <span className="text-slate-400">•</span>
                      <span className="text-slate-600 font-medium">{s.packageType}</span>
                    </div>
                    <div className="text-slate-500 flex items-center gap-2">
                      <span>{s.origin.city}</span>
                      <ArrowRight className="w-3 h-3 text-slate-400" />
                      <span className="font-semibold text-slate-800">{s.destination.city} ({s.destination.facility})</span>
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Driver: {s.driverName} • Vehicle: {s.vehiclePlate} • Weight: {s.weightKg.toLocaleString()} kg
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <div className="text-right">
                      <div className="text-[10px] text-slate-400 uppercase">Estimated Delivery</div>
                      <div className="font-bold text-slate-900">{s.eta}</div>
                    </div>
                    <button
                      onClick={() => {
                        setTrackingShipmentId(s.id);
                        setActiveView('tracking');
                      }}
                      className="px-3 py-1.5 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                    >
                      Track Live
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Commercial Billing & Support Desk (1 col) */}
        <div className="space-y-6">
          {/* Recent Invoices */}
          <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-5 space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-semibold text-slate-900 tracking-tight">Freight Invoices</h3>
              <button
                onClick={() => setActiveView('invoices')}
                className="text-xs font-semibold text-blue-600 hover:text-blue-700"
              >
                All invoices →
              </button>
            </div>

            <div className="space-y-2.5">
              {customerInvoices.map((inv) => (
                <div
                  key={inv.id}
                  className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs flex items-center justify-between"
                >
                  <div>
                    <div className="font-bold text-slate-900">{inv.id}</div>
                    <div className="text-[11px] text-slate-500">Due: {inv.dueDate}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-slate-900">₹{inv.totalAmount.toLocaleString()}</div>
                    <StatusBadge status={inv.status} size="sm" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dedicated Account Support */}
          <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-5 space-y-3 text-xs">
            <h3 className="text-sm font-semibold text-slate-900 tracking-tight flex items-center gap-2">
              <Headphones className="w-4 h-4 text-blue-600" />
              Dedicated Logistics Desk
            </h3>
            <p className="text-slate-500 leading-relaxed">
              Your enterprise key account manager is assigned for priority routing and custom SLA escalations.
            </p>
            <div className="p-3 bg-blue-50/50 rounded-lg border border-blue-100 space-y-1">
              <div className="font-semibold text-slate-900">Rohan Deshmukh</div>
              <div className="text-slate-600">Enterprise Logistics Specialist</div>
              <div className="text-blue-700 font-medium">deshmukh.r@logicore.io • +91 22 8840 1920</div>
            </div>
          </div>
        </div>
      </div>

      {/* Return / RMA Request Modal */}
      <Modal
        isOpen={isReturnModalOpen}
        onClose={() => setIsReturnModalOpen(false)}
        title="Initiate Reverse Logistics / Return Request"
        subtitle={`Account: ${currentCustomer.companyName}`}
        footer={
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsReturnModalOpen(false)}
              className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              onClick={handleCreateReturn}
              className="px-4 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-2xs"
            >
              Generate RMA & Schedule Pickup
            </button>
          </div>
        }
      >
        <div className="space-y-4 text-xs">
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">Select Original Consignment</label>
            <select
              value={returnShipmentId}
              onChange={(e) => setReturnShipmentId(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs bg-white focus:outline-hidden"
            >
              {customerShipments.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.id} — {s.destination.facility} ({s.weightKg} kg)
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">Number of Cartons / Pallets to Return</label>
            <input
              type="number"
              value={returnItemsCount}
              onChange={(e) => setReturnItemsCount(Number(e.target.value))}
              min={1}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">Reason for Return</label>
            <select
              value={returnReason}
              onChange={(e) => setReturnReason(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs bg-white focus:outline-hidden"
            >
              <option value="Damaged goods upon receipt">Damaged goods / crushed carton upon receipt</option>
              <option value="Incorrect SKU / quantity delivered">Incorrect SKU / over-shipment</option>
              <option value="Temperature excursion / Cold chain breach">Temperature excursion / Cold chain breach</option>
              <option value="Customer return / RMA recall">Customer return / Warranty recall</option>
            </select>
          </div>
        </div>
      </Modal>
    </div>
  );
};
