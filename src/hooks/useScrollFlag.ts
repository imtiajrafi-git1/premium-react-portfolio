import { useEffect, useState } from "react";

/**
 * rAF-throttled scroll flag.
 *
 * A raw `scroll` listener that calls setState fires 60–120x/second and forces
 * React to re-render on every frame. This hook coalesces all scroll events into
 * a single rAF tick and only calls setState when the boolean actually flips,
 * eliminating scroll-driven re-render jank.
 */
export function useScrollFlag(threshold: number): boolean {
  const [active, setActive] = useState(false);

  useEffect(() => {
    let frame = 0;
    let current = false;

    const read = () => {
      frame = 0;
      const next = window.scrollY > threshold;
      if (next !== current) {
        current = next;
        setActive(next);
      }
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(read);
    };

    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [threshold]);

  return active;
}
