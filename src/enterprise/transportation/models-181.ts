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

export const transportation_181_0_definition = {
  domain: "transportation",
  sequence: 181,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const transportation_181_1_definition = {
  domain: "transportation",
  sequence: 182,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const transportation_181_2_definition = {
  domain: "transportation",
  sequence: 183,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const transportation_181_3_definition = {
  domain: "transportation",
  sequence: 184,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const transportation_181_4_definition = {
  domain: "transportation",
  sequence: 185,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const transportation_181_5_definition = {
  domain: "transportation",
  sequence: 186,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const transportation_181_6_definition = {
  domain: "transportation",
  sequence: 187,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const transportation_181_7_definition = {
  domain: "transportation",
  sequence: 188,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};
