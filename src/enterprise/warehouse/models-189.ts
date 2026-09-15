export interface WarehouseRecord {
  id: string;
  tenantId: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  metadata: Record<string, unknown>;
}

export type WarehouseState = "draft" | "active" | "paused" | "completed" | "cancelled";

export interface WarehouseFilter {
  tenantId?: string;
  status?: WarehouseState;
  search?: string;
  page?: number;
  pageSize?: number;
}

export const warehouseDefaults = {
  page: 1,
  pageSize: 25,
  maxPageSize: 250,
  sortBy: "updatedAt",
  sortDirection: "desc" as const,
};

export const warehouse_189_0_definition = {
  domain: "warehouse",
  sequence: 189,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const warehouse_189_1_definition = {
  domain: "warehouse",
  sequence: 190,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const warehouse_189_2_definition = {
  domain: "warehouse",
  sequence: 191,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const warehouse_189_3_definition = {
  domain: "warehouse",
  sequence: 192,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const warehouse_189_4_definition = {
  domain: "warehouse",
  sequence: 193,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const warehouse_189_5_definition = {
  domain: "warehouse",
  sequence: 194,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const warehouse_189_6_definition = {
  domain: "warehouse",
  sequence: 195,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const warehouse_189_7_definition = {
  domain: "warehouse",
  sequence: 196,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};
