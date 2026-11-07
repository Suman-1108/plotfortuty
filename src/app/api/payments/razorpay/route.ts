import { NextRequest, NextResponse } from 'next/server';
import { RazorpayService } from '@/lib/services/razorpayService';
import { getSessionUser } from '@/lib/auth';
import { connectToDatabase } from '@/lib/mongodb';
import { PaymentModel } from '@/lib/models/Payment';
import { Tenant } from '@/lib/models/Tenant';

export async function POST(req: NextRequest) {
  try {
    const sessionUser = getSessionUser(req);
    const body = await req.json();
    const { action } = body;

    // Action 1: Create Order
    if (action === 'create-order') {
      const { amountInRupees, purpose, planId, notes } = body;

      if (!amountInRupees || amountInRupees <= 0) {
        return NextResponse.json(
          { success: false, error: 'A valid payment amount in INR is required.' },
          { status: 400 }
        );
      }

      const receipt = `rcpt_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
      const orderResult = await RazorpayService.createOrder({
        amountInRupees: Number(amountInRupees),
        receipt,
        notes: {
          purpose: purpose || 'subscription',
          planId: planId || '',
          userEmail: sessionUser?.email || '',
          ...notes
        }
      });

      if (!orderResult.success) {
        return NextResponse.json(
          {
            success: false,
            error: orderResult.error || 'Failed to initialize payment gateway order.',
            isConfigured: RazorpayService.isConfigured()
          },
          { status: 400 }
        );
      }

      return NextResponse.json({
        success: true,
        orderId: orderResult.orderId,
        amount: orderResult.amount,
        amountInRupees: orderResult.amountInRupees,
        currency: orderResult.currency,
        keyId: RazorpayService.getPublicKey(),
        isTestMode: RazorpayService.isTestMode()
      });
    }

    // Action 2: Verify Payment Signature
    if (action === 'verify-payment') {
      const { razorpayOrderId, razorpayPaymentId, razorpaySignature, purpose, planId, amountInRupees } = body;

      if (!razorpayOrderId || !razorpayPaymentId || !razorpaySignature) {
        return NextResponse.json(
          { success: false, error: 'Incomplete payment verification payload.' },
          { status: 400 }
        );
      }

      const isValid = RazorpayService.verifyPaymentSignature(
        razorpayOrderId,
        razorpayPaymentId,
        razorpaySignature
      );

      if (!isValid) {
        return NextResponse.json(
          { success: false, error: 'Payment signature verification failed. Untrusted response.' },
          { status: 400 }
        );
      }

      // Record successful payment in database
      try {
        await connectToDatabase();
        const tenantId = sessionUser?.tenantId || 'tenant-sri-balaji-promoters';

        await PaymentModel.create({
          tenantId,
          userId: sessionUser?.id,
          amount: Number(amountInRupees) || 0,
          currency: 'INR',
          razorpayOrderId,
          razorpayPaymentId,
          razorpaySignature,
          status: 'paid',
          purpose: purpose || 'subscription',
          planId: planId || ''
        });

        // If subscription payment, update Tenant subscription expiry
        if (purpose === 'subscription' && planId) {
          const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
          await Tenant.findOneAndUpdate(
            { $or: [{ _id: tenantId }, { slug: tenantId }, { id: tenantId }] },
            {
              subscriptionPlan: planId,
              subscriptionStatus: 'active',
              subscriptionExpiresAt: expiresAt
            }
          );
        }
      } catch (dbErr) {
        console.warn('Payment record DB write error (continuing):', dbErr);
      }

      return NextResponse.json({
        success: true,
        message: 'Payment verified and confirmed successfully!',
        paymentId: razorpayPaymentId
      });
    }

    return NextResponse.json(
      { success: false, error: 'Invalid action. Supported: create-order, verify-payment' },
      { status: 400 }
    );
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Payment error';
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
