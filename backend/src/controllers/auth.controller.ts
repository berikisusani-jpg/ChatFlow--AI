import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../config/db';
import { config } from '../config';
import { UserRole, UserStatus, PlanTier } from '@prisma/client';

const ACCESS_TOKEN_EXPIRY = '15m';
const REFRESH_TOKEN_EXPIRY_DAYS = 30;

const generateTokens = async (user: any) => {
  const accessToken = jwt.sign(
    { id: user.id, organizationId: user.organizationId, role: user.role },
    config.jwtSecret,
    { expiresIn: ACCESS_TOKEN_EXPIRY }
  );

  const refreshTokenValue = Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2);
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + REFRESH_TOKEN_EXPIRY_DAYS);

  await prisma.refreshToken.create({
    data: {
      token: refreshTokenValue,
      userId: user.id,
      expiresAt
    }
  });

  return { accessToken, refreshToken: refreshTokenValue };
};

export const signup = async (req: Request, res: Response) => {
  const { email, password, name, organizationName, slug } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.$transaction(async (tx) => {
      const org = await tx.organization.create({
        data: {
          name: organizationName || `${name}'s Organization`,
          slug: slug || `org-${Math.random().toString(36).substring(7)}`,
          subscription: {
            create: { plan: PlanTier.FREE }
          }
        }
      });

      return tx.user.create({
        data: {
          email,
          password: hashedPassword,
          name,
          organizationId: org.id,
          role: UserRole.OWNER,
          status: UserStatus.ACTIVE
        }
      });
    });

    const tokens = await generateTokens(user);
    res.status(201).json({ user, ...tokens });
  } catch (error) {
    res.status(400).json({ message: 'User already exists or invalid data' });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
      include: { organization: true }
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    if (user.status === UserStatus.SUSPENDED) {
      return res.status(403).json({ message: 'Account suspended' });
    }

    const tokens = await generateTokens(user);

    // Audit log
    await prisma.auditLog.create({
        data: {
            action: 'LOGIN',
            result: 'SUCCESS',
            userId: user.id,
            organizationId: user.organizationId as string,
            ip: req.ip,
            userAgent: req.headers['user-agent']
        }
    });

    res.json({ user, ...tokens });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const refreshToken = async (req: Request, res: Response) => {
    const { refreshToken } = req.body;

    if (!refreshToken) return res.status(400).json({ message: 'Refresh token required' });

    const storedToken = await prisma.refreshToken.findUnique({
        where: { token: refreshToken },
        include: { user: true }
    });

    if (!storedToken || storedToken.revokedAt || storedToken.expiresAt < new Date()) {
        return res.status(401).json({ message: 'Invalid or expired refresh token' });
    }

    // Token rotation: Revoke old token
    await prisma.refreshToken.update({
        where: { id: storedToken.id },
        data: { revokedAt: new Date() }
    });

    const tokens = await generateTokens(storedToken.user);
    res.json(tokens);
};

export const logout = async (req: Request, res: Response) => {
    const { refreshToken } = req.body;
    if (refreshToken) {
        await prisma.refreshToken.updateMany({
            where: { token: refreshToken },
            data: { revokedAt: new Date() }
        });
    }
    res.json({ message: 'Logged out' });
};
