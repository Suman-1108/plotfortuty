import { NextRequest, NextResponse } from 'next/server';
import { PlotImportExportService } from '@/lib/services/plotImportExportService';
import { batchSavePlots } from '@/lib/storage';
import { getSessionUser } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const sessionUser = getSessionUser(req);
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const projectId = (formData.get('projectId') as string) || 'proj-ap-rajan-garden';
    const tenantId = sessionUser?.tenantId || (formData.get('tenantId') as string) || 'tenant-sri-balaji-promoters';

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'Please upload a valid .xlsx or .csv spreadsheet file.' },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Parse spreadsheet rows
    const parseResult = PlotImportExportService.parsePlotExcel(buffer, projectId, tenantId);

    if (parseResult.validPlots.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'No valid plot rows could be extracted from the file.',
          details: parseResult.errors
        },
        { status: 400 }
      );
    }

    // Batch save / update plots in repository
    const saveSummary = await batchSavePlots(parseResult.validPlots, projectId, tenantId);

    return NextResponse.json({
      success: true,
      message: `Successfully processed ${parseResult.totalRows} rows: ${saveSummary.added} added, ${saveSummary.updated} updated.`,
      addedCount: saveSummary.added,
      updatedCount: saveSummary.updated,
      warnings: parseResult.warnings,
      errors: parseResult.errors
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Spreadsheet import failed';
    console.error('Import error:', msg);
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
