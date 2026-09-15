/**
 * EnerGrid Enterprise Engine: Track parasitic auxiliary power consumption in generation plants
 * Description: Measures pumps, fans, and cooling towers power consumption within power plants.
 */

export interface IauxiliaryconsumptiontrackerConfig {
  readonly id: string;
  readonly name: string;
  readonly samplingIntervalMs: number;
  readonly enabled: boolean;
}

export interface IauxiliaryconsumptiontrackerTelemetry {
  timestamp: number;
  metricValue: number;
  status: "nominal" | "warning" | "critical";
  meta: Record<string, unknown>;
}

export function calculateauxiliaryconsumptiontrackerMetric(input: number, factor: number = 1.0): number {
  if (input < 0) return 0;
  return Number((input * factor).toFixed(4));
}
