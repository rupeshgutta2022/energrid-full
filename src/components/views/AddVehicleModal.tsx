import React, { useState, useEffect } from 'react';
import { useLogistics } from '../../context/LogisticsContext';
import { Modal } from '../common/Modal';
import { Vehicle } from '../../types';
import {
  Truck,
  Fuel,
  Gauge,
  MapPin,
  ShieldCheck,
  UserCheck,
  Calendar,
  Sparkles,
  FileCheck
} from 'lucide-react';

interface PresetVehicle {
  model: string;
  type: Vehicle['type'];
  capacityKg: number;
  city: string;
  fuel: number;
}

const VEHICLE_PRESETS: PresetVehicle[] = [
  {
    model: 'Tata Prima 5530.S Multi-Axle',
    type: 'Heavy Truck',
    capacityKg: 28000,
    city: 'Pune',
    fuel: 92
  },
  {
    model: 'BharatBenz 2823R Heavy Rigid',
    type: 'Heavy Truck',
    capacityKg: 22000,
    city: 'Mumbai',
    fuel: 88
  },
  {
    model: 'Eicher Pro 6028 Cold-Chain Reefer',
    type: 'Refrigerated Van',
    capacityKg: 14000,
    city: 'Bengaluru',
    fuel: 95
  },
  {
    model: 'Tata Ace EV Clean Fleet Cargo',
    type: 'Electric Delivery Van',
    capacityKg: 1200,
    city: 'Delhi NCR',
    fuel: 100
  }
];

export const AddVehicleModal: React.FC = () => {
  const {
    isAddVehicleModalOpen,
    setIsAddVehicleModalOpen,
    vehicles,
    drivers,
    addVehicle
  } = useLogistics();

  const suggestedId = `TRK-${2040 + vehicles.length + 1}`;

  const [id, setId] = useState(suggestedId);
  const [model, setModel] = useState('Tata Prima 5530.S Multi-Axle');
  const [type, setType] = useState<Vehicle['type']>('Heavy Truck');
  const [licensePlate, setLicensePlate] = useState('MH-12-QX-5542');
  const [capacityKg, setCapacityKg] = useState<number | ''>(28000);
  const [currentLocationCity, setCurrentLocationCity] = useState('Pune');
  const [selectedDriverId, setSelectedDriverId] = useState<string>('');
  const [fuelPercent, setFuelPercent] = useState<number | ''>(95);
  const [odometerKm, setOdometerKm] = useState<number | ''>(14200);
  const [status, setStatus] = useState<Vehicle['status']>('Available');
  const [insuranceExpiry, setInsuranceExpiry] = useState('2027-11-20');
  const [fitnessExpiry, setFitnessExpiry] = useState('2027-08-15');

  // Keep suggested ID fresh when modal opens
  useEffect(() => {
    if (isAddVehicleModalOpen) {
      setId(`TRK-${2040 + vehicles.length + 1}`);
    }
  }, [isAddVehicleModalOpen, vehicles.length]);

  const applyPreset = (preset: PresetVehicle) => {
    setModel(preset.model);
    setType(preset.type);
    setCapacityKg(preset.capacityKg);
    setCurrentLocationCity(preset.city);
    setFuelPercent(preset.fuel);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!model.trim() || !licensePlate.trim() || !currentLocationCity.trim()) {
      return;
    }

    const assignedDriver = drivers.find((d) => d.id === selectedDriverId);

    addVehicle({
      id: id.trim() || suggestedId,
      model: model.trim(),
      type,
      licensePlate: licensePlate.trim().toUpperCase(),
      capacityKg: Number(capacityKg) || 18000,
      currentLocationCity: currentLocationCity.trim(),
      currentDriverId: assignedDriver?.id,
      currentDriverName: assignedDriver?.name,
      fuelPercent: Number(fuelPercent) || 90,
      odometerKm: Number(odometerKm) || 12000,
      status: assignedDriver ? 'Active' : status,
      insuranceExpiry,
      fitnessExpiry,
      utilizationPercent: 0,
      lastServiceDate: new Date().toISOString().substring(0, 10),
      nextServiceDueKm: (Number(odometerKm) || 12000) + 10000
    });

    setIsAddVehicleModalOpen(false);
  };

  return (
    <Modal
      isOpen={isAddVehicleModalOpen}
      onClose={() => setIsAddVehicleModalOpen(false)}
      title="Enroll New Vehicle into Fleet"
      subtitle="Register commercial transport asset, configure telematics profile, and assign initial duty."
      maxWidth="max-w-2xl"
      footer={
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsAddVehicleModalOpen(false)}
            className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="add-vehicle-form"
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs transition-colors"
          >
            <Truck className="w-4 h-4" />
            <span>Register Vehicle to Fleet</span>
          </button>
        </div>
      }
    >
      <form id="add-vehicle-form" onSubmit={handleSubmit} className="space-y-5">
        {/* Preset quick templates */}
        <div>
          <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-2">
            Asset Archetype Templates
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {VEHICLE_PRESETS.map((p) => (
              <button
                key={p.model}
                type="button"
                onClick={() => applyPreset(p)}
                className="p-2 text-left bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 rounded-lg text-xs transition-colors"
              >
                <div className="font-bold text-slate-800 text-[11px] truncate">{p.model}</div>
                <div className="text-[10px] text-slate-500 truncate">{p.type} • {p.capacityKg / 1000}T</div>
              </button>
            ))}
          </div>
        </div>

        {/* Vehicle ID & License Plate */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 flex items-center gap-1">
              Vehicle ID <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={id}
              onChange={(e) => setId(e.target.value)}
              placeholder="e.g. TRK-2048"
              className="w-full px-3 py-2 text-xs font-mono font-bold border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>

          <div className="sm:col-span-2 space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 flex items-center gap-1">
              License Plate (RTO Registration) <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={licensePlate}
              onChange={(e) => setLicensePlate(e.target.value)}
              placeholder="e.g. MH-12-QX-5542"
              className="w-full px-3 py-2 text-xs font-mono font-bold uppercase border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Make & Model, and Type */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 flex items-center gap-1">
              Make & Commercial Model <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={model}
              onChange={(e) => setModel(e.target.value)}
              placeholder="e.g. Tata Prima 5530.S"
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 flex items-center gap-1">
              Vehicle Classification <span className="text-rose-500">*</span>
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as Vehicle['type'])}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white"
            >
              <option value="Heavy Truck">Heavy Truck (Multi-axle / 20T+)</option>
              <option value="Medium Cargo">Medium Cargo (LPT 1109 / 10T)</option>
              <option value="Refrigerated Van">Refrigerated Van (Cold Chain Reefer)</option>
              <option value="Electric Delivery Van">Electric Delivery Van (Zero Emission)</option>
            </select>
          </div>
        </div>

        {/* Capacity, Base Hub City, Fuel %, Odometer */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Payload Cap (kg)</label>
            <input
              type="number"
              min="100"
              required
              value={capacityKg}
              onChange={(e) => setCapacityKg(e.target.value === '' ? '' : Number(e.target.value))}
              className="w-full px-3 py-2 text-xs font-mono border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Base Hub / City</label>
            <input
              type="text"
              required
              value={currentLocationCity}
              onChange={(e) => setCurrentLocationCity(e.target.value)}
              placeholder="e.g. Pune"
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Fuel / Charge (%)</label>
            <input
              type="number"
              min="0"
              max="100"
              required
              value={fuelPercent}
              onChange={(e) => setFuelPercent(e.target.value === '' ? '' : Number(e.target.value))}
              className="w-full px-3 py-2 text-xs font-mono border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Odometer (km)</label>
            <input
              type="number"
              min="0"
              required
              value={odometerKm}
              onChange={(e) => setOdometerKm(e.target.value === '' ? '' : Number(e.target.value))}
              className="w-full px-3 py-2 text-xs font-mono border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Assigned Driver & Initial Status */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 flex items-center gap-1">
              <UserCheck className="w-3.5 h-3.5 text-blue-600" />
              <span>Assign Commercial Driver</span>
            </label>
            <select
              value={selectedDriverId}
              onChange={(e) => setSelectedDriverId(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white"
            >
              <option value="">-- No driver assigned (Pool depot asset) --</option>
              {drivers.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name} ({d.id}) - {d.status} ({d.currentCity})
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Initial Fleet Status</label>
            <div className="grid grid-cols-3 gap-2">
              {(['Available', 'Active', 'Maintenance'] as Vehicle['status'][]).map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => setStatus(st)}
                  className={`py-2 px-2 text-center rounded-lg border text-xs font-semibold transition-all ${
                    status === st
                      ? st === 'Available'
                        ? 'bg-blue-50 text-blue-800 border-blue-300 ring-2 ring-blue-500/20'
                        : st === 'Active'
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-300 ring-2 ring-emerald-500/20'
                        : 'bg-amber-50 text-amber-800 border-amber-300 ring-2 ring-amber-500/20'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Regulatory & Compliance Dates */}
        <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
            <FileCheck className="w-4 h-4 text-emerald-600" />
            <span>Compliance Certifications & Renewal Dates</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <label className="text-slate-600 font-medium">Commercial Insurance Expiry</label>
              <input
                type="date"
                required
                value={insuranceExpiry}
                onChange={(e) => setInsuranceExpiry(e.target.value)}
                className="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-lg bg-white"
              />
            </div>
            <div className="space-y-1">
              <label className="text-slate-600 font-medium">Road Fitness Certificate Expiry</label>
              <input
                type="date"
                required
                value={fitnessExpiry}
                onChange={(e) => setFitnessExpiry(e.target.value)}
                className="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-lg bg-white"
              />
            </div>
          </div>
        </div>
      </form>
    </Modal>
  );
};
