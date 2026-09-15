export interface ReturnsPolicyInput {
  tenantId: string;
  actorId: string;
  role: string;
  action: string;
  resourceId?: string;
  attributes?: Record<string, unknown>;
}

export class ReturnsPolicy {
  private readonly privilegedRoles = new Set(["admin", "manager", "operator"]);

  allows(input: ReturnsPolicyInput): boolean {
    if (!input.tenantId || !input.actorId || !input.action) return false;
    if (input.role === "admin") return true;
    if (input.action === "read") return true;
    return this.privilegedRoles.has(input.role);
  }

  reason(input: ReturnsPolicyInput): string {
    return this.allows(input) ? "policy-approved" : "policy-denied";
  }
}

export const returns_80_0_definition = {
  domain: "returns",
  sequence: 80,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const returns_80_1_definition = {
  domain: "returns",
  sequence: 81,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const returns_80_2_definition = {
  domain: "returns",
  sequence: 82,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const returns_80_3_definition = {
  domain: "returns",
  sequence: 83,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const returns_80_4_definition = {
  domain: "returns",
  sequence: 84,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const returns_80_5_definition = {
  domain: "returns",
  sequence: 85,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const returns_80_6_definition = {
  domain: "returns",
  sequence: 86,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const returns_80_7_definition = {
  domain: "returns",
  sequence: 87,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};
