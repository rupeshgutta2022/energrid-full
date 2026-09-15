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

export const warehouse_221_0_definition = {
  domain: "warehouse",
  sequence: 221,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const warehouse_221_1_definition = {
  domain: "warehouse",
  sequence: 222,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const warehouse_221_2_definition = {
  domain: "warehouse",
  sequence: 223,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const warehouse_221_3_definition = {
  domain: "warehouse",
  sequence: 224,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const warehouse_221_4_definition = {
  domain: "warehouse",
  sequence: 225,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const warehouse_221_5_definition = {
  domain: "warehouse",
  sequence: 226,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const warehouse_221_6_definition = {
  domain: "warehouse",
  sequence: 227,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const warehouse_221_7_definition = {
  domain: "warehouse",
  sequence: 228,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};
