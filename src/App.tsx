import { Suspense, lazy, useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, MotionConfig } from "framer-motion";
import BackToTop from "./components/BackToTop/BackToTop";
import Footer from "./components/Footer/Footer";
import Hero from "./components/Hero/Hero";
import Loader from "./components/Loader/Loader";
import Navbar from "./components/Navbar/Navbar";
import { useLenis } from "./hooks/useLenis";

const About = lazy(() => import("./components/About/About"));
const Skills = lazy(() => import("./components/Skills/Skills"));
const Services = lazy(() => import("./components/Services/Services"));
const Projects = lazy(() => import("./components/Projects/Projects"));
const Photography = lazy(() => import("./components/Photography/Photography"));
const Contact = lazy(() => import("./components/Contact/Contact"));

function DeferredSection({
  id,
  children,
}: {
  id: string;
  children: ReactNode;
}) {
  const placeholderRef = useRef<HTMLDivElement>(null);
  const [isNearViewport, setIsNearViewport] = useState(false);

  useEffect(() => {
    const placeholder = placeholderRef.current;
    if (!placeholder) return;

    if (window.location.hash === `#${id}`) {
      setIsNearViewport(true);
      const timeout = window.setTimeout(() => {
        const target = document.getElementById(id);
        if (!target) return;
        const top = target.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({ top: Math.max(0, top - 110), behavior: "auto" });
      }, 100);
      return () => window.clearTimeout(timeout);
    }

    if (typeof IntersectionObserver === "undefined") {
      setIsNearViewport(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsNearViewport(true);
          observer.disconnect();
        }
      },
      { rootMargin: "1200px 0px" },
    );

    observer.observe(placeholder);
    return () => observer.disconnect();
  }, []);

  const placeholder = (
    <div
      ref={placeholderRef}
      id={id}
      className={`section-shell section-fallback deferred-section-placeholder deferred-section-placeholder--${id}`}
      aria-hidden="true"
    />
  );

  if (!isNearViewport) return placeholder;

  return (
    <Suspense fallback={placeholder}>
      {children}
    </Suspense>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  useLenis();

  useEffect(() => {
    // Dismiss the loader on the first painted frame instead of a fixed delay.
    // Two rAFs guarantee the browser has committed the first paint, so the
    // hero is visible immediately (no artificial 1.25s block on LCP).
    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => setIsLoading(false));
    });

    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence mode="wait">{isLoading ? <Loader key="loader" /> : null}</AnimatePresence>
      <Navbar />
      <BackToTop />
      <main>
        <Hero />
        <DeferredSection id="about"><About /></DeferredSection>
        <DeferredSection id="skills"><Skills /></DeferredSection>
        <DeferredSection id="services"><Services /></DeferredSection>
        <DeferredSection id="projects"><Projects /></DeferredSection>
        <DeferredSection id="photography"><Photography /></DeferredSection>
        <DeferredSection id="contact"><Contact /></DeferredSection>
      </main>
      <Footer />
    </MotionConfig>
  );
}
