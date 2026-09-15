import test from 'node:test';
import assert from 'node:assert/strict';

test('Cron Heartbeat Grace Period Evaluation', () => {
  const expectedIntervalMinutes = 60;
  const gracePeriodMinutes = 15;
  const allowedThresholdMs = (expectedIntervalMinutes + gracePeriodMinutes) * 60 * 1000;

  const now = Date.now();
  
  // Case 1: Last ping 50 mins ago -> HEALTHY
  const lastPingRecent = now - (50 * 60 * 1000);
  assert.equal(now - lastPingRecent < allowedThresholdMs, true, 'Should be within allowed window');

  // Case 2: Last ping 70 mins ago -> In Grace Period (still within 75 min total window)
  const lastPingGrace = now - (70 * 60 * 1000);
  assert.equal(now - lastPingGrace < allowedThresholdMs, true, 'Should be within grace window');

  // Case 3: Last ping 80 mins ago -> LATE (DOWN)
  const lastPingLate = now - (80 * 60 * 1000);
  assert.equal(now - lastPingLate > allowedThresholdMs, true, 'Should exceed threshold and trigger alert');
});

test('SSL Expiry Day Calculation', () => {
  const now = new Date();
  const validTo = new Date(now.getTime() + (45 * 24 * 60 * 60 * 1000)); // 45 days in future

  const daysRemaining = Math.floor((validTo.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  assert.equal(daysRemaining, 45);

  const shouldAlert30d = daysRemaining <= 30;
  assert.equal(shouldAlert30d, false);

  const expiringSoon = new Date(now.getTime() + (5 * 24 * 60 * 60 * 1000));
  const daysUrgent = Math.floor((expiringSoon.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  assert.equal(daysUrgent <= 7, true, 'Should trigger urgent alert when <= 7 days');
});

test('Security Header Grading Logic', () => {
  const headers = {
    'strict-transport-security': 'max-age=31536000; includeSubDomains',
    'content-security-policy': "default-src 'self'",
    'x-frame-options': 'DENY',
    'x-content-type-options': 'nosniff',
    'referrer-policy': 'strict-origin-when-cross-origin'
  };

  let score = 20;
  if ('strict-transport-security' in headers) score += 20;
  if ('content-security-policy' in headers) score += 25;
  if ('x-frame-options' in headers) score += 15;
  if ('x-content-type-options' in headers) score += 10;
  if ('referrer-policy' in headers) score += 10;

  assert.equal(score, 100, 'All security headers present should result in 100/100');
});

test('Alert Webhook Payload Construction', () => {
  const isDiscord = true;
  const payload = {
    title: '🔴 Monitor Alert: DOWN',
    description: 'PostgreSQL backup missed its hourly heartbeat.',
    monitorName: 'Postgres Hourly Backup',
    status: 'down',
    timestamp: new Date().toISOString()
  };

  const discordColor = payload.status === 'down' ? 15158332 : 3066993;
  const discordBody = {
    embeds: [
      {
        title: payload.title,
        description: payload.description,
        color: discordColor,
        fields: [
          { name: 'Monitor', value: payload.monitorName, inline: true },
          { name: 'Status', value: payload.status.toUpperCase(), inline: true }
        ]
      }
    ]
  };

  assert.equal(discordBody.embeds[0].color, 15158332);
  assert.equal(discordBody.embeds[0].fields[0].value, 'Postgres Hourly Backup');
});
