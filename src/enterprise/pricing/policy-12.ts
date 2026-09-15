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

export const pricing_12_0_definition = {
  domain: "pricing",
  sequence: 12,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const pricing_12_1_definition = {
  domain: "pricing",
  sequence: 13,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const pricing_12_2_definition = {
  domain: "pricing",
  sequence: 14,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const pricing_12_3_definition = {
  domain: "pricing",
  sequence: 15,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const pricing_12_4_definition = {
  domain: "pricing",
  sequence: 16,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const pricing_12_5_definition = {
  domain: "pricing",
  sequence: 17,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const pricing_12_6_definition = {
  domain: "pricing",
  sequence: 18,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const pricing_12_7_definition = {
  domain: "pricing",
  sequence: 19,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};
