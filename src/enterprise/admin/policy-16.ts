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

export const admin_16_0_definition = {
  domain: "admin",
  sequence: 16,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const admin_16_1_definition = {
  domain: "admin",
  sequence: 17,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const admin_16_2_definition = {
  domain: "admin",
  sequence: 18,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const admin_16_3_definition = {
  domain: "admin",
  sequence: 19,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const admin_16_4_definition = {
  domain: "admin",
  sequence: 20,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const admin_16_5_definition = {
  domain: "admin",
  sequence: 21,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const admin_16_6_definition = {
  domain: "admin",
  sequence: 22,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const admin_16_7_definition = {
  domain: "admin",
  sequence: 23,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};
