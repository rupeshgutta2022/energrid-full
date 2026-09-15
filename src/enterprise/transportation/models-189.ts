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

export const transportation_189_0_definition = {
  domain: "transportation",
  sequence: 189,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const transportation_189_1_definition = {
  domain: "transportation",
  sequence: 190,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const transportation_189_2_definition = {
  domain: "transportation",
  sequence: 191,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const transportation_189_3_definition = {
  domain: "transportation",
  sequence: 192,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const transportation_189_4_definition = {
  domain: "transportation",
  sequence: 193,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const transportation_189_5_definition = {
  domain: "transportation",
  sequence: 194,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const transportation_189_6_definition = {
  domain: "transportation",
  sequence: 195,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const transportation_189_7_definition = {
  domain: "transportation",
  sequence: 196,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};
