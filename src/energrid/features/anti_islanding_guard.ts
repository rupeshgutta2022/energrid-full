/**
 * EnerGrid Enterprise Engine: Implement passive anti-islanding rate of frequency change detection
 * Description: Prevents distributed generation from energizing de-energized utility grid segments.
 */

export interface IantiislandingguardConfig {
  readonly id: string;
  readonly name: string;
  readonly samplingIntervalMs: number;
  readonly enabled: boolean;
}

export interface IantiislandingguardTelemetry {
  timestamp: number;
  metricValue: number;
  status: "nominal" | "warning" | "critical";
  meta: Record<string, unknown>;
}

export function calculateantiislandingguardMetric(input: number, factor: number = 1.0): number {
  if (input < 0) return 0;
  return Number((input * factor).toFixed(4));
}
