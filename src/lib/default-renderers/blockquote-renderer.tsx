import { BlockquoteElementValue } from "../../lib/parse-blockquote";

export interface BlockquoteRendererProps {
  blockquote: BlockquoteElementValue;
}

export function DefaultBlockquoteRenderer({
  blockquote,
}: BlockquoteRendererProps) {
  return (
    <>
      {blockquote.map((paragraph, index) => (
        <p key={index}>
          <em>{paragraph}</em>
        </p>
      ))}
    </>
  );
}
