import { describe, it, expect } from 'vitest';
import { facilities, solarAssets, windAssets } from '../src/energrid/data/demoData';

describe('demoData', () => {
  it('has facilities and assets', () => {
    expect(facilities.length).toBeGreaterThan(0);
    expect(solarAssets.length).toBe(52);
    expect(windAssets.length).toBe(32);
  });
});
