export type ParagraphTextElementValue =
  | {
      type: "text";
      value: string;
    }
  | {
      type: "bold";
      value: ParagraphTextElementValue[];
    }
  | {
      type: "italic";
      value: ParagraphTextElementValue[];
    }
  | {
      type: "strikethrough";
      value: ParagraphTextElementValue[];
    }
  | {
      type: "underline";
      value: ParagraphTextElementValue[];
    };

export type ParagraphElement = {
  type: "paragraph";
  value: ParagraphElementValue[];
};

export type ParagraphElementValue =
  | ParagraphTextElementValue
  | {
      type: "link";
      value: {
        url: string;
        title: string;
        tooltip?: string;
      };
    }
  | {
      type: "code";
      value: string;
    };

export function parseParagraph(line: string): ParagraphElementValue[] {
  return parseElements(line);
}

function parseTextElements(line: string): ParagraphTextElementValue[] {
  const elements: ParagraphTextElementValue[] = [];

  // TODO: handle underline
  const regex =
    /\*\*(.+?)\*\*|__(.+?)__|\*(.+?)\*|_(.+?)_|~~(.+?)~~|<u>(.+?)<\/u>|([^`[\]*_~]+)/g;

  let match;
  while ((match = regex.exec(line)) !== null) {
    const [
      _,
      boldValueAsterisks,
      boldValueUnderscores,
      italicValueAsterisks,
      italicValueUnderscores,
      strikethroughValue,
      underlineValue,
      textValue,
    ] = match;

    if (
      boldValueAsterisks !== undefined ||
      boldValueUnderscores !== undefined
    ) {
      elements.push({
        type: "bold",
        value: parseTextElements(boldValueAsterisks || boldValueUnderscores),
      });
    } else if (
      italicValueAsterisks !== undefined ||
      italicValueUnderscores !== undefined
    ) {
      elements.push({
        type: "italic",
        value: parseTextElements(
          italicValueAsterisks || italicValueUnderscores,
        ),
      });
    } else if (strikethroughValue !== undefined) {
      elements.push({
        type: "strikethrough",
        value: parseTextElements(strikethroughValue),
      });
    } else if (underlineValue !== undefined) {
      elements.push({
        type: "underline",
        value: parseTextElements(underlineValue),
      });
    } else if (textValue !== undefined) {
      elements.push({ type: "text", value: textValue });
    }
  }

  return elements;
}

function parseElements(line: string): ParagraphElementValue[] {
  const elements: ParagraphElementValue[] = [];

  const regex = /\[(.+?)\]\((.+?)(?: "([^"]*)")?\)|`(.+?)`|([^`[\]]+)/g;

  let match;
  while ((match = regex.exec(line)) !== null) {
    const [_, linkTitle, linkUrl, linkTooltip, codeValue, textValue] = match;

    if (linkTitle !== undefined) {
      elements.push({
        type: "link",
        value: {
          url: linkUrl,
          title: linkTitle,
          ...(linkTooltip ? { tooltip: linkTooltip } : {}),
        },
      });
    } else if (codeValue !== undefined) {
      elements.push({ type: "code", value: codeValue });
    } else if (textValue !== undefined) {
      elements.push(...parseTextElements(textValue));
    }
  }

  return elements;
}
