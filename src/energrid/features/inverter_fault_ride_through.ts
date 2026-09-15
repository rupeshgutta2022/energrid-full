/**
 * EnerGrid Enterprise Engine: Implement low-voltage ride-through control for solar inverters
 * Description: Keeps utility inverters connected during momentary grid voltage depressions.
 */

export interface IinverterfaultridethroughConfig {
  readonly id: string;
  readonly name: string;
  readonly samplingIntervalMs: number;
  readonly enabled: boolean;
}

export interface IinverterfaultridethroughTelemetry {
  timestamp: number;
  metricValue: number;
  status: "nominal" | "warning" | "critical";
  meta: Record<string, unknown>;
}

export function calculateinverterfaultridethroughMetric(input: number, factor: number = 1.0): number {
  if (input < 0) return 0;
  return Number((input * factor).toFixed(4));
}
