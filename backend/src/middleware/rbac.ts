import { Request, Response, NextFunction } from 'express';
import { UserRole } from '@prisma/client';

export const requireRole = (roles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;

    if (!user || !roles.includes(user.role as UserRole)) {
      return res.status(403).json({ message: 'Insufficient permissions' });
    }

    next();
  };
};

// Map granular permissions to roles for enterprise RBAC
const rolePermissions: Record<UserRole, string[]> = {
  SUPER_ADMIN: ['*'],
  OWNER: ['manage_billing', 'manage_users', 'create_agent', 'delete_agent', 'manage_kb', 'view_analytics', 'manage_workspace', 'export_data'],
  ADMIN: ['manage_users', 'create_agent', 'delete_agent', 'manage_kb', 'view_analytics', 'manage_workspace'],
  MANAGER: ['create_agent', 'manage_kb', 'view_analytics'],
  AGENT: ['view_analytics', 'manage_kb'],
  MEMBER: ['view_analytics'],
  VIEWER: ['view_analytics']
};

export const requirePermission = (permission: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;
    const userRole = user?.role as UserRole;

    if (!userRole) return res.status(403).json({ message: 'No role assigned' });

    const permissions = rolePermissions[userRole] || [];

    if (permissions.includes('*') || permissions.includes(permission)) {
      return next();
    }

    res.status(403).json({ message: `Missing required permission: ${permission}` });
  };
};
