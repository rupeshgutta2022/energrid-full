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

export const pricing_141_0_definition = {
  domain: "pricing",
  sequence: 141,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const pricing_141_1_definition = {
  domain: "pricing",
  sequence: 142,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const pricing_141_2_definition = {
  domain: "pricing",
  sequence: 143,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const pricing_141_3_definition = {
  domain: "pricing",
  sequence: 144,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const pricing_141_4_definition = {
  domain: "pricing",
  sequence: 145,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const pricing_141_5_definition = {
  domain: "pricing",
  sequence: 146,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const pricing_141_6_definition = {
  domain: "pricing",
  sequence: 147,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const pricing_141_7_definition = {
  domain: "pricing",
  sequence: 148,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};
