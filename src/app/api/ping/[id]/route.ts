import { NextRequest, NextResponse } from 'next/server';
import { recordHeartbeat, getMonitorById } from '@/lib/storage';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const searchParams = request.nextUrl.searchParams;
  const durationMs = searchParams.get('duration') ? parseInt(searchParams.get('duration')!, 10) : undefined;
  const message = searchParams.get('msg') || searchParams.get('message') || undefined;

  const monitor = await recordHeartbeat(id, { durationMs, message });
  if (!monitor) {
    return NextResponse.json({ error: 'Monitor not found', id }, { status: 404 });
  }

  return NextResponse.json({
    ok: true,
    monitor: monitor.name,
    status: monitor.status,
    lastPingAt: monitor.lastPingAt,
    nextExpectedAt: monitor.nextExpectedAt
  });
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  let body: any = {};
  try {
    body = await request.json();
  } catch {
    // If empty body or text, proceed
  }

  const durationMs = typeof body.durationMs === 'number' ? body.durationMs : undefined;
  const message = body.message || body.msg || undefined;
  const statusCode = typeof body.statusCode === 'number' ? body.statusCode : 200;

  const monitor = await recordHeartbeat(id, { durationMs, message, statusCode });
  if (!monitor) {
    return NextResponse.json({ error: 'Monitor not found', id }, { status: 404 });
  }

  return NextResponse.json({
    ok: true,
    monitor: monitor.name,
    status: monitor.status,
    lastPingAt: monitor.lastPingAt,
    nextExpectedAt: monitor.nextExpectedAt
  });
}

export async function HEAD(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await recordHeartbeat(id);
  return new Response(null, { status: 200 });
}
