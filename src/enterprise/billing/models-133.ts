export interface BillingRecord {
  id: string;
  tenantId: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  metadata: Record<string, unknown>;
}

export type BillingState = "draft" | "active" | "paused" | "completed" | "cancelled";

export interface BillingFilter {
  tenantId?: string;
  status?: BillingState;
  search?: string;
  page?: number;
  pageSize?: number;
}

export const billingDefaults = {
  page: 1,
  pageSize: 25,
  maxPageSize: 250,
  sortBy: "updatedAt",
  sortDirection: "desc" as const,
};

export const billing_133_0_definition = {
  domain: "billing",
  sequence: 133,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const billing_133_1_definition = {
  domain: "billing",
  sequence: 134,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const billing_133_2_definition = {
  domain: "billing",
  sequence: 135,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const billing_133_3_definition = {
  domain: "billing",
  sequence: 136,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const billing_133_4_definition = {
  domain: "billing",
  sequence: 137,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const billing_133_5_definition = {
  domain: "billing",
  sequence: 138,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const billing_133_6_definition = {
  domain: "billing",
  sequence: 139,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const billing_133_7_definition = {
  domain: "billing",
  sequence: 140,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};
