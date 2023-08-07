export type HeadingElement = {
  type: "heading";
  value: HeadingElementValue;
};

export type HeadingElementValue = {
  level: number;
  text: string;
};

export function parseHeading(line: string): HeadingElement {
  const level = line.split(" ")[0].length;
  const text = line.slice(level + 1);

  return {
    type: "heading" as const,
    value: { level, text },
  };
}
