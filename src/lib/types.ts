export type PlotStatus =
  | 'Available'
  | 'Reserved'
  | 'Booked'
  | 'Sold'
  | 'Hidden'
  | 'Fast Selling'
  | 'Under Review';

export type ApprovalType =
  | 'DTCP Approved'
  | 'RERA Registered'
  | 'DTCP & RERA Approved'
  | 'DTCP Approved & CRZ Cleared'
  | 'Panchayat Approved';

export type UserRole =
  | 'super_admin'
  | 'developer'
  | 'project_manager'
  | 'sales_executive'
  | 'customer'
  // Backward compatibility aliases
  | 'admin'
  | 'seller'
  | 'buyer';

export type LeadStage =
  | 'New'
  | 'Contacted'
  | 'Interested'
  | 'Site Visit'
  | 'Negotiation'
  | 'Converted'
  | 'Closed';

export interface Landmark {
  name: string;
  distance: string;
}

export interface PlotCoordinate {
  x: number;
  y: number;
  width?: number;
  height?: number;
  svgPath?: string;
  polygon?: [number, number][];
}

export interface PriceHistoryEntry {
  price: number;
  pricePerCent?: number;
  date: string;
  changedBy?: string;
  note?: string;
}

export interface Plot {
  id: string;
  slug: string;
  title: string;
  project: string;
  projectId?: string;
  tenantId?: string;
  developerName?: string;
  layoutGroup?: string; // 'Group 1' | 'Group 2' etc.
  plotNumber?: string;
  location: string;
  address: string;
  price: number;
  priceDisplay: string;
  pricePerSqFt: number;
  pricePerCent: number;
  areaSqFt: number;
  areaCents: number;
  dimensions: string;
  length?: number;
  width?: number;
  frontage?: number;
  facing: string;
  roadWidth: string;
  isCornerPlot?: boolean;
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
  registrationCharges?: number;
  isVerified?: boolean;
  verificationNotes?: string;
  priceHistory?: PriceHistoryEntry[];
  layoutCoordinates?: PlotCoordinate;
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
  group?: string;
  size: string;
  cents: number;
  facing: string;
  status: 'Available' | 'Reserved' | 'Booked' | 'Sold' | 'Hidden';
  price: string;
  isCorner?: boolean;
  roadWidth?: string;
}

export interface ConstructionPackage {
  id: string;
  projectId?: string;
  tenantId?: string;
  name: string; // 'Basic' | 'Premium' | 'Luxury'
  tagline: string;
  ratePerSqFt: number; // e.g., 2000, 2400, 3000
  specs: {
    foundation: string;
    structure: string;
    flooring: string;
    doorsWindows: string;
    kitchen: string;
    bathrooms: string;
    electrical: string;
    painting: string;
  };
  highlights: string[];
  estimatedTimelineMonths: number;
  brochureUrl?: string;
  isActive: boolean;
}

export interface Project {
  id: string;
  slug: string;
  name: string;
  tenantId?: string;
  developerName?: string;
  tagline: string;
  district?: string;
  location: string;
  address: string;
  propertyType?: string;
  totalPlots: number;
  availablePlots: number;
  soldPlots: number;
  reservedPlots?: number;
  priceRange: string;
  plotSizes: string;
  approval: string;
  approvalNumber: string;
  reraNumber?: string;
  description: string;
  image: string;
  gallery: string[];
  amenities: string[];
  landmarks: Landmark[];
  layoutPlots: ProjectLayoutPlot[];
  layoutImageUrl?: string;
  scheduledPlotsCount?: number;
  group1PlotsCount?: number;
  group2PlotsCount?: number;
  highlights?: string[];
  houseConstructionAvailable?: boolean;
  constructionPackages?: ConstructionPackage[];
  loanFinancingOffer?: string;
  beachDistance?: string;
  status?: 'draft' | 'pending_approval' | 'published' | 'archived';
  isFeatured?: boolean;
  createdAt?: string;
}

export interface Enquiry {
  id: string;
  plotId?: string;
  plotTitle?: string;
  projectId?: string;
  tenantId?: string;
  name: string;
  phone: string;
  email: string;
  message: string;
  preferredLocation?: string;
  budget?: string;
  status: 'New' | 'Contacted' | 'Follow-up' | 'Closed';
  stage?: LeadStage;
  assignedTo?: string; // Sales executive id/name
  siteVisitDate?: string;
  notes?: Array<{ note: string; author: string; createdAt: string }>;
  constructionInterest?: boolean;
  createdAt: string;
}

export interface Lead extends Enquiry {
  followUpDate?: string;
  estimatedDealValue?: number;
}

export interface Tenant {
  id: string;
  name: string;
  slug: string;
  companyName: string;
  email: string;
  phone: string;
  address: string;
  district: string;
  reraNumber?: string;
  gstin?: string;
  status: 'pending' | 'approved' | 'rejected' | 'suspended';
  subscriptionPlan: 'starter' | 'professional' | 'enterprise';
  subscriptionStatus: 'active' | 'trial' | 'expired' | 'canceled';
  subscriptionExpiresAt: string;
  maxProjects: number;
  maxPlots: number;
  logo?: string;
  verifiedAt?: string;
  createdAt: string;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  slug: 'starter' | 'professional' | 'enterprise';
  priceMonthly: number;
  priceYearly: number;
  maxProjects: number;
  maxPlots: number;
  features: string[];
  isPopular?: boolean;
}

export interface PaymentRecord {
  id: string;
  tenantId: string;
  userId?: string;
  amount: number;
  currency: string;
  razorpayOrderId: string;
  razorpayPaymentId?: string;
  razorpaySignature?: string;
  status: 'created' | 'paid' | 'failed';
  purpose: 'subscription' | 'booking_token' | 'feature_listing';
  planId?: string;
  notes?: string;
  createdAt: string;
}

export interface AuditLog {
  id: string;
  tenantId?: string;
  userId: string;
  userEmail: string;
  userRole: UserRole;
  action: string;
  resourceType: string;
  resourceId?: string;
  details?: Record<string, unknown>;
  ipAddress?: string;
  createdAt: string;
}

export interface SearchFilterState {
  location: string;
  budgetRange: string;
  plotSize: string;
  approval: string;
  status: string;
  searchQuery: string;
  layoutGroup?: string;
  facing?: string;
}
