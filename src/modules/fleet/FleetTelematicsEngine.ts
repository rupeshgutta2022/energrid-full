/**
 * LogiCore Enterprise Fleet Management & Telematics Engine
 * 
 * Provides real-time OBD-II sensor diagnostics, preventative maintenance work order
 * scheduling (PM-A, PM-B, PM-C intervals), tire tread life monitoring, driver safety
 * scoring (harsh braking, overspeed, idle time), and carbon footprint calculation.
 */

export type FuelType = 'DIESEL' | 'CNG' | 'LNG' | 'ELECTRIC';

export type MaintenanceIntervalType = 'PM_A_INSPECTION' | 'PM_B_SERVICE' | 'PM_C_MAJOR_OVERHAUL';

export interface ObdFaultCode {
  dtcCode: string; // e.g. P0300, P0420
  subsystem: 'ENGINE' | 'TRANSMISSION' | 'BRAKING_ABS' | 'EXHAUST_AFTERTREATMENT' | 'ELECTRICAL';
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL_STOP_ENGINE';
  description: string;
  recommendedAction: string;
}

export interface VehicleTelemetrySnapshot {
  vehicleId: string;
  vinNumber: string;
  timestamp: string;
  odometerKm: number;
  engineSpeedRpm: number;
  vehicleSpeedKmph: number;
  engineCoolantTempCelsius: number;
  engineOilPressurePsi: number;
  defFluidLevelPercent: number;
  fuelLevelPercent: number;
  batteryVoltageVolts: number;
  ambientTemperatureCelsius: number;
  activeFaultCodes: ObdFaultCode[];
}

export interface TireConditionRecord {
  position: 'FRONT_LEFT' | 'FRONT_RIGHT' | 'DRIVE_AXLE_1_OUTER_LEFT' | 'DRIVE_AXLE_1_INNER_LEFT' | 'DRIVE_AXLE_1_INNER_RIGHT' | 'DRIVE_AXLE_1_OUTER_RIGHT';
  serialNumber: string;
  brandModel: string;
  installedOdometerKm: number;
  currentTreadDepthMm: number; // New: 14mm, Safe minimum: 3.2mm
  currentPressurePsi: number; // Target: 110-120 PSI
  temperatureCelsius: number;
  isRetread: boolean;
}

export interface MaintenanceWorkOrder {
  orderId: string;
  vehicleId: string;
  scheduledDate: string;
  intervalType: MaintenanceIntervalType;
  estimatedLaborHours: number;
  checklistItems: {
    system: string;
    item: string;
    isMandatory: boolean;
  }[];
  replacementParts: {
    partNumber: string;
    partName: string;
    quantity: number;
    unitCostInr: number;
  }[];
  estimatedTotalCostInr: number;
}

export interface DriverSafetyTelemetryEvent {
  eventId: string;
  eventType: 'HARSH_BRAKING' | 'HARSH_ACCELERATION' | 'CORNERING_LATERAL_G' | 'SPEEDING_OVER_80' | 'EXCESSIVE_IDLING' | 'DROWSINESS_DETECTED';
  timestamp: string;
  speedKmph: number;
  durationSeconds: number;
  latitude: number;
  longitude: number;
}

export interface DriverSafetyScoreCard {
  driverId: string;
  driverName: string;
  evaluationPeriod: string;
  totalDistanceDrivenKm: number;
  totalEngineHours: number;
  idleHours: number;
  harshBrakingIncidents: number;
  harshAccelerationIncidents: number;
  overspeedIncidents: number;
  drowsinessAlerts: number;
  safetyScore: number; // 0 to 100
  safetyTier: 'PLATINUM_SAFE' | 'GOLD_STANDARD' | 'SILVER_MONITORED' | 'NEEDS_COACHING';
  coachingPlan: string[];
}

export class FleetTelematicsEngine {
  /**
   * Diagnostic anomaly detection rule engine for raw vehicle telematics
   */
  public static evaluateTelemetryAnomalies(snapshot: VehicleTelemetrySnapshot): {
    hasAnomalies: boolean;
    criticalWarnings: string[];
    advisoryNotices: string[];
  } {
    const criticalWarnings: string[] = [];
    const advisoryNotices: string[] = [];

    // Coolant temp check (Normal operating range: 85 - 98 C)
    if (snapshot.engineCoolantTempCelsius > 105) {
      criticalWarnings.push(`Critical Engine Overheat Alert: Coolant reached ${snapshot.engineCoolantTempCelsius}°C (Max allowable 105°C). Immediate cooldown required.`);
    } else if (snapshot.engineCoolantTempCelsius > 98) {
      advisoryNotices.push(`Elevated Coolant Temperature: ${snapshot.engineCoolantTempCelsius}°C. Inspect radiator airflow and coolant reservoir.`);
    }

    // Oil pressure check (Normal heavy commercial diesel: 30 - 65 PSI at speed)
    if (snapshot.engineOilPressurePsi < 20 && snapshot.engineSpeedRpm > 1000) {
      criticalWarnings.push(`Low Engine Oil Pressure: ${snapshot.engineOilPressurePsi} PSI. Risk of immediate piston seizure. Stop vehicle immediately.`);
    }

    // DEF (Diesel Exhaust Fluid) level check for BS-VI compliance
    if (snapshot.defFluidLevelPercent < 10) {
      criticalWarnings.push(`DEF Level Critically Low (${snapshot.defFluidLevelPercent}%). ECU engine derate to 40% torque imminent within 50 km.`);
    } else if (snapshot.defFluidLevelPercent < 20) {
      advisoryNotices.push(`DEF Tank Low (${snapshot.defFluidLevelPercent}%). Schedule AdBlue replenishment at next fueling bay.`);
    }

    // Battery alternator check (Normal 24V commercial system: 26.5V - 28.5V charging)
    if (snapshot.batteryVoltageVolts < 24.0) {
      criticalWarnings.push(`Electrical System Fault: Battery bus at ${snapshot.batteryVoltageVolts}V. Alternator malfunction or dying cell.`);
    }

    // Critical OBD fault codes check
    for (const code of snapshot.activeFaultCodes) {
      if (code.severity === 'CRITICAL_STOP_ENGINE') {
        criticalWarnings.push(`OBD Fault [${code.dtcCode}]: ${code.description}. ${code.recommendedAction}`);
      } else if (code.severity === 'HIGH') {
        advisoryNotices.push(`OBD Warning [${code.dtcCode}]: ${code.description}`);
      }
    }

    return {
      hasAnomalies: criticalWarnings.length > 0 || advisoryNotices.length > 0,
      criticalWarnings,
      advisoryNotices
    };
  }

  /**
   * Evaluates commercial pilot safety behavior over a journey
   */
  public static calculateDriverSafetyScore(
    driverId: string,
    driverName: string,
    totalDistanceKm: number,
    totalEngineHours: number,
    idleHours: number,
    events: DriverSafetyTelemetryEvent[]
  ): DriverSafetyScoreCard {
    let score = 100;

    let harshBraking = 0;
    let harshAcc = 0;
    let overspeed = 0;
    let drowsiness = 0;

    for (const ev of events) {
      switch (ev.eventType) {
        case 'HARSH_BRAKING':
          harshBraking++;
          score -= 3;
          break;
        case 'HARSH_ACCELERATION':
          harshAcc++;
          score -= 2;
          break;
        case 'SPEEDING_OVER_80':
          overspeed++;
          score -= 5;
          break;
        case 'DROWSINESS_DETECTED':
          drowsiness++;
          score -= 10;
          break;
        case 'EXCESSIVE_IDLING':
          score -= 1;
          break;
      }
    }

    // Idle percentage penalty (ideal idle < 10% of engine time)
    const idlePercent = totalEngineHours > 0 ? (idleHours / totalEngineHours) * 100 : 0;
    if (idlePercent > 25) {
      score -= 5;
    }

    const finalScore = Math.max(0, Math.min(100, Math.round(score)));

    let safetyTier: DriverSafetyScoreCard['safetyTier'] = 'PLATINUM_SAFE';
    const coachingPlan: string[] = [];

    if (finalScore >= 92) {
      safetyTier = 'PLATINUM_SAFE';
      coachingPlan.push('Maintain exemplary driving standards. Eligible for quarterly fuel conservation incentive.');
    } else if (finalScore >= 80) {
      safetyTier = 'GOLD_STANDARD';
      coachingPlan.push('Monitor speed buffer in interstate deceleration zones.');
    } else if (finalScore >= 65) {
      safetyTier = 'SILVER_MONITORED';
      coachingPlan.push('Enroll in progressive brake modulation and anti-tailgating simulator.');
      if (idlePercent > 20) coachingPlan.push('Reduce overnight auxiliary idle through auxiliary power units (APU).');
    } else {
      safetyTier = 'NEEDS_COACHING';
      coachingPlan.push('Mandatory 4-hour defensive driving retraining.');
      coachingPlan.push('In-cabin dual-facing telematics dashcam monitoring active.');
    }

    return {
      driverId,
      driverName,
      evaluationPeriod: 'Last 30 Days (Rolling)',
      totalDistanceDrivenKm: totalDistanceKm,
      totalEngineHours,
      idleHours,
      harshBrakingIncidents: harshBraking,
      harshAccelerationIncidents: harshAcc,
      overspeedIncidents: overspeed,
      drowsinessAlerts: drowsiness,
      safetyScore: finalScore,
      safetyTier,
      coachingPlan
    };
  }

  /**
   * Generates upcoming preventative maintenance work orders
   */
  public static generateMaintenanceWorkOrder(
    vehicleId: string,
    currentOdometerKm: number,
    lastServiceOdometerKm: number
  ): MaintenanceWorkOrder {
    const kmSinceService = currentOdometerKm - lastServiceOdometerKm;
    let intervalType: MaintenanceIntervalType = 'PM_A_INSPECTION';

    if (kmSinceService >= 80000) {
      intervalType = 'PM_C_MAJOR_OVERHAUL';
    } else if (kmSinceService >= 35000) {
      intervalType = 'PM_B_SERVICE';
    } else {
      intervalType = 'PM_A_INSPECTION';
    }

    const scheduledDate = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    if (intervalType === 'PM_C_MAJOR_OVERHAUL') {
      return {
        orderId: `WO-PMC-${vehicleId}-${Math.floor(1000 + Math.random() * 9000)}`,
        vehicleId,
        scheduledDate,
        intervalType,
        estimatedLaborHours: 14.5,
        checklistItems: [
          { system: 'ENGINE', item: 'Valve lash clearance adjustment and injector timing', isMandatory: true },
          { system: 'TRANSMISSION', item: 'Clutch plate wear depth and transmission gear fluid change', isMandatory: true },
          { system: 'BRAKING', item: 'Brake drum rotor thickness and S-cam bushing replacement', isMandatory: true },
          { system: 'EMISSIONS', item: 'Diesel Particulate Filter (DPF) thermal baking and soot clean', isMandatory: true }
        ],
        replacementParts: [
          { partNumber: 'DPF-CORE-4825', partName: 'DPF Filter Cartridge Cleaned Unit', quantity: 1, unitCostInr: 28500 },
          { partNumber: 'OIL-SYN-15W40', partName: 'Engine Synthetic Oil (32 Liters)', quantity: 32, unitCostInr: 450 },
          { partNumber: 'BRK-LIN-COMM', partName: 'Heavy Commercial Brake Linings Set', quantity: 4, unitCostInr: 6800 }
        ],
        estimatedTotalCostInr: 72100
      };
    }

    if (intervalType === 'PM_B_SERVICE') {
      return {
        orderId: `WO-PMB-${vehicleId}-${Math.floor(1000 + Math.random() * 9000)}`,
        vehicleId,
        scheduledDate,
        intervalType,
        estimatedLaborHours: 6.0,
        checklistItems: [
          { system: 'ENGINE', item: 'Engine oil and primary/secondary oil filter replacement', isMandatory: true },
          { system: 'FUEL', item: 'Fuel water separator element cartridge replacement', isMandatory: true },
          { system: 'SUSPENSION', item: 'Leaf spring hanger shackle bolt torque verification', isMandatory: true },
          { system: 'STEERING', item: 'Kingpin play measurement and tie-rod greasing', isMandatory: true }
        ],
        replacementParts: [
          { partNumber: 'OIL-SYN-15W40', partName: 'Engine Synthetic Oil (32 Liters)', quantity: 32, unitCostInr: 450 },
          { partNumber: 'FLT-OIL-PRI', partName: 'Full-Flow Spin-on Oil Filter', quantity: 2, unitCostInr: 1850 },
          { partNumber: 'FLT-FUEL-SEP', partName: 'Fuel Water Separator Filter', quantity: 1, unitCostInr: 2400 }
        ],
        estimatedTotalCostInr: 24500
      };
    }

    // Default PM-A
    return {
      orderId: `WO-PMA-${vehicleId}-${Math.floor(1000 + Math.random() * 9000)}`,
      vehicleId,
      scheduledDate,
      intervalType,
      estimatedLaborHours: 2.5,
      checklistItems: [
        { system: 'SAFETY', item: 'Headlights, brake lights, reverse alarm, and indicators check', isMandatory: true },
        { system: 'TIRES', item: 'Tire inflation pressure, lug nut torque, and tread depth check', isMandatory: true },
        { system: 'FLUIDS', item: 'Coolant, brake fluid, windshield washer, and AdBlue level top-up', isMandatory: true },
        { system: 'AIR_BRAKES', item: 'Air tank drain valve condensation purge', isMandatory: true }
      ],
      replacementParts: [
        { partNumber: 'DEF-ADBLUE-20L', partName: 'BS-VI AdBlue DEF Solution (20L can)', quantity: 2, unitCostInr: 1200 },
        { partNumber: 'WPR-BLADE-24', partName: 'Heavy-Duty Wiper Blade Pair', quantity: 1, unitCostInr: 950 }
      ],
      estimatedTotalCostInr: 5350
    };
  }

  /**
   * Calculates carbon footprint emissions based on fuel consumption
   */
  public static calculateCarbonFootprint(
    fuelConsumedLiters: number,
    fuelType: FuelType = 'DIESEL'
  ): {
    totalEmissionsKgCo2e: number;
    emissionFactorPerUnit: number;
    recommendedTreeOffsetCount: number;
  } {
    // Diesel emission factor: ~2.68 kg CO2 per liter
    // CNG: ~2.75 kg CO2 per kg
    // LNG: ~2.75 kg CO2 per kg
    // Electric: ~0.82 kg CO2 per kWh grid average
    let factor = 2.68;
    if (fuelType === 'CNG') factor = 2.75;
    if (fuelType === 'ELECTRIC') factor = 0.82;

    const totalEmissions = Math.round(fuelConsumedLiters * factor * 10) / 10;
    // One mature tree absorbs ~22 kg CO2 per year
    const treesNeeded = Math.ceil(totalEmissions / 22);

    return {
      totalEmissionsKgCo2e: totalEmissions,
      emissionFactorPerUnit: factor,
      recommendedTreeOffsetCount: treesNeeded
    };
  }
}
