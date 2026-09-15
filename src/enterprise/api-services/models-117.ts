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

export const api_services_117_0_definition = {
  domain: "api-services",
  sequence: 117,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const api_services_117_1_definition = {
  domain: "api-services",
  sequence: 118,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const api_services_117_2_definition = {
  domain: "api-services",
  sequence: 119,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const api_services_117_3_definition = {
  domain: "api-services",
  sequence: 120,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const api_services_117_4_definition = {
  domain: "api-services",
  sequence: 121,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const api_services_117_5_definition = {
  domain: "api-services",
  sequence: 122,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const api_services_117_6_definition = {
  domain: "api-services",
  sequence: 123,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const api_services_117_7_definition = {
  domain: "api-services",
  sequence: 124,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};
