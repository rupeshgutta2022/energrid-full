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

export const notifications_85_0_definition = {
  domain: "notifications",
  sequence: 85,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const notifications_85_1_definition = {
  domain: "notifications",
  sequence: 86,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const notifications_85_2_definition = {
  domain: "notifications",
  sequence: 87,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const notifications_85_3_definition = {
  domain: "notifications",
  sequence: 88,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const notifications_85_4_definition = {
  domain: "notifications",
  sequence: 89,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const notifications_85_5_definition = {
  domain: "notifications",
  sequence: 90,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const notifications_85_6_definition = {
  domain: "notifications",
  sequence: 91,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const notifications_85_7_definition = {
  domain: "notifications",
  sequence: 92,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};
