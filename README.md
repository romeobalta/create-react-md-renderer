<p align="center">
  <br/>
  <code>create-react-md-renderer</code> is a simple library that lets you render Markdown in your React app.
  <br/>
   Use the default renderers or create custom ones by element type.
  <br/><br/>
</p>

## Install

```bash
npm i --save create-react-md-renderer
# or
yarn add create-react-md-renderer
```

## Limitations

Supported syntax:

- Headings
- Bold `**bold** __bold__`
- Italic `*italic* _italic_`
- Bold and italic `**_bold and italic_**  ***bold and italic*** ___bold and italic___`
- Strikethrough `~~strikethrough~~`
- Ordered lists using decimals `1. list item`
- Unordered lists using dashes `- list item`
- Sublists by identation
- Links with or without title `[my link](https://google.com "Google homepage")`
- Inline code `\`code\``
- Code block:

~~~ts
```ts
const sum = (a: number, b: number) => a + b
```
~~~

## Usage

Basic usage:

```tsx
function App() {
  const MarkdownRenderer = createMarkdownRenderer();
  const markdown = "# Heading!";

  return <MarkdownRenderer markdown={markdown} />;
}
```

Custom renderers:

```tsx
function App() {
  const MarkdownRenderer = createMarkdownRenderer({
    headingRenderer: ({ heading }) => (
      <h1 style={{ color: "red", fontSize: 14 + heading.level }}>
        {heading.text}
      </h1>
    ),
  });

  const markdown = "# Heading!";

  return <MarkdownRenderer markdown={markdown} />;
}
```

## Default renderers

### Paragraph renderer

```tsx
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
        <span key={key}>
          {element.value.map((element, index) =>
            renderParagraphElement(element, `${key}-${index}`),
          )}
        </span>
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
        <span key={key}>
          {element.value.map((element, index) =>
            renderParagraphElement(element, `${key}-${index}`),
          )}
        </span>
      );
    case "text":
    default:
      return <span key={key}>{element.value}</span>;
  }
};

export interface ParagraphRendererProps {
  paragraph: ParagraphElementValue[];
}

export function DefaultParagraphRenderer({
  paragraph,
}: ParagraphRendererProps) {
  return (
    <p>
      {paragraph.map((element, index) =>
        renderParagraphElement(element, index),
      )}
    </p>
  );
}
```

### List renderer
```tsx
export type ListElementValue = {
  type: "ordered" | "unordered";
  items: {
    value: ParagraphElementValue[];
    subList?: ListElement;
  }[];
};

function renderList(list: ListElementValue) {
  const { type, items } = list;
  const ListTag = type === "ordered" ? "ol" : "ul";

  return (
    <ListTag>
      {items?.map((item, index) => (
        <li key={index}>
          {item.value.map((element, elementIndex) =>
            renderParagraphElement(element, `list-${index}-${elementIndex}`),
          )}
          {item.subList && renderList(item.subList.value)}
        </li>
      ))}
    </ListTag>
  );
}

export interface ListRendererProps {
  list: ListElementValue;
}

export function DefaultListRenderer({ list }: ListRendererProps) {
  return renderList(list);
}
```

### Heading renderer
```tsx
export type HeadingElementValue = {
  level: number;
  text: string;
};

export interface HeadingRendererProps {
  heading: HeadingElementValue;
}

export function DefaultHeadingRenderer({ heading }: HeadingRendererProps) {
  if (heading.level === 1) {
    return <h1>{heading.text}</h1>;
  }

  if (heading.level === 2) {
    return <h2>{heading.text}</h2>;
  }

  if (heading.level === 3) {
    return <h3>{heading.text}</h3>;
  }

  if (heading.level === 4) {
    return <h4>{heading.text}</h4>;
  }

  if (heading.level === 5) {
    return <h5>{heading.text}</h5>;
  }

  return <h6>{heading.text}</h6>;
}
```

### Code renderer
```tsx
export type CodeElementValue = {
  language: string;
  lines: string;
};

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
```

### Blockquote renderer
```tsx
export type BlockquoteElementValue = string[];

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
```
