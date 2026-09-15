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

export const procurement_136_0_definition = {
  domain: "procurement",
  sequence: 136,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const procurement_136_1_definition = {
  domain: "procurement",
  sequence: 137,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const procurement_136_2_definition = {
  domain: "procurement",
  sequence: 138,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const procurement_136_3_definition = {
  domain: "procurement",
  sequence: 139,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const procurement_136_4_definition = {
  domain: "procurement",
  sequence: 140,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const procurement_136_5_definition = {
  domain: "procurement",
  sequence: 141,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const procurement_136_6_definition = {
  domain: "procurement",
  sequence: 142,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const procurement_136_7_definition = {
  domain: "procurement",
  sequence: 143,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};
