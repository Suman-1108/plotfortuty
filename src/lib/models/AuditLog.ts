import mongoose, { Schema, Document, Model } from 'mongoose';
import { UserRole } from '@/lib/types';

export interface IAuditLog extends Document {
  tenantId?: string;
  userId: string;
  userEmail: string;
  userRole: UserRole;
  action: string;
  resourceType: string;
  resourceId?: string;
  details?: Record<string, unknown>;
  ipAddress?: string;
  createdAt: Date;
}

const AuditLogSchema = new Schema<IAuditLog>(
  {
    tenantId: { type: String, index: true },
    userId: { type: String, required: true },
    userEmail: { type: String, required: true },
    userRole: { type: String, required: true },
    action: { type: String, required: true },
    resourceType: { type: String, required: true },
    resourceId: { type: String },
    details: { type: Schema.Types.Mixed },
    ipAddress: { type: String }
  },
  {
    timestamps: { createdAt: true, updatedAt: false }
  }
);

export const AuditLogModel: Model<IAuditLog> =
  mongoose.models.AuditLog || mongoose.model<IAuditLog>('AuditLog', AuditLogSchema);
