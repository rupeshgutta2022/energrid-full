/**
 * EnerGrid Enterprise Engine: Track parasitic auxiliary power consumption in generation plants
 * Description: Measures pumps, fans, and cooling towers power consumption within power plants.
 */

export interface IauxiliaryconsumptiontrackerConfig {
  readonly id: string;
  readonly name: string;
  readonly samplingIntervalMs: number;
  readonly enabled: boolean;
}

export interface IauxiliaryconsumptiontrackerTelemetry {
  timestamp: number;
  metricValue: number;
  status: "nominal" | "warning" | "critical";
  meta: Record<string, unknown>;
}

export function calculateauxiliaryconsumptiontrackerMetric(input: number, factor: number = 1.0): number {
  if (input < 0) return 0;
  return Number((input * factor).toFixed(4));
}

export class auxiliaryconsumptiontrackerEngine {
  private history: IauxiliaryconsumptiontrackerTelemetry[] = [];

  constructor(public config: IauxiliaryconsumptiontrackerConfig) {}

  public recordTelemetry(value: number): IauxiliaryconsumptiontrackerTelemetry {
    const sample: IauxiliaryconsumptiontrackerTelemetry = {
      timestamp: Date.now(),
      metricValue: calculateauxiliaryconsumptiontrackerMetric(value),
      status: value > 90 ? "critical" : value > 70 ? "warning" : "nominal",
      meta: { subsystem: "auxiliary_consumption_tracker" }
    };
    this.history.push(sample);
    return sample;
  }

  public getRecentTelemetry(): IauxiliaryconsumptiontrackerTelemetry[] {
    return this.history.slice(-50);
  }
}
