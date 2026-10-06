import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiExternalLink } from "react-icons/fi";
import SectionHeader from "../SectionHeader";
import { useMobileAutoScroll } from "../../hooks/useMobileAutoScroll";
import {
  FiCode,
  FiActivity,
  FiTool,
  FiCloud,
  FiImage,
  FiLayers,
  FiAward,
  FiCamera,
  FiBookmark,
} from "react-icons/fi";
import { FaAws } from "react-icons/fa";
import {
  SiReact,
  SiJavascript,
  SiHtml5,
  SiCss,
  SiFigma,
  SiVite,
  SiGit,
  SiNodedotjs,
} from "react-icons/si";

/* ---------- data ---------- */
type SkillItem = {
  title: string;
  description: string;
  level: number;
  accent: string;
};

const skills: SkillItem[] = [
  { title: "HTML5", description: "Semantic & SEO ready", level: 95, accent: "#e44d26" },
  { title: "CSS3", description: "Grid • Flex • Variables", level: 93, accent: "#264de4" },
  { title: "JavaScript", description: "ES6+ • DOM • Async", level: 88, accent: "#f0db4f" },
  { title: "Responsive Design", description: "Mobile-first always", level: 96, accent: "#0891b2" },
  { title: "CSS Animation", description: "Keyframes • Transitions", level: 90, accent: "#7c3aed" },
  { title: "Accessibility", description: "WC8 · ARIA · Keyboard", level: 85, accent: "#059669" },
];

type StackGroup = {
  category: string;
  title: string;
  summary: string;
  icon: React.ComponentType;
  accent: string;
  items: { name: string; note: string; icon: React.ComponentType }[];
};

const stack: StackGroup[] = [
  {
    category: "Front-End",
    title: "Interface Engineering",
    summary: "Fast, semantic interfaces built as maintainable systems.",
    icon: FiCode,
    accent: "#4f46e5",
    items: [
      { name: "React Interfaces", note: "Component architecture", icon: SiReact },
      { name: "ES6+ Engineering", note: "Async and clean logic", icon: SiJavascript },
      { name: "Semantic HTML", note: "SEO-ready structure", icon: SiHtml5 },
      { name: "Modern CSS Systems", note: "Fluid, responsive UI", icon: SiCss },
    ],
  },
  {
    category: "UI / Design",
    title: "Visual Experience Lab",
    summary: "Clear visual systems with expressive, purposeful motion.",
    icon: FiActivity,
    accent: "#db2777",
    items: [
      { name: "Figma Systems", note: "Flows and components", icon: SiFigma },
      { name: "Canva Brand Studio", note: "Campaign-ready visuals", icon: FiImage },
      { name: "Motion Language", note: "Transitions with intent", icon: FiActivity },
      { name: "Glass UI Direction", note: "Depth without clutter", icon: FiLayers },
    ],
  },
  {
    category: "Tools",
    title: "Build & Motion Toolkit",
    summary: "A focused workflow for fast builds and cinematic interaction.",
    icon: FiTool,
    accent: "#0891b2",
    items: [
      { name: "Vite Pipeline", note: "Rapid production builds", icon: SiVite },
      { name: "Git Workflow", note: "Confident collaboration", icon: SiGit },
      { name: "GSAP Storytelling", note: "Scroll-driven scenes", icon: FiActivity },
      { name: "Framer Motion", note: "React micro-interactions", icon: FiActivity },
    ],
  },
  {
    category: "Currently Learning",
    title: "Next Frontier",
    summary: "Expanding beyond the browser into products, cloud and APIs.",
    icon: FiCloud,
    accent: "#d97706",
    items: [
      { name: "Full-Stack Systems", note: "End-to-end products", icon: FiLayers },
      { name: "AWS Cloud Path", note: "Deploy and scale", icon: FaAws },
      { name: "React Native", note: "Mobile experiences", icon: SiReact },
      { name: "Node.js APIs", note: "Server-side foundations", icon: SiNodedotjs },
    ],
  },
];

type CertItem = {
  kind: string;
  title: string;
  issuer: string;
  description: string;
  year?: string;
  recipient: string;
  icon: React.ComponentType;
  accent: string;
  driveId: string;
};

const certifications: CertItem[] = [
  {
    kind: "UNICEF & ICT",
    title: "Safer Internet for Children",
    issuer: "ICT Division & UNICEF Bangladesh",
    description: "This certifies that Imtiaj Ahmed completed the national course on Safer Internet for Children, empowered by Bangladesh's ICT Division and UNICEF.",
    year: "2020",
    recipient: "Imtiaj Ahmed",
    icon: FiBookmark,
    accent: "#0891b2",
    driveId: "1lYvwKl3yHowI-QVT2WliREE8PyAYW_cI",
  },
  {
    kind: "Participation",
    title: "Certificate of Participation",
    issuer: "Youth Collaboration Camp & Project Twilight",
    description: "Recognized for participating in the ONE STOP Merchandise Presents Cultural Cloud Carnival, organized by Youth Collaboration Camp and Project Twilight.",
    year: "2024",
    recipient: "Imtiaj Rafi",
    icon: FiImage,
    accent: "#059669",
    driveId: "1gXg3J3ERlVO1fTDeD6ncLkkdS1NwbqoD",
  },
  {
    kind: "1st Winner",
    title: "Achievement Certificate",
    issuer: "Colony of Art & Roadside Kitchen (Title Sponsor)",
    description: "People's Choice winner in the DSLR Photography Competition at the 1st Mega Cultural Event, hosted by Colony of Art and Roadside Kitchen.",
    year: "2020",
    recipient: "Imtiaj Ahmed",
    icon: FiCamera,
    accent: "#db2777",
    driveId: "1ga2WCewFe8GCx5gxCW5lS3I-DUDFsKaM",
  },
  {
    kind: "Google Cloud",
    title: "Google Cloud Certified",
    issuer: "Google Cloud Official Certification",
    description: "Successfully completed all requirements to be recognized as a Google Cloud Certified Professional Machine Learning Engineer.",
    year: "2024",
    recipient: "Imtiaj Ahmed",
    icon: FiCloud,
    accent: "#4285F4",
    driveId: "1wIoi_LIGSJRz44AIJ96d0oH-GnMyws2U",
  },
  {
    kind: "Official Award",
    title: "Certificate of Award",
    issuer: "DIUPS · Daffodil International University",
    description: "Awarded for outstanding photographic activities, visual artistry, and dedicated contribution to university-wide photography competitions.",
    year: "2025",
    recipient: "Imtiaj Ahmed",
    icon: FiAward,
    accent: "#1e40af",
    driveId: "1ARZkp4ifRMrq9JRZMH9YuWYHje6vI--T",
  },
  {
    kind: "Appreciation",
    title: "Certificate of Appreciation",
    issuer: "Daffodil International University · Dept. of SWE",
    description: "Presented to Imtiaj Ahmed in recognition of achievement in the field of education and demonstrated competency.",
    year: "2025",
    recipient: "Imtiaj Ahmed",
    icon: FaAws,
    accent: "#A08147",
    driveId: "1x5yyiVSVHeyDWkgffuWDs_EJYeFREMcb",
  },
  {
    kind: "Programming",
    title: "Certificate of Participation",
    issuer: "DIU Software Engineering Club",
    description: "Recognized for participating in the DIU Code Trap Programming Contest, Spring 2025, organized by the DIU Software Engineering Club.",
    year: "Spring 2025",
    recipient: "Imtiaj Ahmed",
    icon: FiCode,
    accent: "#4f46e5",
    driveId: "16X80huJsdQKy2Xeog-xHFiPgtortb49Q",
  },
];

/* Publicly shared Drive image endpoint used for certificate thumbnails/previews. */
const driveImg = (id: string, size = 800) =>
  `https://drive.google.com/thumbnail?id=${id}&sz=w${size}`;

const EASE = [0.22, 1, 0.36, 1] as const;

const cardSequenceVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12 },
  },
};

const sequenceCardVariants = {
  hidden: ({ index, isMobile }: { index: number; isMobile: boolean }) => ({
    opacity: 0,
    x: isMobile ? (index % 2 === 0 ? -32 : 32) : 0,
    y: isMobile ? 0 : 16,
    scale: 0.98,
  }),
  show: {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    transition: { duration: 0.38, ease: EASE },
  },
};

const certSequenceCardVariants = {
  hidden: ({ isMobile }: { index: number; isMobile: boolean }) => ({
    opacity: 0,
    x: isMobile ? -32 : 0,
    y: isMobile ? 0 : 16,
    scale: 0.98,
  }),
  show: {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    transition: { duration: 0.38, ease: EASE },
  },
};

/* ---------- sub-renders ---------- */
function CorePanel() {
  const autoScrollRef = useMobileAutoScroll(skills.length, 1500);

  return (
    <div className="skills__bars horizontal-scroll-container" ref={autoScrollRef}>
      {skills.map((skill, index) => {
        const circumference = 2 * Math.PI * 36;
        const offset = circumference - (skill.level / 100) * circumference;

        return (
          <motion.article
            className="skill-card-v3"
            key={skill.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05, margin: "50px 0px" }}
            transition={{ delay: Math.min(index, 3) * 0.03, duration: 0.35 }}
            style={{ "--skill-accent": skill.accent } as React.CSSProperties}
          >
            <div className="skill-card-v3__ring">
              <svg width="84" height="84" viewBox="0 0 84 84">
                <circle cx="42" cy="42" r="36" fill="none" stroke="rgba(32, 26, 18, 0.06)" strokeWidth="5" />
                <motion.circle
                  cx="42"
                  cy="42"
                  r="36"
                  fill="none"
                  stroke={skill.accent}
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  initial={{ strokeDashoffset: circumference }}
                  whileInView={{ strokeDashoffset: offset }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + index * 0.04, duration: 1, ease: EASE }}
                  style={{ transform: "rotate(-90deg)", transformOrigin: "center" }}
                />
              </svg>
              <span className="skill-card-v3__pct">{skill.level}%</span>
            </div>
            <div className="skill-card-v3__info">
              <h3>{skill.title}</h3>
              <p>{skill.description}</p>
            </div>
          </motion.article>
        );
      })}
    </div>
  );
}

function StackPanel({ isMobile }: { isMobile: boolean }) {
  const autoScrollRef = useMobileAutoScroll(stack.length, 1500);

  return (
    <motion.div
      className="skills__stack horizontal-scroll-container"
      ref={autoScrollRef}
      variants={cardSequenceVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.05, margin: "50px 0px" }}
    >
      {stack.map((group, gi) => (
        <motion.article
          className="stack-category"
          key={group.category}
          custom={{ index: gi, isMobile }}
          variants={sequenceCardVariants}
          style={{ "--accent": group.accent } as React.CSSProperties}
        >
          <div className="stack-category__head">
            <h3>
              <group.icon aria-hidden="true" /> {group.category}
            </h3>
          </div>
          <strong className="stack-category__title">{group.title}</strong>
          <p className="stack-category__summary">{group.summary}</p>
          <div className="stack-category__list">
            {group.items.map((item) => (
              <span className="stack-chip" key={item.name}>
                <item.icon aria-hidden="true" />
                <em>
                  <b>{item.name}</b>
                  <small>{item.note}</small>
                </em>
              </span>
            ))}
          </div>
        </motion.article>
      ))}
    </motion.div>
  );
}

function CertsPanel({ isMobile }: { isMobile: boolean }) {
  const [active, setActive] = useState<CertItem | null>(null);
  const autoScrollRef = useMobileAutoScroll(certifications.length, 1500);

  /* Lock scroll + close on Escape while lightbox is open */
  useEffect(() => {
    if (!active) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [active]);

  return (
    <>
      <div className="certifications__grid horizontal-scroll-container" ref={autoScrollRef}>
        {certifications.map((cert, ci) => (
          <motion.button
            type="button"
            className="cert-card cert-card--real"
            key={`${cert.title}-${ci}`}
            onClick={() => setActive(cert)}
            custom={{ index: ci, isMobile }}
            variants={certSequenceCardVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.05, margin: "50px 0px" }}
            whileHover={{ y: -6, scale: 1.02 }}
            style={{ "--cert-accent": cert.accent } as React.CSSProperties}
            aria-label={`View certificate: ${cert.title}`}
          >
            <span className="cert-card__preview">
              <img
                src={driveImg(cert.driveId)}
                srcSet={`${driveImg(cert.driveId, 480)} 480w, ${driveImg(cert.driveId, 800)} 800w`}
                sizes="(max-width: 640px) 82vw, 300px"
                alt={`${cert.title} certificate preview`}
                loading="lazy"
                fetchPriority="low"
                decoding="async"
                width={640}
                height={420}
              />
              <span className="cert-card__preview-shade" />
              <span className="cert-card__kind">{cert.kind}</span>
            </span>
            <span className="cert-card__content">
              <span className="cert-card__awarded">Awarded to: <strong>{cert.recipient}</strong></span>
              <span className="cert-card__title-row">
                <span className="cert-card__seal"><cert.icon aria-hidden="true" /></span>
                <span className="cert-card__title-group">
                  <strong className="cert-card__title">{cert.title}</strong>
                  <span className="cert-card__issuer">{cert.issuer}</span>
                </span>
              </span>
              <span className="cert-card__description">{cert.description}</span>
              <span className="cert-card__footer">
                {cert.year ? <span className="cert-card__year">{cert.year}</span> : <span />}
                <span className="cert-card__view">View Certificate <FiExternalLink aria-hidden="true" /></span>
              </span>
            </span>
          </motion.button>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {active && (
          <motion.div
            className="cert-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setActive(null)}
            role="dialog"
            aria-modal="true"
            aria-label={`${active.title} certificate`}
          >
            <button
              type="button"
              className="cert-lightbox__close"
              onClick={() => setActive(null)}
              aria-label="Close certificate"
            >
              <FiX />
            </button>
              <div className="cert-lightbox__inner">
                <motion.img
                  className="cert-lightbox__image"
                  src={driveImg(active.driveId, 2000)}
                  alt={`${active.title} certificate awarded to ${active.recipient}`}
                  width={1600}
                  height={1100}
                  loading="eager"
                  decoding="async"
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.25 }}
                  onClick={(event) => event.stopPropagation()}
                  onError={(event) => {
                    /* If the thumbnail endpoint is temporarily unavailable,
                       take the viewer directly to the publicly shared file. */
                    window.open(
                      `https://drive.google.com/file/d/${active.driveId}/view`,
                      "_blank",
                      "noopener,noreferrer",
                    );
                    event.currentTarget.alt = "Certificate preview unavailable. Open the certificate in Google Drive.";
                  }}
                />
                <a
                  className="cert-lightbox__open"
                  href={`https://drive.google.com/file/d/${active.driveId}/view`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open full certificate in Google Drive
                </a>
              </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

type SkillTab = "core" | "stack" | "certs";

const skillTabOrder: Record<SkillTab, number> = {
  certs: 0,
  core: 1,
  stack: 2,
};

const verticalPanelVariants = {
  enter: { opacity: 0, y: 16 },
  center: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: EASE },
  },
  exit: {
    opacity: 0,
    y: -12,
    transition: { duration: 0.24, ease: EASE },
  },
};

const horizontalPanelVariants = {
  enter: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? 70 : -70,
    scale: 0.98,
  }),
  center: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.45, ease: EASE },
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? -70 : 70,
    scale: 0.98,
    transition: { duration: 0.32, ease: EASE },
  }),
};

export default function Skills() {
  const [tab, setTab] = useState<SkillTab>("certs");
  const [tabDirection, setTabDirection] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 640px)");
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const selectTab = (nextTab: SkillTab) => {
    if (nextTab === tab) return;
    setTabDirection(skillTabOrder[nextTab] > skillTabOrder[tab] ? 1 : -1);
    setTab(nextTab);
  };

  return (
    <section className="skills section-shell" id="skills">
      <SectionHeader
        className="skills-header"
        eyebrow="Skills"
        title="Skills & Stack"
        description="From semantic markup to silky animations, here's what I use to ship polished, accessible interfaces."
      />

      <div className="skills-card glass-reflection">
        {/* Tab switcher - Order: Certifications → Core Craft → Creative Stack */}
        <div className="skills-tabs" role="tablist" aria-label="Skills views">
          <button
            type="button"
            role="tab"
            aria-selected={tab === "certs"}
            className={`skills-tab${tab === "certs" ? " is-active" : ""}`}
            onClick={() => selectTab("certs")}
          >
            Certifications
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={tab === "core"}
            className={`skills-tab${tab === "core" ? " is-active" : ""}`}
            onClick={() => selectTab("core")}
          >
            Core Craft
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={tab === "stack"}
            className={`skills-tab${tab === "stack" ? " is-active" : ""}`}
            onClick={() => selectTab("stack")}
          >
            Creative Stack
          </button>
        </div>

        <AnimatePresence mode="wait" custom={tabDirection}>
          {tab === "core" && (
            <motion.div
              key="core"
              className="skills-panel"
              custom={tabDirection}
              variants={verticalPanelVariants}
              initial="enter"
              animate="center"
              exit="exit"
            >
              <CorePanel />
            </motion.div>
          )}

          {tab === "stack" && (
            <motion.div
              key="stack"
              className="skills-panel"
              custom={tabDirection}
              variants={isMobile ? horizontalPanelVariants : verticalPanelVariants}
              initial="enter"
              animate="center"
              exit="exit"
            >
              <StackPanel isMobile={isMobile} />
            </motion.div>
          )}

          {tab === "certs" && (
            <motion.div
              key="certs"
              className="skills-panel"
              custom={tabDirection}
              variants={isMobile ? horizontalPanelVariants : verticalPanelVariants}
              initial="enter"
              animate="center"
              exit="exit"
            >
              <CertsPanel isMobile={isMobile} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

