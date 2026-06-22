import { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/db';

export const apiKeyMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const apiKey = req.headers['x-api-key'];

  if (!apiKey) {
    return next(); // Fallback to JWT
  }

  const storedKey = await prisma.apiKey.findUnique({
    where: { key: apiKey as string },
    include: { user: true }
  });

  if (!storedKey || (storedKey.expiresAt && storedKey.expiresAt < new Date())) {
    return res.status(401).json({ message: 'Invalid or expired API key' });
  }

  // Update last used
  await prisma.apiKey.update({
    where: { id: storedKey.id },
    data: { lastUsed: new Date() }
  });

  (req as any).user = {
    id: storedKey.userId,
    organizationId: storedKey.organizationId,
    role: storedKey.user.role
  };

  next();
};
