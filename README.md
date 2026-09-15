# EnerGrid

Enterprise **energy management** application (not logistics).

Includes:
- Interactive Operations Dashboard
- Solar / Wind / Grid / Meter management
- Consumption analytics, forecasting, maintenance, alerts, billing
- Large operational domain catalog (generation, transmission, storage, SCADA, etc.)
- Unit tests (Vitest)

## Install

```bash
npm config set registry https://registry.npmjs.org/
npm install
```

## Run

```bash
npm run dev
```

Open http://localhost:3000 — **EnerGrid** Operations Dashboard (energy UI only).

## Scripts

- `npm run dev` — development server
- `npm run build` — production build
- `npm test` — unit tests
- `npm run test:coverage` — coverage report

## Stack

React 19 · TypeScript · Vite 6 · Lucide · Vitest
