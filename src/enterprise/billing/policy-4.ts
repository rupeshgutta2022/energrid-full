export interface BillingPolicyInput {
  tenantId: string;
  actorId: string;
  role: string;
  action: string;
  resourceId?: string;
  attributes?: Record<string, unknown>;
}

export class BillingPolicy {
  private readonly privilegedRoles = new Set(["admin", "manager", "operator"]);

  allows(input: BillingPolicyInput): boolean {
    if (!input.tenantId || !input.actorId || !input.action) return false;
    if (input.role === "admin") return true;
    if (input.action === "read") return true;
    return this.privilegedRoles.has(input.role);
  }

  reason(input: BillingPolicyInput): string {
    return this.allows(input) ? "policy-approved" : "policy-denied";
  }
}

export const billing_4_0_definition = {
  domain: "billing",
  sequence: 4,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const billing_4_1_definition = {
  domain: "billing",
  sequence: 5,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const billing_4_2_definition = {
  domain: "billing",
  sequence: 6,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const billing_4_3_definition = {
  domain: "billing",
  sequence: 7,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const billing_4_4_definition = {
  domain: "billing",
  sequence: 8,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const billing_4_5_definition = {
  domain: "billing",
  sequence: 9,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const billing_4_6_definition = {
  domain: "billing",
  sequence: 10,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const billing_4_7_definition = {
  domain: "billing",
  sequence: 11,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};
