import { NextRequest, NextResponse } from 'next/server';
import { getTenants, saveTenant } from '@/lib/storage';
import { getSessionUser, logAuditEvent } from '@/lib/auth';
import { EmailService } from '@/lib/services/emailService';

export async function GET(req: NextRequest) {
  try {
    const tenants = await getTenants();
    return NextResponse.json({ success: true, count: tenants.length, developers: tenants });
  } catch (error) {
    console.error('Developers GET error:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch developers' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, companyName, email, phone, district, address, reraNumber, subscriptionPlan } = body;

    if (!name || !email || !phone || !companyName) {
      return NextResponse.json(
        { success: false, error: 'Name, company name, email, and phone are required.' },
        { status: 400 }
      );
    }

    const newTenant = await saveTenant({
      name,
      companyName,
      email: email.toLowerCase().trim(),
      phone: phone.trim(),
      district: district || 'Thoothukudi',
      address: address || '',
      reraNumber: reraNumber || '',
      subscriptionPlan: subscriptionPlan || 'starter',
      status: 'pending'
    });

    // Send email notification to promoter
    EmailService.sendEmail({
      to: email,
      subject: 'Developer Registration Received | Plot 4 Tuty Platform',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto; padding: 24px; border: 1px solid #DADDD5; border-radius: 16px;">
          <h2 style="color: #1F271B;">Welcome to Plot 4 Tuty SaaS Platform!</h2>
          <p>Dear ${name},</p>
          <p>Your promoter account application for <strong>${companyName}</strong> has been received by our platform review desk.</p>
          <p>Our Super Admin will verify your RERA / DTCP developer credentials within 1-2 business hours. Once verified, you will receive full access to publish project layouts and manage buyer inquiries.</p>
          <hr style="border: 0; border-top: 1px solid #EEE; margin: 24px 0;" />
          <p style="color: #668F35; font-size: 12px; font-weight: bold;">PLOT 4 TUTY • THOOTHUKUDI SAAS ADMIN</p>
        </div>
      `
    }).catch(console.error);

    return NextResponse.json(
      {
        success: true,
        message: 'Developer registration submitted successfully! Super Admin review in progress.',
        developer: newTenant
      },
      { status: 201 }
    );
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Registration failed';
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const sessionUser = getSessionUser(req);
    // RBAC check: only super_admin or admin can approve/reject
    if (!sessionUser || (sessionUser.role !== 'super_admin' && sessionUser.role !== 'admin')) {
      return NextResponse.json(
        { success: false, error: 'Forbidden: Super Admin access required.' },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { id, status, subscriptionPlan } = body;

    if (!id || !status) {
      return NextResponse.json({ success: false, error: 'Developer ID and status are required.' }, { status: 400 });
    }

    const updated = await saveTenant({
      id,
      status,
      subscriptionPlan,
      verifiedAt: status === 'approved' ? new Date().toISOString() : undefined
    });

    await logAuditEvent({
      user: sessionUser,
      action: `DEVELOPER_STATUS_${status.toUpperCase()}`,
      resourceType: 'Developer',
      resourceId: id,
      details: { status, subscriptionPlan },
      req
    });

    return NextResponse.json({ success: true, developer: updated });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Update failed';
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
