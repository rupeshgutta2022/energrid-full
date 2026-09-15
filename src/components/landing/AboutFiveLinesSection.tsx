import React, { useState } from 'react';
import {
  Globe2,
  Activity,
  Award,
  Warehouse,
  ShieldCheck,
  ChevronDown,
  ArrowRight,
  Calculator,
  Search,
  FileText,
  Clock,
  Download,
  CheckCircle2
} from 'lucide-react';

interface AboutFiveLinesSectionProps {
  onCalculateRate: () => void;
  onTrackShipment: () => void;
  onRequestBL: () => void;
  onBookUnloading: () => void;
  onDownloadDeck: () => void;
}

interface AboutLine {
  id: number;
  icon: React.ElementType;
  title: string;
  summary: string;
  badge: string;
  details: string;
  metrics: { label: string; value: string }[];
  actionLabel: string;
  actionIcon: React.ElementType;
  onAction: () => void;
  accentColor: string;
  badgeColor: string;
}

export const AboutFiveLinesSection: React.FC<AboutFiveLinesSectionProps> = ({
  onCalculateRate,
  onTrackShipment,
  onRequestBL,
  onBookUnloading,
  onDownloadDeck
}) => {
  const [activeLine, setActiveLine] = useState<number | null>(1);

  const lines: AboutLine[] = [
    {
      id: 1,
      icon: Globe2,
      title: '140+ Multimodal Transit Corridors',
      summary: 'Seamless ocean container drayage, highway FTL/LCL, and next-flight air cargo across global trade routes.',
      badge: 'Multimodal Reach',
      details: 'Connecting primary industrial corridors between Asia, Europe, the Middle East, and North America with direct container terminal drayage at Nhava Sheva, Singapore, and Rotterdam.',
      metrics: [
        { label: 'Active Corridors', value: '140+' },
        { label: 'Connected Fleet', value: '500+ Trucks' },
        { label: 'Air Hubs', value: '18 Gateway Terminals' }
      ],
      actionLabel: 'Calculate Route Tariff',
      actionIcon: Calculator,
      onAction: onCalculateRate,
      accentColor: 'text-[#e98622]',
      badgeColor: 'bg-amber-50 text-amber-800 border-amber-200'
    },
    {
      id: 2,
      icon: Activity,
      title: 'Zero-Blind-Spot Satellite Telematics',
      summary: '30-second live GPS heartbeat, -20°C cold-chain sensors, and tamper-evident container seal tracking.',
      badge: 'Real-Time Telematics',
      details: 'Continuous sensor telemetry streaming directly to our 24/7 Global Command Center with automated temperature excursion alarms and geo-fence alerts.',
      metrics: [
        { label: 'GPS Ping Rate', value: '30 Seconds' },
        { label: 'Cold-Chain Range', value: '-20°C to +25°C' },
        { label: 'Security Seals', value: 'Tamper Audited' }
      ],
      actionLabel: 'Track Live Cargo',
      actionIcon: Search,
      onAction: onTrackShipment,
      accentColor: 'text-cyan-600',
      badgeColor: 'bg-cyan-50 text-cyan-800 border-cyan-200'
    },
    {
      id: 3,
      icon: Award,
      title: 'Contractual 99.8% On-Time SLA Guarantee',
      summary: 'Milestone-enforced freight movement backed by penalty-supported SLAs and AI predictive detours.',
      badge: 'Performance SLA',
      details: 'Our operating system algorithms detect congestion hotspots in advance to dispatch automated detour paths, ensuring just-in-time warehouse arrival.',
      metrics: [
        { label: 'On-Time SLA', value: '99.8%' },
        { label: 'Delay Policy', value: 'Penalty-Backed' },
        { label: 'Monthly Shipments', value: '48,290+' }
      ],
      actionLabel: 'Request Commercial B/L',
      actionIcon: FileText,
      onAction: onRequestBL,
      accentColor: 'text-emerald-600',
      badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200'
    },
    {
      id: 4,
      icon: Warehouse,
      title: '1.8M Sq. Ft. Automated 3PL Smart Hubs',
      summary: 'High-velocity barcode sortation, dock appointment scheduling, and sub-18 min cross-dock turnaround.',
      badge: 'Smart Warehousing',
      details: 'Strategically positioned grade-A fulfillment nodes with automated bay slotting, RF barcode verification, and bonded customs holding yards.',
      metrics: [
        { label: 'Warehousing Space', value: '1.8M Sq. Ft.' },
        { label: 'Avg Dock Turnaround', value: '<18 Minutes' },
        { label: 'Strategic Metros', value: '5 Primary Hubs' }
      ],
      actionLabel: 'Book Unloading Bay',
      actionIcon: Clock,
      onAction: onBookUnloading,
      accentColor: 'text-purple-600',
      badgeColor: 'bg-purple-50 text-purple-800 border-purple-200'
    },
    {
      id: 5,
      icon: ShieldCheck,
      title: 'Automated Regulatory & Customs Compliance',
      summary: 'Instant GST e-Way bills, automated FASTag electronic toll processing, and AEO-T2 green-channel status.',
      badge: 'Statutory Compliance',
      details: 'Direct statutory API integration eliminating border impoundments, certified with ISO 9001, ISO 27001, and SOC2 Type II data protection.',
      metrics: [
        { label: 'Customs Rating', value: 'AEO-T2 Green Channel' },
        { label: 'Tax Filings', value: '100% e-Way Automated' },
        { label: 'Data Security', value: 'SOC2 & ISO 27001' }
      ],
      actionLabel: 'Download Company Profile',
      actionIcon: Download,
      onAction: onDownloadDeck,
      accentColor: 'text-indigo-600',
      badgeColor: 'bg-indigo-50 text-indigo-800 border-indigo-200'
    }
  ];

  return (
    <section id="about-company" className="py-14 sm:py-16 bg-white border-b border-slate-200 scroll-mt-14">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Simple & Clear Section Header */}
        <div className="text-center mb-8 sm:mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-[#e98622] bg-amber-50 px-3 py-1 rounded-full border border-amber-200 inline-block mb-2.5">
            About Logistico Enterprise
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Five Pillars of Multimodal Freight Excellence
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1.5 max-w-lg mx-auto">
            Click any of our 5 operational commitments below to explore capabilities and guarantees.
          </p>
        </div>

        {/* The 5 Interactive Lines */}
        <div className="space-y-2.5">
          {lines.map((item) => {
            const Icon = item.icon;
            const ActionIcon = item.actionIcon;
            const isOpen = activeLine === item.id;

            return (
              <div
                key={item.id}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'bg-slate-50/90 border-[#e98622]/60 shadow-sm'
                    : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
                }`}
              >
                {/* Interactive Clickable Line Header */}
                <button
                  type="button"
                  onClick={() => setActiveLine(isOpen ? null : item.id)}
                  className="w-full p-4 sm:p-4.5 text-left flex items-center justify-between gap-3 cursor-pointer focus:outline-none"
                >
                  <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
                    {/* Line Index Number */}
                    <span className="text-xs font-mono font-bold text-slate-400 shrink-0 w-6">
                      0{item.id}
                    </span>

                    {/* Themed Icon */}
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                        isOpen ? 'bg-[#e98622] text-white shadow-xs' : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>

                    {/* Headline and Brief Summary */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-sm font-bold text-slate-900 truncate">
                          {item.title}
                        </h3>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border hidden sm:inline-block ${item.badgeColor}`}>
                          {item.badge}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 truncate mt-0.5">
                        {item.summary}
                      </p>
                    </div>
                  </div>

                  {/* Toggle Arrow */}
                  <div className="shrink-0 pl-2">
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center transition-transform duration-200 ${
                        isOpen ? 'bg-slate-200/80 text-slate-900 rotate-180' : 'text-slate-400'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </div>
                </button>

                {/* Expanded Interactive Tray */}
                {isOpen && (
                  <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-1 border-t border-slate-200/60 animate-in fade-in duration-150">
                    <p className="text-xs text-slate-600 leading-relaxed max-w-3xl mb-3">
                      {item.details}
                    </p>

                    {/* Interactive Metrics Row */}
                    <div className="grid grid-cols-3 gap-2 sm:gap-3 py-2.5 border-y border-slate-200/70 mb-3 bg-white/70 rounded-xl px-3">
                      {item.metrics.map((m, mIdx) => (
                        <div key={mIdx} className="text-center">
                          <div className="text-[10px] text-slate-400 uppercase font-semibold">{m.label}</div>
                          <div className="text-xs sm:text-sm font-black text-slate-900 mt-0.5">{m.value}</div>
                        </div>
                      ))}
                    </div>

                    {/* Quick Contextual Interactive Action Button */}
                    <div className="flex items-center justify-between gap-3 pt-1">
                      <span className="text-[11px] text-emerald-700 font-medium flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Verified Enterprise Standard
                      </span>

                      <button
                        type="button"
                        onClick={item.onAction}
                        className="px-3.5 py-2 bg-[#e98622] hover:bg-[#d87617] text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
                      >
                        <ActionIcon className="w-3.5 h-3.5" />
                        <span>{item.actionLabel}</span>
                        <ArrowRight className="w-3 h-3 ml-0.5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
