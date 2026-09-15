/**
 * EnerGrid Enterprise Engine: Process substation optical fence and motion sensor telemetry
 * Description: Detects physical perimeter breaches and vandalism attempts at electrical substations.
 */

export interface IsubstationsecuritysensorConfig {
  readonly id: string;
  readonly name: string;
  readonly samplingIntervalMs: number;
  readonly enabled: boolean;
}

export interface IsubstationsecuritysensorTelemetry {
  timestamp: number;
  metricValue: number;
  status: "nominal" | "warning" | "critical";
  meta: Record<string, unknown>;
}

export function calculatesubstationsecuritysensorMetric(input: number, factor: number = 1.0): number {
  if (input < 0) return 0;
  return Number((input * factor).toFixed(4));
}

export class substationsecuritysensorEngine {
  private history: IsubstationsecuritysensorTelemetry[] = [];

  constructor(public config: IsubstationsecuritysensorConfig) {}

  public recordTelemetry(value: number): IsubstationsecuritysensorTelemetry {
    const sample: IsubstationsecuritysensorTelemetry = {
      timestamp: Date.now(),
      metricValue: calculatesubstationsecuritysensorMetric(value),
      status: value > 90 ? "critical" : value > 70 ? "warning" : "nominal",
      meta: { subsystem: "substation_security_sensor" }
    };
    this.history.push(sample);
    return sample;
  }

  public getRecentTelemetry(): IsubstationsecuritysensorTelemetry[] {
    return this.history.slice(-50);
  }
}
