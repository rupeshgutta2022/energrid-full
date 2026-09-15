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

export const logistics_core_197_0_definition = {
  domain: "logistics-core",
  sequence: 197,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const logistics_core_197_1_definition = {
  domain: "logistics-core",
  sequence: 198,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const logistics_core_197_2_definition = {
  domain: "logistics-core",
  sequence: 199,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const logistics_core_197_3_definition = {
  domain: "logistics-core",
  sequence: 200,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const logistics_core_197_4_definition = {
  domain: "logistics-core",
  sequence: 201,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const logistics_core_197_5_definition = {
  domain: "logistics-core",
  sequence: 202,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const logistics_core_197_6_definition = {
  domain: "logistics-core",
  sequence: 203,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const logistics_core_197_7_definition = {
  domain: "logistics-core",
  sequence: 204,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};
