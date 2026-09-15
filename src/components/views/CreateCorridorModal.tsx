import React, { useState } from 'react';
import { useLogistics } from '../../context/LogisticsContext';
import { Modal } from '../common/Modal';
import { RouteInfo } from '../../types';
import {
  Route,
  MapPin,
  Clock,
  DollarSign,
  Truck,
  Sparkles,
  ArrowRight,
  AlertCircle
} from 'lucide-react';

interface PresetCorridor {
  name: string;
  code: string;
  originCity: string;
  destCity: string;
  distanceKm: number;
  avgDurationHours: number;
  tollsCost: number;
  status: RouteInfo['status'];
}

const PRESET_CORRIDORS: PresetCorridor[] = [
  {
    name: 'Mumbai-Ahmedabad Industrial Freightway',
    code: 'BOM-AMD-48',
    originCity: 'Mumbai',
    destCity: 'Ahmedabad',
    distanceKm: 530,
    avgDurationHours: 10.5,
    tollsCost: 2850,
    status: 'Optimal'
  },
  {
    name: 'Delhi-Jaipur Logistics Corridor',
    code: 'DEL-JAI-48',
    originCity: 'Delhi NCR',
    destCity: 'Jaipur',
    distanceKm: 280,
    avgDurationHours: 5.5,
    tollsCost: 1420,
    status: 'Optimal'
  },
  {
    name: 'Bengaluru-Chennai East Expressway',
    code: 'BLR-MAA-04',
    originCity: 'Bengaluru',
    destCity: 'Chennai',
    distanceKm: 345,
    avgDurationHours: 6.8,
    tollsCost: 1890,
    status: 'Optimal'
  },
  {
    name: 'Hyderabad-Nagpur Central Trunk',
    code: 'HYD-NAG-44',
    originCity: 'Hyderabad',
    destCity: 'Nagpur',
    distanceKm: 500,
    avgDurationHours: 9.5,
    tollsCost: 2600,
    status: 'Optimal'
  }
];

export const CreateCorridorModal: React.FC = () => {
  const { isCreateCorridorModalOpen, setIsCreateCorridorModalOpen, addRoute } = useLogistics();

  const [name, setName] = useState('Pune - Hyderabad Super Freightway');
  const [code, setCode] = useState('PNQ-HYD-65');
  const [originCity, setOriginCity] = useState('Pune');
  const [destCity, setDestCity] = useState('Hyderabad');
  const [distanceKm, setDistanceKm] = useState<number | ''>(565);
  const [avgDurationHours, setAvgDurationHours] = useState<number | ''>(11.0);
  const [tollsCost, setTollsCost] = useState<number | ''>(2750);
  const [activeTrucks, setActiveTrucks] = useState<number | ''>(6);
  const [status, setStatus] = useState<RouteInfo['status']>('Optimal');

  const applyPreset = (preset: PresetCorridor) => {
    setName(preset.name);
    setCode(preset.code);
    setOriginCity(preset.originCity);
    setDestCity(preset.destCity);
    setDistanceKm(preset.distanceKm);
    setAvgDurationHours(preset.avgDurationHours);
    setTollsCost(preset.tollsCost);
    setStatus(preset.status);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !code.trim() || !originCity.trim() || !destCity.trim()) {
      return;
    }

    addRoute({
      name: name.trim(),
      code: code.trim().toUpperCase(),
      originCity: originCity.trim(),
      destCity: destCity.trim(),
      distanceKm: Number(distanceKm) || 450,
      avgDurationHours: Number(avgDurationHours) || 8.5,
      tollsCost: Number(tollsCost) || 1800,
      activeTrucks: Number(activeTrucks) || 4,
      status
    });

    setIsCreateCorridorModalOpen(false);
  };

  return (
    <Modal
      isOpen={isCreateCorridorModalOpen}
      onClose={() => setIsCreateCorridorModalOpen(false)}
      title="Register Custom Freight Corridor"
      subtitle="Define electronic tolling profiles, highway routing benchmarks, and active lane monitoring."
      maxWidth="max-w-2xl"
      footer={
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsCreateCorridorModalOpen(false)}
            className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="create-corridor-form"
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs transition-colors"
          >
            <Route className="w-4 h-4" />
            <span>Create & Register Corridor</span>
          </button>
        </div>
      }
    >
      <form id="create-corridor-form" onSubmit={handleSubmit} className="space-y-5">
        {/* Preset quick buttons */}
        <div>
          <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-2">
            Quick Route Templates
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {PRESET_CORRIDORS.map((p) => (
              <button
                key={p.code}
                type="button"
                onClick={() => applyPreset(p)}
                className="p-2 text-left bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 rounded-lg text-xs transition-colors"
              >
                <div className="font-mono font-bold text-slate-800 text-[11px] truncate">{p.code}</div>
                <div className="text-[10px] text-slate-500 truncate">{p.originCity} → {p.destCity}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Corridor Name & Code */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="sm:col-span-2 space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 flex items-center gap-1">
              Corridor Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Western Deccan Express Freightway"
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 flex items-center gap-1">
              Corridor Code <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="e.g. PNQ-HYD-65"
              className="w-full px-3 py-2 text-xs font-mono uppercase border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Origin & Destination */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-blue-600" />
              <span>Origin Hub / City</span> <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={originCity}
              onChange={(e) => setOriginCity(e.target.value)}
              placeholder="e.g. Pune"
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-emerald-600" />
              <span>Destination Terminal / City</span> <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={destCity}
              onChange={(e) => setDestCity(e.target.value)}
              placeholder="e.g. Hyderabad"
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Distance, Avg Transit, FASTag Tolls, Trucks */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Distance (km)</label>
            <input
              type="number"
              min="1"
              required
              value={distanceKm}
              onChange={(e) => setDistanceKm(e.target.value === '' ? '' : Number(e.target.value))}
              className="w-full px-3 py-2 text-xs font-mono border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Avg Duration (hrs)</label>
            <input
              type="number"
              step="0.1"
              min="0.5"
              required
              value={avgDurationHours}
              onChange={(e) => setAvgDurationHours(e.target.value === '' ? '' : Number(e.target.value))}
              className="w-full px-3 py-2 text-xs font-mono border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">FASTag Tolls (₹)</label>
            <input
              type="number"
              min="0"
              required
              value={tollsCost}
              onChange={(e) => setTollsCost(e.target.value === '' ? '' : Number(e.target.value))}
              className="w-full px-3 py-2 text-xs font-mono border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Active Haulers</label>
            <input
              type="number"
              min="0"
              value={activeTrucks}
              onChange={(e) => setActiveTrucks(e.target.value === '' ? '' : Number(e.target.value))}
              className="w-full px-3 py-2 text-xs font-mono border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Operating Status */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700">Lane Traffic / Transit Status</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {(['Optimal', 'Congested', 'Weather Alert', 'Detour in place'] as RouteInfo['status'][]).map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => setStatus(st)}
                className={`py-2 px-3 rounded-lg border text-xs font-semibold transition-all ${
                  status === st
                    ? st === 'Optimal'
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-300 ring-2 ring-emerald-500/20'
                      : st === 'Congested'
                      ? 'bg-amber-50 text-amber-800 border-amber-300 ring-2 ring-amber-500/20'
                      : 'bg-rose-50 text-rose-800 border-rose-300 ring-2 ring-rose-500/20'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Live Preview Card */}
        <div className="p-3.5 bg-blue-50/50 border border-blue-200/80 rounded-xl text-xs space-y-1">
          <div className="flex items-center justify-between font-bold text-slate-900">
            <div className="flex items-center gap-2">
              <Route className="w-4 h-4 text-blue-600" />
              <span>{name || 'Untitled Corridor'}</span>
              <span className="font-mono text-[11px] bg-white text-blue-700 px-1.5 py-0.5 rounded border border-blue-200">
                {code || 'CODE'}
              </span>
            </div>
            <span className="font-semibold text-emerald-700">{status}</span>
          </div>
          <div className="flex items-center gap-3 text-slate-600 text-[11px] pt-1">
            <span>{originCity || 'Origin'} → {destCity || 'Destination'}</span>
            <span>•</span>
            <span>{distanceKm || 0} km</span>
            <span>•</span>
            <span>{avgDurationHours || 0} hrs</span>
            <span>•</span>
            <span className="font-semibold text-slate-800">Tolls: ₹{tollsCost || 0}</span>
          </div>
        </div>
      </form>
    </Modal>
  );
};
