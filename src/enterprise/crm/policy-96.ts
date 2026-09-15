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

export const crm_96_0_definition = {
  domain: "crm",
  sequence: 96,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const crm_96_1_definition = {
  domain: "crm",
  sequence: 97,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const crm_96_2_definition = {
  domain: "crm",
  sequence: 98,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const crm_96_3_definition = {
  domain: "crm",
  sequence: 99,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const crm_96_4_definition = {
  domain: "crm",
  sequence: 100,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const crm_96_5_definition = {
  domain: "crm",
  sequence: 101,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const crm_96_6_definition = {
  domain: "crm",
  sequence: 102,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const crm_96_7_definition = {
  domain: "crm",
  sequence: 103,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};
