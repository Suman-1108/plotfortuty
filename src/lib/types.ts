export type PlotStatus = 'Available' | 'Fast Selling' | 'Reserved' | 'Sold' | 'Under Review';

export type ApprovalType = 'DTCP Approved' | 'RERA Registered' | 'DTCP & RERA Approved' | 'Panchayat Approved';

export interface Landmark {
  name: string;
  distance: string;
}

export interface Plot {
  id: string;
  slug: string;
  title: string;
  project: string;
  location: string;
  address: string;
  price: number;
  priceDisplay: string;
  pricePerSqFt: number;
  pricePerCent: number;
  areaSqFt: number;
  areaCents: number;
  dimensions: string;
  facing: string;
  roadWidth: string;
  approval: ApprovalType;
  approvalNumber: string;
  pattaStatus: string;
  status: PlotStatus;
  isFeatured: boolean;
  description: string;
  amenities: string[];
  landmarks: Landmark[];
  images: string[];
  layoutPlotNumber: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  sellerName?: string;
  sellerPhone?: string;
  sellerEmail?: string;
  reraNumber?: string;
  createdAt: string;
}

export interface ProjectLayoutPlot {
  number: number;
  size: string;
  cents: number;
  facing: string;
  status: 'Available' | 'Reserved' | 'Sold';
  price: string;
}

export interface Project {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  location: string;
  address: string;
  totalPlots: number;
  availablePlots: number;
  soldPlots: number;
  priceRange: string;
  plotSizes: string;
  approval: string;
  approvalNumber: string;
  description: string;
  image: string;
  gallery: string[];
  amenities: string[];
  landmarks: Landmark[];
  layoutPlots: ProjectLayoutPlot[];
  highlights?: string[];
  houseConstructionAvailable?: boolean;
  loanFinancingOffer?: string;
  beachDistance?: string;
}

export interface Enquiry {
  id: string;
  plotId?: string;
  plotTitle?: string;
  name: string;
  phone: string;
  email: string;
  message: string;
  preferredLocation?: string;
  budget?: string;
  status: 'New' | 'Contacted' | 'Follow-up' | 'Closed';
  createdAt: string;
}

export interface SearchFilterState {
  location: string;
  budgetRange: string;
  plotSize: string;
  approval: string;
  status: string;
  searchQuery: string;
}
