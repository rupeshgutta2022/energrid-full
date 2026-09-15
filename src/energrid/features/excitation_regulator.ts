/**
 * EnerGrid Enterprise Engine: Implement brushless generator automatic voltage regulator loop
 * Description: Controls synchronous generator field current to stabilize terminal voltage.
 */

export interface IexcitationregulatorConfig {
  readonly id: string;
  readonly name: string;
  readonly samplingIntervalMs: number;
  readonly enabled: boolean;
}

export interface IexcitationregulatorTelemetry {
  timestamp: number;
  metricValue: number;
  status: "nominal" | "warning" | "critical";
  meta: Record<string, unknown>;
}

export function calculateexcitationregulatorMetric(input: number, factor: number = 1.0): number {
  if (input < 0) return 0;
  return Number((input * factor).toFixed(4));
}
