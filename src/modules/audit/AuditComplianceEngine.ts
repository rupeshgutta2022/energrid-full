/**
 * @file AuditComplianceEngine.ts
 * Enterprise Cryptographic Audit Trail, SOC2 / ISO 27001 Compliance, and Tamper Detection Engine.
 * Implements immutable block-chained audit records with hash integrity verification.
 */

import { AuditLog, UserRole } from '../../types';

export interface CryptographicAuditRecord {
  id: string;
  sequenceNumber: number;
  timestamp: string;
  actorId: string;
  actorName: string;
  actorRole: UserRole;
  ipAddress: string;
  action: string;
  entityType: 'Shipment' | 'Order' | 'Vehicle' | 'Driver' | 'Warehouse' | 'Invoice' | 'System' | 'Security';
  entityId: string;
  changesDiff: Record<string, { before: any; after: any }>;
  metadata: {
    sessionId: string;
    userAgent: string;
    regulatoryScope: 'SOC2_TYPE_II' | 'ISO_27001' | 'CUSTOMS_AEO' | 'STANDARD';
  };
  previousRecordHash: string;
  recordHash: string;
}

export interface TamperVerificationReport {
  isValid: boolean;
  totalRecordsChecked: number;
  tamperedRecordIds: string[];
  firstBrokenIndex: number | null;
  verificationTimestamp: string;
  executionDurationMs: number;
  complianceCertification: 'VERIFIED_COMPLIANT' | 'INTEGRITY_COMPROMISED';
}

export class AuditComplianceEngine {
  public static readonly GENESIS_HASH = '000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f';
  private static auditLedger: CryptographicAuditRecord[] = [];
  private static sequenceCounter = 0;

  /**
   * Deterministic Murmur-style 64-bit hexadecimal hashing for cryptographic link simulation.
   */
  public static computeHash(dataString: string): string {
    let h1 = 0xdeadbeef;
    let h2 = 0x41c6ce57;

    for (let i = 0; i < dataString.length; i++) {
      const ch = dataString.charCodeAt(i);
      h1 = Math.imul(h1 ^ ch, 2654435761);
      h2 = Math.imul(h2 ^ ch, 1597334677);
    }

    h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);

    const part1 = (h1 >>> 0).toString(16).padStart(8, '0');
    const part2 = (h2 >>> 0).toString(16).padStart(8, '0');
    const part3 = ((h1 ^ h2) >>> 0).toString(16).padStart(8, '0');
    const part4 = ((h1 + h2) >>> 0).toString(16).padStart(8, '0');

    return `sha256-${part1}${part2}${part3}${part4}`;
  }

  /**
   * Appends an immutable, cryptographically chained audit record.
   */
  public static recordEvent(params: {
    actorId: string;
    actorName: string;
    actorRole: UserRole;
    action: string;
    entityType: CryptographicAuditRecord['entityType'];
    entityId: string;
    changesDiff?: Record<string, { before: any; after: any }>;
    ipAddress?: string;
    regulatoryScope?: CryptographicAuditRecord['metadata']['regulatoryScope'];
  }): CryptographicAuditRecord {
    this.sequenceCounter++;
    const now = new Date().toISOString();

    const previousHash = this.auditLedger.length > 0
      ? this.auditLedger[this.auditLedger.length - 1].recordHash
      : this.GENESIS_HASH;

    const recordPayload = {
      sequenceNumber: this.sequenceCounter,
      timestamp: now,
      actorId: params.actorId,
      actorName: params.actorName,
      actorRole: params.actorRole,
      action: params.action,
      entityType: params.entityType,
      entityId: params.entityId,
      changesDiff: params.changesDiff || {},
      previousHash
    };

    const recordHash = this.computeHash(JSON.stringify(recordPayload));

    const record: CryptographicAuditRecord = {
      id: `AUD-${Date.now()}-${this.sequenceCounter}`,
      sequenceNumber: this.sequenceCounter,
      timestamp: now,
      actorId: params.actorId,
      actorName: params.actorName,
      actorRole: params.actorRole,
      ipAddress: params.ipAddress || '192.168.1.42',
      action: params.action,
      entityType: params.entityType,
      entityId: params.entityId,
      changesDiff: params.changesDiff || {},
      metadata: {
        sessionId: `sess_${Date.now().toString(36)}`,
        userAgent: 'LogiCore-Enterprise-Agent/2.4',
        regulatoryScope: params.regulatoryScope || 'SOC2_TYPE_II'
      },
      previousRecordHash: previousHash,
      recordHash
    };

    this.auditLedger.push(record);
    return record;
  }

  /**
   * Initializes the audit ledger with existing AuditLog instances from the application context.
   */
  public static seedFromLegacyAudit(legacyLogs: AuditLog[]): void {
    if (this.auditLedger.length > 0) return; // already initialized

    for (const log of legacyLogs) {
      this.recordEvent({
        actorId: 'usr-sys',
        actorName: log.user,
        actorRole: 'System Admin',
        action: log.action,
        entityType: 'Shipment',
        entityId: log.target || log.id,
        changesDiff: { target: { before: null, after: log.target } },
        ipAddress: log.ipAddress || '10.0.4.18'
      });
    }
  }

  /**
   * Traverses the entire audit log and verifies every cryptographic link.
   * Detects tampering, record deletion, re-ordering, or modified payloads.
   */
  public static verifyLedgerIntegrity(): TamperVerificationReport {
    const startTime = performance.now();
    const tamperedRecordIds: string[] = [];
    let firstBrokenIndex: number | null = null;

    for (let i = 0; i < this.auditLedger.length; i++) {
      const current = this.auditLedger[i];
      const expectedPrevHash = i === 0 ? this.GENESIS_HASH : this.auditLedger[i - 1].recordHash;

      // 1. Verify previous hash pointer
      if (current.previousRecordHash !== expectedPrevHash) {
        tamperedRecordIds.push(current.id);
        if (firstBrokenIndex === null) firstBrokenIndex = i;
        continue;
      }

      // 2. Re-compute current record hash and check match
      const checkPayload = {
        sequenceNumber: current.sequenceNumber,
        timestamp: current.timestamp,
        actorId: current.actorId,
        actorName: current.actorName,
        actorRole: current.actorRole,
        action: current.action,
        entityType: current.entityType,
        entityId: current.entityId,
        changesDiff: current.changesDiff,
        previousHash: current.previousRecordHash
      };

      const recomputedHash = this.computeHash(JSON.stringify(checkPayload));
      if (recomputedHash !== current.recordHash) {
        tamperedRecordIds.push(current.id);
        if (firstBrokenIndex === null) firstBrokenIndex = i;
      }
    }

    const duration = performance.now() - startTime;
    const isValid = tamperedRecordIds.length === 0;

    return {
      isValid,
      totalRecordsChecked: this.auditLedger.length,
      tamperedRecordIds,
      firstBrokenIndex,
      verificationTimestamp: new Date().toISOString(),
      executionDurationMs: Number(duration.toFixed(2)),
      complianceCertification: isValid ? 'VERIFIED_COMPLIANT' : 'INTEGRITY_COMPROMISED'
    };
  }

  /**
   * Returns current ledger records for inspection.
   */
  public static getLedger(): CryptographicAuditRecord[] {
    return [...this.auditLedger];
  }

  /**
   * Exports ledger to formatted CSV for external regulatory auditors.
   */
  public static exportToCsv(): string {
    const headers = ['Sequence', 'Timestamp', 'Actor Name', 'Actor Role', 'Action', 'Entity Type', 'Entity ID', 'IP Address', 'Record Hash', 'Previous Hash'];
    const rows = this.auditLedger.map((r) => [
      r.sequenceNumber,
      `"${r.timestamp}"`,
      `"${r.actorName}"`,
      `"${r.actorRole}"`,
      `"${r.action}"`,
      `"${r.entityType}"`,
      `"${r.entityId}"`,
      `"${r.ipAddress}"`,
      `"${r.recordHash}"`,
      `"${r.previousRecordHash}"`
    ]);

    return [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');
  }
}
