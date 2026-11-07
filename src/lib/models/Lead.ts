import mongoose, { Schema, Document, Model } from 'mongoose';
import { LeadStage } from '@/lib/types';

export interface ILead extends Document {
  tenantId: string;
  projectId?: string;
  plotId?: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  message: string;
  budget?: string;
  preferredLocation?: string;
  source: string;
  stage: LeadStage;
  assignedTo?: string; // Sales executive
  siteVisitDate?: Date;
  siteVisitStatus?: 'scheduled' | 'completed' | 'cancelled';
  constructionInterest: boolean;
  notes: Array<{
    note: string;
    author: string;
    createdAt: Date;
  }>;
  createdAt: Date;
  updatedAt: Date;
}

const LeadSchema = new Schema<ILead>(
  {
    tenantId: { type: String, required: true, index: true },
    projectId: { type: String, index: true },
    plotId: { type: String, index: true },
    customerName: { type: String, required: true, trim: true },
    customerEmail: { type: String, required: true, trim: true, lowercase: true },
    customerPhone: { type: String, required: true, trim: true },
    message: { type: String, default: '' },
    budget: { type: String, default: '' },
    preferredLocation: { type: String, default: '' },
    source: { type: String, default: 'Website Inquiry' },
    stage: {
      type: String,
      enum: ['New', 'Contacted', 'Interested', 'Site Visit', 'Negotiation', 'Converted', 'Closed'],
      default: 'New',
      index: true
    },
    assignedTo: { type: String, default: '' },
    siteVisitDate: { type: Date },
    siteVisitStatus: {
      type: String,
      enum: ['scheduled', 'completed', 'cancelled'],
      default: undefined
    },
    constructionInterest: { type: Boolean, default: false },
    notes: {
      type: [
        {
          note: { type: String, required: true },
          author: { type: String, default: 'System' },
          createdAt: { type: Date, default: () => new Date() }
        }
      ],
      default: []
    }
  },
  {
    timestamps: true
  }
);

export const LeadModel: Model<ILead> =
  mongoose.models.Lead || mongoose.model<ILead>('Lead', LeadSchema);
