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

export const logistics_core_173_0_definition = {
  domain: "logistics-core",
  sequence: 173,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const logistics_core_173_1_definition = {
  domain: "logistics-core",
  sequence: 174,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const logistics_core_173_2_definition = {
  domain: "logistics-core",
  sequence: 175,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const logistics_core_173_3_definition = {
  domain: "logistics-core",
  sequence: 176,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const logistics_core_173_4_definition = {
  domain: "logistics-core",
  sequence: 177,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const logistics_core_173_5_definition = {
  domain: "logistics-core",
  sequence: 178,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const logistics_core_173_6_definition = {
  domain: "logistics-core",
  sequence: 179,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const logistics_core_173_7_definition = {
  domain: "logistics-core",
  sequence: 180,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};
