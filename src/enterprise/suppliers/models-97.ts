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

export const suppliers_97_0_definition = {
  domain: "suppliers",
  sequence: 97,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const suppliers_97_1_definition = {
  domain: "suppliers",
  sequence: 98,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const suppliers_97_2_definition = {
  domain: "suppliers",
  sequence: 99,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const suppliers_97_3_definition = {
  domain: "suppliers",
  sequence: 100,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const suppliers_97_4_definition = {
  domain: "suppliers",
  sequence: 101,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const suppliers_97_5_definition = {
  domain: "suppliers",
  sequence: 102,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const suppliers_97_6_definition = {
  domain: "suppliers",
  sequence: 103,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const suppliers_97_7_definition = {
  domain: "suppliers",
  sequence: 104,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};
