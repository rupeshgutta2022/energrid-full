/**
 * EnerGrid Enterprise Engine: Model chilled water thermal energy storage tank charging
 * Description: Stores chilled water produced with low-cost night electricity for peak air conditioning.
 */

export interface IdistrictcoolingstorageConfig {
  readonly id: string;
  readonly name: string;
  readonly samplingIntervalMs: number;
  readonly enabled: boolean;
}

export interface IdistrictcoolingstorageTelemetry {
  timestamp: number;
  metricValue: number;
  status: "nominal" | "warning" | "critical";
  meta: Record<string, unknown>;
}

export function calculatedistrictcoolingstorageMetric(input: number, factor: number = 1.0): number {
  if (input < 0) return 0;
  return Number((input * factor).toFixed(4));
}
