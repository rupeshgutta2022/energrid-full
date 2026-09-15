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
  DocumentItem
} from './types';

export const INITIAL_CUSTOMERS: Customer[] = [
  {
    id: 'CST-401',
    name: 'Sarah Jenkins',
    companyName: 'NorthStar Retail',
    industry: 'Omnichannel FMCG',
    email: 'logistics@northstarretail.com',
    phone: '+91 22 4920 1820',
    address: 'Plot 48, Bandra Kurla Complex, Mumbai',
    activeShipmentsCount: 14,
    totalShipmentsCount: 382,
    lifetimeRevenue: 4825000,
    paymentTerms: 'Net 30',
    creditLimit: 10000000,
    creditUsed: 3420000,
    slaOnTimeTarget: 96.5
  },
  {
    id: 'CST-402',
    name: 'Arun Chopra',
    companyName: 'Meridian Foods',
    industry: 'Cold-chain & Agribusiness',
    email: 'supply@meridianfoods.in',
    phone: '+91 20 6710 4400',
    address: 'GIDC Food Park, Chakan, Pune',
    activeShipmentsCount: 8,
    totalShipmentsCount: 245,
    lifetimeRevenue: 3190000,
    paymentTerms: 'Net 15',
    creditLimit: 6000000,
    creditUsed: 1850000,
    slaOnTimeTarget: 98.0
  },
  {
    id: 'CST-403',
    name: 'Elena Rostova',
    companyName: 'Apex Manufacturing',
    industry: 'Precision Auto Parts',
    email: 'dispatch@apexmanufacturing.com',
    phone: '+91 40 2311 8890',
    address: 'HI-TEC City Industrial Area, Hyderabad',
    activeShipmentsCount: 19,
    totalShipmentsCount: 512,
    lifetimeRevenue: 8430000,
    paymentTerms: 'Net 45',
    creditLimit: 15000000,
    creditUsed: 7120000,
    slaOnTimeTarget: 95.0
  },
  {
    id: 'CST-404',
    name: 'Kunal Singhania',
    companyName: 'UrbanMart',
    industry: 'E-commerce Superstore',
    email: 'fulfillment@urbanmart.co',
    phone: '+91 80 4120 7700',
    address: 'Outer Ring Road, Marathahalli, Bengaluru',
    activeShipmentsCount: 26,
    totalShipmentsCount: 890,
    lifetimeRevenue: 12840000,
    paymentTerms: 'Net 30',
    creditLimit: 20000000,
    creditUsed: 11400000,
    slaOnTimeTarget: 97.2
  },
  {
    id: 'CST-405',
    name: 'Marcus Vance',
    companyName: 'Horizon Electronics',
    industry: 'Consumer Technology',
    email: 'shipping@horizonelec.com',
    phone: '+91 11 4988 3310',
    address: 'Okhla Industrial Phase III, New Delhi',
    activeShipmentsCount: 11,
    totalShipmentsCount: 420,
    lifetimeRevenue: 6920000,
    paymentTerms: 'Net 30',
    creditLimit: 12000000,
    creditUsed: 4600000,
    slaOnTimeTarget: 96.0
  }
];

export const INITIAL_WAREHOUSES: Warehouse[] = [
  {
    id: 'WH-01',
    name: 'Mumbai West Cargo Gateway',
    code: 'BOM-01',
    city: 'Mumbai',
    state: 'Maharashtra',
    totalCapacitySqFt: 250000,
    utilizedCapacityPercent: 78,
    inboundDocks: 12,
    inboundActiveDocks: 9,
    outboundDocks: 16,
    outboundActiveDocks: 14,
    managerName: 'Devendra Kulkarni',
    activeWorkers: 64,
    dailyThroughputPallets: 1840,
    temperatureControlled: true,
    status: 'Normal'
  },
  {
    id: 'WH-02',
    name: 'Pune Industrial Logistics Hub',
    code: 'PNQ-02',
    city: 'Pune',
    state: 'Maharashtra',
    totalCapacitySqFt: 180000,
    utilizedCapacityPercent: 64,
    inboundDocks: 8,
    inboundActiveDocks: 5,
    outboundDocks: 10,
    outboundActiveDocks: 7,
    managerName: 'Sneha Jadhav',
    activeWorkers: 42,
    dailyThroughputPallets: 960,
    temperatureControlled: true,
    status: 'Normal'
  },
  {
    id: 'WH-03',
    name: 'Hyderabad Central Freight Center',
    code: 'HYD-03',
    city: 'Hyderabad',
    state: 'Telangana',
    totalCapacitySqFt: 220000,
    utilizedCapacityPercent: 91,
    inboundDocks: 10,
    inboundActiveDocks: 10,
    outboundDocks: 12,
    outboundActiveDocks: 12,
    managerName: 'Kishore Rao',
    activeWorkers: 58,
    dailyThroughputPallets: 1520,
    temperatureControlled: false,
    status: 'At Capacity'
  },
  {
    id: 'WH-04',
    name: 'Bengaluru Distribution Terminal',
    code: 'BLR-04',
    city: 'Bengaluru',
    state: 'Karnataka',
    totalCapacitySqFt: 310000,
    utilizedCapacityPercent: 72,
    inboundDocks: 14,
    inboundActiveDocks: 8,
    outboundDocks: 18,
    outboundActiveDocks: 13,
    managerName: 'Ramesh Sundaram',
    activeWorkers: 85,
    dailyThroughputPallets: 2100,
    temperatureControlled: true,
    status: 'Normal'
  },
  {
    id: 'WH-05',
    name: 'Delhi NCR Air & Land Port',
    code: 'DEL-05',
    city: 'Gurugram',
    state: 'Haryana',
    totalCapacitySqFt: 280000,
    utilizedCapacityPercent: 84,
    inboundDocks: 12,
    inboundActiveDocks: 11,
    outboundDocks: 14,
    outboundActiveDocks: 11,
    managerName: 'Gurpreet Singh',
    activeWorkers: 71,
    dailyThroughputPallets: 1790,
    temperatureControlled: true,
    status: 'High Volume'
  }
];

export const INITIAL_VEHICLES: Vehicle[] = [
  {
    id: 'TRK-2041',
    model: 'BharatBenz 2823R HD',
    type: 'Heavy Truck',
    status: 'Maintenance',
    licensePlate: 'MH-04-AZ-8921',
    currentDriverId: 'DRV-101',
    currentDriverName: 'Rajesh Mehta',
    fuelPercent: 32,
    odometerKm: 142850,
    currentLocationCity: 'Pune',
    capacityKg: 18000,
    utilizationPercent: 0,
    lastServiceDate: '2026-06-12',
    nextServiceDueKm: 140000,
    insuranceExpiry: '2026-11-20',
    fitnessExpiry: '2027-02-15'
  },
  {
    id: 'TRK-2042',
    model: 'Tata Signa 4825.TK',
    type: 'Heavy Truck',
    status: 'Active',
    licensePlate: 'MH-12-QX-4019',
    currentDriverId: 'DRV-102',
    currentDriverName: 'Amit Patil',
    fuelPercent: 76,
    odometerKm: 89400,
    currentLocationCity: 'In Transit (Solapur)',
    capacityKg: 24000,
    utilizationPercent: 88,
    lastServiceDate: '2026-08-01',
    nextServiceDueKm: 100000,
    insuranceExpiry: '2027-04-10',
    fitnessExpiry: '2027-04-10',
    activeShipmentId: 'LGX-2026-10482'
  },
  {
    id: 'TRK-2043',
    model: 'Mahindra Furio 14 Thermo',
    type: 'Refrigerated Van',
    status: 'Active',
    licensePlate: 'KA-01-MJ-6701',
    currentDriverId: 'DRV-103',
    currentDriverName: 'Priya Nair',
    fuelPercent: 84,
    odometerKm: 56320,
    currentLocationCity: 'In Transit (Hosur)',
    capacityKg: 8500,
    utilizationPercent: 92,
    lastServiceDate: '2026-08-15',
    nextServiceDueKm: 65000,
    insuranceExpiry: '2027-05-18',
    fitnessExpiry: '2027-06-22',
    activeShipmentId: 'LGX-2026-10483'
  },
  {
    id: 'TRK-2044',
    model: 'Eicher Pro 3019',
    type: 'Medium Cargo',
    status: 'Available',
    licensePlate: 'TS-09-UB-1124',
    fuelPercent: 91,
    odometerKm: 72100,
    currentLocationCity: 'Hyderabad',
    capacityKg: 12000,
    utilizationPercent: 0,
    lastServiceDate: '2026-07-28',
    nextServiceDueKm: 85000,
    insuranceExpiry: '2027-01-30',
    fitnessExpiry: '2027-03-12'
  },
  {
    id: 'TRK-2045',
    model: 'Tata Ultra T.7 Electric',
    type: 'Electric Delivery Van',
    status: 'Active',
    licensePlate: 'DL-1C-AA-9942',
    currentDriverId: 'DRV-105',
    currentDriverName: 'Vikram Verma',
    fuelPercent: 68,
    odometerKm: 28400,
    currentLocationCity: 'Delhi Hub',
    capacityKg: 3800,
    utilizationPercent: 82,
    lastServiceDate: '2026-08-20',
    nextServiceDueKm: 40000,
    insuranceExpiry: '2027-08-15',
    fitnessExpiry: '2028-08-15',
    activeShipmentId: 'LGX-2026-10484'
  },
  {
    id: 'TRK-2046',
    model: 'Ashok Leyland BOSS 1415',
    type: 'Medium Cargo',
    status: 'Active',
    licensePlate: 'MH-02-EE-3291',
    currentDriverId: 'DRV-106',
    currentDriverName: 'Kavita Singh',
    fuelPercent: 54,
    odometerKm: 99120,
    currentLocationCity: 'In Transit (Nashik)',
    capacityKg: 9500,
    utilizationPercent: 74,
    lastServiceDate: '2026-07-10',
    nextServiceDueKm: 105000,
    insuranceExpiry: '2026-12-05',
    fitnessExpiry: '2027-01-18',
    activeShipmentId: 'LGX-2026-10485'
  },
  {
    id: 'TRK-2047',
    model: 'Volvo FMX 460',
    type: 'Heavy Truck',
    status: 'Available',
    licensePlate: 'KA-05-AB-7709',
    fuelPercent: 95,
    odometerKm: 112000,
    currentLocationCity: 'Bengaluru DC',
    capacityKg: 28000,
    utilizationPercent: 0,
    lastServiceDate: '2026-08-10',
    nextServiceDueKm: 125000,
    insuranceExpiry: '2027-03-01',
    fitnessExpiry: '2027-03-01'
  },
  {
    id: 'TRK-2048',
    model: 'BharatBenz 1617R',
    type: 'Medium Cargo',
    status: 'Available',
    licensePlate: 'TS-07-JK-5431',
    fuelPercent: 88,
    odometerKm: 61400,
    currentLocationCity: 'Hyderabad',
    capacityKg: 10500,
    utilizationPercent: 0,
    lastServiceDate: '2026-07-22',
    nextServiceDueKm: 75000,
    insuranceExpiry: '2026-10-18',
    fitnessExpiry: '2027-02-14'
  }
];

export const INITIAL_DRIVERS: Driver[] = [
  {
    id: 'DRV-101',
    name: 'Rajesh Mehta',
    phone: '+91 98201 44521',
    email: 'rajesh.mehta@logicoresp.internal',
    licenseNumber: 'DL-MH04-2015-004812',
    licenseExpiry: '2028-04-15',
    status: 'Available',
    currentVehicleId: 'TRK-2041',
    safetyScore: 94,
    totalTripsCompleted: 312,
    onTimeDeliveryRate: 95.8,
    hoursLoggedToday: 2.5,
    currentCity: 'Pune'
  },
  {
    id: 'DRV-102',
    name: 'Amit Patil',
    phone: '+91 94220 89114',
    email: 'amit.patil@logicoresp.internal',
    licenseNumber: 'DL-MH12-2017-092113',
    licenseExpiry: '2029-09-30',
    status: 'On Duty',
    currentVehicleId: 'TRK-2042',
    assignedShipmentId: 'LGX-2026-10482',
    safetyScore: 98,
    totalTripsCompleted: 448,
    onTimeDeliveryRate: 97.4,
    hoursLoggedToday: 6.2,
    currentCity: 'Solapur'
  },
  {
    id: 'DRV-103',
    name: 'Priya Nair',
    phone: '+91 97401 33209',
    email: 'priya.nair@logicoresp.internal',
    licenseNumber: 'DL-KA01-2019-109482',
    licenseExpiry: '2030-01-20',
    status: 'On Duty',
    currentVehicleId: 'TRK-2043',
    assignedShipmentId: 'LGX-2026-10483',
    safetyScore: 99,
    totalTripsCompleted: 280,
    onTimeDeliveryRate: 98.9,
    hoursLoggedToday: 4.8,
    currentCity: 'Hosur'
  },
  {
    id: 'DRV-104',
    name: 'Sanjay Sharma',
    phone: '+91 98110 54320',
    email: 'sanjay.sharma@logicoresp.internal',
    licenseNumber: 'DL-TS09-2016-084711',
    licenseExpiry: '2027-11-12',
    status: 'Available',
    safetyScore: 91,
    totalTripsCompleted: 395,
    onTimeDeliveryRate: 93.2,
    hoursLoggedToday: 0.0,
    currentCity: 'Hyderabad'
  },
  {
    id: 'DRV-105',
    name: 'Vikram Verma',
    phone: '+91 99100 88219',
    email: 'vikram.verma@logicoresp.internal',
    licenseNumber: 'DL-DL1C-2018-003921',
    licenseExpiry: '2029-06-18',
    status: 'On Duty',
    currentVehicleId: 'TRK-2045',
    assignedShipmentId: 'LGX-2026-10484',
    safetyScore: 96,
    totalTripsCompleted: 194,
    onTimeDeliveryRate: 96.5,
    hoursLoggedToday: 5.1,
    currentCity: 'Delhi NCR'
  },
  {
    id: 'DRV-106',
    name: 'Kavita Singh',
    phone: '+91 98211 76092',
    email: 'kavita.singh@logicoresp.internal',
    licenseNumber: 'DL-MH02-2020-058912',
    licenseExpiry: '2031-03-24',
    status: 'On Duty',
    currentVehicleId: 'TRK-2046',
    assignedShipmentId: 'LGX-2026-10485',
    safetyScore: 97,
    totalTripsCompleted: 215,
    onTimeDeliveryRate: 96.8,
    hoursLoggedToday: 3.9,
    currentCity: 'Nashik'
  },
  {
    id: 'DRV-107',
    name: 'Tariq Khan',
    phone: '+91 96500 12890',
    email: 'tariq.khan@logicoresp.internal',
    licenseNumber: 'DL-KA05-2014-001298',
    licenseExpiry: '2028-08-10',
    status: 'Resting',
    safetyScore: 93,
    totalTripsCompleted: 520,
    onTimeDeliveryRate: 94.7,
    hoursLoggedToday: 8.0,
    currentCity: 'Bengaluru'
  }
];

export const INITIAL_SHIPMENTS: Shipment[] = [
  {
    id: 'LGX-2026-10482',
    trackingNumber: 'TRK-LGX-8942-01',
    customerName: 'NorthStar Retail',
    customerId: 'CST-401',
    origin: {
      city: 'Mumbai',
      facility: 'Mumbai West Cargo Gateway (WH-01)',
      address: 'Sector 3, Kalamboli Logistics Park, Navi Mumbai',
      coordinates: { x: 22, y: 55 }
    },
    destination: {
      city: 'Hyderabad',
      facility: 'Hyderabad Central Freight Center (WH-03)',
      address: 'Plot 19, Shamshabad Airport Cargo Zone, Hyderabad',
      coordinates: { x: 48, y: 62 }
    },
    currentLocation: {
      city: 'Solapur Express Corridor',
      facility: 'Highway Transit Checkpoint 4',
      address: 'NH-65 Km Milestone 312, Maharashtra',
      coordinates: { x: 35, y: 58 }
    },
    status: 'Delayed',
    priority: 'Priority',
    carrier: 'LogiCore Express Fleet',
    vehicleId: 'TRK-2042',
    vehiclePlate: 'MH-12-QX-4019',
    driverName: 'Amit Patil',
    driverPhone: '+91 94220 89114',
    departureTime: '2026-09-08 04:30',
    eta: '2026-09-09 16:45',
    packageType: 'Euro Pallets (FMCG Assorted)',
    weightKg: 14200,
    volumeM3: 42.5,
    cargoDescription: 'Dry packaged foods, tea blends, hygiene paper rolls',
    progressPercent: 58,
    temperatureControlled: false,
    lastUpdated: '12 mins ago',
    estimatedCost: 78500,
    notes: [
      'Dispatched on schedule from Mumbai Gateway.',
      'Encountered 40-minute delay near Pune bypass due to bridge resurfacing.',
      'Driver Amit Patil verified seal integrity at toll plaza 08.'
    ],
    stops: [
      {
        id: 'STP-01',
        name: 'Mumbai West Cargo Gateway',
        city: 'Mumbai',
        type: 'Pickup',
        scheduledTime: '2026-09-08 04:00',
        actualTime: '2026-09-08 04:22',
        status: 'Completed',
        coordinates: { x: 22, y: 55 }
      },
      {
        id: 'STP-02',
        name: 'Pune Industrial Hub',
        city: 'Pune',
        type: 'Transit Hub',
        scheduledTime: '2026-09-08 08:30',
        actualTime: '2026-09-08 09:12',
        status: 'Completed',
        notes: 'Cross-dock inspection passed. +38 min congestion delay logged.',
        coordinates: { x: 28, y: 57 }
      },
      {
        id: 'STP-03',
        name: 'Solapur Mid-Corridor Waypoint',
        city: 'Solapur',
        type: 'Transit Hub',
        scheduledTime: '2026-09-08 17:00',
        status: 'In Progress',
        coordinates: { x: 37, y: 60 }
      },
      {
        id: 'STP-04',
        name: 'Hyderabad Central Freight Center',
        city: 'Hyderabad',
        type: 'Delivery',
        scheduledTime: '2026-09-09 16:45',
        status: 'Pending',
        coordinates: { x: 48, y: 62 }
      }
    ]
  },
  {
    id: 'LGX-2026-10483',
    trackingNumber: 'TRK-LGX-8943-02',
    customerName: 'Meridian Foods',
    customerId: 'CST-402',
    origin: {
      city: 'Pune',
      facility: 'Pune Industrial Logistics Hub (WH-02)',
      address: 'Cold Storage Wing B, Chakan GIDC, Pune',
      coordinates: { x: 28, y: 57 }
    },
    destination: {
      city: 'Bengaluru',
      facility: 'Bengaluru Distribution Terminal (WH-04)',
      address: 'Electronic City Phase 2 Cold Chain Bay, Bengaluru',
      coordinates: { x: 42, y: 78 }
    },
    currentLocation: {
      city: 'Dharwad Bypass',
      facility: 'NH-48 Golden Quadrilateral',
      address: 'NH-48 Hubballi-Dharwad Toll Point',
      coordinates: { x: 34, y: 68 }
    },
    status: 'In Transit',
    priority: 'Critical',
    carrier: 'LogiCore ThermoFleet',
    vehicleId: 'TRK-2043',
    vehiclePlate: 'KA-01-MJ-6701',
    driverName: 'Priya Nair',
    driverPhone: '+91 97401 33209',
    departureTime: '2026-09-08 06:15',
    eta: '2026-09-09 03:00',
    packageType: 'Insulated Refrigerated Containers',
    weightKg: 6800,
    volumeM3: 24.0,
    cargoDescription: 'Dairy yogurts, organic farm cheeses, vaccine cultures',
    progressPercent: 62,
    temperatureControlled: true,
    targetTempC: 3.5,
    currentTempC: 3.6,
    lastUpdated: '4 mins ago',
    estimatedCost: 64200,
    notes: [
      'Refrigeration unit set to 3.5 deg C. Telematics pinging continuously.',
      'Driver logged mandatory rest stop at Kolhapur.',
      'Current ambient temp 31 deg C; reef box holds steady at 3.6 deg C.'
    ],
    stops: [
      {
        id: 'STP-11',
        name: 'Pune Industrial Logistics Hub',
        city: 'Pune',
        type: 'Pickup',
        scheduledTime: '2026-09-08 06:00',
        actualTime: '2026-09-08 06:15',
        status: 'Completed',
        coordinates: { x: 28, y: 57 }
      },
      {
        id: 'STP-12',
        name: 'Kolhapur Thermo Inspection Post',
        city: 'Kolhapur',
        type: 'Transit Hub',
        scheduledTime: '2026-09-08 11:30',
        actualTime: '2026-09-08 11:28',
        status: 'Completed',
        coordinates: { x: 30, y: 63 }
      },
      {
        id: 'STP-13',
        name: 'Belagavi Crossdock Station',
        city: 'Belagavi',
        type: 'Transit Hub',
        scheduledTime: '2026-09-08 15:45',
        actualTime: '2026-09-08 15:50',
        status: 'Completed',
        coordinates: { x: 32, y: 67 }
      },
      {
        id: 'STP-14',
        name: 'Bengaluru Distribution Terminal',
        city: 'Bengaluru',
        type: 'Delivery',
        scheduledTime: '2026-09-09 03:00',
        status: 'Pending',
        coordinates: { x: 42, y: 78 }
      }
    ]
  },
  {
    id: 'LGX-2026-10484',
    trackingNumber: 'TRK-LGX-8944-03',
    customerName: 'Horizon Electronics',
    customerId: 'CST-405',
    origin: {
      city: 'Gurugram',
      facility: 'Delhi NCR Air & Land Port (WH-05)',
      address: 'Expressway Cargo Complex, Sector 74, Gurugram',
      coordinates: { x: 41, y: 22 }
    },
    destination: {
      city: 'New Delhi',
      facility: 'Nehru Place Tech Retail Hub',
      address: 'Kalka Ji Commercial Center, New Delhi',
      coordinates: { x: 43, y: 24 }
    },
    currentLocation: {
      city: 'Delhi Ring Road',
      facility: 'Dhaula Kuan Junction',
      address: 'Vande Mataram Marg, New Delhi',
      coordinates: { x: 42, y: 23 }
    },
    status: 'Out for Delivery',
    priority: 'Express',
    carrier: 'LogiCore EV EcoFleet',
    vehicleId: 'TRK-2045',
    vehiclePlate: 'DL-1C-AA-9942',
    driverName: 'Vikram Verma',
    driverPhone: '+91 99100 88219',
    departureTime: '2026-09-08 08:30',
    eta: '2026-09-08 14:15',
    packageType: 'High-Value Secured Crates',
    weightKg: 2400,
    volumeM3: 9.8,
    cargoDescription: 'Flagship smartphones, OLED panels, server blade chips',
    progressPercent: 88,
    temperatureControlled: false,
    lastUpdated: '1 min ago',
    estimatedCost: 19800,
    notes: [
      'High-security biometric seals active.',
      'Driver received recipient verification OTP token.'
    ],
    stops: [
      {
        id: 'STP-21',
        name: 'Delhi NCR Air & Land Port',
        city: 'Gurugram',
        type: 'Pickup',
        scheduledTime: '2026-09-08 08:00',
        actualTime: '2026-09-08 08:30',
        status: 'Completed',
        coordinates: { x: 41, y: 22 }
      },
      {
        id: 'STP-22',
        name: 'Nehru Place Tech Retail Hub',
        city: 'New Delhi',
        type: 'Delivery',
        scheduledTime: '2026-09-08 14:15',
        status: 'In Progress',
        coordinates: { x: 43, y: 24 }
      }
    ]
  },
  {
    id: 'LGX-2026-10485',
    trackingNumber: 'TRK-LGX-8945-04',
    customerName: 'Apex Manufacturing',
    customerId: 'CST-403',
    origin: {
      city: 'Mumbai',
      facility: 'Mumbai West Cargo Gateway (WH-01)',
      address: 'JNPT Port Container Depot, Navi Mumbai',
      coordinates: { x: 22, y: 55 }
    },
    destination: {
      city: 'Nashik',
      facility: 'Nashik Auto Component Plant 3',
      address: 'Satpur MIDC, Trimbak Road, Nashik',
      coordinates: { x: 25, y: 48 }
    },
    currentLocation: {
      city: 'Kasara Ghat Sector',
      facility: 'Thal Ghat Mountain Pass',
      address: 'NH-160 Mumbai-Agra Highway',
      coordinates: { x: 24, y: 51 }
    },
    status: 'In Transit',
    priority: 'Standard',
    carrier: 'LogiCore Freightline',
    vehicleId: 'TRK-2046',
    vehiclePlate: 'MH-02-EE-3291',
    driverName: 'Kavita Singh',
    driverPhone: '+91 98211 76092',
    departureTime: '2026-09-08 07:00',
    eta: '2026-09-08 15:30',
    packageType: 'Heavy Metal Pallets & Castings',
    weightKg: 8900,
    volumeM3: 16.2,
    cargoDescription: 'Precision CNC transmission gears & machined brake disks',
    progressPercent: 70,
    temperatureControlled: false,
    lastUpdated: '18 mins ago',
    estimatedCost: 32000,
    notes: [
      'Cleared Kasara ghat ascent safely with pilot convoy.',
      'Speed limited to 40 km/h due to incline curve.'
    ],
    stops: [
      {
        id: 'STP-31',
        name: 'Mumbai West Cargo Gateway',
        city: 'Mumbai',
        type: 'Pickup',
        scheduledTime: '2026-09-08 06:45',
        actualTime: '2026-09-08 07:02',
        status: 'Completed',
        coordinates: { x: 22, y: 55 }
      },
      {
        id: 'STP-32',
        name: 'Kasara Logistics Waypoint',
        city: 'Kasara',
        type: 'Transit Hub',
        scheduledTime: '2026-09-08 11:00',
        actualTime: '2026-09-08 10:55',
        status: 'Completed',
        coordinates: { x: 23, y: 52 }
      },
      {
        id: 'STP-33',
        name: 'Nashik Auto Component Plant 3',
        city: 'Nashik',
        type: 'Delivery',
        scheduledTime: '2026-09-08 15:30',
        status: 'Pending',
        coordinates: { x: 25, y: 48 }
      }
    ]
  },
  {
    id: 'LGX-2026-10486',
    trackingNumber: 'TRK-LGX-8946-05',
    customerName: 'UrbanMart',
    customerId: 'CST-404',
    origin: {
      city: 'Bengaluru',
      facility: 'Bengaluru Distribution Terminal (WH-04)',
      address: 'Plot 10, Bommasandra Industrial Area, Bengaluru',
      coordinates: { x: 42, y: 78 }
    },
    destination: {
      city: 'Hyderabad',
      facility: 'Hyderabad Central Freight Center (WH-03)',
      address: 'Cargo Satellite Hub, Medchal, Hyderabad',
      coordinates: { x: 48, y: 62 }
    },
    currentLocation: {
      city: 'Bengaluru DC',
      facility: 'Outbound Dock 14',
      address: 'Bommasandra Warehouse, Bengaluru',
      coordinates: { x: 42, y: 78 }
    },
    status: 'At Warehouse',
    priority: 'Standard',
    carrier: 'LogiCore Express Fleet',
    vehicleId: 'TRK-2047',
    vehiclePlate: 'KA-05-AB-7709',
    driverName: 'Tariq Khan',
    driverPhone: '+91 96500 12890',
    departureTime: '2026-09-08 20:00',
    eta: '2026-09-09 11:00',
    packageType: 'Mixed Parcel Master Cartons',
    weightKg: 18500,
    volumeM3: 65.0,
    cargoDescription: 'Apparel bundles, household electronics, kitchenware',
    progressPercent: 12,
    temperatureControlled: false,
    lastUpdated: '25 mins ago',
    estimatedCost: 92000,
    notes: [
      'Staged at Outbound Dock 14.',
      'Pallet loading sequence 80% finished.',
      'Driver Tariq Khan scheduled for evening departure window.'
    ],
    stops: [
      {
        id: 'STP-41',
        name: 'Bengaluru Distribution Terminal',
        city: 'Bengaluru',
        type: 'Pickup',
        scheduledTime: '2026-09-08 19:30',
        status: 'In Progress',
        coordinates: { x: 42, y: 78 }
      },
      {
        id: 'STP-42',
        name: 'Anantapur Transit Inspection',
        city: 'Anantapur',
        type: 'Transit Hub',
        scheduledTime: '2026-09-09 01:30',
        status: 'Pending',
        coordinates: { x: 44, y: 71 }
      },
      {
        id: 'STP-43',
        name: 'Hyderabad Central Freight Center',
        city: 'Hyderabad',
        type: 'Delivery',
        scheduledTime: '2026-09-09 11:00',
        status: 'Pending',
        coordinates: { x: 48, y: 62 }
      }
    ]
  },
  {
    id: 'LGX-2026-10476',
    trackingNumber: 'TRK-LGX-8936-09',
    customerName: 'NorthStar Retail',
    customerId: 'CST-401',
    origin: {
      city: 'Pune',
      facility: 'Pune Industrial Logistics Hub',
      address: 'Talegaon MIDC, Pune',
      coordinates: { x: 28, y: 57 }
    },
    destination: {
      city: 'Mumbai',
      facility: 'NorthStar Central Megastore',
      address: 'Lower Parel Logistics Bay, Mumbai',
      coordinates: { x: 22, y: 55 }
    },
    currentLocation: {
      city: 'Mumbai',
      facility: 'Customer Dock',
      address: 'Lower Parel, Mumbai',
      coordinates: { x: 22, y: 55 }
    },
    status: 'Delivered',
    priority: 'Express',
    carrier: 'LogiCore CityDrop',
    vehicleId: 'TRK-2041',
    vehiclePlate: 'MH-04-AZ-8921',
    driverName: 'Rajesh Mehta',
    driverPhone: '+91 98201 44521',
    departureTime: '2026-09-07 09:00',
    eta: '2026-09-07 14:00',
    deliveredAt: '2026-09-07 13:42',
    packageType: 'Plastic Totes on Dolly',
    weightKg: 4200,
    volumeM3: 14.5,
    cargoDescription: 'Fast fashion seasonal collection items',
    progressPercent: 100,
    temperatureControlled: false,
    lastUpdated: 'Yesterday',
    estimatedCost: 28500,
    podSignature: 'Verified by Store Receiving Mgr (Sunil Rao)',
    notes: [
      'Delivered ahead of schedule by 18 minutes.',
      'Digital POD signature and seal inspection photograph captured.'
    ],
    stops: [
      {
        id: 'STP-51',
        name: 'Pune Industrial Logistics Hub',
        city: 'Pune',
        type: 'Pickup',
        scheduledTime: '2026-09-07 09:00',
        actualTime: '2026-09-07 09:05',
        status: 'Completed',
        coordinates: { x: 28, y: 57 }
      },
      {
        id: 'STP-52',
        name: 'NorthStar Central Megastore',
        city: 'Mumbai',
        type: 'Delivery',
        scheduledTime: '2026-09-07 14:00',
        actualTime: '2026-09-07 13:42',
        status: 'Completed',
        coordinates: { x: 22, y: 55 }
      }
    ]
  },
  {
    id: 'LGX-2026-10487',
    trackingNumber: 'TRK-LGX-8947-06',
    customerName: 'Apex Manufacturing',
    customerId: 'CST-403',
    origin: {
      city: 'Hyderabad',
      facility: 'Hyderabad Central Freight Center (WH-03)',
      address: 'Shamshabad Air Cargo, Hyderabad',
      coordinates: { x: 48, y: 62 }
    },
    destination: {
      city: 'Gurugram',
      facility: 'Delhi NCR Air & Land Port (WH-05)',
      address: 'Expressway Cargo Complex, Gurugram',
      coordinates: { x: 41, y: 22 }
    },
    currentLocation: {
      city: 'Hyderabad',
      facility: 'Dispatch Yard',
      address: 'Loading Dock 08, Shamshabad',
      coordinates: { x: 48, y: 62 }
    },
    status: 'Pending',
    priority: 'Standard',
    carrier: 'LogiCore InterState Line',
    vehicleId: 'TRK-2048',
    vehiclePlate: 'TS-07-JK-5431',
    driverName: 'Sanjay Sharma',
    driverPhone: '+91 98110 54320',
    departureTime: '2026-09-09 06:00',
    eta: '2026-09-11 18:00',
    packageType: 'Heavy Machined Castings',
    weightKg: 11500,
    volumeM3: 28.0,
    cargoDescription: 'Turbine brackets and hydraulic cylinder valves',
    progressPercent: 0,
    temperatureControlled: false,
    lastUpdated: '45 mins ago',
    estimatedCost: 114000,
    notes: ['Awaiting customs bonded manifest clearance for interstate highway passage.'],
    stops: []
  },
  {
    id: 'LGX-2026-10488',
    trackingNumber: 'TRK-LGX-8948-07',
    customerName: 'Meridian Foods',
    customerId: 'CST-402',
    origin: {
      city: 'Mumbai',
      facility: 'Mumbai West Cargo Gateway',
      address: 'JNPT Cold Staging Facility, Navi Mumbai',
      coordinates: { x: 22, y: 55 }
    },
    destination: {
      city: 'Bengaluru',
      facility: 'Bengaluru Distribution Terminal',
      address: 'Bommasandra Warehouse, Bengaluru',
      coordinates: { x: 42, y: 78 }
    },
    currentLocation: {
      city: 'Satara Waypoint',
      facility: 'Cold-chain Checkpoint 2',
      address: 'NH-48 Satara Bypass',
      coordinates: { x: 29, y: 60 }
    },
    status: 'Exception',
    priority: 'Critical',
    carrier: 'LogiCore ThermoFleet',
    vehicleId: 'TRK-2043',
    vehiclePlate: 'KA-01-MJ-6701',
    driverName: 'Priya Nair',
    driverPhone: '+91 97401 33209',
    departureTime: '2026-09-08 02:00',
    eta: '2026-09-09 08:00',
    packageType: 'Frozen Seafood Crates',
    weightKg: 7400,
    volumeM3: 19.5,
    cargoDescription: 'Grade-A frozen shrimp export consignments',
    progressPercent: 44,
    temperatureControlled: true,
    targetTempC: -18.0,
    currentTempC: -14.2,
    lastUpdated: '8 mins ago',
    estimatedCost: 86000,
    notes: [
      'EXCEPTION ALERT: Telematics logged secondary door sensor breach.',
      'Compartment temperature rose from -18C to -14.2C over past 30 mins.',
      'Control desk contacted driver Priya Nair to inspect auxiliary generator.'
    ],
    stops: []
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ORD-8491',
    customerName: 'NorthStar Retail',
    customerId: 'CST-401',
    createdAt: '2026-09-07 14:20',
    expectedDelivery: '2026-09-09 18:00',
    status: 'Shipped',
    destinationCity: 'Hyderabad',
    paymentTerms: 'Net 30',
    shipmentId: 'LGX-2026-10482',
    totalValue: 342000,
    items: [
      { sku: 'FMCG-TEA-001', name: 'Assam Gold CTC Tea 1kg Pack (Carton of 24)', quantity: 150, unitPrice: 850, weightKg: 3600 },
      { sku: 'FMCG-OIL-004', name: 'Cold-Pressed Sunflower Oil 5L Can', quantity: 200, unitPrice: 720, weightKg: 1900 },
      { sku: 'FMCG-SNK-012', name: 'Roasted Almond Crunch 500g Pouch', quantity: 400, unitPrice: 380, weightKg: 800 }
    ]
  },
  {
    id: 'ORD-8492',
    customerName: 'Meridian Foods',
    customerId: 'CST-402',
    createdAt: '2026-09-07 18:45',
    expectedDelivery: '2026-09-09 04:00',
    status: 'Shipped',
    destinationCity: 'Bengaluru',
    paymentTerms: 'Net 15',
    shipmentId: 'LGX-2026-10483',
    totalValue: 489000,
    items: [
      { sku: 'CLD-YOG-101', name: 'Greek Organic Yogurt 400g Tub (Case 12)', quantity: 300, unitPrice: 620, weightKg: 1440 },
      { sku: 'CLD-CHS-205', name: 'Aged Artisan Cheddar Wheels (10kg)', quantity: 80, unitPrice: 3800, weightKg: 800 }
    ]
  },
  {
    id: 'ORD-8493',
    customerName: 'Horizon Electronics',
    customerId: 'CST-405',
    createdAt: '2026-09-08 06:10',
    expectedDelivery: '2026-09-08 16:00',
    status: 'Processing',
    destinationCity: 'New Delhi',
    paymentTerms: 'Net 30',
    shipmentId: 'LGX-2026-10484',
    totalValue: 1250000,
    items: [
      { sku: 'ELC-PHN-902', name: 'Horizon Pro 16 Smartphone (512GB)', quantity: 120, unitPrice: 7500, weightKg: 180 },
      { sku: 'ELC-DSP-401', name: 'UltraFine 4K IPS Panel Component', quantity: 45, unitPrice: 7800, weightKg: 450 }
    ]
  },
  {
    id: 'ORD-8494',
    customerName: 'Apex Manufacturing',
    customerId: 'CST-403',
    createdAt: '2026-09-08 09:30',
    expectedDelivery: '2026-09-10 12:00',
    status: 'Confirmed',
    destinationCity: 'Nashik',
    paymentTerms: 'Net 45',
    shipmentId: 'LGX-2026-10485',
    totalValue: 840000,
    items: [
      { sku: 'IND-GRB-771', name: 'Helical Heavy-Duty Pinion Gearset', quantity: 60, unitPrice: 9500, weightKg: 4200 },
      { sku: 'IND-BRK-330', name: 'Ventilated Disc Brake Assembly (Pair)', quantity: 140, unitPrice: 1950, weightKg: 2800 }
    ]
  },
  {
    id: 'ORD-8495',
    customerName: 'UrbanMart',
    customerId: 'CST-404',
    createdAt: '2026-09-08 11:15',
    expectedDelivery: '2026-09-11 17:00',
    status: 'Ready to Ship',
    destinationCity: 'Hyderabad',
    paymentTerms: 'Net 30',
    shipmentId: 'LGX-2026-10486',
    totalValue: 690000,
    items: [
      { sku: 'RET-HOM-551', name: 'Cast Iron Induction Cookware Set', quantity: 85, unitPrice: 3200, weightKg: 1200 },
      { sku: 'RET-APP-884', name: 'Organic Cotton Linen Bedding King', quantity: 240, unitPrice: 1750, weightKg: 720 }
    ]
  }
];

export const INITIAL_INVENTORY: InventoryItem[] = [
  {
    id: 'INV-SKU-01',
    sku: 'FMCG-TEA-001',
    name: 'Assam Gold CTC Tea 1kg Pack',
    category: 'Food & Beverage',
    warehouseId: 'WH-01',
    warehouseName: 'Mumbai West Cargo Gateway',
    quantityOnHand: 1420,
    reorderLevel: 500,
    unitCost: 620,
    totalValue: 880400,
    bayLocation: 'Aisle 04 / Bay C-12',
    lastAudited: '2026-08-25',
    status: 'In Stock'
  },
  {
    id: 'INV-SKU-02',
    sku: 'CLD-YOG-101',
    name: 'Greek Organic Yogurt 400g Tub',
    category: 'Perishable Dairy',
    warehouseId: 'WH-02',
    warehouseName: 'Pune Industrial Logistics Hub',
    quantityOnHand: 180,
    reorderLevel: 300,
    unitCost: 450,
    totalValue: 81000,
    bayLocation: 'Cold Bay 02 / Shelf B',
    lastAudited: '2026-09-02',
    status: 'Low Stock'
  },
  {
    id: 'INV-SKU-03',
    sku: 'ELC-PHN-902',
    name: 'Horizon Pro 16 Smartphone (512GB)',
    category: 'High-Value Electronics',
    warehouseId: 'WH-05',
    warehouseName: 'Delhi NCR Air & Land Port',
    quantityOnHand: 480,
    reorderLevel: 150,
    unitCost: 56000,
    totalValue: 26880000,
    bayLocation: 'Vault Sec-A / Bin 8',
    lastAudited: '2026-09-05',
    status: 'In Stock'
  },
  {
    id: 'INV-SKU-04',
    sku: 'IND-GRB-771',
    name: 'Helical Heavy-Duty Pinion Gearset',
    category: 'Industrial Machinery',
    warehouseId: 'WH-03',
    warehouseName: 'Hyderabad Central Freight Center',
    quantityOnHand: 42,
    reorderLevel: 50,
    unitCost: 7800,
    totalValue: 327600,
    bayLocation: 'Heavy Rack H-09',
    lastAudited: '2026-08-19',
    status: 'Critical Reorder'
  },
  {
    id: 'INV-SKU-05',
    sku: 'RET-HOM-551',
    name: 'Cast Iron Induction Cookware Set',
    category: 'Home & Kitchen',
    warehouseId: 'WH-04',
    warehouseName: 'Bengaluru Distribution Terminal',
    quantityOnHand: 890,
    reorderLevel: 250,
    unitCost: 2200,
    totalValue: 1958000,
    bayLocation: 'Aisle 11 / Pallet 4',
    lastAudited: '2026-08-30',
    status: 'In Stock'
  }
];

export const INITIAL_SUPPLIERS: Supplier[] = [
  {
    id: 'SUP-101',
    name: 'Assam Valley Agro Co-operative',
    contactPerson: 'Bimal Baruah',
    email: 'procurement@assamvalleyagro.com',
    phone: '+91 361 245 9901',
    country: 'India',
    category: 'Raw Agrifood & Tea',
    rating: 4.8,
    onTimeLeadRate: 97.4,
    activePurchaseOrders: 3,
    status: 'Approved'
  },
  {
    id: 'SUP-102',
    name: 'Kirloskar Precision Forgings',
    contactPerson: 'Girish Kirloskar',
    email: 'b2b@kirloskarforgings.in',
    phone: '+91 20 2544 1120',
    country: 'India',
    category: 'Automotive Steel & Alloys',
    rating: 4.6,
    onTimeLeadRate: 94.2,
    activePurchaseOrders: 5,
    status: 'Approved'
  },
  {
    id: 'SUP-103',
    name: 'Foxconn Semi Technologies Hub',
    contactPerson: 'David Chen',
    email: 'dispatch.in@foxconntech.corp',
    phone: '+91 44 6712 8800',
    country: 'India / Taiwan',
    category: 'Microelectronics & SMT',
    rating: 4.9,
    onTimeLeadRate: 98.6,
    activePurchaseOrders: 2,
    status: 'Approved'
  },
  {
    id: 'SUP-104',
    name: 'Gujarat Dairy Producers Federation',
    contactPerson: 'Mansukh Bhai Patel',
    email: 'supplies@gujaratdairyfed.org',
    phone: '+91 2692 240 180',
    country: 'India',
    category: 'Cold-chain Dairy Base',
    rating: 4.4,
    onTimeLeadRate: 91.8,
    activePurchaseOrders: 4,
    status: 'Approved'
  }
];

export const INITIAL_PROCUREMENT: ProcurementOrder[] = [
  {
    id: 'PO-3029',
    supplierId: 'SUP-101',
    supplierName: 'Assam Valley Agro Co-operative',
    orderDate: '2026-09-02',
    expectedDate: '2026-09-12',
    destinationWarehouse: 'Mumbai West Cargo Gateway',
    status: 'In Transit',
    totalAmount: 1850000,
    itemCount: 4
  },
  {
    id: 'PO-3030',
    supplierId: 'SUP-102',
    supplierName: 'Kirloskar Precision Forgings',
    orderDate: '2026-09-05',
    expectedDate: '2026-09-16',
    destinationWarehouse: 'Pune Industrial Logistics Hub',
    status: 'Confirmed',
    totalAmount: 3420000,
    itemCount: 8
  },
  {
    id: 'PO-3031',
    supplierId: 'SUP-103',
    supplierName: 'Foxconn Semi Technologies Hub',
    orderDate: '2026-09-06',
    expectedDate: '2026-09-14',
    destinationWarehouse: 'Delhi NCR Air & Land Port',
    status: 'Issued',
    totalAmount: 7890000,
    itemCount: 2
  }
];

export const INITIAL_INVOICES: Invoice[] = [
  {
    id: 'INV-2026-901',
    shipmentId: 'LGX-2026-10476',
    customerId: 'CST-401',
    customerName: 'NorthStar Retail',
    issueDate: '2026-09-07',
    dueDate: '2026-10-07',
    subtotal: 28500,
    taxAmount: 5130,
    totalAmount: 33630,
    status: 'Paid',
    paidAt: '2026-09-08 10:15',
    paymentMethod: 'NEFT Direct Corporate'
  },
  {
    id: 'INV-2026-902',
    shipmentId: 'LGX-2026-10482',
    customerId: 'CST-401',
    customerName: 'NorthStar Retail',
    issueDate: '2026-09-08',
    dueDate: '2026-10-08',
    subtotal: 78500,
    taxAmount: 14130,
    totalAmount: 92630,
    status: 'Pending'
  },
  {
    id: 'INV-2026-903',
    shipmentId: 'LGX-2026-10483',
    customerId: 'CST-402',
    customerName: 'Meridian Foods',
    issueDate: '2026-09-08',
    dueDate: '2026-09-23',
    subtotal: 64200,
    taxAmount: 11556,
    totalAmount: 75756,
    status: 'Pending'
  },
  {
    id: 'INV-2026-889',
    shipmentId: 'LGX-2026-10410',
    customerId: 'CST-404',
    customerName: 'UrbanMart',
    issueDate: '2026-08-05',
    dueDate: '2026-09-05',
    subtotal: 112000,
    taxAmount: 20160,
    totalAmount: 132160,
    status: 'Overdue'
  }
];

export const INITIAL_RETURNS: ReturnRequest[] = [
  {
    id: 'RMA-771',
    originalShipmentId: 'LGX-2026-10460',
    customerName: 'NorthStar Retail',
    sku: 'FMCG-OIL-004',
    productName: 'Cold-Pressed Sunflower Oil 5L Can',
    quantity: 12,
    reason: 'Damaged in transit',
    status: 'In Transit to Hub',
    requestedDate: '2026-09-06',
    assignedWarehouse: 'Mumbai West Cargo Gateway'
  },
  {
    id: 'RMA-772',
    originalShipmentId: 'LGX-2026-10468',
    customerName: 'Horizon Electronics',
    sku: 'ELC-DSP-401',
    productName: 'UltraFine 4K IPS Panel Component',
    quantity: 2,
    reason: 'Defective',
    status: 'Inspected',
    requestedDate: '2026-09-07',
    assignedWarehouse: 'Delhi NCR Air & Land Port'
  },
  {
    id: 'RMA-773',
    originalShipmentId: 'LGX-2026-10472',
    customerName: 'Apex Manufacturing',
    sku: 'IND-BRK-330',
    productName: 'Ventilated Disc Brake Assembly (Pair)',
    quantity: 6,
    reason: 'Wrong item received',
    status: 'Requested',
    requestedDate: '2026-09-08',
    assignedWarehouse: 'Pune Industrial Logistics Hub'
  }
];

export const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'NOTIF-01',
    title: 'Shipment Delayed',
    message: 'Shipment LGX-2026-10482 is running 38 minutes late near Pune bypass.',
    severity: 'Warning',
    category: 'Shipment',
    timestamp: '14 mins ago',
    read: false,
    entityId: 'LGX-2026-10482'
  },
  {
    id: 'NOTIF-02',
    title: 'Scheduled Maintenance Due',
    message: 'Vehicle TRK-2041 is due for maintenance. Next service at 140,000 km reached.',
    severity: 'Attention',
    category: 'Fleet',
    timestamp: '42 mins ago',
    read: false,
    entityId: 'TRK-2041'
  },
  {
    id: 'NOTIF-03',
    title: 'Warehouse Capacity Threshold',
    message: 'Warehouse WH-03 (Hyderabad Central) has reached 91% capacity. Rerouting suggested.',
    severity: 'Critical',
    category: 'Warehouse',
    timestamp: '1 hour ago',
    read: false,
    entityId: 'WH-03'
  },
  {
    id: 'NOTIF-04',
    title: 'Delivery Confirmation Received',
    message: 'Delivery confirmation received for LGX-2026-10476 (NorthStar Retail). Signed by store manager.',
    severity: 'Informational',
    category: 'Shipment',
    timestamp: '2 hours ago',
    read: true,
    entityId: 'LGX-2026-10476'
  },
  {
    id: 'NOTIF-05',
    title: 'Cold-chain Temperature Breach',
    message: 'Shipment LGX-2026-10488 reported -14.2 deg C (target -18 deg C) on Satara bypass.',
    severity: 'Critical',
    category: 'Shipment',
    timestamp: '8 mins ago',
    read: false,
    entityId: 'LGX-2026-10488'
  }
];

export const INITIAL_ROUTES: RouteInfo[] = [
  {
    id: 'RT-101',
    code: 'BOM-PNQ-HYD',
    name: 'Western Deccan Express Freightway',
    originCity: 'Mumbai',
    destCity: 'Hyderabad',
    distanceKm: 710,
    avgDurationHours: 14.5,
    activeTrucks: 8,
    tollsCost: 3240,
    status: 'Optimal'
  },
  {
    id: 'RT-102',
    code: 'PNQ-BLR-48',
    name: 'NH-48 Golden Quadrilateral South Corridor',
    originCity: 'Pune',
    destCity: 'Bengaluru',
    distanceKm: 840,
    avgDurationHours: 16.0,
    activeTrucks: 12,
    tollsCost: 4180,
    status: 'Optimal'
  },
  {
    id: 'RT-103',
    code: 'DEL-NCR-METRO',
    name: 'Delhi NCR Inner Ring Freight Belt',
    originCity: 'Gurugram',
    destCity: 'New Delhi',
    distanceKm: 48,
    avgDurationHours: 2.2,
    activeTrucks: 5,
    tollsCost: 350,
    status: 'Congested'
  },
  {
    id: 'RT-104',
    code: 'BLR-HYD-44',
    name: 'NH-44 Hyderabad-Bengaluru Spine',
    originCity: 'Bengaluru',
    destCity: 'Hyderabad',
    distanceKm: 570,
    avgDurationHours: 10.5,
    activeTrucks: 9,
    tollsCost: 2600,
    status: 'Optimal'
  }
];

export const INITIAL_DOCUMENTS: DocumentItem[] = [
  {
    id: 'DOC-101',
    title: 'Bill of Lading - LGX-2026-10482',
    type: 'Bill of Lading',
    shipmentId: 'LGX-2026-10482',
    uploadedAt: '2026-09-08 04:22',
    fileSize: '412 KB',
    format: 'PDF'
  },
  {
    id: 'DOC-102',
    title: 'Proof of Delivery (Signed) - LGX-2026-10476',
    type: 'Proof of Delivery',
    shipmentId: 'LGX-2026-10476',
    uploadedAt: '2026-09-07 13:45',
    fileSize: '1.2 MB',
    format: 'PDF'
  },
  {
    id: 'DOC-103',
    title: 'Temperature Telematics Log - LGX-2026-10483',
    type: 'Inspection Certificate',
    shipmentId: 'LGX-2026-10483',
    uploadedAt: '2026-09-08 06:18',
    fileSize: '298 KB',
    format: 'PDF'
  },
  {
    id: 'DOC-104',
    title: 'Commercial Tax Invoice - INV-2026-901',
    type: 'Commercial Invoice',
    shipmentId: 'LGX-2026-10476',
    uploadedAt: '2026-09-07 14:00',
    fileSize: '540 KB',
    format: 'PDF'
  }
];

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'AUD-01',
    timestamp: '2026-09-08 12:20:11',
    user: 's.jenkins@northstarretail.com',
    action: 'Created Shipment Request',
    target: 'LGX-2026-10492',
    ipAddress: '14.139.12.89',
    status: 'Success'
  },
  {
    id: 'AUD-02',
    timestamp: '2026-09-08 11:45:02',
    user: 'operations.lead@logicoresp.internal',
    action: 'Reassigned Driver and Vehicle',
    target: 'DRV-102 / TRK-2042',
    ipAddress: '10.0.4.18',
    status: 'Success'
  },
  {
    id: 'AUD-03',
    timestamp: '2026-09-08 10:12:44',
    user: 'billing@logicoresp.internal',
    action: 'Payment Reconciled & Receipt Issued',
    target: 'INV-2026-901 (Rs 33,630)',
    ipAddress: '10.0.4.52',
    status: 'Success'
  },
  {
    id: 'AUD-04',
    timestamp: '2026-09-08 09:14:31',
    user: 'gateway.admin@logicoresp.internal',
    action: 'Dock Scheduling Capacity Override',
    target: 'WH-03 Dock 10 Outbound',
    ipAddress: '10.0.12.9',
    status: 'Warning'
  }
];
