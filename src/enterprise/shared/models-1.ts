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

export const shared_1_0_definition = {
  domain: "shared",
  sequence: 1,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const shared_1_1_definition = {
  domain: "shared",
  sequence: 2,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const shared_1_2_definition = {
  domain: "shared",
  sequence: 3,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const shared_1_3_definition = {
  domain: "shared",
  sequence: 4,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const shared_1_4_definition = {
  domain: "shared",
  sequence: 5,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const shared_1_5_definition = {
  domain: "shared",
  sequence: 6,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const shared_1_6_definition = {
  domain: "shared",
  sequence: 7,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const shared_1_7_definition = {
  domain: "shared",
  sequence: 8,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};
