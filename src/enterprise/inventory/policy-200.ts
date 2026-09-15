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

export const inventory_200_0_definition = {
  domain: "inventory",
  sequence: 200,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const inventory_200_1_definition = {
  domain: "inventory",
  sequence: 201,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const inventory_200_2_definition = {
  domain: "inventory",
  sequence: 202,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const inventory_200_3_definition = {
  domain: "inventory",
  sequence: 203,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const inventory_200_4_definition = {
  domain: "inventory",
  sequence: 204,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const inventory_200_5_definition = {
  domain: "inventory",
  sequence: 205,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const inventory_200_6_definition = {
  domain: "inventory",
  sequence: 206,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const inventory_200_7_definition = {
  domain: "inventory",
  sequence: 207,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};
