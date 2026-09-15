/**
 * EnerGrid Enterprise Engine: Optimize wind farm output during negative market price hours
 * Description: Curtains output intelligently when grid wholesale electricity prices turn negative.
 */

export interface IwindcurtailmentoptimizerConfig {
  readonly id: string;
  readonly name: string;
  readonly samplingIntervalMs: number;
  readonly enabled: boolean;
}

export interface IwindcurtailmentoptimizerTelemetry {
  timestamp: number;
  metricValue: number;
  status: "nominal" | "warning" | "critical";
  meta: Record<string, unknown>;
}

export function calculatewindcurtailmentoptimizerMetric(input: number, factor: number = 1.0): number {
  if (input < 0) return 0;
  return Number((input * factor).toFixed(4));
}
