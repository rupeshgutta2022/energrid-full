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

export const returns_13_0_definition = {
  domain: "returns",
  sequence: 13,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const returns_13_1_definition = {
  domain: "returns",
  sequence: 14,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const returns_13_2_definition = {
  domain: "returns",
  sequence: 15,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const returns_13_3_definition = {
  domain: "returns",
  sequence: 16,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const returns_13_4_definition = {
  domain: "returns",
  sequence: 17,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const returns_13_5_definition = {
  domain: "returns",
  sequence: 18,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const returns_13_6_definition = {
  domain: "returns",
  sequence: 19,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const returns_13_7_definition = {
  domain: "returns",
  sequence: 20,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};
