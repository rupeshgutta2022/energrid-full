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

export const inventory_53_0_definition = {
  domain: "inventory",
  sequence: 53,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const inventory_53_1_definition = {
  domain: "inventory",
  sequence: 54,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const inventory_53_2_definition = {
  domain: "inventory",
  sequence: 55,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const inventory_53_3_definition = {
  domain: "inventory",
  sequence: 56,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const inventory_53_4_definition = {
  domain: "inventory",
  sequence: 57,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const inventory_53_5_definition = {
  domain: "inventory",
  sequence: 58,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const inventory_53_6_definition = {
  domain: "inventory",
  sequence: 59,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const inventory_53_7_definition = {
  domain: "inventory",
  sequence: 60,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};
