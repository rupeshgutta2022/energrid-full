/**
 * EnerGrid Enterprise Engine: Add SCADA remote terminal unit telemetry ingestion parser
 * Description: Ingests IEC 60870 and DNP3 telemetry packets from field distribution assets.
 */

export interface IscadatelemetryingestConfig {
  readonly id: string;
  readonly name: string;
  readonly samplingIntervalMs: number;
  readonly enabled: boolean;
}

export interface IscadatelemetryingestTelemetry {
  timestamp: number;
  metricValue: number;
  status: "nominal" | "warning" | "critical";
  meta: Record<string, unknown>;
}

export function calculatescadatelemetryingestMetric(input: number, factor: number = 1.0): number {
  if (input < 0) return 0;
  return Number((input * factor).toFixed(4));
}
