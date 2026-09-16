'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { formatColomboTime, getColomboDayTimeStatus } from '@/lib/utils';
import { Command, Moon, Sun, Menu, X, Terminal, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

interface NavbarProps {
  onOpenCommand: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCommand }) => {
  const [colomboTime, setColomboTime] = useState<string>('');
  const [isDark, setIsDark] = useState<boolean>(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('hero');

  useEffect(() => {
    // Initial theme check
    const isDarkMode = document.documentElement.classList.contains('dark');
    setIsDark(isDarkMode);

    // Colombo Clock ticker
    const updateTime = () => setColomboTime(formatColomboTime());
    updateTime();
    const interval = setInterval(updateTime, 1000);

    // Scroll spy for active section
    const handleScroll = () => {
      const sections = ['hero', 'projects', 'telemetry', 'lab', 'experience', 'principles', 'contact'];
      const scrollY = window.scrollY + 120;
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollY >= top && scrollY < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      clearInterval(interval);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;
    if (root.classList.contains('dark')) {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    } else {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    }
  };

  const navLinks = [
    { label: 'Work', href: '#projects', id: 'projects' },
    { label: 'Telemetry', href: '#telemetry', id: 'telemetry' },
    { label: 'UX Lab', href: '#lab', id: 'lab' },
    { label: 'Systems & Principles', href: '#principles', id: 'principles' },
    { label: 'Experience', href: '#experience', id: 'experience' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 px-4 py-3 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <nav
            aria-label="Main Navigation"
            className="glass-panel rounded-2xl px-4 py-2.5 flex items-center justify-between shadow-xl transition-all"
          >
            {/* Logo & Identity */}
            <Link
              href="#hero"
              className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-lg p-1"
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-500 group-hover:bg-emerald-500/20 transition-all font-mono font-bold text-sm">
                DM
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                  Dulaj Mendis
                  <span className="hidden md:inline-block w-1.5 h-1.5 rounded-full bg-emerald-500" />
                </span>
                <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 hidden md:block">
                  Systems Architect · CDC
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-1 bg-slate-100 dark:bg-slate-900/60 p-1 rounded-xl border border-slate-200 dark:border-slate-800/80">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <Link
                    key={link.id}
                    href={link.href}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-150 ${
                      isActive
                        ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm font-semibold'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            {/* Controls: Colombo Time, Command Palette, Theme */}
            <div className="flex items-center gap-2">
              {/* Colombo Local Time */}
              <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800/80 text-[11px] font-mono text-slate-600 dark:text-slate-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-semibold text-slate-900 dark:text-slate-200">{colomboTime || '00:00:00'}</span>
                <span className="text-[10px] opacity-70">CMB</span>
              </div>

              {/* Command Menu ⌘K trigger */}
              <button
                type="button"
                onClick={onOpenCommand}
                aria-label="Open Command Menu (Press ⌘K)"
                className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900/80 text-slate-700 dark:text-slate-300 hover:border-slate-400 dark:hover:border-slate-600 transition-colors"
              >
                <Command className="w-3.5 h-3.5" />
                <span className="hidden sm:inline font-mono text-[11px]">⌘K</span>
              </button>

              {/* Theme Toggle */}
              <button
                type="button"
                onClick={toggleTheme}
                aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
                className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900/80 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
              </button>

              {/* Mobile Menu Toggle */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle navigation menu"
                aria-expanded={mobileMenuOpen}
                className="lg:hidden p-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900/80 text-slate-700 dark:text-slate-300"
              >
                {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
          </nav>

          {/* Mobile Drawer */}
          {mobileMenuOpen && (
            <div className="lg:hidden mt-2 p-4 rounded-2xl glass-panel shadow-2xl border border-slate-200 dark:border-slate-800 animate-fade-in">
              <div className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.id}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors min-h-[44px]"
                  >
                    <span>{link.label}</span>
                    {activeSection === link.id && <span className="w-2 h-2 rounded-full bg-emerald-500" />}
                  </Link>
                ))}
                <div className="pt-3 mt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs font-mono text-slate-500">
                  <span>Colombo: {colomboTime}</span>
                  <span className="text-emerald-500 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Systems Active
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
};
