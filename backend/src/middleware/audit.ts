import { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/db';

export const logAuditAction = (action: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;

    // Continue and log after response
    res.on('finish', async () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
            await prisma.auditLog.create({
                data: {
                    action,
                    result: 'SUCCESS',
                    userId: user?.id,
                    organizationId: user?.organizationId,
                    ip: req.ip,
                    userAgent: req.headers['user-agent'],
                    metadata: {
                        method: req.method,
                        url: req.originalUrl,
                        params: req.params,
                        body: req.method !== 'GET' ? req.body : undefined
                    }
                }
            });
        }
    });

    next();
  };
};
