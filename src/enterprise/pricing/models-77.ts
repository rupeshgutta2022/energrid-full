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

export const pricing_77_0_definition = {
  domain: "pricing",
  sequence: 77,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const pricing_77_1_definition = {
  domain: "pricing",
  sequence: 78,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const pricing_77_2_definition = {
  domain: "pricing",
  sequence: 79,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const pricing_77_3_definition = {
  domain: "pricing",
  sequence: 80,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const pricing_77_4_definition = {
  domain: "pricing",
  sequence: 81,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const pricing_77_5_definition = {
  domain: "pricing",
  sequence: 82,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const pricing_77_6_definition = {
  domain: "pricing",
  sequence: 83,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const pricing_77_7_definition = {
  domain: "pricing",
  sequence: 84,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};
