import { Request, Response } from 'express';
import { prisma } from '../config/db';
import { generateAIResponse } from '../services/ai.service';
import { searchKnowledge } from '../services/rag.service';
import { trackUsage } from '../middleware/usage';

export const handleChat = async (req: Request, res: Response) => {
  const { message, history, agentId } = req.body;
  const user = (req as any).user;

  try {
    const agent = await prisma.agent.findFirst({
      where: { id: agentId, organizationId: user.organizationId }
    });

    if (!agent) {
      return res.status(404).json({ message: 'Agent not found' });
    }

    const kbContext = await searchKnowledge(agentId, message).catch(() => "");

    const fullSystemInstruction = `
        ${agent.instructions}

        PERSONALITY: ${agent.personality}

        KNOWLEDGE CONTEXT:
        ${kbContext}
    `;

    const aiResponse = await generateAIResponse(message, history, fullSystemInstruction);

    // Persistence
    let conversation = await prisma.conversation.findFirst({
        where: { agentId, externalId: (req as any).conversationId || 'web-default' }
    });

    if (!conversation) {
        conversation = await prisma.conversation.create({
            data: { agentId, externalId: (req as any).conversationId || 'web-default' }
        });
    }

    await prisma.message.createMany({
        data: [
            { text: message, role: 'user', conversationId: conversation.id },
            { text: aiResponse, role: 'model', conversationId: conversation.id }
        ]
    });

    // Enterprise: Track Usage
    await trackUsage(user.organizationId, 'messages');

    res.json({ text: aiResponse, conversationId: conversation.id });
  } catch (error) {
    console.error(error);
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
