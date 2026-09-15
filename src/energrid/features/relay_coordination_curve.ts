/**
 * EnerGrid Enterprise Engine: Compute inverse-time overcurrent relay trip curves
 * Description: Ensures downstream circuit breakers clear localized faults before upstream breakers trip.
 */

export interface IrelaycoordinationcurveConfig {
  readonly id: string;
  readonly name: string;
  readonly samplingIntervalMs: number;
  readonly enabled: boolean;
}

export interface IrelaycoordinationcurveTelemetry {
  timestamp: number;
  metricValue: number;
  status: "nominal" | "warning" | "critical";
  meta: Record<string, unknown>;
}

export function calculaterelaycoordinationcurveMetric(input: number, factor: number = 1.0): number {
  if (input < 0) return 0;
  return Number((input * factor).toFixed(4));
}
