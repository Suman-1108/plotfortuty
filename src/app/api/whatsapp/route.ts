import { NextRequest, NextResponse } from 'next/server';
import { WhatsAppService } from '@/lib/services/whatsappService';

// Meta Webhook Verification Handshake
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const mode = searchParams.get('hub.mode');
  const token = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');

  const verifyToken = process.env.WHATSAPP_WEBHOOK_VERIFY_TOKEN || 'plot4tuty_meta_verify_2026';

  if (mode === 'subscribe' && token === verifyToken) {
    return new NextResponse(challenge, { status: 200 });
  }

  return NextResponse.json({ error: 'Verification failed' }, { status: 403 });
}

// Send or Receive message
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { to, text, type, customerName, projectName, siteVisitDate } = body;

    if (!to) {
      return NextResponse.json({ success: false, error: 'Recipient phone number is required.' }, { status: 400 });
    }

    if (type === 'site_visit' && siteVisitDate) {
      const res = await WhatsAppService.sendSiteVisitConfirmation({
        customerPhone: to,
        customerName: customerName || 'Valued Buyer',
        projectName: projectName || 'AP Rajan Garden',
        siteVisitDate,
        developerPhone: '919443152633'
      });
      return NextResponse.json(res);
    }

    const result = await WhatsAppService.sendMessage(to, text || 'Hello from Plot 4 Tuty!');
    return NextResponse.json(result);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'WhatsApp API error';
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
