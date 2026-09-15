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

export const procurement_217_0_definition = {
  domain: "procurement",
  sequence: 217,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const procurement_217_1_definition = {
  domain: "procurement",
  sequence: 218,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const procurement_217_2_definition = {
  domain: "procurement",
  sequence: 219,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};
