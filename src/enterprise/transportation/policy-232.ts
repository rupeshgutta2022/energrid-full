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

export const transportation_232_0_definition = {
  domain: "transportation",
  sequence: 232,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const transportation_232_1_definition = {
  domain: "transportation",
  sequence: 233,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const transportation_232_2_definition = {
  domain: "transportation",
  sequence: 234,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const transportation_232_3_definition = {
  domain: "transportation",
  sequence: 235,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const transportation_232_4_definition = {
  domain: "transportation",
  sequence: 236,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};
