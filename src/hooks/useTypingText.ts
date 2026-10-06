import { useEffect, useRef, useState } from "react";

/**
 * Typewriter effect.
 *
 * Perf notes:
 * - The previous implementation scheduled a timeout unconditionally, forcing a
 *   React re-render every ~68ms *forever* (~15 renders/sec) even when the hero
 *   was scrolled far out of view, and even when the browser tab was hidden.
 * - It now pauses when the target element leaves the viewport (IntersectionObserver)
 *   and when the tab is backgrounded (visibilitychange), reclaiming main-thread
 *   time for scrolling and saving battery.
 */
export function useTypingText(words: string[], speed = 68, pause = 1250) {
  const [isActive, setIsActive] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const ref = useRef<HTMLSpanElement | null>(null);
  const cursor = useRef({ wordIndex: 0, letterIndex: 0, isDeleting: false });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener("change", onChange);
    return () => mediaQuery.removeEventListener("change", onChange);
  }, []);

  // Pause when off-screen.
  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsActive(entry.isIntersecting),
      { rootMargin: "120px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Pause when the tab is hidden.
  useEffect(() => {
    const onVisibility = () => setIsActive(!document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) {
      if (ref.current) ref.current.textContent = words[0] ?? "";
      return;
    }
    if (!isActive) return;

    let timer = 0;
    const tick = () => {
      const state = cursor.current;
      const currentWord = words[state.wordIndex % words.length] ?? "";
      const delay = state.isDeleting
        ? speed * 0.48
        : state.letterIndex === currentWord.length
          ? pause
          : speed;

      timer = window.setTimeout(() => {
        if (!state.isDeleting && state.letterIndex < currentWord.length) {
          state.letterIndex += 1;
        } else if (!state.isDeleting && state.letterIndex === currentWord.length) {
          state.isDeleting = true;
        } else if (state.isDeleting && state.letterIndex > 0) {
          state.letterIndex -= 1;
        } else {
          state.isDeleting = false;
          state.wordIndex = (state.wordIndex + 1) % words.length;
        }

        if (ref.current) {
          ref.current.textContent = (words[state.wordIndex % words.length] ?? "").slice(
            0,
            state.letterIndex,
          );
        }
        tick();
      }, delay);
    };

    tick();
    return () => window.clearTimeout(timer);
  }, [isActive, pause, prefersReducedMotion, speed, words]);

  return { ref };
}
