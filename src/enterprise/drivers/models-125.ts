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

export const drivers_125_0_definition = {
  domain: "drivers",
  sequence: 125,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const drivers_125_1_definition = {
  domain: "drivers",
  sequence: 126,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const drivers_125_2_definition = {
  domain: "drivers",
  sequence: 127,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const drivers_125_3_definition = {
  domain: "drivers",
  sequence: 128,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const drivers_125_4_definition = {
  domain: "drivers",
  sequence: 129,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const drivers_125_5_definition = {
  domain: "drivers",
  sequence: 130,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const drivers_125_6_definition = {
  domain: "drivers",
  sequence: 131,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const drivers_125_7_definition = {
  domain: "drivers",
  sequence: 132,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};
