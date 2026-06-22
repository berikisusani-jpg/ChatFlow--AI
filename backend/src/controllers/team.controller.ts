import { Request, Response } from 'express';
import { prisma } from '../config/db';
import { UserRole, UserStatus } from '@prisma/client';

export const inviteUser = async (req: Request, res: Response) => {
  const { email, role } = req.body;
  const user = (req as any).user;

  try {
    const invite = await prisma.invite.create({
      data: {
        email,
        role: role as UserRole,
        organizationId: user.organizationId,
        token: Math.random().toString(36).substring(7),
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
      }
    });
    // In real app, send email here
    res.status(201).json(invite);
  } catch (error) {
    res.status(400).json({ message: 'Invite failed' });
  }
};

export const listMembers = async (req: Request, res: Response) => {
  const user = (req as any).user;
  const members = await prisma.user.findMany({
    where: { organizationId: user.organizationId },
    select: { id: true, email: true, role: true, name: true, status: true, createdAt: true }
  });
  res.json(members);
};

export const removeMember = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = (req as any).user;

  try {
    await prisma.user.updateMany({
      where: { id, organizationId: user.organizationId },
      data: { organizationId: null, status: UserStatus.INACTIVE }
    });
    res.json({ message: 'Member removed' });
  } catch (error) {
    res.status(400).json({ message: 'Removal failed' });
  }
};

export const updateMemberRole = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { role } = req.body;
  const user = (req as any).user;

  try {
    await prisma.user.updateMany({
      where: { id, organizationId: user.organizationId },
      data: { role: role as UserRole }
    });
    res.json({ message: 'Role updated' });
  } catch (error) {
    res.status(400).json({ message: 'Update failed' });
  }
};
