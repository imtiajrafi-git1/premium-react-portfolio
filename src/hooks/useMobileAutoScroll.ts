import { useEffect, useRef, useState } from "react";

/**
 * Premium Mobile Auto-Scroll Showcase Hook.
 *
 * Cycles and smoothly scrolls through cards one-by-one every 1.5 seconds on mobile,
 * mimicking a luxury product carousel.
 *
 * User-friendly safeguards:
 * - Detects touchstart / drag / wheel events and temporarily pauses auto-scroll.
 * - Resumes auto-scroll after 3 seconds of no user interaction.
 * - Only runs when the section is actively in the viewport (IntersectionObserver),
 *   reclaiming 100% of main thread performance when off-screen.
 */
export function useMobileAutoScroll(totalItems: number, interval = 1500) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInteracting = useRef(false);
  const timeoutRef = useRef<number | null>(null);
  const [isInView, setIsInView] = useState(false);
  const [isMobile, setIsMobile] = useState(() =>
    window.matchMedia("(max-width: 640px)").matches,
  );
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 640px)");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreferences = () => {
      setIsMobile(mobileQuery.matches);
      setPrefersReducedMotion(motionQuery.matches);
    };

    mobileQuery.addEventListener("change", updatePreferences);
    motionQuery.addEventListener("change", updatePreferences);
    return () => {
      mobileQuery.removeEventListener("change", updatePreferences);
      motionQuery.removeEventListener("change", updatePreferences);
    };
  }, []);

  // Monitor visibility to pause when off-screen
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { rootMargin: "100px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isMobile || prefersReducedMotion || !isInView || totalItems <= 1) return;

    const el = containerRef.current;
    if (!el) return;

    const handleInteraction = () => {
      isInteracting.current = true;
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
      timeoutRef.current = window.setTimeout(() => {
        isInteracting.current = false;
      }, 3000); // Resume auto-scroll after 3s of inactivity
    };

    el.addEventListener("touchstart", handleInteraction, { passive: true });
    el.addEventListener("touchmove", handleInteraction, { passive: true });
    el.addEventListener("wheel", handleInteraction, { passive: true });

    let activeIndex = 0;

    const timer = window.setInterval(() => {
      if (document.hidden || isInteracting.current) return;

      const next = (activeIndex + 1) % totalItems;
      activeIndex = next;

      const children = el.children;
      if (children && children[next]) {
        const child = children[next] as HTMLElement;
        el.scrollTo({
          left: child.offsetLeft - 16,
          behavior: "smooth",
        });
      }
    }, interval);

    return () => {
      window.clearInterval(timer);
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
      el.removeEventListener("touchstart", handleInteraction);
      el.removeEventListener("touchmove", handleInteraction);
      el.removeEventListener("wheel", handleInteraction);
    };
  }, [isInView, interval, isMobile, prefersReducedMotion, totalItems]);

  return containerRef;
}
