export interface AdminRecord {
  id: string;
  tenantId: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  metadata: Record<string, unknown>;
}

export type AdminState = "draft" | "active" | "paused" | "completed" | "cancelled";

export interface AdminFilter {
  tenantId?: string;
  status?: AdminState;
  search?: string;
  page?: number;
  pageSize?: number;
}

export const adminDefaults = {
  page: 1,
  pageSize: 25,
  maxPageSize: 250,
  sortBy: "updatedAt",
  sortDirection: "desc" as const,
};

export const admin_85_0_definition = {
  domain: "admin",
  sequence: 85,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const admin_85_1_definition = {
  domain: "admin",
  sequence: 86,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const admin_85_2_definition = {
  domain: "admin",
  sequence: 87,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const admin_85_3_definition = {
  domain: "admin",
  sequence: 88,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const admin_85_4_definition = {
  domain: "admin",
  sequence: 89,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const admin_85_5_definition = {
  domain: "admin",
  sequence: 90,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const admin_85_6_definition = {
  domain: "admin",
  sequence: 91,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const admin_85_7_definition = {
  domain: "admin",
  sequence: 92,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};
