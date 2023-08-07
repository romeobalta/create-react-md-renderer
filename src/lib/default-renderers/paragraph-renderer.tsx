import { ParagraphElementValue } from "../../lib/parse-paragraph";

export const renderParagraphElement = (
  element: ParagraphElementValue,
  key: number | string,
) => {
  switch (element.type) {
    case "bold":
      return (
        <strong key={key}>
          {element.value.map((element, index) =>
            renderParagraphElement(element, `${key}-${index}`),
          )}
        </strong>
      );
    case "italic":
      return (
        <i key={key}>
          {element.value.map((element, index) =>
            renderParagraphElement(element, `${key}-${index}`),
          )}
        </i>
      );
    case "strikethrough":
      return (
        <s key={key}>
          {element.value.map((element, index) =>
            renderParagraphElement(element, `${key}-${index}`),
          )}
        </s>
      );
    case "link":
      return (
        <a key={key} href={element.value.url} title={element.value.tooltip}>
          {element.value.title}
        </a>
      );
    case "code":
      return <code key={key}>{element.value}</code>;
    case "underline":
      return (
        <u key={key} style={{ textDecorationLine: 'underline' }}>
          {element.value.map((element, index) =>
            renderParagraphElement(element, `${key}-${index}`),
          )}
        </u>
      );
    case "text":
    default:
      return <span key={key}>{element.value}</span>;
  }
};

export interface ParagraphRendererProps {
  paragraph: ParagraphElementValue[];
}

export function DefaultParagraphRenderer({ paragraph }: ParagraphRendererProps) {
  return (
    <p>
      {paragraph.map((element, index) =>
        renderParagraphElement(element, index),
      )}
    </p>
  );
}
