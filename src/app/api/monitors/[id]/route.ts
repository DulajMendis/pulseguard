import { NextRequest, NextResponse } from 'next/server';
import { getMonitorById, upsertMonitor, deleteMonitorById } from '@/lib/storage';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const monitor = await getMonitorById(id);
  if (!monitor) {
    return NextResponse.json({ error: 'Monitor not found' }, { status: 404 });
  }
  return NextResponse.json({ monitor });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const deleted = await deleteMonitorById(id);
  if (!deleted) {
    return NextResponse.json({ error: 'Monitor not found' }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const existing = await getMonitorById(id);
  if (!existing) {
    return NextResponse.json({ error: 'Monitor not found' }, { status: 404 });
  }

  const body = await request.json();
  const updated = {
    ...existing,
    ...body,
    id: existing.id // protect ID
  };

  await upsertMonitor(updated);
  return NextResponse.json({ ok: true, monitor: updated });
}
