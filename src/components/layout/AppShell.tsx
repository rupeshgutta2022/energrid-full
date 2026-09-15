import React from 'react';
import { useLogistics } from '../../context/LogisticsContext';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { MobileNav } from './MobileNav';
import { GlobalSearchModal } from '../common/GlobalSearchModal';
import { ToastContainer } from '../common/ToastContainer';
import { CreateShipmentModal } from '../views/CreateShipmentModal';
import { CreateCorridorModal } from '../views/CreateCorridorModal';
import { AddVehicleModal } from '../views/AddVehicleModal';
import { OnboardDriverModal } from '../views/OnboardDriverModal';

// Dashboards
import { ExecutiveDashboard } from '../dashboards/ExecutiveDashboard';
import { OperationsDashboard } from '../dashboards/OperationsDashboard';
import { LogisticsDashboard } from '../dashboards/LogisticsDashboard';
import { FleetDashboard } from '../dashboards/FleetDashboard';
import { WarehouseDashboard } from '../dashboards/WarehouseDashboard';
import { DriverDashboard } from '../dashboards/DriverDashboard';
import { CustomerPortal } from '../dashboards/CustomerPortal';
import { AdminDashboard } from '../dashboards/AdminDashboard';

// Views
import { ShipmentsView } from '../views/ShipmentsView';
import { LiveTrackingView } from '../views/LiveTrackingView';
import { OrdersView } from '../views/OrdersView';
import { RoutesView } from '../views/RoutesView';
import { DriversListView } from '../views/DriversListView';
import { WarehousesListView } from '../views/WarehousesListView';
import { InventoryView } from '../views/InventoryView';
import { CustomersView } from '../views/CustomersView';
import { SuppliersView } from '../views/SuppliersView';
import { ProcurementView } from '../views/ProcurementView';
import { InvoicesView } from '../views/InvoicesView';
import { ReturnsView } from '../views/ReturnsView';
import { AnalyticsView } from '../views/AnalyticsView';
import { NotificationsView } from '../views/NotificationsView';
import { DocumentsView } from '../views/DocumentsView';
import { SettingsView } from '../views/SettingsView';
import { EnterpriseSystemSuiteView } from '../views/EnterpriseSystemSuiteView';
import { LoginPortal } from '../auth/LoginPortal';
import { LogisticoLandingPage } from '../landing/LogisticoLandingPage';
import { RoleAccessRestricted } from '../common/RoleAccessRestricted';
import { ROLE_CONFIGS } from '../../data/authUsers';

export const AppShell: React.FC = () => {
  const { activeView, isAuthenticated, showLandingPage, activeRole } = useLogistics();

  // Show the interactive landing & sign-in page if not authenticated or explicitly visiting public site
  if (!isAuthenticated || showLandingPage) {
    return (
      <>
        <LogisticoLandingPage />
        <ToastContainer />
      </>
    );
  }

  const roleConfig = ROLE_CONFIGS[activeRole] || ROLE_CONFIGS['Operations'];
  const isViewAllowed = roleConfig.allowedViews.includes(activeView);

  const renderCurrentView = () => {
    // Enforce Role-Based Access Control (RBAC) security boundary
    if (!isViewAllowed) {
      return <RoleAccessRestricted attemptedView={activeView} />;
    }

    switch (activeView) {
      // 8 Core Dashboards
      case 'executive-dashboard':
        return <ExecutiveDashboard />;
      case 'operations-dashboard':
        return <OperationsDashboard />;
      case 'logistics-dashboard':
        return <LogisticsDashboard />;
      case 'fleet-dashboard':
        return <FleetDashboard />;
      case 'warehouse-dashboard':
        return <WarehouseDashboard />;
      case 'driver-dashboard':
        return <DriverDashboard />;
      case 'customer-dashboard':
        return <CustomerPortal />;
      case 'admin-dashboard':
        return <AdminDashboard />;

      // Operational Views
      case 'shipments':
        return <ShipmentsView />;
      case 'tracking':
        return <LiveTrackingView />;
      case 'orders':
        return <OrdersView />;
      case 'routes':
        return <RoutesView />;
      case 'fleet':
        return <FleetDashboard />;
      case 'drivers':
        return <DriversListView />;
      case 'warehouses':
        return <WarehousesListView />;
      case 'inventory':
        return <InventoryView />;
      case 'customers':
        return <CustomersView />;
      case 'suppliers':
        return <SuppliersView />;
      case 'procurement':
        return <ProcurementView />;
      case 'invoices':
        return <InvoicesView />;
      case 'returns':
        return <ReturnsView />;
      case 'analytics':
        return <AnalyticsView />;
      case 'notifications':
        return <NotificationsView />;
      case 'documents':
        return <DocumentsView />;
      case 'settings':
        return <SettingsView />;
      case 'enterprise-suite':
        return <EnterpriseSystemSuiteView />;

      default:
        return <OperationsDashboard />;
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-100/70 font-sans text-slate-800 antialiased">
      {/* Collapsible Sidebar for Desktop */}
      <Sidebar />

      {/* Main Content Area: Fills available screen width naturally */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        <Header />
        <MobileNav />

        {/* Scrollable Viewport with comfortable padding */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 pb-20 md:pb-8">
          <div className="w-full">
            {renderCurrentView()}
          </div>
        </main>
      </div>

      {/* Overlays & Modals */}
      <GlobalSearchModal />
      <CreateShipmentModal />
      <CreateCorridorModal />
      <AddVehicleModal />
      <OnboardDriverModal />
      <ToastContainer />
    </div>
  );
};
