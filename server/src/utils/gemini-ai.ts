import { GoogleGenerativeAI } from "@google/generative-ai";
import { config } from "../config/app.config";

const genAI = new GoogleGenerativeAI(config.GEMINI_API_KEY);

// Helper: Cosine similarity
function cosineSimilarity(a: number[], b: number[]): number {
  const dot = a.reduce((sum, v, i) => sum + v * b[i], 0);
  const magA = Math.sqrt(a.reduce((sum, v) => sum + v * v, 0));
  const magB = Math.sqrt(b.reduce((sum, v) => sum + v * v, 0));
  return dot / (magA * magB);
}

// NEW: Gemini similarity function
export async function getSimilarityScore(text1: string, text2: string): Promise<number> {
  console.log("🟢 Getting similarity score from Gemini...");

  try {
    const model = genAI.getGenerativeModel({ model: "text-embedding-004" });

    const [embed1, embed2] = await Promise.all([
      model.embedContent(text1),
      model.embedContent(text2),
    ]);

    const vector1 = embed1.embedding.values;
    const vector2 = embed2.embedding.values;

    const similarity = cosineSimilarity(vector1, vector2);
    const similarityInPercentage = Math.round(similarity * 100);

    return similarityInPercentage; 
  } catch (error) {
    console.error("🔴 Error computing similarity:", error);
    throw error;
  }
}

export async function test() {
  const text1 = "I am a JavaScript developer with React and Node.js experience.";
  const text2 = "Looking for a full-stack developer skilled in JavaScript, Node.js, and React.";

  const result = await getSimilarityScore(text1, text2);

  console.log("🔵 Similarity Score:", result);
  console.log("🔵 Percentage:", Math.round(result * 100) + "%");
}


