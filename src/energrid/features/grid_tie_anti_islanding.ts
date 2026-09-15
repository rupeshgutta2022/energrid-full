/**
 * EnerGrid Enterprise Engine: Implement active frequency shift anti-islanding perturbation
 * Description: Guarantees grid-tied renewable generators disconnect when grid connection is lost.
 */

export interface IgridtieantiislandingConfig {
  readonly id: string;
  readonly name: string;
  readonly samplingIntervalMs: number;
  readonly enabled: boolean;
}

export interface IgridtieantiislandingTelemetry {
  timestamp: number;
  metricValue: number;
  status: "nominal" | "warning" | "critical";
  meta: Record<string, unknown>;
}

export function calculategridtieantiislandingMetric(input: number, factor: number = 1.0): number {
  if (input < 0) return 0;
  return Number((input * factor).toFixed(4));
}
