export interface AdminPolicyInput {
  tenantId: string;
  actorId: string;
  role: string;
  action: string;
  resourceId?: string;
  attributes?: Record<string, unknown>;
}

export class AdminPolicy {
  private readonly privilegedRoles = new Set(["admin", "manager", "operator"]);

  allows(input: AdminPolicyInput): boolean {
    if (!input.tenantId || !input.actorId || !input.action) return false;
    if (input.role === "admin") return true;
    if (input.action === "read") return true;
    return this.privilegedRoles.has(input.role);
  }

  reason(input: AdminPolicyInput): string {
    return this.allows(input) ? "policy-approved" : "policy-denied";
  }
}

export const admin_12_0_definition = {
  domain: "admin",
  sequence: 12,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const admin_12_1_definition = {
  domain: "admin",
  sequence: 13,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const admin_12_2_definition = {
  domain: "admin",
  sequence: 14,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const admin_12_3_definition = {
  domain: "admin",
  sequence: 15,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const admin_12_4_definition = {
  domain: "admin",
  sequence: 16,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const admin_12_5_definition = {
  domain: "admin",
  sequence: 17,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const admin_12_6_definition = {
  domain: "admin",
  sequence: 18,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const admin_12_7_definition = {
  domain: "admin",
  sequence: 19,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};
