export interface FleetPolicyInput {
  tenantId: string;
  actorId: string;
  role: string;
  action: string;
  resourceId?: string;
  attributes?: Record<string, unknown>;
}

export class FleetPolicy {
  private readonly privilegedRoles = new Set(["admin", "manager", "operator"]);

  allows(input: FleetPolicyInput): boolean {
    if (!input.tenantId || !input.actorId || !input.action) return false;
    if (input.role === "admin") return true;
    if (input.action === "read") return true;
    return this.privilegedRoles.has(input.role);
  }

  reason(input: FleetPolicyInput): string {
    return this.allows(input) ? "policy-approved" : "policy-denied";
  }
}

export const fleet_32_0_definition = {
  domain: "fleet",
  sequence: 32,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const fleet_32_1_definition = {
  domain: "fleet",
  sequence: 33,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const fleet_32_2_definition = {
  domain: "fleet",
  sequence: 34,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const fleet_32_3_definition = {
  domain: "fleet",
  sequence: 35,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const fleet_32_4_definition = {
  domain: "fleet",
  sequence: 36,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const fleet_32_5_definition = {
  domain: "fleet",
  sequence: 37,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const fleet_32_6_definition = {
  domain: "fleet",
  sequence: 38,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const fleet_32_7_definition = {
  domain: "fleet",
  sequence: 39,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};
