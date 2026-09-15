import React, { useState, useEffect, useMemo } from 'react';
import { useLogistics } from '../../context/LogisticsContext';
import { ROLE_CONFIGS } from '../../data/authUsers';
import { Search, Package, Truck, User, Building2, FileText, ArrowRight, X, Lock } from 'lucide-react';

export const GlobalSearchModal: React.FC = () => {
  const {
    isGlobalSearchOpen,
    setIsGlobalSearchOpen,
    shipments,
    vehicles,
    drivers,
    warehouses,
    customers,
    orders,
    setSelectedShipmentId,
    setActiveView,
    activeRole,
    currentUser
  } = useLogistics();

  const [query, setQuery] = useState('');

  const roleConfig = ROLE_CONFIGS[activeRole] || ROLE_CONFIGS['Operations'];
  const allowed = useMemo(() => new Set(roleConfig.allowedViews), [roleConfig]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsGlobalSearchOpen(true);
      }
      if (e.key === 'Escape' && isGlobalSearchOpen) {
        setIsGlobalSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isGlobalSearchOpen, setIsGlobalSearchOpen]);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();

    const items: Array<{
      type: 'Shipment' | 'Vehicle' | 'Driver' | 'Warehouse' | 'Customer' | 'Order';
      id: string;
      title: string;
      subtitle: string;
      badge?: string;
      onSelect: () => void;
    }> = [];

    // Shipments (scoped by role)
    if (allowed.has('shipments') || allowed.has('tracking')) {
      shipments.forEach((s) => {
        // Customer scoping
        if (activeRole === 'Customer' && !s.customerName.toLowerCase().includes('northstar')) {
          return;
        }
        // Driver scoping
        if (activeRole === 'Driver' && !s.driverName.toLowerCase().includes('amit') && s.vehicleId !== 'TRK-2042') {
          return;
        }

        if (
          s.id.toLowerCase().includes(q) ||
          s.customerName.toLowerCase().includes(q) ||
          s.destination.city.toLowerCase().includes(q)
        ) {
          items.push({
            type: 'Shipment',
            id: s.id,
            title: `${s.id} — ${s.customerName}`,
            subtitle: `${s.origin.city} → ${s.destination.city}`,
            badge: s.status,
            onSelect: () => {
              setSelectedShipmentId(s.id);
              setActiveView('shipments');
              setIsGlobalSearchOpen(false);
            }
          });
        }
      });
    }

    // Orders (only if role is allowed)
    if (allowed.has('orders')) {
      orders.forEach((o) => {
        if (activeRole === 'Customer' && !o.customerName.toLowerCase().includes('northstar')) {
          return;
        }
        if (o.id.toLowerCase().includes(q) || o.customerName.toLowerCase().includes(q)) {
          items.push({
            type: 'Order',
            id: o.id,
            title: `${o.id} — ${o.customerName}`,
            subtitle: `${o.destinationCity} • ${o.status}`,
            badge: o.status,
            onSelect: () => {
              setActiveView('orders');
              setIsGlobalSearchOpen(false);
            }
          });
        }
      });
    }

    // Vehicles (only if role is allowed)
    if (allowed.has('fleet')) {
      vehicles.forEach((v) => {
        if (
          v.id.toLowerCase().includes(q) ||
          v.model.toLowerCase().includes(q) ||
          v.licensePlate.toLowerCase().includes(q)
        ) {
          items.push({
            type: 'Vehicle',
            id: v.id,
            title: `${v.id} (${v.model})`,
            subtitle: `Plate: ${v.licensePlate} • Location: ${v.currentLocationCity}`,
            badge: v.status,
            onSelect: () => {
              setActiveView('fleet');
              setIsGlobalSearchOpen(false);
            }
          });
        }
      });
    }

    // Drivers (only if role is allowed)
    if (allowed.has('drivers')) {
      drivers.forEach((d) => {
        if (d.name.toLowerCase().includes(q) || d.id.toLowerCase().includes(q)) {
          items.push({
            type: 'Driver',
            id: d.id,
            title: `${d.name} (${d.id})`,
            subtitle: `Phone: ${d.phone} • Safety: ${d.safetyScore}%`,
            badge: d.status,
            onSelect: () => {
              setActiveView('drivers');
              setIsGlobalSearchOpen(false);
            }
          });
        }
      });
    }

    // Warehouses (only if role is allowed)
    if (allowed.has('warehouses')) {
      warehouses.forEach((w) => {
        if (w.name.toLowerCase().includes(q) || w.city.toLowerCase().includes(q) || w.code.toLowerCase().includes(q)) {
          items.push({
            type: 'Warehouse',
            id: w.id,
            title: `${w.name} (${w.code})`,
            subtitle: `${w.city}, ${w.state} • ${w.utilizedCapacityPercent}% capacity`,
            badge: w.status,
            onSelect: () => {
              setActiveView('warehouses');
              setIsGlobalSearchOpen(false);
            }
          });
        }
      });
    }

    // Customers (only if role is allowed)
    if (allowed.has('customers')) {
      customers.forEach((c) => {
        if (c.companyName.toLowerCase().includes(q) || c.name.toLowerCase().includes(q)) {
          items.push({
            type: 'Customer',
            id: c.id,
            title: c.companyName,
            subtitle: `Contact: ${c.name} • ${c.industry}`,
            onSelect: () => {
              setActiveView('customers');
              setIsGlobalSearchOpen(false);
            }
          });
        }
      });
    }

    return items.slice(0, 8);
  }, [query, shipments, vehicles, drivers, warehouses, customers, orders, setSelectedShipmentId, setActiveView, setIsGlobalSearchOpen]);

  if (!isGlobalSearchOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/40 backdrop-blur-xs p-4 sm:p-6 md:p-20">
      <div
        className="mx-auto max-w-2xl transform divide-y divide-slate-100 overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black/5 transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative flex items-center px-4 py-3 bg-slate-50/50">
          <Search className="w-5 h-5 text-slate-400 mr-3" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search shipments (e.g. LGX-2026-10482), vehicles (TRK-2041), drivers, hubs..."
            className="h-9 w-full bg-transparent text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden"
            autoFocus
          />
          <button
            onClick={() => setIsGlobalSearchOpen(false)}
            aria-label="Close search"
            className="p-1 text-slate-400 hover:text-slate-600 rounded-md"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {query.trim() === '' ? (
          <div className="p-6 text-center text-xs text-slate-500">
            <p className="font-medium text-slate-700">Quick suggestions</p>
            <div className="mt-3 flex flex-wrap justify-center gap-2">
              <button
                onClick={() => setQuery('LGX-2026-10482')}
                className="px-2.5 py-1 bg-slate-100 rounded-md hover:bg-slate-200 transition-colors text-slate-700"
              >
                LGX-2026-10482 (Delayed shipment)
              </button>
              <button
                onClick={() => setQuery('TRK-2041')}
                className="px-2.5 py-1 bg-slate-100 rounded-md hover:bg-slate-200 transition-colors text-slate-700"
              >
                TRK-2041 (Maintenance)
              </button>
              <button
                onClick={() => setQuery('Meridian')}
                className="px-2.5 py-1 bg-slate-100 rounded-md hover:bg-slate-200 transition-colors text-slate-700"
              >
                Meridian Foods (Cold chain)
              </button>
            </div>
          </div>
        ) : results.length === 0 ? (
          <div className="p-8 text-center text-xs text-slate-500">
            No matching entities found for "{query}".
          </div>
        ) : (
          <ul className="max-h-96 overflow-y-auto divide-y divide-slate-50 p-2">
            {results.map((res) => {
              const getIcon = () => {
                switch (res.type) {
                  case 'Shipment':
                    return <Package className="w-4 h-4 text-blue-600" />;
                  case 'Vehicle':
                    return <Truck className="w-4 h-4 text-emerald-600" />;
                  case 'Driver':
                    return <User className="w-4 h-4 text-indigo-600" />;
                  case 'Warehouse':
                    return <Building2 className="w-4 h-4 text-amber-600" />;
                  default:
                    return <FileText className="w-4 h-4 text-slate-500" />;
                }
              };

              return (
                <li
                  key={`${res.type}-${res.id}`}
                  onClick={res.onSelect}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="p-2 rounded-lg bg-slate-100 shrink-0">
                      {getIcon()}
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-semibold text-slate-900 truncate flex items-center gap-2">
                        <span>{res.title}</span>
                        {res.badge && (
                          <span className="text-[10px] font-medium px-1.5 py-0.2 bg-slate-100 text-slate-600 rounded">
                            {res.badge}
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-500 truncate">{res.subtitle}</div>
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 shrink-0 ml-2" />
                </li>
              );
            })}
          </ul>
        )}

        <div className="px-4 py-2 bg-slate-50 text-[11px] text-slate-400 flex items-center justify-between">
          <span>Navigate with mouse or enter</span>
          <span>Press ESC to dismiss</span>
        </div>
      </div>
    </div>
  );
};
