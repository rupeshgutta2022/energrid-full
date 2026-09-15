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

export const crm_157_0_definition = {
  domain: "crm",
  sequence: 157,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const crm_157_1_definition = {
  domain: "crm",
  sequence: 158,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const crm_157_2_definition = {
  domain: "crm",
  sequence: 159,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const crm_157_3_definition = {
  domain: "crm",
  sequence: 160,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const crm_157_4_definition = {
  domain: "crm",
  sequence: 161,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};
