import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FiArrowDownRight, FiDownload } from "react-icons/fi";
import { FaFacebookF, FaGithub, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { useTypingText } from "../../hooks/useTypingText";

const RESUME_URL =
  "https://docs.google.com/document/d/184F77HXlLqMK2VxUymVlMc54EGor1FIr/edit?usp=drive_link&ouid=107357776728291535466&rtpof=true&sd=true";

const typingWords = [
  "Creative Front-End Developer",
  "UI/UX Designer",
  "Canva Designer",
  "Photographer",
  "Change Maker",
];

const socialLinks = [
  { label: "Facebook", href: "https://www.facebook.com/share/1JM7AaFrQ7/?mibextid=wwXIfr", Icon: FaFacebookF },
  { label: "GitHub", href: "https://github.com/imtiajrafi-git1", Icon: FaGithub },
  { label: "Instagram", href: "https://www.instagram.com/rafu_002", Icon: FaInstagram },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/imtiaj-ahmed-rafi", Icon: FaLinkedinIn },
  { label: "Twitter", href: "https://twitter.com/imtiajrafi", Icon: FaXTwitter },
];

const heroStats = [
  { value: 30, suffix: "+", label: "Projects" },
  { value: 20, suffix: "+", label: "Happy Clients" },
  { value: 3, suffix: "+", label: "Years Learning" },
];

/**
 * Zero-React-Re-render CountUp.
 * Directly mutates the DOM textContent during the rAF curve instead of
 * calling setState 60x/sec per counter.
 */
function CountUp({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });

  useEffect(() => {
    if (!isInView || !ref.current) return;
    const node = ref.current;
    let frame = 0;
    const start = performance.now();
    const duration = 1100;

    const tick = (time: number) => {
      const progress = Math.min((time - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(value * eased);
      node.textContent = `${current}${suffix}`;
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [isInView, value, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

export default function Hero() {
  const { ref: typingRef } = useTypingText(typingWords);

  return (
    <section className="hero section-shell" id="home" aria-label="Hero section">
      <div className="hero__visual-plane" aria-hidden="true">
        <span className="hero__orb hero__orb--one" />
        <span className="hero__orb hero__orb--two" />
        <span className="hero__grid" />
      </div>

      <motion.div
        className="hero__content"
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      >
        <h1>
          <strong>Imtiaj Ahmed Rafi</strong>
        </h1>
        <div className="hero__typing" aria-label="Typing animation">
          <span ref={typingRef} />
          <i aria-hidden="true" />
        </div>
        <p>
          I am a creative and passionate technology enthusiast dedicated to building modern, fast, and user-friendly
          digital experiences. Through web development, UI/UX design, Canva design, and photography, I am also a{" "}
          <span className="hero__desc-highlight">
            Software Engineering student at Daffodil International University
          </span>
          , constantly expanding my knowledge and technical expertise. I strive to combine creativity with
          functionality to deliver high-quality, visually engaging, and impactful work.
        </p>
        <div className="hero__actions">
          <a className="button button--primary ripple" href="#projects">
            Explore Projects
            <FiArrowDownRight aria-hidden="true" />
          </a>
          <a
            className="button button--ghost ripple"
            href={RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Download Resume
            <FiDownload aria-hidden="true" />
          </a>
        </div>

        <motion.div
          className="hero__stats-card"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: 0.22 }}
        >
          <div className="hero__stats">
            {heroStats.map((stat, index) => (
              <motion.div
                className="hero__stat"
                key={stat.label}
                initial={{ opacity: 0, y: 10, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 0.35,
                  ease: [0.22, 1, 0.36, 1],
                  delay: 0.28 + index * 0.05,
                }}
              >
                <strong>
                  <CountUp value={stat.value} suffix={stat.suffix} />
                </strong>
                <span>{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        className="hero__profile-wrap"
        initial={{ opacity: 0, x: 36, rotate: 1.5 }}
        animate={{ opacity: 1, x: 0, rotate: 0 }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      >
        <article className="profile-card glass-reflection">
          <div className="profile-card__image-shell">
            {/* LCP element: eager + high priority so it is fetched in the very
                first request wave instead of after the JS bundle executes. */}
            <img
              src="https://lh3.googleusercontent.com/d/1F01CBir4HqspqNMndjkXVkAAbvX5VmQ6=w900"
              srcSet="https://lh3.googleusercontent.com/d/1F01CBir4HqspqNMndjkXVkAAbvX5VmQ6=w640 640w, https://lh3.googleusercontent.com/d/1F01CBir4HqspqNMndjkXVkAAbvX5VmQ6=w900 900w"
              sizes="(max-width: 640px) 86vw, 450px"
              alt="Imtiaj Ahmed Rafi"
              width={900}
              height={1120}
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
          </div>
          <div className="profile-card__body">
            <div className="profile-card__social" aria-label="Social links">
              {socialLinks.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  className="profile-card__social-link"
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                >
                  <Icon aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </article>
      </motion.div>
    </section>
  );
}
