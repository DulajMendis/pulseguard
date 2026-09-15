import Link from 'next/link';
import { Activity, ShieldCheck, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800/60 bg-zinc-950 py-12 text-sm text-zinc-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 text-white font-bold text-base mb-3">
            <Activity className="w-5 h-5 text-emerald-400" />
            PulseGuard
          </div>
          <p className="text-zinc-500 text-xs leading-relaxed mb-4">
            Unified developer observability. Cron job heartbeats, synthetic API checks, SSL expiry alerts, and hosted status pages.
          </p>
          <div className="flex items-center gap-2 text-xs text-zinc-500">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            99.99% Infrastructure Reliability
          </div>
        </div>

        <div>
          <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-3">Products</h4>
          <ul className="space-y-2 text-xs">
            <li><Link href="/dashboard" className="hover:text-white transition">Cron Heartbeats (Dead Man&apos;s Switch)</Link></li>
            <li><Link href="/dashboard" className="hover:text-white transition">Synthetic API & Web Uptime</Link></li>
            <li><Link href="/status/demo" className="hover:text-white transition">Hosted Status Pages</Link></li>
            <li><Link href="/pricing" className="hover:text-white transition">Pricing &amp; Plans</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-3">Free Dev Tools</h4>
          <ul className="space-y-2 text-xs">
            <li><Link href="/tools/ssl-checker" className="hover:text-white transition">SSL Certificate Inspector</Link></li>
            <li><Link href="/tools/cron-generator" className="hover:text-white transition">Visual Cron Expression Generator</Link></li>
            <li><Link href="/tools/header-analyzer" className="hover:text-white transition">HTTP Security Headers Scanner</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-3">Legal &amp; Trust</h4>
          <ul className="space-y-2 text-xs">
            <li><Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-white transition">Terms of Service</Link></li>
            <li><a href="mailto:support@pulseguard.dev" className="hover:text-white transition">support@pulseguard.dev</a></li>
          </ul>
          <p className="text-[11px] text-zinc-600 mt-4">
            &copy; {new Date().getFullYear()} PulseGuard Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
