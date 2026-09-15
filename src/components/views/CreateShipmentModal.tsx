import React, { useState, useMemo } from 'react';
import { useLogistics } from '../../context/LogisticsContext';
import { Modal } from '../common/Modal';
import { PriorityLevel } from '../../types';
import { TariffRatingEngine } from '../../modules/pricing/TariffRatingEngine';
import { AuditComplianceEngine } from '../../modules/audit/AuditComplianceEngine';
import { Calculator, ShieldCheck } from 'lucide-react';

export const CreateShipmentModal: React.FC = () => {
  const {
    isCreateShipmentModalOpen,
    setIsCreateShipmentModalOpen,
    customers,
    vehicles,
    drivers,
    warehouses,
    addShipment,
    showToast
  } = useLogistics();

  const [customerId, setCustomerId] = useState(customers[0]?.id || '');
  const [originCity, setOriginCity] = useState('Mumbai');
  const [originFacility, setOriginFacility] = useState('WH-01 Mumbai Port Hub');
  const [destCity, setDestCity] = useState('Bengaluru');
  const [destFacility, setDestFacility] = useState('WH-02 Bengaluru Fulfillment');
  const [packageType, setPackageType] = useState('Palletized Auto Components');
  const [weightKg, setWeightKg] = useState<number>(3850);
  const [driverId, setDriverId] = useState(drivers[0]?.id || '');
  const [vehicleId, setVehicleId] = useState(vehicles[0]?.id || '');
  const [eta, setEta] = useState('Today, 18:30 IST');
  const [priority, setPriority] = useState<PriorityLevel>('High');

  // Real-time Tariff Rating Engine Integration
  const estimatedTariff = useMemo(() => {
    return TariffRatingEngine.calculateTariff({
      originPostalCode: '400001',
      destinationPostalCode: '560001',
      originZone: 'Zone 2 - Regional',
      destinationZone: 'Zone 5 - National Trunk',
      distanceKm: 980,
      mode: 'Road FTL',
      cargo: {
        lengthCm: 120,
        widthCm: 80,
        heightCm: 140,
        weightActualKg: Number(weightKg) || 1000,
        piecesCount: 4
      },
      accessorials: {
        liftgatePickup: true,
        liftgateDelivery: true
      }
    });
  }, [weightKg]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const customer = customers.find((c) => c.id === customerId) || customers[0];
    const driver = drivers.find((d) => d.id === driverId) || drivers[0];
    const vehicle = vehicles.find((v) => v.id === vehicleId) || vehicles[0];

    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const newId = `LGX-2026-${randomNum}`;
    const newOrderId = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;

    addShipment({
      id: newId,
      orderId: newOrderId,
      customerId: customer.id,
      customerName: customer.companyName,
      status: 'In Transit',
      priority: priority,
      origin: {
        city: originCity,
        facility: originFacility,
        address: `${originFacility}, Industrial Zone`
      },
      destination: {
        city: destCity,
        facility: destFacility,
        address: `${destFacility}, Logistics Corridor`
      },
      driverId: driver.id,
      driverName: driver.name,
      driverPhone: driver.phone,
      vehicleId: vehicle.id,
      vehiclePlate: vehicle.licensePlate,
      weightKg: Number(weightKg),
      packageType: packageType,
      currentLocation: `${originCity} Outer Expressway`,
      eta: eta,
      progressPercent: 12,
      stops: [
        {
          id: `stp-1-${Date.now()}`,
          name: `${originCity} Hub Dock`,
          type: 'Pickup',
          scheduledTime: 'Today, 06:00 IST',
          actualTime: 'Today, 06:14 IST',
          status: 'Completed'
        },
        {
          id: `stp-2-${Date.now()}`,
          name: `${originCity}-${destCity} Midway Highway Checkpoint`,
          type: 'Inspection',
          scheduledTime: 'Today, 12:00 IST',
          status: 'In Progress'
        },
        {
          id: `stp-3-${Date.now()}`,
          name: `${destCity} Receiving Dock`,
          type: 'Delivery',
          scheduledTime: eta,
          status: 'Pending'
        }
      ],
      notes: [`Shipment created manually via LogiCore Command Console by Operations Dispatcher.`]
    });

    // Record cryptographically chained audit log
    AuditComplianceEngine.recordEvent({
      actorId: 'usr-dispatch',
      actorName: 'Operations Dispatcher',
      actorRole: 'Operations',
      action: 'Consignment Created & Dispatched',
      entityType: 'Shipment',
      entityId: newId,
      changesDiff: {
        freightCost: { before: null, after: estimatedTariff.netPayableTotal },
        status: { before: 'Draft', after: 'In Transit' }
      }
    });

    showToast({
      type: 'success',
      title: 'Consignment Dispatched',
      message: `${newId} generated with tariff estimate of $${estimatedTariff.netPayableTotal.toFixed(2)} USD.`
    });

    setIsCreateShipmentModalOpen(false);
  };

  return (
    <Modal
      isOpen={isCreateShipmentModalOpen}
      onClose={() => setIsCreateShipmentModalOpen(false)}
      title="Create New Consignment Dispatch"
      subtitle="Issue electronic bill of lading and assign fleet resources"
      maxWidth="max-w-2xl"
      footer={
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsCreateShipmentModalOpen(false)}
            className="px-3.5 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="px-4 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-2xs"
          >
            Issue & Dispatch Shipment
          </button>
        </div>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        {/* Customer & Priority */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium text-slate-700 mb-1">Customer Account</label>
            <select
              value={customerId}
              onChange={(e) => setCustomerId(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs bg-white focus:outline-hidden"
            >
              {customers.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.companyName} ({c.industry})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-medium text-slate-700 mb-1">Consignment Priority</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as PriorityLevel)}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs bg-white focus:outline-hidden"
            >
              <option value="Normal">Normal Standard</option>
              <option value="High">High Express</option>
              <option value="Urgent">Critical / Hot Shot</option>
            </select>
          </div>
        </div>

        {/* Origin & Destination */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-3 bg-slate-50 rounded-xl border border-slate-100">
          <div>
            <label className="block font-medium text-slate-700 mb-1">Origin City & Facility</label>
            <input
              type="text"
              value={originFacility}
              onChange={(e) => setOriginFacility(e.target.value)}
              className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs bg-white mb-2"
              placeholder="e.g. WH-01 Mumbai Port Hub"
            />
            <input
              type="text"
              value={originCity}
              onChange={(e) => setOriginCity(e.target.value)}
              className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs bg-white"
              placeholder="Origin City"
            />
          </div>

          <div>
            <label className="block font-medium text-slate-700 mb-1">Destination City & Facility</label>
            <input
              type="text"
              value={destFacility}
              onChange={(e) => setDestFacility(e.target.value)}
              className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs bg-white mb-2"
              placeholder="e.g. WH-02 Bengaluru Fulfillment"
            />
            <input
              type="text"
              value={destCity}
              onChange={(e) => setDestCity(e.target.value)}
              className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs bg-white"
              placeholder="Destination City"
            />
          </div>
        </div>

        {/* Cargo & Weight */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium text-slate-700 mb-1">Cargo Description</label>
            <input
              type="text"
              value={packageType}
              onChange={(e) => setPackageType(e.target.value)}
              placeholder="e.g. Heavy Steel Castings"
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:outline-hidden"
            />
          </div>
          <div>
            <label className="block font-medium text-slate-700 mb-1">Gross Freight Weight (kg)</label>
            <input
              type="number"
              value={weightKg}
              onChange={(e) => setWeightKg(Number(e.target.value))}
              min={50}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:outline-hidden"
            />
          </div>
        </div>

        {/* Driver & Vehicle Allocation */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block font-medium text-slate-700 mb-1">Pilot Driver</label>
            <select
              value={driverId}
              onChange={(e) => setDriverId(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs bg-white focus:outline-hidden"
            >
              {drivers.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name} ({d.status})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-medium text-slate-700 mb-1">Assigned Vehicle</label>
            <select
              value={vehicleId}
              onChange={(e) => setVehicleId(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs bg-white focus:outline-hidden"
            >
              {vehicles.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.id} — {v.licensePlate} ({v.type})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-medium text-slate-700 mb-1">Target ETA</label>
            <input
              type="text"
              value={eta}
              onChange={(e) => setEta(e.target.value)}
              placeholder="e.g. Tomorrow, 14:00 IST"
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:outline-hidden"
            />
          </div>
        </div>

        {/* Real-time Tariff Rating Engine Output */}
        <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="flex items-center gap-1.5 text-slate-900">
              <Calculator className="w-3.5 h-3.5 text-[#FF4D2A]" />
              <span>Real-Time Tariff Quote (Rating Engine)</span>
            </span>
            <span className="text-[11px] font-mono text-slate-500">
              Chargeable: {estimatedTariff.chargeableWeightKg} kg
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="p-2 bg-white rounded-lg border border-slate-200">
              <div className="text-[10px] text-slate-500">Base Freight</div>
              <div className="font-mono font-bold text-slate-900">
                ${estimatedTariff.baseFreightAmount.toFixed(2)}
              </div>
            </div>
            <div className="p-2 bg-white rounded-lg border border-slate-200">
              <div className="text-[10px] text-slate-500">Fuel & Accessorials</div>
              <div className="font-mono font-bold text-slate-900">
                ${(estimatedTariff.fuelSurchargeAmount + estimatedTariff.accessorialsTotal).toFixed(2)}
              </div>
            </div>
            <div className="p-2 bg-[#FFF2EE] rounded-lg border border-[#FFD2C7]">
              <div className="text-[10px] text-[#FF4D2A] font-bold">Est. Total Payable</div>
              <div className="font-mono font-bold text-[#FF4D2A]">
                ${estimatedTariff.netPayableTotal.toFixed(2)}
              </div>
            </div>
          </div>
        </div>
      </form>
    </Modal>
  );
};
