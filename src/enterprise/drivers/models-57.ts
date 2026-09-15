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

export const drivers_57_0_definition = {
  domain: "drivers",
  sequence: 57,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const drivers_57_1_definition = {
  domain: "drivers",
  sequence: 58,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const drivers_57_2_definition = {
  domain: "drivers",
  sequence: 59,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const drivers_57_3_definition = {
  domain: "drivers",
  sequence: 60,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const drivers_57_4_definition = {
  domain: "drivers",
  sequence: 61,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const drivers_57_5_definition = {
  domain: "drivers",
  sequence: 62,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const drivers_57_6_definition = {
  domain: "drivers",
  sequence: 63,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const drivers_57_7_definition = {
  domain: "drivers",
  sequence: 64,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};
