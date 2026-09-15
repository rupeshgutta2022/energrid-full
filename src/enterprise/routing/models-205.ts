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

export const routing_205_0_definition = {
  domain: "routing",
  sequence: 205,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const routing_205_1_definition = {
  domain: "routing",
  sequence: 206,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const routing_205_2_definition = {
  domain: "routing",
  sequence: 207,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const routing_205_3_definition = {
  domain: "routing",
  sequence: 208,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const routing_205_4_definition = {
  domain: "routing",
  sequence: 209,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const routing_205_5_definition = {
  domain: "routing",
  sequence: 210,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const routing_205_6_definition = {
  domain: "routing",
  sequence: 211,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const routing_205_7_definition = {
  domain: "routing",
  sequence: 212,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};
