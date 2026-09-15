import { AuthUser, UserRole } from '../types';

export interface RoleConfig {
  role: UserRole;
  user: AuthUser;
  defaultView: string;
  portalName: string;
  tagline: string;
  badgeColor: string;
  allowedViews: string[];
}

export const ROLE_CONFIGS: Record<UserRole, RoleConfig> = {
  Executive: {
    role: 'Executive',
    portalName: 'Executive C-Suite Portal',
    tagline: 'High-level financial margin, throughput KPIs, and executive BI',
    badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    defaultView: 'executive-dashboard',
    user: {
      id: 'USR-EXEC-01',
      name: 'Vikram Singhania',
      email: 'vikram.singhania@logicore.com',
      role: 'Executive',
      title: 'Chief Operating Officer',
      organization: 'LogiCore Global Holdings',
      avatarText: 'VS'
    },
    allowedViews: ['executive-dashboard', 'enterprise-suite', 'analytics', 'customers', 'suppliers', 'invoices', 'shipments', 'routes', 'documents', 'settings']
  },
  Operations: {
    role: 'Operations',
    portalName: 'Operations Command Center',
    tagline: 'Real-time dispatch control, active bottlenecks, and incident resolution',
    badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
    defaultView: 'operations-dashboard',
    user: {
      id: 'USR-OPS-02',
      name: 'Priya Sharma',
      email: 'priya.sharma@logicore.com',
      role: 'Operations',
      title: 'VP of Freight Operations',
      organization: 'National Central Dispatch',
      avatarText: 'PS'
    },
    allowedViews: ['operations-dashboard', 'enterprise-suite', 'shipments', 'tracking', 'orders', 'routes', 'fleet', 'warehouses', 'inventory', 'notifications', 'documents']
  },
  'Logistics Manager': {
    role: 'Logistics Manager',
    portalName: 'Logistics Planning Portal',
    tagline: 'Freight corridors, inter-modal distribution, and lead-time optimization',
    badgeColor: 'bg-cyan-50 text-cyan-700 border-cyan-200',
    defaultView: 'logistics-dashboard',
    user: {
      id: 'USR-LOG-03',
      name: 'Rajesh Nair',
      email: 'rajesh.nair@logicore.com',
      role: 'Logistics Manager',
      title: 'Lead Logistics Architect',
      organization: 'Supply Chain Network Operations',
      avatarText: 'RN'
    },
    allowedViews: ['logistics-dashboard', 'enterprise-suite', 'orders', 'shipments', 'tracking', 'routes', 'warehouses', 'inventory', 'analytics', 'documents']
  },
  'Fleet Manager': {
    role: 'Fleet Manager',
    portalName: 'Fleet & Telematics Console',
    tagline: 'Vehicle health telematics, driver rosters, FASTag tolls, and fuel efficiency',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    defaultView: 'fleet-dashboard',
    user: {
      id: 'USR-FLT-04',
      name: 'Amit Patel',
      email: 'amit.patel@logicore.com',
      role: 'Fleet Manager',
      title: 'Fleet Superintendent & Assets',
      organization: 'Heavy Transport Logistics Div.',
      avatarText: 'AP'
    },
    allowedViews: ['fleet-dashboard', 'enterprise-suite', 'fleet', 'drivers', 'tracking', 'routes', 'notifications']
  },
  'Warehouse Supervisor': {
    role: 'Warehouse Supervisor',
    portalName: 'Fulfillment & Dock Terminal',
    tagline: 'Bay scheduling, pallet throughput, inventory slotting, and cold-chain logs',
    badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
    defaultView: 'warehouse-dashboard',
    user: {
      id: 'USR-WH-05',
      name: 'Sunita Rao',
      email: 'sunita.rao@logicore.com',
      role: 'Warehouse Supervisor',
      title: 'Hub Terminal Director (WH-01)',
      organization: 'Mumbai Port Fulfillment Center',
      avatarText: 'SR',
      facility: 'WH-01 Mumbai Port Hub'
    },
    allowedViews: ['warehouse-dashboard', 'enterprise-suite', 'warehouses', 'inventory', 'procurement', 'shipments', 'returns']
  },
  Driver: {
    role: 'Driver',
    portalName: 'Commercial Driver Mobile Terminal',
    tagline: 'Turn-by-turn route dispatch, Hours of Service (HOS), and digital POD signature capture',
    badgeColor: 'bg-orange-50 text-orange-700 border-orange-200',
    defaultView: 'driver-dashboard',
    user: {
      id: 'USR-DRV-06',
      name: 'Amit Patil',
      email: 'amit.patil@drivers.logicore.com',
      role: 'Driver',
      title: 'Senior Commercial Pilot',
      organization: 'Commercial Haulage Unit TRK-2042',
      avatarText: 'AP'
    },
    allowedViews: ['driver-dashboard', 'shipments', 'routes', 'documents', 'notifications']
  },
  Customer: {
    role: 'Customer',
    portalName: 'Enterprise Customer Portal',
    tagline: 'Consignment milestone tracking, e-BOL retrieval, invoice settlement, and RMA',
    badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
    defaultView: 'customer-dashboard',
    user: {
      id: 'USR-CST-07',
      name: 'Ananya Desai',
      email: 'ananya.desai@northstarretail.com',
      role: 'Customer',
      title: 'Head of Strategic Procurement',
      organization: 'NorthStar Retail',
      avatarText: 'AD'
    },
    allowedViews: ['customer-dashboard', 'shipments', 'tracking', 'orders', 'invoices', 'returns', 'documents']
  },
  'System Admin': {
    role: 'System Admin',
    portalName: 'Security & Systems Administration',
    tagline: 'Tenant governance, cryptographic audit logs, and infrastructure compliance',
    badgeColor: 'bg-slate-100 text-slate-800 border-slate-300',
    defaultView: 'admin-dashboard',
    user: {
      id: 'USR-ADM-08',
      name: 'Arjun Mehta',
      email: 'arjun.mehta@logicore.com',
      role: 'System Admin',
      title: 'Principal Security Architect',
      organization: 'Platform Infrastructure & Compliance',
      avatarText: 'AM'
    },
    allowedViews: [
      'admin-dashboard',
      'enterprise-suite',
      'settings',
      'notifications',
      'documents',
      'analytics',
      'shipments',
      'tracking',
      'orders',
      'routes',
      'fleet',
      'drivers',
      'warehouses',
      'inventory',
      'customers',
      'suppliers',
      'procurement',
      'invoices',
      'returns'
    ]
  }
};
