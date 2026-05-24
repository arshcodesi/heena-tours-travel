import { useEffect, useRef, useState } from "react";

/**
 * Reveal: adds a smooth entrance animation once element enters viewport.
 * Uses IntersectionObserver (no extra libs).
 */
export default function Reveal({ className = "", children, animation = "animate-fade-up" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect reduced motion preference
    const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (prefersReduced) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.12 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={[
        className,
        visible ? `motion-safe:${animation}` : "opacity-0 translate-y-3"
      ].join(" ")}
    >
      {children}
    </div>
  );
}