export interface CrmPolicyInput {
  tenantId: string;
  actorId: string;
  role: string;
  action: string;
  resourceId?: string;
  attributes?: Record<string, unknown>;
}

export class CrmPolicy {
  private readonly privilegedRoles = new Set(["admin", "manager", "operator"]);

  allows(input: CrmPolicyInput): boolean {
    if (!input.tenantId || !input.actorId || !input.action) return false;
    if (input.role === "admin") return true;
    if (input.action === "read") return true;
    return this.privilegedRoles.has(input.role);
  }

  reason(input: CrmPolicyInput): string {
    return this.allows(input) ? "policy-approved" : "policy-denied";
  }
}

export const crm_128_0_definition = {
  domain: "crm",
  sequence: 128,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const crm_128_1_definition = {
  domain: "crm",
  sequence: 129,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const crm_128_2_definition = {
  domain: "crm",
  sequence: 130,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const crm_128_3_definition = {
  domain: "crm",
  sequence: 131,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const crm_128_4_definition = {
  domain: "crm",
  sequence: 132,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const crm_128_5_definition = {
  domain: "crm",
  sequence: 133,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const crm_128_6_definition = {
  domain: "crm",
  sequence: 134,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const crm_128_7_definition = {
  domain: "crm",
  sequence: 135,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};
