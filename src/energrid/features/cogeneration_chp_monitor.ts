/**
 * EnerGrid Enterprise Engine: Calculate combined heat and power thermal utilization efficiency
 * Description: Tracks electrical and useful thermal output in cogeneration power facilities.
 */

export interface IcogenerationchpmonitorConfig {
  readonly id: string;
  readonly name: string;
  readonly samplingIntervalMs: number;
  readonly enabled: boolean;
}

export interface IcogenerationchpmonitorTelemetry {
  timestamp: number;
  metricValue: number;
  status: "nominal" | "warning" | "critical";
  meta: Record<string, unknown>;
}

export function calculatecogenerationchpmonitorMetric(input: number, factor: number = 1.0): number {
  if (input < 0) return 0;
  return Number((input * factor).toFixed(4));
}
