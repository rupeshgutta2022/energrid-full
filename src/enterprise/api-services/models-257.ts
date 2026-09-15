export interface ApiServicesRecord {
  id: string;
  tenantId: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  metadata: Record<string, unknown>;
}

export type ApiServicesState = "draft" | "active" | "paused" | "completed" | "cancelled";

export interface ApiServicesFilter {
  tenantId?: string;
  status?: ApiServicesState;
  search?: string;
  page?: number;
  pageSize?: number;
}

export const api-servicesDefaults = {
  page: 1,
  pageSize: 25,
  maxPageSize: 250,
  sortBy: "updatedAt",
  sortDirection: "desc" as const,
};

export const api_services_257_0_definition = {
  domain: "api-services",
  sequence: 257,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const api_services_257_1_definition = {
  domain: "api-services",
  sequence: 258,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const api_services_257_2_definition = {
  domain: "api-services",
  sequence: 259,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const api_services_257_3_definition = {
  domain: "api-services",
  sequence: 260,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const api_services_257_4_definition = {
  domain: "api-services",
  sequence: 261,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const api_services_257_5_definition = {
  domain: "api-services",
  sequence: 262,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const api_services_257_6_definition = {
  domain: "api-services",
  sequence: 263,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const api_services_257_7_definition = {
  domain: "api-services",
  sequence: 264,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};
