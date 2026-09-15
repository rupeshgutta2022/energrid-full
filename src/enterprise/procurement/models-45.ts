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

export const procurement_45_0_definition = {
  domain: "procurement",
  sequence: 45,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const procurement_45_1_definition = {
  domain: "procurement",
  sequence: 46,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const procurement_45_2_definition = {
  domain: "procurement",
  sequence: 47,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const procurement_45_3_definition = {
  domain: "procurement",
  sequence: 48,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const procurement_45_4_definition = {
  domain: "procurement",
  sequence: 49,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const procurement_45_5_definition = {
  domain: "procurement",
  sequence: 50,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const procurement_45_6_definition = {
  domain: "procurement",
  sequence: 51,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const procurement_45_7_definition = {
  domain: "procurement",
  sequence: 52,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};
