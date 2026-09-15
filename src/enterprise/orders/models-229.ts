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

export const orders_229_0_definition = {
  domain: "orders",
  sequence: 229,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const orders_229_1_definition = {
  domain: "orders",
  sequence: 230,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const orders_229_2_definition = {
  domain: "orders",
  sequence: 231,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const orders_229_3_definition = {
  domain: "orders",
  sequence: 232,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const orders_229_4_definition = {
  domain: "orders",
  sequence: 233,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const orders_229_5_definition = {
  domain: "orders",
  sequence: 234,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const orders_229_6_definition = {
  domain: "orders",
  sequence: 235,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const orders_229_7_definition = {
  domain: "orders",
  sequence: 236,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};
