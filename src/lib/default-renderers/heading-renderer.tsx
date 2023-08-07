import { HeadingElementValue } from "../../lib/parse-heading";

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
