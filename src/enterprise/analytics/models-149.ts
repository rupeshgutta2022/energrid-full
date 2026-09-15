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

export const analytics_149_0_definition = {
  domain: "analytics",
  sequence: 149,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const analytics_149_1_definition = {
  domain: "analytics",
  sequence: 150,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const analytics_149_2_definition = {
  domain: "analytics",
  sequence: 151,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const analytics_149_3_definition = {
  domain: "analytics",
  sequence: 152,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const analytics_149_4_definition = {
  domain: "analytics",
  sequence: 153,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const analytics_149_5_definition = {
  domain: "analytics",
  sequence: 154,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const analytics_149_6_definition = {
  domain: "analytics",
  sequence: 155,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const analytics_149_7_definition = {
  domain: "analytics",
  sequence: 156,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};
