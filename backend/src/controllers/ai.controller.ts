import { Request, Response } from 'express';
import { prisma } from '../config/db';
import { generateAIResponse } from '../services/ai.service';

export const handleChat = async (req: Request, res: Response) => {
  const { message, history, context, profileContext, agentId } = req.body;
  const user = (req as any).user;

  try {
    const aiResponse = await generateAIResponse(message, history, "System instruction placeholder");

    await prisma.analytics.create({
      data: {
        type: 'message',
        value: 1,
        metadata: { agentId, organizationId: user.organizationId }
      }
    });

    res.json({ text: aiResponse });
  } catch (error) {
    res.status(500).json({ message: 'AI Generation Failed' });
  }
};

export const handleSuggestions = async (req: Request, res: Response) => {
  res.json({ suggestions: ["Pricing", "Features", "Support"] });
};

export const handleSummary = async (req: Request, res: Response) => {
  res.json({ summary: { summary: "Customer is interested in pricing.", intent: "Inquiry" } });
};

export const handleLeadAnalysis = async (req: Request, res: Response) => {
  res.json({ analysis: { score: 85, intent: "Hot" } });
};
