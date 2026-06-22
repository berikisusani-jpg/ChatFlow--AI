import { Request, Response } from 'express';
import { prisma } from '../config/db';
import crypto from 'crypto';

export const createApiKey = async (req: Request, res: Response) => {
  const { name } = req.body;
  const user = (req as any).user;

  const key = `cf_${crypto.randomBytes(24).toString('hex')}`;

  try {
    const apiKey = await prisma.apiKey.create({
      data: {
        name,
        key,
        organizationId: user.organizationId,
        userId: user.id
      }
    });
    res.status(201).json(apiKey);
  } catch (error) {
    res.status(400).json({ message: 'Key creation failed' });
  }
};

export const listApiKeys = async (req: Request, res: Response) => {
  const user = (req as any).user;
  const keys = await prisma.apiKey.findMany({
    where: { organizationId: user.organizationId },
    select: { id: true, name: true, lastUsed: true, createdAt: true, expiresAt: true }
  });
  res.json(keys);
};
