export interface ReturnsRecord {
  id: string;
  tenantId: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  metadata: Record<string, unknown>;
}

export type ReturnsState = "draft" | "active" | "paused" | "completed" | "cancelled";

export interface ReturnsFilter {
  tenantId?: string;
  status?: ReturnsState;
  search?: string;
  page?: number;
  pageSize?: number;
}

export const returnsDefaults = {
  page: 1,
  pageSize: 25,
  maxPageSize: 250,
  sortBy: "updatedAt",
  sortDirection: "desc" as const,
};

export const returns_93_0_definition = {
  domain: "returns",
  sequence: 93,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const returns_93_1_definition = {
  domain: "returns",
  sequence: 94,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const returns_93_2_definition = {
  domain: "returns",
  sequence: 95,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const returns_93_3_definition = {
  domain: "returns",
  sequence: 96,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const returns_93_4_definition = {
  domain: "returns",
  sequence: 97,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const returns_93_5_definition = {
  domain: "returns",
  sequence: 98,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const returns_93_6_definition = {
  domain: "returns",
  sequence: 99,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const returns_93_7_definition = {
  domain: "returns",
  sequence: 100,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};
