import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { useLogistics } from '../../context/LogisticsContext';
import { Truck, Calendar, MapPin, CheckCircle2, Clock, Anchor, ShieldCheck } from 'lucide-react';

interface UnloadingBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UnloadingBookingModal: React.FC<UnloadingBookingModalProps> = ({ isOpen, onClose }) => {
  const { showToast } = useLogistics();
  const [containerNumber, setContainerNumber] = useState('MSKU-908214-8');
  const [terminal, setTerminal] = useState('Port of Oakland Outer Harbor (Berth 57)');
  const [unloadingDate, setUnloadingDate] = useState('2026-05-06');
  const [timeSlot, setTimeSlot] = useState('Morning (08:00 - 12:00)');
  const [contactName, setContactName] = useState('Warehouse Receiving Manager');
  const [contactPhone, setContactPhone] = useState('+1 (510) 892-4110');
  const [specialHandling, setSpecialHandling] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast({
      type: 'success',
      title: 'Container Unloading Scheduled',
      message: `Dock slot confirmed for ${containerNumber} at ${terminal} on ${unloadingDate} (${timeSlot}).`
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Book Container Unloading Service"
      subtitle="Priority port drayage, cross-dock de-vanning, and automated receiving tally."
      maxWidth="max-w-xl"
      footer={
        <div className="flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="unloading-booking-form"
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#e98622] hover:bg-[#d87617] rounded-lg shadow-xs transition-colors cursor-pointer"
          >
            <Truck className="w-3.5 h-3.5" />
            <span>Confirm Unloading Reservation</span>
          </button>
        </div>
      }
    >
      <form id="unloading-booking-form" onSubmit={handleSubmit} className="space-y-4 text-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="font-semibold text-slate-700">ISO Container Number *</label>
            <input
              type="text"
              required
              value={containerNumber}
              onChange={(e) => setContainerNumber(e.target.value.toUpperCase())}
              placeholder="e.g. MSKU-908214-8"
              className="w-full px-3 py-2 text-xs font-mono font-bold border border-slate-200 rounded-lg uppercase"
            />
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-slate-700">Port / Terminal Location *</label>
            <input
              type="text"
              required
              value={terminal}
              onChange={(e) => setTerminal(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="font-semibold text-slate-700">Requested Unloading Date *</label>
            <input
              type="date"
              required
              value={unloadingDate}
              onChange={(e) => setUnloadingDate(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg bg-white"
            />
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-slate-700">Dock Appointment Window</label>
            <select
              value={timeSlot}
              onChange={(e) => setTimeSlot(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg bg-white"
            >
              <option value="Morning (08:00 - 12:00)">Morning (08:00 - 12:00)</option>
              <option value="Afternoon (12:00 - 16:00)">Afternoon (12:00 - 16:00)</option>
              <option value="Evening (16:00 - 20:00)">Evening (16:00 - 20:00)</option>
              <option value="Overnight Priority Express">Overnight Priority Express (24/7)</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="font-semibold text-slate-700">Receiving Contact Name</label>
            <input
              type="text"
              required
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg"
            />
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-slate-700">Contact Telephone / Radio</label>
            <input
              type="tel"
              required
              value={contactPhone}
              onChange={(e) => setContactPhone(e.target.value)}
              className="w-full px-3 py-2 text-xs font-mono border border-slate-200 rounded-lg"
            />
          </div>
        </div>

        <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
          <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-800">
            <input
              type="checkbox"
              checked={specialHandling}
              onChange={(e) => setSpecialHandling(e.target.checked)}
              className="rounded text-[#e98622] focus:ring-[#e98622]"
            />
            <span>Include High-Precision Forklift & Pallet De-vanning Tally</span>
          </label>
          <p className="text-[11px] text-slate-500 pl-5">
            Automatic barcode reconciliation and damage inspection report transmitted directly to your corporate dashboard upon seal break.
          </p>
        </div>
      </form>
    </Modal>
  );
};
