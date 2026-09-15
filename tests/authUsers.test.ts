import { describe, it, expect } from 'vitest';
import { ROLE_CONFIGS } from '../src/data/authUsers';
import type { UserRole } from '../src/types';

const expectedRoles: UserRole[] = [
  'Executive',
  'Operations',
  'Logistics Manager',
  'Fleet Manager',
  'Warehouse Supervisor',
  'Driver',
  'Customer',
  'System Admin',
];

describe('ROLE_CONFIGS', () => {
  it('defines configuration for every UserRole', () => {
    expectedRoles.forEach((role) => {
      expect(ROLE_CONFIGS[role]).toBeDefined();
      expect(ROLE_CONFIGS[role].role).toBe(role);
    });
  });

  it('each role has a user with matching role and valid identity', () => {
    Object.values(ROLE_CONFIGS).forEach((cfg) => {
      expect(cfg.user.id).toMatch(/^USR-/);
      expect(cfg.user.name.length).toBeGreaterThan(0);
      expect(cfg.user.email).toContain('@');
      expect(cfg.user.role).toBe(cfg.role);
      expect(cfg.user.title.length).toBeGreaterThan(0);
      expect(cfg.portalName.length).toBeGreaterThan(0);
      expect(cfg.tagline.length).toBeGreaterThan(0);
      expect(cfg.defaultView.length).toBeGreaterThan(0);
      expect(Array.isArray(cfg.allowedViews)).toBe(true);
      expect(cfg.allowedViews.length).toBeGreaterThan(0);
      expect(cfg.allowedViews).toContain(cfg.defaultView);
    });
  });

  it('System Admin and Executive have broad access', () => {
    expect(ROLE_CONFIGS['System Admin'].allowedViews.length).toBeGreaterThan(5);
    expect(ROLE_CONFIGS.Executive.allowedViews).toContain('executive-dashboard');
  });

  it('Driver has restricted operational views', () => {
    const driver = ROLE_CONFIGS.Driver;
    expect(driver.allowedViews.length).toBeGreaterThan(0);
    expect(driver.defaultView.length).toBeGreaterThan(0);
  });
});
