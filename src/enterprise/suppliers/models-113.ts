export interface SuppliersRecord {
  id: string;
  tenantId: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  metadata: Record<string, unknown>;
}

export type SuppliersState = "draft" | "active" | "paused" | "completed" | "cancelled";

export interface SuppliersFilter {
  tenantId?: string;
  status?: SuppliersState;
  search?: string;
  page?: number;
  pageSize?: number;
}

export const suppliersDefaults = {
  page: 1,
  pageSize: 25,
  maxPageSize: 250,
  sortBy: "updatedAt",
  sortDirection: "desc" as const,
};

export const suppliers_113_0_definition = {
  domain: "suppliers",
  sequence: 113,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const suppliers_113_1_definition = {
  domain: "suppliers",
  sequence: 114,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const suppliers_113_2_definition = {
  domain: "suppliers",
  sequence: 115,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const suppliers_113_3_definition = {
  domain: "suppliers",
  sequence: 116,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const suppliers_113_4_definition = {
  domain: "suppliers",
  sequence: 117,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const suppliers_113_5_definition = {
  domain: "suppliers",
  sequence: 118,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const suppliers_113_6_definition = {
  domain: "suppliers",
  sequence: 119,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const suppliers_113_7_definition = {
  domain: "suppliers",
  sequence: 120,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};
