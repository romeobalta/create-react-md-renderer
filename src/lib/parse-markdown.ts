import { BlockquoteElement, parseBlockquote } from "./parse-blockquote";
import { CodeElement, parseCodeBlock } from "./parse-codeblock";
import { HeadingElement, parseHeading } from "./parse-heading";
import { ListElement, parseList } from "./parse-list";
import { ParagraphElement, parseParagraph } from "./parse-paragraph";


export type RichTextElement =
  | ParagraphElement
  | ListElement
  | HeadingElement
  | BlockquoteElement
  | CodeElement;

export type Markdown = RichTextElement[];

export function parseMarkdown(markdown: string): Markdown {
  const lines = markdown.split("\n");
  const richText: Markdown = [];

  let codeBlockLines: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.startsWith("```")) {
      codeBlockLines.push(line);
      if (codeBlockLines.length > 1) {
        richText.push(parseCodeBlock(codeBlockLines));
        codeBlockLines = [];
      }
      continue;
    }

    if (codeBlockLines.length > 0) {
      codeBlockLines.push(line);
      continue;
    }

    if (line.startsWith("#")) {
      richText.push(parseHeading(line));
    } else if (line.startsWith(">")) {
      const blockLines = [line];
      while (lines[++i] && lines[i].startsWith(">")) {
        blockLines.push(lines[i]);
      }
      i--;
      richText.push(parseBlockquote(blockLines));
    } else if (line.startsWith("-") || /^\d+\./.test(line)) {
      const listLines = [line];
      while (
        lines[++i] &&
        (lines[i].startsWith("-") ||
          /^\d+\./.test(line) ||
          lines[i].startsWith("  "))
      ) {
        listLines.push(lines[i]);
      }
      i--;
      richText.push(parseList(listLines));
    } else if (line.trim() !== "") {
      richText.push({
        type: "paragraph",
        value: parseParagraph(line),
      });
    }
  }

  return richText;
}

