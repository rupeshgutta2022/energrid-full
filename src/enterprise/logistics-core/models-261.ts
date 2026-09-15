export interface LogisticsCoreRecord {
  id: string;
  tenantId: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  metadata: Record<string, unknown>;
}

export type LogisticsCoreState = "draft" | "active" | "paused" | "completed" | "cancelled";

export interface LogisticsCoreFilter {
  tenantId?: string;
  status?: LogisticsCoreState;
  search?: string;
  page?: number;
  pageSize?: number;
}

export const logistics-coreDefaults = {
  page: 1,
  pageSize: 25,
  maxPageSize: 250,
  sortBy: "updatedAt",
  sortDirection: "desc" as const,
};

export const logistics_core_261_0_definition = {
  domain: "logistics-core",
  sequence: 261,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const logistics_core_261_1_definition = {
  domain: "logistics-core",
  sequence: 262,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const logistics_core_261_2_definition = {
  domain: "logistics-core",
  sequence: 263,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const logistics_core_261_3_definition = {
  domain: "logistics-core",
  sequence: 264,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const logistics_core_261_4_definition = {
  domain: "logistics-core",
  sequence: 265,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const logistics_core_261_5_definition = {
  domain: "logistics-core",
  sequence: 266,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const logistics_core_261_6_definition = {
  domain: "logistics-core",
  sequence: 267,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const logistics_core_261_7_definition = {
  domain: "logistics-core",
  sequence: 268,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};
