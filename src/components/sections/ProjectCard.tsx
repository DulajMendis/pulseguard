'use client';

import React, { useState } from 'react';
import { Project } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ArrowRight, ExternalLink, Github, Layers, ShieldCheck, FileCode, Check, Copy, Terminal, Compass, Train } from 'lucide-react';
import { playMicroClick } from '@/lib/audio';

interface ProjectCardProps {
  project: Project;
  onOpenDeepDive: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onOpenDeepDive }) => {
  const [copiedSnippet, setCopiedSnippet] = useState(false);
  const [travexBrand, setTravexBrand] = useState<'CDC' | 'TDC'>('CDC');

  const copyPulseGuardSnippet = (e: React.MouseEvent) => {
    e.stopPropagation();
    playMicroClick(900, 0.03);
    const snippet = 'curl -fsS --retry 3 https://api.pulseguard.dev/ping/550e8400-e29b-41d4-a716-446655440000';
    navigator.clipboard.writeText(snippet);
    setCopiedSnippet(true);
    setTimeout(() => setCopiedSnippet(false), 2000);
  };

  return (
    <article
      className="intro-card !p-7 sm:!p-9 space-y-6 hover:shadow-xl transition-all duration-200 relative overflow-hidden group flex flex-col justify-between"
    >
      {/* Accent corner line */}
      <div
        className="absolute top-0 left-0 right-0 h-1.5 transition-all duration-300 group-hover:h-2"
        style={{ backgroundColor: project.accentColor }}
      />

      {/* Top Details */}
      <div className="space-y-5">
        {/* Header Info */}
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: project.accentColor }}
              />
              <span className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold">
                {project.domain}
              </span>
            </div>

            <Badge
              variant={
                project.status === 'production'
                  ? 'emerald'
                  : project.status === 'live'
                  ? 'amber'
                  : 'blue'
              }
              size="sm"
            >
              {project.badge}
            </Badge>
          </div>

          <div>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors">
              {project.title}
            </h3>
            <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mt-0.5">
              {project.subtitle} · <span className="font-mono text-xs">{project.period}</span>
            </p>
          </div>
        </div>

        {/* Tagline / Pitch */}
        <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
          {project.summary}
        </p>

        {/* Custom interactive micro-moments per project */}
        {project.id === 'pulseguard' && (
          <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-xs font-mono space-y-2">
            <div className="flex items-center justify-between text-slate-400 text-[11px]">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <Terminal className="w-3.5 h-3.5" /> 1-Line Dead Man's Switch
              </span>
              <button
                onClick={copyPulseGuardSnippet}
                className="flex items-center gap-1 text-slate-300 hover:text-white transition-colors"
              >
                {copiedSnippet ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
            <code className="text-slate-300 block truncate selection:bg-emerald-500/30">
              curl -fsS --retry 3 https://api.pulseguard.dev/ping/...
            </code>
          </div>
        )}

        {project.id === 'travex' && (
          <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-xs font-mono flex items-center justify-between">
            <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-sky-500" />
              Dual-Brand Document Output:
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => {
                  playMicroClick(850, 0.02);
                  setTravexBrand('CDC');
                }}
                className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                  travexBrand === 'CDC'
                    ? 'bg-sky-500 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                CDC (Connaissance)
              </button>
              <button
                onClick={() => {
                  playMicroClick(950, 0.02);
                  setTravexBrand('TDC');
                }}
                className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                  travexBrand === 'TDC'
                    ? 'bg-amber-500 text-black'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                TDC Luxury
              </button>
            </div>
          </div>
        )}

        {project.id === 'railway-map' && (
          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs font-mono flex items-center justify-between text-amber-500 dark:text-amber-400">
            <span className="flex items-center gap-1.5">
              <Train className="w-3.5 h-3.5" />
              Subdomain: railway.dulajmendis.com
            </span>
            <span className="text-[10px] uppercase font-bold tracking-wider">
              100% Offline PWA
            </span>
          </div>
        )}

        {/* Verified Stats Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 rounded-xl bg-slate-100/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800">
          {project.stats.map((stat, idx) => (
            <div key={idx} className="space-y-0.5">
              <div className="text-lg font-bold text-slate-900 dark:text-white font-mono tracking-tight">
                {stat.value}
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Key Architectural Highlights */}
        <div className="space-y-2 pt-1">
          <div className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-emerald-500" />
            Key Architectural Milestones
          </div>
          <ul className="space-y-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            {project.architectureHighlights.slice(0, 3).map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-emerald-500 mt-1 shrink-0">▸</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap items-center gap-1.5 pt-2">
          {project.stack.slice(0, 7).map((tech, idx) => (
            <span
              key={idx}
              className="px-2.5 py-1 text-[11px] font-mono rounded-md bg-slate-100 dark:bg-slate-800/90 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/60"
            >
              {tech}
            </span>
          ))}
          {project.stack.length > 7 && (
            <span className="px-2 py-1 text-[11px] font-mono text-slate-500">
              +{project.stack.length - 7} more
            </span>
          )}
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 mt-4">
        <Button
          variant="primary"
          size="md"
          onClick={() => {
            playMicroClick(800, 0.02);
            onOpenDeepDive(project);
          }}
          rightIcon={<ArrowRight className="w-4 h-4" />}
        >
          Architectural Blueprint
        </Button>

        <div className="flex items-center gap-2">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playMicroClick(1000, 0.02)}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-slate-400 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Live Application</span>
            </a>
          )}

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playMicroClick(1000, 0.02)}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-slate-400 transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              <span>Repository</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
};
