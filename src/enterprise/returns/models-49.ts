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

export const returns_49_0_definition = {
  domain: "returns",
  sequence: 49,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const returns_49_1_definition = {
  domain: "returns",
  sequence: 50,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const returns_49_2_definition = {
  domain: "returns",
  sequence: 51,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const returns_49_3_definition = {
  domain: "returns",
  sequence: 52,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const returns_49_4_definition = {
  domain: "returns",
  sequence: 53,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const returns_49_5_definition = {
  domain: "returns",
  sequence: 54,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const returns_49_6_definition = {
  domain: "returns",
  sequence: 55,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const returns_49_7_definition = {
  domain: "returns",
  sequence: 56,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};
