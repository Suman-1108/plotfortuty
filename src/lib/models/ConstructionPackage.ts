import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IConstructionPackage extends Document {
  tenantId: string;
  projectId: string;
  name: string; // 'Basic', 'Premium', 'Luxury'
  tagline: string;
  ratePerSqFt: number; // e.g. 1950, 2450, 3100
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
  createdAt: Date;
  updatedAt: Date;
}

const ConstructionPackageSchema = new Schema<IConstructionPackage>(
  {
    tenantId: { type: String, required: true, index: true },
    projectId: { type: String, required: true, index: true },
    name: { type: String, required: true },
    tagline: { type: String, default: '' },
    ratePerSqFt: { type: Number, required: true },
    specs: {
      foundation: { type: String, default: 'Isolated RCC Column Footing with anti-termite treatment' },
      structure: { type: String, default: 'RCC Framed structure with 9" brick exterior & 4.5" partition walls' },
      flooring: { type: String, default: '2x2 Vitrified Tiles in living, dining and bedrooms' },
      doorsWindows: { type: String, default: 'Teak wood main entrance door, UPVC sliding glass windows' },
      kitchen: { type: String, default: 'Polished black granite platform with SS sink & glazed wall tile dado' },
      bathrooms: { type: String, default: 'Anti-skid ceramic flooring with branded sanitaryware & CP fittings' },
      electrical: { type: String, default: 'Concealed copper wiring with modular switches & inverter wiring' },
      painting: { type: String, default: 'Interior 2 coats putty with acrylic emulsion; exterior weather-proof paint' }
    },
    highlights: { type: [String], default: [] },
    estimatedTimelineMonths: { type: Number, default: 6 },
    brochureUrl: { type: String, default: '' },
    isActive: { type: Boolean, default: true }
  },
  {
    timestamps: true
  }
);

export const ConstructionPackageModel: Model<IConstructionPackage> =
  mongoose.models.ConstructionPackage ||
  mongoose.model<IConstructionPackage>('ConstructionPackage', ConstructionPackageSchema);
