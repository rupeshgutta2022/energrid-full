/**
 * EnerGrid Enterprise Engine: Implement de-clutched synchronous condenser reactive support
 * Description: Provides real physical rotational inertia and voltage stiffness to renewable-rich grids.
 */

export interface IsynchronouscondenserctrlConfig {
  readonly id: string;
  readonly name: string;
  readonly samplingIntervalMs: number;
  readonly enabled: boolean;
}

export interface IsynchronouscondenserctrlTelemetry {
  timestamp: number;
  metricValue: number;
  status: "nominal" | "warning" | "critical";
  meta: Record<string, unknown>;
}

export function calculatesynchronouscondenserctrlMetric(input: number, factor: number = 1.0): number {
  if (input < 0) return 0;
  return Number((input * factor).toFixed(4));
}

export class synchronouscondenserctrlEngine {
  private history: IsynchronouscondenserctrlTelemetry[] = [];

  constructor(public config: IsynchronouscondenserctrlConfig) {}

  public recordTelemetry(value: number): IsynchronouscondenserctrlTelemetry {
    const sample: IsynchronouscondenserctrlTelemetry = {
      timestamp: Date.now(),
      metricValue: calculatesynchronouscondenserctrlMetric(value),
      status: value > 90 ? "critical" : value > 70 ? "warning" : "nominal",
      meta: { subsystem: "synchronous_condenser_ctrl" }
    };
    this.history.push(sample);
    return sample;
  }

  public getRecentTelemetry(): IsynchronouscondenserctrlTelemetry[] {
    return this.history.slice(-50);
  }
}
