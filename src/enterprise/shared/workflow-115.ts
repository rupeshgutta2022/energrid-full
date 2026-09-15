export type SharedWorkflowAction =
  | "create"
  | "validate"
  | "approve"
  | "dispatch"
  | "complete"
  | "cancel"
  | "archive";

export interface SharedWorkflowContext {
  actorId: string;
  tenantId: string;
  correlationId: string;
  attributes: Record<string, unknown>;
}

export class SharedWorkflow {
  private history: Array<{
    action: SharedWorkflowAction;
    at: string;
    actorId: string;
    correlationId: string;
  }> = [];

  execute(action: SharedWorkflowAction, context: SharedWorkflowContext): boolean {
    if (!context.actorId || !context.tenantId) return false;
    this.history.push({
      action,
      at: new Date().toISOString(),
      actorId: context.actorId,
      correlationId: context.correlationId,
    });
    return true;
  }

  can(action: SharedWorkflowAction, attributes: Record<string, unknown> = {}): boolean {
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

export const shared_115_0_definition = {
  domain: "shared",
  sequence: 115,
  capability: "workflow",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const shared_115_1_definition = {
  domain: "shared",
  sequence: 116,
  capability: "workflow",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const shared_115_2_definition = {
  domain: "shared",
  sequence: 117,
  capability: "workflow",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const shared_115_3_definition = {
  domain: "shared",
  sequence: 118,
  capability: "workflow",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const shared_115_4_definition = {
  domain: "shared",
  sequence: 119,
  capability: "workflow",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const shared_115_5_definition = {
  domain: "shared",
  sequence: 120,
  capability: "workflow",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const shared_115_6_definition = {
  domain: "shared",
  sequence: 121,
  capability: "workflow",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const shared_115_7_definition = {
  domain: "shared",
  sequence: 122,
  capability: "workflow",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};
