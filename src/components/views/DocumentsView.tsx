import React from 'react';
import { useLogistics } from '../../context/LogisticsContext';
import { FileText, Download, CheckCircle2, ShieldCheck, Printer, Search } from 'lucide-react';

export const DocumentsView: React.FC = () => {
  const { shipments, showToast } = useLogistics();

  const documents = [
    {
      id: 'DOC-BOL-10480',
      title: 'Electronic Bill of Lading (e-BOL)',
      shipmentId: 'LGX-2026-10480',
      customer: 'Tata Motors Limited',
      type: 'Bill of Lading',
      date: '2026-09-08',
      status: 'Digitally Signed',
      size: '245 KB'
    },
    {
      id: 'DOC-EWB-10481',
      title: 'National GST E-Way Bill (NIC)',
      shipmentId: 'LGX-2026-10481',
      customer: 'Reliance Retail Ventures',
      type: 'E-Way Bill',
      date: '2026-09-08',
      status: 'Active (Valid 48h)',
      size: '180 KB'
    },
    {
      id: 'DOC-POD-10482',
      title: 'Proof of Delivery (POD) Certificate',
      shipmentId: 'LGX-2026-10482',
      customer: 'Mahindra Logistics',
      type: 'Proof of Delivery',
      date: '2026-09-08',
      status: 'Pending Signature',
      size: '120 KB'
    },
    {
      id: 'DOC-REEF-10483',
      title: 'Cold-Chain Temperature Excursion Audit Log',
      shipmentId: 'LGX-2026-10483',
      customer: 'Meridian Foods Ltd',
      type: 'Audit Log',
      date: '2026-09-08',
      status: 'Verified (2°C - 6°C)',
      size: '410 KB'
    },
    {
      id: 'DOC-INS-2026',
      title: 'Commercial Cargo Transit Insurance Cover',
      shipmentId: 'LGX-2026-10484',
      customer: 'Sun Pharma Distribution',
      type: 'Insurance Policy',
      date: '2026-09-07',
      status: 'Underwritten',
      size: '320 KB'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Digital Freight Documents & Compliance Vault</h1>
          <p className="text-xs text-slate-500 mt-1">
            Electronic Bills of Lading (e-BOL), E-Way Bills, dangerous goods declarations, and signed Proof of Delivery archives.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs overflow-hidden">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/50 text-slate-400 uppercase text-[10px] tracking-wider">
              <th className="py-3 px-4 font-semibold">Document Title</th>
              <th className="py-3 px-4 font-semibold">Document Type</th>
              <th className="py-3 px-4 font-semibold">Shipment Ref</th>
              <th className="py-3 px-4 font-semibold">Customer Account</th>
              <th className="py-3 px-4 font-semibold">Date</th>
              <th className="py-3 px-4 font-semibold">Status</th>
              <th className="py-3 px-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {documents.map((doc) => (
              <tr key={doc.id} className="hover:bg-slate-50 transition-colors">
                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-2.5">
                    <FileText className="w-4 h-4 text-blue-600 shrink-0" />
                    <div>
                      <span className="font-semibold text-slate-900 block">{doc.title}</span>
                      <span className="text-[10px] text-slate-400 font-mono">{doc.id} • {doc.size}</span>
                    </div>
                  </div>
                </td>
                <td className="py-3.5 px-4 font-medium text-slate-700">{doc.type}</td>
                <td className="py-3.5 px-4 font-mono font-bold text-slate-800">{doc.shipmentId}</td>
                <td className="py-3.5 px-4 text-slate-600">{doc.customer}</td>
                <td className="py-3.5 px-4 text-slate-500">{doc.date}</td>
                <td className="py-3.5 px-4">
                  <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    {doc.status}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-right">
                  <button
                    onClick={() =>
                      showToast({
                        type: 'info',
                        title: 'Document PDF Downloaded',
                        message: `Official e-BOL document downloaded: ${doc.id}`
                      })
                    }
                    className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 rounded-md transition-colors"
                  >
                    <Download className="w-3 h-3 text-slate-500" />
                    <span>Download</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
