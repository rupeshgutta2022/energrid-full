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

export const fleet_205_0_definition = {
  domain: "fleet",
  sequence: 205,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const fleet_205_1_definition = {
  domain: "fleet",
  sequence: 206,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const fleet_205_2_definition = {
  domain: "fleet",
  sequence: 207,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const fleet_205_3_definition = {
  domain: "fleet",
  sequence: 208,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const fleet_205_4_definition = {
  domain: "fleet",
  sequence: 209,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const fleet_205_5_definition = {
  domain: "fleet",
  sequence: 210,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const fleet_205_6_definition = {
  domain: "fleet",
  sequence: 211,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const fleet_205_7_definition = {
  domain: "fleet",
  sequence: 212,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};
