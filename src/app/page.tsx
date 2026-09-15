'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Activity, 
  Terminal, 
  ShieldCheck, 
  BellRing, 
  CheckCircle2, 
  AlertTriangle, 
  Zap, 
  ArrowRight, 
  Clock, 
  Copy, 
  Check, 
  Server, 
  Globe, 
  Sparkles 
} from 'lucide-react';

export default function HomePage() {
  const [copied, setCopied] = useState(false);
  const sampleCurl = 'curl -fsS -m 10 --retry 5 -o /dev/null https://pulseguard.vercel.app/api/ping/cron-billing-sync';

  const copyToClipboard = () => {
    navigator.clipboard.writeText(sampleCurl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none -z-10" />

      {/* HERO SECTION */}
      <section className="pt-20 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-medium mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Launch Deal: First 50 Developers Get Lifetime Pro for $99</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-[1.15] max-w-4xl mx-auto">
          Stop Silent Background Failures <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
            Before Your Customers Notice.
          </span>
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
          The all-in-one developer shield. Dead man&apos;s switch cron heartbeats, synthetic API uptime, SSL expiry warnings, and branded status pages in one unified platform.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/dashboard"
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-base shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 transition transform hover:-translate-y-0.5"
          >
            Create Your First Monitor Free <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/status/demo"
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl border border-zinc-800 hover:border-zinc-700 bg-zinc-900/60 text-zinc-200 font-medium text-base hover:bg-zinc-800/60 transition flex items-center justify-center gap-2"
          >
            <Globe className="w-4 h-4 text-emerald-400" />
            View Live Public Status Page
          </Link>
        </div>

        {/* 15-SECOND IMPLEMENTATION SNIPPET */}
        <div className="mt-12 max-w-3xl mx-auto bg-zinc-900/90 border border-zinc-800 rounded-2xl p-4 sm:p-6 text-left shadow-2xl backdrop-blur-sm">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-zinc-800">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              <span className="text-xs text-zinc-400 ml-2 font-mono">crontab -e &nbsp;&bull;&nbsp; 15-second setup</span>
            </div>
            <button
              onClick={copyToClipboard}
              className="text-xs text-zinc-400 hover:text-white flex items-center gap-1.5 px-2.5 py-1 rounded bg-zinc-800/80 border border-zinc-700/60 transition"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied' : 'Copy command'}
            </button>
          </div>
          <div className="font-mono text-xs sm:text-sm text-zinc-300 overflow-x-auto py-2">
            <span className="text-zinc-500"># Run daily billing at 02:00 UTC and ping PulseGuard on success:</span>
            <br />
            <span className="text-emerald-400">0 2 * * *</span> /usr/local/bin/run_billing.sh &amp;&amp; {sampleCurl}
          </div>
        </div>
      </section>

      {/* CORE CAPABILITIES GRID */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-white">Everything Required to Guard Production</h2>
          <p className="text-zinc-400 mt-3 text-base">
            Replace 3 separate subscriptions (Cronitor + UptimeRobot + Instatus) with one clean, developer-first cockpit.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800 hover:border-emerald-500/40 transition group">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-5 group-hover:scale-110 transition">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Cron Job Heartbeats</h3>
            <p className="text-zinc-400 text-sm leading-relaxed mb-4">
              Dead man&apos;s switch monitoring for background workers, backups, and scheduled tasks. If your job fails or doesn&apos;t ping on time, we sound the alarm.
            </p>
            <ul className="space-y-2 text-xs text-zinc-300">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Configurable grace periods</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Duration &amp; execution log tracking</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Works with curl, Python, Node, Ruby, Go</li>
            </ul>
          </div>

          {/* Card 2 */}
          <div className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800 hover:border-emerald-500/40 transition group">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-5 group-hover:scale-110 transition">
              <Activity className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Synthetic API &amp; Web Checks</h3>
            <p className="text-zinc-400 text-sm leading-relaxed mb-4">
              Continuous 60-second pinging of critical API endpoints, webhooks, and SaaS login pages with response time tracking and status code assertions.
            </p>
            <ul className="space-y-2 text-xs text-zinc-300">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-cyan-400" /> Multi-region latency history</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-cyan-400" /> SSL Certificate Expiry Alerting (30/14/7 days)</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-cyan-400" /> Custom headers &amp; payload inspection</li>
            </ul>
          </div>

          {/* Card 3 */}
          <div className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800 hover:border-emerald-500/40 transition group">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-5 group-hover:scale-110 transition">
              <Globe className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Hosted Status Pages</h3>
            <p className="text-zinc-400 text-sm leading-relaxed mb-4">
              Showcase 99.99% reliability to customers, reduce inbound support tickets, and maintain enterprise trust during incidents with public or private status pages.
            </p>
            <ul className="space-y-2 text-xs text-zinc-300">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-purple-400" /> 90-day interactive uptime history</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-purple-400" /> Custom domains (status.yourcompany.com)</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-purple-400" /> Real-time incident logs &amp; post-mortems</li>
            </ul>
          </div>
        </div>
      </section>

      {/* FREE TOOLS PREVIEW SECTION (LEAD MAGNET ENGINE) */}
      <section className="py-16 bg-zinc-900/30 border-y border-zinc-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between mb-8">
            <div>
              <span className="text-emerald-400 text-xs font-semibold uppercase tracking-wider">Free Engineering Utilities</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">Instant Diagnostic Tools (No Sign-Up Required)</h2>
            </div>
            <p className="text-zinc-400 text-sm max-w-md mt-2 md:mt-0">
              Used by thousands of developers every day for quick audits, crontab syntax checking, and SSL debugging.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <Link
              href="/tools/ssl-checker"
              className="p-5 rounded-xl border border-zinc-800 bg-zinc-950/60 hover:border-zinc-700 hover:bg-zinc-900/60 transition flex flex-col justify-between"
            >
              <div>
                <div className="text-emerald-400 font-semibold text-sm mb-1 flex items-center justify-between">
                  <span>SSL &amp; Chain Checker</span>
                  <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded">Free</span>
                </div>
                <p className="text-zinc-400 text-xs leading-relaxed">
                  Inspect TLS certificate chain, SAN domains, and exact days until expiration.
                </p>
              </div>
              <div className="mt-4 text-xs font-medium text-emerald-400 flex items-center gap-1">
                Scan Domain <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>

            <Link
              href="/tools/cron-generator"
              className="p-5 rounded-xl border border-zinc-800 bg-zinc-950/60 hover:border-zinc-700 hover:bg-zinc-900/60 transition flex flex-col justify-between"
            >
              <div>
                <div className="text-cyan-400 font-semibold text-sm mb-1 flex items-center justify-between">
                  <span>Visual Cron Generator</span>
                  <span className="text-[10px] bg-cyan-500/10 text-cyan-400 px-2 py-0.5 rounded">Free</span>
                </div>
                <p className="text-zinc-400 text-xs leading-relaxed">
                  Generate crontab syntax visually and preview the next 5 execution timestamps.
                </p>
              </div>
              <div className="mt-4 text-xs font-medium text-cyan-400 flex items-center gap-1">
                Build Schedule <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>

            <Link
              href="/tools/header-analyzer"
              className="p-5 rounded-xl border border-zinc-800 bg-zinc-950/60 hover:border-zinc-700 hover:bg-zinc-900/60 transition flex flex-col justify-between"
            >
              <div>
                <div className="text-purple-400 font-semibold text-sm mb-1 flex items-center justify-between">
                  <span>Security Header Scanner</span>
                  <span className="text-[10px] bg-purple-500/10 text-purple-400 px-2 py-0.5 rounded">Free</span>
                </div>
                <p className="text-zinc-400 text-xs leading-relaxed">
                  Audit HSTS, CSP, X-Frame-Options, and get an automated A+ to F security score.
                </p>
              </div>
              <div className="mt-4 text-xs font-medium text-purple-400 flex items-center gap-1">
                Audit Headers <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* PRICING CALLOUT & LAUNCH OFFER */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-white">Simple, Honest Pricing. No Per-Seat Penalties.</h2>
          <p className="text-zinc-400 mt-3 text-base">
            Start free with 3 monitors. Upgrade to Pro when your business demands 1-minute checks and multi-channel alerting.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto text-left">
          {/* Free Tier */}
          <div className="p-7 rounded-2xl bg-zinc-900/40 border border-zinc-800 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold text-white">Hobby Developer</h3>
              <p className="text-zinc-400 text-xs mt-1">For side projects and experiments</p>
              <div className="mt-6 mb-6">
                <span className="text-4xl font-extrabold text-white">$0</span>
                <span className="text-zinc-400 text-sm ml-2">/ forever</span>
              </div>
              <ul className="space-y-3 text-sm text-zinc-300">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> 3 Monitors (Cron or HTTP)</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> 10-minute check intervals</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> 7-day log retention</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Email incident alerts</li>
              </ul>
            </div>
            <Link
              href="/dashboard"
              className="mt-8 block text-center py-2.5 rounded-xl border border-zinc-700 hover:bg-zinc-800 text-zinc-200 font-semibold text-sm transition"
            >
              Get Started Free
            </Link>
          </div>

          {/* Pro Tier (Featured) */}
          <div className="p-7 rounded-2xl bg-gradient-to-b from-emerald-950/40 via-zinc-900/90 to-zinc-950 border-2 border-emerald-500 flex flex-col justify-between relative shadow-xl shadow-emerald-500/10">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-emerald-500 text-zinc-950 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
              Most Popular
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Pro Shield</h3>
              <p className="text-zinc-400 text-xs mt-1">For production apps &amp; indie startups</p>
              <div className="mt-6 mb-6">
                <span className="text-4xl font-extrabold text-white">$19</span>
                <span className="text-zinc-400 text-sm ml-2">/ month</span>
              </div>
              <ul className="space-y-3 text-sm text-zinc-300">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> 25 Monitors (Cron + HTTP + API)</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> 1-minute high-frequency checks</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> 90-day history &amp; latency charts</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Discord &amp; Slack Webhook alerts</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> SSL Expiration auto-detection</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Custom branded status page</li>
              </ul>
            </div>
            <Link
              href="/pricing"
              className="mt-8 block text-center py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-sm shadow-md shadow-emerald-500/20 transition"
            >
              Start 14-Day Free Trial
            </Link>
          </div>

          {/* Lifetime Deal Special */}
          <div className="p-7 rounded-2xl bg-zinc-900/40 border border-zinc-800 flex flex-col justify-between">
            <div>
              <div className="inline-block text-[11px] font-bold text-purple-400 bg-purple-500/10 border border-purple-500/20 px-2 py-0.5 rounded mb-2">
                Launch Exclusive (First 50 Only)
              </div>
              <h3 className="text-xl font-bold text-white">Lifetime Pass</h3>
              <p className="text-zinc-400 text-xs mt-1">Pay once, protected forever</p>
              <div className="mt-6 mb-6">
                <span className="text-4xl font-extrabold text-white">$99</span>
                <span className="text-zinc-400 text-sm ml-2">/ one-time</span>
              </div>
              <ul className="space-y-3 text-sm text-zinc-300">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-purple-400" /> All Pro Shield Features included</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-purple-400" /> Lifetime access &amp; future updates</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-purple-400" /> Zero recurring monthly subscription</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-purple-400" /> Founder community status</li>
              </ul>
            </div>
            <Link
              href="/pricing"
              className="mt-8 block text-center py-2.5 rounded-xl border border-purple-500/40 hover:bg-purple-500/10 text-purple-300 font-semibold text-sm transition"
            >
              Claim Lifetime Deal ($99)
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
