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

export const drivers_165_0_definition = {
  domain: "drivers",
  sequence: 165,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const drivers_165_1_definition = {
  domain: "drivers",
  sequence: 166,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};
