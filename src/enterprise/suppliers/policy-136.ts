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

export const suppliers_136_0_definition = {
  domain: "suppliers",
  sequence: 136,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const suppliers_136_1_definition = {
  domain: "suppliers",
  sequence: 137,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const suppliers_136_2_definition = {
  domain: "suppliers",
  sequence: 138,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const suppliers_136_3_definition = {
  domain: "suppliers",
  sequence: 139,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const suppliers_136_4_definition = {
  domain: "suppliers",
  sequence: 140,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const suppliers_136_5_definition = {
  domain: "suppliers",
  sequence: 141,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const suppliers_136_6_definition = {
  domain: "suppliers",
  sequence: 142,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const suppliers_136_7_definition = {
  domain: "suppliers",
  sequence: 143,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};
