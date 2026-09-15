export interface InventoryRecord {
  id: string;
  tenantId: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  metadata: Record<string, unknown>;
}

export type InventoryState = "draft" | "active" | "paused" | "completed" | "cancelled";

export interface InventoryFilter {
  tenantId?: string;
  status?: InventoryState;
  search?: string;
  page?: number;
  pageSize?: number;
}

export const inventoryDefaults = {
  page: 1,
  pageSize: 25,
  maxPageSize: 250,
  sortBy: "updatedAt",
  sortDirection: "desc" as const,
};

export const inventory_237_0_definition = {
  domain: "inventory",
  sequence: 237,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const inventory_237_1_definition = {
  domain: "inventory",
  sequence: 238,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};
