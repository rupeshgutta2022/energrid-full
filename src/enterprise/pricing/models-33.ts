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

export const pricing_33_0_definition = {
  domain: "pricing",
  sequence: 33,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const pricing_33_1_definition = {
  domain: "pricing",
  sequence: 34,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const pricing_33_2_definition = {
  domain: "pricing",
  sequence: 35,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const pricing_33_3_definition = {
  domain: "pricing",
  sequence: 36,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const pricing_33_4_definition = {
  domain: "pricing",
  sequence: 37,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const pricing_33_5_definition = {
  domain: "pricing",
  sequence: 38,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const pricing_33_6_definition = {
  domain: "pricing",
  sequence: 39,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const pricing_33_7_definition = {
  domain: "pricing",
  sequence: 40,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};
