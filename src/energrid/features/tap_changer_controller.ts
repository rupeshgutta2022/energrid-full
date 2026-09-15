/**
 * EnerGrid Enterprise Engine: Implement on-load tap changer automatic voltage regulation
 * Description: Maintains stable secondary distribution voltage under varying substation loads.
 */

export interface ItapchangercontrollerConfig {
  readonly id: string;
  readonly name: string;
  readonly samplingIntervalMs: number;
  readonly enabled: boolean;
}

export interface ItapchangercontrollerTelemetry {
  timestamp: number;
  metricValue: number;
  status: "nominal" | "warning" | "critical";
  meta: Record<string, unknown>;
}

export function calculatetapchangercontrollerMetric(input: number, factor: number = 1.0): number {
  if (input < 0) return 0;
  return Number((input * factor).toFixed(4));
}
