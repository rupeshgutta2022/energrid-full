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

export const shared_89_0_definition = {
  domain: "shared",
  sequence: 89,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const shared_89_1_definition = {
  domain: "shared",
  sequence: 90,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const shared_89_2_definition = {
  domain: "shared",
  sequence: 91,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const shared_89_3_definition = {
  domain: "shared",
  sequence: 92,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const shared_89_4_definition = {
  domain: "shared",
  sequence: 93,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const shared_89_5_definition = {
  domain: "shared",
  sequence: 94,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const shared_89_6_definition = {
  domain: "shared",
  sequence: 95,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const shared_89_7_definition = {
  domain: "shared",
  sequence: 96,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};
