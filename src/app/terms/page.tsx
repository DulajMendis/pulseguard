export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16 text-zinc-300 text-sm space-y-6">
      <h1 className="text-3xl font-bold text-white mb-6">Terms of Service</h1>
      <p className="text-xs text-zinc-500">Last updated: September 2026</p>
      
      <section className="space-y-2">
        <h2 className="text-lg font-bold text-white">1. Terms Acceptance</h2>
        <p>By creating an account or using PulseGuard, you agree to these Terms. PulseGuard provides synthetic uptime and cron heartbeat monitoring.</p>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-bold text-white">2. Acceptable Use</h2>
        <p>You agree not to use PulseGuard for Denial of Service (DoS) attacks, unauthorized network probing, or malicious exploitation. You may only monitor endpoints and services you own or have explicit authorization to inspect.</p>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-bold text-white">3. Billing, Refunds &amp; Cancellations</h2>
        <p>Subscriptions renew monthly or annually. You may cancel at any time via your dashboard. We offer a 14-day 100% money-back guarantee for first-time upgrades.</p>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-bold text-white">4. Limitation of Liability</h2>
        <p>PulseGuard is provided &quot;as is&quot;. While we maintain 99.99% infrastructure uptime, we are not liable for incidental or consequential damages resulting from network delivery delays or third-party outages.</p>
      </section>
    </div>
  );
}
