'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ShieldCheck, AlertCircle, CheckCircle2, ArrowRight, RefreshCw, Globe } from 'lucide-react';

export default function HeaderAnalyzerPage() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch('/api/tools/headers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      });
      const data = await res.json();
      setResult(data);
    } catch (err: any) {
      setResult({ error: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-400 text-xs font-semibold mb-3">
          <Globe className="w-3.5 h-3.5" />
          Free Developer Utility
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          HTTP Security Headers &amp; Latency Analyzer
        </h1>
        <p className="text-zinc-400 text-sm mt-3">
          Audit HSTS, Content-Security-Policy, X-Frame-Options, and server latency in real-time.
        </p>
      </div>

      <form onSubmit={handleScan} className="max-w-xl mx-auto flex gap-2 mb-10">
        <input
          type="text"
          required
          placeholder="https://yourwebsite.com or API domain"
          value={url}
          onChange={e => setUrl(e.target.value)}
          className="flex-1 bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-purple-500 font-mono"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm flex items-center gap-2 transition disabled:opacity-50"
        >
          {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : 'Analyze'}
        </button>
      </form>

      {result && (
        <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-6 animate-in fade-in duration-200">
          {result.error ? (
            <div className="text-red-400 text-sm">{result.error}</div>
          ) : (
            <>
              <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
                <div>
                  <span className="text-xs text-zinc-500">Target Inspected</span>
                  <div className="text-base font-bold text-white font-mono">{result.url}</div>
                </div>
                <div className="text-right">
                  <span className="text-xs text-zinc-500">HTTP Status</span>
                  <div className="text-base font-bold text-emerald-400">{result.statusCode} OK</div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800">
                  <span className="text-xs text-zinc-400">Security Score</span>
                  <div className="text-3xl font-extrabold text-purple-400 mt-1">
                    {result.securityAnalysis?.score || 0} / 100
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800">
                  <span className="text-xs text-zinc-400">Server Latency</span>
                  <div className="text-3xl font-extrabold text-zinc-200 mt-1">
                    {result.latencyMs} ms
                  </div>
                </div>
              </div>

              {/* Recommendations */}
              <div>
                <h4 className="text-xs uppercase font-semibold text-zinc-400 tracking-wider mb-2">
                  Actionable Hardening Checklist
                </h4>
                <div className="space-y-2">
                  {result.securityAnalysis?.recommendations?.length > 0 ? (
                    result.securityAnalysis.recommendations.map((rec: string, i: number) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-yellow-300/90 bg-yellow-500/10 p-2.5 rounded-lg border border-yellow-500/20">
                        <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                        <span>{rec}</span>
                      </div>
                    ))
                  ) : (
                    <div className="text-xs text-emerald-400 bg-emerald-500/10 p-3 rounded-lg border border-emerald-500/20">
                      Excellent! All recommended security headers are present.
                    </div>
                  )}
                </div>
              </div>

              <div className="p-5 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-between">
                <span className="text-xs text-zinc-400">Want automated 60-second latency &amp; status monitoring?</span>
                <Link
                  href="/dashboard"
                  className="px-4 py-2 rounded-xl bg-purple-600 text-white font-bold text-xs flex items-center gap-1.5"
                >
                  Monitor API <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
