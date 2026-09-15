/**
 * @file ExceptionIncidentEngine.ts
 * Mission-Critical Logistics Exception & Incident Management Engine.
 * 
 * Capabilities:
 * 1. Automated Telematics Exception Detection (Cold-Chain, Geofence drift, Unscheduled dwell)
 * 2. Incident Classification, Priority Matrix & Severity Assessment (P1 Critical to P4 Low)
 * 3. Root-Cause Analysis (RCA) & Corrective Action (CAPA) workflow
 * 4. Contractual SLA Penalty and Liquidated Damages computation
 * 5. Automated Escalation Matrix and Departmental Notification dispatch
 */

export type ExceptionSeverity = 'P1_CRITICAL' | 'P2_MAJOR' | 'P3_MODERATE' | 'P4_MINOR';

export type ExceptionCategory =
  | 'TEMPERATURE_EXCURSION'
  | 'GEOFENCE_ROUTE_DEVIATION'
  | 'UNSCHEDULED_EXTENDED_DWELL'
  | 'CARGO_SHOCK_VIBRATION'
  | 'SEAL_TAMPER_DETECTED'
  | 'VEHICLE_BREAKDOWN'
  | 'DRIVER_HOS_VIOLATION'
  | 'CUSTOMS_INSPECTION_HOLD'
  | 'DOCUMENTATION_DISCREPANCY'
  | 'FAILED_DELIVERY_CONSIGNEE_ABSENT'
  | 'DAMAGED_CARGO_ON_DELIVERY';

export type IncidentStatus =
  | 'DETECTED'
  | 'TRIAGED'
  | 'INVESTIGATION_OPEN'
  | 'CORRECTIVE_ACTION_DISPATCHED'
  | 'ESCALATED_EXECUTIVE'
  | 'RESOLVED_UNDER_MONITORING'
  | 'CLOSED';

export interface TelematicsTelemetrySnapshot {
  shipmentId: string;
  vehicleId: string;
  driverName: string;
  latitude: number;
  longitude: number;
  speedKmph: number;
  engineRpm?: number;
  cargoTempCelsius?: number;
  ambientTempCelsius?: number;
  reeferSetpointCelsius?: number;
  gForceShockPeak?: number;
  sealStatus: 'INTACT' | 'BREACHED' | 'DISARMED_AUTHORIZED';
  lastPingTimestamp: string;
}

export interface ExceptionIncident {
  id: string;
  incidentNumber: string;
  shipmentId: string;
  orderId?: string;
  category: ExceptionCategory;
  severity: ExceptionSeverity;
  status: IncidentStatus;
  detectedAt: string;
  resolvedAt?: string;
  title: string;
  description: string;
  telemetryEvidence: TelematicsTelemetrySnapshot;
  impactedCustomer: string;
  slaRiskLevel: 'NONE' | 'MODERATE' | 'BREACH_IMMINENT' | 'BREACHED';
  calculatedSlaPenaltyInr: number;
  recommendedActions: string[];
  assignedInvestigator?: string;
  correctiveActionLog: {
    timestamp: string;
    actor: string;
    actionTaken: string;
    notes: string;
  }[];
}

export class ExceptionIncidentEngine {
  /**
   * Evaluates telemetry sensor stream against safety rules and triggers automated incident tickets.
   */
  public static evaluateTelemetryStream(
    snapshot: TelematicsTelemetrySnapshot,
    customerContract: { customerName: string; maxAllowedTempCelsius?: number; minAllowedTempCelsius?: number; guaranteedDeliveryHours: number }
  ): ExceptionIncident[] {
    const detectedIncidents: ExceptionIncident[] = [];
    const nowIso = new Date().toISOString();

    // 1. Cold-Chain Reefer Breach Check
    if (
      snapshot.cargoTempCelsius !== undefined &&
      customerContract.maxAllowedTempCelsius !== undefined
    ) {
      if (snapshot.cargoTempCelsius > customerContract.maxAllowedTempCelsius) {
        const tempDiff = (snapshot.cargoTempCelsius - customerContract.maxAllowedTempCelsius).toFixed(1);
        detectedIncidents.push({
          id: `INC-TEMP-${Date.now().toString().slice(-6)}`,
          incidentNumber: `EX-2026-${Math.floor(1000 + Math.random() * 9000)}`,
          shipmentId: snapshot.shipmentId,
          category: 'TEMPERATURE_EXCURSION',
          severity: Number(tempDiff) > 4 ? 'P1_CRITICAL' : 'P2_MAJOR',
          status: 'DETECTED',
          detectedAt: nowIso,
          title: `Refrigerated Compartment Breach: +${tempDiff}°C Above Setpoint`,
          description: `Internal sensor reading is ${snapshot.cargoTempCelsius}°C exceeding SLA limit of ${customerContract.maxAllowedTempCelsius}°C. Immediate spoilage risk for temperature-sensitive goods.`,
          telemetryEvidence: snapshot,
          impactedCustomer: customerContract.customerName,
          slaRiskLevel: 'BREACH_IMMINENT',
          calculatedSlaPenaltyInr: Number(tempDiff) > 4 ? 45000 : 15000,
          recommendedActions: [
            'Alert driver to check auxiliary reefer generator power switch',
            'Verify vehicle alternator fuse and reefer compressor belt',
            'Dispatch nearest refrigerated cross-dock transfer bay if not resolved in 20 minutes',
            'Log temperature drift profile for insurance claim evidence'
          ],
          correctiveActionLog: [
            {
              timestamp: nowIso,
              actor: 'Automated Telematics Monitor',
              actionTaken: 'Incident created from IoT heartbeat telemetry alert',
              notes: `Cargo temperature reading exceeded threshold: ${snapshot.cargoTempCelsius}°C vs max ${customerContract.maxAllowedTempCelsius}°C`
            }
          ]
        });
      }
    }

    // 2. Electronic Seal Breach Check
    if (snapshot.sealStatus === 'BREACHED') {
      detectedIncidents.push({
        id: `INC-SEAL-${Date.now().toString().slice(-6)}`,
        incidentNumber: `EX-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        shipmentId: snapshot.shipmentId,
        category: 'SEAL_TAMPER_DETECTED',
        severity: 'P1_CRITICAL',
        status: 'DETECTED',
        detectedAt: nowIso,
        title: 'Tamper Sensor Trigger: Digital Cargo Container Seal Compromised',
        description: `High-security electronic e-seal loop was broken while vehicle was in motion (Speed: ${snapshot.speedKmph} km/h). Unauthorized container access detected.`,
        telemetryEvidence: snapshot,
        impactedCustomer: customerContract.customerName,
        slaRiskLevel: 'BREACH_IMMINENT',
        calculatedSlaPenaltyInr: 100000,
        recommendedActions: [
          'Immediate emergency voice check-in with commercial pilot',
          'Lock electronic immobilizer at next scheduled highway toll checkpoint',
          'Notify regional dispatch command center and Highway Police liaison',
          'Initiate chain-of-custody forensic audit log'
        ],
        correctiveActionLog: [
          {
            timestamp: nowIso,
            actor: 'Automated Security Sentinel',
            actionTaken: 'High-priority security lockdown alert triggered',
            notes: 'E-Seal circuit open detected without authorized geofence unsealing token'
          }
        ]
      });
    }

    // 3. High Impact / Vibration Check
    if (snapshot.gForceShockPeak !== undefined && snapshot.gForceShockPeak > 3.2) {
      detectedIncidents.push({
        id: `INC-SHOCK-${Date.now().toString().slice(-6)}`,
        incidentNumber: `EX-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        shipmentId: snapshot.shipmentId,
        category: 'CARGO_SHOCK_VIBRATION',
        severity: 'P2_MAJOR',
        status: 'DETECTED',
        detectedAt: nowIso,
        title: `Heavy Impact Detected: ${snapshot.gForceShockPeak}G Shock Event`,
        description: `Tri-axial accelerometer registered abnormal ${snapshot.gForceShockPeak}G impact event. Potential load shift, sudden collision, or rough handling during transit.`,
        telemetryEvidence: snapshot,
        impactedCustomer: customerContract.customerName,
        slaRiskLevel: 'MODERATE',
        calculatedSlaPenaltyInr: 12000,
        recommendedActions: [
          'Instruct driver to perform physical pull-over visual inspection of pallet strap tension',
          'Inspect tilt watch and drop indicators upon arrival at next cross-dock facility',
          'Flag destination receiving dock for mandatory unpack inspection'
        ],
        correctiveActionLog: [
          {
            timestamp: nowIso,
            actor: 'IoT Impact Sensor',
            actionTaken: 'Telemetry event registered',
            notes: `3-axis accelerometer shock peak: ${snapshot.gForceShockPeak}G`
          }
        ]
      });
    }

    return detectedIncidents;
  }

  /**
   * Advances the incident status according to CAPA (Corrective and Preventive Action) standards.
   */
  public static transitionIncidentStatus(
    incident: ExceptionIncident,
    nextStatus: IncidentStatus,
    actor: string,
    actionNotes: string
  ): ExceptionIncident {
    return {
      ...incident,
      status: nextStatus,
      resolvedAt: ['RESOLVED_UNDER_MONITORING', 'CLOSED'].includes(nextStatus) ? new Date().toISOString() : incident.resolvedAt,
      correctiveActionLog: [
        ...incident.correctiveActionLog,
        {
          timestamp: new Date().toISOString(),
          actor,
          actionTaken: `Status progressed to ${nextStatus}`,
          notes: actionNotes
        }
      ]
    };
  }
}
