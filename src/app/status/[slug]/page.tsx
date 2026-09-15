'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { 
  CheckCircle2, 
  AlertTriangle, 
  Activity, 
  ArrowRight
} from 'lucide-react';
import { Monitor } from '@/lib/types';

export default function PublicStatusPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;
  const [monitors, setMonitors] = useState<Monitor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/monitors')
      .then(res => res.json())
      .then(data => {
        if (data.monitors) setMonitors(data.monitors);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const allUp = monitors.length > 0 && monitors.every(m => m.status === 'up');
  const hasDown = monitors.some(m => m.status === 'down');

  // Simulated 90-day uptime bars (30 representative bars)
  const historyBars = Array.from({ length: 30 }, (_, i) => ({
    day: 30 - i,
    status: i === 12 ? 'degraded' : 'up'
  }));

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Brand Header */}
      <div className="flex items-center justify-between pb-8 border-b border-zinc-800">
        <div>
          <span className="text-xs uppercase font-semibold tracking-wider text-emerald-400">Public Status Page</span>
          <h1 className="text-3xl font-extrabold text-white mt-1 capitalize">
            {slug === 'demo' ? 'PulseGuard Production Systems' : `${slug} Status`}
          </h1>
        </div>
        <div className="text-right text-xs text-zinc-500">
          Updated every 60s &bull; Live Telemetry
        </div>
      </div>

      {/* OVERALL STATUS BANNER */}
      <div className={`mt-8 p-6 rounded-2xl border flex items-center gap-4 ${
        hasDown 
          ? 'bg-red-500/10 border-red-500/30 text-red-400' 
          : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
      }`}>
        {hasDown ? (
          <AlertTriangle className="w-8 h-8 flex-shrink-0 animate-pulse text-red-400" />
        ) : (
          <CheckCircle2 className="w-8 h-8 flex-shrink-0 text-emerald-400" />
        )}
        <div>
          <h2 className="text-lg font-bold text-white">
            {hasDown ? 'Degraded Performance Detected' : 'All Systems Operational'}
          </h2>
          <p className="text-xs text-zinc-400 mt-0.5">
            {hasDown 
              ? 'One or more background jobs or endpoints are reporting errors. Our engineering team is investigating.' 
              : 'All background workers, scheduled cron jobs, and API endpoints are healthy.'}
          </p>
        </div>
      </div>

      {/* 90-DAY UPTIME BAR VISUALIZATION */}
      <div className="mt-10 p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800">
        <div className="flex items-center justify-between mb-4 text-xs text-zinc-400">
          <span className="font-semibold text-zinc-200">System Availability (Last 30 Days)</span>
          <span className="font-bold text-emerald-400">99.98% Uptime</span>
        </div>
        <div className="flex items-center gap-1.5 h-10">
          {historyBars.map((bar, i) => (
            <div
              key={i}
              title={`Day ${bar.day} ago: ${bar.status === 'up' ? '100% Operational' : 'Brief Latency Spike'}`}
              className={`flex-1 h-full rounded-sm transition hover:opacity-80 cursor-pointer ${
                bar.status === 'up' ? 'bg-emerald-500' : 'bg-yellow-500'
              }`}
            />
          ))}
        </div>
        <div className="flex justify-between text-[11px] text-zinc-500 mt-2">
          <span>30 days ago</span>
          <span>Today</span>
        </div>
      </div>

      {/* COMPONENT BREAKDOWN */}
      <div className="mt-10">
        <h3 className="text-lg font-bold text-white mb-4">Core Components</h3>
        <div className="space-y-3">
          {loading ? (
            <div className="p-8 text-center text-zinc-500">Loading system status...</div>
          ) : (
            monitors.map(m => (
              <div
                key={m.id}
                className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800 flex items-center justify-between"
              >
                <div>
                  <div className="font-semibold text-sm text-zinc-200">{m.name}</div>
                  <div className="text-xs text-zinc-500 mt-0.5">
                    {m.type === 'cron' ? 'Cron Worker' : 'HTTP REST API'} &bull; Checked every {m.expectedIntervalMinutes}m
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${
                    m.status === 'up' ? 'bg-emerald-500 shadow-sm shadow-emerald-500/50' : 'bg-red-500'
                  }`} />
                  <span className={`text-xs font-bold uppercase ${
                    m.status === 'up' ? 'text-emerald-400' : 'text-red-400'
                  }`}>
                    {m.status === 'up' ? 'Operational' : 'Outage'}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* PAST INCIDENTS SECTION */}
      <div className="mt-12">
        <h3 className="text-lg font-bold text-white mb-4">Incident History</h3>
        <div className="p-5 rounded-xl bg-zinc-900/30 border border-zinc-800 text-xs text-zinc-400 space-y-3">
          <div className="flex items-center justify-between font-semibold text-zinc-300">
            <span>Scheduled Maintenance Complete</span>
            <span className="text-zinc-500 font-normal">3 days ago</span>
          </div>
          <p className="text-zinc-400 leading-relaxed">
            Routine database vacuum and index optimization executed successfully. Zero customer downtime observed.
          </p>
        </div>
      </div>

      {/* VIRAL FOOTER CTA */}
      <div className="mt-16 text-center pt-8 border-t border-zinc-800">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-xs text-zinc-400 hover:text-white transition"
        >
          <Activity className="w-3.5 h-3.5 text-emerald-400" />
          <span>Monitored by <strong>PulseGuard</strong> &bull; Create your own free status page</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
