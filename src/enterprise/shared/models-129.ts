export interface SharedRecord {
  id: string;
  tenantId: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  metadata: Record<string, unknown>;
}

export type SharedState = "draft" | "active" | "paused" | "completed" | "cancelled";

export interface SharedFilter {
  tenantId?: string;
  status?: SharedState;
  search?: string;
  page?: number;
  pageSize?: number;
}

export const sharedDefaults = {
  page: 1,
  pageSize: 25,
  maxPageSize: 250,
  sortBy: "updatedAt",
  sortDirection: "desc" as const,
};

export const shared_129_0_definition = {
  domain: "shared",
  sequence: 129,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const shared_129_1_definition = {
  domain: "shared",
  sequence: 130,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const shared_129_2_definition = {
  domain: "shared",
  sequence: 131,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const shared_129_3_definition = {
  domain: "shared",
  sequence: 132,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const shared_129_4_definition = {
  domain: "shared",
  sequence: 133,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const shared_129_5_definition = {
  domain: "shared",
  sequence: 134,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const shared_129_6_definition = {
  domain: "shared",
  sequence: 135,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const shared_129_7_definition = {
  domain: "shared",
  sequence: 136,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};
