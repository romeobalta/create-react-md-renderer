import {
  BlockquoteRendererProps,
  CodeRendererProps,
  DefaultBlockquoteRenderer,
  DefaultCodeRenderer,
  DefaultHeadingRenderer,
  DefaultListRenderer,
  DefaultParagraphRenderer,
  HeadingRendererProps,
  ListRendererProps,
  ParagraphRendererProps,
} from "./default-renderers";
import { parseMarkdown } from "./parse-markdown";

interface MarkdownRendererProps {
  markdown?: string | null;
}

interface CreateRendererProps {
  paragraphRenderer?: ({ paragraph }: ParagraphRendererProps) => JSX.Element;
  listRenderer?: ({ list }: ListRendererProps) => JSX.Element;
  headingRenderer?: ({ heading }: HeadingRendererProps) => JSX.Element;
  codeRenderer?: ({ code }: CodeRendererProps) => JSX.Element;
  blockquoteRenderer?: ({ blockquote }: BlockquoteRendererProps) => JSX.Element;
}

export function createMarkdownRenderer(renderers?: CreateRendererProps) {
  const {
    paragraphRenderer = DefaultParagraphRenderer,
    listRenderer = DefaultListRenderer,
    headingRenderer = DefaultHeadingRenderer,
    codeRenderer = DefaultCodeRenderer,
    blockquoteRenderer = DefaultBlockquoteRenderer,
  } = renderers || {};

  return ({ markdown }: MarkdownRendererProps) => {
    const blocks = parseMarkdown(markdown ?? "");

    return (
      <>
        {blocks.map((element) => {
          switch (element.type) {
            case "paragraph":
              return paragraphRenderer({ paragraph: element.value });
            case "list":
              return listRenderer({ list: element.value });
            case "heading":
              return headingRenderer({ heading: element.value });
            case "code":
              return codeRenderer({ code: element.value });
            case "blockquote":
              return blockquoteRenderer({ blockquote: element.value });
            default:
              return null;
          }
        })}
      </>
    );
  };
}
