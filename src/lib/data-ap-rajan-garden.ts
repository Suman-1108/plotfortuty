import { Plot, Project, ConstructionPackage } from './types';

export const AP_RAJAN_GARDEN_CONSTRUCTION_PACKAGES: ConstructionPackage[] = [
  {
    id: 'pkg-basic',
    name: 'Basic Villa Package',
    tagline: 'Cost-Effective, Durable Quality Construction for Residential Living',
    ratePerSqFt: 1950,
    specs: {
      foundation: 'Isolated RCC Column Footing with anti-termite chemical soil treatment',
      structure: 'Framed RCC Column-Beam structure with wire-cut red brick masonry (9" outer, 4.5" partition walls)',
      flooring: 'Branded 2x2 vitrified tiles (Kajaria / Somany or equivalent)',
      doorsWindows: 'Teak wood main entrance door, country wood internal doors, UPVC glass sliding windows with MS safety grills',
      kitchen: 'Black granite platform with stainless steel sink and 2ft ceramic wall tile dado',
      bathrooms: 'Anti-skid ceramic floor tiles, 7ft glazed wall tiles, Parryware / Hindware sanitaryware & chrome fittings',
      electrical: 'Concealed Finolex / Polycab flame-retardant copper wiring with Anchor Roma modular switches and inverter provision',
      painting: 'Interior 2 coats Asian Paints wall putty with tractor emulsion; exterior waterproof ace emulsion'
    },
    highlights: [
      'Engineered structural design with soil testing',
      'Sweet groundwater layout connection',
      'Overhead PVC water tank (1000L) with RCC loft',
      '6-Month complete handover timeline guarantee'
    ],
    estimatedTimelineMonths: 6,
    isActive: true
  },
  {
    id: 'pkg-premium',
    name: 'Premium Beachside Villa Package',
    tagline: 'Modern Architectural Finishes, Teak Elements & Energy-Smart Layouts',
    ratePerSqFt: 2450,
    specs: {
      foundation: 'Deep reinforced RCC Raft / Column footing with dual waterproof coating',
      structure: 'High-strength M25 grade RCC framed structure with fly-ash clay brick construction',
      flooring: 'Large format 4x2 glossy vitrified tiles / Italian marble texture vitrified tiles',
      doorsWindows: 'First quality Burma Teak entrance door with biometric digital lock, German profile UPVC sound-insulated windows with mosquito mesh',
      kitchen: 'Quartz / Premium Jet Black granite counter with double bowl sink, chimney exhaust provision and modular cabinet carcass',
      bathrooms: 'Designer digital wall tiles up to ceiling height, Jaguar / Kohler concealed diverters and wall-hung EWCs',
      electrical: 'Legrand modular switches with smart home lighting automation prep, independent circuit breaker DB and EV charging point',
      painting: 'Interior Asian Paints Royale luxury emulsion with smooth acrylic putty; exterior Apex Ultima weatherproof silicon paint'
    },
    highlights: [
      'Custom 2D/3D floor plan and exterior elevation render',
      'Dedicated individual plot water sump (4,000L) + Overhead tank',
      'Beachside corrosion-resistant GI / SS 304 balcony and staircase railings',
      '8-Month turnkey handover with 5-year structural warranty'
    ],
    estimatedTimelineMonths: 8,
    isActive: true
  },
  {
    id: 'pkg-luxury',
    name: 'Luxury Custom Holiday Home',
    tagline: 'Bespoke Contemporary Coastal Retreat with Private Terrace Garden',
    ratePerSqFt: 3100,
    specs: {
      foundation: 'Specialized marine-grade reinforced RCC foundation with capillary damp-proofing membranes',
      structure: 'Seismic Zone-III compliant monolithic RCC frame with high-thermal insulation hollow clay block masonry',
      flooring: 'Italian Marble in living / foyer and premium matte anti-slip wooden finish tiles in private master suites',
      doorsWindows: 'Full 8ft solid Teakwood main door with Smart Video Door Phone, thermal-break double glazed acoustic UPVC glass facade',
      kitchen: 'Complete soft-close acrylic/lacquered modular kitchen with quartz island counter, built-in hob and chimney',
      bathrooms: 'Kohler / Grohe thermostatic rain showers, sensor faucets, toughened glass shower cubicles and heated towel rails',
      electrical: 'Full Smart Home IoT automation (lighting, AC, security cameras, gate sensors) with 3kW on-grid solar power prep',
      painting: 'Texture wall accents, PU wooden polish, anti-fungal marine polyurethane exterior cladding'
    },
    highlights: [
      'Private rooftop stargazing gazebo / barbecue patio deck',
      'Architectural landscape garden with automatic drip irrigation',
      'Dedicated project manager with weekly HD video site walkthrough updates',
      'Comprehensive 10-year structural warranty & 1-year free maintenance'
    ],
    estimatedTimelineMonths: 10,
    isActive: true
  }
];

// Helper to generate 181 scheduled entries for AP Rajan Garden
export function generateAPRajanGardenPlots(): Plot[] {
  const plots: Plot[] = [];
  const basePricePerCent = 527272; // ~ ₹14.50 Lakhs for 2.75 cents
  const projectId = 'proj-ap-rajan-garden';
  const tenantId = 'tenant-sri-balaji-promoters';

  // Group 1: 145 Plots
  for (let i = 1; i <= 145; i++) {
    const isCorner = i === 1 || i === 24 || i === 48 || i === 72 || i === 96 || i === 120 || i === 145;
    const isMainAvenue = i >= 1 && i <= 30;
    const roadWidth = isMainAvenue ? '40 ft Central Main Avenue Road' : '33 ft Blacktop Tar Road';
    
    // Vary plot sizes realistically according to the layout schedule
    let cents = 2.75;
    let dimensions = '30 ft x 40 ft';
    let sqft = 1200;
    let isVerified = true;
    let notes = '';

    if (isCorner) {
      cents = 4.13;
      sqft = 1800;
      dimensions = '36 ft x 50 ft';
    } else if (i % 7 === 0) {
      cents = 3.44;
      sqft = 1500;
      dimensions = '30 ft x 50 ft';
    } else if (i % 11 === 0) {
      cents = 2.30;
      sqft = 1000;
      dimensions = '25 ft x 40 ft';
    } else if (i > 135) {
      // Flag specific fringe plots for survey verification as required
      cents = 2.75;
      sqft = 1200;
      dimensions = 'Pending Exact Boundary Re-Survey';
      isVerified = false;
      notes = 'Boundary demarcation pending official field verification by surveyor.';
    }

    const facings = ['East', 'North', 'West', 'South'];
    const facing = isCorner ? 'North-East Corner' : facings[i % 4];

    // Status distribution
    let status: Plot['status'] = 'Available';
    if (i === 1 || i === 12 || i === 29 || i === 65 || i === 88 || i === 114) {
      status = 'Sold';
    } else if (i === 4 || i === 18 || i === 52 || i === 99) {
      status = 'Reserved';
    } else if (i === 7 || i === 33 || i === 76) {
      status = 'Booked';
    }

    const price = Math.round(cents * basePricePerCent * (isCorner ? 1.05 : 1));
    const priceDisplay = `₹${(price / 100000).toFixed(2)} Lakhs`;
    const pricePerSqFt = Math.round(price / sqft);

    const padNum = String(i).padStart(3, '0');
    const slug = `ap-rajan-garden-g1-plot-${padNum}`;

    plots.push({
      id: `plot-ap-g1-${i}`,
      slug,
      projectId,
      tenantId,
      developerName: 'Sri Balaji Promoters',
      layoutGroup: 'Group 1',
      plotNumber: String(i),
      layoutPlotNumber: `Plot #${i}`,
      title: `AP Rajan Garden - Group 1 Plot #${i} (${facing})`,
      project: 'AP Rajan Garden',
      location: 'Tharuvaikulam, Thoothukudi',
      address: 'Near Thoothukudi–Rameswaram ECR Main Road, Tharuvaikulam, Thoothukudi 628105',
      price,
      priceDisplay,
      pricePerSqFt,
      pricePerCent: basePricePerCent,
      areaSqFt: sqft,
      areaCents: cents,
      dimensions,
      length: isCorner ? 50 : (i % 7 === 0 ? 50 : 40),
      width: isCorner ? 36 : (i % 11 === 0 ? 25 : 30),
      frontage: isCorner ? 36 : 30,
      facing,
      roadWidth,
      isCornerPlot: isCorner,
      approval: 'DTCP Approved & CRZ Cleared',
      approvalNumber: 'DTCP No. 112/2024',
      pattaStatus: 'Clear Title & Immediate Patta Ready',
      status,
      isFeatured: i === 2 || i === 3 || i === 5 || isCorner,
      description: `Prime residential villa plot #${i} in AP Rajan Garden Group 1 layout at Tharuvaikulam, Thoothukudi. Situated 350 meters from the serene coastline, connected by a ${roadWidth}. DTCP approved and CRZ cleared with sweet groundwater supply. Turnkey house construction available.`,
      amenities: [
        'Walking Distance to Beach (350m)',
        roadWidth,
        'Gated Community with 24-Hour Security',
        'Water Line Along Layout Roads',
        'Sweet Groundwater',
        'Close to ECR Main Road (24-Hour Bus Service)',
        'Up to 90% Bank Loan Financing Support',
        'Near 53-Acre Tourism Development Area'
      ],
      landmarks: [
        { name: 'Tharuvaikulam Beach', distance: '350 m (Walking Distance)' },
        { name: 'Thoothukudi–Rameswaram ECR Road', distance: '0.5 km (2 mins)' },
        { name: '53-Acre Tourism Development Area', distance: '1.2 km (3 mins)' },
        { name: 'St. Michael Church', distance: '0.8 km (2 mins)' },
        { name: 'Thoothukudi New Bus Stand', distance: '11.5 km (15 mins)' },
        { name: 'VOC Port Thoothukudi', distance: '16.0 km (22 mins)' }
      ],
      images: [
        '/images/product.png',
        '/images/ap-rajan-garden-layout.jpg',
        '/images/plot-house-construction.jpg',
        '/images/completed-model-villa.jpg'
      ],
      layoutCoordinates: {
        x: ((i - 1) % 15) * 60 + 40,
        y: Math.floor((i - 1) / 15) * 50 + 50,
        width: 55,
        height: 45
      },
      coordinates: {
        lat: 8.8954 + (i * 0.00005),
        lng: 78.1632 + (i * 0.00004)
      },
      isVerified,
      verificationNotes: notes,
      registrationCharges: Math.round(price * 0.07),
      sellerName: 'Sri Balaji Promoters',
      sellerPhone: '+91 94431 52633',
      sellerEmail: 'promoters@plotfortuty.com',
      reraNumber: 'TNRERA/LAYOUT/TUTY/2024/089',
      createdAt: '2026-10-25'
    });
  }

  // Group 2: 36 Plots
  for (let j = 1; j <= 36; j++) {
    const isCorner = j === 1 || j === 18 || j === 19 || j === 36;
    const roadWidth = '33 ft Blacktop Tar Road';
    
    let cents = 2.75;
    let dimensions = '30 ft x 40 ft';
    let sqft = 1200;
    let isVerified = true;
    let notes = '';

    if (isCorner) {
      cents = 3.80;
      sqft = 1655;
      dimensions = '33 ft x 50 ft';
    } else if (j % 5 === 0) {
      cents = 3.44;
      sqft = 1500;
      dimensions = '30 ft x 50 ft';
    } else if (j > 30) {
      cents = 2.75;
      sqft = 1200;
      dimensions = 'Pending Survey Verification';
      isVerified = false;
      notes = 'Scheduled entry flagged for site survey.';
    }

    const facings = ['North', 'East', 'South', 'West'];
    const facing = isCorner ? 'East-Facing Corner' : facings[j % 4];

    let status: Plot['status'] = 'Available';
    if (j === 3 || j === 14) status = 'Sold';
    else if (j === 8) status = 'Reserved';
    else if (j === 21) status = 'Booked';

    const price = Math.round(cents * basePricePerCent * (isCorner ? 1.05 : 1));
    const priceDisplay = `₹${(price / 100000).toFixed(2)} Lakhs`;
    const pricePerSqFt = Math.round(price / sqft);

    const padNum = String(j).padStart(3, '0');
    const slug = `ap-rajan-garden-g2-plot-${padNum}`;

    plots.push({
      id: `plot-ap-g2-${j}`,
      slug,
      projectId,
      tenantId,
      developerName: 'Sri Balaji Promoters',
      layoutGroup: 'Group 2',
      plotNumber: String(j),
      layoutPlotNumber: `Plot #${j}`,
      title: `AP Rajan Garden - Group 2 Plot #${j} (${facing})`,
      project: 'AP Rajan Garden',
      location: 'Tharuvaikulam, Thoothukudi',
      address: 'Near Thoothukudi–Rameswaram ECR Main Road, Tharuvaikulam, Thoothukudi 628105',
      price,
      priceDisplay,
      pricePerSqFt,
      pricePerCent: basePricePerCent,
      areaSqFt: sqft,
      areaCents: cents,
      dimensions,
      length: isCorner ? 50 : 40,
      width: isCorner ? 33 : 30,
      frontage: 30,
      facing,
      roadWidth,
      isCornerPlot: isCorner,
      approval: 'DTCP Approved & CRZ Cleared',
      approvalNumber: 'DTCP No. 112/2024',
      pattaStatus: 'Clear Title & Immediate Patta Ready',
      status,
      isFeatured: j === 2 || isCorner,
      description: `Scenic residential plot #${j} in AP Rajan Garden Group 2 layout at Tharuvaikulam. Premium beachside sanctuary with clean groundwater, 33ft wide blacktop roads, street lighting, and direct highway proximity. Custom turnkey villa construction packages available.`,
      amenities: [
        'Walking Distance to Beach (350m)',
        '33 ft Blacktop Tar Road',
        'Gated Community with 24-Hour Security',
        'Water Line Along Layout Roads',
        'Individual Water Tank Support',
        'Up to 90% Loan Support'
      ],
      landmarks: [
        { name: 'Tharuvaikulam Beach', distance: '350 m (Walking Distance)' },
        { name: 'ECR Main Road', distance: '0.5 km (2 mins)' },
        { name: '53-Acre Tourism Development Area', distance: '1.2 km (3 mins)' }
      ],
      images: [
        '/images/product.png',
        '/images/ap-rajan-garden-layout.jpg',
        '/images/plot-house-construction.jpg',
        '/images/completed-model-villa.jpg'
      ],
      layoutCoordinates: {
        x: ((j - 1) % 6) * 70 + 60,
        y: Math.floor((j - 1) / 6) * 55 + 600,
        width: 60,
        height: 50
      },
      coordinates: {
        lat: 8.8960 + (j * 0.00004),
        lng: 78.1640 + (j * 0.00003)
      },
      isVerified,
      verificationNotes: notes,
      registrationCharges: Math.round(price * 0.07),
      sellerName: 'Sri Balaji Promoters',
      sellerPhone: '+91 94431 52633',
      sellerEmail: 'promoters@plotfortuty.com',
      reraNumber: 'TNRERA/LAYOUT/TUTY/2024/089',
      createdAt: '2026-10-25'
    });
  }

  return plots;
}

export const AP_RAJAN_GARDEN_PROJECT: Project = {
  id: 'proj-ap-rajan-garden',
  slug: 'ap-rajan-garden',
  name: 'AP Rajan Garden',
  tenantId: 'tenant-sri-balaji-promoters',
  developerName: 'Sri Balaji Promoters',
  tagline: 'DTCP Approved Beachside Plots & Turnkey House Construction in Tharuvaikulam',
  district: 'Thoothukudi',
  location: 'Tharuvaikulam, Thoothukudi',
  address: 'Near Thoothukudi–Rameswaram ECR Main Road, Tharuvaikulam, Thoothukudi 628105',
  propertyType: 'Residential Plots & Turnkey Villas',
  totalPlots: 181,
  availablePlots: 153,
  soldPlots: 18,
  reservedPlots: 10,
  scheduledPlotsCount: 181,
  group1PlotsCount: 145,
  group2PlotsCount: 36,
  priceRange: '₹12.12 L - ₹23.80 L',
  plotSizes: '2.30 to 4.50 Cents (1,000 - 2,000 Sq Ft)',
  approval: 'DTCP Approved & CRZ Cleared',
  approvalNumber: 'DTCP No. 112/2024',
  reraNumber: 'TNRERA/LAYOUT/TUTY/2024/089',
  description:
    'AP Rajan Garden is a premier 181-plot master-planned coastal residential community located at Tharuvaikulam in Thoothukudi District, Tamil Nadu. Divided into Group 1 (145 plots) and Group 2 (36 plots), the layout is DTCP Approved & CRZ Cleared, featuring 33ft & 40ft blacktop tar roads, sweet drinking groundwater, 24/7 security, individual plot water tank construction, and turnkey house construction packages (Basic, Premium, and Luxury) with up to 90% bank loan approval assistance.',
  image: '/images/ap-rajan-garden-layout.jpg',
  layoutImageUrl: '/images/ap-rajan-garden-layout.jpg',
  gallery: [
    '/images/product.png',
    '/images/ap-rajan-garden-layout.jpg',
    '/images/plot-house-construction.jpg',
    '/images/completed-model-villa.jpg',
    '/images/real_estate.png'
  ],
  amenities: [
    'Walking Distance to Beach (350m)',
    '33 ft & 40 ft Blacktop Tar Roads',
    'DTCP Approved & CRZ Cleared',
    'Sweet Groundwater Supply Line',
    'Gated Community with 24-Hour Security',
    'Plot + Turnkey House Construction Support',
    'Individual Plot Water Tank Construction',
    'Close to ECR Road (24-Hour Bus Service)',
    'Up to 90% Loan Financing Support',
    'Adjacent to 53-Acre Tourism Development Area',
    'Clear Title & Immediate Patta Ready',
    'Street Lighting on All Layout Roads'
  ],
  landmarks: [
    { name: 'Tharuvaikulam Beach', distance: '350 m (Walking Distance)' },
    { name: 'Thoothukudi–Rameswaram ECR Road', distance: '0.5 km (2 mins)' },
    { name: '53-Acre Tourism Development Area', distance: '1.2 km (3 mins)' },
    { name: 'St. Michael Church', distance: '0.8 km (2 mins)' },
    { name: 'Fisheries College & Research Institute', distance: '8.0 km (10 mins)' },
    { name: 'Thoothukudi New Bus Stand', distance: '11.5 km (15 mins)' },
    { name: 'Thoothukudi Old Bus Stand & Market', distance: '13.0 km (18 mins)' },
    { name: 'Thoothukudi Railway Junction', distance: '14.5 km (20 mins)' },
    { name: 'V.O. Chidambaranar Port Trust', distance: '16.0 km (22 mins)' },
    { name: 'Thoothukudi Airport (Vagaikulam)', distance: '24.0 km (30 mins)' }
  ],
  highlights: [
    '181 Scheduled Entries: Group 1 (145 Plots) & Group 2 (36 Plots)',
    '350m stroll to pristine Tharuvaikulam beach',
    '100% DTCP Approved & CRZ Cleared',
    'Turnkey Villa Construction starting ₹1,950 / sq.ft.',
    'Up to 90% Bank Loan Financing from SBI, HDFC, Canara Bank, Indian Bank'
  ],
  houseConstructionAvailable: true,
  constructionPackages: AP_RAJAN_GARDEN_CONSTRUCTION_PACKAGES,
  loanFinancingOffer: 'Up to 90% Pre-Approved Bank Loan Financing Assistance',
  beachDistance: '350 meters (3-minute walking stroll)',
  status: 'published',
  isFeatured: true,
  layoutPlots: [], // Populated dynamically or mapped from the 181 entries
  createdAt: '2026-10-20'
};
