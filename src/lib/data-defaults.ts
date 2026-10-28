import { Plot, Project, Enquiry } from './types';

export const INITIAL_PLOTS: Plot[] = [
  {
    id: 'plot-1',
    slug: 'pearl-haven-corner-villa-plot-korampallam',
    title: 'Pearl Haven - Premium Corner Villa Plot',
    project: 'Pearl Haven Layout',
    location: 'Korampallam',
    address: 'Near District Collectorate Complex, Korampallam, Thoothukudi, Tamil Nadu 628101',
    price: 3200000,
    priceDisplay: '₹32.00 Lakhs',
    pricePerSqFt: 1777,
    pricePerCent: 775000,
    areaSqFt: 1800,
    areaCents: 4.13,
    dimensions: '40 ft x 45 ft',
    facing: 'North-East',
    roadWidth: '40 ft Wide Blacktop Tar Road',
    approval: 'DTCP & RERA Approved',
    approvalNumber: 'DTCP No. 128/2023 | TNRERA/P/1094/2023',
    pattaStatus: 'Individual Clear Patta Ready',
    status: 'Available',
    isFeatured: true,
    description: 'An exclusive corner residential plot in the prestigious Pearl Haven gated community, just 3 minutes from the Thoothukudi District Collectorate. Features direct 40ft blacktop road access, sweet drinking groundwater at 35 feet, underground stormwater drainage, and avenue palm trees.',
    amenities: [
      '40 ft Blacktop Tar Road',
      'Underground Stormwater Drainage',
      'Sweet Groundwater (35 ft)',
      'Solar Street Lighting',
      '24/7 Gated Community Security',
      'Individual Water Connection Point',
      'Avenue Tree Plantation',
      'Children Play Area Reserve'
    ],
    landmarks: [
      { name: 'Thoothukudi District Collectorate', distance: '1.2 km (3 mins)' },
      { name: 'Spic Nagar Hospital & Clinic', distance: '3.5 km (8 mins)' },
      { name: 'Tuticorin New Bus Stand', distance: '4.8 km (10 mins)' },
      { name: 'St. Thomas Matriculation Hr. Sec. School', distance: '1.5 km (4 mins)' },
      { name: 'Tuticorin VOC Port Trust', distance: '12 km (18 mins)' }
    ],
    images: [
      '/images/product_land1.png',
      '/images/product.png',
      '/images/real_estate.png'
    ],
    layoutPlotNumber: 'Plot #18',
    coordinates: { lat: 8.7642, lng: 78.1348 },
    createdAt: '2026-03-01'
  },
  {
    id: 'plot-2',
    slug: 'palayam-greenfield-residential-plot-nh138',
    title: 'Palayam Greens - Four-Lane Connected Residential Plot',
    project: 'Palayam Greens Executive Layout',
    location: 'Palayamkottai Road',
    address: 'Opposite Government Polytechnic, Palayamkottai Road (NH 138), Thoothukudi 628008',
    price: 2450000,
    priceDisplay: '₹24.50 Lakhs',
    pricePerSqFt: 1633,
    pricePerCent: 712000,
    areaSqFt: 1500,
    areaCents: 3.44,
    dimensions: '30 ft x 50 ft',
    facing: 'North',
    roadWidth: '33 ft Blacktop Road',
    approval: 'DTCP Approved',
    approvalNumber: 'DTCP Reg No. 84/2024',
    pattaStatus: '100% Verified Clean Mother Deed & Patta',
    status: 'Fast Selling',
    isFeatured: true,
    description: 'Strategically located directly off Palayamkottai 4-lane highway, this rectangular north-facing residential parcel is ideal for immediate villa construction or high-yield land appreciation. Surrounded by established elite residences and top educational institutes.',
    amenities: [
      '33 ft Metal Tar Road',
      'TNEB Power Line Ready',
      'Borewell Sweet Water Tested',
      'Security Cabin at Entrance',
      'Demarcated Stone Pillars with Fencing',
      'Street Name Boards & Signages'
    ],
    landmarks: [
      { name: 'Government Polytechnic College', distance: '0.8 km (2 mins)' },
      { name: 'Tuticorin Old Railway Station', distance: '5.2 km (12 mins)' },
      { name: 'APCM Mahalaxmi College', distance: '2.1 km (5 mins)' },
      { name: 'Tuticorin Airport (Vagaikulam)', distance: '14 km (18 mins)' }
    ],
    images: [
      '/images/product_land2.png',
      '/images/product_land6.png',
      '/images/product.png'
    ],
    layoutPlotNumber: 'Plot #07',
    coordinates: { lat: 8.7885, lng: 78.1124 },
    createdAt: '2026-03-05'
  },
  {
    id: 'plot-3',
    slug: 'harbour-view-enclave-east-facing-muthiapuram',
    title: 'Harbour Enclave - East Facing Coastal City Plot',
    project: 'Harbour Enclave Phase 1',
    location: 'Harbour Bypass Road',
    address: 'Near VO Chidambaranar Port Junction, Muthiapuram, Thoothukudi 628005',
    price: 1980000,
    priceDisplay: '₹19.80 Lakhs',
    pricePerSqFt: 1650,
    pricePerCent: 718000,
    areaSqFt: 1200,
    areaCents: 2.75,
    dimensions: '30 ft x 40 ft',
    facing: 'East',
    roadWidth: '30 ft Gated Road',
    approval: 'DTCP & RERA Approved',
    approvalNumber: 'TNRERA/LAYOUT/340/2023',
    pattaStatus: 'Instant Sub-Division Patta Transfer',
    status: 'Available',
    isFeatured: true,
    description: 'An affordable, high-demand east-facing compact plot inside a fully gated community near the booming Harbour Bypass corridor. Designed with modern infrastructure, LED street lamps, and lush avenue greens. Exceptional rental potential for port executives.',
    amenities: [
      'Gated Entrance Arch with Guard Room',
      '30 ft Concrete Paver & Tar Roads',
      'Individual Underground Water Connections',
      'Street Tree Plantation',
      'High Compound Wall Surrounding Layout',
      'CCTV Surveillance Provision'
    ],
    landmarks: [
      { name: 'VOC Port Administrative Building', distance: '4.5 km (8 mins)' },
      { name: 'Thermal Power Plant Hospital', distance: '3.0 km (6 mins)' },
      { name: 'Campbel International School', distance: '2.5 km (5 mins)' },
      { name: 'Harbour Express Toll Plaza', distance: '2.8 km (5 mins)' }
    ],
    images: [
      '/images/product_land3.png',
      '/images/product_land5.png',
      '/images/product.png'
    ],
    layoutPlotNumber: 'Plot #24',
    coordinates: { lat: 8.7421, lng: 78.1492 },
    createdAt: '2026-03-08'
  },
  {
    id: 'plot-4',
    slug: 'millerpuram-central-luxury-plot',
    title: 'Millerpuram Prime - Central City Executive Plot',
    project: 'Millerpuram Royal Enclave',
    location: 'Millerpuram',
    address: 'Near Holy Cross Matriculation School, Millerpuram, Thoothukudi 628002',
    price: 4800000,
    priceDisplay: '₹48.00 Lakhs',
    pricePerSqFt: 2000,
    pricePerCent: 871200,
    areaSqFt: 2400,
    areaCents: 5.51,
    dimensions: '40 ft x 60 ft',
    facing: 'North',
    roadWidth: '40 ft Corporation Tar Road',
    approval: 'DTCP & RERA Approved',
    approvalNumber: 'DTCP No. 39/2022',
    pattaStatus: 'Clear Urban Corporation Patta',
    status: 'Reserved',
    isFeatured: true,
    description: 'Rare opportunity to acquire a full 1 Ground (5.51 Cents) luxury residential plot in the heart of Millerpuram. Prime urban neighborhood with immediate corporation water supply, underground sewage, high-voltage electricity, and walking distance to top hospitals.',
    amenities: [
      '40 ft Corporation Tar Road',
      'Thoothukudi Corporation Water Supply',
      'Underground Drainage (UGD) Connected',
      'High-Speed Fiber Optic Internet Lines',
      'Street LED Lighting',
      'Clear Boundary Wall Demarcation'
    ],
    landmarks: [
      { name: 'Holy Cross Matric School', distance: '0.4 km (1 min)' },
      { name: 'Sundaram Arulraj Hospital', distance: '0.9 km (2 mins)' },
      { name: 'Millerpuram Shopping Hub', distance: '0.6 km (2 mins)' },
      { name: 'Tuticorin Main Bus Stand', distance: '3.1 km (7 mins)' }
    ],
    images: [
      '/images/product_land4.png',
      '/images/product_land1.png',
      '/images/product.png'
    ],
    layoutPlotNumber: 'Plot #03',
    coordinates: { lat: 8.8021, lng: 78.1365 },
    createdAt: '2026-03-10'
  },
  {
    id: 'plot-5',
    slug: 'spic-nagar-green-meadows-affordable-plot',
    title: 'Green Meadows - Peaceful Residential Plot',
    project: 'Green Meadows Layout',
    location: 'Muthiapuram',
    address: 'Near Muthiapuram Main Road, Spic Nagar, Thoothukudi 628005',
    price: 1580000,
    priceDisplay: '₹15.80 Lakhs',
    pricePerSqFt: 1316,
    pricePerCent: 574000,
    areaSqFt: 1200,
    areaCents: 2.75,
    dimensions: '30 ft x 40 ft',
    facing: 'South',
    roadWidth: '30 ft Tar Road',
    approval: 'DTCP Approved',
    approvalNumber: 'DTCP Approval No. 91/2023',
    pattaStatus: 'Clear Legal Opinion & Patta',
    status: 'Available',
    isFeatured: false,
    description: 'Value-packed plot situated in a serene green landscape behind Spic Nagar. Ideal for families wanting a calm peaceful living environment with easy commute to VOC Port, industrial centers, and schools.',
    amenities: [
      '30 ft Wide Layout Road',
      'Clean Potable Water Source',
      'Clear Stone Boundary Markers',
      'Electricity Line Available',
      'Ready for Construction'
    ],
    landmarks: [
      { name: 'Spic Higher Secondary School', distance: '1.2 km (3 mins)' },
      { name: 'Muthiapuram Railway Station', distance: '2.0 km (5 mins)' },
      { name: 'Port Ring Expressway', distance: '3.5 km (6 mins)' }
    ],
    images: [
      '/images/product_land5.png',
      '/images/product_land3.png',
      '/images/product.png'
    ],
    layoutPlotNumber: 'Plot #11',
    coordinates: { lat: 8.7368, lng: 78.1388 },
    createdAt: '2026-03-12'
  },
  {
    id: 'plot-6',
    slug: 'ettayapuram-avenue-high-growth-plot',
    title: 'Ettayapuram Gateway - High Growth Investment Land',
    project: 'Ettayapuram Smart Avenue',
    location: 'Ettayapuram Road',
    address: 'Near New SIPCOT Industrial Zone, Ettayapuram Road, Thoothukudi 628002',
    price: 1420000,
    priceDisplay: '₹14.20 Lakhs',
    pricePerSqFt: 1183,
    pricePerCent: 516000,
    areaSqFt: 1200,
    areaCents: 2.75,
    dimensions: '30 ft x 40 ft',
    facing: 'East',
    roadWidth: '33 ft Blacktop Road',
    approval: 'DTCP Approved',
    approvalNumber: 'DTCP No. 177/2023',
    pattaStatus: 'Verified Mother Deed & Patta',
    status: 'Available',
    isFeatured: false,
    description: 'High-growth corridor plot located close to the upcoming manufacturing clusters and New SIPCOT. Excellent early investment with confirmed capital appreciation trajectory over the next 2-3 years.',
    amenities: [
      '33 ft Blacktop Road',
      'Street Lighting System',
      'Water Drainage Channels',
      'Gated Layout Boundary',
      'Ready Electric Transformer'
    ],
    landmarks: [
      { name: 'New SIPCOT Phase 2', distance: '2.8 km (5 mins)' },
      { name: 'VOC College', distance: '4.2 km (8 mins)' },
      { name: 'Tuticorin Old Bus Stand', distance: '6.0 km (12 mins)' }
    ],
    images: [
      '/images/product_land6.png',
      '/images/product_land2.png',
      '/images/product.png'
    ],
    layoutPlotNumber: 'Plot #32',
    coordinates: { lat: 8.8251, lng: 78.1215 },
    createdAt: '2026-03-14'
  },
  {
    id: 'plot-7',
    slug: 'ap-rajan-garden-beachside-villa-plot-tharuvaikulam',
    title: 'AP Rajan Garden - Beachside Villa Plot + Construction',
    project: 'AP Rajan Garden',
    location: 'Tharuvaikulam',
    address: 'Near Thoothukudi–Rameswaram ECR Main Road, Tharuvaikulam, Thoothukudi 628105',
    price: 1450000,
    priceDisplay: '₹14.50 Lakhs',
    pricePerSqFt: 1208,
    pricePerCent: 527272,
    areaSqFt: 1200,
    areaCents: 2.75,
    dimensions: '30 ft x 40 ft',
    facing: 'East',
    roadWidth: '33 ft Blacktop Tar Road',
    approval: 'DTCP Approved',
    approvalNumber: 'DTCP No. 112/2024',
    pattaStatus: 'Clear Title & Immediate Patta Ready',
    status: 'Available',
    isFeatured: true,
    description: 'Just a few minutes’ walk to the beach in Tharuvaikulam! Your dream plot + dream home in one place. Buy the plot with optional turnkey house construction support (custom plans, basic, premium, and luxury options). Gated community with 24-hr security, garden maintenance, road water lines, individual water tank construction, close to ECR Main Road with 24-hr bus service, and up to 90% loan financing assistance.',
    amenities: [
      'Walking Distance to Beach',
      'Gated Community with 24-Hour Security',
      'Plot + Turnkey House Construction Support',
      'Water Line Along Layout Roads',
      'Individual Plot Water Tank Construction',
      'Close to ECR Road (24-Hour Bus Service)',
      'Up to 90% Loan Financing Support',
      'Near 53-Acre Tourism Development Area'
    ],
    landmarks: [
      { name: 'Tharuvaikulam Beach', distance: '350 m (Walking Distance)' },
      { name: 'Thoothukudi–Rameswaram ECR Road', distance: '0.5 km (2 mins)' },
      { name: '53-Acre Tourism Development Area', distance: '1.2 km (3 mins)' },
      { name: 'St. Michael Church', distance: '0.8 km (2 mins)' },
      { name: 'Thoothukudi New Bus Stand', distance: '11.5 km (15 mins)' }
    ],
    images: [
      '/images/ap-rajan-garden-layout.jpg',
      '/images/plot-house-construction.jpg',
      '/images/completed-model-villa.jpg'
    ],
    layoutPlotNumber: 'Plot #02',
    coordinates: { lat: 8.8954, lng: 78.1632 },
    createdAt: '2026-10-26'
  }
];

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'project-1',
    slug: 'pearl-haven-layout',
    name: 'Pearl Haven Layout',
    tagline: 'Signature Gated Villa Plots Near Thoothukudi Collectorate',
    location: 'Korampallam, Thoothukudi',
    address: 'Opp. Collectorate Administrative Enclave, Korampallam, Thoothukudi 628101',
    totalPlots: 48,
    availablePlots: 14,
    soldPlots: 34,
    priceRange: '₹22.5 L – ₹45.0 L',
    plotSizes: '1200 to 2400 sq.ft (2.75 to 5.5 Cents)',
    approval: 'DTCP & TNRERA Approved',
    approvalNumber: 'DTCP No. 128/2023 | TNRERA/P/1094/2023',
    description: 'Pearl Haven represents the pinnacle of residential plotted development in Thoothukudi. Situated in high-demand Korampallam, this master-planned community combines manicured 40ft blacktop avenues, underground stormwater drains, continuous sweet drinking water, and dedicated green reserves.',
    image: '/images/product_land1.png',
    gallery: [
      '/images/product_land1.png',
      '/images/product.png',
      '/images/real_estate.png'
    ],
    amenities: [
      '40 ft & 33 ft Blacktop Tar Roads',
      'Underground Storm Drainage Network',
      'Individual Sweet Water Connections',
      'Solar Street Lighting Grid',
      '24/7 Gated Security with CCTV',
      'Perimeter Security Compound Wall',
      'Avenue Palms & Landscaped Parks',
      'Immediate Bank Loan Approval (SBI, HDFC, Canara)'
    ],
    landmarks: [
      { name: 'District Collectorate Complex', distance: '1.2 km' },
      { name: 'Tuticorin New Bus Stand', distance: '4.8 km' },
      { name: 'St. Thomas School', distance: '1.5 km' },
      { name: 'VOC Port Terminal', distance: '12 km' }
    ],
    layoutPlots: [
      { number: 1, size: '2400 sq.ft', cents: 5.51, facing: 'North', status: 'Sold', price: '₹42.0 L' },
      { number: 2, size: '1800 sq.ft', cents: 4.13, facing: 'North', status: 'Sold', price: '₹31.5 L' },
      { number: 3, size: '1800 sq.ft', cents: 4.13, facing: 'North', status: 'Reserved', price: '₹31.5 L' },
      { number: 4, size: '1500 sq.ft', cents: 3.44, facing: 'East', status: 'Available', price: '₹26.2 L' },
      { number: 5, size: '1500 sq.ft', cents: 3.44, facing: 'East', status: 'Available', price: '₹26.2 L' },
      { number: 6, size: '1200 sq.ft', cents: 2.75, facing: 'East', status: 'Sold', price: '₹21.0 L' },
      { number: 7, size: '1200 sq.ft', cents: 2.75, facing: 'East', status: 'Available', price: '₹21.0 L' },
      { number: 8, size: '1500 sq.ft', cents: 3.44, facing: 'North', status: 'Sold', price: '₹26.2 L' },
      { number: 9, size: '1800 sq.ft', cents: 4.13, facing: 'North', status: 'Sold', price: '₹31.5 L' },
      { number: 10, size: '2400 sq.ft', cents: 5.51, facing: 'North-East', status: 'Available', price: '₹43.5 L' },
      { number: 11, size: '1500 sq.ft', cents: 3.44, facing: 'South', status: 'Sold', price: '₹25.8 L' },
      { number: 12, size: '1200 sq.ft', cents: 2.75, facing: 'South', status: 'Available', price: '₹20.8 L' },
      { number: 13, size: '1500 sq.ft', cents: 3.44, facing: 'South', status: 'Available', price: '₹25.8 L' },
      { number: 14, size: '1800 sq.ft', cents: 4.13, facing: 'South', status: 'Sold', price: '₹31.0 L' },
      { number: 15, size: '1500 sq.ft', cents: 3.44, facing: 'East', status: 'Reserved', price: '₹26.2 L' },
      { number: 16, size: '1200 sq.ft', cents: 2.75, facing: 'East', status: 'Sold', price: '₹21.0 L' },
      { number: 17, size: '1500 sq.ft', cents: 3.44, facing: 'North', status: 'Sold', price: '₹26.2 L' },
      { number: 18, size: '1800 sq.ft', cents: 4.13, facing: 'North-East', status: 'Available', price: '₹32.0 L' }
    ]
  },
  {
    id: 'project-2',
    slug: 'palayam-greens-executive-layout',
    name: 'Palayam Greens Executive Layout',
    tagline: 'High-Appreciation Plotted Enclave on 4-Lane Highway',
    location: 'Palayamkottai Road, Thoothukudi',
    address: 'Opposite Government Polytechnic, NH 138, Thoothukudi 628008',
    totalPlots: 36,
    availablePlots: 9,
    soldPlots: 27,
    priceRange: '₹19.5 L – ₹38.0 L',
    plotSizes: '1200 to 2200 sq.ft (2.75 to 5.0 Cents)',
    approval: 'DTCP Approved',
    approvalNumber: 'DTCP Reg No. 84/2024',
    description: 'Located directly along the bustling Palayamkottai 4-lane arterial road, Palayam Greens connects you to city conveniences while offering tranquil residential living. Clean documentation, high sweet water table, and ready for immediate construction.',
    image: '/images/product_land2.png',
    gallery: [
      '/images/product_land2.png',
      '/images/product_land6.png',
      '/images/product.png'
    ],
    amenities: [
      'Direct NH-138 Highway Access',
      '33 ft Blacktop Tar Roads',
      'Electricity Substation Adjacent',
      'Pure Ground Sweet Water',
      'Clear Stone Demarcations',
      'Security Post & Street Lights'
    ],
    landmarks: [
      { name: 'Govt Polytechnic', distance: '0.8 km' },
      { name: 'APCM College', distance: '2.1 km' },
      { name: 'Tuticorin Old Railway Station', distance: '5.2 km' },
      { name: 'Vagaikulam Airport', distance: '14 km' }
    ],
    layoutPlots: [
      { number: 1, size: '2000 sq.ft', cents: 4.59, facing: 'North', status: 'Sold', price: '₹34.0 L' },
      { number: 2, size: '1500 sq.ft', cents: 3.44, facing: 'North', status: 'Sold', price: '₹25.0 L' },
      { number: 3, size: '1500 sq.ft', cents: 3.44, facing: 'North', status: 'Available', price: '₹25.0 L' },
      { number: 4, size: '1200 sq.ft', cents: 2.75, facing: 'East', status: 'Sold', price: '₹20.0 L' },
      { number: 5, size: '1200 sq.ft', cents: 2.75, facing: 'East', status: 'Available', price: '₹20.0 L' },
      { number: 6, size: '1500 sq.ft', cents: 3.44, facing: 'North', status: 'Sold', price: '₹24.5 L' },
      { number: 7, size: '1500 sq.ft', cents: 3.44, facing: 'North', status: 'Available', price: '₹24.5 L' },
      { number: 8, size: '1800 sq.ft', cents: 4.13, facing: 'South', status: 'Sold', price: '₹29.0 L' }
    ]
  },
  {
    id: 'project-3',
    slug: 'harbour-enclave-gated-community',
    name: 'Harbour Enclave Gated Community',
    tagline: 'Port Corridor Coastal Residential Plotted Community',
    location: 'Harbour Bypass Road, Thoothukudi',
    address: 'Muthiapuram Port Link Road, Thoothukudi 628005',
    totalPlots: 40,
    availablePlots: 18,
    soldPlots: 22,
    priceRange: '₹18.0 L – ₹32.0 L',
    plotSizes: '1200 to 2000 sq.ft (2.75 to 4.59 Cents)',
    approval: 'DTCP & TNRERA Approved',
    approvalNumber: 'TNRERA/LAYOUT/340/2023',
    description: 'A planned gated community offering high rental demand from port, maritime, and thermal energy executives. High perimeter walls, 30ft paved blacktop roads, sweet potable water line connections, and CCTV provisions.',
    image: '/images/product_land3.png',
    gallery: [
      '/images/product_land3.png',
      '/images/product_land5.png',
      '/images/product.png'
    ],
    amenities: [
      'Gated Grand Entrance Archway',
      '30 ft Blacktop Internal Roads',
      'CCTV Camera Surveillance',
      'Children Play Garden',
      'Individual Water Connection Taps',
      'LED Solar Street Lighting'
    ],
    landmarks: [
      { name: 'VOC Port Terminal', distance: '4.5 km' },
      { name: 'Muthiapuram Station', distance: '2.5 km' },
      { name: 'Thermal Power Plant Hospital', distance: '3.0 km' },
      { name: 'Harbour Express Toll', distance: '2.8 km' }
    ],
    layoutPlots: [
      { number: 1, size: '1200 sq.ft', cents: 2.75, facing: 'East', status: 'Sold', price: '₹19.8 L' },
      { number: 2, size: '1200 sq.ft', cents: 2.75, facing: 'East', status: 'Available', price: '₹19.8 L' },
      { number: 3, size: '1500 sq.ft', cents: 3.44, facing: 'North', status: 'Available', price: '₹24.7 L' },
      { number: 4, size: '1800 sq.ft', cents: 4.13, facing: 'North-East', status: 'Available', price: '₹29.7 L' },
      { number: 5, size: '1200 sq.ft', cents: 2.75, facing: 'South', status: 'Sold', price: '₹19.0 L' }
    ]
  },
  {
    id: 'project-4',
    slug: 'ap-rajan-garden-tharuvaikulam',
    name: 'AP Rajan Garden',
    tagline: 'Premium Plots & House Construction — Walking Distance to Beach',
    location: 'Tharuvaikulam, Thoothukudi',
    address: 'Near Thoothukudi–Rameswaram ECR Main Road, Tharuvaikulam, Thoothukudi 628105',
    totalPlots: 56,
    availablePlots: 22,
    soldPlots: 34,
    priceRange: '₹9.8 L – ₹28.5 L',
    plotSizes: '800 to 2400 sq.ft (1.83 to 5.51 Cents)',
    approval: 'DTCP Approved & Coastal Norms Cleared',
    approvalNumber: 'DTCP No. 112/2024 | Coastal CRZ Cleared',
    description: 'AP Rajan Garden offers an exclusive coastal living opportunity in Tharuvaikulam, Thoothukudi, just a few minutes’ walk to the beach. Your dream plot + your dream home – all in one place! Enjoy a complete turnkey plot purchase and house construction facility with customized floor plans (Basic, Premium & Luxury home options) from planning to completion. Strategically located close to the Thoothukudi–Rameswaram Main Road (ECR) with 24-hour bus connectivity, close to resorts, restaurants, churches, temples, and the reported 53-acre tourism development area. Secure gated community with 24-hour security, garden maintenance, water lines along all layout roads, individual plot water tank construction, and up to 90% composite loan financing support.',
    image: '/images/ap-rajan-garden-layout.jpg',
    gallery: [
      '/images/ap-rajan-garden-layout.jpg',
      '/images/plot-house-construction.jpg',
      '/images/completed-model-villa.jpg',
      '/images/real_estate.png'
    ],
    highlights: [
      'Walking Distance to the Beach',
      'Plot + Turnkey House Construction Facility',
      'Up to 90% Loan Financing Support',
      'Thoothukudi–Rameswaram ECR Belt'
    ],
    houseConstructionAvailable: true,
    loanFinancingOffer: 'Up to 90% Loan Financing Available for Plot + House Construction (Subject to Bank Eligibility)',
    beachDistance: "Few Minutes' Walk to the Beach",
    amenities: [
      'Walking Distance to the Beach',
      'Gated Community with Grand Entrance',
      '24-Hour Security Service',
      'Garden Maintenance & Tree Plantation',
      'Water Line Available Along Layout Roads',
      'Individual Plot Water Tank Construction',
      'Close to Thoothukudi–Rameswaram Main Road (ECR)',
      '24-Hour Frequent Bus Service in Area',
      'Plot + House Construction Facility (Basic, Premium & Luxury)',
      'Customized House Planning to Completion Support',
      'Up to 90% Bank Loan Financing Guidance',
      'Near Reported 53-Acre Tourism Development Area'
    ],
    landmarks: [
      { name: 'Tharuvaikulam Beach Shoreline', distance: '350 m (Walking Distance)' },
      { name: 'Thoothukudi–Rameswaram Main Road (ECR)', distance: '0.5 km (2 mins)' },
      { name: 'Reported 53-Acre Tourism Development Area', distance: '1.2 km (3 mins)' },
      { name: 'St. Michael Church & Ancient Temples', distance: '0.8 km (2 mins)' },
      { name: 'Nearby Coastal Resorts & Restaurants', distance: '0.6 km (2 mins)' },
      { name: 'Thoothukudi New Bus Stand & City Center', distance: '11.5 km (15 mins)' },
      { name: 'VOC Port Terminal & Industrial Corridor', distance: '16 km (20 mins)' }
    ],
    layoutPlots: [
      { number: 1, size: '1200 sq.ft', cents: 2.75, facing: 'East', status: 'Sold', price: '₹14.5 L' },
      { number: 2, size: '1200 sq.ft', cents: 2.75, facing: 'East', status: 'Available', price: '₹14.5 L' },
      { number: 3, size: '1500 sq.ft', cents: 3.44, facing: 'North', status: 'Available', price: '₹18.2 L' },
      { number: 4, size: '1800 sq.ft', cents: 4.13, facing: 'North-East', status: 'Reserved', price: '₹22.5 L' },
      { number: 5, size: '2400 sq.ft', cents: 5.51, facing: 'North', status: 'Available', price: '₹28.5 L' },
      { number: 6, size: '800 sq.ft', cents: 1.83, facing: 'South', status: 'Sold', price: '₹9.8 L' },
      { number: 7, size: '1200 sq.ft', cents: 2.75, facing: 'East', status: 'Available', price: '₹14.5 L' },
      { number: 8, size: '1500 sq.ft', cents: 3.44, facing: 'North', status: 'Available', price: '₹18.2 L' },
      { number: 9, size: '1200 sq.ft', cents: 2.75, facing: 'South', status: 'Sold', price: '₹14.2 L' },
      { number: 10, size: '1800 sq.ft', cents: 4.13, facing: 'East', status: 'Available', price: '₹22.0 L' },
      { number: 11, size: '1200 sq.ft', cents: 2.75, facing: 'North', status: 'Available', price: '₹14.5 L' },
      { number: 12, size: '1500 sq.ft', cents: 3.44, facing: 'East', status: 'Reserved', price: '₹18.5 L' },
      { number: 13, size: '2000 sq.ft', cents: 4.59, facing: 'North-East', status: 'Available', price: '₹24.8 L' },
      { number: 14, size: '1200 sq.ft', cents: 2.75, facing: 'South', status: 'Sold', price: '₹14.0 L' },
      { number: 15, size: '1200 sq.ft', cents: 2.75, facing: 'East', status: 'Available', price: '₹14.5 L' }
    ]
  }
];

export const INITIAL_ENQUIRIES: Enquiry[] = [
  {
    id: 'enq-1',
    plotId: 'plot-1',
    plotTitle: 'Pearl Haven - Premium Corner Villa Plot',
    name: 'K. Balasubramanian',
    phone: '+91 94431 88210',
    email: 'bala.subbu@gmail.com',
    message: 'Interested in Plot #18 in Pearl Haven. Would like to schedule an on-site physical inspection this Saturday morning.',
    preferredLocation: 'Korampallam',
    budget: '₹30 - ₹35 Lakhs',
    status: 'New',
    createdAt: '2026-03-15'
  },
  {
    id: 'enq-2',
    plotId: 'plot-2',
    plotTitle: 'Palayam Greens - Four-Lane Connected Residential Plot',
    name: 'S. Rajendran',
    phone: '+91 98422 34109',
    email: 'rajendran.builders@yahoo.com',
    message: 'Please share DTCP approval copy and survey layout map for Palayam Greens plot.',
    preferredLocation: 'Palayamkottai Road',
    budget: '₹20 - ₹25 Lakhs',
    status: 'Contacted',
    createdAt: '2026-03-14'
  },
  {
    id: 'enq-3',
    plotId: 'plot-3',
    plotTitle: 'Harbour Enclave - East Facing Coastal City Plot',
    name: 'M. Anand Kumar',
    phone: '+91 97914 55201',
    email: 'anand.maritime@gmail.com',
    message: 'Looking for 2 adjacent plots near Harbour Bypass for joint family residential construction.',
    preferredLocation: 'Harbour Bypass Road',
    budget: '₹35 - ₹40 Lakhs',
    status: 'Follow-up',
    createdAt: '2026-03-12'
  }
];
