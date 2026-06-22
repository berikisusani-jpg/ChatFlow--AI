import api from './apiService';

export async function generateAIResponse(message: string, history: any[], context: string = "", profileContext: string = "") {
  try {
    const response = await api.post('/ai/chat', {
      message,
      history,
      context,
      profileContext
    });
    return response.data.text;
  } catch (error) {
    console.error("AI API Error:", error);
    return "I'm having trouble connecting to my brain right now. Please try again or ask to speak with a human.";
  }
}

export async function generateSuggestions(lastMessage: string) {
  try {
    const response = await api.post('/ai/suggestions', { lastMessage });
    return response.data.suggestions;
  } catch (error) {
    console.error("Suggestions API Error:", error);
    return ["Tell me more", "Pricing info", "Human agent"];
  }
}

export async function generateConversationSummary(history: any[]) {
  try {
    const response = await api.post('/ai/summary', { history });
    return response.data.summary;
  } catch (error) {
    console.error("Summary API Error:", error);
    return { summary: "Error generating summary" };
  }
}

export async function analyzeLeadPotential(history: any[]) {
  try {
    const response = await api.post('/ai/lead-analysis', { history });
    return response.data.analysis;
  } catch (error) {
    console.error("Lead Analysis API Error:", error);
    return { score: 0, intent: "Unknown" };
  }
}
