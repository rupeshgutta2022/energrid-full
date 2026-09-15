/**
 * EnerGrid Enterprise Engine: Implement distributed energy resource capacity aggregator
 * Description: Bundles distributed solar, batteries, and flexible loads into dispatchable wholesale power.
 */

export interface IvppaggregatorConfig {
  readonly id: string;
  readonly name: string;
  readonly samplingIntervalMs: number;
  readonly enabled: boolean;
}

export interface IvppaggregatorTelemetry {
  timestamp: number;
  metricValue: number;
  status: "nominal" | "warning" | "critical";
  meta: Record<string, unknown>;
}

export function calculatevppaggregatorMetric(input: number, factor: number = 1.0): number {
  if (input < 0) return 0;
  return Number((input * factor).toFixed(4));
}

export class vppaggregatorEngine {
  private history: IvppaggregatorTelemetry[] = [];

  constructor(public config: IvppaggregatorConfig) {}

  public recordTelemetry(value: number): IvppaggregatorTelemetry {
    const sample: IvppaggregatorTelemetry = {
      timestamp: Date.now(),
      metricValue: calculatevppaggregatorMetric(value),
      status: value > 90 ? "critical" : value > 70 ? "warning" : "nominal",
      meta: { subsystem: "vpp_aggregator" }
    };
    this.history.push(sample);
    return sample;
  }

  public getRecentTelemetry(): IvppaggregatorTelemetry[] {
    return this.history.slice(-50);
  }
}
