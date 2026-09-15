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

export const analytics_69_0_definition = {
  domain: "analytics",
  sequence: 69,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const analytics_69_1_definition = {
  domain: "analytics",
  sequence: 70,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const analytics_69_2_definition = {
  domain: "analytics",
  sequence: 71,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const analytics_69_3_definition = {
  domain: "analytics",
  sequence: 72,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const analytics_69_4_definition = {
  domain: "analytics",
  sequence: 73,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const analytics_69_5_definition = {
  domain: "analytics",
  sequence: 74,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const analytics_69_6_definition = {
  domain: "analytics",
  sequence: 75,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const analytics_69_7_definition = {
  domain: "analytics",
  sequence: 76,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};
