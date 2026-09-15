import { describe, it, expect } from 'vitest';
import { energyService } from '../src/energrid/services/energyService';

describe('energyService', () => {
  it('returns KPI summary', () => {
    const kpis = energyService.getKpis();
    expect(kpis.generatedGWh).toBeGreaterThan(0);
    expect(kpis.renewablePercent).toBeGreaterThan(0);
  });
  it('exposes solar, wind, meters, alerts', () => {
    expect(energyService.solar().length).toBeGreaterThan(10);
    expect(energyService.wind().length).toBeGreaterThan(10);
    expect(energyService.meters().length).toBeGreaterThan(10);
    expect(energyService.alerts().length).toBeGreaterThan(10);
  });
  it('search works', () => {
    expect(energyService.search('Hyderabad').length).toBeGreaterThan(0);
  });
});
