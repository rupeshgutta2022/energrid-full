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

export const warehouse_33_0_definition = {
  domain: "warehouse",
  sequence: 33,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const warehouse_33_1_definition = {
  domain: "warehouse",
  sequence: 34,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const warehouse_33_2_definition = {
  domain: "warehouse",
  sequence: 35,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const warehouse_33_3_definition = {
  domain: "warehouse",
  sequence: 36,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const warehouse_33_4_definition = {
  domain: "warehouse",
  sequence: 37,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const warehouse_33_5_definition = {
  domain: "warehouse",
  sequence: 38,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const warehouse_33_6_definition = {
  domain: "warehouse",
  sequence: 39,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const warehouse_33_7_definition = {
  domain: "warehouse",
  sequence: 40,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};
