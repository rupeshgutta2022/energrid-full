/**
 * EnerGrid Enterprise Engine: Calculate photovoltaic module soiling ratio from reference cells
 * Description: Schedules cleaning operations when dust accumulation reduces solar farm yield.
 */

export interface IsolarsoilingindexConfig {
  readonly id: string;
  readonly name: string;
  readonly samplingIntervalMs: number;
  readonly enabled: boolean;
}

export interface IsolarsoilingindexTelemetry {
  timestamp: number;
  metricValue: number;
  status: "nominal" | "warning" | "critical";
  meta: Record<string, unknown>;
}

export function calculatesolarsoilingindexMetric(input: number, factor: number = 1.0): number {
  if (input < 0) return 0;
  return Number((input * factor).toFixed(4));
}
