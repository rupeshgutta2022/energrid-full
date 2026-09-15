/**
 * @file FinancialReconciliationEngine.ts
 * Enterprise Freight Bill Audit, Multi-Tier Tax Engine & Double-Entry Ledger Reconciliation.
 * 
 * Capabilities:
 * 1. Automated Freight Bill Audit & Payment (FBAP) against baseline tariff contracts
 * 2. Fuel Surcharge Index (FSI) dynamic fluctuation adjustments
 * 3. Detention, Demurrage & Accessorial Fee calculation rules
 * 4. Statutory Indian GST (IGST vs CGST/SGST) & International Harmonized Tax engine
 * 5. Automated Double-Entry General Ledger (GL) Journal Entry generator
 */

export interface FreightInvoiceAuditInput {
  invoiceNumber: string;
  carrierOrVendorName: string;
  shipmentId: string;
  orderId?: string;
  originPostalCode: string;
  destinationPostalCode: string;
  distanceKm: number;
  actualWeightKg: number;
  chargeableWeightKg: number;
  billedLinehaulAmount: number;
  contractedLinehaulRatePerKg: number;
  billedFuelSurcharge: number;
  standardFuelSurchargePercent: number;
  billedAccessorials: {
    code: string;
    description: string;
    billedAmount: number;
    authorizedAmount?: number;
    notes?: string;
  }[];
  billedGstAmount: number;
  isInterstate: boolean;
}

export interface DiscrepancyLine {
  chargeCategory: 'LINEHAUL' | 'FUEL_SURCHARGE' | 'WEIGHT_VARIANCE' | 'ACCESSORIAL' | 'TAX_CALCULATION';
  carrierBilledAmount: number;
  systemAuditedAmount: number;
  varianceAmount: number;
  resolutionStatus: 'AUTO_APPROVED' | 'REQUIRES_DISPUTE' | 'REJECTED';
  reason: string;
}

export interface AuditPaymentReport {
  invoiceNumber: string;
  shipmentId: string;
  auditDate: string;
  carrierBilledTotal: number;
  systemApprovedTotal: number;
  netVarianceAmount: number;
  isDisputeRequired: boolean;
  discrepancies: DiscrepancyLine[];
  taxBreakdown: {
    taxableSubtotal: number;
    cgst: number;
    sgst: number;
    igst: number;
    totalTax: number;
  };
  glJournalEntries: {
    accountCode: string;
    accountName: string;
    debitAmount: number;
    creditAmount: number;
    description: string;
  }[];
}

export class FinancialReconciliationEngine {
  /**
   * Executes programmatic freight bill audit, identifying overcharges, unauthorized accessorials and tax variance.
   */
  public static auditFreightInvoice(input: FreightInvoiceAuditInput): AuditPaymentReport {
    const discrepancies: DiscrepancyLine[] = [];

    // 1. Linehaul baseline check
    const contractLinehaul = Math.round(input.chargeableWeightKg * input.contractedLinehaulRatePerKg);
    const linehaulVariance = input.billedLinehaulAmount - contractLinehaul;

    if (Math.abs(linehaulVariance) > 10) {
      discrepancies.push({
        chargeCategory: 'LINEHAUL',
        carrierBilledAmount: input.billedLinehaulAmount,
        systemAuditedAmount: contractLinehaul,
        varianceAmount: linehaulVariance,
        resolutionStatus: linehaulVariance > 500 ? 'REQUIRES_DISPUTE' : 'AUTO_APPROVED',
        reason:
          linehaulVariance > 0
            ? `Carrier billed ₹${input.billedLinehaulAmount.toLocaleString()} vs contracted tariff ₹${contractLinehaul.toLocaleString()} for ${input.chargeableWeightKg} kg.`
            : 'Carrier underbilled compared to standard tariff schedule.'
      });
    }

    // 2. Fuel Surcharge Index (FSI) check
    const expectedFuelSurcharge = Math.round(contractLinehaul * (input.standardFuelSurchargePercent / 100));
    const fuelVariance = input.billedFuelSurcharge - expectedFuelSurcharge;

    if (Math.abs(fuelVariance) > 25) {
      discrepancies.push({
        chargeCategory: 'FUEL_SURCHARGE',
        carrierBilledAmount: input.billedFuelSurcharge,
        systemAuditedAmount: expectedFuelSurcharge,
        varianceAmount: fuelVariance,
        resolutionStatus: fuelVariance > 200 ? 'REQUIRES_DISPUTE' : 'AUTO_APPROVED',
        reason: `Fuel Surcharge billed at ${((input.billedFuelSurcharge / (input.billedLinehaulAmount || 1)) * 100).toFixed(1)}% vs contractual benchmark ${input.standardFuelSurchargePercent}%.`
      });
    }

    // 3. Accessorial charges check
    let systemApprovedAccessorials = 0;
    input.billedAccessorials.forEach((acc) => {
      const authorized = acc.authorizedAmount ?? 0;
      const accVariance = acc.billedAmount - authorized;

      if (accVariance > 0) {
        discrepancies.push({
          chargeCategory: 'ACCESSORIAL',
          carrierBilledAmount: acc.billedAmount,
          systemAuditedAmount: authorized,
          varianceAmount: accVariance,
          resolutionStatus: authorized === 0 ? 'REJECTED' : 'REQUIRES_DISPUTE',
          reason:
            authorized === 0
              ? `Unauthorized accessorial fee '${acc.description}' (${acc.code}) lacks prior proof of delivery authorization.`
              : `Accessorial '${acc.description}' billed ₹${acc.billedAmount} vs authorized limit ₹${authorized}.`
        });
      }
      systemApprovedAccessorials += authorized;
    });

    // 4. Tax Calculation (GST 18% standard)
    const approvedSubtotal = contractLinehaul + expectedFuelSurcharge + systemApprovedAccessorials;
    let cgst = 0;
    let sgst = 0;
    let igst = 0;

    if (input.isInterstate) {
      igst = Math.round(approvedSubtotal * 0.18);
    } else {
      cgst = Math.round(approvedSubtotal * 0.09);
      sgst = Math.round(approvedSubtotal * 0.09);
    }
    const approvedTotalTax = igst + cgst + sgst;
    const billedTaxVariance = input.billedGstAmount - approvedTotalTax;

    if (Math.abs(billedTaxVariance) > 5) {
      discrepancies.push({
        chargeCategory: 'TAX_CALCULATION',
        carrierBilledAmount: input.billedGstAmount,
        systemAuditedAmount: approvedTotalTax,
        varianceAmount: billedTaxVariance,
        resolutionStatus: Math.abs(billedTaxVariance) > 50 ? 'REQUIRES_DISPUTE' : 'AUTO_APPROVED',
        reason: `GST billed ₹${input.billedGstAmount} differs from statutory calculation ₹${approvedTotalTax}.`
      });
    }

    const carrierBilledTotal =
      input.billedLinehaulAmount +
      input.billedFuelSurcharge +
      input.billedAccessorials.reduce((acc, a) => acc + a.billedAmount, 0) +
      input.billedGstAmount;

    const systemApprovedTotal = approvedSubtotal + approvedTotalTax;
    const netVariance = carrierBilledTotal - systemApprovedTotal;
    const isDisputeRequired = discrepancies.some((d) => d.resolutionStatus === 'REQUIRES_DISPUTE' || d.resolutionStatus === 'REJECTED');

    // 5. Generate Double-Entry Accounting Journal Entries
    const glJournalEntries = [
      {
        accountCode: '5100-FRT-EXP',
        accountName: 'Freight Inbound / Linehaul Expense',
        debitAmount: contractLinehaul,
        creditAmount: 0,
        description: `Linehaul charge for shipment ${input.shipmentId}`
      },
      {
        accountCode: '5110-FSI-EXP',
        accountName: 'Fuel Surcharge Variable Expense',
        debitAmount: expectedFuelSurcharge,
        creditAmount: 0,
        description: `Fuel surcharge audit approved amount (${input.standardFuelSurchargePercent}%)`
      },
      {
        accountCode: '1310-INPUT-GST',
        accountName: 'Input GST Tax Credit Recoverable',
        debitAmount: approvedTotalTax,
        creditAmount: 0,
        description: `Statutory GST input credit for invoice ${input.invoiceNumber}`
      }
    ];

    if (systemApprovedAccessorials > 0) {
      glJournalEntries.push({
        accountCode: '5120-ACC-EXP',
        accountName: 'Accessorial & Detention Freight Expense',
        debitAmount: systemApprovedAccessorials,
        creditAmount: 0,
        description: `Authorized accessorial services for shipment ${input.shipmentId}`
      });
    }

    // Balancing Credit to Accounts Payable or Accrued Liability
    glJournalEntries.push({
      accountCode: '2010-AP-TRADE',
      accountName: 'Accounts Payable - Logistics Carriers',
      debitAmount: 0,
      creditAmount: systemApprovedTotal,
      description: `Net verified payable liability for invoice ${input.invoiceNumber} (${input.carrierOrVendorName})`
    });

    return {
      invoiceNumber: input.invoiceNumber,
      shipmentId: input.shipmentId,
      auditDate: new Date().toISOString().split('T')[0],
      carrierBilledTotal,
      systemApprovedTotal,
      netVarianceAmount: netVariance,
      isDisputeRequired,
      discrepancies,
      taxBreakdown: {
        taxableSubtotal: approvedSubtotal,
        cgst,
        sgst,
        igst,
        totalTax: approvedTotalTax
      },
      glJournalEntries
    };
  }
}
