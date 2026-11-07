import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProject extends Document {
  tenantId: string;
  developerName: string;
  slug: string;
  name: string;
  tagline: string;
  district: string;
  location: string;
  address: string;
  propertyType: string;
  totalPlots: number;
  availablePlots: number;
  soldPlots: number;
  reservedPlots: number;
  priceRange: string;
  plotSizes: string;
  approval: string;
  approvalNumber: string;
  reraNumber?: string;
  description: string;
  image: string;
  gallery: string[];
  amenities: string[];
  landmarks: Array<{ name: string; distance: string }>;
  layoutPlots: Array<{
    number: number;
    group?: string;
    size: string;
    cents: number;
    facing: string;
    status: string;
    price: string;
    isCorner?: boolean;
    roadWidth?: string;
  }>;
  layoutImageUrl?: string;
  scheduledPlotsCount?: number;
  group1PlotsCount?: number;
  group2PlotsCount?: number;
  highlights?: string[];
  houseConstructionAvailable: boolean;
  loanFinancingOffer?: string;
  beachDistance?: string;
  status: 'draft' | 'pending_approval' | 'published' | 'archived';
  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const LandmarkSchema = new Schema(
  {
    name: { type: String, required: true },
    distance: { type: String, required: true }
  },
  { _id: false }
);

const LayoutPlotSchema = new Schema(
  {
    number: { type: Number, required: true },
    group: { type: String, default: 'Group 1' },
    size: { type: String, default: '' },
    cents: { type: Number, default: 2.75 },
    facing: { type: String, default: 'East' },
    status: {
      type: String,
      enum: ['Available', 'Reserved', 'Booked', 'Sold', 'Hidden'],
      default: 'Available'
    },
    price: { type: String, default: '' },
    isCorner: { type: Boolean, default: false },
    roadWidth: { type: String, default: '33 ft' }
  },
  { _id: false }
);

const ProjectSchema = new Schema<IProject>(
  {
    tenantId: { type: String, required: true, index: true },
    developerName: { type: String, default: 'Plot 4 Tuty Developer' },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    name: { type: String, required: true, trim: true },
    tagline: { type: String, default: '' },
    district: { type: String, default: 'Thoothukudi' },
    location: { type: String, required: true },
    address: { type: String, default: '' },
    propertyType: { type: String, default: 'Residential Plotted Community' },
    totalPlots: { type: Number, default: 0 },
    availablePlots: { type: Number, default: 0 },
    soldPlots: { type: Number, default: 0 },
    reservedPlots: { type: Number, default: 0 },
    priceRange: { type: String, default: '' },
    plotSizes: { type: String, default: '' },
    approval: { type: String, default: 'DTCP Approved & CRZ Cleared' },
    approvalNumber: { type: String, default: '' },
    reraNumber: { type: String, default: '' },
    description: { type: String, default: '' },
    image: { type: String, default: '/images/ap-rajan-garden-layout.jpg' },
    gallery: { type: [String], default: [] },
    amenities: { type: [String], default: [] },
    landmarks: { type: [LandmarkSchema], default: [] },
    layoutPlots: { type: [LayoutPlotSchema], default: [] },
    layoutImageUrl: { type: String, default: '/images/ap-rajan-garden-layout.jpg' },
    scheduledPlotsCount: { type: Number, default: 0 },
    group1PlotsCount: { type: Number, default: 0 },
    group2PlotsCount: { type: Number, default: 0 },
    highlights: { type: [String], default: [] },
    houseConstructionAvailable: { type: Boolean, default: true },
    loanFinancingOffer: { type: String, default: 'Up to 90% Bank Loan Support' },
    beachDistance: { type: String, default: '' },
    status: {
      type: String,
      enum: ['draft', 'pending_approval', 'published', 'archived'],
      default: 'published',
      index: true
    },
    isFeatured: { type: Boolean, default: false }
  },
  {
    timestamps: true
  }
);

export const ProjectModel: Model<IProject> =
  mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);
