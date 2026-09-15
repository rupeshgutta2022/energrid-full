/**
 * EnerGrid Enterprise Engine: Monitor distribution substation neutral grounding resistor current
 * Description: Protects distribution equipment from damaging phase-to-ground fault overcurrent.
 */

export interface IneutralgroundingmonitorConfig {
  readonly id: string;
  readonly name: string;
  readonly samplingIntervalMs: number;
  readonly enabled: boolean;
}

export interface IneutralgroundingmonitorTelemetry {
  timestamp: number;
  metricValue: number;
  status: "nominal" | "warning" | "critical";
  meta: Record<string, unknown>;
}

export function calculateneutralgroundingmonitorMetric(input: number, factor: number = 1.0): number {
  if (input < 0) return 0;
  return Number((input * factor).toFixed(4));
}

export class neutralgroundingmonitorEngine {
  private history: IneutralgroundingmonitorTelemetry[] = [];

  constructor(public config: IneutralgroundingmonitorConfig) {}

  public recordTelemetry(value: number): IneutralgroundingmonitorTelemetry {
    const sample: IneutralgroundingmonitorTelemetry = {
      timestamp: Date.now(),
      metricValue: calculateneutralgroundingmonitorMetric(value),
      status: value > 90 ? "critical" : value > 70 ? "warning" : "nominal",
      meta: { subsystem: "neutral_grounding_monitor" }
    };
    this.history.push(sample);
    return sample;
  }

  public getRecentTelemetry(): IneutralgroundingmonitorTelemetry[] {
    return this.history.slice(-50);
  }
}
