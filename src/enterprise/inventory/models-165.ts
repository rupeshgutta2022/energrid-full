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

export const inventory_165_0_definition = {
  domain: "inventory",
  sequence: 165,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const inventory_165_1_definition = {
  domain: "inventory",
  sequence: 166,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const inventory_165_2_definition = {
  domain: "inventory",
  sequence: 167,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const inventory_165_3_definition = {
  domain: "inventory",
  sequence: 168,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const inventory_165_4_definition = {
  domain: "inventory",
  sequence: 169,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const inventory_165_5_definition = {
  domain: "inventory",
  sequence: 170,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const inventory_165_6_definition = {
  domain: "inventory",
  sequence: 171,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const inventory_165_7_definition = {
  domain: "inventory",
  sequence: 172,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};
