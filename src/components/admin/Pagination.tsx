import Link from "next/link";

export function Pagination({
  basePath,
  q,
  page,
  totalPages,
}: {
  basePath: string;
  q: string;
  page: number;
  totalPages: number;
}) {
  if (totalPages <= 1) return null;

  const hrefFor = (p: number) => {
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    params.set("page", String(p));
    return `${basePath}?${params.toString()}`;
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginTop: "1rem" }}>
      {page > 1 ? (
        <Link href={hrefFor(page - 1)}>&larr; Prev</Link>
      ) : (
        <span style={{ color: "var(--text-faint)" }}>&larr; Prev</span>
      )}
      <span style={{ color: "var(--text-faint)" }}>
        Page {page} of {totalPages}
      </span>
      {page < totalPages ? (
        <Link href={hrefFor(page + 1)}>Next &rarr;</Link>
      ) : (
        <span style={{ color: "var(--text-faint)" }}>Next &rarr;</span>
      )}
    </div>
  );
}
