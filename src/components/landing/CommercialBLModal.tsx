import React from 'react';
import { Modal } from '../common/Modal';
import {
  FileText,
  Printer,
  Download,
  ShieldCheck,
  Ship,
  MapPin,
  Calendar,
  CheckCircle2,
  Anchor,
  QrCode
} from 'lucide-react';
import { useLogistics } from '../../context/LogisticsContext';

interface CommercialBLModalProps {
  isOpen: boolean;
  onClose: () => void;
  shipmentId?: string;
}

export const CommercialBLModal: React.FC<CommercialBLModalProps> = ({
  isOpen,
  onClose,
  shipmentId = 'LGX-2026-10482'
}) => {
  const { shipments, showToast } = useLogistics();

  const shipment = shipments.find((s) => s.id === shipmentId) || shipments[0];

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    const documentText = `================================================================================
GLOBAL FREIGHT SOLUTIONS (GFS) — MULTIMODAL OCEAN BILL OF LADING
NON-NEGOTIABLE COURIER & OCEAN CARRIER RELEASE DOCUMENT
================================================================================
B/L NUMBER: BOL-2026-GFS-89211           BOOKING REF: BKG-CN-OAK-9921
ISSUE DATE: 2026-05-01                   STATUS: CLEAN ON BOARD / RELEASED

SHIPPER (EXPORTER):
Orient Precision Technology Ltd.
Pudong Industrial High-Tech Free Trade Zone
Shanghai 200120, China

CONSIGNEE:
Apex Global Distribution Corp.
4400 Maritime Boulevard, Terminal 57
Oakland, CA 94607, United States

NOTIFY PARTY:
Trans-Pacific Customs Brokers Inc.
San Francisco Logistics Plaza, Suite 400
San Francisco, CA 94105, United States

VESSEL & VOYAGE:
Vessel: MV PACIFIC TRADER
Voyage Number: V.248N
IMO Number: 9812049
Flag: Singapore

PORT OF LOADING:
Shanghai International Container Terminal (CN SHG)
Departure: May 3, 2026 - 22:57 UTC

PORT OF DISCHARGE:
Port of Oakland Berth 57 (US OAK)
Estimated Arrival: May 5, 2026 - 09:00 UTC

CONTAINER & SEAL DETAILS:
Container Number: MSKU-908214-8
Container Size/Type: 40' High-Cube Heavy Cargo
Customs Seal Number: SL-892193
Tare Weight: 3,920 KG
Gross Weight: 24,500 KG
Net Weight: 20,580 KG
Total Volume: 67.50 CBM

COMMODITY DESCRIPTION:
1,420 Master Cartons of Advanced Semiconductor Hardware &
Automotive Micro-Controller Assemblies.
Temperature Monitoring Active (-18.0°C to +4.0°C).
Stowed Under Deck in Cell Guide 14-08-02.

FREIGHT STATUS:
Freight Prepaid at Origin.
Port Terminal Handling Charges (THC) Accounted.
Electronic Carrier Release Granted.

AUTHENTICATED DIGITAL SIGNATURE:
Master of Vessel / Authorized Carrier Agent
Global Freight Solutions Maritime Terminal Ops
Signed Electronically at Shanghai Marine Exchange
================================================================================`;

    const blob = new Blob([documentText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Commercial_BL_BOL-2026-GFS-89211.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showToast({
      type: 'success',
      title: 'Commercial B/L Downloaded',
      message: 'Official maritime Bill of Lading BOL-2026-GFS-89211 saved to your device.'
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Official Commercial Bill of Lading (B/L)"
      subtitle="International Maritime Freight Document • Authenticated Electronic Carrier Release"
      maxWidth="max-w-3xl"
      footer={
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2 text-xs text-emerald-700 font-semibold">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Digital Carrier Signature Verified • SOC2 Clean on Board</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>
            <button
              type="button"
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download B/L (PDF / Text)</span>
            </button>
          </div>
        </div>
      }
    >
      <div className="space-y-4 text-slate-800 font-sans">
        {/* Top Header Box */}
        <div className="border-2 border-slate-800 rounded-xl p-4 bg-slate-50/50 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-300 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="flex flex-col gap-0.5">
                <span className="w-4 h-0.5 bg-[#e98622] rounded-full" />
                <span className="w-6 h-0.5 bg-[#e98622] rounded-full" />
                <span className="w-5 h-0.5 bg-[#e98622] rounded-full" />
              </div>
              <div>
                <span className="font-black tracking-tight text-base text-slate-900">
                  GLOBAL FREIGHT SOLUTIONS
                </span>
                <span className="text-[10px] text-slate-500 block uppercase tracking-widest font-bold">
                  International Ocean Freight Forwarding Division
                </span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-bold">
                Bill of Lading No.
              </span>
              <span className="font-mono font-black text-sm text-blue-700">
                BOL-2026-GFS-89211
              </span>
            </div>
          </div>

          {/* Shipper & Consignee */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3 bg-white border border-slate-200 rounded-lg space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Shipper / Exporter
              </span>
              <div className="font-bold text-slate-900">Orient Precision Technology Ltd.</div>
              <div className="text-slate-600 text-[11px] leading-relaxed">
                Pudong Industrial Free Trade Zone, Bldg 4<br />
                Shanghai 200120, China
              </div>
            </div>

            <div className="p-3 bg-white border border-slate-200 rounded-lg space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Consignee (To Order Of)
              </span>
              <div className="font-bold text-slate-900">Apex Global Distribution Corp.</div>
              <div className="text-slate-600 text-[11px] leading-relaxed">
                4400 Maritime Boulevard, Terminal 57<br />
                Oakland, CA 94607, United States
              </div>
            </div>
          </div>

          {/* Vessel & Ports Matrix */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-white p-3 border border-slate-200 rounded-lg">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Ocean Vessel / Voyage
              </span>
              <div className="font-bold text-slate-900 flex items-center gap-1 mt-0.5">
                <Ship className="w-3.5 h-3.5 text-blue-600" />
                <span>MV PACIFIC TRADER</span>
              </div>
              <div className="text-[10px] text-slate-500 font-mono">Voy: V.248N • IMO 9812049</div>
            </div>

            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Port of Loading (POL)
              </span>
              <div className="font-bold text-slate-900 mt-0.5">SHANGHAI (CN SHG)</div>
              <div className="text-[10px] text-slate-500">Terminal 3 East</div>
            </div>

            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Port of Discharge (POD)
              </span>
              <div className="font-bold text-slate-900 mt-0.5">OAKLAND (US OAK)</div>
              <div className="text-[10px] text-slate-500">Berth 57 Outer Harbor</div>
            </div>

            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Freight Payment
              </span>
              <div className="font-bold text-emerald-700 mt-0.5">FREIGHT PREPAID</div>
              <div className="text-[10px] text-slate-500 font-mono">Customs Released</div>
            </div>
          </div>

          {/* Container & Cargo Details */}
          <div className="border border-slate-200 rounded-lg overflow-hidden bg-white">
            <div className="bg-slate-100 px-3 py-2 text-[11px] font-bold text-slate-700 grid grid-cols-4 uppercase tracking-wider">
              <span>Container & Seal #</span>
              <span>No. of Packages</span>
              <span>Commodity Description</span>
              <span className="text-right">Gross Weight / Volume</span>
            </div>
            <div className="p-3 text-xs grid grid-cols-4 items-center border-t border-slate-200">
              <div className="font-mono">
                <div className="font-bold text-blue-700">MSKU-908214-8</div>
                <div className="text-[10px] text-slate-500">Seal: SL-892193</div>
                <div className="text-[10px] text-slate-500">40' High-Cube Reefer</div>
              </div>
              <div className="text-slate-800">
                <span className="font-bold">1,420 Cartons</span>
                <span className="text-[10px] text-slate-500 block">Shrink-Wrapped Pallets</span>
              </div>
              <div className="text-slate-700 text-[11px]">
                High-Precision Microelectronics, Automotive ECU modules & cold-chain components.
              </div>
              <div className="text-right font-mono">
                <div className="font-bold text-slate-900">24,500.00 KG</div>
                <div className="text-[10px] text-slate-500">67.50 CBM</div>
              </div>
            </div>
          </div>

          {/* Carrier Endorsement & Stamps */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 text-xs">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white border border-slate-300 rounded-lg text-center">
                <QrCode className="w-10 h-10 text-slate-800" />
                <span className="text-[8px] font-mono text-slate-400 block mt-0.5">SCAN TO VERIFY</span>
              </div>
              <div className="text-[11px] text-slate-500 space-y-0.5">
                <div>Electronic Maritime Manifest Exchange</div>
                <div className="font-mono text-slate-700">SHA-256: e8f921ab04889c2...</div>
                <div className="text-emerald-600 font-semibold">Authorized by Port Captain</div>
              </div>
            </div>

            {/* Simulated Official Release Stamp */}
            <div className="border-2 border-emerald-600 text-emerald-800 px-4 py-2 rounded-lg font-mono font-bold text-center rotate-[-2deg] bg-emerald-50/50 shadow-xs">
              <div className="text-[9px] uppercase tracking-widest text-emerald-600">CARRIER ENDORSEMENT</div>
              <div className="text-xs tracking-wider">CLEAN ON BOARD • RELEASED</div>
              <div className="text-[9px] font-normal text-emerald-700">SHANGHAI PORT TERMINAL 3</div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
