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

export const procurement_177_0_definition = {
  domain: "procurement",
  sequence: 177,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const procurement_177_1_definition = {
  domain: "procurement",
  sequence: 178,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const procurement_177_2_definition = {
  domain: "procurement",
  sequence: 179,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const procurement_177_3_definition = {
  domain: "procurement",
  sequence: 180,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const procurement_177_4_definition = {
  domain: "procurement",
  sequence: 181,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const procurement_177_5_definition = {
  domain: "procurement",
  sequence: 182,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const procurement_177_6_definition = {
  domain: "procurement",
  sequence: 183,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const procurement_177_7_definition = {
  domain: "procurement",
  sequence: 184,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};
