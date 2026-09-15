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

export const crm_121_0_definition = {
  domain: "crm",
  sequence: 121,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const crm_121_1_definition = {
  domain: "crm",
  sequence: 122,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const crm_121_2_definition = {
  domain: "crm",
  sequence: 123,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const crm_121_3_definition = {
  domain: "crm",
  sequence: 124,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const crm_121_4_definition = {
  domain: "crm",
  sequence: 125,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const crm_121_5_definition = {
  domain: "crm",
  sequence: 126,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const crm_121_6_definition = {
  domain: "crm",
  sequence: 127,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const crm_121_7_definition = {
  domain: "crm",
  sequence: 128,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};
