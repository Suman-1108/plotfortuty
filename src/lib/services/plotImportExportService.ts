import * as XLSX from 'xlsx';
import { Plot, PlotStatus } from '@/lib/types';

export interface PlotImportRow {
  layoutGroup?: string;
  plotNumber: string | number;
  title?: string;
  areaCents?: number;
  areaSqFt?: number;
  dimensions?: string;
  length?: number;
  width?: number;
  facing?: string;
  roadWidth?: string;
  isCornerPlot?: boolean | string;
  pricePerCent?: number;
  price?: number;
  status?: string;
  isVerified?: boolean | string;
  verificationNotes?: string;
  description?: string;
}

export interface ImportResult {
  totalRows: number;
  validPlots: Partial<Plot>[];
  errors: Array<{ row: number; plotNumber?: string; reason: string }>;
  warnings: Array<{ row: number; plotNumber?: string; warning: string }>;
}

export class PlotImportExportService {
  /**
   * Parse an uploaded Excel or CSV buffer
   */
  public static parsePlotExcel(buffer: Buffer, projectId: string, tenantId: string): ImportResult {
    const workbook = XLSX.read(buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    // Read sheet as JSON with header row mapping
    const rawRows = XLSX.utils.sheet_to_json<Record<string, unknown>>(sheet, { defval: '' });

    const validPlots: Partial<Plot>[] = [];
    const errors: Array<{ row: number; plotNumber?: string; reason: string }> = [];
    const warnings: Array<{ row: number; plotNumber?: string; warning: string }> = [];

    const SQFT_PER_CENT = 435.6;

    rawRows.forEach((row, idx) => {
      const rowNum = idx + 2; // account for 1-based indexing + header row

      // Flexible column name matching
      const getVal = (...keys: string[]): unknown => {
        for (const k of keys) {
          const matchKey = Object.keys(row).find((rk) => rk.toLowerCase().replace(/[^a-z0-9]/g, '') === k.toLowerCase().replace(/[^a-z0-9]/g, ''));
          if (matchKey && row[matchKey] !== undefined && row[matchKey] !== '') {
            return row[matchKey];
          }
        }
        return undefined;
      };

      const plotNumRaw = getVal('plotNumber', 'plotNo', 'plot', 'number', 'entry', 'id');
      if (!plotNumRaw) {
        errors.push({ row: rowNum, reason: 'Missing Plot Number' });
        return;
      }

      const plotNumber = String(plotNumRaw).trim();
      const layoutGroup = String(getVal('layoutGroup', 'group', 'phase', 'section') || 'Group 1').trim();

      // Area calculations
      let cents = Number(getVal('areaCents', 'cents', 'cent', 'sizecents')) || 0;
      let sqft = Number(getVal('areaSqFt', 'sqft', 'squarefeet', 'area')) || 0;

      if (!cents && sqft > 0) {
        cents = parseFloat((sqft / SQFT_PER_CENT).toFixed(2));
      } else if (!sqft && cents > 0) {
        sqft = Math.round(cents * SQFT_PER_CENT);
      }

      if (sqft <= 0 && cents <= 0) {
        warnings.push({
          row: rowNum,
          plotNumber,
          warning: 'No measurement provided; marked as pending verification'
        });
      }

      const facing = String(getVal('facing', 'direction', 'orientation') || 'East').trim();
      const roadWidth = String(getVal('roadWidth', 'road', 'streetwidth') || '33 ft Blacktop Tar Road').trim();
      const dimensions = String(getVal('dimensions', 'size', 'dimension') || (sqft > 0 ? '30 ft x 40 ft' : 'Pending Survey')).trim();

      const cornerVal = getVal('isCornerPlot', 'corner', 'cornerplot');
      const isCornerPlot =
        cornerVal === true ||
        String(cornerVal).toLowerCase() === 'yes' ||
        String(cornerVal).toLowerCase() === 'true';

      const pricePerCent = Number(getVal('pricePerCent', 'ratepercent', 'rate')) || 527000;
      let price = Number(getVal('price', 'totalprice', 'cost')) || 0;
      if (!price && cents > 0) {
        price = Math.round(cents * pricePerCent * (isCornerPlot ? 1.05 : 1)); // 5% corner premium
      }
      const pricePerSqFt = sqft > 0 ? Math.round(price / sqft) : Math.round(pricePerCent / SQFT_PER_CENT);

      // Status
      let status: PlotStatus = 'Available';
      const statusRaw = String(getVal('status', 'availability') || '').toLowerCase();
      if (statusRaw.includes('sold')) status = 'Sold';
      else if (statusRaw.includes('res')) status = 'Reserved';
      else if (statusRaw.includes('book')) status = 'Booked';
      else if (statusRaw.includes('hid')) status = 'Hidden';

      const isVerified = sqft > 0 && cents > 0;
      const verificationNotes = !isVerified ? 'Schedule entry imported without confirmed survey measurement.' : '';

      const slug = `plot-${projectId.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${layoutGroup.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${plotNumber.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;

      const plot: Partial<Plot> = {
        id: slug,
        slug,
        projectId,
        tenantId,
        layoutGroup,
        plotNumber,
        title: `Plot #${plotNumber} (${layoutGroup})`,
        location: 'Tharuvaikulam, Thoothukudi',
        address: 'Near Thoothukudi–Rameswaram ECR Main Road, Tharuvaikulam',
        areaCents: cents,
        areaSqFt: sqft,
        dimensions,
        facing,
        roadWidth,
        isCornerPlot,
        pricePerCent,
        pricePerSqFt,
        price,
        priceDisplay: price > 0 ? `₹${(price / 100000).toFixed(2)} Lakhs` : 'Price on Request',
        status,
        approval: 'DTCP Approved & CRZ Cleared',
        approvalNumber: 'DTCP No. 112/2024',
        pattaStatus: 'Clear Title & Immediate Patta Ready',
        isVerified,
        verificationNotes,
        isFeatured: false,
        layoutPlotNumber: `Plot #${plotNumber}`,
        amenities: [
          'Walking Distance to Beach (350m)',
          '33 ft Blacktop Tar Road',
          'Sweet Groundwater Line',
          '24/7 Layout Security'
        ],
        landmarks: [
          { name: 'Tharuvaikulam Beach', distance: '350 m' },
          { name: 'ECR Main Road', distance: '0.5 km' }
        ],
        images: ['/images/product.png', '/images/ap-rajan-garden-layout.jpg'],
        createdAt: new Date().toISOString()
      };

      validPlots.push(plot);
    });

    return {
      totalRows: rawRows.length,
      validPlots,
      errors,
      warnings
    };
  }

  /**
   * Export an array of plots to an Excel Buffer
   */
  public static exportPlotsToExcel(plots: Plot[]): Buffer {
    const exportData = plots.map((p) => ({
      'Layout Group': p.layoutGroup || 'Group 1',
      'Plot Number': p.plotNumber || p.layoutPlotNumber.replace(/[^0-9]/g, ''),
      'Title': p.title,
      'Status': p.status,
      'Area (Cents)': p.areaCents,
      'Area (Sq Ft)': p.areaSqFt,
      'Dimensions': p.dimensions,
      'Facing': p.facing,
      'Road Width': p.roadWidth,
      'Corner Plot': p.isCornerPlot ? 'Yes' : 'No',
      'Price Per Cent (₹)': p.pricePerCent,
      'Price Per Sq Ft (₹)': p.pricePerSqFt,
      'Total Price (₹)': p.price,
      'Verified': p.isVerified ? 'Yes' : 'Pending Verification',
      'Approval': p.approval,
      'Approval Number': p.approvalNumber
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Plot Inventory');

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
    return excelBuffer as Buffer;
  }
}
