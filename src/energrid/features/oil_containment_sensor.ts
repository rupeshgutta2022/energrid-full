/**
 * EnerGrid Enterprise Engine: Monitor substation transformer oil spill basin ultrasonic level
 * Description: Prevents mineral dielectric oil contamination of local groundwater.
 */

export interface IoilcontainmentsensorConfig {
  readonly id: string;
  readonly name: string;
  readonly samplingIntervalMs: number;
  readonly enabled: boolean;
}

export interface IoilcontainmentsensorTelemetry {
  timestamp: number;
  metricValue: number;
  status: "nominal" | "warning" | "critical";
  meta: Record<string, unknown>;
}

export function calculateoilcontainmentsensorMetric(input: number, factor: number = 1.0): number {
  if (input < 0) return 0;
  return Number((input * factor).toFixed(4));
}

export class oilcontainmentsensorEngine {
  private history: IoilcontainmentsensorTelemetry[] = [];

  constructor(public config: IoilcontainmentsensorConfig) {}

  public recordTelemetry(value: number): IoilcontainmentsensorTelemetry {
    const sample: IoilcontainmentsensorTelemetry = {
      timestamp: Date.now(),
      metricValue: calculateoilcontainmentsensorMetric(value),
      status: value > 90 ? "critical" : value > 70 ? "warning" : "nominal",
      meta: { subsystem: "oil_containment_sensor" }
    };
    this.history.push(sample);
    return sample;
  }

  public getRecentTelemetry(): IoilcontainmentsensorTelemetry[] {
    return this.history.slice(-50);
  }
}
