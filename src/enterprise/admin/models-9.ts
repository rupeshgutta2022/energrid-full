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

export const admin_9_0_definition = {
  domain: "admin",
  sequence: 9,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const admin_9_1_definition = {
  domain: "admin",
  sequence: 10,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const admin_9_2_definition = {
  domain: "admin",
  sequence: 11,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const admin_9_3_definition = {
  domain: "admin",
  sequence: 12,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const admin_9_4_definition = {
  domain: "admin",
  sequence: 13,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const admin_9_5_definition = {
  domain: "admin",
  sequence: 14,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const admin_9_6_definition = {
  domain: "admin",
  sequence: 15,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const admin_9_7_definition = {
  domain: "admin",
  sequence: 16,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};
