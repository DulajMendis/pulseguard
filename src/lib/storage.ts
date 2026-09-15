import fs from 'fs';
import path from 'path';
import { Monitor, Incident, PingRecord } from './types';
import { sendAlertWebhook } from './notifications';

// Persistent storage location with serverless fallback
const DATA_FILE = process.env.DATA_FILE_PATH || path.join('/tmp', 'pulseguard_monitors.json');

const DEFAULT_MONITORS: Monitor[] = [
  {
    id: 'cron-billing-sync',
    name: 'Stripe Daily Billing & Invoicing Cron',
    type: 'cron',
    cronSchedule: '0 2 * * *',
    expectedIntervalMinutes: 1440, // 24 hours
    gracePeriodMinutes: 30,
    status: 'up',
    lastPingAt: new Date(Date.now() - 3600000).toISOString(),
    nextExpectedAt: new Date(Date.now() + 82800000).toISOString(),
    uptimePercentage: 99.98,
    avgLatencyMs: 420,
    createdAt: new Date(Date.now() - 864000000).toISOString(),
    recentPings: [
      { timestamp: new Date(Date.now() - 3600000).toISOString(), status: 'ok', durationMs: 412 },
      { timestamp: new Date(Date.now() - 90000000).toISOString(), status: 'ok', durationMs: 425 },
      { timestamp: new Date(Date.now() - 176400000).toISOString(), status: 'ok', durationMs: 430 },
    ]
  },
  {
    id: 'http-auth-api',
    name: 'Production Auth & Token API',
    type: 'http',
    target: 'https://api.github.com',
    expectedIntervalMinutes: 5,
    gracePeriodMinutes: 2,
    status: 'up',
    lastPingAt: new Date(Date.now() - 120000).toISOString(),
    nextExpectedAt: new Date(Date.now() + 180000).toISOString(),
    uptimePercentage: 100.0,
    avgLatencyMs: 142,
    sslExpiryDays: 85,
    createdAt: new Date(Date.now() - 1200000000).toISOString(),
    recentPings: [
      { timestamp: new Date(Date.now() - 120000).toISOString(), status: 'ok', durationMs: 138, statusCode: 200 },
      { timestamp: new Date(Date.now() - 420000).toISOString(), status: 'ok', durationMs: 145, statusCode: 200 },
      { timestamp: new Date(Date.now() - 720000).toISOString(), status: 'ok', durationMs: 143, statusCode: 200 },
    ]
  },
  {
    id: 'cron-db-backup',
    name: 'PostgreSQL Database Hourly Backup',
    type: 'cron',
    cronSchedule: '0 * * * *',
    expectedIntervalMinutes: 60,
    gracePeriodMinutes: 10,
    status: 'up',
    lastPingAt: new Date(Date.now() - 1800000).toISOString(),
    nextExpectedAt: new Date(Date.now() + 1800000).toISOString(),
    uptimePercentage: 99.95,
    avgLatencyMs: 1850,
    createdAt: new Date(Date.now() - 600000000).toISOString(),
    recentPings: [
      { timestamp: new Date(Date.now() - 1800000).toISOString(), status: 'ok', durationMs: 1820 },
      { timestamp: new Date(Date.now() - 5400000).toISOString(), status: 'ok', durationMs: 1880 },
    ]
  }
];

let memoryCache: Monitor[] | null = null;

function loadFromDisk(): Monitor[] {
  if (memoryCache) return memoryCache;
  try {
    if (fs.existsSync(DATA_FILE)) {
      const data = fs.readFileSync(DATA_FILE, 'utf-8');
      memoryCache = JSON.parse(data);
      return memoryCache!;
    }
  } catch (err) {
    console.warn('Could not read persistent file, falling back to memory/defaults:', err);
  }
  memoryCache = [...DEFAULT_MONITORS];
  saveToDisk(memoryCache);
  return memoryCache;
}

function saveToDisk(monitors: Monitor[]): void {
  memoryCache = monitors;
  try {
    const dir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(monitors, null, 2), 'utf-8');
  } catch (err) {
    console.warn('Could not persist to disk, caching in memory only:', err);
  }
}

export async function getAllMonitors(): Promise<Monitor[]> {
  return loadFromDisk();
}

export async function getMonitorById(id: string): Promise<Monitor | null> {
  const monitors = loadFromDisk();
  return monitors.find(m => m.id === id) || null;
}

export async function upsertMonitor(monitor: Monitor): Promise<Monitor> {
  const monitors = loadFromDisk();
  const index = monitors.findIndex(m => m.id === monitor.id);
  if (index >= 0) {
    monitors[index] = monitor;
  } else {
    monitors.unshift(monitor);
  }
  saveToDisk(monitors);
  return monitor;
}

export async function deleteMonitorById(id: string): Promise<boolean> {
  const monitors = loadFromDisk();
  const filtered = monitors.filter(m => m.id !== id);
  if (filtered.length !== monitors.length) {
    saveToDisk(filtered);
    return true;
  }
  return false;
}

export async function recordHeartbeat(
  id: string,
  meta?: { durationMs?: number; message?: string; statusCode?: number }
): Promise<Monitor | null> {
  const monitors = loadFromDisk();
  const monitor = monitors.find(m => m.id === id);
  if (!monitor) return null;

  const now = new Date();
  const previousStatus = monitor.status;
  monitor.status = 'up';
  monitor.lastPingAt = now.toISOString();
  monitor.nextExpectedAt = new Date(now.getTime() + monitor.expectedIntervalMinutes * 60000).toISOString();

  const ping: PingRecord = {
    timestamp: now.toISOString(),
    status: 'ok',
    durationMs: meta?.durationMs,
    statusCode: meta?.statusCode || 200,
    message: meta?.message || 'Heartbeat received'
  };

  monitor.recentPings = [ping, ...(monitor.recentPings || [])].slice(0, 50);

  if (meta?.durationMs) {
    const validDurations = monitor.recentPings.map(p => p.durationMs).filter((d): d is number => typeof d === 'number');
    if (validDurations.length > 0) {
      monitor.avgLatencyMs = Math.round(validDurations.reduce((a, b) => a + b, 0) / validDurations.length);
    }
  }

  // If recovered from down state, dispatch notification
  if (previousStatus === 'down' && monitor.alertWebhookUrl) {
    await sendAlertWebhook(monitor.alertWebhookUrl, {
      title: '🟢 Monitor Recovered',
      description: `Heartbeat received. Job is running normally.`,
      monitorName: monitor.name,
      status: 'recovered',
      timestamp: now.toISOString()
    });
  }

  saveToDisk(monitors);
  return monitor;
}

export async function recordFailure(id: string, message?: string): Promise<Monitor | null> {
  const monitors = loadFromDisk();
  const monitor = monitors.find(m => m.id === id);
  if (!monitor) return null;

  const now = new Date();
  const previousStatus = monitor.status;
  monitor.status = 'down';

  const ping: PingRecord = {
    timestamp: now.toISOString(),
    status: 'fail',
    message: message || 'Explicit failure signal received'
  };

  monitor.recentPings = [ping, ...(monitor.recentPings || [])].slice(0, 50);

  if (previousStatus !== 'down' && monitor.alertWebhookUrl) {
    await sendAlertWebhook(monitor.alertWebhookUrl, {
      title: '🔴 Monitor Alert: FAILURE',
      description: message || 'Execution failure reported by job runner.',
      monitorName: monitor.name,
      status: 'down',
      timestamp: now.toISOString()
    });
  }

  saveToDisk(monitors);
  return monitor;
}

export async function runMonitoringChecks(): Promise<{ checked: number; alerted: number }> {
  const monitors = loadFromDisk();
  let checked = 0;
  let alerted = 0;
  const now = Date.now();

  for (const monitor of monitors) {
    if (monitor.status === 'paused') continue;
    checked++;

    if (monitor.type === 'cron') {
      if (monitor.lastPingAt) {
        const lastPing = new Date(monitor.lastPingAt).getTime();
        const allowedThresholdMs = (monitor.expectedIntervalMinutes + monitor.gracePeriodMinutes) * 60000;
        const isLate = now - lastPing > allowedThresholdMs;

        if (isLate && monitor.status !== 'down') {
          monitor.status = 'down';
          alerted++;
          if (monitor.alertWebhookUrl) {
            await sendAlertWebhook(monitor.alertWebhookUrl, {
              title: '🔴 Monitor Alert: CRON MISSED',
              description: `Expected heartbeat was not received within ${monitor.expectedIntervalMinutes}m (+ ${monitor.gracePeriodMinutes}m grace).`,
              monitorName: monitor.name,
              status: 'down',
              timestamp: new Date().toISOString()
            });
          }
        }
      }
    } else if (monitor.type === 'http' && monitor.target) {
      const startTime = Date.now();
      try {
        const res = await fetch(monitor.target, {
          method: 'GET',
          headers: { 'User-Agent': 'PulseGuard-Bot/1.0' },
          signal: AbortSignal.timeout(10000)
        });
        const latency = Date.now() - startTime;
        const isSuccess = res.status >= 200 && res.status < 400;
        const previousStatus = monitor.status;

        monitor.status = isSuccess ? 'up' : 'down';
        monitor.lastPingAt = new Date().toISOString();
        const pingRec: PingRecord = {
          timestamp: new Date().toISOString(),
          status: isSuccess ? 'ok' : 'fail',
          durationMs: latency,
          statusCode: res.status
        };
        monitor.recentPings = [pingRec, ...(monitor.recentPings || [])].slice(0, 50);

        if (!isSuccess && previousStatus !== 'down' && monitor.alertWebhookUrl) {
          alerted++;
          await sendAlertWebhook(monitor.alertWebhookUrl, {
            title: '🔴 HTTP Monitor DOWN',
            description: `Target returned HTTP ${res.status}.`,
            monitorName: monitor.name,
            status: 'down',
            timestamp: new Date().toISOString()
          });
        }
      } catch (err: any) {
        const previousStatus = monitor.status;
        monitor.status = 'down';
        monitor.lastPingAt = new Date().toISOString();
        const pingRec: PingRecord = {
          timestamp: new Date().toISOString(),
          status: 'fail',
          message: err.message || 'Connection timeout or network failure'
        };
        monitor.recentPings = [pingRec, ...(monitor.recentPings || [])].slice(0, 50);

        if (previousStatus !== 'down' && monitor.alertWebhookUrl) {
          alerted++;
          await sendAlertWebhook(monitor.alertWebhookUrl, {
            title: '🔴 HTTP Monitor UNREACHABLE',
            description: `Network error or timeout: ${err.message}`,
            monitorName: monitor.name,
            status: 'down',
            timestamp: new Date().toISOString()
          });
        }
      }
    }
  }

  saveToDisk(monitors);
  return { checked, alerted };
}
