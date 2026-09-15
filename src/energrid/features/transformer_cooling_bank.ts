/**
 * EnerGrid Enterprise Engine: Implement staged forced-oil forced-air fan bank controller
 * Description: Activates cooling radiator fans progressively as transformer load increases.
 */

export interface ItransformercoolingbankConfig {
  readonly id: string;
  readonly name: string;
  readonly samplingIntervalMs: number;
  readonly enabled: boolean;
}

export interface ItransformercoolingbankTelemetry {
  timestamp: number;
  metricValue: number;
  status: "nominal" | "warning" | "critical";
  meta: Record<string, unknown>;
}

export function calculatetransformercoolingbankMetric(input: number, factor: number = 1.0): number {
  if (input < 0) return 0;
  return Number((input * factor).toFixed(4));
}
