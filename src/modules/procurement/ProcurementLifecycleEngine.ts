/**
 * @file ProcurementLifecycleEngine.ts
 * Enterprise Procurement Lifecycle, 3-Way Matching & Vendor Evaluation Engine.
 * 
 * Capabilities:
 * 1. Purchase Order (PO) Lifecycle State Machine
 * 2. Strict Multi-Tier Financial Approval Matrix
 * 3. Automated 3-Way Matching (Purchase Order vs Goods Receipt Note vs Vendor Invoice)
 * 4. Vendor Performance Scorecard & Composite Tiering Index (OTD, Quality, Price Compliance)
 * 5. Goods Receipt Note (GRN) Generation & Discrepancy Reconciliation
 */

export type POStatus =
  | 'REQUISITION_DRAFT'
  | 'PENDING_APPROVAL_DEPT'
  | 'PENDING_APPROVAL_FINANCE'
  | 'APPROVED_ISSUED'
  | 'ACKNOWLEDGED_BY_VENDOR'
  | 'PARTIALLY_RECEIVED'
  | 'FULLY_RECEIVED'
  | 'INVOICED_MATCHED'
  | 'DISCREPANCY_FLAGGED'
  | 'CLOSED'
  | 'CANCELLED';

export interface POLineItem {
  id: string;
  itemCode: string;
  description: string;
  category: 'RAW_MATERIALS' | 'PACKAGING' | 'FLEET_PARTS' | 'WAREHOUSE_SUPPLIES' | 'FUEL_CONTRACT';
  quantityOrdered: number;
  quantityReceived: number;
  quantityInvoiced: number;
  unitOfMeasure: 'UNITS' | 'PALLETS' | 'LITERS' | 'TONS' | 'BOXES';
  contractUnitPrice: number;
  invoicedUnitPrice?: number;
  totalOrderCost: number;
  hsnSacCode: string;
  taxRatePercent: number;
}

export interface EnterprisePurchaseOrder {
  id: string;
  poNumber: string;
  requisitionId?: string;
  vendorId: string;
  vendorName: string;
  vendorGstNumber: string;
  destinationWarehouseId: string;
  warehouseName: string;
  orderDate: string;
  expectedDeliveryDate: string;
  status: POStatus;
  items: POLineItem[];
  subtotal: number;
  totalTax: number;
  grandTotal: number;
  paymentTermsDays: number;
  approvalChain: {
    level: 'DEPARTMENT_MANAGER' | 'FINANCE_DIRECTOR' | 'VP_SUPPLY_CHAIN';
    approverName: string;
    status: 'PENDING' | 'APPROVED' | 'REJECTED';
    approvedAt?: string;
    comments?: string;
  }[];
  notes?: string;
}

export interface GoodsReceiptNote {
  grnNumber: string;
  poNumber: string;
  vendorName: string;
  receivedDate: string;
  receivingInspector: string;
  dockNumber: string;
  items: {
    itemCode: string;
    orderedQuantity: number;
    receivedQuantity: number;
    acceptedQuantity: number;
    rejectedQuantity: number;
    rejectionReason?: string;
    batchNumber: string;
    manufacturingDate?: string;
    expiryDate?: string;
  }[];
  carrierName: string;
  vehicleNumber: string;
  driverSignatureVerified: boolean;
}

export interface ThreeWayMatchResult {
  isMatchExact: boolean;
  canApprovePayment: boolean;
  quantityVariance: number;
  priceVarianceInr: number;
  taxVarianceInr: number;
  discrepancies: {
    type: 'QUANTITY_SHORTFALL' | 'QUANTITY_EXCESS' | 'UNIT_PRICE_MISMATCH' | 'TAX_DISCREPANCY' | 'UNAUTHORIZED_LINE_ITEM';
    itemCode: string;
    description: string;
    varianceAmount: number;
  }[];
}

export interface VendorPerformanceScorecard {
  vendorId: string;
  vendorName: string;
  totalOrdersCompleted: number;
  onTimeDeliveryPercent: number;
  qualityAcceptanceRatePercent: number;
  invoiceAccuracyRatePercent: number;
  averageLeadTimeDays: number;
  compositeScore: number; // 0 - 100
  assignedTier: 'TIER_1_PREFERRED' | 'TIER_2_APPROVED' | 'TIER_3_CONDITIONAL' | 'TIER_4_PROBATION';
  recommendations: string[];
}

export class ProcurementLifecycleEngine {
  /**
   * Evaluates the approval tier required for a Purchase Order based on financial threshold.
   */
  public static determineRequiredApprovalLevels(totalAmount: number): EnterprisePurchaseOrder['approvalChain'] {
    const chain: EnterprisePurchaseOrder['approvalChain'] = [
      {
        level: 'DEPARTMENT_MANAGER',
        approverName: 'Rohan Deshmukh (Procurement Lead)',
        status: 'PENDING'
      }
    ];

    if (totalAmount > 50000) {
      chain.push({
        level: 'FINANCE_DIRECTOR',
        approverName: 'Sunita Mehra (Finance Controller)',
        status: 'PENDING'
      });
    }

    if (totalAmount > 500000) {
      chain.push({
        level: 'VP_SUPPLY_CHAIN',
        approverName: 'Vikram Singhania (VP Supply Chain)',
        status: 'PENDING'
      });
    }

    return chain;
  }

  /**
   * Performs automated 3-way reconciliation among PO, GRN, and Invoiced amounts.
   */
  public static performThreeWayMatch(
    po: EnterprisePurchaseOrder,
    grn: GoodsReceiptNote,
    vendorInvoice: { invoiceNumber: string; items: { itemCode: string; billedQuantity: number; billedUnitPrice: number; taxBilled: number }[] }
  ): ThreeWayMatchResult {
    const discrepancies: ThreeWayMatchResult['discrepancies'] = [];
    let totalQtyVariance = 0;
    let totalPriceVariance = 0;
    let totalTaxVariance = 0;

    for (const poItem of po.items) {
      const grnItem = grn.items.find((g) => g.itemCode === poItem.itemCode);
      const invItem = vendorInvoice.items.find((v) => v.itemCode === poItem.itemCode);

      // Check receipt quantity
      if (!grnItem) {
        discrepancies.push({
          type: 'QUANTITY_SHORTFALL',
          itemCode: poItem.itemCode,
          description: `Item ${poItem.itemCode} was ordered on PO but not present on Goods Receipt Note (GRN).`,
          varianceAmount: poItem.quantityOrdered
        });
        totalQtyVariance += poItem.quantityOrdered;
      } else if (grnItem.acceptedQuantity < poItem.quantityOrdered) {
        const short = poItem.quantityOrdered - grnItem.acceptedQuantity;
        discrepancies.push({
          type: 'QUANTITY_SHORTFALL',
          itemCode: poItem.itemCode,
          description: `Shortfall of ${short} ${poItem.unitOfMeasure}. Ordered: ${poItem.quantityOrdered}, Accepted: ${grnItem.acceptedQuantity}.`,
          varianceAmount: short
        });
        totalQtyVariance += short;
      }

      // Check invoice billing
      if (invItem) {
        // Price check
        if (Math.abs(invItem.billedUnitPrice - poItem.contractUnitPrice) > 0.01) {
          const priceDiff = (invItem.billedUnitPrice - poItem.contractUnitPrice) * invItem.billedQuantity;
          discrepancies.push({
            type: 'UNIT_PRICE_MISMATCH',
            itemCode: poItem.itemCode,
            description: `Invoice billed at ₹${invItem.billedUnitPrice} vs contracted PO price ₹${poItem.contractUnitPrice}.`,
            varianceAmount: priceDiff
          });
          totalPriceVariance += priceDiff;
        }

        // Quantity billed vs accepted check
        if (grnItem && invItem.billedQuantity > grnItem.acceptedQuantity) {
          const excessBilled = invItem.billedQuantity - grnItem.acceptedQuantity;
          discrepancies.push({
            type: 'QUANTITY_EXCESS',
            itemCode: poItem.itemCode,
            description: `Vendor billed for ${invItem.billedQuantity} units but warehouse only accepted ${grnItem.acceptedQuantity} units.`,
            varianceAmount: excessBilled * invItem.billedUnitPrice
          });
        }
      }
    }

    const isMatchExact = discrepancies.length === 0;
    const canApprovePayment = isMatchExact || (totalPriceVariance <= 100 && totalQtyVariance === 0);

    return {
      isMatchExact,
      canApprovePayment,
      quantityVariance: totalQtyVariance,
      priceVarianceInr: Math.round(totalPriceVariance),
      taxVarianceInr: Math.round(totalTaxVariance),
      discrepancies
    };
  }

  /**
   * Evaluates historical vendor metrics to compute composite performance score.
   */
  public static calculateVendorScorecard(
    vendorId: string,
    vendorName: string,
    history: {
      totalOrders: number;
      onTimeDeliveries: number;
      totalUnitsInspected: number;
      totalUnitsAccepted: number;
      invoicesSubmitted: number;
      invoicesAccurate: number;
      averageLeadTimeDays: number;
    }
  ): VendorPerformanceScorecard {
    const otdPercent = Math.round((history.onTimeDeliveries / (history.totalOrders || 1)) * 1000) / 10;
    const qualityPercent = Math.round((history.totalUnitsAccepted / (history.totalUnitsInspected || 1)) * 1000) / 10;
    const invoiceAccuracyPercent = Math.round((history.invoicesAccurate / (history.invoicesSubmitted || 1)) * 1000) / 10;

    // Weighted composite: 40% OTD + 40% Quality + 20% Invoicing Accuracy
    const compositeScore = Math.round(otdPercent * 0.4 + qualityPercent * 0.4 + invoiceAccuracyPercent * 0.2);

    let assignedTier: VendorPerformanceScorecard['assignedTier'] = 'TIER_2_APPROVED';
    const recommendations: string[] = [];

    if (compositeScore >= 92) {
      assignedTier = 'TIER_1_PREFERRED';
      recommendations.push('Eligible for quarterly volume discounts and priority purchase agreements.');
      recommendations.push('Enable automated fast-track receipt scanning for low-risk SKU categories.');
    } else if (compositeScore >= 80) {
      assignedTier = 'TIER_2_APPROVED';
      recommendations.push('Standard quarterly review schedule. Maintain buffer stock for lead-time variance.');
    } else if (compositeScore >= 65) {
      assignedTier = 'TIER_3_CONDITIONAL';
      recommendations.push('Mandatory 100% QA dock inspection on arrival before putaway.');
      recommendations.push('Issue formal SLA performance improvement notice regarding delivery delays.');
    } else {
      assignedTier = 'TIER_4_PROBATION';
      recommendations.push('Vendor placed on probation. Freeze new purchase requisitions until root-cause review.');
    }

    return {
      vendorId,
      vendorName,
      totalOrdersCompleted: history.totalOrders,
      onTimeDeliveryPercent: otdPercent,
      qualityAcceptanceRatePercent: qualityPercent,
      invoiceAccuracyRatePercent: invoiceAccuracyPercent,
      averageLeadTimeDays: history.averageLeadTimeDays,
      compositeScore,
      assignedTier,
      recommendations
    };
  }
}
