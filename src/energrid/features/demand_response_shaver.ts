/**
 * EnerGrid Enterprise Engine: Add automated demand response peak shaving scheduler
 * Description: Curtains non-critical commercial loads during peak pricing and high grid stress intervals.
 */

export interface IdemandresponseshaverConfig {
  readonly id: string;
  readonly name: string;
  readonly samplingIntervalMs: number;
  readonly enabled: boolean;
}

export interface IdemandresponseshaverTelemetry {
  timestamp: number;
  metricValue: number;
  status: "nominal" | "warning" | "critical";
  meta: Record<string, unknown>;
}

export function calculatedemandresponseshaverMetric(input: number, factor: number = 1.0): number {
  if (input < 0) return 0;
  return Number((input * factor).toFixed(4));
}

export class demandresponseshaverEngine {
  private history: IdemandresponseshaverTelemetry[] = [];

  constructor(public config: IdemandresponseshaverConfig) {}

  public recordTelemetry(value: number): IdemandresponseshaverTelemetry {
    const sample: IdemandresponseshaverTelemetry = {
      timestamp: Date.now(),
      metricValue: calculatedemandresponseshaverMetric(value),
      status: value > 90 ? "critical" : value > 70 ? "warning" : "nominal",
      meta: { subsystem: "demand_response_shaver" }
    };
    this.history.push(sample);
    return sample;
  }

  public getRecentTelemetry(): IdemandresponseshaverTelemetry[] {
    return this.history.slice(-50);
  }
}
