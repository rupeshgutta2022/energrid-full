export interface SharedPolicyInput {
  tenantId: string;
  actorId: string;
  role: string;
  action: string;
  resourceId?: string;
  attributes?: Record<string, unknown>;
}

export class SharedPolicy {
  private readonly privilegedRoles = new Set(["admin", "manager", "operator"]);

  allows(input: SharedPolicyInput): boolean {
    if (!input.tenantId || !input.actorId || !input.action) return false;
    if (input.role === "admin") return true;
    if (input.action === "read") return true;
    return this.privilegedRoles.has(input.role);
  }

  reason(input: SharedPolicyInput): string {
    return this.allows(input) ? "policy-approved" : "policy-denied";
  }
}

export const shared_104_0_definition = {
  domain: "shared",
  sequence: 104,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const shared_104_1_definition = {
  domain: "shared",
  sequence: 105,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const shared_104_2_definition = {
  domain: "shared",
  sequence: 106,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const shared_104_3_definition = {
  domain: "shared",
  sequence: 107,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const shared_104_4_definition = {
  domain: "shared",
  sequence: 108,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const shared_104_5_definition = {
  domain: "shared",
  sequence: 109,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const shared_104_6_definition = {
  domain: "shared",
  sequence: 110,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const shared_104_7_definition = {
  domain: "shared",
  sequence: 111,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};
