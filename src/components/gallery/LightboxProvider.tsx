"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

export type LightboxItem = {
  src: string;
  alt: string;
  caption: string;
};

type LightboxContextValue = {
  open: (index: number) => void;
};

const LightboxContext = createContext<LightboxContextValue | null>(null);

export function useLightbox() {
  const ctx = useContext(LightboxContext);
  if (!ctx) throw new Error("useLightbox must be used within a LightboxProvider");
  return ctx;
}

export function LightboxProvider({
  items,
  children,
}: {
  items: LightboxItem[];
  children: React.ReactNode;
}) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const close = useCallback(() => setActiveIndex(null), []);
  const showNext = useCallback(
    () => setActiveIndex((i) => (i === null ? null : (i + 1) % items.length)),
    [items.length],
  );
  const showPrev = useCallback(
    () => setActiveIndex((i) => (i === null ? null : (i - 1 + items.length) % items.length)),
    [items.length],
  );

  useEffect(() => {
    document.body.style.overflow = activeIndex !== null ? "hidden" : "";
  }, [activeIndex]);

  useEffect(() => {
    if (activeIndex === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") showNext();
      if (e.key === "ArrowLeft") showPrev();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [activeIndex, close, showNext, showPrev]);

  const value = useMemo(() => ({ open: setActiveIndex }), []);
  const active = activeIndex !== null ? items[activeIndex] : null;

  return (
    <LightboxContext.Provider value={value}>
      {children}
      <div
        className={`lightbox${active ? " active" : ""}`}
        id="lightbox"
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
      >
        <button className="lightbox-close" aria-label="Close" onClick={close}>
          &times;
        </button>
        <button className="lightbox-nav lightbox-prev" aria-label="Previous" onClick={showPrev}>
          &#10094;
        </button>
        {active && (
          // eslint-disable-next-line @next/next/no-img-element -- lightbox image swaps freely between arbitrary sizes; next/image's fixed intrinsic sizing doesn't fit this use case
          <img src={active.src} alt={active.alt} id="lightboxImg" />
        )}
        <button className="lightbox-nav lightbox-next" aria-label="Next" onClick={showNext}>
          &#10095;
        </button>
        <p className="lightbox-caption">{active?.caption ?? ""}</p>
      </div>
    </LightboxContext.Provider>
  );
}
