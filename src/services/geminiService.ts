import { GoogleGenAI, Type } from "@google/genai";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "";
const ai = GEMINI_API_KEY ? new GoogleGenAI({ apiKey: GEMINI_API_KEY }) : null;

export async function generateAIResponse(message: string, history: { role: 'user' | 'model', parts: { text: string }[] }[], context: string = "", profileContext: string = "") {
  try {
    if (!ai) return "I'm currently in demo mode without an API key. Please set your GEMINI_API_KEY to enable AI responses.";
    const savedProfile = localStorage.getItem('chatflow_business_profile');
    const profile = savedProfile ? JSON.parse(savedProfile) : null;
    const selectedTone = profile?.tone || "Professional";

    const getToneInstructions = (toneName: string) => {
        const tones: Record<string, string> = {
          "Professional": "Use formal language, perfect grammar, and a balanced, objective stance. Avoid slang.",
          "Friendly": "Be warm and welcoming. Use exclamation marks occasionally, smileys in spirit, and inclusive language.",
          "Luxury Brand": "Exude exclusivity and elegance. Use sophisticated vocabulary. Focus on service excellence and heritage. Be polite but slightly aloof and highly refined.",
          "Casual": "Relaxed and informal. Use contractions (it's, you're). Speak like a peer or a friend while remaining helpful.",
          "Sales Focused": "Drive toward conversion. Highlight benefits immediately. Use persuasive language and strong calls to action (CTAs).",
          "Corporate": "Strictly efficient, structured, and authoritative. Focus on protocols, SLAs, and clear organizational communication.",
          "Fast Support": "Extreme brevity. Bullet points only. Get to the answer in the first 5 words. No fluff or pleasantries."
        };
        return tones[toneName] || toneName;
    };

    const toneGuidance = getToneInstructions(selectedTone);

    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: [
        ...history,
        { role: 'user', parts: [{ text: message }] }
      ],
      config: {
        systemInstruction: `You are ChatFlow AI, a genuine, helpful customer support representative for businesses. Your goal is to provide concise, professional, and human-like assistance.

CORE RULES:
1. KNOWLEDGE BASE: Use the provided FAQ Knowledge and Business Information as your only source of truth for business-specific facts.
2. BE CONVERSATIONAL: Sound like a real human. Use warm, natural transitions. Avoid "AI-speak" or "I am an artificial intelligence".
3. BREVITY: Keep replies short and clear. Most users are on mobile. Use simple spacing.
4. HONESTY: If the answer is unknown or not in the context, politely ask the customer to contact support directly or say you'll notify a representative. NEVER invent fake information, prices, or policies.
5. CONTEXT: Adhere to the business tone and personality provided.

TONE SPECIFICATION:
- Personality: ${selectedTone}
- Behavioral Guideline: ${toneGuidance}

### BUSINESS INFORMATION:
${profileContext || "N/A"}

### FAQ KNOWLEDGE:
${context || "No FAQs provided yet. If you can't answer based on common sense for a general business, ask them to contact support."}
`,
        temperature: 0.7,
        topP: 0.95,
      },
    });

    return response.text || "I'm sorry, I encountered an error. How can I help you further?";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having trouble connecting to my brain right now. Please try again or ask to speak with a human.";
  }
}

export async function generateSuggestions(lastMessage: string) {
  try {
    if (!ai) return ["Tell me more", "Pricing info", "Human agent"];
    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: [
        { role: 'user', parts: [{ text: `Based on this customer message: "${lastMessage}", provide 3 short suggested replies (under 5 words each) for a support agent. Return them as a JSON array of strings.` }] }
      ],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: { type: Type.STRING }
        }
      }
    });

    const suggestions = JSON.parse(response.text || "[]");
    return suggestions as string[];
  } catch (error) {
    console.error("Gemini Suggestions Error:", error);
    return ["Tell me more", "Pricing info", "Human agent"];
  }
}

export async function generateConversationSummary(history: { role: 'user' | 'model'; parts: { text: string }[] }[]) {
  try {
    if (!ai) throw new Error("No AI instance");
    const transcript = history.map(m => `${m.role.toUpperCase()}: ${m.parts[0].text}`).join('\n');
    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: [
        { role: 'user', parts: [{ text: `Analyze this conversation and provide a structured intelligence report in JSON.
          Extract:
          - summary: A one-sentence high-level overview.
          - intent: Primary customer goal.
          - issues: List of key friction points or questions.
          - interests: Mentioned products or features.
          - nextSteps: Recommended actions for the human agent.

          Transcript:
          ${transcript}`
        }] }
      ],
      config: { responseMimeType: "application/json" }
    });
    return JSON.parse(response.text);
  } catch (error) {
    console.error("Gemini Summary Error:", error);
    return {
      summary: "Ongoing customer consultation.",
      intent: "Inquiry",
      issues: ["Interrupted analysis"],
      interests: [],
      nextSteps: ["Wait for customer response"]
    };
  }
}

export async function analyzeLeadPotential(history: { role: 'user' | 'model'; parts: { text: string }[] }[]) {
  try {
    if (!ai) throw new Error("No AI instance");
    const transcript = history.map(m => `${m.role.toUpperCase()}: ${m.parts[0].text}`).join('\n');
    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: [
        { role: 'user', parts: [{ text: `Analyze this conversation for sales potential. Return a JSON object with:
          - score: 0-100 (integer)
          - intent: "Hot", "Warm", or "Cold"
          - probability: 0.0-1.0 (float)
          - insight: A one-sentence insight about the sales opportunity.

          Transcript:
          ${transcript}`
        }] }
      ],
      config: { responseMimeType: "application/json" }
    });
    return JSON.parse(response.text);
  } catch (error) {
    console.error("Lead Analysis Error:", error);
    return { score: 50, intent: "Warm", probability: 0.5, insight: "Nurturing required." };
  }
}
