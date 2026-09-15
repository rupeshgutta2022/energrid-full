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
