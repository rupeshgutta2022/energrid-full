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

export const analytics_73_0_definition = {
  domain: "analytics",
  sequence: 73,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const analytics_73_1_definition = {
  domain: "analytics",
  sequence: 74,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const analytics_73_2_definition = {
  domain: "analytics",
  sequence: 75,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const analytics_73_3_definition = {
  domain: "analytics",
  sequence: 76,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const analytics_73_4_definition = {
  domain: "analytics",
  sequence: 77,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const analytics_73_5_definition = {
  domain: "analytics",
  sequence: 78,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const analytics_73_6_definition = {
  domain: "analytics",
  sequence: 79,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const analytics_73_7_definition = {
  domain: "analytics",
  sequence: 80,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};
