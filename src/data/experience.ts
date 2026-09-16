import { Experience } from '../types';

export const verifiedExperiences: Experience[] = [
  {
    id: 'cdc',
    title: 'Manager of Sustainability & System Administration',
    company: 'Connaissance De Ceylan (CDC)',
    roleType: 'full-time',
    period: 'Current Role',
    location: 'Colombo, Sri Lanka',
    summary: 'Directing enterprise systems infrastructure and sustainability initiatives for one of Sri Lanka’s premier destination management companies. Designed, engineered, and shipped Travex—the company’s primary operations platform.',
    highlights: [
      'Architected and implemented Travex, the 84,000-line production itinerary studio and DMC operating system serving CDC and TDC brands.',
      'Transformed proposal workflows: reduced luxury custom tour turnaround from 4+ hours to minutes with automated DOCX and PDF document synthesis.',
      'Supervise operational database integrity (PostgreSQL, Prisma, Redis) across multi-department tour booking, fleet allocation, and pricing workflows.',
      'Lead sustainability technology programs and digital transformation strategies to eliminate paper waste and modernize legacy processes.',
    ],
    technologies: ['NestJS', 'Prisma', 'PostgreSQL', 'Redis', 'React 19', 'Tailwind CSS', 'Cloudflare R2', 'Docker', 'Linux / VPS'],
  },
  {
    id: 'advisory',
    title: 'Advisory Systems Partner & Operating Technologist',
    company: 'Experience Udawalawe · Ceylon 1850 · Owen Rich',
    roleType: 'advisory',
    period: '2025 – Present',
    location: 'Godakawela & Udawalawe, Sri Lanka',
    summary: 'Providing strategic operating systems, digital infrastructure, and marketing architecture for three linked hospitality and eco-tourism enterprises in southern Sri Lanka.',
    highlights: [
      'Architected the owner-owned travel-commerce and booking back-office platform using Laravel 13, Filament v5, and Inertia.js React.',
      'Enforced strict "honest data" policies: eliminating deceptive scarcity countdowns, zero float currency math, and explicit confirmation states.',
      'Structured operational data models bridging hotel accommodation (Owen Rich), destination dining (Ceylon 1850), and guided safari excursions.',
      'Defined guest communication channels, local licensing workflows, and supplier coordination systems.',
    ],
    technologies: ['Laravel 13', 'Filament v5', 'Inertia.js', 'React 19', 'MySQL', 'Tailwind CSS', 'Operations Modeling'],
  },
];
