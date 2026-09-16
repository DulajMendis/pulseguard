'use client';

import React from 'react';
import { verifiedExperiences } from '@/data/experience';
import { Briefcase, Calendar, MapPin, Check } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

export const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" className="py-24 px-4 sm:px-6 max-w-6xl mx-auto space-y-12">
      {/* Section Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
          <Briefcase className="w-4 h-4" />
          Verified Professional Roles & Advisory
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Operational leadership grounded in real business outcomes.
        </h2>
        <p className="text-base text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
          Balancing enterprise systems administration, software architecture, and advisory oversight across luxury hospitality and tourism.
        </p>
      </div>

      {/* Experience Timeline Cards */}
      <div className="space-y-8">
        {verifiedExperiences.map((exp) => (
          <div
            key={exp.id}
            className="p-6 md:p-8 rounded-3xl glass-panel border border-slate-200 dark:border-slate-800/80 space-y-6 hover:border-slate-400 dark:hover:border-slate-700 transition-all shadow-md"
          >
            {/* Header info */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                    {exp.title}
                  </h3>
                  <Badge
                    variant={
                      exp.roleType === 'full-time'
                        ? 'emerald'
                        : exp.roleType === 'advisory'
                        ? 'blue'
                        : 'amber'
                    }
                    size="sm"
                  >
                    {exp.roleType === 'full-time'
                      ? 'Full-Time Leadership'
                      : exp.roleType === 'advisory'
                      ? 'Advisory Partner'
                      : 'Global Recognition'}
                  </Badge>
                </div>
                <div className="text-base font-semibold text-emerald-600 dark:text-emerald-400">
                  {exp.company}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {exp.period}
                </span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  {exp.location}
                </span>
              </div>
            </div>

            {/* Summary description */}
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              {exp.summary}
            </p>

            {/* Highlights bullet points */}
            <div className="space-y-2 pt-2">
              <div className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Verified Responsibilities & Milestones:
              </div>
              <ul className="space-y-2">
                {exp.highlights.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400"
                  >
                    <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Technologies */}
            <div className="flex flex-wrap items-center gap-1.5 pt-3 border-t border-slate-200 dark:border-slate-800">
              {exp.technologies.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 text-xs font-mono rounded-lg bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
