import { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/db';
import { PlanTier } from '@prisma/client';

const PLAN_LIMITS: Record<PlanTier, { messages: number, agents: number }> = {
  FREE: { messages: 100, agents: 1 },
  STARTER: { messages: 1000, agents: 3 },
  PRO: { messages: 10000, agents: 10 },
  BUSINESS: { messages: 50000, agents: 50 },
  ENTERPRISE: { messages: 999999, agents: 999 }
};

export const checkUsageLimit = (type: 'messages' | 'agents') => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;

    const sub = await prisma.subscription.findUnique({
      where: { organizationId: user.organizationId }
    });

    const limits = PLAN_LIMITS[sub?.plan || PlanTier.FREE];

    if (type === 'agents') {
        const count = await prisma.agent.count({ where: { organizationId: user.organizationId } });
        if (count >= limits.agents) {
            return res.status(402).json({ message: 'Agent limit reached for your plan' });
        }
    }

    if (type === 'messages') {
        const usage = await prisma.usageMetric.findFirst({
            where: { organizationId: user.organizationId, type: 'messages' },
            orderBy: { date: 'desc' }
        });
        if (usage && usage.value >= limits.messages) {
            return res.status(402).json({ message: 'Message limit reached for your plan' });
        }
    }

    next();
  };
};

export const trackUsage = async (orgId: string, type: string, value: number = 1) => {
    await prisma.usageMetric.create({
        data: { organizationId: orgId, type, value }
    });
};
