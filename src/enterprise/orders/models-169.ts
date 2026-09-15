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

export const orders_169_0_definition = {
  domain: "orders",
  sequence: 169,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const orders_169_1_definition = {
  domain: "orders",
  sequence: 170,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const orders_169_2_definition = {
  domain: "orders",
  sequence: 171,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const orders_169_3_definition = {
  domain: "orders",
  sequence: 172,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const orders_169_4_definition = {
  domain: "orders",
  sequence: 173,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const orders_169_5_definition = {
  domain: "orders",
  sequence: 174,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const orders_169_6_definition = {
  domain: "orders",
  sequence: 175,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const orders_169_7_definition = {
  domain: "orders",
  sequence: 176,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};
