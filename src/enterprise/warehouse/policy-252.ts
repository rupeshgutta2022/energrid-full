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

export const warehouse_252_0_definition = {
  domain: "warehouse",
  sequence: 252,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const warehouse_252_1_definition = {
  domain: "warehouse",
  sequence: 253,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const warehouse_252_2_definition = {
  domain: "warehouse",
  sequence: 254,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const warehouse_252_3_definition = {
  domain: "warehouse",
  sequence: 255,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};
