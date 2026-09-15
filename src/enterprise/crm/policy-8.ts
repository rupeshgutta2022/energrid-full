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

export const crm_8_0_definition = {
  domain: "crm",
  sequence: 8,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const crm_8_1_definition = {
  domain: "crm",
  sequence: 9,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const crm_8_2_definition = {
  domain: "crm",
  sequence: 10,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const crm_8_3_definition = {
  domain: "crm",
  sequence: 11,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const crm_8_4_definition = {
  domain: "crm",
  sequence: 12,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const crm_8_5_definition = {
  domain: "crm",
  sequence: 13,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const crm_8_6_definition = {
  domain: "crm",
  sequence: 14,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const crm_8_7_definition = {
  domain: "crm",
  sequence: 15,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};
