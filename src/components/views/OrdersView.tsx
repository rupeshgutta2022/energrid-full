import React, { useState, useMemo } from 'react';
import { useLogistics } from '../../context/LogisticsContext';
import { DataTable } from '../common/DataTable';
import { StatusBadge } from '../common/StatusBadge';
import { Order, OrderStatus, OrderItem } from '../../types';
import { Drawer } from '../common/Drawer';
import { Modal } from '../common/Modal';
import {
  Package,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Plus,
  Truck,
  FileText,
  DollarSign,
  Layers,
  Scissors,
  Sparkles,
  TrendingDown,
  Trash2,
  ShieldAlert,
  Building,
  Calendar,
  Weight
} from 'lucide-react';
import { OrderLifecycleEngine, EnterpriseOrder } from '../../modules/orders/OrderLifecycleEngine';

export const OrdersView: React.FC = () => {
  const { orders, addOrder, updateOrderStatus, convertOrderToShipment, showToast, activeRole, currentUser } = useLogistics();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isOptimizerModalOpen, setIsOptimizerModalOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  // New Order Form State
  const [newCustomerName, setNewCustomerName] = useState('Tata Motors Parts Logistics');
  const [newCustomerId, setNewCustomerId] = useState('CUST-1048');
  const [newDestinationCity, setNewDestinationCity] = useState('Pune Automotive Hub');
  const [newExpectedDelivery, setNewExpectedDelivery] = useState('2026-09-18');
  const [newPaymentTerms, setNewPaymentTerms] = useState('Net 30');
  const [lineItems, setLineItems] = useState<OrderItem[]>([
    { sku: 'SKU-ENG-842', name: 'Commercial Turbocharger Assembly', quantity: 12, unitPrice: 32500, weightKg: 18.5 },
    { sku: 'SKU-FLT-110', name: 'High-Density Fuel Filtration Unit', quantity: 40, unitPrice: 4200, weightKg: 3.2 }
  ]);
  const [newItemSku, setNewItemSku] = useState('');
  const [newItemName, setNewItemName] = useState('');
  const [newItemQty, setNewItemQty] = useState(10);
  const [newItemPrice, setNewItemPrice] = useState(1500);
  const [newItemWeight, setNewItemWeight] = useState(5);

  const roleScopedOrders = useMemo(() => {
    const allOrders = Array.isArray(orders) ? orders : [];
    let filtered = allOrders;
    if (activeRole === 'Customer') {
      filtered = allOrders.filter(
        (o) =>
          (o.customerName && o.customerName.toLowerCase().includes('northstar')) ||
          (currentUser?.organization && o.customerName && o.customerName.toLowerCase().includes(currentUser.organization.toLowerCase()))
      );
    }
    if (statusFilter !== 'ALL') {
      filtered = filtered.filter((o) => o.status.toLowerCase() === statusFilter.toLowerCase());
    }
    return filtered;
  }, [orders, activeRole, currentUser, statusFilter]);

  // Operational KPIs
  const totalOrdersCount = roleScopedOrders.length;
  const totalDeclaredValue = roleScopedOrders.reduce((sum, o) => sum + (o.totalValue || 0), 0);
  const totalGrossWeightKg = roleScopedOrders.reduce(
    (sum, o) => sum + (o.items || []).reduce((acc, it) => acc + (it.weightKg || 0) * (it.quantity || 1), 0),
    0
  );
  const processingCount = roleScopedOrders.filter((o) => o.status === 'Processing').length;

  // Consolidation evaluation
  const consolidationAnalysis = useMemo(() => {
    // Map existing orders to EnterpriseOrder structure for optimization engine
    const mapped: EnterpriseOrder[] = roleScopedOrders.map((o) => ({
      id: o.id,
      orderNumber: o.id,
      orderDate: o.createdAt,
      customer: {
        customerId: o.customerId,
        customerName: o.customerName,
        customerTier: 'PLATINUM',
        creditLimit: 5000000,
        currentOutstandingBalance: 1200000,
        paymentTerms: 'NET_30'
      },
      destination: {
        facilityName: `${o.destinationCity} Logistics Park`,
        street: 'Central Corridor Way',
        city: o.destinationCity,
        state: 'MH',
        postalCode: '400001',
        country: 'India',
        contactPerson: 'Station Lead',
        contactPhone: '+91 98765 43210',
        dockAppointmentRequired: true,
        liftgateRequired: false
      },
      items: (o.items || []).map((it, idx) => ({
        id: `LI-${idx}`,
        sku: it.sku,
        productName: it.name,
        category: 'Automotive / Industrial',
        quantityOrdered: it.quantity,
        quantityAllocated: it.quantity,
        quantityBackordered: 0,
        unitPrice: it.unitPrice,
        totalPrice: it.quantity * it.unitPrice,
        weightPerUnitKg: it.weightKg || 5,
        volumePerUnitM3: 0.04
      })),
      priority: 'STANDARD',
      fulfillmentMode: 'ROAD_FTL',
      status: o.status === 'Shipped' ? 'DISPATCHED' : o.status === 'Completed' ? 'DELIVERED' : 'APPROVED',
      subtotalAmount: o.totalValue,
      taxAmount: Math.round(o.totalValue * 0.18),
      freightEstimatedCost: Math.round(o.totalValue * 0.06),
      totalOrderValue: o.totalValue,
      totalWeightKg: (o.items || []).reduce((sum, it) => sum + (it.weightKg || 0) * (it.quantity || 1), 0),
      totalVolumeM3: 4.2,
      requestedDeliveryDate: o.expectedDelivery,
      auditHistory: []
    }));

    return OrderLifecycleEngine.evaluateOrderConsolidation(mapped);
  }, [roleScopedOrders]);

  const handleAddLineItem = () => {
    if (!newItemSku.trim() || !newItemName.trim() || newItemQty <= 0) {
      showToast({ type: 'error', title: 'Invalid Line Item', message: 'Please provide SKU, item name and positive quantity.' });
      return;
    }
    setLineItems([
      ...lineItems,
      {
        sku: newItemSku.trim().toUpperCase(),
        name: newItemName.trim(),
        quantity: newItemQty,
        unitPrice: newItemPrice,
        weightKg: newItemWeight
      }
    ]);
    setNewItemSku('');
    setNewItemName('');
    setNewItemQty(10);
    setNewItemPrice(1500);
    setNewItemWeight(5);
  };

  const handleRemoveLineItem = (index: number) => {
    setLineItems(lineItems.filter((_, i) => i !== index));
  };

  const calculatedSubtotal = lineItems.reduce((acc, it) => acc + it.quantity * it.unitPrice, 0);
  const calculatedWeight = lineItems.reduce((acc, it) => acc + (it.weightKg || 0) * it.quantity, 0);

  const handleCreateOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (lineItems.length === 0) {
      showToast({ type: 'error', title: 'Order Empty', message: 'Add at least one line item before creating the order.' });
      return;
    }

    const newId = addOrder({
      customerName: newCustomerName,
      customerId: newCustomerId,
      expectedDelivery: newExpectedDelivery,
      status: 'Processing',
      items: lineItems,
      totalValue: calculatedSubtotal,
      destinationCity: newDestinationCity,
      paymentTerms: newPaymentTerms
    });

    setIsCreateModalOpen(false);
    showToast({
      type: 'success',
      title: 'Purchase Order Created',
      message: `Order ${newId} registered with ${lineItems.length} SKUs totaling ₹${calculatedSubtotal.toLocaleString()}.`
    });
  };

  const columns = [
    {
      key: 'id',
      header: 'Order Ref',
      sortable: true,
      render: (o: Order) => (
        <div>
          <span className="font-bold text-slate-900 block font-mono">{o.id}</span>
          <span className="text-[10px] text-slate-400">{o.createdAt}</span>
        </div>
      )
    },
    {
      key: 'customerName',
      header: 'Customer & Destination',
      sortable: true,
      render: (o: Order) => (
        <div>
          <span className="font-semibold text-slate-800 block truncate">{o.customerName}</span>
          <span className="text-[11px] text-slate-500 truncate flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-300 inline-block" />
            {o.destinationCity}
          </span>
        </div>
      )
    },
    {
      key: 'itemsCount',
      header: 'SKUs / Units',
      render: (o: Order) => {
        const totalUnits = (o.items || []).reduce((sum, it) => sum + (it.quantity || 0), 0);
        return (
          <div>
            <span className="font-medium text-slate-800">{o.items.length} SKUs</span>
            <span className="text-[10px] text-slate-400 block">{totalUnits.toLocaleString()} units</span>
          </div>
        );
      }
    },
    {
      key: 'totalWeightKg',
      header: 'Gross Weight',
      render: (o: Order) => {
        const wt = (o.items || []).reduce((acc, it) => acc + (it.weightKg || 0) * (it.quantity || 1), 0);
        return <span className="font-medium text-slate-700">{wt.toLocaleString()} kg</span>;
      }
    },
    {
      key: 'totalValue',
      header: 'Declared Value',
      sortable: true,
      render: (o: Order) => <span className="font-bold text-slate-900">₹{o.totalValue.toLocaleString()}</span>
    },
    {
      key: 'expectedDelivery',
      header: 'Target ETA',
      sortable: true,
      render: (o: Order) => <span className="text-slate-600 text-[11px] font-mono">{o.expectedDelivery}</span>
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (o: Order) => <StatusBadge status={o.status} size="sm" />
    }
  ];

  return (
    <div className="space-y-6">
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Order Lifecycle & Commercial Manifests</h1>
          <p className="text-xs text-slate-500 mt-1">
            Order lifecycle verification, SKU allocation, multi-order consolidation savings, and dispatch scheduling.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setIsOptimizerModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg shadow-2xs transition-colors cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Consolidation Advisor ({consolidationAnalysis.length})</span>
          </button>

          {activeRole !== 'Customer' && (
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-[#FF4D2A] hover:bg-[#E23817] rounded-lg shadow-2xs transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create Purchase Order</span>
            </button>
          )}
        </div>
      </div>

      {/* Operational KPI Ribbon */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-medium text-slate-500">Active Orders</span>
            <Package className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-xl font-bold text-slate-900 mt-1.5">{totalOrdersCount}</div>
          <div className="text-[10px] text-slate-400 mt-0.5">{processingCount} currently in processing</div>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-medium text-slate-500">Order Value</span>
            <DollarSign className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-xl font-bold text-slate-900 mt-1.5">₹{(totalDeclaredValue / 100000).toFixed(2)}L</div>
          <div className="text-[10px] text-emerald-600 font-medium mt-0.5">Commercial receivables logged</div>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-medium text-slate-500">Gross Freight Weight</span>
            <Weight className="w-4 h-4 text-purple-500" />
          </div>
          <div className="text-xl font-bold text-slate-900 mt-1.5">{(totalGrossWeightKg / 1000).toFixed(1)} MT</div>
          <div className="text-[10px] text-slate-400 mt-0.5">{totalGrossWeightKg.toLocaleString()} kg allocated</div>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-medium text-slate-500">Consolidation Opportunities</span>
            <TrendingDown className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-xl font-bold text-slate-900 mt-1.5">{consolidationAnalysis.length} Clusters</div>
          <div className="text-[10px] text-amber-600 font-medium mt-0.5">
            Est. Savings: ₹
            {consolidationAnalysis.reduce((acc, c) => acc + c.estimatedTariffSavings, 0).toLocaleString()}
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3 overflow-x-auto">
        {['ALL', 'Processing', 'Shipped', 'Completed', 'Cancelled'].map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              statusFilter === status
                ? 'bg-slate-900 text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            {status === 'ALL' ? 'All Orders' : status}
          </button>
        ))}
      </div>

      {/* Orders Data Table */}
      <DataTable
        data={roleScopedOrders}
        columns={columns}
        searchKey="customerName"
        searchPlaceholder="Search orders by customer, ref ID, destination..."
        onRowClick={(item) => setSelectedOrder(item)}
        exportFilename="logicore-orders-export.csv"
      />

      {/* Order Details Drawer */}
      {selectedOrder && (
        <Drawer
          isOpen={!!selectedOrder}
          onClose={() => setSelectedOrder(null)}
          title={`Order ${selectedOrder.id}`}
          subtitle={`${selectedOrder.customerName} • Target Delivery: ${selectedOrder.expectedDelivery}`}
          footer={
            <div className="flex items-center justify-between w-full">
              {selectedOrder.status !== 'Shipped' && selectedOrder.status !== 'Completed' ? (
                <button
                  onClick={() => {
                    convertOrderToShipment(selectedOrder.id);
                    setSelectedOrder(null);
                  }}
                  className="px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-2xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Truck className="w-3.5 h-3.5" />
                  <span>Generate Shipment & Dispatch</span>
                </button>
              ) : (
                <span className="text-xs font-medium text-emerald-600">Dispatched in Consignment</span>
              )}
              <button
                onClick={() => setSelectedOrder(null)}
                className="px-3.5 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer"
              >
                Close
              </button>
            </div>
          }
        >
          <div className="space-y-6 text-xs">
            {/* Status & Payment Terms */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-semibold uppercase text-[10px]">Order Status</span>
                <StatusBadge status={selectedOrder.status} size="sm" />
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-slate-200/60">
                <span className="text-slate-500 font-semibold uppercase text-[10px]">Payment Terms</span>
                <span className="font-semibold text-slate-800">{selectedOrder.paymentTerms}</span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-slate-200/60">
                <span className="text-slate-500 font-semibold uppercase text-[10px]">Change Status</span>
                <div className="flex items-center gap-1.5">
                  {(['Processing', 'Shipped', 'Completed', 'Cancelled'] as OrderStatus[]).map((st) => (
                    <button
                      key={st}
                      disabled={selectedOrder.status === st}
                      onClick={() => {
                        updateOrderStatus(selectedOrder.id, st);
                        setSelectedOrder({ ...selectedOrder, status: st });
                      }}
                      className={`px-2 py-0.5 rounded text-[10px] font-semibold cursor-pointer ${
                        selectedOrder.status === st
                          ? 'bg-slate-300 text-slate-600 cursor-not-allowed'
                          : 'bg-white border border-slate-200 hover:bg-slate-100 text-slate-700'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Line Items Table */}
            <div className="space-y-2">
              <h4 className="font-semibold text-slate-900 uppercase text-[11px] tracking-wider">
                Order Manifest & SKUs ({selectedOrder.items.length})
              </h4>
              <div className="border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-100">
                {selectedOrder.items.map((it, idx) => (
                  <div key={idx} className="p-3 bg-white flex items-center justify-between text-xs">
                    <div>
                      <div className="font-bold text-slate-900">{it.sku}</div>
                      <div className="text-slate-600 text-[11px]">{it.name}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-slate-800">{it.quantity} units</div>
                      <div className="text-[11px] text-slate-400 font-medium">₹{it.unitPrice.toLocaleString()} ea</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Delivery Specifications */}
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Destination City:</span>
                <span className="font-semibold text-slate-800">{selectedOrder.destinationCity}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Total Declared Value:</span>
                <span className="font-bold text-slate-900">₹{selectedOrder.totalValue.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Gross Weight:</span>
                <span className="font-bold text-slate-900">
                  {selectedOrder.items.reduce((s, it) => s + (it.weightKg || 0) * (it.quantity || 1), 0).toLocaleString()} kg
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Delivery Deadline:</span>
                <span className="font-semibold text-blue-600">{selectedOrder.expectedDelivery}</span>
              </div>
            </div>
          </div>
        </Drawer>
      )}

      {/* New Purchase Order Modal */}
      <Modal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} title="Create Customer Purchase Order">
        <form onSubmit={handleCreateOrderSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Customer / Organization Name</label>
              <input
                type="text"
                required
                value={newCustomerName}
                onChange={(e) => setNewCustomerName(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Customer ID</label>
              <input
                type="text"
                required
                value={newCustomerId}
                onChange={(e) => setNewCustomerId(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg font-mono focus:ring-1 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Destination Facility / City</label>
              <input
                type="text"
                required
                value={newDestinationCity}
                onChange={(e) => setNewDestinationCity(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Expected Delivery Date</label>
              <input
                type="date"
                required
                value={newExpectedDelivery}
                onChange={(e) => setNewExpectedDelivery(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>

          {/* Line Items Builder */}
          <div className="border border-slate-200 rounded-xl p-3 bg-slate-50/50 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-800 uppercase text-[11px]">Manifest Line Items ({lineItems.length})</span>
              <span className="text-[11px] font-semibold text-slate-600">
                Total: ₹{calculatedSubtotal.toLocaleString()} • {calculatedWeight.toLocaleString()} kg
              </span>
            </div>

            <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
              {lineItems.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 bg-white rounded-lg border border-slate-200">
                  <div>
                    <span className="font-bold text-slate-900 font-mono text-[11px]">{item.sku}</span>
                    <span className="text-slate-600 ml-2">{item.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-slate-800">{item.quantity} units</span>
                    <span className="text-slate-500">₹{(item.unitPrice * item.quantity).toLocaleString()}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveLineItem(idx)}
                      className="text-red-500 hover:text-red-700 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Item Row */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2 pt-2 border-t border-slate-200">
              <input
                type="text"
                placeholder="SKU (e.g. SKU-AUTO-91)"
                value={newItemSku}
                onChange={(e) => setNewItemSku(e.target.value)}
                className="px-2 py-1.5 border border-slate-200 rounded text-xs bg-white"
              />
              <input
                type="text"
                placeholder="Product Description"
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
                className="px-2 py-1.5 border border-slate-200 rounded text-xs bg-white"
              />
              <input
                type="number"
                placeholder="Quantity"
                value={newItemQty}
                onChange={(e) => setNewItemQty(Number(e.target.value))}
                className="px-2 py-1.5 border border-slate-200 rounded text-xs bg-white"
              />
              <input
                type="number"
                placeholder="Unit Price (₹)"
                value={newItemPrice}
                onChange={(e) => setNewItemPrice(Number(e.target.value))}
                className="px-2 py-1.5 border border-slate-200 rounded text-xs bg-white"
              />
              <button
                type="button"
                onClick={handleAddLineItem}
                className="px-2.5 py-1.5 bg-slate-900 text-white rounded text-xs font-semibold hover:bg-slate-800 cursor-pointer"
              >
                Add SKU
              </button>
            </div>
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
              Create Purchase Order
            </button>
          </div>
        </form>
      </Modal>

      {/* Consolidation Advisor Modal */}
      <Modal
        isOpen={isOptimizerModalOpen}
        onClose={() => setIsOptimizerModalOpen(false)}
        title="Freight Consolidation & Splitting Advisor"
      >
        <div className="space-y-4 text-xs">
          <p className="text-slate-600">
            Automated cluster analysis identifies multiple LTL shipments heading to identical destination zones that can be
            consolidated into Full Truckload (FTL) charters to minimize linehaul expenses.
          </p>

          {consolidationAnalysis.length === 0 ? (
            <div className="p-6 text-center text-slate-500 bg-slate-50 rounded-xl">
              No overlapping destination clusters detected for current active orders.
            </div>
          ) : (
            <div className="space-y-3">
              {consolidationAnalysis.map((cluster, idx) => (
                <div key={idx} className="p-4 bg-amber-50/60 border border-amber-200 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 text-sm">{cluster.destinationCity} Corridor</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-200 text-amber-900">
                      {cluster.candidateCount} Orders Mergeable
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-slate-700 pt-1">
                    <div>
                      Combined Weight: <span className="font-semibold">{cluster.totalConsolidatedWeight.toLocaleString()} kg</span>
                    </div>
                    <div className="text-emerald-700 font-bold">
                      Estimated Freight Savings: ₹{cluster.estimatedTariffSavings.toLocaleString()}
                    </div>
                  </div>
                  <div className="pt-2 flex justify-end">
                    <button
                      onClick={() => {
                        showToast({
                          type: 'success',
                          title: 'Consolidated Consignment Created',
                          message: `Merged ${cluster.candidateCount} orders for ${cluster.destinationCity} into unified FTL dispatch.`
                        });
                        setIsOptimizerModalOpen(false);
                      }}
                      className="px-3 py-1.5 bg-amber-600 text-white rounded-lg font-semibold hover:bg-amber-700 cursor-pointer"
                    >
                      Consolidate & Dispatch
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};
