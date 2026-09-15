/**
 * EnerGrid Enterprise Engine: Add substation transformer thermal load tracking
 * Description: Monitors winding and oil temperatures to prevent transformer insulation breakdown.
 */

export interface IsubstationthermalmonitorConfig {
  readonly id: string;
  readonly name: string;
  readonly samplingIntervalMs: number;
  readonly enabled: boolean;
}

export interface IsubstationthermalmonitorTelemetry {
  timestamp: number;
  metricValue: number;
  status: "nominal" | "warning" | "critical";
  meta: Record<string, unknown>;
}

export function calculatesubstationthermalmonitorMetric(input: number, factor: number = 1.0): number {
  if (input < 0) return 0;
  return Number((input * factor).toFixed(4));
}

export class substationthermalmonitorEngine {
  private history: IsubstationthermalmonitorTelemetry[] = [];

  constructor(public config: IsubstationthermalmonitorConfig) {}

  public recordTelemetry(value: number): IsubstationthermalmonitorTelemetry {
    const sample: IsubstationthermalmonitorTelemetry = {
      timestamp: Date.now(),
      metricValue: calculatesubstationthermalmonitorMetric(value),
      status: value > 90 ? "critical" : value > 70 ? "warning" : "nominal",
      meta: { subsystem: "substation_thermal_monitor" }
    };
    this.history.push(sample);
    return sample;
  }

  public getRecentTelemetry(): IsubstationthermalmonitorTelemetry[] {
    return this.history.slice(-50);
  }
}
