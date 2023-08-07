import { ParagraphElementValue, parseParagraph } from "./parse-paragraph";

export type ListElement = {
  type: "list";
  value: ListElementValue;
};

export type ListElementValue = {
  type: "ordered" | "unordered";
  items: {
    value: ParagraphElementValue[];
    subList?: ListElement;
  }[];
};

export function parseList(lines: string[]): ListElement {
  const items: ListElementValue["items"] = [];
  const listType = lines[0].startsWith("-") ? "unordered" : "ordered";

  let currentItem: ParagraphElementValue[] = [];
  let subListLines: string[] = [];

  for (const line of lines) {
    if (
      line.startsWith("-") ||
      (listType === "ordered" && /^\d+\./.test(line))
    ) {
      if (subListLines.length > 0) {
        const subList = parseList(subListLines);
        items.push({ value: currentItem, subList });
        subListLines = [];
        currentItem = [];
      }

      if (currentItem.length > 0) {
        items.push({ value: currentItem });
        currentItem = [];
      }

      const itemValue = parseParagraph(
        line.slice(line.indexOf(" ") + 1).trim(),
      );
      currentItem.push(...itemValue);
    } else if (line.startsWith("  ")) {
      subListLines.push(line.slice(2));
    }
  }

  if (subListLines.length > 0) {
    const subList: ListElement = parseList(subListLines);
    items.push({ value: currentItem, subList });
  } else if (currentItem.length > 0) {
    items.push({ value: currentItem });
  }

  return {
    type: "list" as const,
    value: {
      type: listType,
      items,
    },
  };
}
