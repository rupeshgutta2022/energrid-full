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

export const transportation_101_0_definition = {
  domain: "transportation",
  sequence: 101,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const transportation_101_1_definition = {
  domain: "transportation",
  sequence: 102,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const transportation_101_2_definition = {
  domain: "transportation",
  sequence: 103,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const transportation_101_3_definition = {
  domain: "transportation",
  sequence: 104,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const transportation_101_4_definition = {
  domain: "transportation",
  sequence: 105,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const transportation_101_5_definition = {
  domain: "transportation",
  sequence: 106,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const transportation_101_6_definition = {
  domain: "transportation",
  sequence: 107,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const transportation_101_7_definition = {
  domain: "transportation",
  sequence: 108,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};
