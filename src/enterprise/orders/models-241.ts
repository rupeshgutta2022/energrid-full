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

export const orders_241_0_definition = {
  domain: "orders",
  sequence: 241,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const orders_241_1_definition = {
  domain: "orders",
  sequence: 242,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const orders_241_2_definition = {
  domain: "orders",
  sequence: 243,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const orders_241_3_definition = {
  domain: "orders",
  sequence: 244,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const orders_241_4_definition = {
  domain: "orders",
  sequence: 245,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const orders_241_5_definition = {
  domain: "orders",
  sequence: 246,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const orders_241_6_definition = {
  domain: "orders",
  sequence: 247,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const orders_241_7_definition = {
  domain: "orders",
  sequence: 248,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};
