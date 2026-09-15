import { NextRequest, NextResponse } from 'next/server';
import { runMonitoringChecks } from '@/lib/storage';

export async function GET(request: NextRequest) {
  const result = await runMonitoringChecks();
  return NextResponse.json({
    ok: true,
    timestamp: new Date().toISOString(),
    ...result
  });
}

export async function POST(request: NextRequest) {
  const result = await runMonitoringChecks();
  return NextResponse.json({
    ok: true,
    timestamp: new Date().toISOString(),
    ...result
  });
}
