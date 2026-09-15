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

export const billing_180_0_definition = {
  domain: "billing",
  sequence: 180,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const billing_180_1_definition = {
  domain: "billing",
  sequence: 181,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const billing_180_2_definition = {
  domain: "billing",
  sequence: 182,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const billing_180_3_definition = {
  domain: "billing",
  sequence: 183,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const billing_180_4_definition = {
  domain: "billing",
  sequence: 184,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const billing_180_5_definition = {
  domain: "billing",
  sequence: 185,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const billing_180_6_definition = {
  domain: "billing",
  sequence: 186,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const billing_180_7_definition = {
  domain: "billing",
  sequence: 187,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};
