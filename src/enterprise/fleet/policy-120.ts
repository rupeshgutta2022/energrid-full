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

export const fleet_120_0_definition = {
  domain: "fleet",
  sequence: 120,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const fleet_120_1_definition = {
  domain: "fleet",
  sequence: 121,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const fleet_120_2_definition = {
  domain: "fleet",
  sequence: 122,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const fleet_120_3_definition = {
  domain: "fleet",
  sequence: 123,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const fleet_120_4_definition = {
  domain: "fleet",
  sequence: 124,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const fleet_120_5_definition = {
  domain: "fleet",
  sequence: 125,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const fleet_120_6_definition = {
  domain: "fleet",
  sequence: 126,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const fleet_120_7_definition = {
  domain: "fleet",
  sequence: 127,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};
