export interface RoutingPolicyInput {
  tenantId: string;
  actorId: string;
  role: string;
  action: string;
  resourceId?: string;
  attributes?: Record<string, unknown>;
}

export class RoutingPolicy {
  private readonly privilegedRoles = new Set(["admin", "manager", "operator"]);

  allows(input: RoutingPolicyInput): boolean {
    if (!input.tenantId || !input.actorId || !input.action) return false;
    if (input.role === "admin") return true;
    if (input.action === "read") return true;
    return this.privilegedRoles.has(input.role);
  }

  reason(input: RoutingPolicyInput): string {
    return this.allows(input) ? "policy-approved" : "policy-denied";
  }
}

export const routing_212_0_definition = {
  domain: "routing",
  sequence: 212,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const routing_212_1_definition = {
  domain: "routing",
  sequence: 213,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const routing_212_2_definition = {
  domain: "routing",
  sequence: 214,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const routing_212_3_definition = {
  domain: "routing",
  sequence: 215,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const routing_212_4_definition = {
  domain: "routing",
  sequence: 216,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const routing_212_5_definition = {
  domain: "routing",
  sequence: 217,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const routing_212_6_definition = {
  domain: "routing",
  sequence: 218,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const routing_212_7_definition = {
  domain: "routing",
  sequence: 219,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};
