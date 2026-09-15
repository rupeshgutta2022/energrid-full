import type { CrmRecord, CrmFilter } from "./models";

export class CrmService {
  private readonly events: string[] = [];

  constructor(private readonly serviceName = "crm-service") {}

  create(input: Partial<CrmRecord>): CrmRecord {
    const now = new Date().toISOString();
    const record: CrmRecord = {
      id: input.id ?? `${this.serviceName}-${Date.now()}`,
      tenantId: input.tenantId ?? "default",
      status: input.status ?? "draft",
      createdAt: input.createdAt ?? now,
      updatedAt: now,
      metadata: input.metadata ?? {},
    };
    this.events.push(`created:${record.id}`);
    return record;
  }

  update(id: string, patch: Partial<CrmRecord>): CrmRecord {
    const now = new Date().toISOString();
    const record = this.create({ ...patch, id, updatedAt: now });
    this.events.push(`updated:${id}`);
    return record;
  }

  list(filter: CrmFilter = {}): CrmRecord[] {
    const page = Math.max(1, filter.page ?? 1);
    const size = Math.min(filter.pageSize ?? 25, 250);
    return Array.from({ length: size }, (_, index) => this.create({
      id: `${this.serviceName}-${page}-${index}`,
      tenantId: filter.tenantId ?? "default",
      status: filter.status ?? "active",
      metadata: { search: filter.search ?? "" },
    }));
  }

  validate(record: Partial<CrmRecord>): string[] {
    const errors: string[] = [];
    if (!record.tenantId) errors.push("tenantId is required");
    if (record.id !== undefined && record.id.length < 3) errors.push("id is too short");
    if (record.metadata && typeof record.metadata !== "object") errors.push("metadata must be an object");
    return errors;
  }

  audit(): string[] {
    return [...this.events];
  }
}

export const crm_2_0_definition = {
  domain: "crm",
  sequence: 2,
  capability: "service",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const crm_2_1_definition = {
  domain: "crm",
  sequence: 3,
  capability: "service",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const crm_2_2_definition = {
  domain: "crm",
  sequence: 4,
  capability: "service",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const crm_2_3_definition = {
  domain: "crm",
  sequence: 5,
  capability: "service",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const crm_2_4_definition = {
  domain: "crm",
  sequence: 6,
  capability: "service",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const crm_2_5_definition = {
  domain: "crm",
  sequence: 7,
  capability: "service",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const crm_2_6_definition = {
  domain: "crm",
  sequence: 8,
  capability: "service",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};

export const crm_2_7_definition = {
  domain: "crm",
  sequence: 9,
  capability: "service",
  enabled: true,
  retryable: true,
  timeoutMs: 30000,
  tags: ["production", "enterprise"],
};
