export interface InventoryPolicyInput {
  tenantId: string;
  actorId: string;
  role: string;
  action: string;
  resourceId?: string;
  attributes?: Record<string, unknown>;
}

export class InventoryPolicy {
  private readonly privilegedRoles = new Set(["admin", "manager", "operator"]);

  allows(input: InventoryPolicyInput): boolean {
    if (!input.tenantId || !input.actorId || !input.action) return false;
    if (input.role === "admin") return true;
    if (input.action === "read") return true;
    return this.privilegedRoles.has(input.role);
  }

  reason(input: InventoryPolicyInput): string {
    return this.allows(input) ? "policy-approved" : "policy-denied";
  }
}

export const inventory_20_0_definition = {
  domain: "inventory",
  sequence: 20,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const inventory_20_1_definition = {
  domain: "inventory",
  sequence: 21,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const inventory_20_2_definition = {
  domain: "inventory",
  sequence: 22,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const inventory_20_3_definition = {
  domain: "inventory",
  sequence: 23,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const inventory_20_4_definition = {
  domain: "inventory",
  sequence: 24,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const inventory_20_5_definition = {
  domain: "inventory",
  sequence: 25,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const inventory_20_6_definition = {
  domain: "inventory",
  sequence: 26,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const inventory_20_7_definition = {
  domain: "inventory",
  sequence: 27,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};
