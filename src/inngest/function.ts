import { GoogleGenAI } from "@google/genai";
import { inngest } from "./client";
import { Sandbox } from "@e2b/code-interpreter";
import { getSandbox } from "./utils";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    // console.log("Gemini key loaded:", !!process.env.GEMINI_API_KEY);
    const sandboxId = await step.run("get-sandbox-id", async () => {
      const sandbox = await Sandbox.create("lovable-clone-testv2");
      return sandbox.sandboxId;
    });

    const userInput = event.data.value;

    const resultText = await step.run("generate-gemini-output", async () => {
      const prompt = `
        You are an expert next.js developer.You write readable maintainable code.you write simple Next.js & React snippets.
        Return ONLY code (no explanations)
        User input:Write the following snippet
        "${userInput}"

`;

      const result = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });

      return result.text;
    });

    const sandboxUrl = await step.run("get-sandbox-url", async () => {
      const sandbox = await getSandbox(sandboxId);
      const host = sandbox.getHost(3000);
      return `https://${host}`;
    });
    console.log("Gemini summary:", resultText);

    return {resultText,sandboxUrl};
  }
);
