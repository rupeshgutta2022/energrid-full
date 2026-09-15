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

export const crm_24_0_definition = {
  domain: "crm",
  sequence: 24,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const crm_24_1_definition = {
  domain: "crm",
  sequence: 25,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const crm_24_2_definition = {
  domain: "crm",
  sequence: 26,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const crm_24_3_definition = {
  domain: "crm",
  sequence: 27,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const crm_24_4_definition = {
  domain: "crm",
  sequence: 28,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const crm_24_5_definition = {
  domain: "crm",
  sequence: 29,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const crm_24_6_definition = {
  domain: "crm",
  sequence: 30,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const crm_24_7_definition = {
  domain: "crm",
  sequence: 31,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};
