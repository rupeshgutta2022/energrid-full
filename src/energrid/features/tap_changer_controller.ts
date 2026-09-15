/**
 * EnerGrid Enterprise Engine: Implement on-load tap changer automatic voltage regulation
 * Description: Maintains stable secondary distribution voltage under varying substation loads.
 */

export interface ItapchangercontrollerConfig {
  readonly id: string;
  readonly name: string;
  readonly samplingIntervalMs: number;
  readonly enabled: boolean;
}

export interface ItapchangercontrollerTelemetry {
  timestamp: number;
  metricValue: number;
  status: "nominal" | "warning" | "critical";
  meta: Record<string, unknown>;
}

export function calculatetapchangercontrollerMetric(input: number, factor: number = 1.0): number {
  if (input < 0) return 0;
  return Number((input * factor).toFixed(4));
}

export class tapchangercontrollerEngine {
  private history: ItapchangercontrollerTelemetry[] = [];

  constructor(public config: ItapchangercontrollerConfig) {}

  public recordTelemetry(value: number): ItapchangercontrollerTelemetry {
    const sample: ItapchangercontrollerTelemetry = {
      timestamp: Date.now(),
      metricValue: calculatetapchangercontrollerMetric(value),
      status: value > 90 ? "critical" : value > 70 ? "warning" : "nominal",
      meta: { subsystem: "tap_changer_controller" }
    };
    this.history.push(sample);
    return sample;
  }

  public getRecentTelemetry(): ItapchangercontrollerTelemetry[] {
    return this.history.slice(-50);
  }
}
