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

export const billing_129_0_definition = {
  domain: "billing",
  sequence: 129,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const billing_129_1_definition = {
  domain: "billing",
  sequence: 130,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const billing_129_2_definition = {
  domain: "billing",
  sequence: 131,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const billing_129_3_definition = {
  domain: "billing",
  sequence: 132,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const billing_129_4_definition = {
  domain: "billing",
  sequence: 133,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const billing_129_5_definition = {
  domain: "billing",
  sequence: 134,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const billing_129_6_definition = {
  domain: "billing",
  sequence: 135,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const billing_129_7_definition = {
  domain: "billing",
  sequence: 136,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};
