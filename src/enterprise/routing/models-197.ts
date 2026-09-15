export interface RoutingRecord {
  id: string;
  tenantId: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  metadata: Record<string, unknown>;
}

export type RoutingState = "draft" | "active" | "paused" | "completed" | "cancelled";

export interface RoutingFilter {
  tenantId?: string;
  status?: RoutingState;
  search?: string;
  page?: number;
  pageSize?: number;
}

export const routingDefaults = {
  page: 1,
  pageSize: 25,
  maxPageSize: 250,
  sortBy: "updatedAt",
  sortDirection: "desc" as const,
};

export const routing_197_0_definition = {
  domain: "routing",
  sequence: 197,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const routing_197_1_definition = {
  domain: "routing",
  sequence: 198,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const routing_197_2_definition = {
  domain: "routing",
  sequence: 199,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const routing_197_3_definition = {
  domain: "routing",
  sequence: 200,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const routing_197_4_definition = {
  domain: "routing",
  sequence: 201,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const routing_197_5_definition = {
  domain: "routing",
  sequence: 202,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const routing_197_6_definition = {
  domain: "routing",
  sequence: 203,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const routing_197_7_definition = {
  domain: "routing",
  sequence: 204,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};
