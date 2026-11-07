import { NextRequest, NextResponse } from 'next/server';
import { getEnquiries, updateEnquiryStatus } from '@/lib/storage';
import { getSessionUser } from '@/lib/auth';
import { WhatsAppService } from '@/lib/services/whatsappService';
import { LeadStage } from '@/lib/types';

export async function GET(req: NextRequest) {
  try {
    const sessionUser = getSessionUser(req);
    const { searchParams } = new URL(req.url);
    const stage = searchParams.get('stage');

    let tenantId = searchParams.get('tenantId') || undefined;
    if (sessionUser && (sessionUser.role === 'developer' || sessionUser.role === 'seller')) {
      tenantId = sessionUser.tenantId || 'tenant-sri-balaji-promoters';
    }

    let enquiries = await getEnquiries(tenantId);

    if (stage && stage !== 'All') {
      enquiries = enquiries.filter((e) => e.stage === stage || e.status === stage);
    }

    return NextResponse.json({
      success: true,
      count: enquiries.length,
      leads: enquiries
    });
  } catch (error) {
    console.error('Leads GET error:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch leads' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, stage, status, siteVisitDate, customerPhone, customerName, projectName } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: 'Lead ID is required' }, { status: 400 });
    }

    const updated = await updateEnquiryStatus(
      id,
      status || (stage as unknown as 'New' | 'Contacted' | 'Follow-up' | 'Closed') || 'Follow-up',
      stage as LeadStage
    );

    // If site visit scheduled, trigger WhatsApp confirmation
    if (stage === 'Site Visit' && siteVisitDate && customerPhone) {
      WhatsAppService.sendSiteVisitConfirmation({
        customerPhone,
        customerName: customerName || 'Valued Buyer',
        projectName: projectName || 'AP Rajan Garden',
        siteVisitDate,
        developerPhone: '919443152633'
      }).catch(console.error);
    }

    return NextResponse.json({ success: true, lead: updated });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Failed to update lead';
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
