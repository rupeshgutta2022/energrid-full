import React, { useMemo, useState, useEffect } from 'react';
import { AppShell } from './energrid/components/AppShell';
import { OperationsDashboard } from './energrid/pages/OperationsDashboard';
import { EntityPage } from './energrid/pages/EntityPages';
import { energyService } from './energrid/services/energyService';
import { runDomainHealthCheck } from './energrid/domain';
import './energrid/styles.css';

type Page =
  | 'Operations Dashboard'
  | 'Energy Monitoring'
  | 'Solar Assets'
  | 'Wind Assets'
  | 'Grid Management'
  | 'Meter Management'
  | 'Consumption Analytics'
  | 'Forecasting'
  | 'Maintenance'
  | 'Alerts & Incidents'
  | 'Billing'
  | 'Settings'
  | 'Users & Roles'
  | 'Audit Log';

function pickRows(page: Page) {
  switch (page) {
    case 'Solar Assets':
      return {
        description: 'Utility-scale and rooftop solar generation assets across regions.',
        columns: ['ID', 'Name', 'Site', 'Capacity MW', 'Output MW', 'Efficiency', 'Status'],
        rows: energyService.solar().map((s) => ({
          id: s.id, name: s.name, site: s.site, capacity: s.capacityMW,
          output: s.outputMW, efficiency: `${s.efficiency}%`, status: s.status,
        })),
      };
    case 'Wind Assets':
      return {
        description: 'Wind turbine generators and clusters with live output.',
        columns: ['ID', 'Site', 'Capacity MW', 'Wind m/s', 'Output MW', 'Availability', 'Status'],
        rows: energyService.wind().map((w) => ({
          id: w.id, site: w.site, capacity: w.capacityMW, wind: w.windSpeedMS,
          output: Number(w.outputMW.toFixed(2)), availability: `${w.availability}%`, status: w.status,
        })),
      };
    case 'Meter Management':
      return {
        description: 'AMI meters, signal health, and latest consumption readings.',
        columns: ['ID', 'Customer', 'Facility', 'Type', 'Reading kWh', 'Signal', 'Status'],
        rows: energyService.meters().map((m) => ({
          id: m.id, customer: m.customer, facility: m.facility, type: m.type,
          reading: m.readingKWh, signal: m.signal, status: m.status,
        })),
      };
    case 'Alerts & Incidents':
      return {
        description: 'Open and acknowledged operational alerts by severity.',
        columns: ['ID', 'Time', 'Asset', 'Location', 'Description', 'Severity', 'Status'],
        rows: energyService.alerts().map((a) => ({
          id: a.id, time: a.time, asset: a.asset, location: a.location,
          description: a.description, severity: a.severity, status: a.status,
        })),
      };
    case 'Maintenance':
      return {
        description: 'Work orders for inspection, repair, and preventive maintenance.',
        columns: ['ID', 'Asset', 'Issue', 'Priority', 'Technician', 'Due', 'Status'],
        rows: energyService.maintenance().map((wo) => ({
          id: wo.id, asset: wo.asset, issue: wo.issue, priority: wo.priority,
          technician: wo.technician, due: wo.due, status: wo.status,
        })),
      };
    case 'Billing':
      return {
        description: 'Facility energy invoices and payment status.',
        columns: ['Invoice', 'Customer', 'Period', 'MWh', 'Amount INR', 'Due', 'Status'],
        rows: energyService.invoices().map((inv) => ({
          id: inv.id, customer: inv.customer, period: inv.period, mwh: inv.consumptionMWh,
          amount: inv.amountINR, due: inv.due, status: inv.status,
        })),
      };
    case 'Energy Monitoring':
    case 'Grid Management':
    case 'Consumption Analytics':
    case 'Forecasting':
      return {
        description: 'Facility demand and consumption overview backed by EnerGrid domain modules.',
        columns: ['ID', 'Name', 'Region', 'Demand MW', 'Consumption MWh'],
        rows: energyService.facilities().map((f) => ({
          id: f.id, name: f.name, region: f.region, demand: f.demandMW, consumption: f.consumptionMWh,
        })),
      };
    default:
      return {
        description: 'System configuration and administrative controls.',
        columns: ['Setting', 'Value', 'Status'],
        rows: [
          { k: 'Organization', v: 'EnerGrid India', s: 'Active' },
          { k: 'Environment', v: 'Production', s: 'Healthy' },
          { k: 'Domain modules', v: 'Loaded', s: 'OK' },
          { k: 'Role', v: 'Operations Admin', s: 'Active' },
        ],
      };
  }
}

export default function App() {
  const [active, setActive] = useState<Page>('Operations Dashboard');
  const [domainOk, setDomainOk] = useState(0);

  useEffect(() => {
    // Execute domain catalog so generated modules are part of runtime app logic
    try {
      const results = runDomainHealthCheck();
      setDomainOk(results.length);
    } catch {
      setDomainOk(0);
    }
  }, []);

  const pageMeta = useMemo(() => pickRows(active), [active]);

  const content =
    active === 'Operations Dashboard' ? (
      <OperationsDashboard />
    ) : (
      <EntityPage
        title={active}
        description={`${pageMeta.description} · Domain checks: ${domainOk}`}
        columns={pageMeta.columns}
        rows={pageMeta.rows}
      />
    );

  return (
    <AppShell active={active} onNavigate={(name) => setActive(name as Page)}>
      {content}
    </AppShell>
  );
}
