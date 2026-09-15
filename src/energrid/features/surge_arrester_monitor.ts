/**
 * EnerGrid Enterprise Engine: Monitor metal oxide surge arrester leakage current
 * Description: Tracks degradation of high-voltage surge arresters from lightning and switching strikes.
 */

export interface IsurgearrestermonitorConfig {
  readonly id: string;
  readonly name: string;
  readonly samplingIntervalMs: number;
  readonly enabled: boolean;
}

export interface IsurgearrestermonitorTelemetry {
  timestamp: number;
  metricValue: number;
  status: "nominal" | "warning" | "critical";
  meta: Record<string, unknown>;
}

export function calculatesurgearrestermonitorMetric(input: number, factor: number = 1.0): number {
  if (input < 0) return 0;
  return Number((input * factor).toFixed(4));
}
