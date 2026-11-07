import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IPayment extends Document {
  tenantId: string;
  userId?: string;
  amount: number; // in INR paise or rupees - stored as INR rupees
  currency: string;
  razorpayOrderId: string;
  razorpayPaymentId?: string;
  razorpaySignature?: string;
  status: 'created' | 'paid' | 'failed';
  purpose: 'subscription' | 'booking_token' | 'feature_listing';
  planId?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const PaymentSchema = new Schema<IPayment>(
  {
    tenantId: { type: String, required: true, index: true },
    userId: { type: String, default: '' },
    amount: { type: Number, required: true },
    currency: { type: String, default: 'INR' },
    razorpayOrderId: { type: String, required: true, unique: true, index: true },
    razorpayPaymentId: { type: String, default: '' },
    razorpaySignature: { type: String, default: '' },
    status: {
      type: String,
      enum: ['created', 'paid', 'failed'],
      default: 'created',
      index: true
    },
    purpose: {
      type: String,
      enum: ['subscription', 'booking_token', 'feature_listing'],
      default: 'subscription'
    },
    planId: { type: String, default: '' },
    notes: { type: String, default: '' }
  },
  {
    timestamps: true
  }
);

export const PaymentModel: Model<IPayment> =
  mongoose.models.Payment || mongoose.model<IPayment>('Payment', PaymentSchema);
