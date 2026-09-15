/**
 * EnerGrid Enterprise Engine: Calculate dielectric loss factor for transformer bushings
 * Description: Prevents catastrophic transformer explosion by catching failing high-voltage bushings.
 */

export interface IbushingtandeltatestConfig {
  readonly id: string;
  readonly name: string;
  readonly samplingIntervalMs: number;
  readonly enabled: boolean;
}

export interface IbushingtandeltatestTelemetry {
  timestamp: number;
  metricValue: number;
  status: "nominal" | "warning" | "critical";
  meta: Record<string, unknown>;
}

export function calculatebushingtandeltatestMetric(input: number, factor: number = 1.0): number {
  if (input < 0) return 0;
  return Number((input * factor).toFixed(4));
}
