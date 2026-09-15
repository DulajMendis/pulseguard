import { NextRequest, NextResponse } from 'next/server';
import tls from 'tls';

export async function POST(request: NextRequest) {
  try {
    const { domain } = await request.json();
    if (!domain) {
      return NextResponse.json({ error: 'Domain is required' }, { status: 400 });
    }

    // Clean up domain: strip http://, https://, trailing slashes, paths
    const cleaned = domain.replace(/^https?:\/\//, '').split('/')[0].split(':')[0];

    return new Promise<NextResponse>((resolve) => {
      const socket = tls.connect(
        {
          host: cleaned,
          port: 443,
          servername: cleaned,
          rejectUnauthorized: false, // We inspect even if self-signed/expired
          timeout: 8000
        },
        () => {
          const cert = socket.getPeerCertificate();
          socket.destroy();

          if (!cert || Object.keys(cert).length === 0) {
            resolve(NextResponse.json({
              valid: false,
              domain: cleaned,
              error: 'No SSL certificate returned by host'
            }));
            return;
          }

          const validTo = new Date(cert.valid_to);
          const validFrom = new Date(cert.valid_from);
          const now = new Date();
          const daysRemaining = Math.max(0, Math.floor((validTo.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));
          const isExpired = now > validTo;

          resolve(NextResponse.json({
            valid: !isExpired,
            domain: cleaned,
            subject: cert.subject?.CN || cleaned,
            issuer: cert.issuer?.O || cert.issuer?.CN || 'Unknown CA',
            validFrom: validFrom.toISOString(),
            validTo: validTo.toISOString(),
            daysRemaining,
            isExpired,
            serialNumber: cert.serialNumber,
            fingerprint: cert.fingerprint256
          }));
        }
      );

      socket.on('error', (err) => {
        resolve(NextResponse.json({
          valid: false,
          domain: cleaned,
          error: `TLS Connection failed: ${err.message}`
        }, { status: 200 }));
      });

      socket.on('timeout', () => {
        socket.destroy();
        resolve(NextResponse.json({
          valid: false,
          domain: cleaned,
          error: 'Connection timed out while checking SSL certificate'
        }, { status: 200 }));
      });
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
