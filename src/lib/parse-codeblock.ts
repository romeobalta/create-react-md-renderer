import type { RichTextElement } from "./parse-markdown";

export type CodeElement = {
  type: "code";
  value: CodeElementValue;
};

export type CodeElementValue = {
  language: string;
  lines: string;
};

export function parseCodeBlock(lines: string[]): RichTextElement {
  const language = lines[0].slice(3).trim() || "plaintext";
  const codeLines = lines.slice(1, -1).join("\n");

  return {
    type: "code",
    value: { language, lines: codeLines },
  };
}
