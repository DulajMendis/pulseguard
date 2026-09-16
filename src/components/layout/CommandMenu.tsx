'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Search, Terminal, ArrowRight, ExternalLink, Code2, ShieldCheck, Compass, Sparkles, X } from 'lucide-react';
import { verifiedProjects } from '@/data/projects';
import { interactionRules, engineeringPrinciples } from '@/data/principles';

interface CommandMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProject?: (projectId: string) => void;
}

interface CommandItem {
  id: string;
  category: string;
  title: string;
  subtitle?: string;
  action: () => void;
  icon: React.ReactNode;
}

export const CommandMenu: React.FC<CommandMenuProps> = ({ isOpen, onClose, onSelectProject }) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Build searchable commands
  const items: CommandItem[] = [
    // Projects
    ...verifiedProjects.map((p) => ({
      id: `project-${p.id}`,
      category: 'Verified Systems',
      title: p.title,
      subtitle: `${p.domain} · ${p.status}`,
      action: () => {
        onClose();
        if (onSelectProject) {
          onSelectProject(p.id);
        } else {
          window.location.hash = 'projects';
        }
      },
      icon: <Code2 className="w-4 h-4 text-emerald-500" />,
    })),
    // Live Transit Subdomain
    {
      id: 'subdomain-railway',
      category: 'Live Subdomains',
      title: 'railway.dulajmendis.com',
      subtitle: 'Canonical Sri Lanka Railway GIS dataset & PWA map',
      action: () => {
        window.open('https://railway.dulajmendis.com', '_blank');
        onClose();
      },
      icon: <ExternalLink className="w-4 h-4 text-amber-500" />,
    },
    // UX Lab
    ...interactionRules.map((rule) => ({
      id: `rule-${rule.id}`,
      category: 'UX Engineering Rules',
      title: rule.title,
      subtitle: rule.shortRule,
      action: () => {
        onClose();
        const el = document.getElementById('lab');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      },
      icon: <Sparkles className="w-4 h-4 text-purple-400" />,
    })),
    // Engineering Principles
    ...engineeringPrinciples.map((pr) => ({
      id: `principle-${pr.id}`,
      category: 'Engineering Tenets',
      title: pr.title,
      subtitle: pr.mantra,
      action: () => {
        onClose();
        const el = document.getElementById('principles');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      },
      icon: <ShieldCheck className="w-4 h-4 text-sky-400" />,
    })),
    // Actions
    {
      id: 'action-github',
      category: 'Quick Actions',
      title: 'GitHub: DulajMendis',
      subtitle: 'Inspect public repositories & authored code',
      action: () => {
        window.open('https://github.com/DulajMendis', '_blank');
        onClose();
      },
      icon: <Terminal className="w-4 h-4 text-slate-400" />,
    },
    {
      id: 'action-contact',
      category: 'Quick Actions',
      title: 'Contact Dulaj Mendis',
      subtitle: 'Send a message or strategic inquiry',
      action: () => {
        onClose();
        const el = document.getElementById('contact');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      },
      icon: <ArrowRight className="w-4 h-4 text-emerald-400" />,
    },
  ];

  // Filter items based on query
  const filtered = items.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      (item.subtitle && item.subtitle.toLowerCase().includes(query.toLowerCase())) ||
      item.category.toLowerCase().includes(query.toLowerCase())
  );

  // Key listeners
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Open triggered by parent
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [isOpen, onClose]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (filtered.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filtered.length) % (filtered.length || 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filtered[selectedIndex]) {
        filtered[selectedIndex].action();
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Command Palette"
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/60 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden animate-fade-in-down"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Search Input */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-800">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search systems, rules, principles, or actions..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            className="w-full bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-slate-500 hover:text-slate-300 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono text-slate-400 bg-slate-800 rounded border border-slate-700">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div ref={listRef} className="max-h-[380px] overflow-y-auto p-2">
          {filtered.length === 0 ? (
            <div className="p-8 text-center text-slate-400 text-sm">
              No results found for <span className="text-white font-medium">"{query}"</span>
            </div>
          ) : (
            filtered.map((item, index) => {
              const isSelected = index === selectedIndex;
              return (
                <div
                  key={item.id}
                  onClick={() => item.action()}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-colors ${
                    isSelected ? 'bg-emerald-500/15 text-white' : 'text-slate-300 hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-slate-800 border border-slate-700/60">
                      {item.icon}
                    </div>
                    <div>
                      <div className="text-sm font-semibold flex items-center gap-2">
                        {item.title}
                        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                          {item.category}
                        </span>
                      </div>
                      {item.subtitle && (
                        <p className="text-xs text-slate-400 line-clamp-1">{item.subtitle}</p>
                      )}
                    </div>
                  </div>
                  {isSelected && <ArrowRight className="w-4 h-4 text-emerald-400 shrink-0" />}
                </div>
              );
            })
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2 bg-slate-950/80 border-t border-slate-800 text-[11px] font-mono text-slate-500 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>Esc Dismiss</span>
          </div>
          <span>DulajMendis.com · Production Telemetry</span>
        </div>
      </div>
    </div>
  );
};
