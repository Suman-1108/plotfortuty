import { NextRequest, NextResponse } from 'next/server';
import { UserRole } from '@/lib/types';
import { AuditLogModel } from '@/lib/models/AuditLog';
import { connectToDatabase } from '@/lib/mongodb';

export interface AuthSessionUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  tenantId?: string;
  assignedProjects?: string[];
  isVerified?: boolean;
}

/**
 * Extract authenticated user session from NextRequest cookies
 */
export function getSessionUser(req: NextRequest): AuthSessionUser | null {
  try {
    const sessionCookie =
      req.cookies.get('plot4tuty_session')?.value ||
      req.cookies.get('plot4tuty_buyer_session')?.value;

    if (!sessionCookie) return null;

    const user: AuthSessionUser = JSON.parse(sessionCookie);
    if (!user || !user.email) return null;

    return user;
  } catch {
    return null;
  }
}

/**
 * Verify session and enforce RBAC
 */
export function requireAuth(
  req: NextRequest,
  allowedRoles: UserRole[]
): { user: AuthSessionUser } | { error: NextResponse } {
  const user = getSessionUser(req);

  if (!user) {
    return {
      error: NextResponse.json(
        { success: false, error: 'Authentication required. Please sign in.' },
        { status: 401 }
      )
    };
  }

  // Normalize role matching (e.g. 'admin' matches 'super_admin', 'seller' matches 'developer', 'buyer' matches 'customer')
  const normalizedUserRole = user.role;
  const isAllowed = allowedRoles.some((role) => {
    if (role === normalizedUserRole) return true;
    if (role === 'super_admin' && (normalizedUserRole === 'admin' || normalizedUserRole === 'super_admin')) return true;
    if (role === 'developer' && (normalizedUserRole === 'seller' || normalizedUserRole === 'developer')) return true;
    if (role === 'customer' && (normalizedUserRole === 'buyer' || normalizedUserRole === 'customer')) return true;
    return false;
  });

  if (!isAllowed) {
    return {
      error: NextResponse.json(
        {
          success: false,
          error: `Forbidden: You do not have permissions for this action. Role required: [${allowedRoles.join(
            ', '
          )}]`
        },
        { status: 403 }
      )
    };
  }

  return { user };
}

/**
 * Return strict database query filter for multi-tenant isolation.
 * Super Admin can access all or filter by requested tenantId.
 * Developers, Project Managers, and Sales Executives can ONLY access their own tenant's data.
 */
export function getTenantFilter(user: AuthSessionUser, requestedTenantId?: string): Record<string, unknown> {
  const isSuperAdmin = user.role === 'super_admin' || user.role === 'admin';

  if (isSuperAdmin) {
    if (requestedTenantId && requestedTenantId !== 'all') {
      return { tenantId: requestedTenantId };
    }
    return {};
  }

  // Multi-tenant isolation: developer/seller can NEVER access another developer's data
  const tenantId = user.tenantId || `tenant-${user.id}`;
  return { tenantId };
}

/**
 * Record an audit log entry for sensitive operations
 */
export async function logAuditEvent(params: {
  user: AuthSessionUser;
  action: string;
  resourceType: string;
  resourceId?: string;
  details?: Record<string, unknown>;
  req?: NextRequest;
}) {
  try {
    await connectToDatabase();
    const ip = params.req?.headers.get('x-forwarded-for') || 'local';
    await AuditLogModel.create({
      tenantId: params.user.tenantId,
      userId: params.user.id,
      userEmail: params.user.email,
      userRole: params.user.role,
      action: params.action,
      resourceType: params.resourceType,
      resourceId: params.resourceId,
      details: params.details,
      ipAddress: ip
    });
  } catch (err) {
    console.error('Failed to log audit event:', err);
  }
}
