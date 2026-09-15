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

export const billing_181_0_definition = {
  domain: "billing",
  sequence: 181,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const billing_181_1_definition = {
  domain: "billing",
  sequence: 182,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const billing_181_2_definition = {
  domain: "billing",
  sequence: 183,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const billing_181_3_definition = {
  domain: "billing",
  sequence: 184,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const billing_181_4_definition = {
  domain: "billing",
  sequence: 185,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const billing_181_5_definition = {
  domain: "billing",
  sequence: 186,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const billing_181_6_definition = {
  domain: "billing",
  sequence: 187,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const billing_181_7_definition = {
  domain: "billing",
  sequence: 188,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};
