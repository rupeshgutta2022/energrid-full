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

export const fleet_236_0_definition = {
  domain: "fleet",
  sequence: 236,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const fleet_236_1_definition = {
  domain: "fleet",
  sequence: 237,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const fleet_236_2_definition = {
  domain: "fleet",
  sequence: 238,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};
