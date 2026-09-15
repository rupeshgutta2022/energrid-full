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

export const routing_105_0_definition = {
  domain: "routing",
  sequence: 105,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const routing_105_1_definition = {
  domain: "routing",
  sequence: 106,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const routing_105_2_definition = {
  domain: "routing",
  sequence: 107,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const routing_105_3_definition = {
  domain: "routing",
  sequence: 108,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const routing_105_4_definition = {
  domain: "routing",
  sequence: 109,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const routing_105_5_definition = {
  domain: "routing",
  sequence: 110,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const routing_105_6_definition = {
  domain: "routing",
  sequence: 111,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const routing_105_7_definition = {
  domain: "routing",
  sequence: 112,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};
