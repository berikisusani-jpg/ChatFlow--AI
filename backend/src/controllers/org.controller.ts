import { Request, Response } from 'express';
import { prisma } from '../config/db';

export const getOrg = async (req: Request, res: Response) => {
  const user = (req as any).user;
  const org = await prisma.organization.findUnique({
    where: { id: user.organizationId },
    include: { subscription: true, users: { select: { id: true, email: true, role: true, name: true, status: true } } }
  });
  res.json(org);
};

export const updateOrg = async (req: Request, res: Response) => {
  const user = (req as any).user;
  const { name, settings } = req.body;

  try {
    const org = await prisma.organization.update({
      where: { id: user.organizationId },
      data: { name, settings }
    });
    res.json(org);
  } catch (error) {
    res.status(400).json({ message: 'Update failed' });
  }
};
