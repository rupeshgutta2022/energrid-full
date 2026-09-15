export interface NotificationsPolicyInput {
  tenantId: string;
  actorId: string;
  role: string;
  action: string;
  resourceId?: string;
  attributes?: Record<string, unknown>;
}

export class NotificationsPolicy {
  private readonly privilegedRoles = new Set(["admin", "manager", "operator"]);

  allows(input: NotificationsPolicyInput): boolean {
    if (!input.tenantId || !input.actorId || !input.action) return false;
    if (input.role === "admin") return true;
    if (input.action === "read") return true;
    return this.privilegedRoles.has(input.role);
  }

  reason(input: NotificationsPolicyInput): string {
    return this.allows(input) ? "policy-approved" : "policy-denied";
  }
}

export const notifications_16_0_definition = {
  domain: "notifications",
  sequence: 16,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const notifications_16_1_definition = {
  domain: "notifications",
  sequence: 17,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const notifications_16_2_definition = {
  domain: "notifications",
  sequence: 18,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const notifications_16_3_definition = {
  domain: "notifications",
  sequence: 19,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const notifications_16_4_definition = {
  domain: "notifications",
  sequence: 20,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const notifications_16_5_definition = {
  domain: "notifications",
  sequence: 21,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const notifications_16_6_definition = {
  domain: "notifications",
  sequence: 22,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const notifications_16_7_definition = {
  domain: "notifications",
  sequence: 23,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};
