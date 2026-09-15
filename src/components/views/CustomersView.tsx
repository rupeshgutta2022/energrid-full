import React, { useState } from 'react';
import { useLogistics } from '../../context/LogisticsContext';
import { DataTable } from '../common/DataTable';
import { Customer } from '../../types';
import { Drawer } from '../common/Drawer';
import {
  Briefcase,
  Mail,
  Phone,
  CheckCircle2,
  DollarSign,
  Plus
} from 'lucide-react';

export const CustomersView: React.FC = () => {
  const { customers, showToast } = useLogistics();
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  const columns = [
    {
      key: 'companyName',
      header: 'Company / Account',
      sortable: true,
      render: (c: Customer) => (
        <div>
          <span className="font-bold text-slate-900 block">{c.companyName}</span>
          <span className="text-[10px] text-slate-400">{c.industry}</span>
        </div>
      )
    },
    {
      key: 'name',
      header: 'Key Contact',
      sortable: true,
      render: (c: Customer) => (
        <div>
          <span className="font-medium text-slate-800 block">{c.name}</span>
          <span className="text-[11px] text-slate-500">{c.email}</span>
        </div>
      )
    },
    {
      key: 'slaOnTimeTarget',
      header: 'Contract SLA',
      sortable: true,
      render: (c: Customer) => (
        <span className="font-semibold text-emerald-600">{c.slaOnTimeTarget}%</span>
      )
    },
    {
      key: 'activeShipmentsCount',
      header: 'Active Consignments',
      sortable: true,
      render: (c: Customer) => (
        <span className="font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full text-xs">
          {c.activeShipmentsCount} in transit
        </span>
      )
    },
    {
      key: 'lifetimeRevenue',
      header: 'Lifetime Spend',
      sortable: true,
      render: (c: Customer) => (
        <span className="font-semibold text-slate-900">
          ₹{(c.lifetimeRevenue / 100000).toFixed(1)} Lakhs
        </span>
      )
    },
    {
      key: 'paymentTerms',
      header: 'Credit Terms',
      render: (c: Customer) => <span className="text-slate-700">{c.paymentTerms}</span>
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Key Customer Accounts & Master Agreements</h1>
          <p className="text-xs text-slate-500 mt-1">
            Enterprise trade accounts, SLA contractual terms, commercial credit lines, and shipment quotas.
          </p>
        </div>

        <button
          onClick={() =>
            showToast({
              type: 'info',
              title: 'Customer Onboarding',
              message: 'Enterprise Master Services Agreement (MSA) onboarding wizard ready.'
            })
          }
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-2xs transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Enterprise Account</span>
        </button>
      </div>

      <DataTable
        data={customers}
        columns={columns}
        searchKey="companyName"
        searchPlaceholder="Search customer accounts by name, industry..."
        onRowClick={(item) => setSelectedCustomer(item)}
        exportFilename="logicore-customers-registry.csv"
      />

      {/* Customer Drawer */}
      {selectedCustomer && (
        <Drawer
          isOpen={!!selectedCustomer}
          onClose={() => setSelectedCustomer(null)}
          title={selectedCustomer.companyName}
          subtitle={`Primary Contact: ${selectedCustomer.name} (${selectedCustomer.industry})`}
          footer={
            <button
              onClick={() => setSelectedCustomer(null)}
              className="px-3.5 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50"
            >
              Close
            </button>
          }
        >
          <div className="space-y-6 text-xs">
            {/* Credit Limits */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500 font-semibold uppercase text-[10px]">Credit Line</span>
                <span className="font-bold text-slate-900">
                  ₹{(selectedCustomer.creditUsed / 100000).toFixed(1)}L / ₹{(selectedCustomer.creditLimit / 100000).toFixed(1)}L
                </span>
              </div>
              <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 rounded-full"
                  style={{ width: `${(selectedCustomer.creditUsed / selectedCustomer.creditLimit) * 100}%` }}
                />
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold text-slate-900 uppercase text-[11px] tracking-wider">Account Specifications</h4>
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 space-y-2 text-slate-700">
                <div className="flex justify-between">
                  <span className="text-slate-500">Email:</span>
                  <span className="font-semibold">{selectedCustomer.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Phone:</span>
                  <span className="font-semibold">{selectedCustomer.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Address:</span>
                  <span className="font-semibold text-right">{selectedCustomer.address}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">SLA Requirement:</span>
                  <span className="font-semibold text-emerald-600">{selectedCustomer.slaOnTimeTarget}% guaranteed</span>
                </div>
              </div>
            </div>
          </div>
        </Drawer>
      )}
    </div>
  );
};
