export interface SecurityRecord {
  id: string;
  tenantId: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  metadata: Record<string, unknown>;
}

export type SecurityState = "draft" | "active" | "paused" | "completed" | "cancelled";

export interface SecurityFilter {
  tenantId?: string;
  status?: SecurityState;
  search?: string;
  page?: number;
  pageSize?: number;
}

export const securityDefaults = {
  page: 1,
  pageSize: 25,
  maxPageSize: 250,
  sortBy: "updatedAt",
  sortDirection: "desc" as const,
};

export const security_45_0_definition = {
  domain: "security",
  sequence: 45,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const security_45_1_definition = {
  domain: "security",
  sequence: 46,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const security_45_2_definition = {
  domain: "security",
  sequence: 47,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const security_45_3_definition = {
  domain: "security",
  sequence: 48,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const security_45_4_definition = {
  domain: "security",
  sequence: 49,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const security_45_5_definition = {
  domain: "security",
  sequence: 50,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const security_45_6_definition = {
  domain: "security",
  sequence: 51,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const security_45_7_definition = {
  domain: "security",
  sequence: 52,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};
