import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ISubscriptionPlan extends Document {
  name: string;
  slug: 'starter' | 'professional' | 'enterprise';
  priceMonthly: number;
  priceYearly: number;
  maxProjects: number;
  maxPlots: number;
  features: string[];
  isPopular: boolean;
  isActive: boolean;
}

const SubscriptionPlanSchema = new Schema<ISubscriptionPlan>(
  {
    name: { type: String, required: true },
    slug: {
      type: String,
      enum: ['starter', 'professional', 'enterprise'],
      required: true,
      unique: true
    },
    priceMonthly: { type: Number, required: true },
    priceYearly: { type: Number, required: true },
    maxProjects: { type: Number, required: true },
    maxPlots: { type: Number, required: true },
    features: { type: [String], default: [] },
    isPopular: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export const SubscriptionPlanModel: Model<ISubscriptionPlan> =
  mongoose.models.SubscriptionPlan ||
  mongoose.model<ISubscriptionPlan>('SubscriptionPlan', SubscriptionPlanSchema);

export interface ISubscription extends Document {
  tenantId: string;
  planSlug: 'starter' | 'professional' | 'enterprise';
  status: 'active' | 'trial' | 'expired' | 'canceled';
  razorpaySubscriptionId?: string;
  razorpayOrderId?: string;
  billingCycle: 'monthly' | 'yearly';
  amount: number;
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  autoRenew: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const SubscriptionSchema = new Schema<ISubscription>(
  {
    tenantId: { type: String, required: true, index: true },
    planSlug: {
      type: String,
      enum: ['starter', 'professional', 'enterprise'],
      required: true
    },
    status: {
      type: String,
      enum: ['active', 'trial', 'expired', 'canceled'],
      default: 'active'
    },
    razorpaySubscriptionId: { type: String, default: '' },
    razorpayOrderId: { type: String, default: '' },
    billingCycle: { type: String, enum: ['monthly', 'yearly'], default: 'monthly' },
    amount: { type: Number, required: true },
    currentPeriodStart: { type: Date, default: () => new Date() },
    currentPeriodEnd: { type: Date, required: true },
    autoRenew: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export const SubscriptionModel: Model<ISubscription> =
  mongoose.models.Subscription ||
  mongoose.model<ISubscription>('Subscription', SubscriptionSchema);
