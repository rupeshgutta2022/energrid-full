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

export const fleet_48_0_definition = {
  domain: "fleet",
  sequence: 48,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const fleet_48_1_definition = {
  domain: "fleet",
  sequence: 49,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const fleet_48_2_definition = {
  domain: "fleet",
  sequence: 50,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const fleet_48_3_definition = {
  domain: "fleet",
  sequence: 51,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const fleet_48_4_definition = {
  domain: "fleet",
  sequence: 52,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const fleet_48_5_definition = {
  domain: "fleet",
  sequence: 53,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const fleet_48_6_definition = {
  domain: "fleet",
  sequence: 54,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const fleet_48_7_definition = {
  domain: "fleet",
  sequence: 55,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};
