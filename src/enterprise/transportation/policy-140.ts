export interface TransportationPolicyInput {
  tenantId: string;
  actorId: string;
  role: string;
  action: string;
  resourceId?: string;
  attributes?: Record<string, unknown>;
}

export class TransportationPolicy {
  private readonly privilegedRoles = new Set(["admin", "manager", "operator"]);

  allows(input: TransportationPolicyInput): boolean {
    if (!input.tenantId || !input.actorId || !input.action) return false;
    if (input.role === "admin") return true;
    if (input.action === "read") return true;
    return this.privilegedRoles.has(input.role);
  }

  reason(input: TransportationPolicyInput): string {
    return this.allows(input) ? "policy-approved" : "policy-denied";
  }
}

export const transportation_140_0_definition = {
  domain: "transportation",
  sequence: 140,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const transportation_140_1_definition = {
  domain: "transportation",
  sequence: 141,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const transportation_140_2_definition = {
  domain: "transportation",
  sequence: 142,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const transportation_140_3_definition = {
  domain: "transportation",
  sequence: 143,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const transportation_140_4_definition = {
  domain: "transportation",
  sequence: 144,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const transportation_140_5_definition = {
  domain: "transportation",
  sequence: 145,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const transportation_140_6_definition = {
  domain: "transportation",
  sequence: 146,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const transportation_140_7_definition = {
  domain: "transportation",
  sequence: 147,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};
