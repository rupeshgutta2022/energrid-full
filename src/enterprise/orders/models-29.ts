export interface OrdersRecord {
  id: string;
  tenantId: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  metadata: Record<string, unknown>;
}

export type OrdersState = "draft" | "active" | "paused" | "completed" | "cancelled";

export interface OrdersFilter {
  tenantId?: string;
  status?: OrdersState;
  search?: string;
  page?: number;
  pageSize?: number;
}

export const ordersDefaults = {
  page: 1,
  pageSize: 25,
  maxPageSize: 250,
  sortBy: "updatedAt",
  sortDirection: "desc" as const,
};

export const orders_29_0_definition = {
  domain: "orders",
  sequence: 29,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const orders_29_1_definition = {
  domain: "orders",
  sequence: 30,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const orders_29_2_definition = {
  domain: "orders",
  sequence: 31,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const orders_29_3_definition = {
  domain: "orders",
  sequence: 32,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const orders_29_4_definition = {
  domain: "orders",
  sequence: 33,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const orders_29_5_definition = {
  domain: "orders",
  sequence: 34,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const orders_29_6_definition = {
  domain: "orders",
  sequence: 35,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const orders_29_7_definition = {
  domain: "orders",
  sequence: 36,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};
