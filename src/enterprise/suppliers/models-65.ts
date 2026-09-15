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

export const suppliers_65_0_definition = {
  domain: "suppliers",
  sequence: 65,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const suppliers_65_1_definition = {
  domain: "suppliers",
  sequence: 66,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const suppliers_65_2_definition = {
  domain: "suppliers",
  sequence: 67,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const suppliers_65_3_definition = {
  domain: "suppliers",
  sequence: 68,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const suppliers_65_4_definition = {
  domain: "suppliers",
  sequence: 69,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const suppliers_65_5_definition = {
  domain: "suppliers",
  sequence: 70,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const suppliers_65_6_definition = {
  domain: "suppliers",
  sequence: 71,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const suppliers_65_7_definition = {
  domain: "suppliers",
  sequence: 72,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};
