import React from 'react';
import { ShipmentStatus, VehicleStatus, DriverStatus, OrderStatus, InvoiceStatus, NotificationSeverity } from '../../types';

interface StatusBadgeProps {
  status: ShipmentStatus | VehicleStatus | DriverStatus | OrderStatus | InvoiceStatus | NotificationSeverity | string;
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs font-medium';

  const getStyle = () => {
    switch (status) {
      // Shipments & Orders
      case 'Delivered':
      case 'Completed':
      case 'Paid':
      case 'Approved':
      case 'Optimal':
        return 'bg-emerald-50 text-emerald-700 border border-emerald-200';
      
      case 'In Transit':
      case 'Shipped':
      case 'Processing':
      case 'On Duty':
      case 'Active':
        return 'bg-blue-50 text-blue-700 border border-blue-200';

      case 'Out for Delivery':
        return 'bg-indigo-50 text-indigo-700 border border-indigo-200';

      case 'Assigned':
      case 'Confirmed':
      case 'Available':
      case 'Normal':
        return 'bg-teal-50 text-teal-700 border border-teal-200';

      case 'Pending':
      case 'At Warehouse':
      case 'Draft':
      case 'Requested':
      case 'Attention':
        return 'bg-amber-50 text-amber-700 border border-amber-200';

      case 'Delayed':
      case 'Warning':
      case 'Low Stock':
      case 'Maintenance':
      case 'Congested':
      case 'High Volume':
        return 'bg-orange-50 text-orange-700 border border-orange-200';

      case 'Exception':
      case 'Critical':
      case 'Critical Reorder':
      case 'Overdue':
      case 'At Capacity':
      case 'Cancelled':
      case 'Rejected':
      case 'Out of Service':
        return 'bg-rose-50 text-rose-700 border border-rose-200';

      case 'Resting':
      case 'Off Duty':
        return 'bg-slate-100 text-slate-700 border border-slate-200';

      default:
        return 'bg-slate-50 text-slate-600 border border-slate-200';
    }
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full whitespace-nowrap leading-none ${sizeClasses} ${getStyle()}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70 shrink-0" />
      {status}
    </span>
  );
};
