/**
 * EnerGrid Enterprise Engine: Model compressed air cavern adiabatic storage cycle
 * Description: Tracks air mass balance and compression efficiency in geological salt caverns.
 */

export interface IcaesstoragemodConfig {
  readonly id: string;
  readonly name: string;
  readonly samplingIntervalMs: number;
  readonly enabled: boolean;
}

export interface IcaesstoragemodTelemetry {
  timestamp: number;
  metricValue: number;
  status: "nominal" | "warning" | "critical";
  meta: Record<string, unknown>;
}

export function calculatecaesstoragemodMetric(input: number, factor: number = 1.0): number {
  if (input < 0) return 0;
  return Number((input * factor).toFixed(4));
}

export class caesstoragemodEngine {
  private history: IcaesstoragemodTelemetry[] = [];

  constructor(public config: IcaesstoragemodConfig) {}

  public recordTelemetry(value: number): IcaesstoragemodTelemetry {
    const sample: IcaesstoragemodTelemetry = {
      timestamp: Date.now(),
      metricValue: calculatecaesstoragemodMetric(value),
      status: value > 90 ? "critical" : value > 70 ? "warning" : "nominal",
      meta: { subsystem: "caes_storage_mod" }
    };
    this.history.push(sample);
    return sample;
  }

  public getRecentTelemetry(): IcaesstoragemodTelemetry[] {
    return this.history.slice(-50);
  }
}
