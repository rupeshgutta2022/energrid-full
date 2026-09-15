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

export const fleet_57_0_definition = {
  domain: "fleet",
  sequence: 57,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const fleet_57_1_definition = {
  domain: "fleet",
  sequence: 58,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const fleet_57_2_definition = {
  domain: "fleet",
  sequence: 59,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const fleet_57_3_definition = {
  domain: "fleet",
  sequence: 60,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const fleet_57_4_definition = {
  domain: "fleet",
  sequence: 61,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const fleet_57_5_definition = {
  domain: "fleet",
  sequence: 62,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const fleet_57_6_definition = {
  domain: "fleet",
  sequence: 63,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const fleet_57_7_definition = {
  domain: "fleet",
  sequence: 64,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};
