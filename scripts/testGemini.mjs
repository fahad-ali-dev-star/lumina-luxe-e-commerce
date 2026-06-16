import 'dotenv/config';
import { GoogleGenerativeAI } from '@google/generative-ai';

const key = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
if (!key) {
  console.error('No GEMINI API key found in environment (GEMINI_API_KEY or VITE_GEMINI_API_KEY).');
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(key);

async function main() {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const prompt = 'Provide a single-line acknowledgement: "API test successful".';
    const result = await model.generateContent(prompt);
    const text = await result.response.text();
    console.log('API response text:', text);
  } catch (err) {
    console.error('API call failed:', err);
    process.exit(2);
  }
}

main();
