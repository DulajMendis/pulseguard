import { NextRequest, NextResponse } from 'next/server';
import { getAllMonitors, upsertMonitor } from '@/lib/storage';
import { Monitor } from '@/lib/types';

export async function GET() {
  const monitors = await getAllMonitors();
  return NextResponse.json({ monitors });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body.name || !body.type) {
      return NextResponse.json({ error: 'Name and type are required' }, { status: 400 });
    }

    const id = body.id || (body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Math.random().toString(36).substring(2, 6));

    const monitor: Monitor = {
      id,
      name: body.name,
      type: body.type,
      target: body.target || undefined,
      cronSchedule: body.cronSchedule || undefined,
      expectedIntervalMinutes: Number(body.expectedIntervalMinutes) || 60,
      gracePeriodMinutes: Number(body.gracePeriodMinutes) || 10,
      status: 'pending',
      uptimePercentage: 100,
      avgLatencyMs: 0,
      alertWebhookUrl: body.alertWebhookUrl || undefined,
      alertEmail: body.alertEmail || undefined,
      createdAt: new Date().toISOString(),
      recentPings: []
    };

    const saved = await upsertMonitor(monitor);
    return NextResponse.json({ ok: true, monitor: saved }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
