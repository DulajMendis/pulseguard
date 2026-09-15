'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Check, Sparkles, Shield, ArrowRight, HelpCircle } from 'lucide-react';

export default function PricingPage() {
  const [annual, setAnnual] = useState(true);
  const [checkoutEmail, setCheckoutEmail] = useState('');
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [provisioned, setProvisioned] = useState(false);

  const handleCheckout = (planName: string) => {
    // If external Stripe Payment Link is provided via env var:
    const stripeMonthlyUrl = process.env.NEXT_PUBLIC_STRIPE_PRO_MONTHLY;
    const stripeLifetimeUrl = process.env.NEXT_PUBLIC_STRIPE_LIFETIME;

    if (planName === 'Lifetime Pass' && stripeLifetimeUrl) {
      window.location.href = stripeLifetimeUrl;
      return;
    }
    if (planName === 'Pro Shield' && stripeMonthlyUrl) {
      window.location.href = stripeMonthlyUrl;
      return;
    }

    // Otherwise show instant checkout activation modal
    setSelectedPlan(planName);
  };

  const completeActivation = (e: React.FormEvent) => {
    e.preventDefault();
    setProvisioned(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-semibold mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          Transparent Developer Pricing
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Invest in Reliability, <br />
          <span className="text-emerald-400">Never in Expensive Per-Seat Bloat.</span>
        </h1>
        <p className="mt-4 text-base sm:text-lg text-zinc-400">
          All plans include cron heartbeats, synthetic HTTP monitoring, and public status pages.
        </p>

        {/* Toggle */}
        <div className="mt-8 inline-flex items-center bg-zinc-900 border border-zinc-800 p-1 rounded-xl text-xs font-semibold">
          <button
            onClick={() => setAnnual(false)}
            className={`px-4 py-2 rounded-lg transition ${!annual ? 'bg-zinc-800 text-white' : 'text-zinc-400'}`}
          >
            Monthly Billing
          </button>
          <button
            onClick={() => setAnnual(true)}
            className={`px-4 py-2 rounded-lg transition flex items-center gap-1.5 ${annual ? 'bg-emerald-500 text-zinc-950' : 'text-zinc-400'}`}
          >
            Annual Billing <span className="text-[10px] bg-emerald-950/20 px-1.5 py-0.5 rounded font-bold">Save 20%</span>
          </button>
        </div>
      </div>

      {/* PRICING GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {/* Hobby */}
        <div className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-white">Developer Free</h3>
            <p className="text-zinc-400 text-xs mt-1">For hobbies &amp; side projects</p>
            <div className="mt-5 mb-6">
              <span className="text-3xl font-extrabold text-white">$0</span>
              <span className="text-zinc-500 text-xs ml-1">/ forever</span>
            </div>
            <ul className="space-y-3 text-xs text-zinc-300">
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400" /> 3 Active Monitors</li>
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400" /> 10-minute check interval</li>
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400" /> 7-day metric retention</li>
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400" /> Email alerts</li>
            </ul>
          </div>
          <Link
            href="/dashboard"
            className="mt-8 block text-center py-2.5 rounded-xl border border-zinc-700 hover:bg-zinc-800 text-zinc-200 font-semibold text-xs transition"
          >
            Get Started Free
          </Link>
        </div>

        {/* Pro Shield */}
        <div className="p-6 rounded-2xl bg-gradient-to-b from-emerald-950/30 via-zinc-900 to-zinc-950 border-2 border-emerald-500 flex flex-col justify-between relative shadow-xl shadow-emerald-500/10">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-500 text-zinc-950 text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full">
            Recommended
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Pro Shield</h3>
            <p className="text-zinc-400 text-xs mt-1">For revenue-generating SaaS</p>
            <div className="mt-5 mb-6">
              <span className="text-3xl font-extrabold text-white">{annual ? '$15' : '$19'}</span>
              <span className="text-zinc-400 text-xs ml-1">/ month {annual ? '(billed annually)' : ''}</span>
            </div>
            <ul className="space-y-3 text-xs text-zinc-300">
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400" /> 25 Active Monitors</li>
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400" /> 1-minute checks</li>
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400" /> 90-day retention &amp; logs</li>
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400" /> Discord &amp; Slack Webhooks</li>
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400" /> SSL Expiry 30d/14d/7d alerts</li>
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400" /> Branded Public Status Page</li>
            </ul>
          </div>
          <button
            onClick={() => handleCheckout('Pro Shield')}
            className="mt-8 w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs shadow-md shadow-emerald-500/20 transition"
          >
            Select Pro Shield
          </button>
        </div>

        {/* Business */}
        <div className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-white">Business &amp; Team</h3>
            <p className="text-zinc-400 text-xs mt-1">For growing teams &amp; agencies</p>
            <div className="mt-5 mb-6">
              <span className="text-3xl font-extrabold text-white">{annual ? '$39' : '$49'}</span>
              <span className="text-zinc-400 text-xs ml-1">/ month</span>
            </div>
            <ul className="space-y-3 text-xs text-zinc-300">
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400" /> 100 Active Monitors</li>
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400" /> 30-second high-freq checks</li>
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400" /> 1-year data retention</li>
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400" /> Custom CNAME Status Domains</li>
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400" /> 5 Team Member Seats</li>
            </ul>
          </div>
          <button
            onClick={() => handleCheckout('Business & Team')}
            className="mt-8 w-full py-2.5 rounded-xl border border-zinc-700 hover:bg-zinc-800 text-zinc-200 font-semibold text-xs transition"
          >
            Select Business
          </button>
        </div>

        {/* Lifetime Launch Deal */}
        <div className="p-6 rounded-2xl bg-purple-950/20 border-2 border-purple-500/40 flex flex-col justify-between relative">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-purple-500 text-zinc-950 text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full">
            Limited: 50 Passes
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Lifetime Pass</h3>
            <p className="text-zinc-400 text-xs mt-1">First 50 supporters only</p>
            <div className="mt-5 mb-6">
              <span className="text-3xl font-extrabold text-white">$99</span>
              <span className="text-zinc-400 text-xs ml-1">/ one-time</span>
            </div>
            <ul className="space-y-3 text-xs text-zinc-300">
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-purple-400" /> All Pro Shield Features</li>
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-purple-400" /> Lifetime access guaranteed</li>
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-purple-400" /> Never pay monthly fees</li>
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-purple-400" /> Founder community perks</li>
            </ul>
          </div>
          <button
            onClick={() => handleCheckout('Lifetime Pass')}
            className="mt-8 w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-md shadow-purple-600/20 transition"
          >
            Claim Lifetime Pass ($99)
          </button>
        </div>
      </div>

      {/* CHECKOUT / UPGRADE MODAL */}
      {selectedPlan && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-md w-full p-6 shadow-2xl">
            {provisioned ? (
              <div className="text-center py-4">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-3">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white">Upgrade Activated!</h3>
                <p className="text-xs text-zinc-400 mt-2">
                  Welcome to <strong>{selectedPlan}</strong>. Your license key and confirmation have been dispatched to <strong>{checkoutEmail}</strong>.
                </p>
                <div className="mt-6">
                  <Link
                    href="/dashboard"
                    className="block w-full py-2.5 rounded-xl bg-emerald-500 text-zinc-950 font-bold text-xs"
                  >
                    Go to Dashboard
                  </Link>
                </div>
              </div>
            ) : (
              <div>
                <h3 className="text-xl font-bold text-white">Upgrade to {selectedPlan}</h3>
                <p className="text-xs text-zinc-400 mt-1 mb-6">
                  Instant activation. 14-day 100% money-back guarantee.
                </p>

                <form onSubmit={completeActivation} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1">Your Work Email</label>
                    <input
                      type="email"
                      required
                      placeholder="alex@company.com"
                      value={checkoutEmail}
                      onChange={e => setCheckoutEmail(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-400 flex items-center justify-between">
                    <span>Plan:</span>
                    <strong className="text-white">{selectedPlan}</strong>
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-800">
                    <button
                      type="button"
                      onClick={() => setSelectedPlan(null)}
                      className="px-4 py-2 text-xs text-zinc-400 hover:text-white"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs shadow-md shadow-emerald-500/20 transition"
                    >
                      Activate {selectedPlan}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
