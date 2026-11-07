import { NextRequest, NextResponse } from 'next/server';
import { getPlots, savePlot } from '@/lib/storage';
import { getSessionUser } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const location = searchParams.get('location');
    const budgetRange = searchParams.get('budgetRange');
    const plotSize = searchParams.get('plotSize');
    const approval = searchParams.get('approval');
    const status = searchParams.get('status');
    const layoutGroup = searchParams.get('layoutGroup');
    const facing = searchParams.get('facing');
    const projectId = searchParams.get('projectId');
    const query = searchParams.get('q')?.toLowerCase();

    // Check if requester has a tenant scope (e.g., developer portal)
    const sessionUser = getSessionUser(request);
    let tenantIdFilter = searchParams.get('tenantId') || undefined;

    if (sessionUser && (sessionUser.role === 'developer' || sessionUser.role === 'seller')) {
      // Strictly enforce developer's own tenant
      tenantIdFilter = sessionUser.tenantId || 'tenant-sri-balaji-promoters';
    }

    let plots = await getPlots({
      tenantId: tenantIdFilter,
      projectId: projectId || undefined,
      layoutGroup: layoutGroup || undefined,
      status: status || undefined,
      search: query || undefined
    });

    if (location && location !== 'all') {
      plots = plots.filter((p) => p.location.toLowerCase().includes(location.toLowerCase()));
    }

    if (facing && facing !== 'all') {
      plots = plots.filter((p) => p.facing.toLowerCase().includes(facing.toLowerCase()));
    }

    if (budgetRange && budgetRange !== 'all') {
      if (budgetRange === 'under-15') {
        plots = plots.filter((p) => p.price < 1500000);
      } else if (budgetRange === '15-25') {
        plots = plots.filter((p) => p.price >= 1500000 && p.price <= 2500000);
      } else if (budgetRange === '25-35') {
        plots = plots.filter((p) => p.price > 2500000 && p.price <= 3500000);
      } else if (budgetRange === 'above-35') {
        plots = plots.filter((p) => p.price > 3500000);
      }
    }

    if (plotSize && plotSize !== 'all') {
      if (plotSize === 'under-3-cents') {
        plots = plots.filter((p) => p.areaCents < 3);
      } else if (plotSize === '3-5-cents') {
        plots = plots.filter((p) => p.areaCents >= 3 && p.areaCents <= 5);
      } else if (plotSize === 'above-5-cents') {
        plots = plots.filter((p) => p.areaCents > 5);
      }
    }

    if (approval && approval !== 'all') {
      plots = plots.filter((p) => p.approval.toLowerCase().includes(approval.toLowerCase()));
    }

    return NextResponse.json({
      success: true,
      count: plots.length,
      totalScheduledEntries: plots.length,
      plots
    });
  } catch (error) {
    console.error('API Plots GET error:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch plots' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const sessionUser = getSessionUser(request);
    const body = await request.json();

    if (!body.title || !body.price) {
      return NextResponse.json(
        { success: false, error: 'Title and price are required to list a plot' },
        { status: 400 }
      );
    }

    // Dynamic pricing formula validation: if cents & pricePerCent provided
    if (body.areaCents && body.pricePerCent && !body.price) {
      const cornerMultiplier = body.isCornerPlot ? 1.05 : 1.0;
      body.price = Math.round(Number(body.areaCents) * Number(body.pricePerCent) * cornerMultiplier);
    }

    const tenantId = sessionUser?.tenantId || body.tenantId || 'tenant-sri-balaji-promoters';
    const saved = await savePlot(body, tenantId);

    return NextResponse.json({ success: true, plot: saved }, { status: 201 });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Failed to save plot';
    console.error('API Plots POST error:', msg);
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
