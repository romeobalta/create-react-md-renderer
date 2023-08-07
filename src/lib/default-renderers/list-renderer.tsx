import { ListElementValue } from "../../lib/parse-list";
import { renderParagraphElement } from "./paragraph-renderer";

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
