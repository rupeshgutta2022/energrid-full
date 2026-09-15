export interface ProcurementRecord {
  id: string;
  tenantId: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  metadata: Record<string, unknown>;
}

export type ProcurementState = "draft" | "active" | "paused" | "completed" | "cancelled";

export interface ProcurementFilter {
  tenantId?: string;
  status?: ProcurementState;
  search?: string;
  page?: number;
  pageSize?: number;
}

export const procurementDefaults = {
  page: 1,
  pageSize: 25,
  maxPageSize: 250,
  sortBy: "updatedAt",
  sortDirection: "desc" as const,
};

export const procurement_145_0_definition = {
  domain: "procurement",
  sequence: 145,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const procurement_145_1_definition = {
  domain: "procurement",
  sequence: 146,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const procurement_145_2_definition = {
  domain: "procurement",
  sequence: 147,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const procurement_145_3_definition = {
  domain: "procurement",
  sequence: 148,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const procurement_145_4_definition = {
  domain: "procurement",
  sequence: 149,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const procurement_145_5_definition = {
  domain: "procurement",
  sequence: 150,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const procurement_145_6_definition = {
  domain: "procurement",
  sequence: 151,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const procurement_145_7_definition = {
  domain: "procurement",
  sequence: 152,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};
