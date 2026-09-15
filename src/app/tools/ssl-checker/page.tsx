'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ShieldCheck, AlertTriangle, Clock, ArrowRight, RefreshCw, CheckCircle2, Lock } from 'lucide-react';

export default function SslCheckerPage() {
  const [domain, setDomain] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!domain) return;
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch('/api/tools/ssl', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ domain })
      });
      const data = await res.json();
      setResult(data);
    } catch (err: any) {
      setResult({ valid: false, error: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-semibold mb-3">
          <Lock className="w-3.5 h-3.5" />
          Free Developer Utility
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Live SSL Certificate &amp; Expiry Checker
        </h1>
        <p className="text-zinc-400 text-sm mt-3">
          Instantly inspect any domain&apos;s TLS certificate chain, issuer, and days until expiration.
        </p>
      </div>

      {/* Input Form */}
      <form onSubmit={handleScan} className="max-w-xl mx-auto flex gap-2 mb-10">
        <input
          type="text"
          required
          placeholder="example.com or api.mycompany.io"
          value={domain}
          onChange={e => setDomain(e.target.value)}
          className="flex-1 bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500 font-mono"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-sm flex items-center gap-2 transition disabled:opacity-50"
        >
          {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : 'Inspect SSL'}
        </button>
      </form>

      {/* RESULT DISPLAY */}
      {result && (
        <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 animate-in fade-in duration-200">
          {result.error ? (
            <div className="flex items-start gap-3 text-red-400">
              <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-sm">Scan Failed</h3>
                <p className="text-xs text-zinc-400 mt-1">{result.error}</p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
                <div>
                  <span className="text-xs text-zinc-500">Domain Inspected</span>
                  <h3 className="text-xl font-bold text-white font-mono">{result.domain}</h3>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                    result.valid ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400'
                  }`}>
                    {result.valid ? 'Valid SSL' : 'Invalid / Expired'}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800">
                  <span className="text-xs text-zinc-400">Days Remaining</span>
                  <div className={`text-2xl font-extrabold mt-1 ${
                    result.daysRemaining < 14 ? 'text-red-400' : result.daysRemaining < 30 ? 'text-yellow-400' : 'text-emerald-400'
                  }`}>
                    {result.daysRemaining} days
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800">
                  <span className="text-xs text-zinc-400">Certificate Authority (CA)</span>
                  <div className="text-sm font-semibold text-zinc-200 mt-1 truncate">
                    {result.issuer}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800">
                  <span className="text-xs text-zinc-400">Expires On</span>
                  <div className="text-sm font-semibold text-zinc-200 mt-1">
                    {new Date(result.validTo).toLocaleDateString()}
                  </div>
                </div>
              </div>

              {/* CONVERSION CTA */}
              <div className="p-5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h4 className="font-bold text-emerald-400 text-sm">Never let this SSL certificate expire unexpectedly.</h4>
                  <p className="text-xs text-zinc-300 mt-0.5">
                    Add <strong>{result.domain}</strong> to PulseGuard for automatic 30, 14, and 7-day Slack/Discord alerts.
                  </p>
                </div>
                <Link
                  href="/dashboard"
                  className="px-4 py-2 rounded-xl bg-emerald-500 text-zinc-950 font-bold text-xs flex items-center justify-center gap-1.5 flex-shrink-0"
                >
                  Monitor This Domain Free <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
