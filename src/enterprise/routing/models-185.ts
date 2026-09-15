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

export const routing_185_0_definition = {
  domain: "routing",
  sequence: 185,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const routing_185_1_definition = {
  domain: "routing",
  sequence: 186,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const routing_185_2_definition = {
  domain: "routing",
  sequence: 187,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const routing_185_3_definition = {
  domain: "routing",
  sequence: 188,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const routing_185_4_definition = {
  domain: "routing",
  sequence: 189,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const routing_185_5_definition = {
  domain: "routing",
  sequence: 190,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const routing_185_6_definition = {
  domain: "routing",
  sequence: 191,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const routing_185_7_definition = {
  domain: "routing",
  sequence: 192,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};
