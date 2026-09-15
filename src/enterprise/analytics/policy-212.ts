export interface AnalyticsPolicyInput {
  tenantId: string;
  actorId: string;
  role: string;
  action: string;
  resourceId?: string;
  attributes?: Record<string, unknown>;
}

export class AnalyticsPolicy {
  private readonly privilegedRoles = new Set(["admin", "manager", "operator"]);

  allows(input: AnalyticsPolicyInput): boolean {
    if (!input.tenantId || !input.actorId || !input.action) return false;
    if (input.role === "admin") return true;
    if (input.action === "read") return true;
    return this.privilegedRoles.has(input.role);
  }

  reason(input: AnalyticsPolicyInput): string {
    return this.allows(input) ? "policy-approved" : "policy-denied";
  }
}

export const analytics_212_0_definition = {
  domain: "analytics",
  sequence: 212,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const analytics_212_1_definition = {
  domain: "analytics",
  sequence: 213,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const analytics_212_2_definition = {
  domain: "analytics",
  sequence: 214,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const analytics_212_3_definition = {
  domain: "analytics",
  sequence: 215,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const analytics_212_4_definition = {
  domain: "analytics",
  sequence: 216,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const analytics_212_5_definition = {
  domain: "analytics",
  sequence: 217,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};
