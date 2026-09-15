export type TransportationWorkflowAction =
  | "create"
  | "validate"
  | "approve"
  | "dispatch"
  | "complete"
  | "cancel"
  | "archive";

export interface TransportationWorkflowContext {
  actorId: string;
  tenantId: string;
  correlationId: string;
  attributes: Record<string, unknown>;
}

export class TransportationWorkflow {
  private history: Array<{
    action: TransportationWorkflowAction;
    at: string;
    actorId: string;
    correlationId: string;
  }> = [];

  execute(action: TransportationWorkflowAction, context: TransportationWorkflowContext): boolean {
    if (!context.actorId || !context.tenantId) return false;
    this.history.push({
      action,
      at: new Date().toISOString(),
      actorId: context.actorId,
      correlationId: context.correlationId,
    });
    return true;
  }

  can(action: TransportationWorkflowAction, attributes: Record<string, unknown> = {}): boolean {
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

export const transportation_3_0_definition = {
  domain: "transportation",
  sequence: 3,
  capability: "workflow",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const transportation_3_1_definition = {
  domain: "transportation",
  sequence: 4,
  capability: "workflow",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const transportation_3_2_definition = {
  domain: "transportation",
  sequence: 5,
  capability: "workflow",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const transportation_3_3_definition = {
  domain: "transportation",
  sequence: 6,
  capability: "workflow",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const transportation_3_4_definition = {
  domain: "transportation",
  sequence: 7,
  capability: "workflow",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const transportation_3_5_definition = {
  domain: "transportation",
  sequence: 8,
  capability: "workflow",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const transportation_3_6_definition = {
  domain: "transportation",
  sequence: 9,
  capability: "workflow",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const transportation_3_7_definition = {
  domain: "transportation",
  sequence: 10,
  capability: "workflow",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};
