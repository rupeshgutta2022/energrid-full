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

export const drivers_157_0_definition = {
  domain: "drivers",
  sequence: 157,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const drivers_157_1_definition = {
  domain: "drivers",
  sequence: 158,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const drivers_157_2_definition = {
  domain: "drivers",
  sequence: 159,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const drivers_157_3_definition = {
  domain: "drivers",
  sequence: 160,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const drivers_157_4_definition = {
  domain: "drivers",
  sequence: 161,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};
