export interface NotificationsRecord {
  id: string;
  tenantId: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  metadata: Record<string, unknown>;
}

export type NotificationsState = "draft" | "active" | "paused" | "completed" | "cancelled";

export interface NotificationsFilter {
  tenantId?: string;
  status?: NotificationsState;
  search?: string;
  page?: number;
  pageSize?: number;
}

export const notificationsDefaults = {
  page: 1,
  pageSize: 25,
  maxPageSize: 250,
  sortBy: "updatedAt",
  sortDirection: "desc" as const,
};

export const notifications_137_0_definition = {
  domain: "notifications",
  sequence: 137,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const notifications_137_1_definition = {
  domain: "notifications",
  sequence: 138,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const notifications_137_2_definition = {
  domain: "notifications",
  sequence: 139,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const notifications_137_3_definition = {
  domain: "notifications",
  sequence: 140,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const notifications_137_4_definition = {
  domain: "notifications",
  sequence: 141,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const notifications_137_5_definition = {
  domain: "notifications",
  sequence: 142,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const notifications_137_6_definition = {
  domain: "notifications",
  sequence: 143,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const notifications_137_7_definition = {
  domain: "notifications",
  sequence: 144,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};
