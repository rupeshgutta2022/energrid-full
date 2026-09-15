export interface SuppliersPolicyInput {
  tenantId: string;
  actorId: string;
  role: string;
  action: string;
  resourceId?: string;
  attributes?: Record<string, unknown>;
}

export class SuppliersPolicy {
  private readonly privilegedRoles = new Set(["admin", "manager", "operator"]);

  allows(input: SuppliersPolicyInput): boolean {
    if (!input.tenantId || !input.actorId || !input.action) return false;
    if (input.role === "admin") return true;
    if (input.action === "read") return true;
    return this.privilegedRoles.has(input.role);
  }

  reason(input: SuppliersPolicyInput): string {
    return this.allows(input) ? "policy-approved" : "policy-denied";
  }
}

export const suppliers_100_0_definition = {
  domain: "suppliers",
  sequence: 100,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const suppliers_100_1_definition = {
  domain: "suppliers",
  sequence: 101,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const suppliers_100_2_definition = {
  domain: "suppliers",
  sequence: 102,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const suppliers_100_3_definition = {
  domain: "suppliers",
  sequence: 103,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const suppliers_100_4_definition = {
  domain: "suppliers",
  sequence: 104,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const suppliers_100_5_definition = {
  domain: "suppliers",
  sequence: 105,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const suppliers_100_6_definition = {
  domain: "suppliers",
  sequence: 106,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const suppliers_100_7_definition = {
  domain: "suppliers",
  sequence: 107,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};
