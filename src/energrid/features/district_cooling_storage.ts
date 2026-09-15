/**
 * EnerGrid Enterprise Engine: Model chilled water thermal energy storage tank charging
 * Description: Stores chilled water produced with low-cost night electricity for peak air conditioning.
 */

export interface IdistrictcoolingstorageConfig {
  readonly id: string;
  readonly name: string;
  readonly samplingIntervalMs: number;
  readonly enabled: boolean;
}

export interface IdistrictcoolingstorageTelemetry {
  timestamp: number;
  metricValue: number;
  status: "nominal" | "warning" | "critical";
  meta: Record<string, unknown>;
}

export function calculatedistrictcoolingstorageMetric(input: number, factor: number = 1.0): number {
  if (input < 0) return 0;
  return Number((input * factor).toFixed(4));
}

export class districtcoolingstorageEngine {
  private history: IdistrictcoolingstorageTelemetry[] = [];

  constructor(public config: IdistrictcoolingstorageConfig) {}

  public recordTelemetry(value: number): IdistrictcoolingstorageTelemetry {
    const sample: IdistrictcoolingstorageTelemetry = {
      timestamp: Date.now(),
      metricValue: calculatedistrictcoolingstorageMetric(value),
      status: value > 90 ? "critical" : value > 70 ? "warning" : "nominal",
      meta: { subsystem: "district_cooling_storage" }
    };
    this.history.push(sample);
    return sample;
  }

  public getRecentTelemetry(): IdistrictcoolingstorageTelemetry[] {
    return this.history.slice(-50);
  }
}
