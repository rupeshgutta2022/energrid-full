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

export const logistics_core_241_0_definition = {
  domain: "logistics-core",
  sequence: 241,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const logistics_core_241_1_definition = {
  domain: "logistics-core",
  sequence: 242,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const logistics_core_241_2_definition = {
  domain: "logistics-core",
  sequence: 243,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const logistics_core_241_3_definition = {
  domain: "logistics-core",
  sequence: 244,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const logistics_core_241_4_definition = {
  domain: "logistics-core",
  sequence: 245,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const logistics_core_241_5_definition = {
  domain: "logistics-core",
  sequence: 246,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const logistics_core_241_6_definition = {
  domain: "logistics-core",
  sequence: 247,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const logistics_core_241_7_definition = {
  domain: "logistics-core",
  sequence: 248,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};
