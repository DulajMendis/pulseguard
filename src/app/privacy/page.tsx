export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16 text-zinc-300 text-sm space-y-6">
      <h1 className="text-3xl font-bold text-white mb-6">Privacy Policy</h1>
      <p className="text-xs text-zinc-500">Last updated: September 2026</p>
      
      <section className="space-y-2">
        <h2 className="text-lg font-bold text-white">1. Information We Collect</h2>
        <p>PulseGuard collects minimal information necessary to deliver monitoring services: account email addresses, monitor URLs or ping identifiers, timestamp telemetry, HTTP status codes, and optional notification endpoints (Discord or Slack webhooks).</p>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-bold text-white">2. How Information is Used</h2>
        <p>Data is used exclusively to evaluate job health, send incident alerts, display uptime telemetry on your private dashboard or public status page, and bill for subscriptions. We never sell or distribute your data.</p>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-bold text-white">3. Data Retention &amp; Security</h2>
        <p>Telemetry and ping histories are retained according to your plan tier (7 days on Free, 90 days on Pro, 365 days on Business) and systematically pruned thereafter.</p>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-bold text-white">4. Contact</h2>
        <p>For privacy inquiries, contact support@pulseguard.dev.</p>
      </section>
    </div>
  );
}
