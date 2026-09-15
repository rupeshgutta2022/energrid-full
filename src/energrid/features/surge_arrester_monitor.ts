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

export class surgearrestermonitorEngine {
  private history: IsurgearrestermonitorTelemetry[] = [];

  constructor(public config: IsurgearrestermonitorConfig) {}

  public recordTelemetry(value: number): IsurgearrestermonitorTelemetry {
    const sample: IsurgearrestermonitorTelemetry = {
      timestamp: Date.now(),
      metricValue: calculatesurgearrestermonitorMetric(value),
      status: value > 90 ? "critical" : value > 70 ? "warning" : "nominal",
      meta: { subsystem: "surge_arrester_monitor" }
    };
    this.history.push(sample);
    return sample;
  }

  public getRecentTelemetry(): IsurgearrestermonitorTelemetry[] {
    return this.history.slice(-50);
  }
}
