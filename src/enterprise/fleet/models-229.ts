export interface FleetRecord {
  id: string;
  tenantId: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  metadata: Record<string, unknown>;
}

export type FleetState = "draft" | "active" | "paused" | "completed" | "cancelled";

export interface FleetFilter {
  tenantId?: string;
  status?: FleetState;
  search?: string;
  page?: number;
  pageSize?: number;
}

export const fleetDefaults = {
  page: 1,
  pageSize: 25,
  maxPageSize: 250,
  sortBy: "updatedAt",
  sortDirection: "desc" as const,
};

export const fleet_229_0_definition = {
  domain: "fleet",
  sequence: 229,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const fleet_229_1_definition = {
  domain: "fleet",
  sequence: 230,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const fleet_229_2_definition = {
  domain: "fleet",
  sequence: 231,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const fleet_229_3_definition = {
  domain: "fleet",
  sequence: 232,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const fleet_229_4_definition = {
  domain: "fleet",
  sequence: 233,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};
