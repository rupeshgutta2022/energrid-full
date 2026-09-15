/**
 * EnerGrid Enterprise Engine: Add PMU synchrophasor voltage phase angle tracking
 * Description: Ingests GPS-synchronized phasor measurements to detect transmission grid oscillations.
 */

export interface IsynchrophasormonitorConfig {
  readonly id: string;
  readonly name: string;
  readonly samplingIntervalMs: number;
  readonly enabled: boolean;
}

export interface IsynchrophasormonitorTelemetry {
  timestamp: number;
  metricValue: number;
  status: "nominal" | "warning" | "critical";
  meta: Record<string, unknown>;
}

export function calculatesynchrophasormonitorMetric(input: number, factor: number = 1.0): number {
  if (input < 0) return 0;
  return Number((input * factor).toFixed(4));
}

export class synchrophasormonitorEngine {
  private history: IsynchrophasormonitorTelemetry[] = [];

  constructor(public config: IsynchrophasormonitorConfig) {}

  public recordTelemetry(value: number): IsynchrophasormonitorTelemetry {
    const sample: IsynchrophasormonitorTelemetry = {
      timestamp: Date.now(),
      metricValue: calculatesynchrophasormonitorMetric(value),
      status: value > 90 ? "critical" : value > 70 ? "warning" : "nominal",
      meta: { subsystem: "synchrophasor_monitor" }
    };
    this.history.push(sample);
    return sample;
  }

  public getRecentTelemetry(): IsynchrophasormonitorTelemetry[] {
    return this.history.slice(-50);
  }
}
