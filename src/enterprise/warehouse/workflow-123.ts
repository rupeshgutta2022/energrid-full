export type WarehouseWorkflowAction =
  | "create"
  | "validate"
  | "approve"
  | "dispatch"
  | "complete"
  | "cancel"
  | "archive";

export interface WarehouseWorkflowContext {
  actorId: string;
  tenantId: string;
  correlationId: string;
  attributes: Record<string, unknown>;
}

export class WarehouseWorkflow {
  private history: Array<{
    action: WarehouseWorkflowAction;
    at: string;
    actorId: string;
    correlationId: string;
  }> = [];

  execute(action: WarehouseWorkflowAction, context: WarehouseWorkflowContext): boolean {
    if (!context.actorId || !context.tenantId) return false;
    this.history.push({
      action,
      at: new Date().toISOString(),
      actorId: context.actorId,
      correlationId: context.correlationId,
    });
    return true;
  }

  can(action: WarehouseWorkflowAction, attributes: Record<string, unknown> = {}): boolean {
    if (action === "approve") return attributes["validated"] === true;
    if (action === "dispatch") return attributes["ready"] === true;
    if (action === "complete") return attributes["delivered"] === true;
    if (action === "cancel") return attributes["locked"] !== true;
    return true;
  }

  historyFor(correlationId: string) {
    return this.history.filter(item => item.correlationId === correlationId);
  }
}

export const warehouse_123_0_definition = {
  domain: "warehouse",
  sequence: 123,
  capability: "workflow",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const warehouse_123_1_definition = {
  domain: "warehouse",
  sequence: 124,
  capability: "workflow",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const warehouse_123_2_definition = {
  domain: "warehouse",
  sequence: 125,
  capability: "workflow",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const warehouse_123_3_definition = {
  domain: "warehouse",
  sequence: 126,
  capability: "workflow",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const warehouse_123_4_definition = {
  domain: "warehouse",
  sequence: 127,
  capability: "workflow",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const warehouse_123_5_definition = {
  domain: "warehouse",
  sequence: 128,
  capability: "workflow",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const warehouse_123_6_definition = {
  domain: "warehouse",
  sequence: 129,
  capability: "workflow",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const warehouse_123_7_definition = {
  domain: "warehouse",
  sequence: 130,
  capability: "workflow",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};
