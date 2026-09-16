'use client';

import React, { useState } from 'react';
import { verifiedProjects } from '@/data/projects';
import { ProjectCard } from '@/components/sections/ProjectCard';
import { Project } from '@/types';
import { Layers, Filter } from 'lucide-react';

interface ProjectsSectionProps {
  onOpenDeepDive: (project: Project) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onOpenDeepDive }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Verified Systems' },
    { id: 'enterprise', label: 'Enterprise Travel & Operations' },
    { id: 'tooling', label: 'Observability & Tooling' },
    { id: 'transit', label: 'Transit GIS & Intelligence' },
  ];

  const filteredProjects = verifiedProjects.filter((p) => {
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'enterprise')
      return p.id === 'travex' || p.id === 'experience-udawalawe';
    if (selectedCategory === 'tooling') return p.id === 'pulseguard';
    if (selectedCategory === 'transit')
      return p.id === 'railway-map' || p.id === 'intelligence-system' || p.id === 'car-consultant';
    return true;
  });

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 max-w-6xl mx-auto space-y-12">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            <Layers className="w-4 h-4" />
            Selected Systems Architecture
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Battle-tested production systems, not boilerplate demos.
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-400 max-w-2xl">
            Every project listed here is derived from verified codebase repositories, database schemas, and live operational deployments.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 bg-slate-100 dark:bg-slate-900/60 p-1.5 rounded-xl border border-slate-200 dark:border-slate-800">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                  isSelected
                    ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onOpenDeepDive={onOpenDeepDive}
          />
        ))}
      </div>
    </section>
  );
};
