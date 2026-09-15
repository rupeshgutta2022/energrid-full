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

export const transportation_17_0_definition = {
  domain: "transportation",
  sequence: 17,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const transportation_17_1_definition = {
  domain: "transportation",
  sequence: 18,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const transportation_17_2_definition = {
  domain: "transportation",
  sequence: 19,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const transportation_17_3_definition = {
  domain: "transportation",
  sequence: 20,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const transportation_17_4_definition = {
  domain: "transportation",
  sequence: 21,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const transportation_17_5_definition = {
  domain: "transportation",
  sequence: 22,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const transportation_17_6_definition = {
  domain: "transportation",
  sequence: 23,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const transportation_17_7_definition = {
  domain: "transportation",
  sequence: 24,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};
