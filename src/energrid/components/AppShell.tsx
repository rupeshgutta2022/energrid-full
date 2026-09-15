import React from 'react';
import {
  Activity, Bell, Gauge, LayoutDashboard, Network, Radio, Receipt, Search,
  Settings, Sun, TrendingUp, Wind, Wrench, Users, ClipboardList, Zap, ChevronDown,
} from 'lucide-react';

const nav: [string, [string, React.ComponentType<{ size?: number }>][]][] = [
  ['OVERVIEW', [['Operations Dashboard', LayoutDashboard], ['Energy Monitoring', Activity]]],
  ['ASSETS', [['Solar Assets', Sun], ['Wind Assets', Wind], ['Grid Management', Network], ['Meter Management', Radio]]],
  ['ANALYTICS', [['Consumption Analytics', Zap], ['Forecasting', TrendingUp]]],
  ['OPERATIONS', [['Maintenance', Wrench], ['Alerts & Incidents', Bell]]],
  ['FINANCE', [['Billing', Receipt]]],
  ['SYSTEM', [['Settings', Settings], ['Users & Roles', Users], ['Audit Log', ClipboardList]]],
];

export function AppShell({
  children,
  active = 'Operations Dashboard',
  onNavigate,
}: {
  children: React.ReactNode;
  active?: string;
  onNavigate?: (name: string) => void;
}) {
  return (
    <div className="energrid-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="mark"><Gauge size={19} /></div>
          <b>EnerGrid<small>Intelligent Energy Operations</small></b>
        </div>
        <button type="button" className="company">EnerGrid India<ChevronDown size={14} /></button>
        {nav.map(([section, items]) => (
          <section key={section}>
            <label>{section}</label>
            {items.map(([name, Icon]) => (
              <button
                type="button"
                key={name}
                className={name === active ? 'nav active' : 'nav'}
                onClick={() => onNavigate?.(name)}
              >
                <Icon size={17} />
                {name}
              </button>
            ))}
          </section>
        ))}
        <div className="user">
          <span>RM</span>
          <b>Rohan Mehta<small>Operations Admin</small></b>
        </div>
      </aside>
      <main className="main">
        <header>
          <span>EnerGrid / {active}</span>
          <div className="search">
            <Search size={16} />
            <input placeholder="Search meters, assets, facilities..." />
          </div>
          <button type="button">Sep 1 – Sep 9⌄</button>
          <button type="button">All Facilities⌄</button>
          <button type="button" aria-label="Notifications"><Bell size={18} /></button>
        </header>
        <div className="content">{children}</div>
      </main>
    </div>
  );
}
