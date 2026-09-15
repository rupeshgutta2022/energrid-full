export interface WarehousePolicyInput {
  tenantId: string;
  actorId: string;
  role: string;
  action: string;
  resourceId?: string;
  attributes?: Record<string, unknown>;
}

export class WarehousePolicy {
  private readonly privilegedRoles = new Set(["admin", "manager", "operator"]);

  allows(input: WarehousePolicyInput): boolean {
    if (!input.tenantId || !input.actorId || !input.action) return false;
    if (input.role === "admin") return true;
    if (input.action === "read") return true;
    return this.privilegedRoles.has(input.role);
  }

  reason(input: WarehousePolicyInput): string {
    return this.allows(input) ? "policy-approved" : "policy-denied";
  }
}

export const warehouse_164_0_definition = {
  domain: "warehouse",
  sequence: 164,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const warehouse_164_1_definition = {
  domain: "warehouse",
  sequence: 165,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const warehouse_164_2_definition = {
  domain: "warehouse",
  sequence: 166,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const warehouse_164_3_definition = {
  domain: "warehouse",
  sequence: 167,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const warehouse_164_4_definition = {
  domain: "warehouse",
  sequence: 168,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const warehouse_164_5_definition = {
  domain: "warehouse",
  sequence: 169,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const warehouse_164_6_definition = {
  domain: "warehouse",
  sequence: 170,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const warehouse_164_7_definition = {
  domain: "warehouse",
  sequence: 171,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};
