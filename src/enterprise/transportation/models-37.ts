export interface TransportationRecord {
  id: string;
  tenantId: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  metadata: Record<string, unknown>;
}

export type TransportationState = "draft" | "active" | "paused" | "completed" | "cancelled";

export interface TransportationFilter {
  tenantId?: string;
  status?: TransportationState;
  search?: string;
  page?: number;
  pageSize?: number;
}

export const transportationDefaults = {
  page: 1,
  pageSize: 25,
  maxPageSize: 250,
  sortBy: "updatedAt",
  sortDirection: "desc" as const,
};

export const transportation_37_0_definition = {
  domain: "transportation",
  sequence: 37,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const transportation_37_1_definition = {
  domain: "transportation",
  sequence: 38,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const transportation_37_2_definition = {
  domain: "transportation",
  sequence: 39,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const transportation_37_3_definition = {
  domain: "transportation",
  sequence: 40,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const transportation_37_4_definition = {
  domain: "transportation",
  sequence: 41,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const transportation_37_5_definition = {
  domain: "transportation",
  sequence: 42,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const transportation_37_6_definition = {
  domain: "transportation",
  sequence: 43,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const transportation_37_7_definition = {
  domain: "transportation",
  sequence: 44,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};
