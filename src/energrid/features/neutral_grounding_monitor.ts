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
