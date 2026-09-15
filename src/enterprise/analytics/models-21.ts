export interface AnalyticsRecord {
  id: string;
  tenantId: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  metadata: Record<string, unknown>;
}

export type AnalyticsState = "draft" | "active" | "paused" | "completed" | "cancelled";

export interface AnalyticsFilter {
  tenantId?: string;
  status?: AnalyticsState;
  search?: string;
  page?: number;
  pageSize?: number;
}

export const analyticsDefaults = {
  page: 1,
  pageSize: 25,
  maxPageSize: 250,
  sortBy: "updatedAt",
  sortDirection: "desc" as const,
};

export const analytics_21_0_definition = {
  domain: "analytics",
  sequence: 21,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const analytics_21_1_definition = {
  domain: "analytics",
  sequence: 22,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const analytics_21_2_definition = {
  domain: "analytics",
  sequence: 23,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const analytics_21_3_definition = {
  domain: "analytics",
  sequence: 24,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const analytics_21_4_definition = {
  domain: "analytics",
  sequence: 25,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const analytics_21_5_definition = {
  domain: "analytics",
  sequence: 26,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const analytics_21_6_definition = {
  domain: "analytics",
  sequence: 27,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const analytics_21_7_definition = {
  domain: "analytics",
  sequence: 28,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};
