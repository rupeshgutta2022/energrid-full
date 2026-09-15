/**
 * EnerGrid Enterprise Engine: Implement distributed energy resource capacity aggregator
 * Description: Bundles distributed solar, batteries, and flexible loads into dispatchable wholesale power.
 */

export interface IvppaggregatorConfig {
  readonly id: string;
  readonly name: string;
  readonly samplingIntervalMs: number;
  readonly enabled: boolean;
}

export interface IvppaggregatorTelemetry {
  timestamp: number;
  metricValue: number;
  status: "nominal" | "warning" | "critical";
  meta: Record<string, unknown>;
}

export function calculatevppaggregatorMetric(input: number, factor: number = 1.0): number {
  if (input < 0) return 0;
  return Number((input * factor).toFixed(4));
}
