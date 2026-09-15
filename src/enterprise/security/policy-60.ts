export interface SecurityPolicyInput {
  tenantId: string;
  actorId: string;
  role: string;
  action: string;
  resourceId?: string;
  attributes?: Record<string, unknown>;
}

export class SecurityPolicy {
  private readonly privilegedRoles = new Set(["admin", "manager", "operator"]);

  allows(input: SecurityPolicyInput): boolean {
    if (!input.tenantId || !input.actorId || !input.action) return false;
    if (input.role === "admin") return true;
    if (input.action === "read") return true;
    return this.privilegedRoles.has(input.role);
  }

  reason(input: SecurityPolicyInput): string {
    return this.allows(input) ? "policy-approved" : "policy-denied";
  }
}

export const security_60_0_definition = {
  domain: "security",
  sequence: 60,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const security_60_1_definition = {
  domain: "security",
  sequence: 61,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const security_60_2_definition = {
  domain: "security",
  sequence: 62,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const security_60_3_definition = {
  domain: "security",
  sequence: 63,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const security_60_4_definition = {
  domain: "security",
  sequence: 64,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const security_60_5_definition = {
  domain: "security",
  sequence: 65,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const security_60_6_definition = {
  domain: "security",
  sequence: 66,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const security_60_7_definition = {
  domain: "security",
  sequence: 67,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};
