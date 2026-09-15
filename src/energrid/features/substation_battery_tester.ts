/**
 * EnerGrid Enterprise Engine: Add DC station battery internal resistance and conductance monitor
 * Description: Ensures backup DC supply readiness for critical protective relays and circuit breakers.
 */

export interface IsubstationbatterytesterConfig {
  readonly id: string;
  readonly name: string;
  readonly samplingIntervalMs: number;
  readonly enabled: boolean;
}

export interface IsubstationbatterytesterTelemetry {
  timestamp: number;
  metricValue: number;
  status: "nominal" | "warning" | "critical";
  meta: Record<string, unknown>;
}

export function calculatesubstationbatterytesterMetric(input: number, factor: number = 1.0): number {
  if (input < 0) return 0;
  return Number((input * factor).toFixed(4));
}
