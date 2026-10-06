import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiExternalLink, FiGithub } from "react-icons/fi";
import SectionHeader from "../SectionHeader";
import { useMobileAutoScroll } from "../../hooks/useMobileAutoScroll";

type Project = {
  category: string;
  title: string;
  body: string;
  stack: string[];
  featured?: boolean;
  image?: string;
  placeholder?: string;
};

const projects: Project[] = [
  {
    category: "Featured",
    title: "Premium Portfolio Website",
    body: "Modern animated portfolio with glassmorphism UI, cinematic transitions and a fully custom motion system — no frameworks, just clean vanilla code.",
    stack: ["HTML", "CSS", "JavaScript"],
    featured: true,
    image: "https://drive.google.com/thumbnail?id=1-e30KPK5FMMZKB-KiiqFn3mru_p5CBSF&sz=w800",
  },
  {
    category: "Web App",
    title: "HopeFund",
    body: "Online donation platform with campaign tracking, validated donation flow and persistent giving history stored on the client.",
    stack: ["HTML", "CSS", "JavaScript", "LocalStorage"],
    image: "https://drive.google.com/thumbnail?id=1s0-4FzR8SClH0Hh6P6c7xtfWNLuaP4xJ&sz=w800",
  },
  {
    category: "Website",
    title: "Queen Travels",
    body: "Travel agency website with immersive galleries, animated packages and a smooth booking enquiry experience.",
    stack: ["HTML", "CSS", "JavaScript"],
    image: "https://drive.google.com/thumbnail?id=1ixnrImr-s12kMLLw4r01G8VQYIbVSAEB&sz=w800",
  },
  {
    category: "UI Design",
    title: "Restaurant Website",
    body: "Premium restaurant UI with editorial layout, animated menu tabs and an elegant reservation experience.",
    stack: ["HTML", "CSS", "JavaScript"],
    image: "https://drive.google.com/thumbnail?id=1po3i9FvrbynN-zeTRbVXuX-hssu0W5H-&sz=w800",
  },
  {
    category: "Website",
    title: "E-Commerce Landing Page",
    body: "Responsive shopping interface with quick-view product cards, sticky mini-cart and conversion-focused sections.",
    stack: ["HTML", "CSS", "JavaScript"],
    image: "https://drive.google.com/thumbnail?id=1-beZPp0LgbTu_w1hrUM48wA4x3mRXw6y&sz=w800",
  },
  {
    category: "Web App",
    title: "Dashboard UI",
    body: "Analytics dashboard with animated KPI counters, hand-built CSS charts and a fully themeable interface.",
    stack: ["HTML", "CSS", "JavaScript"],
    image: "https://drive.google.com/thumbnail?id=15Wp_bkDflUn4lraMYcNQdRpUEruMKBEj&sz=w800",
  },
  {
    category: "Web App",
    title: "Healer Boy's",
    body: "Healthcare companion platform for appointment booking, medicine reminders, and direct doctor consultations.",
    stack: ["HTML", "CSS", "JavaScript", "API"],
    image: "https://drive.google.com/thumbnail?id=1L5G5VgoezEOL5hPhR_uPB-EkHARawrBq&sz=w800",
  },
  {
    category: "Website",
    title: "TrackBD — Live GPS Tracking",
    body: "Real-time live GPS tracking system website with map visualization, vehicle monitoring and route history.",
    stack: ["HTML", "CSS", "JavaScript", "Map API"],
    image: "https://drive.google.com/thumbnail?id=15BbIixE4Bl6n-Ydg7VNjQ5ikgnwfbOXD&sz=w800",
  },
];

const categories = ["All", "Websites", "UI Design", "Web Apps"];

/* Filter label → project category mapping */
const categoryMap: Record<string, string[]> = {
  Websites: ["Website", "Featured"],
  "UI Design": ["UI Design"],
  "Web Apps": ["Web App"],
};

export default function Projects() {
  const [active, setActive] = useState("All");

  const filtered =
    active === "All"
      ? projects
      : projects.filter((p) => categoryMap[active]?.includes(p.category));

  const autoScrollRef = useMobileAutoScroll(filtered.length, 1500);

  return (
    <section className="projects section-shell" id="projects">
      <SectionHeader
        eyebrow="Featured Work"
        title="Selected projects"
        description="A handful of builds where design, motion and clean code came together."
      />

      <div className="projects__filters" role="tablist" aria-label="Filter projects">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`projects__filter ${active === cat ? "projects__filter--active" : ""}`}
            onClick={() => setActive(cat)}
            role="tab"
            aria-selected={active === cat}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="projects__grid horizontal-scroll-container" ref={autoScrollRef}>
        <AnimatePresence mode="popLayout">
          {filtered.map((project, index) => (
            <motion.article
              className={`project-card glass-reflection ${project.featured ? "project-card--featured" : ""}`}
              key={`${project.title}-${index}`}
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ delay: Math.min(index, 3) * 0.03, duration: 0.35 }}
            >
              <div className="project-card__image">
                {project.image ? (
                  <img
                    src={project.image}
                    srcSet={`${project.image.replace("&sz=w800", "&sz=w480")} 480w, ${project.image} 800w`}
                    sizes="(max-width: 640px) 80vw, (max-width: 900px) 45vw, 360px"
                    alt={`${project.title} screenshot`}
                    width={640}
                    height={420}
                    loading="lazy"
                    fetchPriority="low"
                    decoding="async"
                  />
                ) : (
                  <div className={`project-card__placeholder ${project.placeholder ?? ""}`} />
                )}
              </div>
              <div className="project-card__body">
                <div className="project-card__topline">
                  <span>{project.category}</span>
                  <div className="project-card__actions">
                    <button className="project-card__action" aria-label="Live demo">
                      <FiExternalLink aria-hidden="true" />
                    </button>
                    <button className="project-card__action" aria-label="GitHub">
                      <FiGithub aria-hidden="true" />
                    </button>
                  </div>
                </div>
                <h3>{project.title}</h3>
                <p>{project.body}</p>
                <div className="project-card__stack">
                  {project.stack.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}
