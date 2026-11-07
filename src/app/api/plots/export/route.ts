import { NextRequest, NextResponse } from 'next/server';
import { getPlots } from '@/lib/storage';
import { PlotImportExportService } from '@/lib/services/plotImportExportService';
import { getSessionUser } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const projectId = searchParams.get('projectId') || undefined;
    const layoutGroup = searchParams.get('layoutGroup') || undefined;

    const sessionUser = getSessionUser(req);
    let tenantId = searchParams.get('tenantId') || undefined;
    if (sessionUser && (sessionUser.role === 'developer' || sessionUser.role === 'seller')) {
      tenantId = sessionUser.tenantId || 'tenant-sri-balaji-promoters';
    }

    const plots = await getPlots({
      tenantId,
      projectId,
      layoutGroup
    });

    const excelBuffer = PlotImportExportService.exportPlotsToExcel(plots);

    const filename = `Plot4Tuty_Inventory_${projectId || 'All'}_${new Date().toISOString().split('T')[0]}.xlsx`;

    return new NextResponse(excelBuffer as unknown as BodyInit, {
      status: 200,
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename="${filename}"`
      }
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Export failed';
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
