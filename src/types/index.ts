export type ProjectStatus = 'production' | 'live' | 'active' | 'completed';

export interface ProjectStat {
  label: string;
  value: string;
  description?: string;
}

export interface KeyDecision {
  title: string;
  rationale: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  domain: string;
  role: string;
  period: string;
  status: ProjectStatus;
  featured: boolean;
  badge: string;
  summary: string;
  accentColor: string;
  tagline: string;
  stats: ProjectStat[];
  stack: string[];
  problem: string;
  solution: string;
  architectureHighlights: string[];
  keyDecisions: KeyDecision[];
  verifiedOutcomes: string[];
  liveUrl?: string;
  githubUrl?: string;
  subdomain?: string;
  internalRef?: string;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  roleType: 'full-time' | 'advisory' | 'recognition';
  period: string;
  location: string;
  summary: string;
  highlights: string[];
  technologies: string[];
}

export interface InteractionRule {
  id: string;
  category: 'motion' | 'menus' | 'pickers' | 'feedback' | 'search';
  title: string;
  shortRule: string;
  benchmark: string;
  explanation: string;
  parameters: { [key: string]: string | number };
}

export interface EngineeringPrinciple {
  id: string;
  title: string;
  mantra: string;
  source: string;
  description: string;
  practice: string;
}
