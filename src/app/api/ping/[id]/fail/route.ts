import { NextRequest, NextResponse } from 'next/server';
import { recordFailure } from '@/lib/storage';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const msg = request.nextUrl.searchParams.get('msg') || 'Job reported failure';
  const monitor = await recordFailure(id, msg);
  if (!monitor) {
    return NextResponse.json({ error: 'Monitor not found', id }, { status: 404 });
  }
  return NextResponse.json({ ok: true, status: 'down', message: 'Failure reported' });
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  let body: any = {};
  try {
    body = await request.json();
  } catch {}
  const msg = body.message || body.msg || body.error || 'Job reported failure';
  const monitor = await recordFailure(id, msg);
  if (!monitor) {
    return NextResponse.json({ error: 'Monitor not found', id }, { status: 404 });
  }
  return NextResponse.json({ ok: true, status: 'down', message: 'Failure reported' });
}
