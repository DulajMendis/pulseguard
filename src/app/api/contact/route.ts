import { NextRequest, NextResponse } from 'next/server';

// In-memory rate limiting map: IP -> timestamp array
const rateLimitMap = new Map<string, number[]>();

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
    const now = Date.now();

    // 1. Rate Limiting: Max 5 submissions per 10 minutes per IP
    const windowMs = 10 * 60 * 1000;
    const timestamps = rateLimitMap.get(ip) || [];
    const recent = timestamps.filter((t) => now - t < windowMs);

    if (recent.length >= 5) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please wait a few minutes before resubmitting.' },
        { status: 429 }
      );
    }
    recent.push(now);
    rateLimitMap.set(ip, recent);

    const body = await req.json();
    const { name, email, subject, message, honeypot } = body;

    // 2. Honeypot check
    if (honeypot) {
      // Silently succeed for automated bots
      return NextResponse.json({ success: true });
    }

    // 3. Validation
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return NextResponse.json({ error: 'Please provide a valid name.' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== 'string' || !emailRegex.test(email)) {
      return NextResponse.json({ error: 'Please provide a valid email address.' }, { status: 400 });
    }

    if (!message || typeof message !== 'string' || message.trim().length < 5) {
      return NextResponse.json(
        { error: 'Message must be at least 5 characters long.' },
        { status: 400 }
      );
    }

    // Sanitize string lengths
    const sanitizedPayload = {
      name: name.slice(0, 100).trim(),
      email: email.slice(0, 150).trim(),
      subject: (subject || 'General Inquiry').slice(0, 150).trim(),
      message: message.slice(0, 2000).trim(),
      receivedAt: new Date().toISOString(),
    };

    console.log('[Contact Submission]', sanitizedPayload);

    return NextResponse.json({
      success: true,
      message: 'Inquiry received into queue.',
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error processing contact submission.' },
      { status: 500 }
    );
  }
}
