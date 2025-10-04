// AboutCard.tsx
import { useEffect, useId, useRef, useState } from "react";
import styles from "./aboutCards.module.css";

type AboutCardProps = {
  title: string;
  description: React.ReactNode;
};

export default function AboutCard({ title, description }: AboutCardProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();                    // for aria-controls
  const panelRef = useRef<HTMLDivElement>(null);

  // Animate height to content (0px <-> scrollHeight px), then snap to "auto"
  useEffect(() => {
    const el = panelRef.current;
    if (!el) return;

    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

    if (reduceMotion) {
      el.style.height = open ? "auto" : "0px";
      return;
    }

    if (open) {
      const target = el.scrollHeight;
      el.style.height = target + "px";

      const onEnd = (e: TransitionEvent) => {
        if (e.propertyName !== "height") return;
        el.style.height = "auto";
        el.removeEventListener("transitionend", onEnd);
      };
      el.addEventListener("transitionend", onEnd);
    } else {
      if (getComputedStyle(el).height === "auto") {
        el.style.height = el.scrollHeight + "px";
        void el.offsetHeight;
      }
      el.style.height = "0px";
    }
  }, [open, description, title]);

  useEffect(() => {
    if (!panelRef.current) return;
    const el = panelRef.current;
    if (!open) return;

    const ro = new ResizeObserver(() => {
      if (getComputedStyle(el).height === "auto") return; // already free
      el.style.height = el.scrollHeight + "px";
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [open]);

  return (
    <article className={`${styles.card} ${open ? styles.open : ""}`}>
      <header className={styles.header}>
        <h3 className={styles.title}>{title}</h3>
        <button
          type="button"
          className={styles.toggle}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen(v => !v)}
        >
          {open ? "Hide" : "More"}
        </button>
      </header>

      <div
        id={panelId}
        ref={panelRef}
        className={styles.panel}
        aria-hidden={!open}
      >
        {/* Use a div so we can pass rich content without risking <p><p> nesting */}
        <div className={styles.description}>{description}</div>
      </div>
    </article>
  );
}
