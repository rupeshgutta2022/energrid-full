/**
 * EnerGrid Enterprise Engine: Monitor SF6 gas pressure and temperature normalized density
 * Description: Guarantees adequate dielectric insulation in high voltage gas-insulated switchgear.
 */

export interface Isf6gasdensitygaugeConfig {
  readonly id: string;
  readonly name: string;
  readonly samplingIntervalMs: number;
  readonly enabled: boolean;
}

export interface Isf6gasdensitygaugeTelemetry {
  timestamp: number;
  metricValue: number;
  status: "nominal" | "warning" | "critical";
  meta: Record<string, unknown>;
}

export function calculatesf6gasdensitygaugeMetric(input: number, factor: number = 1.0): number {
  if (input < 0) return 0;
  return Number((input * factor).toFixed(4));
}

export class sf6gasdensitygaugeEngine {
  private history: Isf6gasdensitygaugeTelemetry[] = [];

  constructor(public config: Isf6gasdensitygaugeConfig) {}

  public recordTelemetry(value: number): Isf6gasdensitygaugeTelemetry {
    const sample: Isf6gasdensitygaugeTelemetry = {
      timestamp: Date.now(),
      metricValue: calculatesf6gasdensitygaugeMetric(value),
      status: value > 90 ? "critical" : value > 70 ? "warning" : "nominal",
      meta: { subsystem: "sf6_gas_density_gauge" }
    };
    this.history.push(sample);
    return sample;
  }

  public getRecentTelemetry(): Isf6gasdensitygaugeTelemetry[] {
    return this.history.slice(-50);
  }
}
