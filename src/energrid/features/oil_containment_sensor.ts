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
