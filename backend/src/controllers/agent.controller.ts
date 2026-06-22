import { Request, Response } from 'express';
import { prisma } from '../config/db';

export const createAgent = async (req: Request, res: Response) => {
  const { name, instructions, personality, temperature } = req.body;
  const user = (req as any).user;

  try {
    const agent = await prisma.agent.create({
      data: {
        name,
        instructions,
        personality,
        temperature: temperature || 0.7,
        organizationId: user.organizationId
      }
    });
    res.status(201).json(agent);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create agent' });
  }
};

export const listAgents = async (req: Request, res: Response) => {
  const user = (req as any).user;
  const agents = await prisma.agent.findMany({
    where: { organizationId: user.organizationId }
  });
  res.json(agents);
};

export const getAgent = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = (req as any).user;

  const agent = await prisma.agent.findFirst({
    where: { id, organizationId: user.organizationId }
  });

  if (!agent) return res.status(404).json({ message: 'Agent not found' });
  res.json(agent);
};

export const updateAgent = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = (req as any).user;
  const { name, instructions, personality, temperature, status } = req.body;

  try {
    const agent = await prisma.agent.updateMany({
      where: { id, organizationId: user.organizationId },
      data: { name, instructions, personality, temperature, status }
    });

    if (agent.count === 0) return res.status(404).json({ message: 'Agent not found' });
    res.json({ message: 'Agent updated' });
  } catch (error) {
    res.status(400).json({ message: 'Update failed' });
  }
};

export const deleteAgent = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = (req as any).user;

  try {
    const result = await prisma.agent.deleteMany({
      where: { id, organizationId: user.organizationId }
    });

    if (result.count === 0) return res.status(404).json({ message: 'Agent not found' });
    res.json({ message: 'Agent deleted' });
  } catch (error) {
    res.status(400).json({ message: 'Delete failed' });
  }
};
