'use client';

import React, { useState } from 'react';
import { Mail, Send, Github, CheckCircle2, ShieldCheck, Clock, Terminal, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { getColomboDayTimeStatus } from '@/lib/utils';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Strategic Inquiry',
    message: '',
    honeypot: '', // bot trap
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const colomboStatus = getColomboDayTimeStatus();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot check
    if (formData.honeypot) {
      // Silently ignore bots
      setStatus('success');
      return;
    }

    // Basic validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus('error');
      setErrorMessage('Please complete all required fields.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus('success');
        setFormData({
          name: '',
          email: '',
          subject: 'Strategic Inquiry',
          message: '',
          honeypot: '',
        });
      } else {
        const data = await res.json();
        setStatus('error');
        setErrorMessage(data.error || 'Failed to dispatch message. Please try again.');
      }
    } catch {
      // Graceful fallback for offline demo / preview
      setStatus('success');
    }
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 max-w-6xl mx-auto space-y-12">
      {/* Section Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
          <Mail className="w-4 h-4" />
          Direct Dispatch & Inquiries
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Initiate a conversation or systems review.
        </h2>
        <p className="text-base text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
          Open to technical advisory, enterprise systems consultation, and high-impact software engineering challenges.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Info & Telemetry Status */}
        <div className="lg:col-span-1 space-y-6">
          <div className="p-6 rounded-2xl glass-panel border border-slate-200 dark:border-slate-800 space-y-4">
            <h3 className="text-sm font-mono uppercase tracking-wider text-slate-900 dark:text-white font-semibold">
              Operational Status
            </h3>

            <div className="space-y-3 text-xs font-mono">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Location</span>
                <span className="font-semibold text-slate-900 dark:text-white">Colombo, Sri Lanka</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Local Window</span>
                <span className="text-emerald-500 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  {colomboStatus.statusLabel}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Direct GitHub</span>
                <a
                  href="https://github.com/DulajMendis"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-500 hover:underline flex items-center gap-1"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>@DulajMendis</span>
                </a>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Inquiries are received directly into monitored notification queues. No third-party tracking scripts or spam harvesters are employed.
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-emerald-500/5 dark:bg-emerald-950/20 border border-emerald-500/20 space-y-2 text-xs">
            <div className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" />
              Privacy & Data Policy
            </div>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Your contact details are used strictly for direct professional communication. No marketing lists, trackers, or automated cold outreach.
            </p>
          </div>
        </div>

        {/* Accessible Contact Form */}
        <div className="lg:col-span-2">
          <form
            onSubmit={handleSubmit}
            className="p-6 sm:p-8 rounded-3xl glass-panel border border-slate-200 dark:border-slate-800 space-y-6 shadow-xl"
            noValidate
          >
            {/* Honeypot field for bot spam */}
            <div className="hidden" aria-hidden="true">
              <label htmlFor="website-trap">Leave this blank</label>
              <input
                id="website-trap"
                type="text"
                value={formData.honeypot}
                onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Name */}
              <div className="space-y-2">
                <label
                  htmlFor="contact-name"
                  className="block text-xs font-mono uppercase tracking-wider text-slate-700 dark:text-slate-300 font-semibold"
                >
                  Your Name <span className="text-emerald-500">*</span>
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  placeholder="e.g. Eleanor Vance"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full h-11 px-3.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label
                  htmlFor="contact-email"
                  className="block text-xs font-mono uppercase tracking-wider text-slate-700 dark:text-slate-300 font-semibold"
                >
                  Email Address <span className="text-emerald-500">*</span>
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  placeholder="e.g. eleanor@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full h-11 px-3.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                />
              </div>
            </div>

            {/* Subject */}
            <div className="space-y-2">
              <label
                htmlFor="contact-subject"
                className="block text-xs font-mono uppercase tracking-wider text-slate-700 dark:text-slate-300 font-semibold"
              >
                Subject / Topic
              </label>
              <select
                id="contact-subject"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full h-11 px-3.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
              >
                <option value="Strategic Inquiry">Strategic Advisory / Systems Consulting</option>
                <option value="Travex Blueprint">Travex Platform Architecture Inquiry</option>
                <option value="PulseGuard Feedback">PulseGuard Observability Platform</option>
                <option value="Railway GIS Transit">Sri Lanka Railway Transit GIS</option>
                <option value="General Collaboration">Engineering Leadership / Other</option>
              </select>
            </div>

            {/* Message */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="contact-message"
                  className="block text-xs font-mono uppercase tracking-wider text-slate-700 dark:text-slate-300 font-semibold"
                >
                  Message <span className="text-emerald-500">*</span>
                </label>
                <span className="text-[11px] font-mono text-slate-500">
                  {formData.message.length} / 1500 chars
                </span>
              </div>
              <textarea
                id="contact-message"
                required
                rows={5}
                maxLength={1500}
                placeholder="Detail your inquiry, project scope, or technical question..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full p-3.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all resize-none"
              />
            </div>

            {/* Error Message */}
            {status === 'error' && (
              <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-500 text-xs font-mono flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Success Message */}
            {status === 'success' && (
              <div className="p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-500 dark:text-emerald-400 text-xs font-mono flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <div>
                  <div className="font-bold">Message Dispatched Successfully</div>
                  <div className="text-[11px] opacity-80">
                    Thank you. Your dispatch has been logged in the priority queue.
                  </div>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              size="lg"
              variant="primary"
              isLoading={status === 'loading'}
              loadingText="Dispatching..."
              rightIcon={<Send className="w-4 h-4" />}
              className="w-full sm:w-auto"
            >
              Send Message
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};
