export interface ProcurementPolicyInput {
  tenantId: string;
  actorId: string;
  role: string;
  action: string;
  resourceId?: string;
  attributes?: Record<string, unknown>;
}

export class ProcurementPolicy {
  private readonly privilegedRoles = new Set(["admin", "manager", "operator"]);

  allows(input: ProcurementPolicyInput): boolean {
    if (!input.tenantId || !input.actorId || !input.action) return false;
    if (input.role === "admin") return true;
    if (input.action === "read") return true;
    return this.privilegedRoles.has(input.role);
  }

  reason(input: ProcurementPolicyInput): string {
    return this.allows(input) ? "policy-approved" : "policy-denied";
  }
}

export const procurement_36_0_definition = {
  domain: "procurement",
  sequence: 36,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const procurement_36_1_definition = {
  domain: "procurement",
  sequence: 37,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const procurement_36_2_definition = {
  domain: "procurement",
  sequence: 38,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const procurement_36_3_definition = {
  domain: "procurement",
  sequence: 39,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const procurement_36_4_definition = {
  domain: "procurement",
  sequence: 40,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const procurement_36_5_definition = {
  domain: "procurement",
  sequence: 41,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const procurement_36_6_definition = {
  domain: "procurement",
  sequence: 42,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const procurement_36_7_definition = {
  domain: "procurement",
  sequence: 43,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};
