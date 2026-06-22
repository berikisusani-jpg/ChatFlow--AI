import { Request, Response } from 'express';
import { prisma } from '../config/db';

export const listConversations = async (req: Request, res: Response) => {
  const user = (req as any).user;
  const { channel } = req.query;

  const conversations = await prisma.conversation.findMany({
    where: {
      agent: { organizationId: user.organizationId },
      channel: channel ? (channel as any) : undefined
    },
    include: {
      agent: { select: { name: true } },
      messages: {
        orderBy: { createdAt: 'desc' },
        take: 1
      }
    },
    orderBy: { updatedAt: 'desc' }
  });

  res.json(conversations);
};

export const getConversationMessages = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = (req as any).user;

  const conversation = await prisma.conversation.findFirst({
    where: { id, agent: { organizationId: user.organizationId } },
    include: { messages: { orderBy: { createdAt: 'asc' } } }
  });

  if (!conversation) return res.status(404).json({ message: 'Conversation not found' });
  res.json(conversation);
};
