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

export const warehouse_240_0_definition = {
  domain: "warehouse",
  sequence: 240,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const warehouse_240_1_definition = {
  domain: "warehouse",
  sequence: 241,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const warehouse_240_2_definition = {
  domain: "warehouse",
  sequence: 242,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const warehouse_240_3_definition = {
  domain: "warehouse",
  sequence: 243,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const warehouse_240_4_definition = {
  domain: "warehouse",
  sequence: 244,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const warehouse_240_5_definition = {
  domain: "warehouse",
  sequence: 245,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const warehouse_240_6_definition = {
  domain: "warehouse",
  sequence: 246,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const warehouse_240_7_definition = {
  domain: "warehouse",
  sequence: 247,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};
