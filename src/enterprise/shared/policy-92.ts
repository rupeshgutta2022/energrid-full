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

export const shared_92_0_definition = {
  domain: "shared",
  sequence: 92,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const shared_92_1_definition = {
  domain: "shared",
  sequence: 93,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const shared_92_2_definition = {
  domain: "shared",
  sequence: 94,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const shared_92_3_definition = {
  domain: "shared",
  sequence: 95,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const shared_92_4_definition = {
  domain: "shared",
  sequence: 96,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const shared_92_5_definition = {
  domain: "shared",
  sequence: 97,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const shared_92_6_definition = {
  domain: "shared",
  sequence: 98,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const shared_92_7_definition = {
  domain: "shared",
  sequence: 99,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};
