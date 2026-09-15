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

export const orders_21_0_definition = {
  domain: "orders",
  sequence: 21,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const orders_21_1_definition = {
  domain: "orders",
  sequence: 22,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const orders_21_2_definition = {
  domain: "orders",
  sequence: 23,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const orders_21_3_definition = {
  domain: "orders",
  sequence: 24,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const orders_21_4_definition = {
  domain: "orders",
  sequence: 25,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const orders_21_5_definition = {
  domain: "orders",
  sequence: 26,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const orders_21_6_definition = {
  domain: "orders",
  sequence: 27,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const orders_21_7_definition = {
  domain: "orders",
  sequence: 28,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};
