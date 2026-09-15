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

export const warehouse_24_0_definition = {
  domain: "warehouse",
  sequence: 24,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const warehouse_24_1_definition = {
  domain: "warehouse",
  sequence: 25,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const warehouse_24_2_definition = {
  domain: "warehouse",
  sequence: 26,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const warehouse_24_3_definition = {
  domain: "warehouse",
  sequence: 27,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const warehouse_24_4_definition = {
  domain: "warehouse",
  sequence: 28,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const warehouse_24_5_definition = {
  domain: "warehouse",
  sequence: 29,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const warehouse_24_6_definition = {
  domain: "warehouse",
  sequence: 30,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const warehouse_24_7_definition = {
  domain: "warehouse",
  sequence: 31,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};
