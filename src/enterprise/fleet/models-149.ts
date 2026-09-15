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

export const fleet_149_0_definition = {
  domain: "fleet",
  sequence: 149,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const fleet_149_1_definition = {
  domain: "fleet",
  sequence: 150,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const fleet_149_2_definition = {
  domain: "fleet",
  sequence: 151,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const fleet_149_3_definition = {
  domain: "fleet",
  sequence: 152,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const fleet_149_4_definition = {
  domain: "fleet",
  sequence: 153,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const fleet_149_5_definition = {
  domain: "fleet",
  sequence: 154,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const fleet_149_6_definition = {
  domain: "fleet",
  sequence: 155,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const fleet_149_7_definition = {
  domain: "fleet",
  sequence: 156,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};
