import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";
import { siteConfig } from "../../../config/site";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const systemInstruction = `
${siteConfig.aiAssistant.role}
${siteConfig.aiAssistant.persona}

${siteConfig.aiAssistant.guidelines}
`;

export async function POST(req) {
  try {
    const { history, message } = await req.json();

    if (!message) {
      return NextResponse.json({ error: "Mensagem é obrigatória" }, { status: 400 });
    }

    const formattedHistory = history.map((msg) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.text }],
    }));

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        ...formattedHistory,
        { role: "user", parts: [{ text: message }] },
      ],
      config: {
        systemInstruction: systemInstruction,
      },
    });

    return NextResponse.json({ reply: response.text });
  } catch (error) {
    console.warn("[API Chat] Erro ou limite excedido na chamada do Gemini:", error.message || error);
    return NextResponse.json({ 
      reply: siteConfig.aiAssistant.fallbackMessage
    });
  }
}
