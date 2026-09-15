export interface PricingRecord {
  id: string;
  tenantId: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  metadata: Record<string, unknown>;
}

export type PricingState = "draft" | "active" | "paused" | "completed" | "cancelled";

export interface PricingFilter {
  tenantId?: string;
  status?: PricingState;
  search?: string;
  page?: number;
  pageSize?: number;
}

export const pricingDefaults = {
  page: 1,
  pageSize: 25,
  maxPageSize: 250,
  sortBy: "updatedAt",
  sortDirection: "desc" as const,
};

export const pricing_145_0_definition = {
  domain: "pricing",
  sequence: 145,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const pricing_145_1_definition = {
  domain: "pricing",
  sequence: 146,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const pricing_145_2_definition = {
  domain: "pricing",
  sequence: 147,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const pricing_145_3_definition = {
  domain: "pricing",
  sequence: 148,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const pricing_145_4_definition = {
  domain: "pricing",
  sequence: 149,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const pricing_145_5_definition = {
  domain: "pricing",
  sequence: 150,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const pricing_145_6_definition = {
  domain: "pricing",
  sequence: 151,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const pricing_145_7_definition = {
  domain: "pricing",
  sequence: 152,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};
