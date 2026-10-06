import { useEffect } from "react";
import type Lenis from "lenis";

export function useLenis() {
  useEffect(() => {
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    const isMobileWidth = window.matchMedia("(max-width: 768px)").matches;

    /* Native scrolling is smoother and less error-prone on mobile touch devices. */
    if (isTouchDevice || isMobileWidth) {
      delete (window as unknown as { lenis?: Lenis }).lenis;
      return;
    }

    let cancelled = false;
    let frame = 0;
    let lenis: Lenis | undefined;
    const raf = (time: number) => {
      if (cancelled || document.hidden || !lenis) return;
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };

    const onVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(frame);
        frame = 0;
      } else if (lenis && frame === 0) {
        frame = requestAnimationFrame(raf);
      }
    };

    document.addEventListener("visibilitychange", onVisibilityChange);

    void import("lenis")
      .then(({ default: LenisConstructor }) => {
        if (cancelled) return;

        lenis = new LenisConstructor({
          duration: 0.95,
          easing: (time: number) => Math.min(1, 1.001 - Math.pow(2, -10 * time)),
          smoothWheel: true,
          wheelMultiplier: 1,
        });

        /* Expose Lenis globally so components (e.g. Back-to-Top) can scroll */
        (window as unknown as { lenis?: Lenis }).lenis = lenis;
        onVisibilityChange();
      })
      .catch(() => {
        /* Native scrolling remains available if the optional smooth-scroll chunk fails. */
      });

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      lenis?.destroy();
      delete (window as unknown as { lenis?: Lenis }).lenis;
    };
  }, []);
}
