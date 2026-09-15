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

export const returns_37_0_definition = {
  domain: "returns",
  sequence: 37,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const returns_37_1_definition = {
  domain: "returns",
  sequence: 38,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const returns_37_2_definition = {
  domain: "returns",
  sequence: 39,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const returns_37_3_definition = {
  domain: "returns",
  sequence: 40,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const returns_37_4_definition = {
  domain: "returns",
  sequence: 41,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const returns_37_5_definition = {
  domain: "returns",
  sequence: 42,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const returns_37_6_definition = {
  domain: "returns",
  sequence: 43,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const returns_37_7_definition = {
  domain: "returns",
  sequence: 44,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};
