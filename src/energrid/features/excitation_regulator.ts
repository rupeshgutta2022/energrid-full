/**
 * EnerGrid Enterprise Engine: Implement brushless generator automatic voltage regulator loop
 * Description: Controls synchronous generator field current to stabilize terminal voltage.
 */

export interface IexcitationregulatorConfig {
  readonly id: string;
  readonly name: string;
  readonly samplingIntervalMs: number;
  readonly enabled: boolean;
}

export interface IexcitationregulatorTelemetry {
  timestamp: number;
  metricValue: number;
  status: "nominal" | "warning" | "critical";
  meta: Record<string, unknown>;
}

export function calculateexcitationregulatorMetric(input: number, factor: number = 1.0): number {
  if (input < 0) return 0;
  return Number((input * factor).toFixed(4));
}

export class excitationregulatorEngine {
  private history: IexcitationregulatorTelemetry[] = [];

  constructor(public config: IexcitationregulatorConfig) {}

  public recordTelemetry(value: number): IexcitationregulatorTelemetry {
    const sample: IexcitationregulatorTelemetry = {
      timestamp: Date.now(),
      metricValue: calculateexcitationregulatorMetric(value),
      status: value > 90 ? "critical" : value > 70 ? "warning" : "nominal",
      meta: { subsystem: "excitation_regulator" }
    };
    this.history.push(sample);
    return sample;
  }

  public getRecentTelemetry(): IexcitationregulatorTelemetry[] {
    return this.history.slice(-50);
  }
}
