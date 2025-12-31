import { GoogleGenAI } from "@google/genai";
import { inngest } from "./client";
import { Sandbox } from "@e2b/code-interpreter";
import { getSandbox } from "./utils";
import { buildPrompt } from "@/lib/buildPrompt";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    
    // const sandboxId = await step.run("get-sandbox-id", async () => {
    //   const sandbox = await Sandbox.create("lovable-clone-testv2");
    //   return sandbox.sandboxId;
    // });

    const userInput = event.data.value;

    const resultText = await step.run("generate-gemini-output", async () => {
      const prompt = buildPrompt(userInput);
      const result = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });

      return result.text;
    });

    // const sandboxUrl = await step.run("get-sandbox-url", async () => {
    //   const sandbox = await getSandbox(sandboxId);
    //   const host = sandbox.getHost(3000);
    //   return `https://${host}`;
    // });

    return { resultText,
      //  sandboxUrl 
      };
  }
);
