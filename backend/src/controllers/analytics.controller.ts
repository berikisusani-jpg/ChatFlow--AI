import { Request, Response } from 'express';
import { prisma } from '../config/db';

export const getDashboardAnalytics = async (req: Request, res: Response) => {
  const user = (req as any).user;
  const organizationId = user.organizationId;

  const now = new Date();
  const thirtyDaysAgo = new Date(now.setDate(now.getDate() - 30));

  const [
    messageCount,
    conversationCount,
    agentCount,
    memberCount,
    recentMessages
  ] = await Promise.all([
    prisma.usageMetric.count({ where: { organizationId, type: 'messages', date: { gte: thirtyDaysAgo } } }),
    prisma.conversation.count({ where: { agent: { organizationId } } }),
    prisma.agent.count({ where: { organizationId } }),
    prisma.user.count({ where: { organizationId } }),
    prisma.message.findMany({
        where: { conversation: { agent: { organizationId } } },
        orderBy: { createdAt: 'desc' },
        take: 10,
        include: { conversation: { select: { channel: true } } }
    })
  ]);

  res.json({
    metrics: {
      messages30d: messageCount,
      totalConversations: conversationCount,
      activeAgents: agentCount,
      teamMembers: memberCount
    },
    recentActivity: recentMessages
  });
};
