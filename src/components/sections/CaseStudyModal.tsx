'use client';

import React, { useEffect } from 'react';
import { Project } from '@/types';
import { X, Check, ExternalLink, Github, Database, Cpu, Layers, ShieldCheck, FileText } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

interface CaseStudyModalProps {
  project: Project | null;
  onClose: () => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-study-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-fade-in-down text-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-6 md:p-8 border-b border-slate-800 bg-slate-950/60 flex items-start justify-between gap-4">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="emerald" size="sm">
                {project.badge}
              </Badge>
              <span className="text-xs font-mono text-slate-400">
                {project.domain} · {project.period}
              </span>
            </div>
            <h2 id="case-study-title" className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              {project.title}
            </h2>
            <p className="text-sm sm:text-base text-slate-400 font-medium">
              {project.subtitle}
            </p>
          </div>

          <button
            onClick={onClose}
            aria-label="Close Case Study"
            className="p-2.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors border border-slate-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 md:p-8 space-y-8">
          {/* Verified Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-slate-950 border border-slate-800">
            {project.stats.map((stat, idx) => (
              <div key={idx} className="space-y-1">
                <div className="text-2xl font-extrabold text-white font-mono">{stat.value}</div>
                <div className="text-xs text-slate-400 font-medium">{stat.label}</div>
                {stat.description && (
                  <div className="text-[10px] text-slate-500 line-clamp-2">{stat.description}</div>
                )}
              </div>
            ))}
          </div>

          {/* Problem & Challenge */}
          <div className="space-y-3">
            <h3 className="text-base font-mono font-semibold uppercase tracking-wider text-rose-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-400" />
              Operational Problem & Context
            </h3>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed bg-slate-950/40 p-4 rounded-xl border border-slate-800/80">
              {project.problem}
            </p>
          </div>

          {/* Solution & System Architecture */}
          <div className="space-y-3">
            <h3 className="text-base font-mono font-semibold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              Engineered Solution & Architecture
            </h3>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed bg-slate-950/40 p-4 rounded-xl border border-slate-800/80">
              {project.solution}
            </p>
          </div>

          {/* Architecture Highlights */}
          <div className="space-y-3">
            <h3 className="text-base font-mono font-semibold uppercase tracking-wider text-sky-400 flex items-center gap-2">
              <Cpu className="w-4 h-4" />
              Deep Architecture Highlights
            </h3>
            <div className="space-y-2">
              {project.architectureHighlights.map((highlight, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs sm:text-sm text-slate-300"
                >
                  <div className="w-5 h-5 rounded-full bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 shrink-0 text-xs font-mono mt-0.5">
                    {idx + 1}
                  </div>
                  <span>{highlight}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Key Engineering Decisions */}
          <div className="space-y-3">
            <h3 className="text-base font-mono font-semibold uppercase tracking-wider text-amber-400 flex items-center gap-2">
              <Layers className="w-4 h-4" />
              Architectural Trade-offs & Decisions
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.keyDecisions.map((dec, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2"
                >
                  <div className="text-sm font-bold text-white flex items-center gap-2">
                    <span className="text-amber-400">§</span>
                    {dec.title}
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">{dec.rationale}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Verified Outcomes */}
          <div className="space-y-3">
            <h3 className="text-base font-mono font-semibold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" />
              Verified Production Outcomes
            </h3>
            <ul className="space-y-2">
              {project.verifiedOutcomes.map((outcome, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 bg-emerald-950/20 border border-emerald-900/40 p-3 rounded-xl"
                >
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{outcome}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Complete Tech Stack Table */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
              Complete Production Stack
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((item, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 text-xs font-mono rounded-lg bg-slate-800 text-slate-200 border border-slate-700"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Sourced Reference Document */}
          {project.internalRef && (
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center gap-2 text-xs font-mono text-slate-500">
              <FileText className="w-4 h-4 text-emerald-500" />
              <span>Verified Source Reference: {project.internalRef}</span>
            </div>
          )}
        </div>

        {/* Modal Footer Actions */}
        <div className="p-6 border-t border-slate-800 bg-slate-950 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {project.liveUrl && (
              <Button
                variant="primary"
                size="md"
                onClick={() => window.open(project.liveUrl, '_blank')}
                rightIcon={<ExternalLink className="w-4 h-4" />}
              >
                Visit Live Platform
              </Button>
            )}
            {project.githubUrl && (
              <Button
                variant="secondary"
                size="md"
                onClick={() => window.open(project.githubUrl, '_blank')}
                leftIcon={<Github className="w-4 h-4" />}
              >
                Inspect Code
              </Button>
            )}
          </div>

          <Button variant="outline" size="md" onClick={onClose}>
            Close Blueprint
          </Button>
        </div>
      </div>
    </div>
  );
};
