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

export const pricing_41_0_definition = {
  domain: "pricing",
  sequence: 41,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const pricing_41_1_definition = {
  domain: "pricing",
  sequence: 42,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const pricing_41_2_definition = {
  domain: "pricing",
  sequence: 43,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const pricing_41_3_definition = {
  domain: "pricing",
  sequence: 44,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const pricing_41_4_definition = {
  domain: "pricing",
  sequence: 45,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const pricing_41_5_definition = {
  domain: "pricing",
  sequence: 46,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const pricing_41_6_definition = {
  domain: "pricing",
  sequence: 47,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const pricing_41_7_definition = {
  domain: "pricing",
  sequence: 48,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};
