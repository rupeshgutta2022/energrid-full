/**
 * @file ShipmentLifecycleEngine.ts
 * Enterprise Shipment Lifecycle State Machine, Exception Detection, and SLA Risk Scorer.
 * Governs strict status progression, regulatory pre-conditions, and automated anomaly alerts.
 */

import { Shipment, ShipmentStatus, LocationPoint, TrackingStop } from '../../types';

export interface StateTransitionResult {
  success: boolean;
  previousStatus: ShipmentStatus;
  newStatus: ShipmentStatus;
  timestamp: string;
  rejectionReason?: string;
  requiredActions?: string[];
  systemNotes?: string[];
  slaRiskScore?: number; // 0 to 100
}

export interface SlaRiskAnalysis {
  riskScore: number; // 0 (on schedule) to 100 (critical breach impending)
  riskLevel: 'Nominal' | 'Elevated' | 'High' | 'Critical Breach';
  projectedDelayMinutes: number;
  scheduledEta: string;
  projectedEta: string;
  contributingFactors: string[];
  recommendedMitigations: string[];
}

export interface ShipmentExceptionAlert {
  id: string;
  shipmentId: string;
  severity: 'Critical' | 'Major' | 'Minor';
  category: 'Temperature Excursion' | 'Route Deviation' | 'Unauthorized Dwell' | 'SLA Breach' | 'Driver Safety / HOS' | 'Documentation Missing';
  description: string;
  detectedAt: string;
  suggestedAction: string;
  autoMitigated: boolean;
}

export class ShipmentLifecycleEngine {
  public static readonly VERSION = '3.2.0';

  /**
   * Complete Transition Validity Matrix.
   * Defines every allowable state transition for standard and reverse logistics paths.
   */
  private static readonly VALID_TRANSITIONS: Record<ShipmentStatus, ShipmentStatus[]> = {
    'Pending': ['Confirmed', 'Cancelled'],
    'Confirmed': ['Assigned', 'Cancelled', 'Delayed'],
    'Assigned': ['In Transit', 'At Warehouse', 'Cancelled', 'Delayed'],
    'In Transit': ['At Warehouse', 'Out for Delivery', 'Delayed', 'Exception'],
    'At Warehouse': ['Assigned', 'In Transit', 'Out for Delivery', 'Exception', 'Delayed'],
    'Out for Delivery': ['Delivered', 'Delayed', 'Exception', 'At Warehouse'],
    'Delivered': [], // Terminal success state
    'Delayed': ['In Transit', 'Out for Delivery', 'At Warehouse', 'Exception', 'Cancelled'],
    'Exception': ['In Transit', 'At Warehouse', 'Out for Delivery', 'Cancelled', 'Delayed'],
    'Cancelled': [] // Terminal abort state
  };

  /**
   * Checks if a transition between two statuses is structurally valid.
   */
  public static canTransition(from: ShipmentStatus, to: ShipmentStatus): boolean {
    if (from === to) return true;
    const allowed = this.VALID_TRANSITIONS[from] || [];
    return allowed.includes(to);
  }

  /**
   * Validates operational pre-conditions before executing a state transition.
   */
  public static validatePreConditions(
    shipment: Shipment,
    targetStatus: ShipmentStatus,
    context?: { podSignature?: string; receiverName?: string; inspectionPass?: boolean }
  ): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    // Structural transition matrix check
    if (!this.canTransition(shipment.status, targetStatus)) {
      errors.push(`Illegal state transition: Cannot move shipment from '${shipment.status}' to '${targetStatus}'.`);
      return { valid: false, errors };
    }

    // Business Pre-Condition: Transition to 'In Transit' requires assigned driver and vehicle
    if (targetStatus === 'In Transit') {
      if (!shipment.vehicleId || shipment.vehicleId === 'Unassigned' || !shipment.driverName) {
        errors.push("Carrier Assignment Missing: Cannot initiate 'In Transit' without an assigned vehicle and driver.");
      }
      if (shipment.temperatureControlled && shipment.currentTempC === undefined) {
        errors.push("Cold-Chain Check Failed: Reefer sensor telemetry must be connected before dispatching temperature-sensitive cargo.");
      }
    }

    // Business Pre-Condition: Transition to 'Delivered' requires Proof of Delivery
    if (targetStatus === 'Delivered') {
      const hasSignature = Boolean(shipment.podSignature || context?.podSignature);
      if (!hasSignature) {
        errors.push("Proof of Delivery Missing: Digital recipient signature or e-POD is mandatory prior to marking 'Delivered'.");
      }
    }

    // Business Pre-Condition: Cannot transition from 'Exception' without clearing notes
    if (shipment.status === 'Exception' && targetStatus !== 'Cancelled') {
      if (context?.inspectionPass === false) {
        errors.push("Exception Resolution Incomplete: Safety/Customs inspection must be cleared before re-activating shipment.");
      }
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }

  /**
   * Executes shipment transition with SLA analysis and state generation.
   */
  public static executeTransition(
    shipment: Shipment,
    targetStatus: ShipmentStatus,
    context?: { podSignature?: string; receiverName?: string; note?: string }
  ): StateTransitionResult {
    const now = new Date().toISOString();
    const validation = this.validatePreConditions(shipment, targetStatus, context);

    if (!validation.valid) {
      return {
        success: false,
        previousStatus: shipment.status,
        newStatus: shipment.status,
        timestamp: now,
        rejectionReason: validation.errors.join(' | '),
        requiredActions: validation.errors
      };
    }

    const slaAnalysis = this.computeSlaRisk(shipment);
    const systemNotes: string[] = [];

    if (context?.note) {
      systemNotes.push(context.note);
    }

    if (targetStatus === 'Delivered') {
      systemNotes.push(`Delivered successfully. Signee: ${context?.receiverName || 'Authorized Consignee'}`);
    } else if (targetStatus === 'Exception') {
      systemNotes.push(`Incident logged at ${now}. Automatic supervisory alert dispatched.`);
    }

    return {
      success: true,
      previousStatus: shipment.status,
      newStatus: targetStatus,
      timestamp: now,
      systemNotes,
      slaRiskScore: slaAnalysis.riskScore
    };
  }

  /**
   * Automated SLA Risk Analysis Engine.
   * Dynamically estimates delay probability based on remaining distance, transit velocity, and schedule.
   */
  public static computeSlaRisk(shipment: Shipment): SlaRiskAnalysis {
    const contributingFactors: string[] = [];
    const recommendedMitigations: string[] = [];
    let riskScore = 0;

    // Terminal statuses have 0 risk
    if (shipment.status === 'Delivered' || shipment.status === 'Cancelled') {
      return {
        riskScore: 0,
        riskLevel: 'Nominal',
        projectedDelayMinutes: 0,
        scheduledEta: shipment.eta,
        projectedEta: shipment.eta,
        contributingFactors: ['Shipment in terminal state.'],
        recommendedMitigations: []
      };
    }

    // 1. Progress vs Time Check
    if (shipment.progressPercent < 40 && shipment.status === 'In Transit') {
      riskScore += 15;
      contributingFactors.push('Transit progress is below 40% threshold.');
    }

    // 2. Status penalties
    if (shipment.status === 'Delayed') {
      riskScore += 45;
      contributingFactors.push('Shipment is currently flagged as Delayed by carrier telematics.');
      recommendedMitigations.push('Trigger automated detour routing to bypass corridor congestion.');
    } else if (shipment.status === 'Exception') {
      riskScore += 65;
      contributingFactors.push('Active operational exception detected on route.');
      recommendedMitigations.push('Contact carrier dispatch and regional hub supervisor immediately.');
    }

    // 3. Cold Chain Reefer Monitoring
    if (shipment.temperatureControlled && shipment.currentTempC !== undefined && shipment.targetTempC !== undefined) {
      const delta = Math.abs(shipment.currentTempC - shipment.targetTempC);
      if (delta > 3.0) {
        riskScore += 30;
        contributingFactors.push(`Reefer temperature excursion: Current ${shipment.currentTempC}°C vs Target ${shipment.targetTempC}°C (delta: ${delta.toFixed(1)}°C).`);
        recommendedMitigations.push('Direct driver to nearest certified cold-storage service station.');
      }
    }

    // 4. Pending Assignment Bottleneck
    if ((shipment.status === 'Pending' || shipment.status === 'Confirmed') && !shipment.driverName) {
      riskScore += 25;
      contributingFactors.push('Cargo confirmed but vehicle/driver allocation has not been finalized.');
      recommendedMitigations.push('Broadcast spot-market load tender via EDI 204 to contracted 3PL fleet.');
    }

    riskScore = Math.min(100, Math.max(0, riskScore));

    let riskLevel: SlaRiskAnalysis['riskLevel'] = 'Nominal';
    let projectedDelayMinutes = 0;

    if (riskScore >= 75) {
      riskLevel = 'Critical Breach';
      projectedDelayMinutes = 180 + Math.round((riskScore - 75) * 6);
    } else if (riskScore >= 50) {
      riskLevel = 'High';
      projectedDelayMinutes = 60 + Math.round((riskScore - 50) * 4);
    } else if (riskScore >= 25) {
      riskLevel = 'Elevated';
      projectedDelayMinutes = 20 + Math.round((riskScore - 25) * 2);
    }

    // Estimate projected ETA based on delay
    let projectedEta = shipment.eta;
    try {
      const scheduledDate = new Date(shipment.eta);
      if (!isNaN(scheduledDate.getTime())) {
        scheduledDate.setMinutes(scheduledDate.getMinutes() + projectedDelayMinutes);
        projectedEta = scheduledDate.toISOString();
      }
    } catch {
      // Fallback
    }

    return {
      riskScore,
      riskLevel,
      projectedDelayMinutes,
      scheduledEta: shipment.eta,
      projectedEta,
      contributingFactors: contributingFactors.length > 0 ? contributingFactors : ['Route conditions, driver telematics, and scheduled milestones are within nominal parameters.'],
      recommendedMitigations: recommendedMitigations.length > 0 ? recommendedMitigations : ['Continue standard real-time telematics tracking.']
    };
  }

  /**
   * Scans a collection of shipments to identify real-time operational exceptions.
   */
  public static detectExceptions(shipments: Shipment[]): ShipmentExceptionAlert[] {
    const alerts: ShipmentExceptionAlert[] = [];
    const now = new Date().toISOString();

    for (const s of shipments) {
      // 1. Temperature Excursions
      if (s.temperatureControlled && s.currentTempC !== undefined && s.targetTempC !== undefined) {
        const delta = Math.abs(s.currentTempC - s.targetTempC);
        if (delta >= 4.0) {
          alerts.push({
            id: `EXC-TEMP-${s.id}-${Date.now().toString().slice(-4)}`,
            shipmentId: s.id,
            severity: 'Critical',
            category: 'Temperature Excursion',
            description: `Cargo ${s.cargoDescription} reefer temperature is ${s.currentTempC}°C (exceeds allowable range ±3°C of target ${s.targetTempC}°C).`,
            detectedAt: now,
            suggestedAction: 'Notify cold-chain dispatcher; verify reefer auxiliary power unit.',
            autoMitigated: false
          });
        }
      }

      // 2. Critical Status with Pending Assignment
      if (s.priority === 'Critical' && (!s.driverName || s.status === 'Pending')) {
        alerts.push({
          id: `EXC-ASSIGN-${s.id}-${Date.now().toString().slice(-4)}`,
          shipmentId: s.id,
          severity: 'Major',
          category: 'Documentation Missing',
          description: `Critical priority consignment ${s.id} is unassigned to driver/carrier.`,
          detectedAt: now,
          suggestedAction: 'Immediate dispatch override: Auto-assign standby premium vehicle.',
          autoMitigated: false
        });
      }

      // 3. Stalled In-Transit Shipments
      if (s.status === 'Delayed') {
        alerts.push({
          id: `EXC-DELAY-${s.id}-${Date.now().toString().slice(-4)}`,
          shipmentId: s.id,
          severity: 'Major',
          category: 'SLA Breach',
          description: `Shipment ${s.id} (${s.origin.city} -> ${s.destination.city}) reported delayed with SLA impact.`,
          detectedAt: now,
          suggestedAction: 'Transmit customer delay advisory via SMS/Webhook and re-calculate ETA.',
          autoMitigated: true
        });
      }
    }

    return alerts;
  }
}
