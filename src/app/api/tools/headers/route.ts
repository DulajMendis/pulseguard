import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();
    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    const targetUrl = url.startsWith('http') ? url : `https://${url}`;
    const startTime = Date.now();

    const response = await fetch(targetUrl, {
      method: 'GET',
      headers: { 'User-Agent': 'PulseGuard-Security-Scanner/1.0' },
      signal: AbortSignal.timeout(8000),
      redirect: 'follow'
    });

    const latencyMs = Date.now() - startTime;
    const headerMap: Record<string, string> = {};
    response.headers.forEach((val, key) => {
      headerMap[key.toLowerCase()] = val;
    });

    const hasHsts = 'strict-transport-security' in headerMap;
    const hasCsp = 'content-security-policy' in headerMap;
    const hasXFrame = 'x-frame-options' in headerMap;
    const hasXContentType = 'x-content-type-options' in headerMap;
    const hasReferrer = 'referrer-policy' in headerMap;

    let score = 20; // baseline
    const recommendations: string[] = [];

    if (hasHsts) score += 20;
    else recommendations.push('Add Strict-Transport-Security (HSTS) to enforce HTTPS connections.');

    if (hasCsp) score += 25;
    else recommendations.push('Configure Content-Security-Policy (CSP) to mitigate Cross-Site Scripting (XSS).');

    if (hasXFrame) score += 15;
    else recommendations.push('Set X-Frame-Options: DENY or SAMEORIGIN to prevent Clickjacking.');

    if (hasXContentType) score += 10;
    else recommendations.push('Set X-Content-Type-Options: nosniff to prevent MIME-type sniffing.');

    if (hasReferrer) score += 10;
    else recommendations.push('Set Referrer-Policy (e.g., strict-origin-when-cross-origin) for privacy.');

    return NextResponse.json({
      url: targetUrl,
      statusCode: response.status,
      latencyMs,
      headers: headerMap,
      securityAnalysis: {
        score,
        hasHsts,
        hasCsp,
        hasXFrame,
        hasXContentType,
        hasReferrer,
        recommendations
      }
    });
  } catch (err: any) {
    return NextResponse.json({
      error: `Could not inspect URL: ${err.message}`
    }, { status: 200 });
  }
}
