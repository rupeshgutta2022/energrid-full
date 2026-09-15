/**
 * EnerGrid Enterprise Engine: Capture pre-fault and post-fault digital oscillography
 * Description: Preserves millisecond-accurate electrical waveforms during transmission fault events.
 */

export interface IdigitalfaultrecorderConfig {
  readonly id: string;
  readonly name: string;
  readonly samplingIntervalMs: number;
  readonly enabled: boolean;
}

export interface IdigitalfaultrecorderTelemetry {
  timestamp: number;
  metricValue: number;
  status: "nominal" | "warning" | "critical";
  meta: Record<string, unknown>;
}

export function calculatedigitalfaultrecorderMetric(input: number, factor: number = 1.0): number {
  if (input < 0) return 0;
  return Number((input * factor).toFixed(4));
}

export class digitalfaultrecorderEngine {
  private history: IdigitalfaultrecorderTelemetry[] = [];

  constructor(public config: IdigitalfaultrecorderConfig) {}

  public recordTelemetry(value: number): IdigitalfaultrecorderTelemetry {
    const sample: IdigitalfaultrecorderTelemetry = {
      timestamp: Date.now(),
      metricValue: calculatedigitalfaultrecorderMetric(value),
      status: value > 90 ? "critical" : value > 70 ? "warning" : "nominal",
      meta: { subsystem: "digital_fault_recorder" }
    };
    this.history.push(sample);
    return sample;
  }

  public getRecentTelemetry(): IdigitalfaultrecorderTelemetry[] {
    return this.history.slice(-50);
  }
}
