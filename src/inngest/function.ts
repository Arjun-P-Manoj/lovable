import { GoogleGenAI } from "@google/genai";
import { inngest } from "./client";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    console.log("Gemini key loaded:", !!process.env.GEMINI_API_KEY);

    const userInput = event.data.value;

    const resultText = await step.run("generate-gemini-output", async () => {
      const prompt = `
You are an expert next.js developer.You write readable maintainable code.you write simple Next.js & React snippets

User input:Write the following snippet
"${userInput}"

`;

      const result = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });

      return result.text;
    });
    console.log("Gemini summary:", resultText);

    return resultText;
  }
);
