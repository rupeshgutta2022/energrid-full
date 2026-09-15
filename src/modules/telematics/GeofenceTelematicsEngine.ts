/**
 * @file GeofenceTelematicsEngine.ts
 * Enterprise Geofencing, Haversine Distance, and Driver Hours of Service (HOS) Telematics Engine.
 * Features mathematical point-in-polygon ray-casting and automated regulatory driving limit enforcement.
 */

export interface GeoCoordinate {
  latitude: number;
  longitude: number;
}

export interface GeofencePolygon {
  id: string;
  facilityName: string;
  type: 'Terminal' | 'Warehouse' | 'Port' | 'Customer Site' | 'Rest Area';
  boundaryPoints: GeoCoordinate[];
  alertOnExit: boolean;
  alertOnEntry: boolean;
}

export interface GeofenceEvent {
  geofenceId: string;
  facilityName: string;
  vehicleId: string;
  eventType: 'ENTER' | 'DWELL' | 'EXIT';
  timestamp: string;
  dwellDurationMinutes?: number;
}

export interface DriverHosStatus {
  driverId: string;
  driverName: string;
  currentDutyStatus: 'DRIVING' | 'ON_DUTY_NOT_DRIVING' | 'SLEEPER_BERTH' | 'OFF_DUTY';
  hoursDrivenToday: number;
  maxDrivingHoursAllowed: number; // 11.0 hours
  hoursOnDutyToday: number;
  maxOnDutyHoursAllowed: number; // 14.0 hours
  continuousDrivingHours: number;
  restBreakRequiredInMinutes: number; // Mandatory 30 min break after 8 hours
  cycleHoursAccumulated: number; // 70-hour / 8-day rolling cycle
  cycleHoursRemaining: number;
  isCompliant: boolean;
  violationFlags: string[];
}

export class GeofenceTelematicsEngine {
  public static readonly VERSION = '2.1.4';
  public static readonly EARTH_RADIUS_KM = 6371.0;

  // Pre-configured major multimodal trade hub geofence polygons
  public static readonly CORE_FACILITY_GEOFENCES: GeofencePolygon[] = [
    {
      id: 'GEO-MUM-PORT',
      facilityName: 'Nhava Sheva JNPT Port Terminal',
      type: 'Port',
      boundaryPoints: [
        { latitude: 18.945, longitude: 72.935 },
        { latitude: 18.960, longitude: 72.960 },
        { latitude: 18.940, longitude: 72.975 },
        { latitude: 18.930, longitude: 72.945 }
      ],
      alertOnEntry: true,
      alertOnExit: true
    },
    {
      id: 'GEO-BHI-WH',
      facilityName: 'Bhiwandi Central 3PL Fulfillment Hub',
      type: 'Warehouse',
      boundaryPoints: [
        { latitude: 19.280, longitude: 73.040 },
        { latitude: 19.310, longitude: 73.060 },
        { latitude: 19.290, longitude: 73.090 },
        { latitude: 19.260, longitude: 73.065 }
      ],
      alertOnEntry: true,
      alertOnExit: false
    },
    {
      id: 'GEO-DEL-CARGO',
      facilityName: 'IGI International Airport Air Cargo Complex',
      type: 'Terminal',
      boundaryPoints: [
        { latitude: 28.550, longitude: 77.080 },
        { latitude: 28.580, longitude: 77.100 },
        { latitude: 28.560, longitude: 77.130 },
        { latitude: 28.535, longitude: 77.105 }
      ],
      alertOnEntry: true,
      alertOnExit: true
    }
  ];

  /**
   * Calculates Great-Circle distance between two coordinates using the Haversine formula.
   */
  public static calculateHaversineDistanceKm(point1: GeoCoordinate, point2: GeoCoordinate): number {
    const toRadians = (degrees: number) => (degrees * Math.PI) / 180;

    const dLat = toRadians(point2.latitude - point1.latitude);
    const dLon = toRadians(point2.longitude - point1.longitude);

    const lat1Rad = toRadians(point1.latitude);
    const lat2Rad = toRadians(point2.latitude);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1Rad) * Math.cos(lat2Rad);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return Number((this.EARTH_RADIUS_KM * c).toFixed(2));
  }

  /**
   * Point-in-Polygon (PIP) Ray Casting algorithm.
   * Determines if a GPS point is located inside an arbitrary multi-vertex boundary polygon.
   */
  public static isPointInsidePolygon(point: GeoCoordinate, polygonPoints: GeoCoordinate[]): boolean {
    let inside = false;
    const n = polygonPoints.length;

    for (let i = 0, j = n - 1; i < n; j = i++) {
      const xi = polygonPoints[i].longitude;
      const yi = polygonPoints[i].latitude;
      const xj = polygonPoints[j].longitude;
      const yj = polygonPoints[j].latitude;

      const intersect =
        yi > point.latitude !== yj > point.latitude &&
        point.longitude < ((xj - xi) * (point.latitude - yi)) / (yj - yi) + xi;

      if (intersect) {
        inside = !inside;
      }
    }

    return inside;
  }

  /**
   * Evaluates if a vehicle location intersects with any registered logistics hub geofence.
   */
  public static evaluateGeofences(
    vehicleId: string,
    currentLocation: GeoCoordinate
  ): { insideGeofences: GeofencePolygon[]; eventsGenerated: GeofenceEvent[] } {
    const insideGeofences: GeofencePolygon[] = [];
    const eventsGenerated: GeofenceEvent[] = [];
    const now = new Date().toISOString();

    for (const geofence of this.CORE_FACILITY_GEOFENCES) {
      const isInside = this.isPointInsidePolygon(currentLocation, geofence.boundaryPoints);

      if (isInside) {
        insideGeofences.push(geofence);
        eventsGenerated.push({
          geofenceId: geofence.id,
          facilityName: geofence.facilityName,
          vehicleId,
          eventType: 'ENTER',
          timestamp: now,
          dwellDurationMinutes: 12
        });
      }
    }

    return { insideGeofences, eventsGenerated };
  }

  /**
   * Evaluates Driver Hours of Service (HOS) for compliance with safety mandates.
   * Enforces 11-hour driving limit, 14-hour on-duty window, and mandatory 30-min break.
   */
  public static evaluateDriverHos(
    driverId: string,
    driverName: string,
    drivingHours: number,
    onDutyHours: number,
    consecutiveHoursWithoutBreak: number,
    cycleHoursAccumulated: number
  ): DriverHosStatus {
    const maxDriving = 11.0;
    const maxOnDuty = 14.0;
    const maxCycle = 70.0;
    const violationFlags: string[] = [];

    if (drivingHours > maxDriving) {
      violationFlags.push(`11-Hour Driving Rule Exceeded: Driver has logged ${drivingHours.toFixed(1)} hrs of wheel time.`);
    }

    if (onDutyHours > maxOnDuty) {
      violationFlags.push(`14-Hour Duty Window Exceeded: Shift elapsed time is ${onDutyHours.toFixed(1)} hrs.`);
    }

    if (consecutiveHoursWithoutBreak >= 8.0) {
      violationFlags.push('Mandatory 30-Minute Rest Break Violation: Over 8 consecutive hours of duty without statutory break.');
    }

    if (cycleHoursAccumulated >= maxCycle) {
      violationFlags.push(`70-Hour / 8-Day Cycle Cap Reached: Accumulated ${cycleHoursAccumulated.toFixed(1)} hrs.`);
    }

    const isCompliant = violationFlags.length === 0;
    const breakRequiredIn = Math.max(0, Number((8.0 - consecutiveHoursWithoutBreak).toFixed(1)));
    const cycleRemaining = Math.max(0, Number((maxCycle - cycleHoursAccumulated).toFixed(1)));

    return {
      driverId,
      driverName,
      currentDutyStatus: drivingHours > 0 ? 'DRIVING' : 'ON_DUTY_NOT_DRIVING',
      hoursDrivenToday: drivingHours,
      maxDrivingHoursAllowed: maxDriving,
      hoursOnDutyToday: onDutyHours,
      maxOnDutyHoursAllowed: maxOnDuty,
      continuousDrivingHours: consecutiveHoursWithoutBreak,
      restBreakRequiredInMinutes: Math.round(breakRequiredIn * 60),
      cycleHoursAccumulated,
      cycleHoursRemaining: cycleRemaining,
      isCompliant,
      violationFlags
    };
  }
}
