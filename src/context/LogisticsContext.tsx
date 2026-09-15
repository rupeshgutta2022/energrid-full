import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Shipment,
  Order,
  Vehicle,
  Driver,
  Warehouse,
  InventoryItem,
  Customer,
  Supplier,
  ProcurementOrder,
  Invoice,
  ReturnRequest,
  AppNotification,
  AuditLog,
  RouteInfo,
  DocumentItem,
  UserRole,
  ShipmentStatus,
  AuthUser
} from '../types';
import { ROLE_CONFIGS } from '../data/authUsers';
import {
  INITIAL_CUSTOMERS,
  INITIAL_WAREHOUSES,
  INITIAL_VEHICLES,
  INITIAL_DRIVERS,
  INITIAL_SHIPMENTS,
  INITIAL_ORDERS,
  INITIAL_INVENTORY,
  INITIAL_SUPPLIERS,
  INITIAL_PROCUREMENT,
  INITIAL_INVOICES,
  INITIAL_RETURNS,
  INITIAL_NOTIFICATIONS,
  INITIAL_ROUTES,
  INITIAL_DOCUMENTS,
  INITIAL_AUDIT_LOGS
} from '../mockData';

interface Toast {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message: string;
}

interface LogisticsContextType {
  isAuthenticated: boolean;
  currentUser: AuthUser | null;
  login: (role: UserRole, customUser?: AuthUser) => void;
  logout: () => void;

  activeRole: UserRole;
  setActiveRole: (role: UserRole) => void;
  activeView: string;
  setActiveView: (view: string) => void;
  
  // Data entities
  shipments: Shipment[];
  orders: Order[];
  vehicles: Vehicle[];
  drivers: Driver[];
  warehouses: Warehouse[];
  inventory: InventoryItem[];
  customers: Customer[];
  suppliers: Supplier[];
  procurement: ProcurementOrder[];
  procurementOrders: ProcurementOrder[];
  invoices: Invoice[];
  returns: ReturnRequest[];
  returnRequests: ReturnRequest[];
  notifications: AppNotification[];
  routes: RouteInfo[];
  documents: DocumentItem[];
  auditLogs: AuditLog[];
  
  // Quick inspection / selection state
  selectedShipmentId: string | null;
  setSelectedShipmentId: (id: string | null) => void;
  trackingShipmentId: string;
  setTrackingShipmentId: (id: string) => void;
  
  // Mutators
  addShipment: (shipment: Omit<Shipment, 'id' | 'lastUpdated' | 'progressPercent'>) => string;
  updateShipmentStatus: (id: string, status: ShipmentStatus, note?: string) => void;
  updateShipmentProgress: (id: string, progressPercent: number) => void;
  assignDriverAndVehicle: (shipmentId: string, driverId: string, vehicleId: string) => void;
  addShipmentNote: (shipmentId: string, note: string) => void;
  completeProofOfDelivery: (shipmentId: string, signatureDataUrl: string, receiverName: string) => void;
  
  addOrder: (order: Omit<Order, 'id' | 'createdAt'>) => string;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  convertOrderToShipment: (orderId: string) => string;
  
  addRoute: (routeData: Omit<RouteInfo, 'id'>) => string;
  addVehicle: (vehicleData: Omit<Vehicle, 'id'> & { id?: string }) => string;
  addDriver: (driverData: Omit<Driver, 'id'> & { id?: string }) => string;

  updateVehicleStatus: (vehicleId: string, status: Vehicle['status']) => void;
  updateWarehouseCapacity: (warehouseId: string, utilizedPercent: number) => void;
  updateInventoryStock: (itemId: string, newQuantity: number) => void;
  
  markInvoicePaid: (invoiceId: string) => void;
  updateInvoiceStatus: (invoiceId: string, status: Invoice['status']) => void;
  addProcurementOrder: (po: Omit<ProcurementOrder, 'id' | 'orderDate'>) => string;
  updateProcurementOrderStatus: (id: string, status: ProcurementOrder['status']) => void;
  updateReturnStatus: (returnId: string, status: ReturnRequest['status']) => void;
  createReturnRequest: (params: {
    shipmentId: string;
    customerName: string;
    itemsCount: number;
    reason: string;
  }) => void;
  
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  dismissNotification: (id: string) => void;
  
  // UI states
  showLandingPage: boolean;
  setShowLandingPage: (show: boolean) => void;
  isGlobalSearchOpen: boolean;
  setIsGlobalSearchOpen: (open: boolean) => void;
  isCreateShipmentModalOpen: boolean;
  setIsCreateShipmentModalOpen: (open: boolean) => void;
  isCreateCorridorModalOpen: boolean;
  setIsCreateCorridorModalOpen: (open: boolean) => void;
  isAddVehicleModalOpen: boolean;
  setIsAddVehicleModalOpen: (open: boolean) => void;
  isOnboardDriverModalOpen: boolean;
  setIsOnboardDriverModalOpen: (open: boolean) => void;
  isSidebarCollapsed: boolean;
  setIsSidebarCollapsed: (collapsed: boolean) => void;
  
  toasts: Toast[];
  showToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
}

const LogisticsContext = createContext<LogisticsContextType | undefined>(undefined);

export const LogisticsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [showLandingPage, setShowLandingPage] = useState<boolean>(() => {
    // Show landing page on first load or when explicitly navigating to it
    const saved = localStorage.getItem('logistico_show_landing');
    if (saved !== null) {
      return saved === 'true';
    }
    return true;
  });
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('logicore_authenticated') === 'true';
  });
  const [activeRole, setActiveRoleState] = useState<UserRole>(() => {
    const savedRole = localStorage.getItem('logicore_role') as UserRole | null;
    return savedRole && ROLE_CONFIGS[savedRole] ? savedRole : 'Operations';
  });
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(() => {
    const savedRole = localStorage.getItem('logicore_role') as UserRole | null;
    if (savedRole && ROLE_CONFIGS[savedRole]) {
      return ROLE_CONFIGS[savedRole].user;
    }
    return ROLE_CONFIGS['Operations'].user;
  });
  const [activeView, setActiveView] = useState<string>(() => {
    const savedRole = localStorage.getItem('logicore_role') as UserRole | null;
    return savedRole && ROLE_CONFIGS[savedRole] ? ROLE_CONFIGS[savedRole].defaultView : 'operations-dashboard';
  });
  
  const [shipments, setShipments] = useState<Shipment[]>(INITIAL_SHIPMENTS);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [vehicles, setVehicles] = useState<Vehicle[]>(INITIAL_VEHICLES);
  const [drivers, setDrivers] = useState<Driver[]>(INITIAL_DRIVERS);
  const [warehouses, setWarehouses] = useState<Warehouse[]>(INITIAL_WAREHOUSES);
  const [inventory, setInventory] = useState<InventoryItem[]>(INITIAL_INVENTORY);
  const [customers, setCustomers] = useState<Customer[]>(INITIAL_CUSTOMERS);
  const [suppliers, setSuppliers] = useState<Supplier[]>(INITIAL_SUPPLIERS);
  const [procurement, setProcurement] = useState<ProcurementOrder[]>(INITIAL_PROCUREMENT);
  const [invoices, setInvoices] = useState<Invoice[]>(INITIAL_INVOICES);
  const [returns, setReturns] = useState<ReturnRequest[]>(INITIAL_RETURNS);
  const [notifications, setNotifications] = useState<AppNotification[]>(INITIAL_NOTIFICATIONS);
  const [routes, setRoutes] = useState<RouteInfo[]>(INITIAL_ROUTES);
  const [documents, setDocuments] = useState<DocumentItem[]>(INITIAL_DOCUMENTS);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(INITIAL_AUDIT_LOGS);

  const [selectedShipmentId, setSelectedShipmentId] = useState<string | null>(null);
  const [trackingShipmentId, setTrackingShipmentId] = useState<string>('LGX-2026-10482');
  
  const [isGlobalSearchOpen, setIsGlobalSearchOpen] = useState<boolean>(false);
  const [isCreateShipmentModalOpen, setIsCreateShipmentModalOpen] = useState<boolean>(false);
  const [isCreateCorridorModalOpen, setIsCreateCorridorModalOpen] = useState<boolean>(false);
  const [isAddVehicleModalOpen, setIsAddVehicleModalOpen] = useState<boolean>(false);
  const [isOnboardDriverModalOpen, setIsOnboardDriverModalOpen] = useState<boolean>(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (toast: Omit<Toast, 'id'>) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const newToast = { ...toast, id };
    setToasts((prev) => [...prev, newToast]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const logAudit = (action: string, target: string, status: 'Success' | 'Warning' | 'Denied' = 'Success') => {
    const newLog: AuditLog = {
      id: `AUD-${Date.now().toString().slice(-4)}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      user: `${activeRole.toLowerCase().replace(/\s+/g, '.')}@logicoresp.internal`,
      action,
      target,
      ipAddress: '10.0.8.24',
      status
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  };

  const setActiveRole = (newRole: UserRole) => {
    setActiveRoleState(newRole);
    // Switch the default active view to correspond naturally with the persona
    switch (newRole) {
      case 'Executive':
        setActiveView('executive-dashboard');
        break;
      case 'Operations':
        setActiveView('operations-dashboard');
        break;
      case 'Logistics Manager':
        setActiveView('logistics-dashboard');
        break;
      case 'Fleet Manager':
        setActiveView('fleet-dashboard');
        break;
      case 'Warehouse Supervisor':
        setActiveView('warehouse-dashboard');
        break;
      case 'Driver':
        setActiveView('driver-dashboard');
        break;
      case 'Customer':
        setActiveView('customer-dashboard');
        break;
      case 'System Admin':
        setActiveView('admin-dashboard');
        break;
    }
    showToast({
      type: 'info',
      title: `Switched Persona to ${newRole}`,
      message: `Interface view and authorization permissions aligned to ${newRole} mode.`
    });
  };

  const login = (role: UserRole, customUser?: AuthUser) => {
    const user = customUser || ROLE_CONFIGS[role]?.user || ROLE_CONFIGS['Operations'].user;
    const targetView = ROLE_CONFIGS[role]?.defaultView || 'operations-dashboard';
    
    setIsAuthenticated(true);
    setCurrentUser(user);
    setActiveRoleState(role);
    setActiveView(targetView);
    setShowLandingPage(false);
    
    localStorage.setItem('logicore_authenticated', 'true');
    localStorage.setItem('logicore_role', role);
    localStorage.setItem('logistico_show_landing', 'false');

    logAudit('AUTH_LOGIN', `Session established in ${ROLE_CONFIGS[role]?.portalName || role} as ${user.name}`);
    showToast({
      type: 'success',
      title: `Authenticated: ${role} Portal`,
      message: `Welcome back, ${user.name} (${user.title})`
    });
  };

  const logout = () => {
    logAudit('AUTH_LOGOUT', `Terminated session from ${activeRole} Portal`);
    setIsAuthenticated(false);
    setShowLandingPage(true);
    localStorage.removeItem('logicore_authenticated');
    localStorage.setItem('logistico_show_landing', 'true');
    showToast({
      type: 'info',
      title: 'Session Terminated',
      message: 'You have returned to Logistico public services. Select an operational portal to re-authenticate.'
    });
  };

  const addShipment = (shipmentData: Omit<Shipment, 'id' | 'lastUpdated' | 'progressPercent'>): string => {
    const nextSeq = 10490 + shipments.length;
    const newId = `LGX-2026-${nextSeq}`;
    const newShipment: Shipment = {
      ...shipmentData,
      id: newId,
      trackingNumber: `TRK-LGX-${nextSeq}-X`,
      progressPercent: 0,
      lastUpdated: 'Just now'
    };

    setShipments((prev) => [newShipment, ...prev]);
    logAudit('Created Shipment', `${newId} (${newShipment.customerName})`);
    
    // Add notification
    const newNotif: AppNotification = {
      id: `NOTIF-${Date.now()}`,
      title: 'New Shipment Dispatched',
      message: `Shipment ${newId} created for ${newShipment.customerName} bound for ${newShipment.destination.city}.`,
      severity: 'Informational',
      category: 'Shipment',
      timestamp: 'Just now',
      read: false,
      entityId: newId
    };
    setNotifications((prev) => [newNotif, ...prev]);

    showToast({
      type: 'success',
      title: 'Shipment Created',
      message: `Shipment ${newId} booked and staged for dispatch.`
    });

    return newId;
  };

  const updateShipmentStatus = (id: string, status: ShipmentStatus, note?: string) => {
    setShipments((prev) =>
      prev.map((s) => {
        if (s.id !== id) return s;
        const updatedNotes = note ? [note, ...s.notes] : s.notes;
        const progress = status === 'Delivered' ? 100 : status === 'Out for Delivery' ? 85 : s.progressPercent;
        return {
          ...s,
          status,
          progressPercent: progress,
          notes: updatedNotes,
          lastUpdated: 'Just now'
        };
      })
    );
    logAudit(`Updated Status to ${status}`, id);
    showToast({
      type: 'info',
      title: `Shipment ${id} Updated`,
      message: `Status transitioned to ${status}.`
    });
  };

  const updateShipmentProgress = (id: string, progressPercent: number) => {
    setShipments((prev) =>
      prev.map((s) => {
        if (s.id !== id) return s;
        const bounded = Math.min(100, Math.max(0, Math.round(progressPercent)));
        const newStatus: ShipmentStatus =
          bounded >= 100
            ? 'Delivered'
            : bounded >= 80
            ? 'Out for Delivery'
            : s.status === 'Delayed' || s.status === 'Exception'
            ? s.status
            : 'In Transit';
        return {
          ...s,
          progressPercent: bounded,
          status: newStatus,
          lastUpdated: 'Just now'
        };
      })
    );
  };

  const assignDriverAndVehicle = (shipmentId: string, driverId: string, vehicleId: string) => {
    const driver = drivers.find((d) => d.id === driverId);
    const vehicle = vehicles.find((v) => v.id === vehicleId);

    setShipments((prev) =>
      prev.map((s) => {
        if (s.id !== shipmentId) return s;
        return {
          ...s,
          driverName: driver ? driver.name : s.driverName,
          driverPhone: driver ? driver.phone : s.driverPhone,
          vehicleId: vehicle ? vehicle.id : s.vehicleId,
          vehiclePlate: vehicle ? vehicle.licensePlate : s.vehiclePlate,
          status: 'Assigned' as ShipmentStatus,
          notes: [`Assigned driver ${driver?.name} and vehicle ${vehicle?.id}`, ...s.notes],
          lastUpdated: 'Just now'
        };
      })
    );

    if (driver) {
      setDrivers((prev) =>
        prev.map((d) => (d.id === driverId ? { ...d, assignedShipmentId: shipmentId, status: 'On Duty' } : d))
      );
    }

    if (vehicle) {
      setVehicles((prev) =>
        prev.map((v) => (v.id === vehicleId ? { ...v, activeShipmentId: shipmentId, status: 'Active' } : v))
      );
    }

    logAudit('Assigned Driver & Vehicle', `${shipmentId} -> ${driver?.name} / ${vehicle?.id}`);
    showToast({
      type: 'success',
      title: 'Dispatch Assigned',
      message: `Driver ${driver?.name} and vehicle ${vehicle?.id} assigned to shipment ${shipmentId}.`
    });
  };

  const addShipmentNote = (shipmentId: string, noteText: string) => {
    setShipments((prev) =>
      prev.map((s) => {
        if (s.id !== shipmentId) return s;
        return {
          ...s,
          notes: [noteText, ...s.notes],
          lastUpdated: 'Just now'
        };
      })
    );
    showToast({
      type: 'info',
      title: 'Note Logged',
      message: `Operational note added to ${shipmentId}.`
    });
  };

  const completeProofOfDelivery = (shipmentId: string, signatureDataUrl: string, receiverName: string) => {
    const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 16);
    setShipments((prev) =>
      prev.map((s) => {
        if (s.id !== shipmentId) return s;
        return {
          ...s,
          status: 'Delivered',
          progressPercent: 100,
          podSignature: `Signed by: ${receiverName}`,
          deliveredAt: timestamp,
          notes: [`Delivered to ${receiverName}. Digital signature & biometric confirmation recorded.`, ...s.notes],
          lastUpdated: 'Just now'
        };
      })
    );

    logAudit('Proof of Delivery Captured', `${shipmentId} (Signed by ${receiverName})`);

    const newDoc: DocumentItem = {
      id: `DOC-POD-${Date.now().toString().slice(-4)}`,
      title: `Electronic Proof of Delivery - ${shipmentId}`,
      type: 'Proof of Delivery',
      shipmentId,
      uploadedAt: timestamp,
      fileSize: '650 KB',
      format: 'PDF'
    };
    setDocuments((prev) => [newDoc, ...prev]);

    showToast({
      type: 'success',
      title: 'Delivery Confirmed',
      message: `Proof of Delivery for ${shipmentId} captured and stored.`
    });
  };

  const addOrder = (orderData: Omit<Order, 'id' | 'createdAt'>): string => {
    const nextSeq = 8496 + orders.length;
    const newId = `ORD-${nextSeq}`;
    const newOrder: Order = {
      ...orderData,
      id: newId,
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16)
    };

    setOrders((prev) => [newOrder, ...prev]);
    logAudit('Created Order', `${newId} for ${newOrder.customerName}`);
    showToast({
      type: 'success',
      title: 'Order Generated',
      message: `Order ${newId} recorded with total value of Rs ${(newOrder.totalValue).toLocaleString()}.`
    });
    return newId;
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
    logAudit(`Updated Order Status to ${status}`, orderId);
    showToast({
      type: 'info',
      title: 'Order Status Updated',
      message: `Order ${orderId} marked as ${status}.`
    });
  };

  const convertOrderToShipment = (orderId: string): string => {
    const order = orders.find((o) => o.id === orderId);
    if (!order) return '';

    const newShipmentId = `LGX-2026-${Math.floor(10000 + Math.random() * 90000)}`;
    const newShipment: Shipment = {
      id: newShipmentId,
      trackingNumber: `TRK-LGX-${Math.floor(1000 + Math.random() * 9000)}-${order.id.slice(-2)}`,
      customerName: order.customerName,
      customerId: order.customerId,
      origin: {
        city: 'Mumbai',
        facility: 'Mumbai West Cargo Gateway (WH-01)',
        address: 'Sector 3, Kalamboli Logistics Park, Navi Mumbai',
        coordinates: { x: 22, y: 55 }
      },
      destination: {
        city: order.destinationCity,
        facility: `${order.destinationCity} Distribution Terminal`,
        address: order.deliveryAddress,
        coordinates: { x: 50, y: 50 }
      },
      currentLocation: {
        city: 'Mumbai',
        facility: 'Mumbai West Cargo Gateway (WH-01)',
        address: 'Outbound Bay 4',
        coordinates: { x: 22, y: 55 }
      },
      status: 'Assigned',
      priority: order.priority === 'High' ? 'Priority' : 'Standard',
      carrier: 'LogiCore Express Fleet',
      vehicleId: 'TRK-2042',
      vehiclePlate: 'MH-12-QX-4019',
      driverName: 'Amit Patil',
      driverPhone: '+91 94220 89114',
      eta: order.expectedDelivery,
      departureTime: new Date().toISOString().replace('T', ' ').substring(0, 16),
      packageType: 'Standard Pallets',
      weightKg: order.totalWeightKg,
      volumeM3: Math.round(order.totalWeightKg / 250) || 4,
      cargoDescription: `Order ${order.id} - ${order.items?.length || 1} SKUs`,
      progressPercent: 5,
      stops: [],
      lastUpdated: 'Just now',
      estimatedCost: Math.round(order.totalValue * 0.08),
      notes: [`Generated from purchase order ${order.id}. Scheduled for dispatch.`]
    };

    setShipments((prev) => [newShipment, ...prev]);
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: 'Shipped' } : o))
    );
    logAudit('Order Converted to Consignment', `${orderId} -> ${newShipmentId}`);
    showToast({
      type: 'success',
      title: 'Consignment Generated',
      message: `Order ${orderId} converted to Shipment ${newShipmentId}.`
    });
    return newShipmentId;
  };

  const updateInventoryStock = (itemId: string, newQuantity: number) => {
    setInventory((prev) =>
      prev.map((item) => {
        if (item.id !== itemId) return item;
        const status =
          newQuantity <= item.reorderThreshold * 0.5
            ? 'Critical Reorder'
            : newQuantity <= item.reorderThreshold
            ? 'Low Stock'
            : 'In Stock';
        return { ...item, quantityOnHand: newQuantity, status };
      })
    );
    showToast({
      type: 'success',
      title: 'Stock Updated',
      message: `Inventory stock updated to ${newQuantity} units.`
    });
  };

  const addRoute = (routeData: Omit<RouteInfo, 'id'>): string => {
    const nextNum = routes.length + 101;
    const newId = `RT-${nextNum}`;
    const newRoute: RouteInfo = {
      ...routeData,
      id: newId
    };

    setRoutes((prev) => [newRoute, ...prev]);
    logAudit('Custom Freight Corridor Created', `${newRoute.name} (${newRoute.code})`);
    showToast({
      type: 'success',
      title: 'Corridor Added',
      message: `Corridor ${newRoute.code} (${newRoute.originCity} → ${newRoute.destCity}) created with ₹${newRoute.tollsCost} toll profile.`
    });
    return newId;
  };

  const addVehicle = (vehicleData: Omit<Vehicle, 'id'> & { id?: string }): string => {
    const nextNum = 2040 + vehicles.length + 1;
    const newId = vehicleData.id?.trim() || `TRK-${nextNum}`;
    const newVehicle: Vehicle = {
      ...vehicleData,
      id: newId,
      utilizationPercent: vehicleData.utilizationPercent ?? 0,
      lastServiceDate: vehicleData.lastServiceDate || new Date().toISOString().substring(0, 10),
      nextServiceDueKm: vehicleData.nextServiceDueKm || ((vehicleData.odometerKm || 0) + 10000)
    };

    setVehicles((prev) => [newVehicle, ...prev]);

    if (newVehicle.currentDriverId) {
      setDrivers((prev) =>
        prev.map((d) =>
          d.id === newVehicle.currentDriverId
            ? { ...d, currentVehicleId: newId, status: 'On Duty' }
            : d
        )
      );
    }

    logAudit('Vehicle Enrolled in Fleet Registry', `${newId} (${newVehicle.model} - ${newVehicle.licensePlate})`);
    showToast({
      type: 'success',
      title: 'Vehicle Registered',
      message: `Unit ${newId} (${newVehicle.model}) successfully enrolled in fleet active roster.`
    });
    return newId;
  };

  const addDriver = (driverData: Omit<Driver, 'id'> & { id?: string }): string => {
    const nextNum = 100 + drivers.length + 1;
    const newId = driverData.id?.trim() || `DRV-${nextNum}`;
    const newDriver: Driver = {
      ...driverData,
      id: newId,
      safetyScore: driverData.safetyScore ?? 98,
      totalTripsCompleted: driverData.totalTripsCompleted ?? 0,
      onTimeDeliveryRate: driverData.onTimeDeliveryRate ?? 99.2,
      hoursLoggedToday: driverData.hoursLoggedToday ?? 0.0
    };

    setDrivers((prev) => [newDriver, ...prev]);

    if (newDriver.currentVehicleId) {
      setVehicles((prev) =>
        prev.map((v) =>
          v.id === newDriver.currentVehicleId
            ? { ...v, currentDriverId: newId, currentDriverName: newDriver.name, status: 'Active' }
            : v
        )
      );
    }

    logAudit('Commercial Driver Onboarded', `${newId} - ${newDriver.name} (License: ${newDriver.licenseNumber})`);
    showToast({
      type: 'success',
      title: 'Driver Onboarded',
      message: `${newDriver.name} onboarded. License ${newDriver.licenseNumber} verified.`
    });
    return newId;
  };

  const updateVehicleStatus = (vehicleId: string, status: Vehicle['status']) => {
    setVehicles((prev) =>
      prev.map((v) => (v.id === vehicleId ? { ...v, status } : v))
    );
    logAudit(`Vehicle Status Changed to ${status}`, vehicleId);
    showToast({
      type: 'info',
      title: 'Fleet Status Updated',
      message: `Vehicle ${vehicleId} set to ${status}.`
    });
  };

  const updateWarehouseCapacity = (warehouseId: string, utilizedPercent: number) => {
    setWarehouses((prev) =>
      prev.map((w) => (w.id === warehouseId ? { ...w, utilizedCapacityPercent: utilizedPercent } : w))
    );
  };

  const markInvoicePaid = (invoiceId: string) => {
    const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 16);
    setInvoices((prev) =>
      prev.map((inv) => (inv.id === invoiceId ? { ...inv, status: 'Paid', paidAt: timestamp, paymentMethod: 'Corporate Electronic Transfer' } : inv))
    );
    logAudit('Invoice Marked Paid', invoiceId);
    showToast({
      type: 'success',
      title: 'Invoice Settled',
      message: `Invoice ${invoiceId} marked as Paid.`
    });
  };

  const updateInvoiceStatus = (invoiceId: string, status: Invoice['status']) => {
    const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 16);
    setInvoices((prev) =>
      prev.map((inv) =>
        inv.id === invoiceId
          ? {
              ...inv,
              status,
              ...(status === 'Paid' ? { paidAt: timestamp, paymentMethod: 'Corporate Electronic Transfer' } : {})
            }
          : inv
      )
    );
    logAudit(`Invoice Status Updated to ${status}`, invoiceId);
    showToast({
      type: 'info',
      title: 'Invoice Status Updated',
      message: `Invoice ${invoiceId} marked as ${status}.`
    });
  };

  const addProcurementOrder = (poData: Omit<ProcurementOrder, 'id' | 'orderDate'>): string => {
    const nextSeq = 3030 + procurement.length;
    const newId = `PO-${nextSeq}`;
    const newPO: ProcurementOrder = {
      ...poData,
      id: newId,
      orderDate: new Date().toISOString().split('T')[0]
    };
    setProcurement((prev) => [newPO, ...prev]);
    logAudit('Created Purchase Requisition', newId);
    showToast({
      type: 'success',
      title: 'Purchase Order Issued',
      message: `Purchase order ${newId} issued to ${poData.supplierName}.`
    });
    return newId;
  };

  const updateProcurementOrderStatus = (id: string, status: ProcurementOrder['status']) => {
    setProcurement((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status } : p))
    );
    logAudit(`Updated PO Status to ${status}`, id);
    showToast({
      type: 'info',
      title: 'Procurement Status Updated',
      message: `PO ${id} status updated to ${status}.`
    });
  };

  const updateReturnStatus = (returnId: string, status: ReturnRequest['status']) => {
    setReturns((prev) =>
      prev.map((r) => (r.id === returnId ? { ...r, status } : r))
    );
    showToast({
      type: 'info',
      title: 'Return Status Updated',
      message: `RMA request ${returnId} updated to ${status}.`
    });
  };

  const createReturnRequest = (params: {
    shipmentId: string;
    customerName: string;
    itemsCount: number;
    reason: string;
  }) => {
    const validReason: ReturnRequest['reason'] =
      params.reason === 'Wrong item received' ||
      params.reason === 'Defective' ||
      params.reason === 'Customer change of mind'
        ? params.reason
        : 'Damaged in transit';

    const newReturn: ReturnRequest = {
      id: `RMA-${Math.floor(700 + Math.random() * 299)}`,
      originalShipmentId: params.shipmentId,
      customerName: params.customerName,
      sku: 'SKU-RMA-UNIT',
      productName: 'Commercial Consignment Cargo',
      reason: validReason,
      status: 'Requested',
      quantity: params.itemsCount,
      requestedDate: new Date().toISOString().substring(0, 10),
      assignedWarehouse: 'WH-01'
    };
    setReturns((prev) => [newReturn, ...prev]);
    logAudit('Return RMA Created', `${newReturn.id} (${params.customerName})`);
    showToast({
      type: 'success',
      title: 'RMA Ticket Filed',
      message: `Return request ${newReturn.id} filed for ${params.customerName}.`
    });
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    showToast({
      type: 'info',
      title: 'Notifications Cleared',
      message: 'All notifications marked as read.'
    });
  };

  const dismissNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <LogisticsContext.Provider
      value={{
        isAuthenticated,
        currentUser,
        login,
        logout,
        activeRole,
        setActiveRole,
        activeView,
        setActiveView,
        shipments,
        orders,
        vehicles,
        drivers,
        warehouses,
        inventory,
        customers,
        suppliers,
        procurement,
        procurementOrders: procurement,
        invoices,
        returns,
        returnRequests: returns,
        notifications,
        routes,
        documents,
        auditLogs,
        selectedShipmentId,
        setSelectedShipmentId,
        trackingShipmentId,
        setTrackingShipmentId,
        addShipment,
        updateShipmentStatus,
        updateShipmentProgress,
        assignDriverAndVehicle,
        addShipmentNote,
        completeProofOfDelivery,
        addOrder,
        updateOrderStatus,
        convertOrderToShipment,
        addRoute,
        addVehicle,
        addDriver,
        updateVehicleStatus,
        updateWarehouseCapacity,
        updateInventoryStock,
        markInvoicePaid,
        updateInvoiceStatus,
        addProcurementOrder,
        updateProcurementOrderStatus,
        updateReturnStatus,
        createReturnRequest,
        markNotificationRead,
        markAllNotificationsRead,
        dismissNotification,
        isGlobalSearchOpen,
        setIsGlobalSearchOpen,
        showLandingPage,
        setShowLandingPage,
        isCreateShipmentModalOpen,
        setIsCreateShipmentModalOpen,
        isCreateCorridorModalOpen,
        setIsCreateCorridorModalOpen,
        isAddVehicleModalOpen,
        setIsAddVehicleModalOpen,
        isOnboardDriverModalOpen,
        setIsOnboardDriverModalOpen,
        isSidebarCollapsed,
        setIsSidebarCollapsed,
        toasts,
        showToast,
        removeToast
      }}
    >
      {children}
    </LogisticsContext.Provider>
  );
};

export const useLogistics = () => {
  const context = useContext(LogisticsContext);
  if (!context) {
    throw new Error('useLogistics must be used within a LogisticsProvider');
  }
  return context;
};
