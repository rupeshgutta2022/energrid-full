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

export const procurement_169_0_definition = {
  domain: "procurement",
  sequence: 169,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const procurement_169_1_definition = {
  domain: "procurement",
  sequence: 170,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const procurement_169_2_definition = {
  domain: "procurement",
  sequence: 171,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const procurement_169_3_definition = {
  domain: "procurement",
  sequence: 172,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const procurement_169_4_definition = {
  domain: "procurement",
  sequence: 173,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const procurement_169_5_definition = {
  domain: "procurement",
  sequence: 174,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const procurement_169_6_definition = {
  domain: "procurement",
  sequence: 175,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const procurement_169_7_definition = {
  domain: "procurement",
  sequence: 176,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};
