import { NextRequest, NextResponse } from 'next/server';
import { SUBSCRIPTION_PLANS, getTenants, getPlots } from '@/lib/storage';
import { getSessionUser } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const sessionUser = getSessionUser(req);
    const tenantId = sessionUser?.tenantId || 'tenant-sri-balaji-promoters';

    const tenants = await getTenants();
    const currentTenant = tenants.find((t) => t.id === tenantId || t.slug === tenantId) || tenants[0];

    const allPlots = await getPlots({ tenantId });
    const currentPlan =
      SUBSCRIPTION_PLANS.find((p) => p.slug === currentTenant?.subscriptionPlan) ||
      SUBSCRIPTION_PLANS[1]; // default professional

    return NextResponse.json({
      success: true,
      plans: SUBSCRIPTION_PLANS,
      currentSubscription: {
        tenantId: currentTenant?.id,
        companyName: currentTenant?.companyName,
        plan: currentPlan,
        status: currentTenant?.subscriptionStatus || 'active',
        expiresAt: currentTenant?.subscriptionExpiresAt,
        plotsUsed: allPlots.length,
        maxPlots: currentPlan.maxPlots,
        projectsUsed: 1,
        maxProjects: currentPlan.maxProjects
      }
    });
  } catch (error) {
    console.error('Subscriptions GET error:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch subscriptions' }, { status: 500 });
  }
}
