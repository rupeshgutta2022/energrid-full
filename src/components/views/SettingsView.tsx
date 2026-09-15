import React, { useState } from 'react';
import { useLogistics } from '../../context/LogisticsContext';
import { Settings, Shield, Bell, Globe, Database, Check } from 'lucide-react';

export const SettingsView: React.FC = () => {
  const { showToast } = useLogistics();

  const [companyName, setCompanyName] = useState('LogiCore Enterprise Logistics Ltd');
  const [baseCurrency, setBaseCurrency] = useState('INR (₹)');
  const [distanceUnit, setDistanceUnit] = useState('Kilometers (km)');
  const [weightUnit, setWeightUnit] = useState('Metric Kilograms & Tons');
  const [autoDispatch, setAutoDispatch] = useState(true);
  const [coldChainAlerts, setColdChainAlerts] = useState(true);

  const handleSave = () => {
    showToast({
      type: 'success',
      title: 'Preferences Saved',
      message: 'Platform configurations updated across all tenant nodes.'
    });
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-xl font-bold text-slate-900 tracking-tight">System Settings & Tenant Preferences</h1>
        <p className="text-xs text-slate-500 mt-1">
          Configure regional units, automated dispatch heuristics, notification thresholds, and tenant identity.
        </p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-6 space-y-6 text-xs">
        {/* Organization Details */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-slate-900">Organization & Enterprise Profile</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-600 font-medium mb-1">Company Operating Legal Name</label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
              />
            </div>
            <div>
              <label className="block text-slate-600 font-medium mb-1">Operating Headquarters</label>
              <input
                type="text"
                defaultValue="Bandra Kurla Complex (BKC), Mumbai, MH"
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
              />
            </div>
          </div>
        </div>

        {/* Regional Preferences */}
        <div className="pt-4 border-t border-slate-100 space-y-3">
          <h3 className="text-sm font-semibold text-slate-900">Localization & Measurement Standards</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-slate-600 font-medium mb-1">Base Currency</label>
              <select
                value={baseCurrency}
                onChange={(e) => setBaseCurrency(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs bg-white focus:outline-hidden"
              >
                <option value="INR (₹)">Indian Rupee (INR - ₹)</option>
                <option value="USD ($)">United States Dollar (USD - $)</option>
                <option value="EUR (€)">Euro (EUR - €)</option>
                <option value="AED (د.إ)">UAE Dirham (AED - د.إ)</option>
              </select>
            </div>
            <div>
              <label className="block text-slate-600 font-medium mb-1">Distance & Speed Units</label>
              <select
                value={distanceUnit}
                onChange={(e) => setDistanceUnit(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs bg-white focus:outline-hidden"
              >
                <option value="Kilometers (km)">Kilometers (km / km/h)</option>
                <option value="Miles (mi)">Miles (mi / mph)</option>
              </select>
            </div>
            <div>
              <label className="block text-slate-600 font-medium mb-1">Cargo Weight Standards</label>
              <select
                value={weightUnit}
                onChange={(e) => setWeightUnit(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs bg-white focus:outline-hidden"
              >
                <option value="Metric Kilograms & Tons">Kilograms & Metric Tons</option>
                <option value="Pounds & US Tons">Pounds & US Short Tons</option>
              </select>
            </div>
          </div>
        </div>

        {/* Automated Rules */}
        <div className="pt-4 border-t border-slate-100 space-y-3">
          <h3 className="text-sm font-semibold text-slate-900">Dispatch Heuristics</h3>
          <div className="space-y-2.5">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={autoDispatch}
                onChange={(e) => setAutoDispatch(e.target.checked)}
                className="w-4 h-4 rounded text-blue-600 border-slate-300 focus:ring-blue-500"
              />
              <div>
                <span className="font-medium text-slate-800">Auto-Suggest Driver & Vehicle on Order Ingestion</span>
                <span className="text-[11px] text-slate-400 block">
                  Uses proximity algorithm to match closest available vehicle and qualified driver
                </span>
              </div>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={coldChainAlerts}
                onChange={(e) => setColdChainAlerts(e.target.checked)}
                className="w-4 h-4 rounded text-blue-600 border-slate-300 focus:ring-blue-500"
              />
              <div>
                <span className="font-medium text-slate-800">Enforce Cold-Chain Excursion Emergency Pushes</span>
                <span className="text-[11px] text-slate-400 block">
                  Immediately trigger audible notification on high-severity reefer temperature deviations
                </span>
              </div>
            </label>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex justify-end">
          <button
            onClick={handleSave}
            className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-2xs transition-colors"
          >
            Save Configuration Changes
          </button>
        </div>
      </div>
    </div>
  );
};
