import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function askElectionAssistant(question: string, history: { role: 'user' | 'model', parts: { text: string }[] }[] = []) {
  try {
    const chat = ai.chats.create({
      model: "gemini-3-flash-preview",
      config: {
        systemInstruction: `You are 'VoteBuddy', a friendly, non-political, neutral, and educational AI assistant for the 'Election Explorer' app. 
        Your goal is to explain election processes, terms (like NOTA, EVM, FPTP), and civics in simple language that a 12-year old could understand. 
        Keep your tone encouraging and objective. Do not favor any political party or candidate. 
        If asked about specific current politicians, redirect back to explaining the roles and processes.
        Use markdown for formatting.`,
      },
    });

    const result = await chat.sendMessage({
      message: question,
    });

    return result.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm sorry, I'm having trouble connecting to my learning center right now. Please try asking again in a moment!";
  }
}
