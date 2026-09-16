import { EngineeringPrinciple, InteractionRule } from '../types';

export const interactionRules: InteractionRule[] = [
  {
    id: 'right-click',
    category: 'menus',
    title: 'Right-click is a system',
    shortRule: 'Measure first, flip on collision, group by intent, keyboard always.',
    benchmark: 'Figma & Linear desktop fidelity',
    explanation: 'A context menu is an engineered subsystem, not an unstyled list. It must measure before rendering, flip upward or leftward near screen boundaries, isolate destructive actions last, and support keyboard navigation with Esc dismissal.',
    parameters: {
      'Placement Logic': 'Collision-aware flip',
      'Min Touch Target': '36px Desktop / 44px Mobile',
      'Keyboard Walking': 'Arrow keys + Type-ahead jump',
      'Submenu Protection': 'Geometric safe triangle',
    },
  },
  {
    id: 'motion-timing',
    category: 'motion',
    title: 'The Doherty Motion Budget',
    shortRule: 'Entrance 250ms, Exit 150ms, Feedback <100ms, Stagger 50ms.',
    benchmark: 'Doherty threshold (under 400ms feels instant)',
    explanation: 'Interaction quality hinges on duration calibration. Entrances land at 250ms; dismissals run 30% faster (150ms) because the user already decided; button presses respond in under 100ms; staggered item reveals tick at 50ms increments.',
    parameters: {
      'Entrance Duration': '250ms',
      'Exit Duration': '150ms (30% faster)',
      'Feedback Latency': '<100ms (instant perception)',
      'List Stagger Interval': '50ms per item',
    },
  },
  {
    id: 'dropdown-mechanics',
    category: 'pickers',
    title: 'Dropdowns, Done Right',
    shortRule: '44px min touch target, edge-aware flip, keyboard first, 10+ items = search.',
    benchmark: 'WCAG 2.2 AA touch criteria',
    explanation: 'Cheap select boxes fail mobile fingers and screen edges. Premium select systems guarantee a minimum 44px hit-box, flip upward when approaching the bottom viewport boundary, and inject live filtering when options exceed 10.',
    parameters: {
      'Hit Target': '>= 44px height',
      'Overflow Handling': 'Dynamic vertical flip',
      'Search Threshold': '>= 10 options',
      'Open Transition': '150ms cubic-bezier',
    },
  },
  {
    id: 'filter-combinatorics',
    category: 'search',
    title: 'Filters are a System',
    shortRule: 'OR within groups, AND across groups, same-frame count feedback.',
    benchmark: 'E-commerce and SaaS telemetry',
    explanation: 'Every filter tap must update matching counts in the exact same frame. Combining tags inside a category widens matches (OR), while crossing categories tightens them (AND). Always provide a single-tap clear-all.',
    parameters: {
      'Internal Logic': 'OR (union)',
      'Cross-Group Logic': 'AND (intersection)',
      'Feedback Cadence': 'Immediate same-frame dispatch',
      'Empty State Guard': 'Show zero-match suggestions',
    },
  },
  {
    id: 'optimistic-ui',
    category: 'feedback',
    title: 'Optimistic UI — Bet on Success',
    shortRule: 'Render immediately for low-stakes actions; show the truth for irreversible ones.',
    benchmark: 'Perceived latency < 50ms',
    explanation: 'For reversible user actions (toggles, bookmarks, status changes), update the client UI instantaneously and sync in the background. For irreversible operations (payments, deletions), never fake success—show real processing states.',
    parameters: {
      'Perceived Target': '< 50ms client update',
      'Fallback Path': 'Atomic rollback + toast on failure',
      'Irreversible Rule': 'Display authentic server confirmation',
    },
  },
];

export const engineeringPrinciples: EngineeringPrinciple[] = [
  {
    id: 'honest-data',
    title: 'Honest Data Over Silent Guesses',
    mantra: 'Null over wrong. Never fabricate scarcity, dates, or prices.',
    source: 'Travex Margin Engine & Experience Udawalawe Core Policy',
    description: 'If a supplier cost, exchange rate, or availability slot is unverified, systems must yield an explicit unconfirmed state rather than interpolating plausible fakes. Trust is irreversible once lost.',
    practice: 'Strict TypeScript nullability, explicit REQUIRES_CONFIRMATION domain states, and zero fake review widgets.',
  },
  {
    id: 'single-source-truth',
    title: 'The Version is the Source of Truth',
    mantra: 'Service orders, invoices, and schedules derive from confirmed snapshots.',
    source: 'Travex DMC Operating System',
    description: 'Downstream operations (vouchers, driver sheets, rooming lists, client invoices) must strictly branch from an immutable version snapshot, ensuring what was sold is identical to what is operated.',
    practice: 'Deep-copy snapshot engines, DMMF drift-guard tests, and deterministic DOCX-to-PDF compilation.',
  },
  {
    id: 'zero-fork-discipline',
    title: 'One Codebase, Per-Tenant Instances, Never Fork',
    mantra: 'White-labeling belongs in configuration tokens, not source branches.',
    source: 'EvaraOS & Multi-Brand Travex Blueprint',
    description: 'Branching codebases per client is a maintenance death spiral. Brand differentiators must live in brand token registries, while feature divergence is flag-gated on a single verified release train.',
    practice: 'Strict database tenant walls with 404-not-403 security semantics to avoid tenant reconnaissance.',
  },
  {
    id: 'mime-safe-verification',
    title: 'HTTP 200 is Not Proof of Success',
    mantra: 'Assert content types, payload integrity, and DOM rendering.',
    source: 'Railway GIS Deploy Runbook & CI Pipeline',
    description: 'A misconfigured Nginx vhost can return HTTP 200 while wiping MIME types, causing browsers to download HTML as binary streams. True health checks verify response headers and content bodies.',
    practice: 'Automated curl assertions on content-type headers, bundle hashes, and headless DOM readiness.',
  },
];
