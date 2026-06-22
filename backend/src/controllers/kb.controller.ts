import { Request, Response } from 'express';
import { prisma } from '../config/db';

export const uploadKB = async (req: Request, res: Response) => {
  const { fileName, fileType, agentId, content } = req.body;
  const user = (req as any).user;

  try {
    const agent = await prisma.agent.findFirst({
      where: { id: agentId, organizationId: user.organizationId }
    });

    if (!agent) return res.status(404).json({ message: 'Agent not found' });

    const kb = await prisma.knowledgeBase.create({
      data: { fileName, fileType, agentId, content }
    });
    res.status(201).json(kb);
  } catch (error) {
    res.status(400).json({ message: 'Upload failed' });
  }
};
