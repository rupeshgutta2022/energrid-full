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

export const crm_109_0_definition = {
  domain: "crm",
  sequence: 109,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const crm_109_1_definition = {
  domain: "crm",
  sequence: 110,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const crm_109_2_definition = {
  domain: "crm",
  sequence: 111,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const crm_109_3_definition = {
  domain: "crm",
  sequence: 112,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const crm_109_4_definition = {
  domain: "crm",
  sequence: 113,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const crm_109_5_definition = {
  domain: "crm",
  sequence: 114,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const crm_109_6_definition = {
  domain: "crm",
  sequence: 115,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const crm_109_7_definition = {
  domain: "crm",
  sequence: 116,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};
