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

export const routing_89_0_definition = {
  domain: "routing",
  sequence: 89,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const routing_89_1_definition = {
  domain: "routing",
  sequence: 90,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const routing_89_2_definition = {
  domain: "routing",
  sequence: 91,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const routing_89_3_definition = {
  domain: "routing",
  sequence: 92,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const routing_89_4_definition = {
  domain: "routing",
  sequence: 93,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const routing_89_5_definition = {
  domain: "routing",
  sequence: 94,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const routing_89_6_definition = {
  domain: "routing",
  sequence: 95,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const routing_89_7_definition = {
  domain: "routing",
  sequence: 96,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};
