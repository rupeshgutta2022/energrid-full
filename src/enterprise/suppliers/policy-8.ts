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

export const suppliers_8_0_definition = {
  domain: "suppliers",
  sequence: 8,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const suppliers_8_1_definition = {
  domain: "suppliers",
  sequence: 9,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const suppliers_8_2_definition = {
  domain: "suppliers",
  sequence: 10,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const suppliers_8_3_definition = {
  domain: "suppliers",
  sequence: 11,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const suppliers_8_4_definition = {
  domain: "suppliers",
  sequence: 12,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const suppliers_8_5_definition = {
  domain: "suppliers",
  sequence: 13,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const suppliers_8_6_definition = {
  domain: "suppliers",
  sequence: 14,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const suppliers_8_7_definition = {
  domain: "suppliers",
  sequence: 15,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};
