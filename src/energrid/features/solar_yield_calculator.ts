/**
 * EnerGrid Enterprise Engine: Add solar array photovoltaic yield calculation engine
 * Description: Calculates instantaneous and forecasted energy output across utility scale solar arrays.
 */

export interface IsolaryieldcalculatorConfig {
  readonly id: string;
  readonly name: string;
  readonly samplingIntervalMs: number;
  readonly enabled: boolean;
}

export interface IsolaryieldcalculatorTelemetry {
  timestamp: number;
  metricValue: number;
  status: "nominal" | "warning" | "critical";
  meta: Record<string, unknown>;
}

export function calculatesolaryieldcalculatorMetric(input: number, factor: number = 1.0): number {
  if (input < 0) return 0;
  return Number((input * factor).toFixed(4));
}
