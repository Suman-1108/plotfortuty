import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ITenant extends Document {
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
  subscriptionExpiresAt: Date;
  maxProjects: number;
  maxPlots: number;
  logo?: string;
  verifiedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const TenantSchema = new Schema<ITenant>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    companyName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    phone: { type: String, required: true, trim: true },
    address: { type: String, default: '' },
    district: { type: String, default: 'Thoothukudi' },
    reraNumber: { type: String, default: '' },
    gstin: { type: String, default: '' },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected', 'suspended'],
      default: 'approved'
    },
    subscriptionPlan: {
      type: String,
      enum: ['starter', 'professional', 'enterprise'],
      default: 'professional'
    },
    subscriptionStatus: {
      type: String,
      enum: ['active', 'trial', 'expired', 'canceled'],
      default: 'active'
    },
    subscriptionExpiresAt: {
      type: Date,
      default: () => new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
    },
    maxProjects: { type: Number, default: 5 },
    maxPlots: { type: Number, default: 250 },
    logo: { type: String, default: '' },
    verifiedAt: { type: Date, default: () => new Date() }
  },
  {
    timestamps: true
  }
);

export const Tenant: Model<ITenant> =
  mongoose.models.Tenant || mongoose.model<ITenant>('Tenant', TenantSchema);
