import { describe, it, expect } from 'vitest';
import { enerGridRoutes } from '../src/energrid/pageRegistry';

describe('enerGridRoutes', () => {
  it('includes core routes', () => {
    expect(enerGridRoutes).toContain('Operations Dashboard');
    expect(enerGridRoutes).toContain('Solar Assets');
    expect(enerGridRoutes.length).toBeGreaterThan(5);
  });
});
