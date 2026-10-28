import fs from 'fs/promises';
import path from 'path';
import { Plot, Project, Enquiry } from './types';
import { INITIAL_PLOTS, INITIAL_PROJECTS, INITIAL_ENQUIRIES } from './data-defaults';

const DATA_DIR = path.join(process.cwd(), 'data');
const PLOTS_FILE = path.join(DATA_DIR, 'plots.json');
const PROJECTS_FILE = path.join(DATA_DIR, 'projects.json');
const ENQUIRIES_FILE = path.join(DATA_DIR, 'enquiries.json');

async function ensureDataFiles() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });

    try {
      await fs.access(PLOTS_FILE);
    } catch {
      await fs.writeFile(PLOTS_FILE, JSON.stringify(INITIAL_PLOTS, null, 2), 'utf-8');
    }

    try {
      await fs.access(PROJECTS_FILE);
    } catch {
      await fs.writeFile(PROJECTS_FILE, JSON.stringify(INITIAL_PROJECTS, null, 2), 'utf-8');
    }

    try {
      await fs.access(ENQUIRIES_FILE);
    } catch {
      await fs.writeFile(ENQUIRIES_FILE, JSON.stringify(INITIAL_ENQUIRIES, null, 2), 'utf-8');
    }
  } catch (error) {
    console.error('Error ensuring data files:', error);
  }
}

// Plots CRUD
export async function getPlots(): Promise<Plot[]> {
  await ensureDataFiles();
  try {
    const raw = await fs.readFile(PLOTS_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (error) {
    console.error('Error reading plots:', error);
    return INITIAL_PLOTS;
  }
}

const SLUG_ALIASES: Record<string, string> = {
  'pearl-haven-plot-18': 'pearl-haven-corner-villa-plot-korampallam',
  'palayam-greens-corner-42': 'palayam-greenfield-residential-plot-nh138',
  'harbour-enclave-villa-plot': 'harbour-view-enclave-east-facing-muthiapuram',
  'millerpuram-central-avenue': 'millerpuram-central-luxury-plot',
  'ap-rajan-garden': 'ap-rajan-garden-beachside-villa-plot-tharuvaikulam',
  'ap-rajan-garden-plot': 'ap-rajan-garden-beachside-villa-plot-tharuvaikulam',
  'ap-rajan-garden-beachside': 'ap-rajan-garden-beachside-villa-plot-tharuvaikulam',
};

export async function getPlotBySlug(slug: string): Promise<Plot | null> {
  const plots = await getPlots();
  const targetSlug = SLUG_ALIASES[slug] || slug;
  const directMatch = plots.find((p) => p.slug === targetSlug || p.id === targetSlug || p.slug === slug);
  if (directMatch) return directMatch;

  // Fuzzy match to prevent 404s on partial slugs
  const normalized = slug.toLowerCase().replace(/[^a-z0-9]/g, '');
  return (
    plots.find((p) => {
      const pNorm = (p.slug + p.title + p.id).toLowerCase().replace(/[^a-z0-9]/g, '');
      return pNorm.includes(normalized) || normalized.includes(p.id.replace(/[^a-z0-9]/g, ''));
    }) || null
  );
}

export async function savePlot(plotData: Partial<Plot>): Promise<Plot> {
  const plots = await getPlots();
  const now = new Date().toISOString().split('T')[0];

  if (plotData.id) {
    // Update existing
    const index = plots.findIndex((p) => p.id === plotData.id);
    if (index !== -1) {
      const updated: Plot = {
        ...plots[index],
        ...plotData,
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
    title: plotData.title || 'Residential Plot in Thoothukudi',
    project: plotData.project || 'Independent Layout',
    location: plotData.location || 'Korampallam',
    address: plotData.address || 'Thoothukudi, Tamil Nadu',
    price: Number(plotData.price) || 2000000,
    priceDisplay: plotData.priceDisplay || `₹${((Number(plotData.price) || 2000000) / 100000).toFixed(2)} Lakhs`,
    pricePerSqFt: Number(plotData.pricePerSqFt) || 1600,
    pricePerCent: Number(plotData.pricePerCent) || 700000,
    areaSqFt: Number(plotData.areaSqFt) || 1200,
    areaCents: Number(plotData.areaCents) || 2.75,
    dimensions: plotData.dimensions || '30 ft x 40 ft',
    facing: plotData.facing || 'East',
    roadWidth: plotData.roadWidth || '30 ft Blacktop Tar Road',
    approval: plotData.approval || 'DTCP Approved',
    approvalNumber: plotData.approvalNumber || 'DTCP Verified',
    pattaStatus: plotData.pattaStatus || 'Clear Legal Patta',
    status: plotData.status || 'Available',
    isFeatured: !!plotData.isFeatured,
    description: plotData.description || 'Premium residential plot ready for registration in Thoothukudi.',
    amenities: plotData.amenities && plotData.amenities.length > 0 ? plotData.amenities : [
      'Blacktop Tar Road',
      'Electricity Line',
      'Sweet Groundwater',
      'Boundary Demarcation'
    ],
    landmarks: plotData.landmarks && plotData.landmarks.length > 0 ? plotData.landmarks : [
      { name: 'Tuticorin Bus Stand', distance: '10 mins' },
      { name: 'Collectorate', distance: '5 mins' }
    ],
    images: plotData.images && plotData.images.length > 0 ? plotData.images : [
      '/images/ap-rajan-garden-layout.jpg'
    ],
    layoutPlotNumber: plotData.layoutPlotNumber || 'Plot #01',
    createdAt: now,
  };

  plots.unshift(newPlot);
  await fs.writeFile(PLOTS_FILE, JSON.stringify(plots, null, 2), 'utf-8');
  return newPlot;
}

export async function deletePlot(id: string): Promise<boolean> {
  const plots = await getPlots();
  const filtered = plots.filter((p) => p.id !== id);
  if (filtered.length !== plots.length) {
    await fs.writeFile(PLOTS_FILE, JSON.stringify(filtered, null, 2), 'utf-8');
    return true;
  }
  return false;
}

// Projects
export async function getProjects(): Promise<Project[]> {
  await ensureDataFiles();
  try {
    const raw = await fs.readFile(PROJECTS_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (error) {
    console.error('Error reading projects:', error);
    return INITIAL_PROJECTS;
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const projects = await getProjects();
  return projects.find((p) => p.slug === slug || p.id === slug) || null;
}

// Enquiries
export async function getEnquiries(): Promise<Enquiry[]> {
  await ensureDataFiles();
  try {
    const raw = await fs.readFile(ENQUIRIES_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (error) {
    console.error('Error reading enquiries:', error);
    return INITIAL_ENQUIRIES;
  }
}

export async function saveEnquiry(enquiryData: Omit<Enquiry, 'id' | 'createdAt' | 'status'> & { status?: Enquiry['status'] }): Promise<Enquiry> {
  const enquiries = await getEnquiries();
  const newEnquiry: Enquiry = {
    id: `enq-${Date.now()}`,
    plotId: enquiryData.plotId,
    plotTitle: enquiryData.plotTitle,
    name: enquiryData.name,
    phone: enquiryData.phone,
    email: enquiryData.email,
    message: enquiryData.message,
    preferredLocation: enquiryData.preferredLocation,
    budget: enquiryData.budget,
    status: enquiryData.status || 'New',
    createdAt: new Date().toISOString(),
  };

  enquiries.unshift(newEnquiry);
  await fs.writeFile(ENQUIRIES_FILE, JSON.stringify(enquiries, null, 2), 'utf-8');
  return newEnquiry;
}

export async function updateEnquiryStatus(id: string, status: Enquiry['status']): Promise<Enquiry | null> {
  const enquiries = await getEnquiries();
  const index = enquiries.findIndex((e) => e.id === id);
  if (index !== -1) {
    enquiries[index].status = status;
    await fs.writeFile(ENQUIRIES_FILE, JSON.stringify(enquiries, null, 2), 'utf-8');
    return enquiries[index];
  }
  return null;
}
