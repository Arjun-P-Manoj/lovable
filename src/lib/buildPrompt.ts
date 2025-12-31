import {PROMPT} from "@/prompt";

export function buildPrompt(userInput: string) {
  return `
${PROMPT}

User task:
${userInput}
`;
}
