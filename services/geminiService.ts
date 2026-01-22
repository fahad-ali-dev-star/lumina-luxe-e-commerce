
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const generateProductDescription = async (productName: string, features: string[]): Promise<string> => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const prompt = `Create a professional and persuasive e-commerce product description for "${productName}". Key features: ${features.join(', ')}. Keep it under 150 words.`;
    const result = await model.generateContent(prompt);
    return result.response.text() || "Failed to generate description.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error generating content. Please try again.";
  }
};

export const shoppingAssistant = async (query: string, availableProducts: any[]): Promise<string> => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const context = availableProducts.map(p => `${p.name} ($${p.price}) - ${p.category}`).join(', ');
    const prompt = `You are a helpful shopping assistant for Lumina Luxe. Here is our catalog: ${context}. User asks: "${query}". Be polite, concise, and helpful. Recommend specific products from the catalog if they match the user's needs.`;
    const result = await model.generateContent(prompt);
    return result.response.text() || "I'm sorry, I couldn't process that.";
  } catch (error) {
    console.error("Assistant Error:", error);
    return "I'm having trouble thinking right now. How can I help you manually?";
  }
};
