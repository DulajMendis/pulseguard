'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Mail, Github, ExternalLink, Lock, ArrowRight, ShieldCheck } from 'lucide-react';

interface LaunchingSoonProps {
  onUnlock: () => void;
}

export const LaunchingSoon: React.FC<LaunchingSoonProps> = ({ onUnlock }) => {
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.trim().toLowerCase() === 'dulaj2026') {
      // Set 30-day cookie
      document.cookie = 'portfolio_preview=dulaj2026; path=/; max-age=2592000; SameSite=Lax';
      onUnlock();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafc] text-[#1d1d1f] flex flex-col justify-between items-center px-6 py-12 selection:bg-[#006ddb]/20 selection:text-[#006ddb] relative overflow-hidden font-sans">
      {/* Background Soft Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[#0ba5f7]/10 via-[#9873ff]/10 to-[#ff763c]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header */}
      <header className="w-full max-w-4xl flex items-center justify-between z-10">
        <div className="flex items-center gap-2">
          <span className="font-bold text-lg tracking-tight text-[#1d1d1f]">Dulaj Mendis</span>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-slate-600">
            Systems Architecture
          </span>
        </div>
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-white border border-slate-200/80 text-slate-700 shadow-sm hover:border-slate-400 hover:text-black transition-all"
        >
          <Lock className="w-3.5 h-3.5 text-slate-400" />
          <span>Preview Access</span>
        </button>
      </header>

      {/* Main Holding Content */}
      <main className="w-full max-w-xl text-center flex flex-col items-center my-auto py-12 z-10">
        {/* Avatar with Radiant Aura */}
        <div className="relative w-28 h-28 mb-8">
          <div className="absolute -inset-2 bg-gradient-to-tr from-[#ff763c] via-[#0ba5f7] to-[#9873ff] rounded-full blur-md opacity-40 animate-pulse" />
          <div className="relative w-full h-full rounded-full p-1 bg-white border border-slate-200 shadow-xl overflow-hidden">
            <Image
              src="/dulaj-mendis.png"
              alt="Dulaj Mendis"
              width={112}
              height={112}
              priority
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        </div>

        {/* Eyebrow & Status */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/70 text-emerald-700 text-xs font-medium mb-5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span>Private Engineering Preview • Launching Soon</span>
        </div>

        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#1d1d1f] mb-4">
          Systems Architect &amp;
          <br />
          Full-Stack Engineer.
        </h1>

        {/* Description */}
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-8 max-w-md">
          Manager of Sustainability &amp; System Administration at <strong className="text-slate-800 font-semibold">Connaissance De Ceylan</strong>.
          Architect of Travex DMC OS, PulseGuard observability, and the Sri Lanka Railway GIS network.
        </p>

        {/* Direct Contact Links */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          <a
            href="mailto:dulaj.mendis.sri@gmail.com"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1d1d1f] text-white text-xs font-semibold shadow-md hover:bg-black transition-all"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>dulaj.mendis.sri@gmail.com</span>
          </a>
          <a
            href="https://github.com/DulajMendis"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 text-slate-700 text-xs font-semibold shadow-sm hover:border-slate-300 hover:text-black transition-all"
          >
            <Github className="w-3.5 h-3.5 text-slate-500" />
            <span>GitHub</span>
          </a>
          <a
            href="https://railway.dulajmendis.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 text-slate-700 text-xs font-semibold shadow-sm hover:border-slate-300 hover:text-black transition-all"
          >
            <ExternalLink className="w-3.5 h-3.5 text-blue-500" />
            <span>Railway GIS</span>
          </a>
        </div>

        {/* Passcode Unlock Trigger */}
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="text-xs text-slate-400 hover:text-slate-600 flex items-center gap-1 transition-colors"
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Have an engineering preview passcode? Unlock now</span>
        </button>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-4xl flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2 border-t border-slate-100 pt-6 z-10">
        <p>© {new Date().getFullYear()} Dulaj Mendis. Colombo, Sri Lanka.</p>
        <p>Connaissance De Ceylan (CDC) Group</p>
      </footer>

      {/* Passcode Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-sm rounded-2xl bg-white p-6 border border-slate-200 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-blue-50 text-[#006ddb] flex items-center justify-center">
                  <Lock className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-slate-900">Private Preview</h2>
                  <p className="text-xs text-slate-500">Enter access passcode</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-lg leading-none"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleUnlock} className="space-y-3">
              <div>
                <input
                  type="password"
                  placeholder="Enter passcode"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  autoFocus
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none transition-all ${
                    error
                      ? 'border-red-500 bg-red-50/50 text-red-900 focus:ring-2 focus:ring-red-300'
                      : 'border-slate-200 focus:border-[#006ddb] focus:ring-2 focus:ring-[#006ddb]/20 text-slate-900'
                  }`}
                />
                {error && (
                  <p className="text-xs text-red-600 mt-1.5 font-medium">
                    Incorrect passcode. Please verify and try again.
                  </p>
                )}
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-500 hover:bg-slate-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#006ddb] text-white text-xs font-semibold shadow-sm hover:bg-[#005bb8] transition-colors"
                >
                  <span>Unlock</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
