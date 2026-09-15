'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Activity, 
  Clock, 
  Plus, 
  Trash2, 
  Play, 
  CheckCircle2, 
  AlertCircle, 
  ExternalLink, 
  Copy, 
  Check, 
  RefreshCw,
  Bell,
  Shield,
  Send,
  AlertTriangle
} from 'lucide-react';
import { Monitor, MonitorType } from '@/lib/types';

export default function DashboardPage() {
  const [monitors, setMonitors] = useState<Monitor[]>([]);
  const [loading, setLoading] = useState(true);
  const [checking, setChecking] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Form state for creating new monitor
  const [name, setName] = useState('');
  const [type, setType] = useState<MonitorType>('cron');
  const [target, setTarget] = useState('');
  const [expectedInterval, setExpectedInterval] = useState(60);
  const [gracePeriod, setGracePeriod] = useState(10);
  const [webhookUrl, setWebhookUrl] = useState('');

  const fetchMonitors = async () => {
    try {
      const res = await fetch('/api/monitors');
      const data = await res.json();
      if (data.monitors) {
        setMonitors(data.monitors);
      }
    } catch (err) {
      console.error('Failed to load monitors:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMonitors();
    const interval = setInterval(fetchMonitors, 15000);
    return () => clearInterval(interval);
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/monitors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          type,
          target: type === 'http' ? target : undefined,
          expectedIntervalMinutes: expectedInterval,
          gracePeriodMinutes: gracePeriod,
          alertWebhookUrl: webhookUrl || undefined
        })
      });
      if (res.ok) {
        setShowModal(false);
        setName('');
        setTarget('');
        fetchMonitors();
      }
    } catch (err) {
      alert('Error creating monitor: ' + err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this monitor?')) return;
    try {
      await fetch(`/api/monitors/${id}`, { method: 'DELETE' });
      fetchMonitors();
    } catch (err) {
      console.error(err);
    }
  };

  const handleManualPing = async (id: string) => {
    try {
      await fetch(`/api/ping/${id}?duration=85&msg=Manual+dashboard+ping`);
      fetchMonitors();
    } catch (err) {
      console.error(err);
    }
  };

  const handleRunChecks = async () => {
    setChecking(true);
    try {
      await fetch('/api/check', { method: 'POST' });
      await fetchMonitors();
    } catch (err) {
      console.error(err);
    } finally {
      setChecking(false);
    }
  };

  const copyCurl = (id: string) => {
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://pulseguard.vercel.app';
    const cmd = `curl -fsS -m 10 --retry 3 -o /dev/null "${origin}/api/ping/${id}"`;
    navigator.clipboard.writeText(cmd);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const upCount = monitors.filter(m => m.status === 'up').length;
  const downCount = monitors.filter(m => m.status === 'down').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Top bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-zinc-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Active Monitors</h1>
          <p className="text-zinc-400 text-sm mt-1">Real-time status of your background jobs, workers, and API endpoints.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleRunChecks}
            disabled={checking}
            className="px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-700 hover:bg-zinc-800 text-zinc-300 text-sm font-medium flex items-center gap-2 transition disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${checking ? 'animate-spin' : ''}`} />
            {checking ? 'Checking...' : 'Run Checks Now'}
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 text-sm font-bold flex items-center gap-1.5 shadow-md shadow-emerald-500/20 transition"
          >
            <Plus className="w-4 h-4" /> Add Monitor
          </button>
        </div>
      </div>

      {/* METRIC OVERVIEW CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 my-8">
        <div className="p-5 rounded-2xl bg-zinc-900/50 border border-zinc-800">
          <span className="text-xs font-medium text-zinc-400">Total Monitored</span>
          <div className="text-2xl font-bold text-white mt-1">{monitors.length}</div>
        </div>
        <div className="p-5 rounded-2xl bg-zinc-900/50 border border-zinc-800">
          <span className="text-xs font-medium text-emerald-400 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> Operational
          </span>
          <div className="text-2xl font-bold text-emerald-400 mt-1">{upCount}</div>
        </div>
        <div className="p-5 rounded-2xl bg-zinc-900/50 border border-zinc-800">
          <span className="text-xs font-medium text-red-400 flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5" /> Failing / Down
          </span>
          <div className="text-2xl font-bold text-red-400 mt-1">{downCount}</div>
        </div>
        <div className="p-5 rounded-2xl bg-zinc-900/50 border border-zinc-800">
          <span className="text-xs font-medium text-zinc-400">Avg Uptime</span>
          <div className="text-2xl font-bold text-white mt-1">99.98%</div>
        </div>
      </div>

      {/* MONITORS LIST */}
      <div className="space-y-4">
        {loading ? (
          <div className="p-12 text-center text-zinc-500 bg-zinc-900/20 rounded-2xl border border-zinc-800">
            <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-emerald-400" />
            Loading monitors...
          </div>
        ) : monitors.length === 0 ? (
          <div className="p-12 text-center text-zinc-500 bg-zinc-900/20 rounded-2xl border border-zinc-800">
            <p className="text-base font-semibold text-zinc-300">No monitors configured yet.</p>
            <p className="text-sm mt-1">Create your first cron heartbeat or website uptime check.</p>
            <button
              onClick={() => setShowModal(true)}
              className="mt-4 px-4 py-2 rounded-xl bg-emerald-500 text-zinc-950 text-sm font-bold inline-flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" /> Create Monitor
            </button>
          </div>
        ) : (
          monitors.map((m) => {
            const isUp = m.status === 'up';
            const isDown = m.status === 'down';
            return (
              <div
                key={m.id}
                className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 hover:border-zinc-700 transition flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-3.5">
                  <div className={`w-3.5 h-3.5 rounded-full mt-1.5 flex-shrink-0 ${
                    isUp ? 'bg-emerald-500 shadow-sm shadow-emerald-500/50' : 
                    isDown ? 'bg-red-500 shadow-sm shadow-red-500/50 animate-pulse' : 'bg-yellow-500'
                  }`} />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-white text-base">{m.name}</h3>
                      <span className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full border ${
                        m.type === 'cron' 
                          ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' 
                          : 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20'
                      }`}>
                        {m.type}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-400 mt-2">
                      {m.target && (
                        <span className="font-mono text-zinc-300 bg-zinc-800/80 px-2 py-0.5 rounded">
                          {m.target}
                        </span>
                      )}
                      <span>Interval: {m.expectedIntervalMinutes}m (+{m.gracePeriodMinutes}m grace)</span>
                      {m.lastPingAt && (
                        <span>Last ping: {new Date(m.lastPingAt).toLocaleTimeString()}</span>
                      )}
                      {m.avgLatencyMs > 0 && (
                        <span>Latency: {m.avgLatencyMs}ms</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-3 md:pt-0 border-t md:border-t-0 border-zinc-800/60 justify-end">
                  {m.type === 'cron' && (
                    <button
                      onClick={() => copyCurl(m.id)}
                      className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-mono flex items-center gap-1.5 transition"
                      title="Copy curl command for this monitor"
                    >
                      {copiedId === m.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>curl ping</span>
                        </>
                      )}
                    </button>
                  )}

                  <button
                    onClick={() => handleManualPing(m.id)}
                    className="p-2 rounded-lg bg-zinc-800/80 hover:bg-zinc-700 text-zinc-400 hover:text-emerald-400 transition"
                    title="Send test heartbeat now"
                  >
                    <Play className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => handleDelete(m.id)}
                    className="p-2 rounded-lg bg-zinc-800/80 hover:bg-red-500/20 text-zinc-500 hover:text-red-400 transition"
                    title="Delete monitor"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* CREATE MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl">
            <h2 className="text-xl font-bold text-white mb-1">Create New Monitor</h2>
            <p className="text-xs text-zinc-400 mb-6">Choose between a Cron Dead Man&apos;s Switch or Synthetic HTTP Check.</p>

            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Monitor Type</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setType('cron')}
                    className={`py-2 px-3 rounded-xl border text-xs font-medium flex items-center justify-center gap-2 ${
                      type === 'cron' 
                        ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400 font-bold' 
                        : 'border-zinc-800 bg-zinc-950 text-zinc-400'
                    }`}
                  >
                    <Clock className="w-3.5 h-3.5" /> Cron Heartbeat
                  </button>
                  <button
                    type="button"
                    onClick={() => setType('http')}
                    className={`py-2 px-3 rounded-xl border text-xs font-medium flex items-center justify-center gap-2 ${
                      type === 'http' 
                        ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400 font-bold' 
                        : 'border-zinc-800 bg-zinc-950 text-zinc-400'
                    }`}
                  >
                    <Activity className="w-3.5 h-3.5" /> HTTP / API Ping
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Monitor Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Daily Stripe Invoice Sync"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              {type === 'http' && (
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">Target Endpoint URL</label>
                  <input
                    type="url"
                    required
                    placeholder="https://api.yourdomain.com/health"
                    value={target}
                    onChange={e => setTarget(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">Expected Interval</label>
                  <select
                    value={expectedInterval}
                    onChange={e => setExpectedInterval(Number(e.target.value))}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value={1}>Every 1 minute (Pro)</option>
                    <option value={5}>Every 5 minutes</option>
                    <option value={15}>Every 15 minutes</option>
                    <option value={60}>Every 1 hour</option>
                    <option value={1440}>Every 24 hours (Daily)</option>
                    <option value={10080}>Every 7 days (Weekly)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">Grace Period</label>
                  <select
                    value={gracePeriod}
                    onChange={e => setGracePeriod(Number(e.target.value))}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value={5}>5 minutes</option>
                    <option value={10}>10 minutes</option>
                    <option value={30}>30 minutes</option>
                    <option value={60}>1 hour</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Alert Webhook URL (Discord / Slack)</label>
                <input
                  type="url"
                  placeholder="https://discord.com/api/webhooks/... or Slack webhook"
                  value={webhookUrl}
                  onChange={e => setWebhookUrl(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-800 mt-6">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-zinc-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 text-xs font-bold transition"
                >
                  Save Monitor
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
