import React from "react";

type ListProps = {
  items: string[];
  ordered?: boolean; // default = false (unordered list with bullets)
  className?: string;
};

export const List: React.FC<ListProps> = ({ items, ordered = false, className = "" }) => {
  const ListTag = ordered ? "ol" : "ul";

  return (
    <ListTag
      className={`mt-5 ${ordered ? "list-decimal" : "list-disc"} list-outside pl-5 ${className}`}>
      {items.map((item, i) => (
        <li key={i} className="text-md mt-1">
          {item}
        </li>
      ))}
    </ListTag>
  );
};
