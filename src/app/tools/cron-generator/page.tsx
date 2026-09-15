'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Clock, Copy, Check, ArrowRight, Terminal } from 'lucide-react';

export default function CronGeneratorPage() {
  const [minute, setMinute] = useState('0');
  const [hour, setHour] = useState('2');
  const [dom, setDom] = useState('*');
  const [month, setMonth] = useState('*');
  const [dow, setDow] = useState('*');
  const [copied, setCopied] = useState(false);

  const cronExpression = `${minute} ${hour} ${dom} ${month} ${dow}`;

  const presets = [
    { label: 'Every 5 minutes', expr: ['*/5', '*', '*', '*', '*'] },
    { label: 'Every hour', expr: ['0', '*', '*', '*', '*'] },
    { label: 'Daily at 02:00 UTC', expr: ['0', '2', '*', '*', '*'] },
    { label: 'Weekly on Sunday', expr: ['0', '0', '*', '*', '0'] },
    { label: '1st of every month', expr: ['0', '0', '1', '*', '*'] },
  ];

  const applyPreset = (expr: string[]) => {
    setMinute(expr[0]);
    setHour(expr[1]);
    setDom(expr[2]);
    setMonth(expr[3]);
    setDow(expr[4]);
  };

  const sampleBash = `${cronExpression} /usr/local/bin/my_job.sh && curl -fsS -m 10 --retry 3 -o /dev/null https://pulseguard.vercel.app/api/ping/YOUR_MONITOR_ID`;

  const copyBash = () => {
    navigator.clipboard.writeText(sampleBash);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-semibold mb-3">
          <Clock className="w-3.5 h-3.5" />
          Free Developer Utility
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Visual Cron Expression &amp; Heartbeat Builder
        </h1>
        <p className="text-zinc-400 text-sm mt-3">
          Generate accurate crontab schedules and attach PulseGuard dead man&apos;s switch monitoring in one click.
        </p>
      </div>

      {/* PRESETS */}
      <div className="flex flex-wrap gap-2 justify-center mb-8">
        {presets.map((p, i) => (
          <button
            key={i}
            onClick={() => applyPreset(p.expr)}
            className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-cyan-500/40 text-xs text-zinc-300 transition"
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* VISUAL BUILDER */}
      <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 max-w-2xl mx-auto space-y-6">
        <div className="grid grid-cols-5 gap-3 text-center">
          <div>
            <label className="block text-xs font-semibold text-zinc-400 mb-1">Minute</label>
            <input
              type="text"
              value={minute}
              onChange={e => setMinute(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-2 text-center text-sm font-mono text-white focus:outline-none focus:border-cyan-500"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-zinc-400 mb-1">Hour</label>
            <input
              type="text"
              value={hour}
              onChange={e => setHour(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-2 text-center text-sm font-mono text-white focus:outline-none focus:border-cyan-500"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-zinc-400 mb-1">Day/Mo</label>
            <input
              type="text"
              value={dom}
              onChange={e => setDom(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-2 text-center text-sm font-mono text-white focus:outline-none focus:border-cyan-500"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-zinc-400 mb-1">Month</label>
            <input
              type="text"
              value={month}
              onChange={e => setMonth(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-2 text-center text-sm font-mono text-white focus:outline-none focus:border-cyan-500"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-zinc-400 mb-1">Weekday</label>
            <input
              type="text"
              value={dow}
              onChange={e => setDow(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-2 text-center text-sm font-mono text-white focus:outline-none focus:border-cyan-500"
            />
          </div>
        </div>

        {/* OUTPUT DISPLAY */}
        <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-between">
          <div>
            <span className="text-[11px] text-zinc-500 uppercase font-semibold">Generated Expression</span>
            <div className="font-mono text-xl font-bold text-cyan-400 tracking-wider mt-0.5">
              {cronExpression}
            </div>
          </div>
        </div>

        {/* PROTECTED CRONTAB LINE */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-zinc-300">Protected Shell Command</span>
            <button
              onClick={copyBash}
              className="text-xs text-zinc-400 hover:text-white flex items-center gap-1.5 px-2.5 py-1 rounded bg-zinc-800 border border-zinc-700"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              {copied ? 'Copied' : 'Copy line'}
            </button>
          </div>
          <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 font-mono text-xs text-zinc-300 overflow-x-auto">
            {sampleBash}
          </div>
        </div>

        {/* CONVERSION CTA */}
        <div className="pt-4 border-t border-zinc-800 text-center">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-xs text-cyan-400 hover:text-cyan-300 font-semibold"
          >
            Create your unique monitor ID in PulseGuard Dashboard <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
