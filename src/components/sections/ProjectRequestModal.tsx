'use client';

import React, { useState, useEffect } from 'react';
import { X, Send, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import Image from 'next/image';

interface ProjectRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectRequestModal: React.FC<ProjectRequestModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [systemType, setSystemType] = useState('Enterprise DMC / Operations');
  const [timeline, setTimeline] = useState('Immediate (1-3 weeks)');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [feedback, setFeedback] = useState('');

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) return; // bot trapped

    setStatus('submitting');
    setFeedback('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          message: `[${systemType} | Timeline: ${timeline}]\n\n${message}`,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setStatus('success');
        setFeedback('Your project request has been logged into the queue. Expect an architectural reply within 24 hours.');
      } else {
        setStatus('error');
        setFeedback(data.error || 'Failed to submit inquiry. Please email directly.');
      }
    } catch {
      setStatus('error');
      setFeedback('Network error. Please email dulaj.mendis.sri@gmail.com directly.');
    }
  };

  const systemTypes = [
    'Enterprise DMC / Operations',
    'High-Throughput Backend',
    'GIS & Transit Telemetry',
    'Developer Observability',
    'Strategic Advisory',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/60 backdrop-blur-md animate-fade-in">
      <div
        className="relative w-full max-w-xl rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden animate-fade-in-down"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-950 dark:hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="p-6 sm:p-8 pb-4 flex items-center gap-4 border-b border-slate-100 dark:border-slate-800/80">
          <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-white dark:border-slate-700 shadow-md flex-shrink-0">
            <Image
              src="/dulaj-mendis.png"
              alt="Dulaj Mendis"
              width={56}
              height={56}
              className="object-cover"
            />
          </div>
          <div>
            <h3 className="text-xl font-bold tracking-tight text-slate-950 dark:text-white">
              Project request
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Direct technical inquiry with Dulaj Mendis
            </p>
          </div>
        </div>

        {/* Form Body */}
        <div className="p-6 sm:p-8 pt-4">
          {status === 'success' ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                Request Dispatched Successfully
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-300 max-w-sm mx-auto">
                {feedback}
              </p>
              <button
                type="button"
                onClick={onClose}
                className="mt-4 px-6 py-2.5 rounded-full bg-slate-950 text-white dark:bg-white dark:text-slate-950 text-xs font-semibold"
              >
                Close Window
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Honeypot */}
              <input
                type="text"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Eleanor Vance"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Work Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. eleanor@venture.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* System Scope Type Pills */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  System Domain / Scope
                </label>
                <div className="flex flex-wrap gap-2">
                  {systemTypes.map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setSystemType(type)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                        systemType === type
                          ? 'bg-slate-950 text-white dark:bg-white dark:text-slate-950 font-semibold'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Architecture Overview / Goals *
                </label>
                <textarea
                  required
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell me about the system, data scale, or challenge you want to solve..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>

              {status === 'error' && (
                <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{feedback}</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full py-3.5 rounded-full bg-slate-950 text-white dark:bg-white dark:text-slate-950 text-sm font-semibold hover:bg-slate-800 dark:hover:bg-slate-200 transition-all flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
              >
                {status === 'submitting' ? (
                  <span>Dispatching...</span>
                ) : (
                  <>
                    <span>Submit project request</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>

              {/* Direct email fallback matching Thimira */}
              <div className="text-center pt-2 text-xs text-slate-500 dark:text-slate-400">
                Hate forms?{' '}
                <a
                  href="mailto:dulaj.mendis.sri@gmail.com"
                  className="font-medium text-slate-900 dark:text-white underline hover:opacity-80"
                >
                  dulaj.mendis.sri@gmail.com
                </a>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
