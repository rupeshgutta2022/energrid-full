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

export const logistics_core_165_0_definition = {
  domain: "logistics-core",
  sequence: 165,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const logistics_core_165_1_definition = {
  domain: "logistics-core",
  sequence: 166,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const logistics_core_165_2_definition = {
  domain: "logistics-core",
  sequence: 167,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const logistics_core_165_3_definition = {
  domain: "logistics-core",
  sequence: 168,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const logistics_core_165_4_definition = {
  domain: "logistics-core",
  sequence: 169,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const logistics_core_165_5_definition = {
  domain: "logistics-core",
  sequence: 170,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const logistics_core_165_6_definition = {
  domain: "logistics-core",
  sequence: 171,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const logistics_core_165_7_definition = {
  domain: "logistics-core",
  sequence: 172,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};
