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

export const shared_189_0_definition = {
  domain: "shared",
  sequence: 189,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const shared_189_1_definition = {
  domain: "shared",
  sequence: 190,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const shared_189_2_definition = {
  domain: "shared",
  sequence: 191,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const shared_189_3_definition = {
  domain: "shared",
  sequence: 192,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const shared_189_4_definition = {
  domain: "shared",
  sequence: 193,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const shared_189_5_definition = {
  domain: "shared",
  sequence: 194,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const shared_189_6_definition = {
  domain: "shared",
  sequence: 195,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};
