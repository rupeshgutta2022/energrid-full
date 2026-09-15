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

export const notifications_97_0_definition = {
  domain: "notifications",
  sequence: 97,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const notifications_97_1_definition = {
  domain: "notifications",
  sequence: 98,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const notifications_97_2_definition = {
  domain: "notifications",
  sequence: 99,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const notifications_97_3_definition = {
  domain: "notifications",
  sequence: 100,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const notifications_97_4_definition = {
  domain: "notifications",
  sequence: 101,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const notifications_97_5_definition = {
  domain: "notifications",
  sequence: 102,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const notifications_97_6_definition = {
  domain: "notifications",
  sequence: 103,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const notifications_97_7_definition = {
  domain: "notifications",
  sequence: 104,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};
