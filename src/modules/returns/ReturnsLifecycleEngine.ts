/**
 * @file ReturnsLifecycleEngine.ts
 * Enterprise Reverse Logistics, Return Merchandise Authorization (RMA) & Disposition Engine.
 * 
 * Capabilities:
 * 1. RMA Generation & Return Eligibility Evaluation
 * 2. Return Pickup Scheduling & Reverse Waybill Creation
 * 3. Warehouse Receiving Inspection & 4-Tier Disposition Grading (Restock, Refurbish, RTV, Scrap)
 * 4. Credit Note Generation & Restocking Fee Deductions
 */

export type ReturnReasonCode =
  | 'TRANSIT_DAMAGE'
  | 'INCORRECT_SKU_SHIPPED'
  | 'DEFECTIVE_PRODUCT'
  | 'CUSTOMER_ORDER_ERROR'
  | 'CONSIGNEE_REFUSED_DELIVERY'
  | 'EXPIRED_SHELF_LIFE'
  | 'TEMPERATURE_EXCURSION_REJECT';

export type RmaStatus =
  | 'REQUESTED'
  | 'APPROVED_PENDING_PICKUP'
  | 'PICKUP_SCHEDULED'
  | 'IN_REVERSE_TRANSIT'
  | 'RECEIVED_AT_RETURN_CENTER'
  | 'INSPECTED_DISPOSITION_ASSIGNED'
  | 'CREDIT_NOTE_ISSUED'
  | 'REJECTED'
  | 'CLOSED';

export type DispositionGrade =
  | 'GRADE_A_RESTOCK_INVENTORY'
  | 'GRADE_B_REFURBISH_REPACK'
  | 'GRADE_C_RETURN_TO_VENDOR'
  | 'GRADE_D_SCRAP_RECYCLE';

export interface ReturnLineItem {
  id: string;
  originalOrderId: string;
  sku: string;
  productName: string;
  quantityReturned: number;
  originalUnitPrice: number;
  reasonCode: ReturnReasonCode;
  customerNotes?: string;
  inspectionResult?: {
    inspectedBy: string;
    inspectedAt: string;
    conditionSummary: string;
    grade: DispositionGrade;
    eligibleRefundPercent: number;
    restockingFeeDeductionInr: number;
    photosAttachedCount: number;
  };
}

export interface ReturnMerchandiseAuthorization {
  id: string;
  rmaNumber: string;
  orderNumber: string;
  shipmentId?: string;
  customerName: string;
  customerEmail: string;
  returnPickupAddress: string;
  destinationReturnDepot: string;
  status: RmaStatus;
  requestedAt: string;
  scheduledPickupDate?: string;
  carrierTrackingNumber?: string;
  items: ReturnLineItem[];
  totalOriginalValue: number;
  totalRefundAuthorized: number;
  creditNoteNumber?: string;
  auditTrail: {
    timestamp: string;
    fromStatus: RmaStatus;
    toStatus: RmaStatus;
    actor: string;
    notes: string;
  }[];
}

export class ReturnsLifecycleEngine {
  /**
   * Evaluates return eligibility based on delivery timestamp and product category.
   */
  public static evaluateReturnEligibility(
    deliveryDateIso: string,
    isHazmat: boolean,
    isPerishableColdChain: boolean
  ): { isEligible: boolean; reasons: string[] } {
    const reasons: string[] = [];
    const deliveryDate = new Date(deliveryDateIso).getTime();
    const daysSinceDelivery = Math.floor((Date.now() - deliveryDate) / (1000 * 60 * 60 * 24));

    if (daysSinceDelivery > 30) {
      reasons.push(`Return window expired: Delivered ${daysSinceDelivery} days ago (Standard policy is 30 days).`);
    }

    if (isHazmat) {
      reasons.push('Hazardous materials cannot be returned via standard parcel; requires dedicated hazmat reverse transit protocol.');
    }

    if (isPerishableColdChain && daysSinceDelivery > 2) {
      reasons.push('Temperature-sensitive perishable goods must be reported within 48 hours of delivery receipt.');
    }

    return {
      isEligible: reasons.length === 0,
      reasons
    };
  }

  /**
   * Calculates disposition refund and restocking adjustments based on inspection grading.
   */
  public static calculateDispositionSettlement(
    items: ReturnLineItem[]
  ): {
    totalOriginalValue: number;
    totalRestockingFees: number;
    netRefundCredit: number;
    dispositionCounts: Record<DispositionGrade, number>;
  } {
    let totalOrig = 0;
    let totalRestock = 0;
    let netRefund = 0;

    const counts: Record<DispositionGrade, number> = {
      GRADE_A_RESTOCK_INVENTORY: 0,
      GRADE_B_REFURBISH_REPACK: 0,
      GRADE_C_RETURN_TO_VENDOR: 0,
      GRADE_D_SCRAP_RECYCLE: 0
    };

    for (const item of items) {
      const lineVal = item.quantityReturned * item.originalUnitPrice;
      totalOrig += lineVal;

      if (item.inspectionResult) {
        counts[item.inspectionResult.grade] = (counts[item.inspectionResult.grade] || 0) + item.quantityReturned;
        const refundLine = Math.round(lineVal * (item.inspectionResult.eligibleRefundPercent / 100));
        const fee = item.inspectionResult.restockingFeeDeductionInr;
        totalRestock += fee;
        netRefund += Math.max(0, refundLine - fee);
      } else {
        // Pending inspection default
        netRefund += lineVal;
      }
    }

    return {
      totalOriginalValue: totalOrig,
      totalRestockingFees: totalRestock,
      netRefundCredit: netRefund,
      dispositionCounts: counts
    };
  }
}
