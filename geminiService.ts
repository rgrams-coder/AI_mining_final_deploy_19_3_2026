
import { GoogleGenAI, Type } from "@google/genai";

// Strictly use process.env.API_KEY as per guidelines
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getNoteSummary = async (content: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Summarize the following note content concisely in 2 sentences: ${content}`,
    });
    // Access .text property directly as per latest SDK guidelines
    return response.text;
  } catch (error) {
    console.error("Gemini summary error:", error);
    return "Summary unavailable.";
  }
};

export const getFinancialAdvice = async (royalty: number, month: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Given a monthly royalty of $${royalty} for ${month}, suggest one strategic move for a digital creator to increase their income by 10% next month. Keep it short.`,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini financial advice error:", error);
    return "Keep producing great content!";
  }
};

export const getStarRatingFeedback = async (ratings: { [key: number]: number }) => {
  try {
    // Explicitly type reducers to prevent 'unknown' type issues during arithmetic operations
    const total = Object.values(ratings).reduce((a: number, b: number) => a + b, 0);
    const avg = total === 0 ? 0 : Object.entries(ratings).reduce((acc: number, [star, count]) => acc + (Number(star) * count), 0) / total;
    
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `An author has an average rating of ${avg.toFixed(2)} out of 5 stars from ${total} reviews. Provide a short encouraging feedback message about their brand reputation.`,
    });
    return response.text;
  } catch (error) {
    return "Your readers value your work!";
  }
};
