export interface PricingPolicyInput {
  tenantId: string;
  actorId: string;
  role: string;
  action: string;
  resourceId?: string;
  attributes?: Record<string, unknown>;
}

export class PricingPolicy {
  private readonly privilegedRoles = new Set(["admin", "manager", "operator"]);

  allows(input: PricingPolicyInput): boolean {
    if (!input.tenantId || !input.actorId || !input.action) return false;
    if (input.role === "admin") return true;
    if (input.action === "read") return true;
    return this.privilegedRoles.has(input.role);
  }

  reason(input: PricingPolicyInput): string {
    return this.allows(input) ? "policy-approved" : "policy-denied";
  }
}

export const pricing_128_0_definition = {
  domain: "pricing",
  sequence: 128,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const pricing_128_1_definition = {
  domain: "pricing",
  sequence: 129,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const pricing_128_2_definition = {
  domain: "pricing",
  sequence: 130,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const pricing_128_3_definition = {
  domain: "pricing",
  sequence: 131,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const pricing_128_4_definition = {
  domain: "pricing",
  sequence: 132,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const pricing_128_5_definition = {
  domain: "pricing",
  sequence: 133,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const pricing_128_6_definition = {
  domain: "pricing",
  sequence: 134,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const pricing_128_7_definition = {
  domain: "pricing",
  sequence: 135,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};
