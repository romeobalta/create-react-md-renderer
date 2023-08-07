import { CodeElementValue } from "../../lib/parse-codeblock";

export interface CodeRendererProps {
  code: CodeElementValue;
}

export function DefaultCodeRenderer({ code }: CodeRendererProps) {
  return (
    <pre>
      <code lang={code.language}>{code.lines}</code>
    </pre>
  );
}
