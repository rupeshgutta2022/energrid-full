import React, { useState, useEffect } from 'react';
import { useLogistics } from '../../context/LogisticsContext';
import { Modal } from '../common/Modal';
import { Driver } from '../../types';
import {
  Users,
  ShieldCheck,
  Phone,
  Mail,
  FileCheck,
  Truck,
  MapPin,
  Calendar,
  Sparkles
} from 'lucide-react';

interface PresetDriver {
  name: string;
  phone: string;
  email: string;
  licenseNumber: string;
  licenseExpiry: string;
  currentCity: string;
  safetyScore: number;
}

const DRIVER_PRESETS: PresetDriver[] = [
  {
    name: 'Vikramaditya Shinde',
    phone: '+91 98220 54192',
    email: 'vikram.shinde@logicoresp.internal',
    licenseNumber: 'DL-MH12-2018-009412',
    licenseExpiry: '2029-07-15',
    currentCity: 'Pune',
    safetyScore: 99
  },
  {
    name: 'Harpreet Singh Dhillon',
    phone: '+91 98140 77319',
    email: 'harpreet.dhillon@logicoresp.internal',
    licenseNumber: 'DL-PB08-2016-042891',
    licenseExpiry: '2028-11-20',
    currentCity: 'Delhi NCR',
    safetyScore: 97
  },
  {
    name: 'Anand Natarajan',
    phone: '+91 94440 23810',
    email: 'anand.natarajan@logicoresp.internal',
    licenseNumber: 'DL-TN07-2019-083110',
    licenseExpiry: '2030-04-18',
    currentCity: 'Bengaluru',
    safetyScore: 98
  },
  {
    name: 'Santosh Yadav',
    phone: '+91 97110 66284',
    email: 'santosh.yadav@logicoresp.internal',
    licenseNumber: 'DL-UP32-2017-029411',
    licenseExpiry: '2028-09-12',
    currentCity: 'Mumbai',
    safetyScore: 96
  }
];

export const OnboardDriverModal: React.FC = () => {
  const {
    isOnboardDriverModalOpen,
    setIsOnboardDriverModalOpen,
    drivers,
    vehicles,
    addDriver
  } = useLogistics();

  const suggestedId = `DRV-${100 + drivers.length + 1}`;

  const [id, setId] = useState(suggestedId);
  const [name, setName] = useState('Vikramaditya Shinde');
  const [phone, setPhone] = useState('+91 98220 54192');
  const [email, setEmail] = useState('vikram.shinde@logicoresp.internal');
  const [licenseNumber, setLicenseNumber] = useState('DL-MH12-2018-009412');
  const [licenseExpiry, setLicenseExpiry] = useState('2029-07-15');
  const [currentCity, setCurrentCity] = useState('Pune');
  const [safetyScore, setSafetyScore] = useState<number | ''>(98);
  const [status, setStatus] = useState<Driver['status']>('Available');
  const [assignedVehicleId, setAssignedVehicleId] = useState<string>('');

  useEffect(() => {
    if (isOnboardDriverModalOpen) {
      setId(`DRV-${100 + drivers.length + 1}`);
    }
  }, [isOnboardDriverModalOpen, drivers.length]);

  const applyPreset = (preset: PresetDriver) => {
    setName(preset.name);
    setPhone(preset.phone);
    setEmail(preset.email);
    setLicenseNumber(preset.licenseNumber);
    setLicenseExpiry(preset.licenseExpiry);
    setCurrentCity(preset.currentCity);
    setSafetyScore(preset.safetyScore);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !phone.trim() || !licenseNumber.trim() || !currentCity.trim()) {
      return;
    }

    addDriver({
      id: id.trim() || suggestedId,
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim() || `${name.toLowerCase().replace(/\s+/g, '.')}@logicoresp.internal`,
      licenseNumber: licenseNumber.trim().toUpperCase(),
      licenseExpiry,
      currentCity: currentCity.trim(),
      safetyScore: Number(safetyScore) || 98,
      status: assignedVehicleId ? 'On Duty' : status,
      currentVehicleId: assignedVehicleId || undefined,
      totalTripsCompleted: 0,
      onTimeDeliveryRate: 99.4,
      hoursLoggedToday: 0.0
    });

    setIsOnboardDriverModalOpen(false);
  };

  return (
    <Modal
      isOpen={isOnboardDriverModalOpen}
      onClose={() => setIsOnboardDriverModalOpen(false)}
      title="Onboard Commercial Transport Driver"
      subtitle="Heavy vehicle licensing validation, safety baseline assignment, and telematics profiling."
      maxWidth="max-w-2xl"
      footer={
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsOnboardDriverModalOpen(false)}
            className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="onboard-driver-form"
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs transition-colors"
          >
            <Users className="w-4 h-4" />
            <span>Complete Driver Onboarding</span>
          </button>
        </div>
      }
    >
      <form id="onboard-driver-form" onSubmit={handleSubmit} className="space-y-5">
        {/* Presets */}
        <div>
          <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-2">
            Quick Driver Profiles
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {DRIVER_PRESETS.map((p) => (
              <button
                key={p.name}
                type="button"
                onClick={() => applyPreset(p)}
                className="p-2 text-left bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 rounded-lg text-xs transition-colors"
              >
                <div className="font-bold text-slate-800 text-[11px] truncate">{p.name}</div>
                <div className="text-[10px] text-slate-500 truncate">{p.currentCity} • {p.safetyScore}% Safety</div>
              </button>
            ))}
          </div>
        </div>

        {/* Driver ID & Full Name */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 flex items-center gap-1">
              Driver ID <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={id}
              onChange={(e) => setId(e.target.value)}
              placeholder="e.g. DRV-108"
              className="w-full px-3 py-2 text-xs font-mono font-bold border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>

          <div className="sm:col-span-2 space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 flex items-center gap-1">
              Driver Full Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Vikramaditya Shinde"
              className="w-full px-3 py-2 text-xs font-semibold border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Phone & Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 text-blue-600" />
              <span>Direct Phone Contact</span> <span className="text-rose-500">*</span>
            </label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="e.g. +91 98220 54192"
              className="w-full px-3 py-2 text-xs font-mono border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 flex items-center gap-1">
              <Mail className="w-3.5 h-3.5 text-slate-500" />
              <span>Internal Dispatch Email</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. vikram.shinde@logicoresp.internal"
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Commercial License Number & Expiry */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 flex items-center gap-1">
              <FileCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Heavy Transport License #</span> <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={licenseNumber}
              onChange={(e) => setLicenseNumber(e.target.value)}
              placeholder="e.g. DL-MH12-2018-009412"
              className="w-full px-3 py-2 text-xs font-mono font-bold uppercase border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-500" />
              <span>License Expiry Date</span> <span className="text-rose-500">*</span>
            </label>
            <input
              type="date"
              required
              value={licenseExpiry}
              onChange={(e) => setLicenseExpiry(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white"
            />
          </div>
        </div>

        {/* Base City, Safety Score, Initial Shift Status */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-blue-600" />
              <span>Home Depot / Station</span> <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={currentCity}
              onChange={(e) => setCurrentCity(e.target.value)}
              placeholder="e.g. Pune"
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Safety Rating Baseline (%)</span>
            </label>
            <input
              type="number"
              min="50"
              max="100"
              required
              value={safetyScore}
              onChange={(e) => setSafetyScore(e.target.value === '' ? '' : Number(e.target.value))}
              className="w-full px-3 py-2 text-xs font-mono border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Initial Shift State</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as Driver['status'])}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white"
            >
              <option value="Available">Available (Standby in Depot)</option>
              <option value="On Duty">On Duty (Active Shift)</option>
              <option value="Resting">Resting (Mandatory Rest)</option>
            </select>
          </div>
        </div>

        {/* Assign Commercial Vehicle */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700 flex items-center gap-1">
            <Truck className="w-3.5 h-3.5 text-blue-600" />
            <span>Assign Hauler Asset (Optional)</span>
          </label>
          <select
            value={assignedVehicleId}
            onChange={(e) => setAssignedVehicleId(e.target.value)}
            className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white"
          >
            <option value="">-- No vehicle assigned (Roster Standby) --</option>
            {vehicles.map((v) => (
              <option key={v.id} value={v.id}>
                {v.id} - {v.model} ({v.licensePlate}) • {v.status} • Base: {v.currentLocationCity}
              </option>
            ))}
          </select>
        </div>
      </form>
    </Modal>
  );
};
