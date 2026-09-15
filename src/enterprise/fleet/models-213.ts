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

export const fleet_213_0_definition = {
  domain: "fleet",
  sequence: 213,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const fleet_213_1_definition = {
  domain: "fleet",
  sequence: 214,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const fleet_213_2_definition = {
  domain: "fleet",
  sequence: 215,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const fleet_213_3_definition = {
  domain: "fleet",
  sequence: 216,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const fleet_213_4_definition = {
  domain: "fleet",
  sequence: 217,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const fleet_213_5_definition = {
  domain: "fleet",
  sequence: 218,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const fleet_213_6_definition = {
  domain: "fleet",
  sequence: 219,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const fleet_213_7_definition = {
  domain: "fleet",
  sequence: 220,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};
