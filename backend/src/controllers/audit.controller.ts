import { Request, Response } from 'express';
import { prisma } from '../config/db';

export const listAuditLogs = async (req: Request, res: Response) => {
  const user = (req as any).user;
  const logs = await prisma.auditLog.findMany({
    where: { organizationId: user.organizationId },
    include: { user: { select: { name: true, email: true } } },
    orderBy: { createdAt: 'desc' },
    take: 100
  });
  res.json(logs);
};
