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

export const suppliers_5_0_definition = {
  domain: "suppliers",
  sequence: 5,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const suppliers_5_1_definition = {
  domain: "suppliers",
  sequence: 6,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const suppliers_5_2_definition = {
  domain: "suppliers",
  sequence: 7,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const suppliers_5_3_definition = {
  domain: "suppliers",
  sequence: 8,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const suppliers_5_4_definition = {
  domain: "suppliers",
  sequence: 9,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const suppliers_5_5_definition = {
  domain: "suppliers",
  sequence: 10,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const suppliers_5_6_definition = {
  domain: "suppliers",
  sequence: 11,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const suppliers_5_7_definition = {
  domain: "suppliers",
  sequence: 12,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};
