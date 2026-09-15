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

export const admin_44_0_definition = {
  domain: "admin",
  sequence: 44,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const admin_44_1_definition = {
  domain: "admin",
  sequence: 45,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const admin_44_2_definition = {
  domain: "admin",
  sequence: 46,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const admin_44_3_definition = {
  domain: "admin",
  sequence: 47,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const admin_44_4_definition = {
  domain: "admin",
  sequence: 48,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const admin_44_5_definition = {
  domain: "admin",
  sequence: 49,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const admin_44_6_definition = {
  domain: "admin",
  sequence: 50,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const admin_44_7_definition = {
  domain: "admin",
  sequence: 51,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};
