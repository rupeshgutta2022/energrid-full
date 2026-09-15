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

export const notifications_153_0_definition = {
  domain: "notifications",
  sequence: 153,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const notifications_153_1_definition = {
  domain: "notifications",
  sequence: 154,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const notifications_153_2_definition = {
  domain: "notifications",
  sequence: 155,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const notifications_153_3_definition = {
  domain: "notifications",
  sequence: 156,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const notifications_153_4_definition = {
  domain: "notifications",
  sequence: 157,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const notifications_153_5_definition = {
  domain: "notifications",
  sequence: 158,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const notifications_153_6_definition = {
  domain: "notifications",
  sequence: 159,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};
