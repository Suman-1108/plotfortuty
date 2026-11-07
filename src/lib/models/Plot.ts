import mongoose, { Schema, Document, Model } from 'mongoose';
import { PlotStatus, ApprovalType } from '@/lib/types';

export interface IPlotModel extends Document {
  tenantId: string;
  projectId: string;
  projectName: string;
  layoutGroup: string; // 'Group 1' | 'Group 2'
  plotNumber: string; // '1', '2', etc.
  slug: string;
  title: string;
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
  isCornerPlot: boolean;
  approval: ApprovalType;
  approvalNumber: string;
  pattaStatus: string;
  status: PlotStatus;
  isFeatured: boolean;
  description: string;
  amenities: string[];
  landmarks: Array<{ name: string; distance: string }>;
  images: string[];
  layoutPlotNumber: string;
  registrationCharges?: number;
  isVerified: boolean;
  verificationNotes?: string;
  priceHistory: Array<{
    price: number;
    pricePerCent?: number;
    date: string;
    changedBy?: string;
    note?: string;
  }>;
  layoutCoordinates?: {
    x: number;
    y: number;
    width?: number;
    height?: number;
    svgPath?: string;
    polygon?: [number, number][];
  };
  coordinates?: {
    lat: number;
    lng: number;
  };
  sellerName?: string;
  sellerPhone?: string;
  sellerEmail?: string;
  reraNumber?: string;
  createdAt: Date;
  updatedAt: Date;
}

const PlotSchema = new Schema<IPlotModel>(
  {
    tenantId: { type: String, required: true, index: true },
    projectId: { type: String, required: true, index: true },
    projectName: { type: String, default: 'AP Rajan Garden' },
    layoutGroup: { type: String, required: true, default: 'Group 1', index: true },
    plotNumber: { type: String, required: true, index: true },
    slug: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    location: { type: String, default: 'Tharuvaikulam' },
    address: { type: String, default: '' },
    price: { type: Number, required: true },
    priceDisplay: { type: String, default: '' },
    pricePerSqFt: { type: Number, default: 0 },
    pricePerCent: { type: Number, default: 0 },
    areaSqFt: { type: Number, required: true },
    areaCents: { type: Number, required: true },
    dimensions: { type: String, default: '' },
    length: { type: Number },
    width: { type: Number },
    frontage: { type: Number },
    facing: { type: String, default: 'East' },
    roadWidth: { type: String, default: '33 ft Blacktop Tar Road' },
    isCornerPlot: { type: Boolean, default: false },
    approval: {
      type: String,
      default: 'DTCP Approved & CRZ Cleared'
    },
    approvalNumber: { type: String, default: 'DTCP No. 112/2024' },
    pattaStatus: { type: String, default: 'Clear Title & Immediate Patta Ready' },
    status: {
      type: String,
      enum: ['Available', 'Reserved', 'Booked', 'Sold', 'Hidden', 'Fast Selling', 'Under Review'],
      default: 'Available',
      index: true
    },
    isFeatured: { type: Boolean, default: false },
    description: { type: String, default: '' },
    amenities: { type: [String], default: [] },
    landmarks: {
      type: [
        {
          name: { type: String, required: true },
          distance: { type: String, required: true }
        }
      ],
      default: []
    },
    images: { type: [String], default: [] },
    layoutPlotNumber: { type: String, default: '' },
    registrationCharges: { type: Number, default: 0 },
    isVerified: { type: Boolean, default: true },
    verificationNotes: { type: String, default: '' },
    priceHistory: {
      type: [
        {
          price: { type: Number, required: true },
          pricePerCent: { type: Number },
          date: { type: String, default: () => new Date().toISOString() },
          changedBy: { type: String, default: 'System' },
          note: { type: String, default: '' }
        }
      ],
      default: []
    },
    layoutCoordinates: {
      x: { type: Number, default: 0 },
      y: { type: Number, default: 0 },
      width: { type: Number },
      height: { type: Number },
      svgPath: { type: String },
      polygon: { type: [[Number]] }
    },
    coordinates: {
      lat: { type: Number, default: 8.8954 },
      lng: { type: Number, default: 78.1632 }
    },
    sellerName: { type: String, default: '' },
    sellerPhone: { type: String, default: '' },
    sellerEmail: { type: String, default: '' },
    reraNumber: { type: String, default: '' }
  },
  {
    timestamps: true
  }
);

// Composite Unique Index: Project + Layout Group + Plot Number
PlotSchema.index({ projectId: 1, layoutGroup: 1, plotNumber: 1 }, { unique: true });

export const PlotModel: Model<IPlotModel> =
  mongoose.models.Plot || mongoose.model<IPlotModel>('Plot', PlotSchema);
