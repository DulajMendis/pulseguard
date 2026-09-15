import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'PulseGuard | Developer Heartbeat & API Uptime Monitoring',
  description: 'Never let a silent cron failure or API outage corrupt your business. Dead man switch heartbeats, synthetic HTTP checks, SSL alerts, and status pages.',
  openGraph: {
    title: 'PulseGuard — Unified Developer Observability',
    description: 'Cron heartbeats, API uptime checks, and hosted status pages built for developers.',
    type: 'website',
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-zinc-950 text-zinc-100 antialiased min-h-screen flex flex-col justify-between">
        <div>
          <Navbar />
          <main>{children}</main>
        </div>
        <Footer />
      </body>
    </html>
  );
}
