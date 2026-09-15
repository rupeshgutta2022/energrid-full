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

export const warehouse_197_0_definition = {
  domain: "warehouse",
  sequence: 197,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const warehouse_197_1_definition = {
  domain: "warehouse",
  sequence: 198,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const warehouse_197_2_definition = {
  domain: "warehouse",
  sequence: 199,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const warehouse_197_3_definition = {
  domain: "warehouse",
  sequence: 200,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const warehouse_197_4_definition = {
  domain: "warehouse",
  sequence: 201,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const warehouse_197_5_definition = {
  domain: "warehouse",
  sequence: 202,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const warehouse_197_6_definition = {
  domain: "warehouse",
  sequence: 203,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const warehouse_197_7_definition = {
  domain: "warehouse",
  sequence: 204,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};
