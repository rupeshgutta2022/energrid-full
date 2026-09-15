import React, { useState, useEffect } from 'react';
import { useLogistics } from '../../context/LogisticsContext';
import { StatusBadge } from '../common/StatusBadge';
import { Shipment } from '../../types';
import {
  MapPin,
  Truck,
  Compass,
  Navigation,
  Fuel,
  Clock,
  Radio,
  Thermometer,
  ShieldCheck,
  RotateCcw,
  AlertTriangle,
  Play,
  Pause,
  ArrowRight
} from 'lucide-react';

export const LiveTrackingView: React.FC = () => {
  const { shipments, trackingShipmentId, setTrackingShipmentId, updateShipmentProgress, showToast } = useLogistics();

  const [isSimulating, setIsSimulating] = useState<boolean>(true);
  const [selectedPin, setSelectedPin] = useState<Shipment | null>(null);

  // Auto-select initial shipment from context or first active
  useEffect(() => {
    if (trackingShipmentId) {
      const found = shipments.find((s) => s.id === trackingShipmentId);
      if (found) setSelectedPin(found);
    } else {
      setSelectedPin(shipments[0]);
    }
  }, [trackingShipmentId, shipments]);

  // Simulation tick: updates shipment progress gently when active
  useEffect(() => {
    if (!isSimulating) return;
    const interval = setInterval(() => {
      shipments.forEach((s) => {
        if (s.status === 'In Transit' || s.status === 'Out for Delivery') {
          const next = (s.progressPercent + 1) % 100;
          updateShipmentProgress(s.id, next);
        }
      });
    }, 4000);
    return () => clearInterval(interval);
  }, [isSimulating, shipments, updateShipmentProgress]);

  // National City Hub coordinates on the SVG map (1000 x 600 canvas)
  const cityNodes: Record<string, { x: number; y: number; label: string }> = {
    Delhi: { x: 420, y: 110, label: 'Delhi NCR (WH-03)' },
    Jaipur: { x: 340, y: 170, label: 'Jaipur Depot' },
    Ahmedabad: { x: 230, y: 270, label: 'Ahmedabad Hub' },
    Mumbai: { x: 250, y: 380, label: 'Mumbai Port Hub (WH-01)' },
    Pune: { x: 290, y: 410, label: 'Pune Logistics Park' },
    Nagpur: { x: 480, y: 330, label: 'Nagpur Central' },
    Hyderabad: { x: 460, y: 440, label: 'Hyderabad Tech Depot' },
    Bengaluru: { x: 410, y: 520, label: 'Bengaluru Fulfillment (WH-02)' },
    Chennai: { x: 500, y: 520, label: 'Chennai Seaport (WH-05)' },
    Kolkata: { x: 740, y: 290, label: 'Kolkata East (WH-04)' }
  };

  // Route curves between hubs
  const corridors = [
    { id: 'c1', from: 'Mumbai', to: 'Bengaluru', path: 'M 250 380 Q 320 440 410 520' },
    { id: 'c2', from: 'Mumbai', to: 'Delhi', path: 'M 250 380 Q 240 280 420 110' },
    { id: 'c3', from: 'Bengaluru', to: 'Chennai', path: 'M 410 520 L 500 520' },
    { id: 'c4', from: 'Mumbai', to: 'Nagpur', path: 'M 250 380 L 480 330' },
    { id: 'c5', from: 'Nagpur', to: 'Kolkata', path: 'M 480 330 L 740 290' },
    { id: 'c6', from: 'Hyderabad', to: 'Bengaluru', path: 'M 460 440 L 410 520' }
  ];

  // Calculate current SVG position for a shipment along its route
  const getShipmentPosition = (s: Shipment) => {
    const origin = cityNodes[s.origin.city] || { x: 250, y: 380 };
    const dest = cityNodes[s.destination.city] || { x: 410, y: 520 };
    const t = s.progressPercent / 100;
    const x = origin.x + (dest.x - origin.x) * t;
    const y = origin.y + (dest.y - origin.y) * t;
    return { x, y };
  };

  return (
    <div className="space-y-6">
      {/* View Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Live Fleet Telematics & Radar</h1>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Satellite Geofencing Active
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Real-time GPS trajectory simulator, speed telematics, FASTag toll checkpoints, and corridor routing.
          </p>
        </div>

        {/* Simulation Control */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setIsSimulating(!isSimulating)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg shadow-2xs transition-colors ${
              isSimulating
                ? 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                : 'bg-emerald-600 text-white hover:bg-emerald-700'
            }`}
          >
            {isSimulating ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isSimulating ? 'Pause Telemetry' : 'Resume Telemetry'}</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Map & Telematics Inspection Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left 3 cols: Vector Route Radar Map */}
        <div className="lg:col-span-3 bg-slate-950 rounded-2xl border border-slate-800 shadow-xl overflow-hidden relative flex flex-col">
          {/* Map Top Status Strip */}
          <div className="p-4 border-b border-slate-800/80 bg-slate-900/80 backdrop-blur-xs flex items-center justify-between z-10 text-xs text-slate-300">
            <div className="flex items-center gap-4">
              <span className="font-semibold text-white flex items-center gap-1.5">
                <Radio className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
                Corridor Vector Radar
              </span>
              <span className="hidden sm:inline text-slate-400">Showing {shipments.length} tracked transports</span>
            </div>

            <div className="flex items-center gap-2 text-[11px]">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-blue-500" /> In Transit
              </span>
              <span className="flex items-center gap-1 ml-2">
                <span className="w-2 h-2 rounded-full bg-amber-500" /> Delayed
              </span>
              <span className="flex items-center gap-1 ml-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" /> Delivered
              </span>
            </div>
          </div>

          {/* Interactive SVG Canvas */}
          <div className="relative w-full h-[520px] bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] overflow-hidden">
            <svg
              className="w-full h-full"
              viewBox="100 50 800 520"
              preserveAspectRatio="xMidYMid meet"
            >
              {/* Corridor Highway Paths */}
              {corridors.map((c) => (
                <path
                  key={c.id}
                  d={c.path}
                  fill="none"
                  stroke="#334155"
                  strokeWidth="2.5"
                  strokeDasharray="6 4"
                  className="transition-all"
                />
              ))}

              {/* City / Hub Nodes */}
              {Object.entries(cityNodes).map(([name, pos]) => (
                <g key={name} transform={`translate(${pos.x}, ${pos.y})`}>
                  <circle r="7" fill="#1e293b" stroke="#60a5fa" strokeWidth="2" />
                  <circle r="3" fill="#60a5fa" />
                  <text
                    x="12"
                    y="4"
                    fill="#94a3b8"
                    fontSize="11"
                    fontWeight="600"
                    fontFamily="sans-serif"
                  >
                    {name}
                  </text>
                </g>
              ))}

              {/* Vehicle Consignment Markers */}
              {shipments.map((s) => {
                const pos = getShipmentPosition(s);
                const isSelected = selectedPin?.id === s.id;
                const isDelayed = s.status === 'Delayed';
                const isDelivered = s.status === 'Delivered';

                const markerColor = isDelivered ? '#10b981' : isDelayed ? '#f59e0b' : '#3b82f6';

                return (
                  <g
                    key={s.id}
                    transform={`translate(${pos.x}, ${pos.y})`}
                    onClick={() => {
                      setSelectedPin(s);
                      setTrackingShipmentId(s.id);
                    }}
                    className="cursor-pointer transition-transform hover:scale-125"
                  >
                    {/* Pulsing ring for selected vehicle */}
                    {isSelected && (
                      <circle
                        r="18"
                        fill="none"
                        stroke={markerColor}
                        strokeWidth="1.5"
                        opacity="0.6"
                        className="animate-ping"
                      />
                    )}

                    <circle
                      r={isSelected ? "11" : "8"}
                      fill={markerColor}
                      stroke="#ffffff"
                      strokeWidth="2"
                    />

                    {/* Vehicle Plate Callout */}
                    <g transform="translate(12, -8)">
                      <rect
                        width={isSelected ? "95" : "75"}
                        height="18"
                        rx="4"
                        fill="#0f172a"
                        stroke={isSelected ? markerColor : "#334155"}
                        strokeWidth="1"
                      />
                      <text
                        x="6"
                        y="13"
                        fill="#f8fafc"
                        fontSize="9"
                        fontWeight="700"
                        fontFamily="monospace"
                      >
                        {s.id.split('-').slice(2).join('-')} • {s.progressPercent}%
                      </text>
                    </g>
                  </g>
                );
              })}
            </svg>

            {/* Bottom floating legend */}
            <div className="absolute bottom-4 left-4 bg-slate-900/90 backdrop-blur-md border border-slate-800 p-3 rounded-xl text-[11px] text-slate-400 space-y-1">
              <div className="font-semibold text-slate-200">National Corridors Active</div>
              <div>NH-48 (Western Corridor) • NH-44 (North-South Backbone)</div>
              <div>Click any vehicle icon to open live sensor & telematics telemetry</div>
            </div>
          </div>
        </div>

        {/* Right 1 col: Live Telematics Dossier of Selected Vehicle */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 flex flex-col justify-between space-y-4">
          {selectedPin ? (
            <div className="space-y-5 text-xs">
              {/* Header */}
              <div className="pb-3 border-b border-slate-100">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-base text-slate-900">{selectedPin.id}</span>
                  <StatusBadge status={selectedPin.status} size="sm" />
                </div>
                <div className="text-slate-500 font-medium mt-0.5">{selectedPin.customerName}</div>
              </div>

              {/* Telematics Real-Time Gauge Readouts */}
              <div className="grid grid-cols-2 gap-2.5">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">Speed Telemetry</div>
                  <div className="text-base font-bold text-slate-900 mt-0.5">
                    {selectedPin.status === 'Delivered' ? '0 km/h (Docked)' : '62 km/h'}
                  </div>
                  <div className="text-[10px] text-emerald-600 font-medium">Corridor limit: 80 km/h</div>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">Cargo Temp</div>
                  <div className="text-base font-bold text-slate-900 mt-0.5 flex items-center gap-1">
                    <Thermometer className="w-3.5 h-3.5 text-blue-600" />
                    4.2°C
                  </div>
                  <div className="text-[10px] text-emerald-600 font-medium">Reefer nominal</div>
                </div>
              </div>

              {/* Route Progress Bar */}
              <div>
                <div className="flex justify-between font-semibold text-slate-800 mb-1.5">
                  <span>Transit Progress</span>
                  <span>{selectedPin.progressPercent}%</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600 rounded-full transition-all duration-500"
                    style={{ width: `${selectedPin.progressPercent}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                  <span>{selectedPin.origin.city}</span>
                  <span>ETA: {selectedPin.eta}</span>
                  <span>{selectedPin.destination.city}</span>
                </div>
              </div>

              {/* Driver & Hauler Asset info */}
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Pilot Driver:</span>
                  <span className="font-semibold text-slate-800">{selectedPin.driverName}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Vehicle Unit:</span>
                  <span className="font-semibold text-slate-800 font-mono">{selectedPin.vehiclePlate}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Gross Freight:</span>
                  <span className="font-semibold text-slate-800">{selectedPin.weightKg.toLocaleString()} kg</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Destination:</span>
                  <span className="font-semibold text-slate-800 text-right">{selectedPin.destination.facility}</span>
                </div>
              </div>

              {/* Active Highway Stops */}
              <div className="space-y-1.5">
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Corridor Waypoints</div>
                {selectedPin.stops.map((st) => (
                  <div key={st.id} className="flex items-center justify-between text-[11px] p-2 bg-slate-50 rounded-lg">
                    <span className="font-medium text-slate-700 truncate">{st.name}</span>
                    <StatusBadge status={st.status} size="sm" />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="p-8 text-center text-xs text-slate-400">
              Select a vehicle icon on the radar to inspect telematics.
            </div>
          )}

          <div className="pt-3 border-t border-slate-100">
            <button
              onClick={() => {
                showToast({
                  type: 'info',
                  title: 'FASTag Toll Telemetry Transmitted',
                  message: `Latest toll plaza transit logged at 62 km/h without queue.`
                });
              }}
              className="w-full py-2 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors text-center"
            >
              Ping Vehicle Telematics Unit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
