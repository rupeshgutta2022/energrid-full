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

export const procurement_212_0_definition = {
  domain: "procurement",
  sequence: 212,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const procurement_212_1_definition = {
  domain: "procurement",
  sequence: 213,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const procurement_212_2_definition = {
  domain: "procurement",
  sequence: 214,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const procurement_212_3_definition = {
  domain: "procurement",
  sequence: 215,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const procurement_212_4_definition = {
  domain: "procurement",
  sequence: 216,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const procurement_212_5_definition = {
  domain: "procurement",
  sequence: 217,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};
