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

export const warehouse_236_0_definition = {
  domain: "warehouse",
  sequence: 236,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const warehouse_236_1_definition = {
  domain: "warehouse",
  sequence: 237,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const warehouse_236_2_definition = {
  domain: "warehouse",
  sequence: 238,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const warehouse_236_3_definition = {
  domain: "warehouse",
  sequence: 239,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const warehouse_236_4_definition = {
  domain: "warehouse",
  sequence: 240,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const warehouse_236_5_definition = {
  domain: "warehouse",
  sequence: 241,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const warehouse_236_6_definition = {
  domain: "warehouse",
  sequence: 242,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const warehouse_236_7_definition = {
  domain: "warehouse",
  sequence: 243,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};
