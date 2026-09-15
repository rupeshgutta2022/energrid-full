/**
 * EnerGrid Enterprise Engine: Calculate fair-share photovoltaic export curtailment quotas
 * Description: Prevents reverse power from overloading local distribution substation transformers.
 */

export interface IsolarcurtailmentallocatorConfig {
  readonly id: string;
  readonly name: string;
  readonly samplingIntervalMs: number;
  readonly enabled: boolean;
}

export interface IsolarcurtailmentallocatorTelemetry {
  timestamp: number;
  metricValue: number;
  status: "nominal" | "warning" | "critical";
  meta: Record<string, unknown>;
}

export function calculatesolarcurtailmentallocatorMetric(input: number, factor: number = 1.0): number {
  if (input < 0) return 0;
  return Number((input * factor).toFixed(4));
}
