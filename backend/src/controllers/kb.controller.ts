import { Request, Response } from 'express';
import { prisma } from '../config/db';
import { processDocument } from '../services/rag.service';

export const uploadKB = async (req: Request, res: Response) => {
  const { fileName, fileType, agentId, content, category, tags, metadata } = req.body;
  const user = (req as any).user;

  try {
    const agent = await prisma.agent.findFirst({
      where: { id: agentId, organizationId: user.organizationId }
    });

    if (!agent) return res.status(404).json({ message: 'Agent not found' });

    const kb = await prisma.knowledgeBase.create({
      data: {
        fileName,
        fileType,
        agentId,
        content,
        category,
        tags,
        metadata: metadata || {}
      }
    });

    // Start RAG processing background job (simulated)
    if (content) {
        processDocument(kb.id, content).catch(e => console.error('RAG Processing Error', e));
    }

    res.status(201).json(kb);
  } catch (error) {
    res.status(400).json({ message: 'Upload failed' });
  }
};

export const listKB = async (req: Request, res: Response) => {
  const { agentId } = req.query;
  const user = (req as any).user;

  const kbs = await prisma.knowledgeBase.findMany({
    where: {
      agentId: agentId as string,
      agent: { organizationId: user.organizationId }
    },
    include: { _count: { select: { documents: true } } }
  });

  res.json(kbs);
};

export const deleteKB = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = (req as any).user;

  try {
    const result = await prisma.knowledgeBase.deleteMany({
      where: {
        id,
        agent: { organizationId: user.organizationId }
      }
    });

    if (result.count === 0) return res.status(404).json({ message: 'Knowledge base not found' });
    res.json({ message: 'Deleted' });
  } catch (error) {
    res.status(400).json({ message: 'Delete failed' });
  }
};
