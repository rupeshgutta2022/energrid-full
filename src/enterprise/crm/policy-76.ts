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

export const crm_76_0_definition = {
  domain: "crm",
  sequence: 76,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const crm_76_1_definition = {
  domain: "crm",
  sequence: 77,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const crm_76_2_definition = {
  domain: "crm",
  sequence: 78,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const crm_76_3_definition = {
  domain: "crm",
  sequence: 79,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const crm_76_4_definition = {
  domain: "crm",
  sequence: 80,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const crm_76_5_definition = {
  domain: "crm",
  sequence: 81,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const crm_76_6_definition = {
  domain: "crm",
  sequence: 82,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const crm_76_7_definition = {
  domain: "crm",
  sequence: 83,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};
