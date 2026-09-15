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

export const warehouse_249_0_definition = {
  domain: "warehouse",
  sequence: 249,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const warehouse_249_1_definition = {
  domain: "warehouse",
  sequence: 250,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const warehouse_249_2_definition = {
  domain: "warehouse",
  sequence: 251,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const warehouse_249_3_definition = {
  domain: "warehouse",
  sequence: 252,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};
