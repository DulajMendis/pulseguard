export interface TelemetryMetric {
  id: string;
  label: string;
  value: string;
  unit?: string;
  description: string;
  badge: string;
  verifiableSource: string;
}

export const liveTelemetry: TelemetryMetric[] = [
  {
    id: 'travex-scale',
    label: 'Production Architecture',
    value: '58 Models · 237 Endpoints',
    description: 'Travex DMC platform powering live tour production for Connaissance De Ceylan (CDC).',
    badge: 'Verified System',
    verifiableSource: 'Travex Code Inventory & Blueprint',
  },
  {
    id: 'codebase-loc',
    label: 'Authored Codebase',
    value: '~84,000 LOC',
    description: 'Full-stack TypeScript (NestJS, React 19, Prisma, Tailwind v4).',
    badge: 'Active Stack',
    verifiableSource: 'CDC Platform Monolith',
  },
  {
    id: 'railway-gis',
    label: 'Railway Network GIS',
    value: '422 Stops · 1,444 km',
    description: 'Canonical transit dataset across all 10 lines with Douglas-Peucker simplified geometry.',
    badge: 'Live Subdomain',
    verifiableSource: 'railway.dulajmendis.com',
  },
  {
    id: 'observability-uptime',
    label: 'Observability SLA',
    value: '99.98%',
    description: 'Synthetic HTTP monitoring, cron heartbeats, and SSL expiration alerts.',
    badge: 'Telemetry',
    verifiableSource: 'PulseGuard Developer Platform',
  },
  {
    id: 'honesty-audit',
    label: 'Fabricated Metrics',
    value: '0.00%',
    description: 'Zero fake testimonials, artificial timers, or exaggerated claims. Every datum is verified.',
    badge: 'Core Tenet',
    verifiableSource: 'Autonomous Workspace Audit',
  },
];
