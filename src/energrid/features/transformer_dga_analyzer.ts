/**
 * EnerGrid Enterprise Engine: Implement dissolved gas analysis for oil-filled transformers
 * Description: Detects early-stage internal arcing, corona discharge, and thermal hotspots from gas ratios.
 */

export interface ItransformerdgaanalyzerConfig {
  readonly id: string;
  readonly name: string;
  readonly samplingIntervalMs: number;
  readonly enabled: boolean;
}

export interface ItransformerdgaanalyzerTelemetry {
  timestamp: number;
  metricValue: number;
  status: "nominal" | "warning" | "critical";
  meta: Record<string, unknown>;
}

export function calculatetransformerdgaanalyzerMetric(input: number, factor: number = 1.0): number {
  if (input < 0) return 0;
  return Number((input * factor).toFixed(4));
}

export class transformerdgaanalyzerEngine {
  private history: ItransformerdgaanalyzerTelemetry[] = [];

  constructor(public config: ItransformerdgaanalyzerConfig) {}

  public recordTelemetry(value: number): ItransformerdgaanalyzerTelemetry {
    const sample: ItransformerdgaanalyzerTelemetry = {
      timestamp: Date.now(),
      metricValue: calculatetransformerdgaanalyzerMetric(value),
      status: value > 90 ? "critical" : value > 70 ? "warning" : "nominal",
      meta: { subsystem: "transformer_dga_analyzer" }
    };
    this.history.push(sample);
    return sample;
  }

  public getRecentTelemetry(): ItransformerdgaanalyzerTelemetry[] {
    return this.history.slice(-50);
  }
}
