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

export const admin_80_0_definition = {
  domain: "admin",
  sequence: 80,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const admin_80_1_definition = {
  domain: "admin",
  sequence: 81,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const admin_80_2_definition = {
  domain: "admin",
  sequence: 82,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const admin_80_3_definition = {
  domain: "admin",
  sequence: 83,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const admin_80_4_definition = {
  domain: "admin",
  sequence: 84,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const admin_80_5_definition = {
  domain: "admin",
  sequence: 85,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const admin_80_6_definition = {
  domain: "admin",
  sequence: 86,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const admin_80_7_definition = {
  domain: "admin",
  sequence: 87,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};
