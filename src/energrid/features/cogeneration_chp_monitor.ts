/**
 * EnerGrid Enterprise Engine: Calculate combined heat and power thermal utilization efficiency
 * Description: Tracks electrical and useful thermal output in cogeneration power facilities.
 */

export interface IcogenerationchpmonitorConfig {
  readonly id: string;
  readonly name: string;
  readonly samplingIntervalMs: number;
  readonly enabled: boolean;
}

export interface IcogenerationchpmonitorTelemetry {
  timestamp: number;
  metricValue: number;
  status: "nominal" | "warning" | "critical";
  meta: Record<string, unknown>;
}

export function calculatecogenerationchpmonitorMetric(input: number, factor: number = 1.0): number {
  if (input < 0) return 0;
  return Number((input * factor).toFixed(4));
}

export class cogenerationchpmonitorEngine {
  private history: IcogenerationchpmonitorTelemetry[] = [];

  constructor(public config: IcogenerationchpmonitorConfig) {}

  public recordTelemetry(value: number): IcogenerationchpmonitorTelemetry {
    const sample: IcogenerationchpmonitorTelemetry = {
      timestamp: Date.now(),
      metricValue: calculatecogenerationchpmonitorMetric(value),
      status: value > 90 ? "critical" : value > 70 ? "warning" : "nominal",
      meta: { subsystem: "cogeneration_chp_monitor" }
    };
    this.history.push(sample);
    return sample;
  }

  public getRecentTelemetry(): IcogenerationchpmonitorTelemetry[] {
    return this.history.slice(-50);
  }
}
