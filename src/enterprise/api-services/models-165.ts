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

export const api_services_165_0_definition = {
  domain: "api-services",
  sequence: 165,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const api_services_165_1_definition = {
  domain: "api-services",
  sequence: 166,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const api_services_165_2_definition = {
  domain: "api-services",
  sequence: 167,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const api_services_165_3_definition = {
  domain: "api-services",
  sequence: 168,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const api_services_165_4_definition = {
  domain: "api-services",
  sequence: 169,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const api_services_165_5_definition = {
  domain: "api-services",
  sequence: 170,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const api_services_165_6_definition = {
  domain: "api-services",
  sequence: 171,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const api_services_165_7_definition = {
  domain: "api-services",
  sequence: 172,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};
