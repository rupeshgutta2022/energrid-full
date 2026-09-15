import { describe, it, expect } from 'vitest';
import { energyTokens } from '../src/energrid/theme/tokens';

describe('energyTokens', () => {
  it('has layout and colors', () => {
    expect(energyTokens.layout.sidebarWidth).toBe(264);
    expect(energyTokens.colors.green).toMatch(/^#/);
  });
});
