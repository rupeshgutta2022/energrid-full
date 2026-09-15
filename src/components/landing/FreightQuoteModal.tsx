import React, { useState } from 'react';
import { useLogistics } from '../../context/LogisticsContext';
import {
  X,
  Calculator,
  Ship,
  Plane,
  Truck,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Calendar,
  MapPin,
  Package,
  Clock,
  Sparkles,
  FileText
} from 'lucide-react';
import { LogisticoLogo } from '../common/LogisticoLogo';

interface FreightQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FreightQuoteModal: React.FC<FreightQuoteModalProps> = ({ isOpen, onClose }) => {
  const { showToast, addOrder } = useLogistics();

  const [freightMode, setFreightMode] = useState<'ocean' | 'air' | 'road'>('ocean');
  const [origin, setOrigin] = useState('Port of Shanghai (CNSHA)');
  const [destination, setDestination] = useState('Port of Rotterdam (NLRTM)');
  const [weightKg, setWeightKg] = useState('4200');
  const [volumeCbm, setVolumeCbm] = useState('18');
  const [cargoType, setCargoType] = useState('Industrial Electronics & Equipment');
  const [contactName, setContactName] = useState('Sarah Jenkins');
  const [contactEmail, setContactEmail] = useState('s.jenkins@transglobal.com');
  const [contactPhone, setContactPhone] = useState('+1 (555) 392-8819');
  const [companyName, setCompanyName] = useState('TransGlobal Industries');
  const [includeCustoms, setIncludeCustoms] = useState(true);
  const [includeInsurance, setIncludeInsurance] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [generatedQuote, setGeneratedQuote] = useState<{
    quoteId: string;
    totalAmount: number;
    transitDays: string;
    co2Estimate: string;
  } | null>(null);

  if (!isOpen) return null;

  // Real-time calculation based on parameters
  const weight = parseFloat(weightKg) || 1000;
  const volume = parseFloat(volumeCbm) || 5;

  const baseRates = {
    ocean: { perKg: 0.45, perCbm: 85, baseTransit: '24-28 Days', min: 1400 },
    air: { perKg: 4.80, perCbm: 380, baseTransit: '3-5 Days', min: 2800 },
    road: { perKg: 1.10, perCbm: 120, baseTransit: '4-7 Days', min: 850 }
  }[freightMode];

  const rawCost = Math.max(baseRates.min, weight * baseRates.perKg + volume * baseRates.perCbm);
  const customsFee = includeCustoms ? 320 : 0;
  const insuranceFee = includeInsurance ? Math.round(rawCost * 0.018) : 0;
  const estimatedTotal = Math.round(rawCost + customsFee + insuranceFee);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const nextId = `QT-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      setGeneratedQuote({
        quoteId: nextId,
        totalAmount: estimatedTotal,
        transitDays: baseRates.baseTransit,
        co2Estimate: freightMode === 'ocean' ? '0.24 t CO2e' : freightMode === 'air' ? '1.82 t CO2e' : '0.65 t CO2e'
      });

      // Optionally record order in system
      try {
        addOrder({
          orderNumber: `ORD-${nextId}`,
          customerName: companyName || contactName,
          origin,
          destination,
          itemsCount: Math.ceil(weight / 50),
          totalWeightKg: weight,
          totalValue: estimatedTotal * 1.4,
          status: 'Draft',
          priority: freightMode === 'air' ? 'High' : 'Normal',
          readyDate: new Date().toISOString().split('T')[0]
        });
      } catch {
        // Safe fallback
      }

      showToast({
        type: 'success',
        title: `Official Quote ${nextId} Generated!`,
        message: `Estimated investment: $${estimatedTotal.toLocaleString()} for ${origin} → ${destination}. Check your email.`
      });

      setIsSubmitting(false);
    }, 600);
  };

  const handleReset = () => {
    setGeneratedQuote(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <LogisticoLogo size="sm" variant="dark" />
            <div className="border-l border-slate-700 pl-3">
              <h3 className="text-sm font-bold text-white tracking-wide">Instant Freight Quote Estimator</h3>
              <p className="text-[11px] text-slate-400">Guaranteed real-time spot rates & transit estimations</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        {generatedQuote ? (
          <div className="p-6 sm:p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#FF4D2A] bg-[#FFF2EE] px-3 py-1 rounded-full">
              Reference #{generatedQuote.quoteId}
            </span>
            <h2 className="text-2xl font-black text-slate-900 mt-3">Official Rate Estimate Generated</h2>
            <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
              Your binding quotation has been logged and dispatched to <span className="font-semibold text-slate-800">{contactEmail}</span>.
            </p>

            {/* Rate Breakdown Card */}
            <div className="mt-6 p-5 bg-slate-50 rounded-xl border border-slate-200 text-left max-w-lg mx-auto">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <span className="text-xs text-slate-500">Routing</span>
                <span className="text-xs font-bold text-slate-900">{origin} → {destination}</span>
              </div>
              <div className="grid grid-cols-3 gap-3 py-3 border-b border-slate-200 text-center">
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">Freight Mode</div>
                  <div className="text-xs font-bold text-slate-800 capitalize mt-0.5">{freightMode} Freight</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">Estimated Transit</div>
                  <div className="text-xs font-bold text-slate-800 mt-0.5">{generatedQuote.transitDays}</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">Carbon Impact</div>
                  <div className="text-xs font-bold text-emerald-600 mt-0.5">{generatedQuote.co2Estimate}</div>
                </div>
              </div>
              <div className="flex items-baseline justify-between pt-3">
                <div>
                  <span className="text-xs font-semibold text-slate-500 block">Total Indicative Rate (USD)</span>
                  <span className="text-[10px] text-slate-400">Includes fuel surcharge & customs documentation</span>
                </div>
                <div className="text-2xl font-black text-[#FF4D2A]">
                  ${generatedQuote.totalAmount.toLocaleString()}
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={handleReset}
                className="w-full sm:w-auto px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg transition-colors cursor-pointer"
              >
                Calculate Another Route
              </button>
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-2.5 bg-[#FF4D2A] hover:bg-[#E23817] text-white text-xs font-bold rounded-lg shadow-md transition-colors cursor-pointer"
              >
                Confirm & Proceed
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
            {/* Mode Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                Select Freight Mode
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                <button
                  type="button"
                  onClick={() => setFreightMode('ocean')}
                  className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                    freightMode === 'ocean'
                      ? 'border-[#FF4D2A] bg-[#FFF2EE] text-[#FF4D2A] font-bold shadow-xs'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                  }`}
                >
                  <Ship className="w-5 h-5 mx-auto mb-1 text-[#FF4D2A]" />
                  <div className="text-xs font-semibold">Ocean Cargo</div>
                  <div className="text-[10px] opacity-75">FCL / LCL Container</div>
                </button>

                <button
                  type="button"
                  onClick={() => setFreightMode('air')}
                  className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                    freightMode === 'air'
                      ? 'border-[#FF4D2A] bg-[#FFF2EE] text-[#FF4D2A] font-bold shadow-xs'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                  }`}
                >
                  <Plane className="w-5 h-5 mx-auto mb-1 text-[#FF4D2A]" />
                  <div className="text-xs font-semibold">Air Express</div>
                  <div className="text-[10px] opacity-75">3-5 Days Priority</div>
                </button>

                <button
                  type="button"
                  onClick={() => setFreightMode('road')}
                  className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                    freightMode === 'road'
                      ? 'border-[#FF4D2A] bg-[#FFF2EE] text-[#FF4D2A] font-bold shadow-xs'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                  }`}
                >
                  <Truck className="w-5 h-5 mx-auto mb-1 text-[#FF4D2A]" />
                  <div className="text-xs font-semibold">Road Freight</div>
                  <div className="text-[10px] opacity-75">Interstate & Regional</div>
                </button>
              </div>
            </div>

            {/* Origin and Destination */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#FF4D2A]" />
                  Origin Port / Hub
                </label>
                <select
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  className="w-full text-xs rounded-lg border border-slate-300 px-3 py-2 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#FF4D2A]"
                >
                  <option value="Port of Shanghai (CNSHA)">Port of Shanghai, China</option>
                  <option value="Port of Singapore (SGSIN)">Port of Singapore</option>
                  <option value="Port of Rotterdam (NLRTM)">Port of Rotterdam, Netherlands</option>
                  <option value="Port of Los Angeles (USLAX)">Port of Los Angeles, USA</option>
                  <option value="Port of Hamburg (DEHAM)">Port of Hamburg, Germany</option>
                  <option value="Jebel Ali Port (AEJEA)">Jebel Ali Port, Dubai UAE</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  Destination Port / Facility
                </label>
                <select
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full text-xs rounded-lg border border-slate-300 px-3 py-2 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#FF4D2A]"
                >
                  <option value="Port of Rotterdam (NLRTM)">Port of Rotterdam, Netherlands</option>
                  <option value="Port of Los Angeles (USLAX)">Port of Los Angeles, USA</option>
                  <option value="Port of Hamburg (DEHAM)">Port of Hamburg, Germany</option>
                  <option value="Port of Newark / NY (USNWK)">Port of Newark, USA</option>
                  <option value="Port of Antwerp (BEANR)">Port of Antwerp, Belgium</option>
                  <option value="Port of Tokyo (JPTYO)">Port of Tokyo, Japan</option>
                </select>
              </div>
            </div>

            {/* Cargo Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
                  <Package className="w-3.5 h-3.5 text-slate-400" />
                  Weight (kg)
                </label>
                <input
                  type="number"
                  min="50"
                  max="100000"
                  value={weightKg}
                  onChange={(e) => setWeightKg(e.target.value)}
                  className="w-full text-xs rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF4D2A]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Volume (CBM)
                </label>
                <input
                  type="number"
                  min="1"
                  max="200"
                  value={volumeCbm}
                  onChange={(e) => setVolumeCbm(e.target.value)}
                  className="w-full text-xs rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF4D2A]"
                />
              </div>

              <div className="col-span-2 sm:col-span-1">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Cargo Description
                </label>
                <input
                  type="text"
                  value={cargoType}
                  onChange={(e) => setCargoType(e.target.value)}
                  placeholder="e.g. Industrial Machinery"
                  className="w-full text-xs rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF4D2A]"
                />
              </div>
            </div>

            {/* Value-Add Services */}
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-2">
                Value-Added Protection
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <label className="flex items-center gap-2 text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeCustoms}
                    onChange={(e) => setIncludeCustoms(e.target.checked)}
                    className="rounded text-[#FF4D2A] focus:ring-[#FF4D2A]"
                  />
                  <span>Automated Customs Clearance (+$320)</span>
                </label>
                <label className="flex items-center gap-2 text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeInsurance}
                    onChange={(e) => setIncludeInsurance(e.target.checked)}
                    className="rounded text-[#FF4D2A] focus:ring-[#FF4D2A]"
                  />
                  <span>Comprehensive Cargo Protection</span>
                </label>
              </div>
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  className="w-full text-xs rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF4D2A]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Company</label>
                <input
                  type="text"
                  required
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full text-xs rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF4D2A]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Business Email</label>
                <input
                  type="email"
                  required
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className="w-full text-xs rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF4D2A]"
                />
              </div>
            </div>

            {/* Instant Live Estimate Bar */}
            <div className="flex items-center justify-between p-4 bg-[#FFF2EE] rounded-xl border border-[#FFD2C7]">
              <div>
                <span className="text-[11px] font-bold text-[#FF4D2A] uppercase tracking-wider block">
                  Estimated Spot Rate
                </span>
                <span className="text-xs text-slate-600">Transit: ~{baseRates.baseTransit}</span>
              </div>
              <div className="text-right">
                <span className="text-2xl font-black text-[#FF4D2A] block leading-none">
                  ${estimatedTotal.toLocaleString()}
                </span>
                <span className="text-[10px] text-slate-500 font-medium">USD all-in estimate</span>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-100">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 rounded-lg transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2.5 bg-[#FF4D2A] hover:bg-[#E23817] text-white text-xs font-bold rounded-lg shadow-md hover:shadow-lg transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-70"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Calculating Route Tariff...</span>
                  </>
                ) : (
                  <>
                    <span>Generate Official Quote</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
