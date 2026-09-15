export interface DriversRecord {
  id: string;
  tenantId: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  metadata: Record<string, unknown>;
}

export type DriversState = "draft" | "active" | "paused" | "completed" | "cancelled";

export interface DriversFilter {
  tenantId?: string;
  status?: DriversState;
  search?: string;
  page?: number;
  pageSize?: number;
}

export const driversDefaults = {
  page: 1,
  pageSize: 25,
  maxPageSize: 250,
  sortBy: "updatedAt",
  sortDirection: "desc" as const,
};

export const drivers_149_0_definition = {
  domain: "drivers",
  sequence: 149,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const drivers_149_1_definition = {
  domain: "drivers",
  sequence: 150,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const drivers_149_2_definition = {
  domain: "drivers",
  sequence: 151,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const drivers_149_3_definition = {
  domain: "drivers",
  sequence: 152,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const drivers_149_4_definition = {
  domain: "drivers",
  sequence: 153,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const drivers_149_5_definition = {
  domain: "drivers",
  sequence: 154,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const drivers_149_6_definition = {
  domain: "drivers",
  sequence: 155,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const drivers_149_7_definition = {
  domain: "drivers",
  sequence: 156,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};
