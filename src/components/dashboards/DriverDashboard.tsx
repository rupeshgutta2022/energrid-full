import React, { useState } from 'react';
import { useLogistics } from '../../context/LogisticsContext';
import { StatCard } from '../common/StatCard';
import { StatusBadge } from '../common/StatusBadge';
import { SignaturePad } from '../common/SignaturePad';
import { Modal } from '../common/Modal';
import {
  Navigation,
  CheckCircle2,
  MapPin,
  Clock,
  ShieldCheck,
  Camera,
  FileSignature,
  AlertTriangle,
  ArrowRight,
  Phone,
  Truck,
  RotateCcw,
  Check
} from 'lucide-react';

export const DriverDashboard: React.FC = () => {
  const { shipments, drivers, vehicles, completeProofOfDelivery, addShipmentNote, showToast } = useLogistics();

  // Pick an active assigned shipment for the driver session
  const activeShipment =
    shipments.find((s) => s.status === 'In Transit' || s.status === 'Delayed' || s.status === 'Out for Delivery') ||
    shipments[0];

  const currentDriver = drivers.find((d) => d.name === activeShipment?.driverName) || drivers[1]; // Amit Patil
  const currentVehicle = vehicles.find((v) => v.id === activeShipment?.vehicleId) || vehicles[1];

  // POD modal state
  const [isPodModalOpen, setIsPodModalOpen] = useState(false);
  const [receiverName, setReceiverName] = useState('');
  const [signatureData, setSignatureData] = useState<string | null>(null);
  const [photoUploaded, setPhotoUploaded] = useState(false);

  // Pre-trip inspection state
  const [inspectionItems, setInspectionItems] = useState([
    { id: 'tires', label: 'Tire Pressure & Tread Depth Verified', checked: true },
    { id: 'brakes', label: 'Air Brake Line & Pressure Tested', checked: true },
    { id: 'lights', label: 'Headlights, Turn Indicators & Tail Lamps', checked: true },
    { id: 'cargo', label: 'Cargo Pallet Lashing & Safety Straps', checked: true },
    { id: 'seal', label: 'Tamper-Evident High-Security Seal Intact', checked: true }
  ]);

  // Incident reporting modal state
  const [isIncidentModalOpen, setIsIncidentModalOpen] = useState(false);
  const [incidentType, setIncidentType] = useState('Traffic Congestion / Construction');
  const [incidentDescription, setIncidentDescription] = useState('');

  const toggleInspection = (id: string) => {
    setInspectionItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
    );
  };

  const handleConfirmPod = () => {
    if (!receiverName.trim()) {
      showToast({
        type: 'error',
        title: 'Receiver Name Required',
        message: 'Please enter the receiving party’s full name before confirming delivery.'
      });
      return;
    }

    if (!signatureData) {
      showToast({
        type: 'error',
        title: 'Signature Required',
        message: 'The recipient must sign the proof of delivery pad.'
      });
      return;
    }

    completeProofOfDelivery(activeShipment.id, signatureData, receiverName);
    setIsPodModalOpen(false);
    setSignatureData(null);
    setReceiverName('');
  };

  const handleSubmitIncident = () => {
    if (!incidentDescription.trim()) {
      showToast({
        type: 'error',
        title: 'Description Required',
        message: 'Please provide details of the incident or roadblock.'
      });
      return;
    }

    addShipmentNote(
      activeShipment.id,
      `DRIVER INCIDENT REPORTED (${currentDriver.name}): ${incidentType} - ${incidentDescription}`
    );

    showToast({
      type: 'warning',
      title: 'Incident Logged to Operations Dispatch',
      message: 'Command center notified. Real-time ETA adjusted automatically.'
    });

    setIsIncidentModalOpen(false);
    setIncidentDescription('');
  };

  return (
    <div className="space-y-6">
      {/* Driver Welcome & Shift Status Header */}
      <div className="bg-slate-900 text-white rounded-2xl p-5 sm:p-6 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-lg shrink-0">
            {currentDriver.name
              .split(' ')
              .map((n) => n[0])
              .join('')}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold tracking-tight">{currentDriver.name}</h1>
              <span className="text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                On Duty ({currentDriver.hoursLoggedToday}h logged)
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Assigned Vehicle: <strong className="text-white">{currentVehicle.licensePlate}</strong> ({currentVehicle.model}) • Driver ID: {currentDriver.id}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setIsIncidentModalOpen(true)}
            className="px-3.5 py-2 text-xs font-semibold text-amber-300 bg-amber-950/60 border border-amber-800/80 hover:bg-amber-900/60 rounded-xl transition-colors flex items-center gap-1.5"
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Report Road Incident</span>
          </button>
          <button
            onClick={() => setIsPodModalOpen(true)}
            className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
          >
            <FileSignature className="w-4 h-4" />
            <span>Proof of Delivery (POD)</span>
          </button>
        </div>
      </div>

      {/* Driver Performance & Safety Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Safety Score"
          value={`${currentDriver.safetyScore}%`}
          change="Top tier driver"
          changeType="positive"
          subtitle="Zero harsh braking events logged"
          icon={ShieldCheck}
          accentColor="emerald"
        />
        <StatCard
          title="On-Time Delivery Rate"
          value={`${currentDriver.onTimeDeliveryRate}%`}
          change="+1.2%"
          changeType="positive"
          subtitle={`${currentDriver.totalTripsCompleted} lifetime trips completed`}
          icon={CheckCircle2}
          accentColor="blue"
        />
        <StatCard
          title="Hours Logged Today"
          value={`${currentDriver.hoursLoggedToday} hrs`}
          subtitle="Max allowable shift: 10 hrs"
          icon={Clock}
          accentColor="indigo"
        />
        <StatCard
          title="Assigned Shipment"
          value={activeShipment?.id || 'None'}
          subtitle={`Bound for ${activeShipment?.destination.city}`}
          icon={Truck}
          accentColor="slate"
        />
      </div>

      {/* Main Content Grid: Current Trip Execution & Stop Manifest */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 cols: Live Navigation & Stop Sequence */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200/90 shadow-xs p-5 space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold text-slate-900 tracking-tight">Active Trip Route</h3>
                <StatusBadge status={activeShipment.status} size="sm" />
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                {activeShipment.origin.city} → {activeShipment.destination.city} • Target ETA: {activeShipment.eta}
              </p>
            </div>
            <button
              onClick={() =>
                showToast({
                  type: 'info',
                  title: 'GPS Navigation Sync',
                  message: 'Navigation waypoint audio instructions transmitted to vehicle dashboard.'
                })
              }
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Launch Turn-by-Turn</span>
            </button>
          </div>

          {/* Synthetic Navigation Card */}
          <div className="bg-slate-900 text-white rounded-xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white shrink-0">
                <ArrowRight className="w-5 h-5 -rotate-45" />
              </div>
              <div>
                <div className="text-xs text-blue-400 font-semibold uppercase tracking-wider">Next Waypoint in 14.8 km</div>
                <div className="text-sm font-bold text-white mt-0.5">Take NH-65 Solapur Bypass Exit 4</div>
                <div className="text-xs text-slate-400">Current corridor speed: 64 km/h • Road clear</div>
              </div>
            </div>
            <div className="text-right hidden sm:block">
              <div className="text-[10px] text-slate-400 uppercase">Remaining Distance</div>
              <div className="text-base font-bold text-white">284 km</div>
            </div>
          </div>

          {/* Stop Manifest & Checklist */}
          <div>
            <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-3">
              Route Stop Manifest ({activeShipment.stops.length} checkpoints)
            </h4>

            <div className="space-y-3">
              {activeShipment.stops.map((stop, idx) => (
                <div
                  key={stop.id}
                  className={`p-3.5 rounded-xl border text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                    stop.status === 'Completed'
                      ? 'bg-emerald-50/40 border-emerald-200/80 text-emerald-900'
                      : stop.status === 'In Progress'
                      ? 'bg-blue-50/60 border-blue-200 text-blue-900'
                      : 'bg-slate-50 border-slate-200/80 text-slate-700'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5 ${
                        stop.status === 'Completed'
                          ? 'bg-emerald-600 text-white'
                          : stop.status === 'In Progress'
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {stop.status === 'Completed' ? <Check className="w-3.5 h-3.5" /> : idx + 1}
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900">{stop.name}</div>
                      <div className="text-[11px] text-slate-500">
                        {stop.type} • Scheduled: {stop.scheduledTime}
                        {stop.actualTime && ` • Departed: ${stop.actualTime}`}
                      </div>
                      {stop.notes && <div className="text-[10px] text-slate-600 mt-1 italic">{stop.notes}</div>}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <StatusBadge status={stop.status} size="sm" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 1 col: Pre-Trip Inspection & Cargo Details */}
        <div className="space-y-6">
          {/* Pre-Trip Vehicle Inspection Checklist */}
          <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-5 space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-semibold text-slate-900 tracking-tight">Pre-Trip Safety Inspection</h3>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                5 of 5 Verified
              </span>
            </div>

            <div className="space-y-2.5">
              {inspectionItems.map((item) => (
                <label
                  key={item.id}
                  onClick={() => toggleInspection(item.id)}
                  className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-slate-50 cursor-pointer text-xs transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={item.checked}
                    onChange={() => {}}
                    className="w-4 h-4 rounded text-blue-600 border-slate-300 focus:ring-blue-500 cursor-pointer"
                  />
                  <span className={`text-slate-700 ${item.checked ? 'font-medium' : 'text-slate-400'}`}>
                    {item.label}
                  </span>
                </label>
              ))}
            </div>

            <button
              onClick={() =>
                showToast({
                  type: 'success',
                  title: 'Inspection Certified',
                  message: 'Daily DOT safety inspection logged to compliance server.'
                })
              }
              className="w-full mt-2 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              Re-Certify Inspection
            </button>
          </div>

          {/* Consignment Specs */}
          <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-5 space-y-2 text-xs">
            <h3 className="text-sm font-semibold text-slate-900 tracking-tight mb-2">Consignment Details</h3>
            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-500">Customer:</span>
              <span className="font-semibold text-slate-900">{activeShipment.customerName}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-500">Gross Weight:</span>
              <span className="font-semibold text-slate-900">{activeShipment.weightKg.toLocaleString()} kg</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-500">Cargo Type:</span>
              <span className="font-medium text-slate-700">{activeShipment.packageType}</span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-slate-500">Dispatch Desk:</span>
              <span className="font-medium text-blue-600 flex items-center gap-1">
                <Phone className="w-3 h-3" />
                +91 22 4920 1820
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Proof of Delivery Modal */}
      <Modal
        isOpen={isPodModalOpen}
        onClose={() => setIsPodModalOpen(false)}
        title="Electronic Proof of Delivery (e-POD)"
        subtitle={`Shipment ${activeShipment.id} bound for ${activeShipment.destination.facility}`}
        footer={
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPodModalOpen(false)}
              className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmPod}
              className="px-4 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-2xs transition-colors"
            >
              Confirm & Complete Delivery
            </button>
          </div>
        }
      >
        <div className="space-y-4 text-xs">
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">Recipient / Receiving Manager Name</label>
            <input
              type="text"
              value={receiverName}
              onChange={(e) => setReceiverName(e.target.value)}
              placeholder="e.g. Sunil Rao (Store Receiving Manager)"
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Recipient Digital Signature (Sign Below)
            </label>
            <SignaturePad onSave={(data) => setSignatureData(data)} />
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Camera className="w-4 h-4 text-slate-500" />
              <div>
                <span className="font-medium text-slate-800">Seal & Unloading Photo</span>
                <span className="text-[11px] text-slate-400 block">Capture dock container seal before opening</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                setPhotoUploaded(true);
                showToast({
                  type: 'info',
                  title: 'Photo Uploaded',
                  message: 'Container seal verification photograph captured.'
                });
              }}
              className={`px-3 py-1 text-xs font-medium rounded-lg transition-colors ${
                photoUploaded ? 'bg-emerald-100 text-emerald-800' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              {photoUploaded ? 'Seal Verified ✓' : 'Simulate Photo'}
            </button>
          </div>
        </div>
      </Modal>

      {/* Incident Reporting Modal */}
      <Modal
        isOpen={isIncidentModalOpen}
        onClose={() => setIsIncidentModalOpen(false)}
        title="Report Roadside / Transit Incident"
        subtitle={`Real-time telemetry alert for ${activeShipment.id}`}
        footer={
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsIncidentModalOpen(false)}
              className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmitIncident}
              className="px-4 py-1.5 text-xs font-semibold text-white bg-amber-600 hover:bg-amber-700 rounded-lg shadow-2xs transition-colors"
            >
              Broadcast Incident to Command Center
            </button>
          </div>
        }
      >
        <div className="space-y-4 text-xs">
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">Incident Category</label>
            <select
              value={incidentType}
              onChange={(e) => setIncidentType(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs bg-white focus:outline-hidden"
            >
              <option value="Traffic Congestion / Construction">Traffic Congestion / Road Construction</option>
              <option value="Severe Weather / Flooding">Severe Weather / Waterlogging</option>
              <option value="Mechanical Puncture / Flat Tire">Mechanical Puncture / Flat Tire</option>
              <option value="Engine / Auxiliary Cooling Warning">Engine / Auxiliary Cooling Warning</option>
              <option value="Toll Plaza System Delay">Toll Plaza FASTag Failure / Delay</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">Incident Narrative & Estimated Delay</label>
            <textarea
              rows={3}
              value={incidentDescription}
              onChange={(e) => setIncidentDescription(e.target.value)}
              placeholder="Describe highway location, landmark, and anticipated delay in minutes..."
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};
