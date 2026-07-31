import { CheckCircleIcon } from "@/components/icons";

export function HighlightStrip({ items }: { items: string[] }) {
  return (
    <div className="highlight-strip">
      <div className="container highlight-strip-inner">
        {items.map((item) => (
          <span className="highlight-strip-item" key={item}>
            <CheckCircleIcon />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
