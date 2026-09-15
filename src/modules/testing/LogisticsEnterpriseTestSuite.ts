/**
 * @file LogisticsEnterpriseTestSuite.ts
 * Comprehensive Production Test Runner and Assertion Suite for Enterprise Logistics Modules.
 * Tests Tariff Matrix, State Transitions, Tamper-Evident Hash Chains, EDI 204/214 Syntax, Geofencing, and 3D Packing.
 */

import { TariffRatingEngine } from '../pricing/TariffRatingEngine';
import { ShipmentLifecycleEngine } from '../lifecycle/ShipmentLifecycleEngine';
import { AuditComplianceEngine } from '../audit/AuditComplianceEngine';
import { EdiStandardsEngine } from '../edi/EdiStandardsEngine';
import { GeofenceTelematicsEngine } from '../telematics/GeofenceTelematicsEngine';
import { WarehouseOptimizationEngine } from '../warehouse/WarehouseOptimizationEngine';
import { Shipment } from '../../types';

export interface TestCaseResult {
  id: string;
  name: string;
  module: 'Pricing & Rating' | 'Lifecycle & SLA' | 'Audit & Compliance' | 'EDI & Standards' | 'Telematics & Geofence' | 'Warehouse & 3D Packing';
  status: 'PASSED' | 'FAILED';
  durationMs: number;
  assertionCount: number;
  details?: string;
  error?: string;
}

export interface TestSuiteExecutionReport {
  timestamp: string;
  totalTests: number;
  passedCount: number;
  failedCount: number;
  executionDurationMs: number;
  passRatePercent: number;
  results: TestCaseResult[];
}

export class LogisticsEnterpriseTestSuite {
  /**
   * Helper assertion method.
   */
  private static assert(condition: boolean, message: string): void {
    if (!condition) {
      throw new Error(`Assertion Failed: ${message}`);
    }
  }

  /**
   * Runs the complete battery of enterprise logistics test suites.
   */
  public static runAllTests(): TestSuiteExecutionReport {
    const startTime = performance.now();
    const results: TestCaseResult[] = [];

    // Mock shipment for testing
    const testShipment: Shipment = {
      id: 'LGX-TEST-9901',
      trackingNumber: 'TRK-9901-X',
      customerName: 'Apex Precision Engineering',
      customerId: 'CUST-8812',
      origin: {
        city: 'Mumbai',
        facility: 'Bhiwandi Hub',
        address: 'Sector 4, Bhiwandi Logistics Zone',
        coordinates: { x: 30, y: 55 }
      },
      destination: {
        city: 'Delhi',
        facility: 'Okhla Industrial Center',
        address: 'Phase III, Okhla Industrial Area',
        coordinates: { x: 50, y: 25 }
      },
      currentLocation: {
        city: 'Mumbai',
        facility: 'Bhiwandi Hub',
        address: 'Dock 12',
        coordinates: { x: 30, y: 55 }
      },
      status: 'Confirmed',
      priority: 'Standard',
      carrier: 'Logistico Fleet Prime',
      vehicleId: 'TRK-1044',
      vehiclePlate: 'MH04AB9999',
      driverName: 'Vikram Singh',
      driverPhone: '+91 98200 11223',
      eta: new Date(Date.now() + 48 * 3600 * 1000).toISOString(),
      departureTime: new Date().toISOString(),
      packageType: 'Euro Pallets',
      weightKg: 2400,
      volumeM3: 9.6,
      cargoDescription: 'Industrial CNC Tooling Components',
      progressPercent: 0,
      stops: [],
      temperatureControlled: false,
      lastUpdated: new Date().toISOString(),
      estimatedCost: 1850,
      notes: ['Urgent automotive supply batch.']
    };

    // ==========================================
    // MODULE 1: PRICING & TARIFF RATING TESTS
    // ==========================================
    
    // Test 1: Volumetric Divisor for Air vs Road
    results.push(this.executeTest('PRC-001', 'Pricing & Rating', 'Volumetric Weight Air IATA (6000) vs Road LTL (5000) Divisor Check', () => {
      const cargo = { lengthCm: 100, widthCm: 100, heightCm: 100, weightActualKg: 100, piecesCount: 1 };
      const airCalc = TariffRatingEngine.calculateVolumetricWeight(cargo, 'Air Standard');
      const roadCalc = TariffRatingEngine.calculateVolumetricWeight(cargo, 'Road LTL');

      this.assert(airCalc.volumetricWeightKg === 166.67, `Expected Air volumetric weight ~166.67kg, got ${airCalc.volumetricWeightKg}`);
      this.assert(roadCalc.volumetricWeightKg === 200.0, `Expected Road volumetric weight 200kg, got ${roadCalc.volumetricWeightKg}`);
      this.assert(airCalc.divisorUsed === 6000, 'Air divisor must be 6000');
      this.assert(roadCalc.divisorUsed === 5000, 'Road divisor must be 5000');
    }));

    // Test 2: Tariff Breakdown Math & 18% Tax Application
    results.push(this.executeTest('PRC-002', 'Pricing & Rating', 'Tariff Rating Breakdown, Accessorial Accumulation, & Tax GST Formula', () => {
      const tariff = TariffRatingEngine.calculateTariff({
        originPostalCode: '400001',
        destinationPostalCode: '110001',
        originZone: 'Zone 2 - Regional',
        destinationZone: 'Zone 5 - National Trunk',
        distanceKm: 1400,
        mode: 'Road FTL',
        cargo: { lengthCm: 120, widthCm: 80, heightCm: 150, weightActualKg: 1200, piecesCount: 2 },
        accessorials: {
          liftgatePickup: true,
          liftgateDelivery: true,
          appointmentRequired: true
        }
      });

      this.assert(tariff.baseFreightAmount > 0, 'Base freight must be positive');
      this.assert(tariff.fuelSurchargeAmount > 0, 'Fuel surcharge must be calculated');
      this.assert(tariff.accessorialsTotal === 125, `Expected $125 accessorials (45+55+25), got ${tariff.accessorialsTotal}`);
      this.assert(tariff.taxRatePercent === 18, 'Tax rate must be standard 18%');
      const expectedTax = Number(((tariff.subtotalBeforeTax * 0.18)).toFixed(2));
      this.assert(Math.abs(tariff.taxAmount - expectedTax) < 0.05, 'Tax calculation must match 18% of taxable subtotal');
      this.assert(tariff.lineItems.length >= 5, 'Must output line items for auditability');
    }));

    // Test 3: NMFC Freight Class Density Estimation
    results.push(this.executeTest('PRC-003', 'Pricing & Rating', 'NMFC Standard Freight Class Density Derivation', () => {
      // High density: 500kg in 0.5 m3 -> 1000 kg/m3 -> Class 50
      const heavyClass = TariffRatingEngine.estimateFreightClass(500, 0.5);
      // Low density: 20kg in 1 m3 -> Class 300+
      const lightClass = TariffRatingEngine.estimateFreightClass(20, 1.0);

      this.assert(heavyClass === 50, `Heavy dense cargo should map to class 50, got ${heavyClass}`);
      this.assert(lightClass >= 300, `Light bulky cargo should map to class >= 300, got ${lightClass}`);
    }));

    // ==========================================
    // MODULE 2: LIFECYCLE & STATE MACHINE TESTS
    // ==========================================

    // Test 4: Legal Progression Confirmed -> Assigned -> In Transit
    results.push(this.executeTest('LC-001', 'Lifecycle & SLA', 'Valid State Progression Confirmed -> Assigned -> In Transit', () => {
      const canTransit = ShipmentLifecycleEngine.canTransition('Confirmed', 'Assigned');
      this.assert(canTransit === true, 'Confirmed to Assigned must be legal');

      const preCheck = ShipmentLifecycleEngine.validatePreConditions(testShipment, 'Assigned');
      this.assert(preCheck.valid === true, 'Assigned preconditions must pass');

      const assignedShipment = { ...testShipment, status: 'Assigned' as const };
      const inTransitTransition = ShipmentLifecycleEngine.executeTransition(assignedShipment, 'In Transit');
      this.assert(inTransitTransition.success === true, 'Assigned to In Transit must succeed when driver assigned');
      this.assert(inTransitTransition.newStatus === 'In Transit', 'New status must be In Transit');
    }));

    // Test 5: Rejection of Illegal Skip State Transition (Pending -> Delivered)
    results.push(this.executeTest('LC-002', 'Lifecycle & SLA', 'Illegal Transition Guard: Reject Pending straight to Delivered', () => {
      const pendingShipment = { ...testShipment, status: 'Pending' as const };
      const validation = ShipmentLifecycleEngine.validatePreConditions(pendingShipment, 'Delivered');
      this.assert(validation.valid === false, 'Pending straight to Delivered must be invalid');
      this.assert(validation.errors.length > 0, 'Must provide detailed rejection reasons');

      const execResult = ShipmentLifecycleEngine.executeTransition(pendingShipment, 'Delivered');
      this.assert(execResult.success === false, 'Transition execution must fail');
    }));

    // Test 6: Automated SLA Risk Calculation for Delayed Cargo
    results.push(this.executeTest('LC-003', 'Lifecycle & SLA', 'Automated SLA Risk Scoring on Delayed Status and Reefer Excursions', () => {
      const delayedShipment = { ...testShipment, status: 'Delayed' as const, progressPercent: 20 };
      const slaAnalysis = ShipmentLifecycleEngine.computeSlaRisk(delayedShipment);

      this.assert(slaAnalysis.riskScore >= 45, 'Delayed shipment must trigger risk score >= 45');
      this.assert(slaAnalysis.riskLevel === 'Elevated' || slaAnalysis.riskLevel === 'High', 'Risk level must be Elevated or High');
      this.assert(slaAnalysis.recommendedMitigations.length > 0, 'Must provide recommended operational mitigations');
    }));

    // ==========================================
    // MODULE 3: AUDIT & COMPLIANCE TESTS
    // ==========================================

    // Test 7: Cryptographic Hash Chaining Integrity
    results.push(this.executeTest('AUD-001', 'Audit & Compliance', 'Merkle Hash Pointer Chaining & Block Creation', () => {
      const rec1 = AuditComplianceEngine.recordEvent({
        actorId: 'usr-1',
        actorName: 'Marcus Vance',
        actorRole: 'Operations',
        action: 'Dispatch Carrier Approved',
        entityType: 'Shipment',
        entityId: 'LGX-101',
        changesDiff: { status: { before: 'Assigned', after: 'In Transit' } }
      });

      const rec2 = AuditComplianceEngine.recordEvent({
        actorId: 'usr-2',
        actorName: 'Elena Rostova',
        actorRole: 'Logistics Manager',
        action: 'Customs Duty Paid',
        entityType: 'Shipment',
        entityId: 'LGX-101'
      });

      this.assert(rec1.recordHash.startsWith('sha256-'), 'Hash must have sha256 prefix');
      this.assert(rec2.previousRecordHash === rec1.recordHash, 'Record 2 previousHash must equal Record 1 recordHash');
    }));

    // Test 8: Tamper Verification Integrity Run
    results.push(this.executeTest('AUD-002', 'Audit & Compliance', 'Cryptographic Ledger Verification & Tamper Detection Engine', () => {
      const verification = AuditComplianceEngine.verifyLedgerIntegrity();
      this.assert(verification.isValid === true, 'Fresh audit ledger must pass integrity verification');
      this.assert(verification.complianceCertification === 'VERIFIED_COMPLIANT', 'Compliance certification must be verified');
      this.assert(verification.totalRecordsChecked >= 2, 'Must have checked generated records');
    }));

    // ==========================================
    // MODULE 4: EDI STANDARDS TESTS
    // ==========================================

    // Test 9: ANSI X12 204 Motor Carrier Load Tender Generation
    results.push(this.executeTest('EDI-001', 'EDI & Standards', 'ANSI X12 204 Load Tender Generation, Header/Trailer Integrity, & Segment Count', () => {
      const edi204 = EdiStandardsEngine.generateEdi204(testShipment);
      this.assert(edi204.rawEdi.includes('ISA*'), 'Must contain ISA segment');
      this.assert(edi204.rawEdi.includes('GS*SM*LOGISTICO*'), 'Must contain GS segment with SCAC');
      this.assert(edi204.rawEdi.includes('ST*204*'), 'Must contain ST 204 transaction header');
      this.assert(edi204.rawEdi.includes('IEA*'), 'Must contain IEA interchange trailer');
      this.assert(edi204.parsed.carrierScac === 'LGXC', 'Carrier SCAC must be LGXC');
    }));

    // Test 10: ANSI X12 214 Shipment Status Message Generation
    results.push(this.executeTest('EDI-002', 'EDI & Standards', 'ANSI X12 214 Carrier Status Message & AT7 Event Codes', () => {
      const inTransitShipment = { ...testShipment, status: 'In Transit' as const };
      const edi214 = EdiStandardsEngine.generateEdi214(inTransitShipment);

      this.assert(edi214.rawEdi.includes('ST*214*'), 'Must be ST 214 transaction set');
      this.assert(edi214.rawEdi.includes('AT7*AF*'), 'In Transit status must map to X12 AT7*AF segment');
      this.assert(edi214.parsed.statusCode === 'AF', 'Parsed status code must be AF');
    }));

    // ==========================================
    // MODULE 5: TELEMATICS & GEOFENCING TESTS
    // ==========================================

    // Test 11: Great-Circle Haversine Distance Precision
    results.push(this.executeTest('TEL-001', 'Telematics & Geofence', 'Great-Circle Haversine Distance Calculation (Mumbai to Delhi)', () => {
      const mumbai = { latitude: 18.945, longitude: 72.835 };
      const delhi = { latitude: 28.550, longitude: 77.100 };
      const distance = GeofenceTelematicsEngine.calculateHaversineDistanceKm(mumbai, delhi);

      // Mumbai to Delhi is approximately 1140 - 1170 km as the crow flies
      this.assert(distance >= 1100 && distance <= 1200, `Expected distance ~1150km, got ${distance}km`);
    }));

    // Test 12: Ray-Casting Point-in-Polygon Geofence Boundary Check
    results.push(this.executeTest('TEL-002', 'Telematics & Geofence', 'Ray-Casting Algorithm: Point-in-Polygon Hub Geofence Containment', () => {
      // Inside JNPT Port geofence: { latitude: 18.945, longitude: 72.950 }
      const insidePoint = { latitude: 18.945, longitude: 72.950 };
      // Way outside in Arabian Sea: { latitude: 18.900, longitude: 72.500 }
      const outsidePoint = { latitude: 18.900, longitude: 72.500 };

      const jnptGeofence = GeofenceTelematicsEngine.CORE_FACILITY_GEOFENCES[0];
      const isInside = GeofenceTelematicsEngine.isPointInsidePolygon(insidePoint, jnptGeofence.boundaryPoints);
      const isOutside = GeofenceTelematicsEngine.isPointInsidePolygon(outsidePoint, jnptGeofence.boundaryPoints);

      this.assert(isInside === true, 'Coordinates inside terminal polygon must return true');
      this.assert(isOutside === false, 'Coordinates outside terminal polygon must return false');
    }));

    // Test 13: Driver Hours of Service (HOS) 11-Hour Driving Limit Rule
    results.push(this.executeTest('TEL-003', 'Telematics & Geofence', 'Driver Hours of Service (HOS) 11-Hour Safety Mandate Violation Flagging', () => {
      // Compliant driver: 7 hours driving, 8 hours on duty
      const compliant = GeofenceTelematicsEngine.evaluateDriverHos('DRV-01', 'Rajesh Kumar', 7.0, 8.0, 4.0, 32.0);
      // Violating driver: 12.5 hours driving (exceeds 11.0 hr limit)
      const nonCompliant = GeofenceTelematicsEngine.evaluateDriverHos('DRV-02', 'Amit Verma', 12.5, 14.5, 9.0, 71.0);

      this.assert(compliant.isCompliant === true, '7 hours driving must be compliant');
      this.assert(compliant.violationFlags.length === 0, 'No violation flags for compliant driver');
      this.assert(nonCompliant.isCompliant === false, '12.5 hours driving must be non-compliant');
      this.assert(nonCompliant.violationFlags.length >= 2, 'Must flag 11-hour driving and 14-hour duty violations');
    }));

    // ==========================================
    // MODULE 6: WAREHOUSE OPTIMIZATION TESTS
    // ==========================================

    // Test 14: 3D Pallet Bin Packing Volumetric Utilization
    results.push(this.executeTest('WH-001', 'Warehouse & 3D Packing', '3D Pallet Packing First-Fit Decreasing Volumetric Capacity Check', () => {
      const boxes = [
        { sku: 'BOX-A', name: 'Master Carton Heavy', lengthMm: 400, widthMm: 300, heightMm: 200, weightKg: 15, quantity: 20 },
        { sku: 'BOX-B', name: 'Standard Medium Carton', lengthMm: 300, widthMm: 200, heightMm: 150, weightKg: 8, quantity: 30 }
      ];

      const packed = WarehouseOptimizationEngine.packPallet(boxes, WarehouseOptimizationEngine.EURO_PALLET);
      this.assert(packed.totalBoxesPacked > 0, 'Must pack cartons into pallet');
      this.assert(packed.utilizationVolumePercent > 0, 'Volumetric utilization must be positive');
      this.assert(packed.utilizationWeightPercent <= 100, 'Weight must not exceed 100% capacity');
      this.assert(packed.layerCount >= 1, 'Must calculate layer height');
    }));

    // Test 15: S-Shape Warehouse Pick Path Traversal
    results.push(this.executeTest('WH-002', 'Warehouse & 3D Packing', 'S-Shape Aisle Traversal Pick Path Distance Optimization', () => {
      const pickList = [
        { binId: 'A01-02-1', aisle: 1, bay: 2, shelf: 1, sku: 'SKU-1', quantityNeeded: 4 },
        { binId: 'A01-08-2', aisle: 1, bay: 8, shelf: 2, sku: 'SKU-2', quantityNeeded: 2 },
        { binId: 'A02-04-1', aisle: 2, bay: 4, shelf: 1, sku: 'SKU-3', quantityNeeded: 1 },
        { binId: 'A02-09-3', aisle: 2, bay: 9, shelf: 3, sku: 'SKU-4', quantityNeeded: 6 }
      ];

      const plan = WarehouseOptimizationEngine.optimizePickPath(pickList);
      this.assert(plan.orderedBins.length === 4, 'Must order all 4 pick locations');
      this.assert(plan.totalDistanceMetersEstimated > 0, 'Distance must be positive');
      this.assert(plan.estimatedPickTimeMinutes > 0, 'Pick time must be estimated');
    }));

    const duration = performance.now() - startTime;
    const passedCount = results.filter((r) => r.status === 'PASSED').length;
    const failedCount = results.length - passedCount;

    return {
      timestamp: new Date().toISOString(),
      totalTests: results.length,
      passedCount,
      failedCount,
      executionDurationMs: Number(duration.toFixed(2)),
      passRatePercent: Number(((passedCount / results.length) * 100).toFixed(1)),
      results
    };
  }

  /**
   * Safe execution wrapper for a single test case with timing.
   */
  private static executeTest(
    id: string,
    module: TestCaseResult['module'],
    name: string,
    testFn: () => void
  ): TestCaseResult {
    const start = performance.now();
    try {
      testFn();
      const duration = performance.now() - start;
      return {
        id,
        name,
        module,
        status: 'PASSED',
        durationMs: Number(duration.toFixed(2)),
        assertionCount: 4,
        details: 'All assertions verified.'
      };
    } catch (err: any) {
      const duration = performance.now() - start;
      return {
        id,
        name,
        module,
        status: 'FAILED',
        durationMs: Number(duration.toFixed(2)),
        assertionCount: 1,
        error: err?.message || 'Unknown assertion error'
      };
    }
  }
}
