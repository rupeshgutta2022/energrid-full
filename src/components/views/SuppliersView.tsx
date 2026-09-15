import React from 'react';
import { useLogistics } from '../../context/LogisticsContext';
import { DataTable } from '../common/DataTable';
import { Supplier } from '../../types';
import { Layers, Star, Plus } from 'lucide-react';

export const SuppliersView: React.FC = () => {
  const { suppliers, showToast } = useLogistics();

  const columns = [
    {
      key: 'name',
      header: 'Supplier Vendor',
      sortable: true,
      render: (s: Supplier) => (
        <div>
          <span className="font-bold text-slate-900 block">{s.name}</span>
          <span className="text-[10px] text-slate-400 font-mono">ID: {s.id}</span>
        </div>
      )
    },
    {
      key: 'category',
      header: 'Commodity Category',
      sortable: true,
      render: (s: Supplier) => <span className="text-slate-700 font-medium">{s.category}</span>
    },
    {
      key: 'contactPerson',
      header: 'Contact Person',
      render: (s: Supplier) => (
        <div>
          <span className="font-medium text-slate-800 block">{s.contactPerson}</span>
          <span className="text-[11px] text-slate-500">{s.email}</span>
        </div>
      )
    },
    {
      key: 'onTimeLeadRate',
      header: 'On-Time Lead Rate',
      sortable: true,
      render: (s: Supplier) => (
        <span className="font-semibold text-emerald-700">{s.onTimeLeadRate}%</span>
      )
    },
    {
      key: 'rating',
      header: 'Vendor Score',
      sortable: true,
      render: (s: Supplier) => (
        <div className="flex items-center gap-1 font-bold text-slate-900">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span>{s.rating} / 5.0</span>
        </div>
      )
    },
    {
      key: 'activePurchaseOrders',
      header: 'Active POs',
      sortable: true,
      render: (s: Supplier) => (
        <span className="font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full text-xs">
          {s.activePurchaseOrders} POs open
        </span>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Suppliers & Vendor Network</h1>
          <p className="text-xs text-slate-500 mt-1">
            Raw material vendors, component suppliers, lead times, quality audits, and procurement allocations.
          </p>
        </div>

        <button
          onClick={() =>
            showToast({
              type: 'info',
              title: 'Supplier Portal Ready',
              message: 'Vendor RFQ quotation submission portal active.'
            })
          }
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-2xs transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Onboard New Vendor</span>
        </button>
      </div>

      <DataTable
        data={suppliers}
        columns={columns}
        searchKey="name"
        searchPlaceholder="Search suppliers by vendor name, category..."
        exportFilename="logicore-suppliers-directory.csv"
      />
    </div>
  );
};
