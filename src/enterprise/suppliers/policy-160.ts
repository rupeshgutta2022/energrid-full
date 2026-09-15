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

export const suppliers_160_0_definition = {
  domain: "suppliers",
  sequence: 160,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const suppliers_160_1_definition = {
  domain: "suppliers",
  sequence: 161,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const suppliers_160_2_definition = {
  domain: "suppliers",
  sequence: 162,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const suppliers_160_3_definition = {
  domain: "suppliers",
  sequence: 163,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const suppliers_160_4_definition = {
  domain: "suppliers",
  sequence: 164,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};
