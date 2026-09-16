'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { formatColomboTime, getColomboDayTimeStatus } from '@/lib/utils';
import { Command, Moon, Sun, Menu, X, Terminal, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

interface NavbarProps {
  onOpenCommand: () => void;
  onOpenProjectRequest?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCommand, onOpenProjectRequest }) => {
  const [colomboTime, setColomboTime] = useState<string>('');
  const [isDark, setIsDark] = useState<boolean>(false);
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

    // Scroll spy
    const handleScroll = () => {
      const sections = ['hero', 'benefits', 'projects', 'process', 'faq'];
      const scrollY = window.scrollY + 140;
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
    { label: 'Benefits', href: '#benefits', id: 'benefits' },
    { label: 'Projects', href: '#projects', id: 'projects' },
    { label: 'Process', href: '#process', id: 'process' },
    { label: 'FAQ', href: '#faq', id: 'faq' },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 glass-panel">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between">
          {/* Logo & Identity */}
          <Link
            href="#hero"
            className="text-lg font-semibold tracking-[-0.025em] text-[#1d1d1f] dark:text-white hover:opacity-80 transition-opacity focus:outline-none"
          >
            Dulaj Mendis
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 sm:gap-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <Link
                  key={link.id}
                  href={link.href}
                  className={`text-[14px] font-medium px-4 py-1.5 rounded-full transition-all ${
                    isActive
                      ? 'text-[#1d1d1f] dark:text-white font-semibold bg-[#f5f5f7] dark:bg-slate-800'
                      : 'text-[#1d1d1f]/75 hover:text-[#1d1d1f] hover:bg-[#f5f5f7]/70 dark:text-slate-400 dark:hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right CTAs */}
          <div className="flex items-center gap-3">
            {/* Colombo Clock Pill */}
            <div className="hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f5f5f7] dark:bg-slate-800/80 text-[11px] font-mono text-[#1d1d1f]/70 dark:text-slate-300">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>{colomboTime || '11:45:00'}</span>
              <span className="opacity-50 text-[10px]">CMB</span>
            </div>

            {/* Command Palette Trigger */}
            <button
              type="button"
              onClick={onOpenCommand}
              aria-label="Open Command Menu (Press ⌘K)"
              className="hidden sm:flex items-center justify-center p-2 rounded-full text-[#1d1d1f]/70 hover:text-[#1d1d1f] dark:text-slate-400 dark:hover:text-white hover:bg-[#f5f5f7] dark:hover:bg-slate-800 transition-colors"
            >
              <Command className="w-4 h-4" />
            </button>

            {/* Theme Toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
              className="p-2 rounded-full text-[#1d1d1f]/70 hover:text-[#1d1d1f] dark:text-slate-400 dark:hover:text-white hover:bg-[#f5f5f7] dark:hover:bg-slate-800 transition-colors"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Thimira Signature Project Request Link */}
            <button
              type="button"
              onClick={onOpenProjectRequest}
              className="cta-link !text-sm sm:!text-[15px] font-semibold group py-1.5 px-3 rounded-full hover:bg-[#006ddb]/5 transition-colors"
            >
              <span className="cta-link-text">Project request</span>
              <span className="cta-link-icon">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 20L16 12L8 4" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
              className="md:hidden p-2 rounded-full text-slate-700 dark:text-slate-300"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>

          {/* Mobile Drawer */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-2 p-4 rounded-3xl glass-panel shadow-xl border border-slate-200 dark:border-slate-800 animate-fade-in">
              <div className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.id}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-medium text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors"
                  >
                    <span>{link.label}</span>
                    {activeSection === link.id && <span className="w-1.5 h-1.5 rounded-full bg-slate-950 dark:bg-white" />}
                  </Link>
                ))}
                <div className="pt-3 mt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs font-mono text-slate-500">
                  <span>Colombo: {colomboTime}</span>
                  <span className="text-emerald-500">Systems Active</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
};
