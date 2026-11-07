import fs from 'fs/promises';
import path from 'path';
import { Plot, Project, Enquiry, Tenant, SubscriptionPlan } from './types';
import { INITIAL_PLOTS, INITIAL_PROJECTS, INITIAL_ENQUIRIES } from './data-defaults';
import {
  AP_RAJAN_GARDEN_PROJECT,
  generateAPRajanGardenPlots
} from './data-ap-rajan-garden';

const DATA_DIR = path.join(process.cwd(), 'data');
const PLOTS_FILE = path.join(DATA_DIR, 'plots.json');
const PROJECTS_FILE = path.join(DATA_DIR, 'projects.json');
const ENQUIRIES_FILE = path.join(DATA_DIR, 'enquiries.json');
const TENANTS_FILE = path.join(DATA_DIR, 'tenants.json');

const INITIAL_TENANTS: Tenant[] = [
  {
    id: 'tenant-sri-balaji-promoters',
    name: 'Sri Balaji Promoters',
    slug: 'sri-balaji-promoters',
    companyName: 'Sri Balaji Real Estate & Promoters Pvt Ltd',
    email: 'promoters@plotfortuty.com',
    phone: '+91 94431 52633',
    address: '42/A Beach Road, Tharuvaikulam, Thoothukudi 628105',
    district: 'Thoothukudi',
    reraNumber: 'TNRERA/PROM/TUTY/2024/042',
    status: 'approved',
    subscriptionPlan: 'professional',
    subscriptionStatus: 'active',
    subscriptionExpiresAt: '2027-12-31T23:59:59Z',
    maxProjects: 10,
    maxPlots: 500,
    logo: '/images/product.png',
    verifiedAt: '2026-01-15T00:00:00Z',
    createdAt: '2026-01-15T00:00:00Z'
  },
  {
    id: 'tenant-pearl-city-developers',
    name: 'Pearl City Developers',
    slug: 'pearl-city-developers',
    companyName: 'Pearl City Township Developers LLP',
    email: 'contact@pearlcitydev.com',
    phone: '+91 98422 11980',
    address: '15 Palayamkottai Road, Thoothukudi 628002',
    district: 'Thoothukudi',
    reraNumber: 'TNRERA/PROM/TUTY/2024/055',
    status: 'approved',
    subscriptionPlan: 'starter',
    subscriptionStatus: 'active',
    subscriptionExpiresAt: '2027-06-30T23:59:59Z',
    maxProjects: 2,
    maxPlots: 50,
    logo: '/images/real_estate.png',
    verifiedAt: '2026-02-10T00:00:00Z',
    createdAt: '2026-02-10T00:00:00Z'
  }
];

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: 'plan-starter',
    name: 'Starter Promoter',
    slug: 'starter',
    priceMonthly: 2999,
    priceYearly: 29990,
    maxProjects: 1,
    maxPlots: 35,
    features: [
      '1 Plotted Community Project Listing',
      'Up to 35 Individual Plot Entries',
      'Direct Buyer Inquiries via Email & SMS',
      'Verified Badge & DTCP Tagging',
      'Standard Plot Availability Manager'
    ],
    isPopular: false
  },
  {
    id: 'plan-professional',
    name: 'Professional Developer',
    slug: 'professional',
    priceMonthly: 7999,
    priceYearly: 79990,
    maxProjects: 5,
    maxPlots: 250,
    features: [
      'Up to 5 Layout Communities & Townships',
      'Up to 250 Plots with Bulk Excel Import/Export',
      'Interactive Masterplan Pan-and-Zoom Layout',
      'Instant WhatsApp Meta Cloud Alerts & Leads',
      'Turnkey House Construction Showcase Module',
      'Lead CRM Pipeline & Sales Team Assignment',
      'Priority Featured Placements in Thoothukudi'
    ],
    isPopular: true
  },
  {
    id: 'plan-enterprise',
    name: 'Enterprise Builder',
    slug: 'enterprise',
    priceMonthly: 19999,
    priceYearly: 199990,
    maxProjects: 25,
    maxPlots: 2000,
    features: [
      'Unlimited Residential & Commercial Projects',
      'Unlimited Plot Units & Multi-Phase Groups',
      'Dedicated Real Estate Account Manager',
      'Razorpay Booking Token Payments Integration',
      'Custom Domain & Developer Portal Branding',
      'Comprehensive Audit Logs & Revenue Analytics',
      'Full Turnkey Villa Estimator & Financing Portal'
    ],
    isPopular: false
  }
];

// Helper to seed initial dataset including all 181 AP Rajan Garden schedule entries
function getCombinedInitialPlots(): Plot[] {
  const apPlots = generateAPRajanGardenPlots();
  // Ensure existing sample plots with custom photos remain accessible
  const existingMap = new Map<string, Plot>();
  for (const p of INITIAL_PLOTS) {
    existingMap.set(p.slug, p);
  }
  for (const p of apPlots) {
    if (!existingMap.has(p.slug)) {
      existingMap.set(p.slug, p);
    }
  }
  return Array.from(existingMap.values());
}

async function ensureDataFiles() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });

    try {
      await fs.access(PLOTS_FILE);
    } catch {
      const allPlots = getCombinedInitialPlots();
      await fs.writeFile(PLOTS_FILE, JSON.stringify(allPlots, null, 2), 'utf-8');
    }

    try {
      await fs.access(PROJECTS_FILE);
    } catch {
      // Ensure AP Rajan Garden is the flagship project
      const combinedProjects = [
        AP_RAJAN_GARDEN_PROJECT,
        ...INITIAL_PROJECTS.filter((p) => p.slug !== 'ap-rajan-garden' && p.slug !== 'ap-rajan-garden-tharuvaikulam')
      ];
      await fs.writeFile(PROJECTS_FILE, JSON.stringify(combinedProjects, null, 2), 'utf-8');
    }

    try {
      await fs.access(ENQUIRIES_FILE);
    } catch {
      await fs.writeFile(ENQUIRIES_FILE, JSON.stringify(INITIAL_ENQUIRIES, null, 2), 'utf-8');
    }

    try {
      await fs.access(TENANTS_FILE);
    } catch {
      await fs.writeFile(TENANTS_FILE, JSON.stringify(INITIAL_TENANTS, null, 2), 'utf-8');
    }
  } catch (error) {
    console.error('Error ensuring data files:', error);
  }
}

// Plots CRUD with Multi-Tenant Scoping
export async function getPlots(filter?: {
  tenantId?: string;
  projectId?: string;
  layoutGroup?: string;
  status?: string;
  search?: string;
}): Promise<Plot[]> {
  await ensureDataFiles();
  try {
    const raw = await fs.readFile(PLOTS_FILE, 'utf-8');
    let plots: Plot[] = JSON.parse(raw);

    // If storage file was created with old few plots, merge in the full 181 AP Rajan Garden schedule
    if (plots.length < 50) {
      plots = getCombinedInitialPlots();
      await fs.writeFile(PLOTS_FILE, JSON.stringify(plots, null, 2), 'utf-8');
    }

    if (!filter) return plots;

    return plots.filter((plot) => {
      if (filter.tenantId && plot.tenantId && plot.tenantId !== filter.tenantId) {
        return false;
      }
      if (filter.projectId && plot.projectId && plot.projectId !== filter.projectId) {
        return false;
      }
      if (filter.layoutGroup && filter.layoutGroup !== 'All' && plot.layoutGroup !== filter.layoutGroup) {
        return false;
      }
      if (filter.status && filter.status !== 'All' && plot.status !== filter.status) {
        return false;
      }
      if (filter.search) {
        const q = filter.search.toLowerCase();
        const match =
          plot.title.toLowerCase().includes(q) ||
          plot.layoutPlotNumber.toLowerCase().includes(q) ||
          plot.location.toLowerCase().includes(q) ||
          plot.dimensions.toLowerCase().includes(q);
        if (!match) return false;
      }
      return true;
    });
  } catch (error) {
    console.error('Error reading plots:', error);
    return getCombinedInitialPlots();
  }
}

const SLUG_ALIASES: Record<string, string> = {
  'pearl-haven-plot-18': 'ap-rajan-garden-g1-plot-002',
  'pearl-haven-corner-villa-plot-korampallam': 'ap-rajan-garden-g1-plot-002',
  'palayam-greens-corner-42': 'ap-rajan-garden-g1-plot-002',
  'palayam-greenfield-residential-plot-nh138': 'ap-rajan-garden-g1-plot-003',
  'harbour-enclave-villa-plot': 'ap-rajan-garden-g1-plot-002',
  'harbour-view-enclave-east-facing-muthiapuram': 'ap-rajan-garden-g1-plot-002',
  'millerpuram-central-avenue': 'ap-rajan-garden-g1-plot-005',
  'millerpuram-central-luxury-plot': 'ap-rajan-garden-g1-plot-005',
  'ap-rajan-garden': 'ap-rajan-garden-g1-plot-002',
  'ap-rajan-garden-plot': 'ap-rajan-garden-g1-plot-002',
  'ap-rajan-garden-beachside': 'ap-rajan-garden-g1-plot-002',
  'ap-rajan-garden-beachside-villa-plot-tharuvaikulam': 'ap-rajan-garden-g1-plot-002',
  'ap-rajan-garden-beachside-villa-plot-02': 'ap-rajan-garden-g1-plot-002',
  'ap-rajan-garden-villa-plot-01': 'ap-rajan-garden-g1-plot-001',
  'ap-rajan-garden-avenue-plot-03': 'ap-rajan-garden-g1-plot-003',
  'ap-rajan-garden-grand-villa-plot-05': 'ap-rajan-garden-g1-plot-005'
};

export async function getPlotBySlug(slug: string): Promise<Plot | null> {
  const plots = await getPlots();
  const targetSlug = SLUG_ALIASES[slug] || slug;

  const directMatch = plots.find(
    (p) => p.slug === targetSlug || p.id === targetSlug || p.slug === slug || p.id === slug
  );
  if (directMatch) return directMatch;

  // Match by plot number in AP Rajan Garden e.g., "plot-2" or "plot-02"
  const plotNumMatch = slug.match(/plot-(\d+)/i);
  if (plotNumMatch) {
    const num = String(parseInt(plotNumMatch[1], 10));
    const match = plots.find(
      (p) => p.plotNumber === num || p.layoutPlotNumber === `Plot #${num}`
    );
    if (match) return match;
  }

  // Normalized fuzzy fallback
  const normalized = slug.toLowerCase().replace(/[^a-z0-9]/g, '');
  return (
    plots.find((p) => {
      const pNorm = (p.slug + p.title + p.id).toLowerCase().replace(/[^a-z0-9]/g, '');
      return pNorm.includes(normalized) || normalized.includes(p.id.replace(/[^a-z0-9]/g, ''));
    }) || null
  );
}

export async function savePlot(plotData: Partial<Plot>, tenantId?: string): Promise<Plot> {
  const plots = await getPlots();
  const now = new Date().toISOString().split('T')[0];

  if (plotData.id) {
    // Update existing
    const index = plots.findIndex((p) => p.id === plotData.id);
    if (index !== -1) {
      const updated: Plot = {
        ...plots[index],
        ...plotData,
        tenantId: tenantId || plots[index].tenantId || 'tenant-sri-balaji-promoters'
      } as Plot;
      plots[index] = updated;
      await fs.writeFile(PLOTS_FILE, JSON.stringify(plots, null, 2), 'utf-8');
      return updated;
    }
  }

  // Create new
  const id = `plot-${Date.now()}`;
  const slug = (plotData.title || `plot-${Date.now()}`)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

  const newPlot: Plot = {
    id,
    slug,
    projectId: plotData.projectId || 'proj-ap-rajan-garden',
    tenantId: tenantId || plotData.tenantId || 'tenant-sri-balaji-promoters',
    layoutGroup: plotData.layoutGroup || 'Group 1',
    plotNumber: plotData.plotNumber || String(plots.length + 1),
    title: plotData.title || `Plot #${plotData.plotNumber || plots.length + 1}`,
    project: plotData.project || 'AP Rajan Garden',
    location: plotData.location || 'Tharuvaikulam, Thoothukudi',
    address: plotData.address || 'Near Thoothukudi–Rameswaram ECR Main Road, Tharuvaikulam',
    price: Number(plotData.price) || 1450000,
    priceDisplay: plotData.priceDisplay || `₹${((Number(plotData.price) || 1450000) / 100000).toFixed(2)} Lakhs`,
    pricePerSqFt: Number(plotData.pricePerSqFt) || 1208,
    pricePerCent: Number(plotData.pricePerCent) || 527272,
    areaSqFt: Number(plotData.areaSqFt) || 1200,
    areaCents: Number(plotData.areaCents) || 2.75,
    dimensions: plotData.dimensions || '30 ft x 40 ft',
    facing: plotData.facing || 'East',
    roadWidth: plotData.roadWidth || '33 ft Blacktop Tar Road',
    isCornerPlot: Boolean(plotData.isCornerPlot),
    approval: plotData.approval || 'DTCP Approved & CRZ Cleared',
    approvalNumber: plotData.approvalNumber || 'DTCP No. 112/2024',
    pattaStatus: plotData.pattaStatus || 'Clear Title & Immediate Patta Ready',
    status: plotData.status || 'Available',
    isFeatured: Boolean(plotData.isFeatured),
    description: plotData.description || 'Prime residential plot ready for registration in Thoothukudi.',
    amenities:
      plotData.amenities && plotData.amenities.length > 0
        ? plotData.amenities
        : ['Walking Distance to Beach (350m)', '33 ft Tar Road', 'Sweet Groundwater', '24/7 Security'],
    landmarks:
      plotData.landmarks && plotData.landmarks.length > 0
        ? plotData.landmarks
        : [
            { name: 'Tharuvaikulam Beach', distance: '350 m' },
            { name: 'ECR Main Road', distance: '0.5 km' }
          ],
    images:
      plotData.images && plotData.images.length > 0
        ? plotData.images
        : ['/images/product.png', '/images/ap-rajan-garden-layout.jpg'],
    layoutPlotNumber: plotData.layoutPlotNumber || `Plot #${plotData.plotNumber || '01'}`,
    createdAt: now
  };

  plots.unshift(newPlot);
  await fs.writeFile(PLOTS_FILE, JSON.stringify(plots, null, 2), 'utf-8');
  return newPlot;
}

export async function deletePlot(id: string, tenantId?: string): Promise<boolean> {
  const plots = await getPlots();
  const target = plots.find((p) => p.id === id);
  if (!target) return false;

  // Tenant validation
  if (tenantId && target.tenantId && target.tenantId !== tenantId) {
    throw new Error('Unauthorized to delete plots belonging to another developer');
  }

  const filtered = plots.filter((p) => p.id !== id);
  await fs.writeFile(PLOTS_FILE, JSON.stringify(filtered, null, 2), 'utf-8');
  return true;
}

// Bulk Save Plots (Used for Excel Import)
export async function batchSavePlots(
  plotsToImport: Partial<Plot>[],
  projectId: string,
  tenantId: string
): Promise<{ added: number; updated: number }> {
  const plots = await getPlots();
  let added = 0;
  let updated = 0;

  for (const newPlot of plotsToImport) {
    const existingIndex = plots.findIndex(
      (p) =>
        p.projectId === projectId &&
        p.layoutGroup === newPlot.layoutGroup &&
        p.plotNumber === newPlot.plotNumber
    );

    if (existingIndex !== -1) {
      plots[existingIndex] = {
        ...plots[existingIndex],
        ...newPlot,
        tenantId,
        projectId
      } as Plot;
      updated++;
    } else {
      const fullPlot: Plot = {
        id: newPlot.id || `plot-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        slug: newPlot.slug || `plot-${projectId}-${newPlot.layoutGroup}-${newPlot.plotNumber}`.toLowerCase(),
        title: newPlot.title || `Plot #${newPlot.plotNumber} (${newPlot.layoutGroup})`,
        project: 'AP Rajan Garden',
        projectId,
        tenantId,
        layoutGroup: newPlot.layoutGroup || 'Group 1',
        plotNumber: String(newPlot.plotNumber),
        location: newPlot.location || 'Tharuvaikulam, Thoothukudi',
        address: newPlot.address || 'Near ECR Main Road, Tharuvaikulam',
        price: Number(newPlot.price) || 1450000,
        priceDisplay: newPlot.priceDisplay || `₹${((Number(newPlot.price) || 1450000) / 100000).toFixed(2)} Lakhs`,
        pricePerSqFt: Number(newPlot.pricePerSqFt) || 1208,
        pricePerCent: Number(newPlot.pricePerCent) || 527272,
        areaSqFt: Number(newPlot.areaSqFt) || 1200,
        areaCents: Number(newPlot.areaCents) || 2.75,
        dimensions: newPlot.dimensions || '30 ft x 40 ft',
        facing: newPlot.facing || 'East',
        roadWidth: newPlot.roadWidth || '33 ft Blacktop Tar Road',
        isCornerPlot: Boolean(newPlot.isCornerPlot),
        approval: (newPlot.approval as Plot['approval']) || 'DTCP Approved & CRZ Cleared',
        approvalNumber: newPlot.approvalNumber || 'DTCP No. 112/2024',
        pattaStatus: newPlot.pattaStatus || 'Clear Title & Immediate Patta Ready',
        status: (newPlot.status as Plot['status']) || 'Available',
        isFeatured: Boolean(newPlot.isFeatured),
        description: newPlot.description || 'Imported residential plot in Thoothukudi.',
        amenities: newPlot.amenities || ['33 ft Tar Road', 'Sweet Groundwater', '24/7 Security'],
        landmarks: newPlot.landmarks || [{ name: 'Tharuvaikulam Beach', distance: '350 m' }],
        images: newPlot.images || ['/images/product.png', '/images/ap-rajan-garden-layout.jpg'],
        layoutPlotNumber: newPlot.layoutPlotNumber || `Plot #${newPlot.plotNumber}`,
        isVerified: newPlot.isVerified !== undefined ? Boolean(newPlot.isVerified) : true,
        verificationNotes: newPlot.verificationNotes || '',
        createdAt: new Date().toISOString()
      };
      plots.push(fullPlot);
      added++;
    }
  }

  await fs.writeFile(PLOTS_FILE, JSON.stringify(plots, null, 2), 'utf-8');
  return { added, updated };
}

// Projects
export async function getProjects(tenantId?: string): Promise<Project[]> {
  await ensureDataFiles();
  try {
    const raw = await fs.readFile(PROJECTS_FILE, 'utf-8');
    const projects: Project[] = JSON.parse(raw);

    // Ensure AP Rajan Garden with the exact canonical slug exists
    const hasAP = projects.some((p) => p.slug === 'ap-rajan-garden');
    if (!hasAP) {
      projects.unshift(AP_RAJAN_GARDEN_PROJECT);
      await fs.writeFile(PROJECTS_FILE, JSON.stringify(projects, null, 2), 'utf-8');
    }

    if (tenantId) {
      return projects.filter((p) => !p.tenantId || p.tenantId === tenantId);
    }
    return projects;
  } catch (error) {
    console.error('Error reading projects:', error);
    return [AP_RAJAN_GARDEN_PROJECT, ...INITIAL_PROJECTS];
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const projects = await getProjects();
  if (slug === 'ap-rajan-garden' || slug === 'ap-rajan-garden-tharuvaikulam') {
    return (
      projects.find((p) => p.slug === 'ap-rajan-garden' || p.slug === 'ap-rajan-garden-tharuvaikulam') ||
      AP_RAJAN_GARDEN_PROJECT
    );
  }
  return projects.find((p) => p.slug === slug || p.id === slug) || null;
}

// Tenants
export async function getTenants(): Promise<Tenant[]> {
  await ensureDataFiles();
  try {
    const raw = await fs.readFile(TENANTS_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return INITIAL_TENANTS;
  }
}

export async function getTenantById(id: string): Promise<Tenant | null> {
  const tenants = await getTenants();
  return tenants.find((t) => t.id === id || t.slug === id) || null;
}

export async function saveTenant(tenantData: Partial<Tenant>): Promise<Tenant> {
  const tenants = await getTenants();
  if (tenantData.id) {
    const idx = tenants.findIndex((t) => t.id === tenantData.id);
    if (idx !== -1) {
      tenants[idx] = { ...tenants[idx], ...tenantData } as Tenant;
      await fs.writeFile(TENANTS_FILE, JSON.stringify(tenants, null, 2), 'utf-8');
      return tenants[idx];
    }
  }

  const newTenant: Tenant = {
    id: `tenant-${Date.now()}`,
    name: tenantData.name || 'New Promoter',
    slug: (tenantData.companyName || tenantData.name || `developer-${Date.now()}`)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-'),
    companyName: tenantData.companyName || tenantData.name || 'Real Estate Developer',
    email: tenantData.email || '',
    phone: tenantData.phone || '',
    address: tenantData.address || '',
    district: tenantData.district || 'Thoothukudi',
    status: tenantData.status || 'pending',
    subscriptionPlan: tenantData.subscriptionPlan || 'starter',
    subscriptionStatus: 'active',
    subscriptionExpiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    maxProjects: 2,
    maxPlots: 50,
    createdAt: new Date().toISOString()
  };

  tenants.push(newTenant);
  await fs.writeFile(TENANTS_FILE, JSON.stringify(tenants, null, 2), 'utf-8');
  return newTenant;
}

// Enquiries & Leads
export async function getEnquiries(tenantId?: string): Promise<Enquiry[]> {
  await ensureDataFiles();
  try {
    const raw = await fs.readFile(ENQUIRIES_FILE, 'utf-8');
    const enquiries: Enquiry[] = JSON.parse(raw);
    if (tenantId) {
      return enquiries.filter((e) => !e.tenantId || e.tenantId === tenantId);
    }
    return enquiries;
  } catch (error) {
    console.error('Error reading enquiries:', error);
    return INITIAL_ENQUIRIES;
  }
}

export async function saveEnquiry(
  enquiryData: Omit<Enquiry, 'id' | 'createdAt' | 'status'> & {
    status?: Enquiry['status'];
    tenantId?: string;
    stage?: Enquiry['stage'];
  }
): Promise<Enquiry> {
  const enquiries = await getEnquiries();
  const newEnquiry: Enquiry = {
    id: `enq-${Date.now()}`,
    plotId: enquiryData.plotId,
    plotTitle: enquiryData.plotTitle,
    projectId: enquiryData.projectId || 'proj-ap-rajan-garden',
    tenantId: enquiryData.tenantId || 'tenant-sri-balaji-promoters',
    name: enquiryData.name,
    phone: enquiryData.phone,
    email: enquiryData.email,
    message: enquiryData.message,
    preferredLocation: enquiryData.preferredLocation,
    budget: enquiryData.budget,
    status: enquiryData.status || 'New',
    stage: enquiryData.stage || 'New',
    constructionInterest: enquiryData.constructionInterest,
    createdAt: new Date().toISOString()
  };

  enquiries.unshift(newEnquiry);
  await fs.writeFile(ENQUIRIES_FILE, JSON.stringify(enquiries, null, 2), 'utf-8');
  return newEnquiry;
}

export async function updateEnquiryStatus(
  id: string,
  status: Enquiry['status'],
  stage?: Enquiry['stage']
): Promise<Enquiry | null> {
  const enquiries = await getEnquiries();
  const index = enquiries.findIndex((e) => e.id === id);
  if (index !== -1) {
    enquiries[index].status = status;
    if (stage) enquiries[index].stage = stage;
    await fs.writeFile(ENQUIRIES_FILE, JSON.stringify(enquiries, null, 2), 'utf-8');
    return enquiries[index];
  }
  return null;
}
