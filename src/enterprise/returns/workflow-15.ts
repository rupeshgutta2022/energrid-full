export type ReturnsWorkflowAction =
  | "create"
  | "validate"
  | "approve"
  | "dispatch"
  | "complete"
  | "cancel"
  | "archive";

export interface ReturnsWorkflowContext {
  actorId: string;
  tenantId: string;
  correlationId: string;
  attributes: Record<string, unknown>;
}

export class ReturnsWorkflow {
  private history: Array<{
    action: ReturnsWorkflowAction;
    at: string;
    actorId: string;
    correlationId: string;
  }> = [];

  execute(action: ReturnsWorkflowAction, context: ReturnsWorkflowContext): boolean {
    if (!context.actorId || !context.tenantId) return false;
    this.history.push({
      action,
      at: new Date().toISOString(),
      actorId: context.actorId,
      correlationId: context.correlationId,
    });
    return true;
  }

  can(action: ReturnsWorkflowAction, attributes: Record<string, unknown> = {}): boolean {
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

export const returns_15_0_definition = {
  domain: "returns",
  sequence: 15,
  capability: "workflow",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const returns_15_1_definition = {
  domain: "returns",
  sequence: 16,
  capability: "workflow",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const returns_15_2_definition = {
  domain: "returns",
  sequence: 17,
  capability: "workflow",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const returns_15_3_definition = {
  domain: "returns",
  sequence: 18,
  capability: "workflow",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const returns_15_4_definition = {
  domain: "returns",
  sequence: 19,
  capability: "workflow",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const returns_15_5_definition = {
  domain: "returns",
  sequence: 20,
  capability: "workflow",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const returns_15_6_definition = {
  domain: "returns",
  sequence: 21,
  capability: "workflow",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const returns_15_7_definition = {
  domain: "returns",
  sequence: 22,
  capability: "workflow",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};
