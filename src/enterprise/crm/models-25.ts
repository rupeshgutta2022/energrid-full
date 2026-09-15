export interface CrmRecord {
  id: string;
  tenantId: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  metadata: Record<string, unknown>;
}

export type CrmState = "draft" | "active" | "paused" | "completed" | "cancelled";

export interface CrmFilter {
  tenantId?: string;
  status?: CrmState;
  search?: string;
  page?: number;
  pageSize?: number;
}

export const crmDefaults = {
  page: 1,
  pageSize: 25,
  maxPageSize: 250,
  sortBy: "updatedAt",
  sortDirection: "desc" as const,
};

export const crm_25_0_definition = {
  domain: "crm",
  sequence: 25,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const crm_25_1_definition = {
  domain: "crm",
  sequence: 26,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const crm_25_2_definition = {
  domain: "crm",
  sequence: 27,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const crm_25_3_definition = {
  domain: "crm",
  sequence: 28,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const crm_25_4_definition = {
  domain: "crm",
  sequence: 29,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const crm_25_5_definition = {
  domain: "crm",
  sequence: 30,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const crm_25_6_definition = {
  domain: "crm",
  sequence: 31,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const crm_25_7_definition = {
  domain: "crm",
  sequence: 32,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};
