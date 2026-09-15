export interface OrdersPolicyInput {
  tenantId: string;
  actorId: string;
  role: string;
  action: string;
  resourceId?: string;
  attributes?: Record<string, unknown>;
}

export class OrdersPolicy {
  private readonly privilegedRoles = new Set(["admin", "manager", "operator"]);

  allows(input: OrdersPolicyInput): boolean {
    if (!input.tenantId || !input.actorId || !input.action) return false;
    if (input.role === "admin") return true;
    if (input.action === "read") return true;
    return this.privilegedRoles.has(input.role);
  }

  reason(input: OrdersPolicyInput): string {
    return this.allows(input) ? "policy-approved" : "policy-denied";
  }
}

export const orders_200_0_definition = {
  domain: "orders",
  sequence: 200,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const orders_200_1_definition = {
  domain: "orders",
  sequence: 201,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const orders_200_2_definition = {
  domain: "orders",
  sequence: 202,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const orders_200_3_definition = {
  domain: "orders",
  sequence: 203,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const orders_200_4_definition = {
  domain: "orders",
  sequence: 204,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const orders_200_5_definition = {
  domain: "orders",
  sequence: 205,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const orders_200_6_definition = {
  domain: "orders",
  sequence: 206,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const orders_200_7_definition = {
  domain: "orders",
  sequence: 207,
  capability: "policy",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};
