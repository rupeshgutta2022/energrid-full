import React, { useState, useMemo } from 'react';
import { useLogistics } from '../../context/LogisticsContext';
import { StatusBadge } from '../common/StatusBadge';
import { RouteInfo } from '../../types';
import { Drawer } from '../common/Drawer';
import { Modal } from '../common/Modal';
import {
  Route as RouteIcon,
  ArrowRight,
  Clock,
  MapPin,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  DollarSign,
  Plus,
  Truck,
  Layers,
  Sparkles,
  Compass,
  Fuel,
  ShieldAlert,
  Gauge,
  Calendar
} from 'lucide-react';
import {
  RouteOptimizationEngine,
  RouteStop,
  VehicleCapacitySpecs,
  OptimizedTripManifest
} from '../../modules/routing/RouteOptimizationEngine';

export const RoutesView: React.FC = () => {
  const { routes, setActiveView, setIsCreateCorridorModalOpen, showToast } = useLogistics();
  const [selectedRoute, setSelectedRoute] = useState<RouteInfo | null>(null);
  const [isOptimizerModalOpen, setIsOptimizerModalOpen] = useState(false);

  // Multi-Stop Route Optimizer State
  const [selectedVehicleType, setSelectedVehicleType] = useState<'TATA_SIGNA' | 'BHARAT_BENZ' | 'ECOMET'>('TATA_SIGNA');

  const vehicleSpecs: Record<'TATA_SIGNA' | 'BHARAT_BENZ' | 'ECOMET', VehicleCapacitySpecs> = {
    TATA_SIGNA: {
      maxPayloadKg: 28000,
      maxCubeM3: 65,
      axleCount: 5,
      maxFrontAxleKg: 7000,
      maxRearAxleKg: 21000,
      curbWeightKg: 11500,
      fuelEfficiencyKmPerLiter: 3.8,
      averageSpeedKmph: 52
    },
    BHARAT_BENZ: {
      maxPayloadKg: 18500,
      maxCubeM3: 45,
      axleCount: 3,
      maxFrontAxleKg: 6500,
      maxRearAxleKg: 13000,
      curbWeightKg: 9500,
      fuelEfficiencyKmPerLiter: 4.5,
      averageSpeedKmph: 58
    },
    ECOMET: {
      maxPayloadKg: 9500,
      maxCubeM3: 28,
      axleCount: 2,
      maxFrontAxleKg: 4000,
      maxRearAxleKg: 8000,
      curbWeightKg: 5200,
      fuelEfficiencyKmPerLiter: 6.2,
      averageSpeedKmph: 62
    }
  };

  // Sample Stops to sequence
  const [candidateStops, setCandidateStops] = useState<RouteStop[]>([
    {
      id: 'STP-1',
      sequenceIndex: 1,
      type: 'DELIVERY',
      facilityName: 'Pune Chakan Industrial Hub',
      city: 'Pune',
      location: { latitude: 18.5204, longitude: 73.8567, city: 'Pune' },
      demandWeightKg: 6200,
      demandVolumeM3: 14.5,
      timeWindowStart: '08:00',
      timeWindowEnd: '12:00',
      serviceDurationMinutes: 45
    },
    {
      id: 'STP-2',
      sequenceIndex: 2,
      type: 'DELIVERY',
      facilityName: 'Nashik Ambad Distribution Center',
      city: 'Nashik',
      location: { latitude: 19.9975, longitude: 73.7898, city: 'Nashik' },
      demandWeightKg: 4800,
      demandVolumeM3: 11.2,
      timeWindowStart: '13:00',
      timeWindowEnd: '17:00',
      serviceDurationMinutes: 35
    },
    {
      id: 'STP-3',
      sequenceIndex: 3,
      type: 'DELIVERY',
      facilityName: 'Surat Hazira Petrochemical Logistics Bay',
      city: 'Surat',
      location: { latitude: 21.1702, longitude: 72.8311, city: 'Surat' },
      demandWeightKg: 8500,
      demandVolumeM3: 18.0,
      timeWindowStart: '10:00',
      timeWindowEnd: '16:00',
      serviceDurationMinutes: 60
    },
    {
      id: 'STP-4',
      sequenceIndex: 4,
      type: 'DELIVERY',
      facilityName: 'Ahmedabad Sanand Automotive Park',
      city: 'Ahmedabad',
      location: { latitude: 23.0225, longitude: 72.5714, city: 'Ahmedabad' },
      demandWeightKg: 5100,
      demandVolumeM3: 12.0,
      timeWindowStart: '18:00',
      timeWindowEnd: '22:00',
      serviceDurationMinutes: 40
    }
  ]);

  const originDepot: RouteStop = {
    id: 'DEPOT-MUM',
    sequenceIndex: 0,
    type: 'PICKUP',
    facilityName: 'Mumbai West Cargo Gateway (WH-01)',
    city: 'Mumbai',
    location: { latitude: 19.076, longitude: 72.8777, city: 'Mumbai' },
    demandWeightKg: 0,
    demandVolumeM3: 0,
    timeWindowStart: '06:00',
    timeWindowEnd: '23:00',
    serviceDurationMinutes: 60
  };

  // Run 2-Opt heuristic
  const optimizedManifest: OptimizedTripManifest = useMemo(() => {
    return RouteOptimizationEngine.optimizeStopSequence(originDepot, candidateStops, vehicleSpecs[selectedVehicleType]);
  }, [selectedVehicleType, candidateStops]);

  // Network KPIs
  const totalNetworkKm = routes.reduce((sum, r) => sum + (r.distanceKm || 0), 0);
  const totalActiveTrucks = routes.reduce((sum, r) => sum + (r.activeTrucks || 0), 0);
  const totalTollsCost = routes.reduce((sum, r) => sum + (r.tollsCost || 0), 0);

  return (
    <div className="space-y-6">
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">National Freight Corridors & Dynamic Dispatch</h1>
          <p className="text-xs text-slate-500 mt-1">
            Highway toll profiling, 2-Opt multi-stop sequence planning, Hours of Service (HOS) rest breaks, and payload capacity.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setIsOptimizerModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg shadow-2xs transition-colors cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>2-Opt Route Optimizer</span>
          </button>

          <button
            onClick={() => setIsCreateCorridorModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-2xs transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Custom Corridor</span>
          </button>
        </div>
      </div>

      {/* Corridor Network KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-medium text-slate-500">Corridor Lanes</span>
            <RouteIcon className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-xl font-bold text-slate-900 mt-1.5">{routes.length} Trunks</div>
          <div className="text-[10px] text-slate-400 mt-0.5">{totalNetworkKm.toLocaleString()} total highway km</div>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-medium text-slate-500">Active Fleet on Highway</span>
            <Truck className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-xl font-bold text-slate-900 mt-1.5">{totalActiveTrucks} Vehicles</div>
          <div className="text-[10px] text-emerald-600 font-medium mt-0.5">Telematics GPS monitored</div>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-medium text-slate-500">FASTag Tolls / Leg</span>
            <DollarSign className="w-4 h-4 text-purple-500" />
          </div>
          <div className="text-xl font-bold text-slate-900 mt-1.5">₹{Math.round(totalTollsCost / routes.length || 0)}</div>
          <div className="text-[10px] text-slate-400 mt-0.5">Automated barrier pass</div>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-medium text-slate-500">Fleet Efficiency Score</span>
            <Gauge className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-xl font-bold text-slate-900 mt-1.5">94.8%</div>
          <div className="text-[10px] text-slate-400 mt-0.5">On-time corridor schedule</div>
        </div>
      </div>

      {/* Corridor Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {routes.map((r) => (
          <div
            key={r.id}
            onClick={() => setSelectedRoute(r)}
            className="p-5 bg-white rounded-xl border border-slate-200 shadow-xs hover:border-blue-400 transition-all space-y-4 cursor-pointer"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-slate-900">{r.name}</h3>
                  <span className="text-xs font-mono font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                    {r.code}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-600 mt-1">
                  <span className="font-semibold text-slate-800">{r.originCity}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                  <span className="font-semibold text-slate-800">{r.destCity}</span>
                </div>
              </div>
              <StatusBadge status={r.status} size="sm" />
            </div>

            <div className="grid grid-cols-3 gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs">
              <div>
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Distance</div>
                <div className="text-sm font-bold text-slate-900 mt-0.5">{r.distanceKm} km</div>
              </div>
              <div>
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Avg Transit</div>
                <div className="text-sm font-bold text-slate-900 mt-0.5">{r.avgDurationHours} hrs</div>
              </div>
              <div>
                <div className="text-[10px] text-slate-400 uppercase font-semibold">FASTag Tolls</div>
                <div className="text-sm font-bold text-emerald-700 mt-0.5">₹{r.tollsCost}</div>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <span className="text-slate-500">
                Active commercial haulers: <strong className="text-slate-900">{r.activeTrucks} trucks</strong>
              </span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveView('tracking');
                }}
                className="font-semibold text-blue-600 hover:text-blue-700"
              >
                Inspect Live Radar →
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Corridor Detail Drawer */}
      {selectedRoute && (
        <Drawer
          isOpen={!!selectedRoute}
          onClose={() => setSelectedRoute(null)}
          title={`${selectedRoute.name} (${selectedRoute.code})`}
          subtitle={`${selectedRoute.originCity} to ${selectedRoute.destCity}`}
          footer={
            <div className="flex items-center justify-between w-full">
              <button
                onClick={() => {
                  setActiveView('tracking');
                  setSelectedRoute(null);
                }}
                className="px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-2xs cursor-pointer"
              >
                Open Live GPS Telematics
              </button>
              <button
                onClick={() => setSelectedRoute(null)}
                className="px-3.5 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer"
              >
                Close
              </button>
            </div>
          }
        >
          <div className="space-y-6 text-xs">
            {/* Summary */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-slate-500 font-semibold uppercase text-[10px]">Corridor Status</span>
                <StatusBadge status={selectedRoute.status} size="sm" />
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-slate-200/60">
                <span className="text-slate-500 font-semibold uppercase text-[10px]">Corridor Distance</span>
                <span className="font-bold text-slate-900">{selectedRoute.distanceKm} km</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-slate-200/60">
                <span className="text-slate-500 font-semibold uppercase text-[10px]">FASTag Toll Budget</span>
                <span className="font-bold text-emerald-700">₹{selectedRoute.tollsCost.toLocaleString()}</span>
              </div>
            </div>

            {/* Checkpoints */}
            <div className="space-y-2">
              <h4 className="font-semibold text-slate-900 uppercase text-[11px] tracking-wider">
                Corridor Checkpoints & Geofenced Toll Plazas
              </h4>
              <div className="border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-100 bg-white">
                <div className="p-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-blue-500" />
                    <div>
                      <div className="font-bold text-slate-900">{selectedRoute.originCity} Origin Freight Gate</div>
                      <div className="text-[10px] text-slate-400">Km 0.0 • Departure Terminal</div>
                    </div>
                  </div>
                  <span className="text-slate-600 font-mono">00:00</span>
                </div>

                <div className="p-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-amber-500" />
                    <div>
                      <div className="font-bold text-slate-900">National Highway FASTag Barrier (Plaza A)</div>
                      <div className="text-[10px] text-slate-400">Electronic e-Way Bill validation</div>
                    </div>
                  </div>
                  <span className="text-emerald-700 font-semibold font-mono">₹480</span>
                </div>

                <div className="p-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-purple-500" />
                    <div>
                      <div className="font-bold text-slate-900">Commercial Pilot Rest Stop (HOS Certified)</div>
                      <div className="text-[10px] text-slate-400">45-min mandatory driver rest area</div>
                    </div>
                  </div>
                  <span className="text-slate-600 font-mono">4.5 hrs</span>
                </div>

                <div className="p-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <div>
                      <div className="font-bold text-slate-900">{selectedRoute.destCity} Terminal Dock</div>
                      <div className="text-[10px] text-slate-400">Final Consignee Gateway</div>
                    </div>
                  </div>
                  <span className="text-slate-600 font-mono">+{selectedRoute.avgDurationHours} hrs</span>
                </div>
              </div>
            </div>
          </div>
        </Drawer>
      )}

      {/* 2-Opt Multi-Stop Route Optimizer Modal */}
      <Modal
        isOpen={isOptimizerModalOpen}
        onClose={() => setIsOptimizerModalOpen(false)}
        title="2-Opt Multi-Stop Routing & Payload Capacity Optimizer"
      >
        <div className="space-y-4 text-xs">
          <p className="text-slate-600">
            Executes Clarke-Wright savings calculation and 2-Opt local search to order delivery waypoints, eliminating route
            crisscrossing and ensuring regulatory Driver Hours of Service (HOS) compliance.
          </p>

          {/* Vehicle Selector */}
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
            <span className="font-bold text-slate-800 uppercase text-[10px]">Select Assigned Commercial Vehicle Chassis</span>
            <div className="grid grid-cols-3 gap-2">
              {[
                { key: 'TATA_SIGNA', label: 'Tata Signa 4825.T', payload: '28.0 MT • 65 m³' },
                { key: 'BHARAT_BENZ', label: 'BharatBenz 2823R', payload: '18.5 MT • 45 m³' },
                { key: 'ECOMET', label: 'Ashok Leyland Ecomet', payload: '9.5 MT • 28 m³' }
              ].map((v) => (
                <button
                  key={v.key}
                  type="button"
                  onClick={() => setSelectedVehicleType(v.key as any)}
                  className={`p-2 rounded-lg text-left border cursor-pointer ${
                    selectedVehicleType === v.key
                      ? 'border-blue-600 bg-blue-50/60 text-blue-950 font-bold'
                      : 'border-slate-200 bg-white text-slate-700'
                  }`}
                >
                  <div className="text-xs font-semibold">{v.label}</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">{v.payload}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Optimized Manifest Summary */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-center">
            <div className="p-2.5 bg-blue-50/60 border border-blue-200 rounded-xl">
              <span className="text-[10px] text-blue-600 uppercase font-semibold">Total Tour Distance</span>
              <div className="text-base font-bold text-blue-950 mt-0.5">{optimizedManifest.totalDistanceKm} km</div>
            </div>
            <div className="p-2.5 bg-emerald-50/60 border border-emerald-200 rounded-xl">
              <span className="text-[10px] text-emerald-600 uppercase font-semibold">Weight Utilization</span>
              <div className="text-base font-bold text-emerald-950 mt-0.5">
                {optimizedManifest.vehicleCapacityUtilizationPercent}% ({optimizedManifest.totalFreightWeightKg.toLocaleString()} kg)
              </div>
            </div>
            <div className="p-2.5 bg-purple-50/60 border border-purple-200 rounded-xl">
              <span className="text-[10px] text-purple-600 uppercase font-semibold">Volume Utilization</span>
              <div className="text-base font-bold text-purple-950 mt-0.5">
                {optimizedManifest.volumeCapacityUtilizationPercent}% ({optimizedManifest.totalVolumeM3} m³)
              </div>
            </div>
            <div className="p-2.5 bg-amber-50/60 border border-amber-200 rounded-xl">
              <span className="text-[10px] text-amber-600 uppercase font-semibold">Estimated Fuel</span>
              <div className="text-base font-bold text-amber-950 mt-0.5">
                {optimizedManifest.estimatedFuelConsumptionLiters} Liters
              </div>
            </div>
          </div>

          {/* Stops Sequence */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-800 uppercase text-[10px]">
                Optimized Waypoint Sequence (Savings Score: +{optimizedManifest.savingsScorePercent}%)
              </span>
              <span className="text-[10px] text-slate-500">
                Rest Stops Enforced: {optimizedManifest.mandatoryRestStopsRequired}
              </span>
            </div>

            <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
              <div className="p-2 bg-slate-100 rounded-lg flex items-center justify-between text-slate-700">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px] font-bold">
                    0
                  </span>
                  <span className="font-bold text-slate-900">{originDepot.facilityName}</span>
                </div>
                <span className="text-[10px] font-mono text-slate-500">Origin Depot (Departure: 06:00)</span>
              </div>

              {optimizedManifest.stops.map((stop) => (
                <div
                  key={stop.id}
                  className="p-2.5 bg-white border border-slate-200 rounded-lg flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold">
                      {stop.sequenceIndex}
                    </span>
                    <div>
                      <div className="font-bold text-slate-900">{stop.facilityName}</div>
                      <div className="text-[10px] text-slate-500">
                        {stop.demandWeightKg.toLocaleString()} kg • {stop.demandVolumeM3} m³
                      </div>
                    </div>
                  </div>
                  <div className="text-right font-mono text-[11px]">
                    <div className="text-blue-700 font-semibold">ETA: {stop.estimatedArrival}</div>
                    <div className="text-slate-400 text-[10px]">Depart: {stop.estimatedDeparture}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              onClick={() => {
                showToast({
                  type: 'success',
                  title: 'Optimized Manifest Dispatched',
                  message: `Trip ${optimizedManifest.tripId} generated and pushed to driver mobile terminal.`
                });
                setIsOptimizerModalOpen(false);
              }}
              className="px-4 py-2 bg-slate-900 text-white font-semibold rounded-lg hover:bg-slate-800 cursor-pointer"
            >
              Commit Optimized Manifest
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
