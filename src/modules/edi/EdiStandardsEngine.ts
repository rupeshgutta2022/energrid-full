/**
 * @file EdiStandardsEngine.ts
 * Enterprise Electronic Data Interchange (EDI) Engine for Supply Chain Automation.
 * Conforms to ANSI ASC X12 Standards for Transportation (EDI 204, EDI 214, EDI 210, EDI 990).
 */

import { Shipment } from '../../types';

export interface Edi204LoadTender {
  interchangeControlNumber: string;
  transactionSetControlNumber: string;
  shipmentId: string;
  billOfLadingNumber: string;
  shipperName: string;
  shipperAddress: string;
  shipperCity: string;
  consigneeName: string;
  consigneeAddress: string;
  consigneeCity: string;
  carrierScac: string;
  equipmentType: string;
  totalWeightLbs: number;
  totalVolumeCuFt: number;
  scheduledPickupDate: string;
  scheduledDeliveryDate: string;
  specialInstructions: string[];
}

export interface Edi214StatusUpdate {
  transactionControlNumber: string;
  shipmentId: string;
  carrierScac: string;
  statusCode: 'AF' | 'X6' | 'AG' | 'D1' | 'X1' | 'SD'; // ASC X12 status codes
  statusDescription: string;
  city: string;
  stateCode: string;
  eventDateTime: string;
  referenceNumber: string;
  reasonCode?: string;
}

export interface Edi210FreightInvoice {
  invoiceNumber: string;
  shipmentId: string;
  carrierScac: string;
  billToParty: string;
  invoiceDate: string;
  netChargeAmountUsd: number;
  freightChargeUsd: number;
  fuelSurchargeUsd: number;
  accessorialChargesUsd: number;
  paymentTerms: string;
}

export class EdiStandardsEngine {
  public static readonly VERSION = 'X12-004010';
  public static readonly LOGISTICO_SCAC = 'LGXC'; // Standard Carrier Alpha Code

  /**
   * Generates a fully compliant ANSI X12 204 Motor Carrier Load Tender document.
   */
  public static generateEdi204(shipment: Shipment): { rawEdi: string; parsed: Edi204LoadTender } {
    const today = new Date();
    const dateStrYYMMDD = today.toISOString().slice(2, 10).replace(/-/g, '');
    const timeStrHHMM = today.toTimeString().slice(0, 5).replace(':', '');
    const controlNum = Math.floor(100000 + Math.random() * 900000).toString();
    const bolNum = `BOL-${shipment.id.replace(/[^0-9]/g, '')}`;
    const weightLbs = Math.round(shipment.weightKg * 2.20462);
    const volumeCuFt = Math.round(shipment.volumeM3 * 35.3147);

    const segments: string[] = [];

    // Interchange Control Header (ISA)
    segments.push(
      `ISA*00*          *00*          *ZZ*LOGISTICO_PROD *02*${this.LOGISTICO_SCAC.padEnd(15, ' ')}*${dateStrYYMMDD}*${timeStrHHMM}*U*00401*${controlNum}*0*P*>~`
    );

    // Functional Group Header (GS)
    segments.push(`GS*SM*LOGISTICO*${this.LOGISTICO_SCAC}*${dateStrYYMMDD}*${timeStrHHMM}*${controlNum}*X*004010~`);

    // Transaction Set Header (ST 204)
    segments.push(`ST*204*${controlNum.slice(-4)}~`);

    // Beginning Segment for Motor Carrier Load Tender (B2)
    segments.push(`B2*${this.LOGISTICO_SCAC}*${shipment.id}**PP~`);

    // Business Instructions / Reference Identifiers (L11)
    segments.push(`L11*${bolNum}*BM~`); // Bill of Lading
    segments.push(`L11*${shipment.trackingNumber}*SI~`); // Shipper's ID

    // Date/Time Reference (G62)
    segments.push(`G62*10*${dateStrYYMMDD}*U*${timeStrHHMM}~`);

    // Shipper / Origin Name (N1/N3/N4)
    segments.push(`N1*SH*${shipment.customerName}*93*CUST-${shipment.customerId.slice(-4)}~`);
    segments.push(`N3*${shipment.origin.address || 'Industrial Logistics Park'}~`);
    segments.push(`N4*${shipment.origin.city}*MH*400001*IND~`);

    // Consignee / Destination Name (N1/N3/N4)
    segments.push(`N1*CN*Consignee Receiving Dept*93*DEST-01~`);
    segments.push(`N3*${shipment.destination.address || 'Central Distribution Center'}~`);
    segments.push(`N4*${shipment.destination.city}*DL*110001*IND~`);

    // Stop-Off Details (S5) - Stop 1: Pickup
    segments.push(`S5*1*LD*${weightLbs}*L*${volumeCuFt}*E~`);
    segments.push(`G62*68*${dateStrYYMMDD}*I*0800~`);

    // Stop-Off Details (S5) - Stop 2: Delivery
    segments.push(`S5*2*UL*${weightLbs}*L*${volumeCuFt}*E~`);
    segments.push(`G62*70*${dateStrYYMMDD}*I*1700~`);

    // Equipment Details (N7)
    segments.push(`N7*${shipment.vehiclePlate || 'MH04AB1234'}*TL*${weightLbs}*G*******TF~`);

    // Line Item Description (OID)
    segments.push(`OID*${shipment.id}*${shipment.cargoDescription || 'Commercial General Freight'}*PCS*${shipment.packageType || 'Pallets'}*${weightLbs}*L~`);

    // Total Weight / Shipment Summary (L3)
    segments.push(`L3*${weightLbs}*B***${Math.round(shipment.estimatedCost * 100)}~`);

    // Transaction Set Trailer (SE)
    // Count segments from ST to SE inclusive
    const stIndex = segments.findIndex((s) => s.startsWith('ST*204'));
    const segmentCount = segments.length - stIndex + 1;
    segments.push(`SE*${segmentCount}*${controlNum.slice(-4)}~`);

    // Functional Group Trailer (GE)
    segments.push(`GE*1*${controlNum}~`);

    // Interchange Control Trailer (IEA)
    segments.push(`IEA*1*${controlNum}~`);

    const rawEdi = segments.join('\n');

    const parsed: Edi204LoadTender = {
      interchangeControlNumber: controlNum,
      transactionSetControlNumber: controlNum.slice(-4),
      shipmentId: shipment.id,
      billOfLadingNumber: bolNum,
      shipperName: shipment.customerName,
      shipperAddress: shipment.origin.address || 'Industrial Logistics Park',
      shipperCity: shipment.origin.city,
      consigneeName: 'Consignee Receiving Dept',
      consigneeAddress: shipment.destination.address || 'Central Distribution Center',
      consigneeCity: shipment.destination.city,
      carrierScac: this.LOGISTICO_SCAC,
      equipmentType: 'TL (Truckload Box Van)',
      totalWeightLbs: weightLbs,
      totalVolumeCuFt: volumeCuFt,
      scheduledPickupDate: shipment.departureTime,
      scheduledDeliveryDate: shipment.eta,
      specialInstructions: [
        shipment.temperatureControlled ? `Cold-Chain active: ${shipment.targetTempC}°C` : 'Standard dry haulage',
        `Priority: ${shipment.priority}`
      ]
    };

    return { rawEdi, parsed };
  }

  /**
   * Generates a compliant ANSI X12 214 Transportation Carrier Shipment Status Message.
   */
  public static generateEdi214(shipment: Shipment): { rawEdi: string; parsed: Edi214StatusUpdate } {
    const today = new Date();
    const dateStr = today.toISOString().slice(2, 10).replace(/-/g, '');
    const timeStr = today.toTimeString().slice(0, 4).replace(':', '');
    const controlNum = Math.floor(100000 + Math.random() * 900000).toString();

    // Map shipment status to ANSI ASC X12 AT7 status code
    let x12Code: Edi214StatusUpdate['statusCode'] = 'X6';
    let statusDesc = 'En Route to Destination';

    switch (shipment.status) {
      case 'Pending':
      case 'Confirmed':
        x12Code = 'AG';
        statusDesc = 'Arrived at Pickup Terminal';
        break;
      case 'Assigned':
      case 'In Transit':
        x12Code = 'AF';
        statusDesc = 'Carrier Departed Origin Facility';
        break;
      case 'At Warehouse':
        x12Code = 'X6';
        statusDesc = 'In Transit - Arrived at Cross-Dock Transit Hub';
        break;
      case 'Out for Delivery':
        x12Code = 'SD';
        statusDesc = 'Dispatched Out for Final Delivery';
        break;
      case 'Delivered':
        x12Code = 'D1';
        statusDesc = 'Consignment Completed and Delivered with POD';
        break;
      case 'Delayed':
      case 'Exception':
        x12Code = 'X1';
        statusDesc = 'Milestone Exception / Transit Delay Flagged';
        break;
      default:
        x12Code = 'X6';
        statusDesc = 'En Route';
    }

    const segments: string[] = [
      `ISA*00*          *00*          *02*${this.LOGISTICO_SCAC.padEnd(15, ' ')}*ZZ*RECEIVER_CORP   *${dateStr}*${timeStr}*U*00401*${controlNum}*0*P*>~`,
      `GS*QM*${this.LOGISTICO_SCAC}*RECEIVER_CORP*${dateStr}*${timeStr}*${controlNum}*X*004010~`,
      `ST*214*${controlNum.slice(-4)}~`,
      `B10*${shipment.trackingNumber}*${shipment.id}*${this.LOGISTICO_SCAC}~`,
      `L11*${shipment.trackingNumber}*SI~`,
      `N1*CN*${shipment.customerName}~`,
      `N4*${shipment.currentLocation.city}*MH**IND~`,
      `MS1*${shipment.currentLocation.city}*MH*IND~`,
      `MS2*${this.LOGISTICO_SCAC}*${shipment.vehiclePlate || 'MH04AB1234'}~`,
      `AT7*${x12Code}*NS***${dateStr}*${timeStr}*LT~`, // AT7 Status Event
      `CD1*${Math.round(shipment.weightKg * 2.20462)}*L*1*PCS~`,
      `SE*10*${controlNum.slice(-4)}~`,
      `GE*1*${controlNum}~`,
      `IEA*1*${controlNum}~`
    ];

    const rawEdi = segments.join('\n');

    const parsed: Edi214StatusUpdate = {
      transactionControlNumber: controlNum,
      shipmentId: shipment.id,
      carrierScac: this.LOGISTICO_SCAC,
      statusCode: x12Code,
      statusDescription: statusDesc,
      city: shipment.currentLocation.city,
      stateCode: 'MH',
      eventDateTime: `${dateStr} ${timeStr}`,
      referenceNumber: shipment.trackingNumber,
      reasonCode: shipment.status === 'Delayed' ? 'WEATHER_CONGESTION' : undefined
    };

    return { rawEdi, parsed };
  }

  /**
   * Generates a compliant ANSI X12 210 Freight Details and Invoice document.
   */
  public static generateEdi210(shipment: Shipment): { rawEdi: string; parsed: Edi210FreightInvoice } {
    const today = new Date();
    const dateStr = today.toISOString().slice(2, 10).replace(/-/g, '');
    const timeStr = today.toTimeString().slice(0, 4).replace(':', '');
    const invoiceNum = `INV-210-${shipment.id.replace(/[^0-9]/g, '')}`;
    const baseFreight = Math.round(shipment.estimatedCost * 0.75);
    const fuelSurcharge = Math.round(shipment.estimatedCost * 0.15);
    const accessorial = shipment.estimatedCost - (baseFreight + fuelSurcharge);

    const segments: string[] = [
      `ISA*00*          *00*          *02*${this.LOGISTICO_SCAC.padEnd(15, ' ')}*ZZ*INVOICE_AUDIT  *${dateStr}*${timeStr}*U*00401*000000088*0*P*>~`,
      `GS*IM*${this.LOGISTICO_SCAC}*INVOICE_AUDIT*${dateStr}*${timeStr}*88*X*004010~`,
      `ST*210*0088~`,
      `B3*B*${invoiceNum}*${shipment.id}*PP**${dateStr}*${shipment.estimatedCost * 100}**${this.LOGISTICO_SCAC}~`,
      `N1*BT*${shipment.customerName}*93*CUST-${shipment.customerId.slice(-4)}~`,
      `N3*Accounts Payable Billing Center~`,
      `N4*${shipment.destination.city}*MH*400051*IND~`,
      `LX*1~`,
      `L5*1*${shipment.cargoDescription || 'Commercial Freight'}~`,
      `L0*1*${Math.round(shipment.weightKg * 2.20462)}*LB*${Math.round(shipment.volumeM3 * 35.3147)}*E~`,
      `L1*1*${baseFreight * 100}*FR*${baseFreight * 100}*400*BASE FREIGHT~`,
      `LX*2~`,
      `L1*2*${fuelSurcharge * 100}*FR*${fuelSurcharge * 100}*405*FUEL SURCHARGE BRENT INDEX~`,
      `L3*${Math.round(shipment.weightKg * 2.20462)}*B***${shipment.estimatedCost * 100}~`,
      `SE*14*0088~`,
      `GE*1*88~`,
      `IEA*1*000000088~`
    ];

    const rawEdi = segments.join('\n');

    const parsed: Edi210FreightInvoice = {
      invoiceNumber: invoiceNum,
      shipmentId: shipment.id,
      carrierScac: this.LOGISTICO_SCAC,
      billToParty: shipment.customerName,
      invoiceDate: today.toISOString().slice(0, 10),
      netChargeAmountUsd: shipment.estimatedCost,
      freightChargeUsd: baseFreight,
      fuelSurchargeUsd: fuelSurcharge,
      accessorialChargesUsd: accessorial,
      paymentTerms: 'NET 30 Electronic Funds Transfer (EFT)'
    };

    return { rawEdi, parsed };
  }
}
