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
