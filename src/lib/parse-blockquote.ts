export type BlockquoteElement = {
  type: "blockquote";
  value: BlockquoteElementValue;
};

export type BlockquoteElementValue = string[];

export function parseBlockquote(lines: string[]): BlockquoteElement {
  const value = lines.map((line) => line.slice(2).trim());
  return {
    type: "blockquote",
    value,
  };
}
