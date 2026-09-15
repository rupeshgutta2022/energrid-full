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

export const inventory_113_0_definition = {
  domain: "inventory",
  sequence: 113,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const inventory_113_1_definition = {
  domain: "inventory",
  sequence: 114,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const inventory_113_2_definition = {
  domain: "inventory",
  sequence: 115,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const inventory_113_3_definition = {
  domain: "inventory",
  sequence: 116,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const inventory_113_4_definition = {
  domain: "inventory",
  sequence: 117,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const inventory_113_5_definition = {
  domain: "inventory",
  sequence: 118,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const inventory_113_6_definition = {
  domain: "inventory",
  sequence: 119,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const inventory_113_7_definition = {
  domain: "inventory",
  sequence: 120,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};
