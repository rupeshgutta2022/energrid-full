/**
 * EnerGrid Enterprise Engine: Implement open cycle gas turbine heat rate efficiency calculator
 * Description: Measures fuel heat input per kilowatt-hour generated under variable ambient conditions.
 */

export interface IgasturbineheatrateConfig {
  readonly id: string;
  readonly name: string;
  readonly samplingIntervalMs: number;
  readonly enabled: boolean;
}

export interface IgasturbineheatrateTelemetry {
  timestamp: number;
  metricValue: number;
  status: "nominal" | "warning" | "critical";
  meta: Record<string, unknown>;
}

export function calculategasturbineheatrateMetric(input: number, factor: number = 1.0): number {
  if (input < 0) return 0;
  return Number((input * factor).toFixed(4));
}

export class gasturbineheatrateEngine {
  private history: IgasturbineheatrateTelemetry[] = [];

  constructor(public config: IgasturbineheatrateConfig) {}

  public recordTelemetry(value: number): IgasturbineheatrateTelemetry {
    const sample: IgasturbineheatrateTelemetry = {
      timestamp: Date.now(),
      metricValue: calculategasturbineheatrateMetric(value),
      status: value > 90 ? "critical" : value > 70 ? "warning" : "nominal",
      meta: { subsystem: "gas_turbine_heat_rate" }
    };
    this.history.push(sample);
    return sample;
  }

  public getRecentTelemetry(): IgasturbineheatrateTelemetry[] {
    return this.history.slice(-50);
  }
}
