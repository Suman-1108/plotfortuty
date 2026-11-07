import { NextRequest, NextResponse } from 'next/server';
import { AP_RAJAN_GARDEN_CONSTRUCTION_PACKAGES } from '@/lib/data-ap-rajan-garden';
import { saveEnquiry } from '@/lib/storage';
import { WhatsAppService } from '@/lib/services/whatsappService';
import { EmailService } from '@/lib/services/emailService';

export async function GET() {
  return NextResponse.json({
    success: true,
    packages: AP_RAJAN_GARDEN_CONSTRUCTION_PACKAGES
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, email, packageId, builtUpSqFt, plotNumber, message } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { success: false, error: 'Name and phone number are required for quotation.' },
        { status: 400 }
      );
    }

    const selectedPkg = AP_RAJAN_GARDEN_CONSTRUCTION_PACKAGES.find((p) => p.id === packageId);
    const estimatedCost =
      selectedPkg && builtUpSqFt
        ? Math.round(Number(builtUpSqFt) * selectedPkg.ratePerSqFt)
        : undefined;

    const fullMessage = `House Construction Inquiry (${selectedPkg?.name || 'Custom'}):
Built-up Area: ${builtUpSqFt || 'Not specified'} sq.ft.
Estimated Construction Cost: ${estimatedCost ? `₹${(estimatedCost / 100000).toFixed(2)} Lakhs` : 'Pending consultation'}
Plot Number: ${plotNumber || 'Not specified'}
Note: ${message || 'Customer requested turnkey construction breakdown and site inspection.'}`;

    const savedEnquiry = await saveEnquiry({
      name,
      phone,
      email: email || '',
      plotTitle: `AP Rajan Garden - ${selectedPkg?.name || 'Turnkey Construction'}`,
      projectId: 'proj-ap-rajan-garden',
      tenantId: 'tenant-sri-balaji-promoters',
      message: fullMessage,
      preferredLocation: 'Tharuvaikulam',
      status: 'New',
      stage: 'New',
      constructionInterest: true
    });

    // Send notifications async
    try {
      WhatsAppService.sendNewLeadAlert({
        developerPhone: '919443152633',
        customerName: name,
        customerPhone: phone,
        projectName: 'AP Rajan Garden (Construction)',
        plotNumber: plotNumber ? `Plot #${plotNumber}` : undefined,
        message: fullMessage
      }).catch(console.error);

      if (email) {
        EmailService.sendEmail({
          to: email,
          subject: 'Your Turnkey House Construction Quotation Request | Plot 4 Tuty',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto; padding: 24px; border: 1px solid #DADDD5; border-radius: 16px;">
              <h3 style="color: #1F271B;">Thank you for your construction enquiry!</h3>
              <p>Dear ${name},</p>
              <p>We have received your quotation request for the <strong>${selectedPkg?.name || 'Turnkey Construction Package'}</strong> at AP Rajan Garden, Tharuvaikulam.</p>
              <p>Our senior project engineer will reach out to you within 24 hours to review custom floor plans and bank loan financing assistance (up to 90%).</p>
              <hr style="border:0; border-top: 1px solid #EEE; margin: 20px 0;" />
              <p style="color: #668F35; font-weight: bold;">Plot 4 Tuty • Construction & Architecture Desk</p>
            </div>
          `
        }).catch(console.error);
      }
    } catch (notifyErr) {
      console.warn('Notification non-fatal error:', notifyErr);
    }

    return NextResponse.json({
      success: true,
      message: 'Construction enquiry submitted successfully. Our engineering team will contact you shortly.',
      enquiry: savedEnquiry,
      estimatedCost
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Failed to submit enquiry';
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
