# PulseGuard ⚡️

[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg)](https://opensource.org/licenses/MIT)
[![Build Status](https://img.shields.io/badge/Build-Passing-brightgreen.svg)]()
[![Uptime](https://img.shields.io/badge/System_Availability-99.98%25-emerald.svg)]()

> **Unified Developer Observability**: Dead man's switch cron heartbeats, synthetic HTTP/API uptime monitoring, SSL certificate expiry warnings, and hosted public status pages.

---

## 🌟 Why PulseGuard?

Silent background failures are the #1 cause of corrupted databases, delayed user billing, and unscheduled downtime. 

Most monitoring solutions force developers to manage 3 to 4 fragmented tools:
- Cronitor / Dead Man's Snitch for cron heartbeats ($19–$99/mo)
- Better Stack / UptimeRobot for HTTP pings ($29–$150/mo)
- Instatus / Statuspage for public incident pages ($20–$100/mo)

**PulseGuard consolidates all three into one unified, developer-first cockpit with zero per-seat penalties and a 15-second setup.**

---

## 🚀 Key Features

- ⏱️ **Cron Job Heartbeats (Dead Man's Switch):** Attach a simple `curl -fsS` ping to any scheduled backup, billing sync, or machine learning pipeline. If the job halts or misses its window, get alerted immediately.
- 🌐 **Synthetic HTTP & API Monitoring:** Automated pinging with multi-region response time tracking and status code verification.
- 🔒 **SSL Expiry & Certificate Chain Alerts:** Continuous tracking of TLS expiration dates with proactive alerts 30, 14, and 7 days before certificate expiration.
- 📊 **Hosted Public & Private Status Pages:** Beautiful status pages with interactive 30-day uptime bars, component health breakdown, and incident timelines.
- 🔔 **Multi-Channel Alert Dispatcher:** Real-time webhooks formatted natively for **Discord**, **Slack**, and custom endpoints.
- 🛠️ **Free Instant Engineering Utilities:**
  - `/tools/ssl-checker`: Live SSL certificate chain & expiry inspector
  - `/tools/cron-generator`: Visual crontab expression builder with 1-click curl ping generator
  - `/tools/header-analyzer`: HTTP security header auditor (HSTS, CSP, X-Frame-Options)

---

## 📐 Architecture & Tech Stack

```
┌────────────────────────────────────────────────────────┐
│                   Next.js 16 (App Router)              │
├─────────────────┬───────────────────┬──────────────────┤
│ Frontend (React)│ API Endpoints     │ Automation       │
│ - Landing Page  │ - /api/ping/[id]  │ - Background     │
│ - Dashboard     │ - /api/monitors   │   Check Runner   │
│ - Status Pages  │ - /api/check      │ - GitHub Actions │
│ - Free Tools    │ - /api/tools/*    │   Cron Workflow  │
└─────────────────┴───────────────────┴──────────────────┘
```

- **Framework:** Next.js 16 (App Router, React 19, TypeScript)
- **Styling:** Tailwind CSS with modern dark UI
- **Icons:** Lucide React
- **Storage:** Hybrid Edge-compatible persistence layer with memory cache
- **Deployment:** Vercel Edge / Serverless functions

---

## ⚙️ Quick Start & Setup

### Prerequisites
- Node.js 18+ or Node.js 20+
- npm, pnpm, or yarn

### 1. Clone & Install
```bash
git clone https://github.com/DulajMendis/pulseguard.git
cd pulseguard
npm install
```

### 2. Environment Configuration
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## 🧪 Testing

PulseGuard includes an automated test suite verifying cron grace periods, SSL expiry arithmetic, and webhook payload structures.

Run unit tests:
```bash
npm test
```

Run production build verification:
```bash
npm run build
```

---

## 📦 Deployment

### Deploy to Vercel
```bash
npx vercel --prod
```

### Automated Check Runner via GitHub Actions
PulseGuard includes a pre-configured GitHub Actions workflow (`.github/workflows/monitor-cron.yml`) that pings `/api/check` every 5 minutes to automatically evaluate all HTTP monitors and cron heartbeat thresholds.

---

## 💰 Business Model & Path to $100/Day

| Plan | Price | Target | Quota | Retention |
|---|---|---|---|---|
| **Developer Free** | $0 | Hobbyists | 3 monitors | 7 days |
| **Pro Shield** | $19 / mo | Startups & SaaS | 25 monitors (1m checks) | 90 days |
| **Business / Team** | $49 / mo | Agencies & Teams | 100 monitors (30s checks) | 365 days |
| **Lifetime Pass** | $99 one-time | Early Adopters (50 total) | Pro features forever | 1 year |

### Steady-State Goal: $100 USD / Day ($3,000 / Month)
- **Model 1:** 158 Pro subscribers × $19/mo = $3,002 / month
- **Model 2:** 62 Business subscribers × $49/mo = $3,038 / month
- **Launch Acceleration:** 30 Lifetime Passes sold during launch = $2,970 upfront cash flow.

Full financial projections and unit economics are documented in [`docs/revenue-model.md`](docs/revenue-model.md).

---

## 🔒 Security & Privacy

- **No Agent Required:** Pings are executed via standard unauthenticated curl requests containing only the monitor UUID.
- **Input Sanitization:** All domain and URL inspection endpoints validate URI schemes and sanitize hostnames.
- **Zero Credential Storage:** No user server credentials or SSH keys are ever required or stored.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
