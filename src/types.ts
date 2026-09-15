export type ShipmentStatus =
  | 'Pending'
  | 'Confirmed'
  | 'Assigned'
  | 'In Transit'
  | 'At Warehouse'
  | 'Out for Delivery'
  | 'Delivered'
  | 'Delayed'
  | 'Exception'
  | 'Cancelled';

export type PriorityLevel = 'Standard' | 'Express' | 'Priority' | 'Critical';

export type VehicleStatus = 'Active' | 'Available' | 'Maintenance' | 'Out of Service';

export type DriverStatus = 'On Duty' | 'Available' | 'Resting' | 'Off Duty';

export type OrderStatus = 'Draft' | 'Confirmed' | 'Processing' | 'Ready to Ship' | 'Shipped' | 'Completed' | 'Cancelled';

export type InvoiceStatus = 'Paid' | 'Pending' | 'Overdue' | 'Draft';

export type NotificationSeverity = 'Critical' | 'Warning' | 'Attention' | 'Informational';

export type UserRole =
  | 'Executive'
  | 'Operations'
  | 'Logistics Manager'
  | 'Fleet Manager'
  | 'Warehouse Supervisor'
  | 'Driver'
  | 'Customer'
  | 'System Admin';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  title: string;
  organization?: string;
  avatarText?: string;
  facility?: string;
}

export interface LocationPoint {
  city: string;
  facility: string;
  address: string;
  coordinates: { x: number; y: number }; // Relative 0-100 coordinate on synthetic map
  timestamp?: string;
  status?: 'Completed' | 'Current' | 'Upcoming';
}

export interface TrackingStop {
  id: string;
  name: string;
  city: string;
  type: 'Pickup' | 'Transit Hub' | 'Customs' | 'Delivery' | 'Warehouse';
  scheduledTime: string;
  actualTime?: string;
  status: 'Completed' | 'In Progress' | 'Pending' | 'Delayed';
  notes?: string;
  coordinates: { x: number; y: number };
}

export interface Shipment {
  id: string; // e.g. LGX-2026-10482
  trackingNumber: string;
  customerName: string;
  customerId: string;
  origin: LocationPoint;
  destination: LocationPoint;
  currentLocation: LocationPoint;
  status: ShipmentStatus;
  priority: PriorityLevel;
  carrier: string;
  vehicleId: string;
  vehiclePlate: string;
  driverName: string;
  driverPhone: string;
  eta: string;
  departureTime: string;
  packageType: string;
  weightKg: number;
  volumeM3: number;
  cargoDescription: string;
  progressPercent: number;
  stops: TrackingStop[];
  temperatureControlled?: boolean;
  targetTempC?: number;
  currentTempC?: number;
  lastUpdated: string;
  estimatedCost: number;
  notes: string[];
  podSignature?: string;
  deliveredAt?: string;
}

export interface OrderItem {
  sku: string;
  name: string;
  quantity: number;
  unitPrice: number;
  weightKg: number;
}

export interface Order {
  id: string; // ORD-8492
  customerName: string;
  customerId: string;
  createdAt: string;
  expectedDelivery: string;
  status: OrderStatus;
  items: OrderItem[];
  totalValue: number;
  shipmentId?: string;
  destinationCity: string;
  paymentTerms: string;
}

export interface Vehicle {
  id: string; // TRK-2041
  model: string;
  type: 'Heavy Truck' | 'Medium Cargo' | 'Refrigerated Van' | 'Electric Delivery Van';
  status: VehicleStatus;
  licensePlate: string;
  currentDriverId?: string;
  currentDriverName?: string;
  fuelPercent: number;
  odometerKm: number;
  currentLocationCity: string;
  capacityKg: number;
  utilizationPercent: number;
  lastServiceDate: string;
  nextServiceDueKm: number;
  insuranceExpiry: string;
  fitnessExpiry: string;
  activeShipmentId?: string;
}

export interface Driver {
  id: string; // DRV-109
  name: string;
  phone: string;
  email: string;
  licenseNumber: string;
  licenseExpiry: string;
  status: DriverStatus;
  currentVehicleId?: string;
  assignedShipmentId?: string;
  safetyScore: number; // 0-100
  totalTripsCompleted: number;
  onTimeDeliveryRate: number; // %
  hoursLoggedToday: number;
  currentCity: string;
  avatarUrl?: string;
}

export interface Warehouse {
  id: string; // WH-01
  name: string;
  code: string;
  city: string;
  state: string;
  totalCapacitySqFt: number;
  utilizedCapacityPercent: number;
  inboundDocks: number;
  inboundActiveDocks: number;
  outboundDocks: number;
  outboundActiveDocks: number;
  managerName: string;
  activeWorkers: number;
  dailyThroughputPallets: number;
  temperatureControlled: boolean;
  status: 'Normal' | 'High Volume' | 'At Capacity' | 'Maintenance';
}

export interface InventoryItem {
  id: string;
  sku: string;
  name: string;
  category: string;
  warehouseId: string;
  warehouseName: string;
  quantityOnHand: number;
  reorderLevel: number;
  unitCost: number;
  totalValue: number;
  bayLocation: string;
  lastAudited: string;
  status: 'In Stock' | 'Low Stock' | 'Critical Reorder' | 'Overstocked';
}

export interface Customer {
  id: string; // CST-401
  name: string;
  companyName: string;
  industry: string;
  email: string;
  phone: string;
  address: string;
  activeShipmentsCount: number;
  totalShipmentsCount: number;
  lifetimeRevenue: number;
  paymentTerms: string;
  creditLimit: number;
  creditUsed: number;
  slaOnTimeTarget: number;
}

export interface Supplier {
  id: string; // SUP-102
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  country: string;
  category: string;
  rating: number; // 1-5
  onTimeLeadRate: number;
  activePurchaseOrders: number;
  status: 'Approved' | 'Under Review' | 'Suspended';
}

export interface ProcurementOrder {
  id: string; // PO-3029
  supplierId: string;
  supplierName: string;
  orderDate: string;
  expectedDate: string;
  destinationWarehouse: string;
  status: 'Issued' | 'Confirmed' | 'In Transit' | 'Received' | 'Cancelled';
  totalAmount: number;
  itemCount: number;
}

export interface Invoice {
  id: string; // INV-2026-904
  shipmentId: string;
  customerId: string;
  customerName: string;
  issueDate: string;
  dueDate: string;
  subtotal: number;
  taxAmount: number;
  totalAmount: number;
  status: InvoiceStatus;
  paidAt?: string;
  paymentMethod?: string;
}

export interface ReturnRequest {
  id: string; // RMA-771
  originalShipmentId: string;
  customerName: string;
  sku: string;
  productName: string;
  quantity: number;
  reason: 'Damaged in transit' | 'Wrong item received' | 'Defective' | 'Customer change of mind';
  status: 'Requested' | 'Approved' | 'In Transit to Hub' | 'Inspected' | 'Refunded' | 'Rejected';
  requestedDate: string;
  assignedWarehouse: string;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  severity: NotificationSeverity;
  category: 'Shipment' | 'Fleet' | 'Warehouse' | 'System' | 'Finance';
  timestamp: string;
  read: boolean;
  entityId?: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  target: string;
  ipAddress: string;
  status: 'Success' | 'Warning' | 'Denied';
}

export interface RouteInfo {
  id: string;
  code: string;
  name: string;
  originCity: string;
  destCity: string;
  distanceKm: number;
  avgDurationHours: number;
  activeTrucks: number;
  tollsCost: number;
  status: 'Optimal' | 'Congested' | 'Weather Alert' | 'Detour in place';
}

export interface DocumentItem {
  id: string;
  title: string;
  type: 'Bill of Lading' | 'Commercial Invoice' | 'Proof of Delivery' | 'Customs Declaration' | 'Inspection Certificate';
  shipmentId: string;
  uploadedAt: string;
  fileSize: string;
  format: 'PDF' | 'DOCX' | 'XML';
}
