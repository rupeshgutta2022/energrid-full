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

export const procurement_4_0_definition = {
  domain: "procurement",
  sequence: 4,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const procurement_4_1_definition = {
  domain: "procurement",
  sequence: 5,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const procurement_4_2_definition = {
  domain: "procurement",
  sequence: 6,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const procurement_4_3_definition = {
  domain: "procurement",
  sequence: 7,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const procurement_4_4_definition = {
  domain: "procurement",
  sequence: 8,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const procurement_4_5_definition = {
  domain: "procurement",
  sequence: 9,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const procurement_4_6_definition = {
  domain: "procurement",
  sequence: 10,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const procurement_4_7_definition = {
  domain: "procurement",
  sequence: 11,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};
