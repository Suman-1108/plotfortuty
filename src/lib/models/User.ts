import mongoose, { Schema, Document, Model } from 'mongoose';
import { UserRole } from '@/lib/types';

export interface IUser extends Document {
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  tenantId?: string;
  assignedProjects?: string[];
  status: 'active' | 'pending' | 'suspended';
  isVerified: boolean;
  savedPlots: string[];
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      default: 'User'
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      index: true
    },
    phone: {
      type: String,
      trim: true,
      default: ''
    },
    role: {
      type: String,
      enum: [
        'super_admin',
        'developer',
        'project_manager',
        'sales_executive',
        'customer',
        // Backward compatibility
        'admin',
        'seller',
        'buyer'
      ],
      default: 'customer'
    },
    tenantId: {
      type: String,
      index: true,
      default: null
    },
    assignedProjects: {
      type: [String],
      default: []
    },
    status: {
      type: String,
      enum: ['active', 'pending', 'suspended'],
      default: 'active'
    },
    isVerified: {
      type: Boolean,
      default: false
    },
    savedPlots: {
      type: [String],
      default: []
    }
  },
  {
    timestamps: true
  }
);

export const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
