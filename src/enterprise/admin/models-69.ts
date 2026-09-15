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

export const admin_69_0_definition = {
  domain: "admin",
  sequence: 69,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const admin_69_1_definition = {
  domain: "admin",
  sequence: 70,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const admin_69_2_definition = {
  domain: "admin",
  sequence: 71,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const admin_69_3_definition = {
  domain: "admin",
  sequence: 72,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const admin_69_4_definition = {
  domain: "admin",
  sequence: 73,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const admin_69_5_definition = {
  domain: "admin",
  sequence: 74,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const admin_69_6_definition = {
  domain: "admin",
  sequence: 75,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const admin_69_7_definition = {
  domain: "admin",
  sequence: 76,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};
