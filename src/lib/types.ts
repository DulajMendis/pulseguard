export type MonitorType = 'cron' | 'http';
export type MonitorStatus = 'up' | 'down' | 'degraded' | 'pending' | 'paused';

export interface PingRecord {
  timestamp: string;
  durationMs?: number;
  statusCode?: number;
  status: 'ok' | 'fail' | 'late';
  message?: string;
}

export interface Monitor {
  id: string;
  name: string;
  type: MonitorType;
  target?: string; // URL for HTTP checks
  cronSchedule?: string; // e.g. "0 * * * *" or interval string
  expectedIntervalMinutes: number; // e.g. 60 min
  gracePeriodMinutes: number; // e.g. 10 min grace before declaring DOWN
  status: MonitorStatus;
  lastPingAt?: string;
  nextExpectedAt?: string;
  uptimePercentage: number;
  avgLatencyMs: number;
  sslExpiryDays?: number;
  alertWebhookUrl?: string; // Slack / Discord / Custom Webhook
  alertEmail?: string;
  createdAt: string;
  recentPings: PingRecord[];
}

export interface Incident {
  id: string;
  monitorId: string;
  monitorName: string;
  startedAt: string;
  resolvedAt?: string;
  description: string;
  status: 'investigating' | 'identified' | 'monitoring' | 'resolved';
}

export interface SslCheckResult {
  valid: boolean;
  domain: string;
  issuer?: string;
  validFrom?: string;
  validTo?: string;
  daysRemaining?: number;
  protocol?: string;
  error?: string;
}

export interface HeaderCheckResult {
  url: string;
  statusCode: number;
  latencyMs: number;
  headers: Record<string, string>;
  securityAnalysis: {
    hasHsts: boolean;
    hasCsp: boolean;
    hasXFrame: boolean;
    hasXContentType: boolean;
    score: number; // 0 to 100
    recommendations: string[];
  };
}
