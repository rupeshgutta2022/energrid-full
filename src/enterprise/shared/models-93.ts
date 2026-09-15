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

export const shared_93_0_definition = {
  domain: "shared",
  sequence: 93,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const shared_93_1_definition = {
  domain: "shared",
  sequence: 94,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const shared_93_2_definition = {
  domain: "shared",
  sequence: 95,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const shared_93_3_definition = {
  domain: "shared",
  sequence: 96,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const shared_93_4_definition = {
  domain: "shared",
  sequence: 97,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const shared_93_5_definition = {
  domain: "shared",
  sequence: 98,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const shared_93_6_definition = {
  domain: "shared",
  sequence: 99,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const shared_93_7_definition = {
  domain: "shared",
  sequence: 100,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};
