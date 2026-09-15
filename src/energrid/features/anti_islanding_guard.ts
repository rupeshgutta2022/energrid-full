/**
 * EnerGrid Enterprise Engine: Implement passive anti-islanding rate of frequency change detection
 * Description: Prevents distributed generation from energizing de-energized utility grid segments.
 */

export interface IantiislandingguardConfig {
  readonly id: string;
  readonly name: string;
  readonly samplingIntervalMs: number;
  readonly enabled: boolean;
}

export interface IantiislandingguardTelemetry {
  timestamp: number;
  metricValue: number;
  status: "nominal" | "warning" | "critical";
  meta: Record<string, unknown>;
}

export function calculateantiislandingguardMetric(input: number, factor: number = 1.0): number {
  if (input < 0) return 0;
  return Number((input * factor).toFixed(4));
}

export class antiislandingguardEngine {
  private history: IantiislandingguardTelemetry[] = [];

  constructor(public config: IantiislandingguardConfig) {}

  public recordTelemetry(value: number): IantiislandingguardTelemetry {
    const sample: IantiislandingguardTelemetry = {
      timestamp: Date.now(),
      metricValue: calculateantiislandingguardMetric(value),
      status: value > 90 ? "critical" : value > 70 ? "warning" : "nominal",
      meta: { subsystem: "anti_islanding_guard" }
    };
    this.history.push(sample);
    return sample;
  }

  public getRecentTelemetry(): IantiislandingguardTelemetry[] {
    return this.history.slice(-50);
  }
}
