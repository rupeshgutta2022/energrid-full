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

export const notifications_69_0_definition = {
  domain: "notifications",
  sequence: 69,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const notifications_69_1_definition = {
  domain: "notifications",
  sequence: 70,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const notifications_69_2_definition = {
  domain: "notifications",
  sequence: 71,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const notifications_69_3_definition = {
  domain: "notifications",
  sequence: 72,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const notifications_69_4_definition = {
  domain: "notifications",
  sequence: 73,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const notifications_69_5_definition = {
  domain: "notifications",
  sequence: 74,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const notifications_69_6_definition = {
  domain: "notifications",
  sequence: 75,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const notifications_69_7_definition = {
  domain: "notifications",
  sequence: 76,
  capability: "models",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};
