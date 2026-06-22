import { GoogleGenAI } from "@google/genai";
import { config } from "../config";

const genAI = new GoogleGenAI({ apiKey: config.geminiApiKey || "placeholder" });

export const generateAIResponse = async (message: string, history: any[], systemInstruction: string) => {
  const model = (genAI as any).getGenerativeModel({ model: "gemini-1.5-flash" });

  const chat = model.startChat({
    history: history,
    generationConfig: {
      temperature: 0.7,
      topP: 0.95,
    },
  });

  const result = await chat.sendMessage(message);
  return result.response.text();
};
