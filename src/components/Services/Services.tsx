import { motion } from "framer-motion";
import SectionHeader from "../SectionHeader";
import { useMobileAutoScroll } from "../../hooks/useMobileAutoScroll";

type Service = {
  title: string;
  tags: string[];
  body: string;
  image: string;
  alt: string;
};

const services: Service[] = [
  {
    title: "Modern Website Design",
    tags: ["Wireframe", "Design System", "Handoff"],
    body: "Premium, minimal and cinematic layouts built around your brand with beautiful white space and motion.",
    image: "https://drive.google.com/thumbnail?id=1I5uBddRedwcJg9_NUJRoeY2drQ37-7WX&sz=w800",
    alt: "Modern website design displayed on a desktop screen",
  },
  {
    title: "Responsive Development",
    tags: ["Mobile First", "Retina Ready", "Cross Browser"],
    body: "Mobile-first builds that look flawless from a 320px phone to an ultra-wide retina display.",
    image: "https://drive.google.com/thumbnail?id=14GMrNVMfIA_Zl4gA9Gvhubsctwq6mMfR&sz=w800",
    alt: "Responsive workspace with laptop, tablet and smartphone devices",
  },
  {
    title: "Landing Pages",
    tags: ["Conversion", "SEO", "Speed"],
    body: "High-converting, fast-loading landing pages engineered for clarity, trust and action.",
    image: "https://drive.google.com/thumbnail?id=1QXmJt1Arsixoiv8xUjfhfuINsG7Cn932&sz=w800",
    alt: "Laptop with marketing and conversion strategy on a desk",
  },
  {
    title: "Portfolio Websites",
    tags: ["Personal Brand", "Animation", "CMS-free"],
    body: "Personal brand sites that make recruiters and clients remember your name.",
    image: "https://drive.google.com/thumbnail?id=1317VSRNMYWoWR0mws-5UT2Y2UhWzrhmY&sz=w800",
    alt: "Minimal creative portfolio workspace with laptop and tablet",
  },
  {
    title: "UI / UX Design",
    tags: ["Figma", "Prototype", "Usability"],
    body: "Research-informed interfaces in Figma — flows, components, states and accessible color systems.",
    image: "https://drive.google.com/thumbnail?id=1I05RGOyvJUIx7XeRsG3VFueBdFZ9XdEd&sz=w800",
    alt: "Designer sketching a mobile app UI/UX prototype on paper",
  },
  {
    title: "Website Redesign",
    tags: ["Audit", "Refactor", "Relaunch"],
    body: "Modernise an outdated site: better speed, better accessibility, dramatically better looks.",
    image: "https://drive.google.com/thumbnail?id=1MHh9KzZvsaDjXHgzksxwRVtqyIMIYGYB&sz=w800",
    alt: "Website redesign layout planning on a screen",
  },
  {
    title: "Canva Design",
    tags: ["Social Kit", "Banners", "Decks"],
    body: "Social posts, thumbnails, banners, presentations and brand kits with a consistent visual identity.",
    image: "https://drive.google.com/thumbnail?id=1vvRaFIunTwQ2zIoRPryYtSpjSCz8QBQ3&sz=w800",
    alt: "Designer creating colorful graphic design on a tablet",
  },
  {
    title: "Frontend Development",
    tags: ["Clean Code", "Reusable", "Performance"],
    body: "Clean, scalable, maintainable HTML, CSS & JavaScript — semantic, documented and future-proof.",
    image: "https://drive.google.com/thumbnail?id=1LOmGdWCTjMRmRhG7He1Z2La9kMWzgcmO&sz=w800",
    alt: "Close-up of clean CSS code on a developer screen",
  },
  {
    title: "Freelancing Services",
    tags: ["Remote", "Fast Delivery", "Support"],
    body: "Flexible collaboration, transparent updates and on-time delivery — hourly or fixed-scope.",
    image: "https://drive.google.com/thumbnail?id=1sCPbLKtOG_RePa1dgZOQw6TNBdgSnGKd&sz=w800",
    alt: "Freelancer working on a laptop with coffee at a professional desk",
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;

/* Container — children enter smoothly with GPU acceleration */
const gridVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.04, delayChildren: 0.01 },
  },
};

/* Card — GPU transform & opacity only */
const cardVariants = {
  hidden: { opacity: 0, y: 22, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.42, ease: EASE },
  },
};

export default function Services() {
  const autoScrollRef = useMobileAutoScroll(services.length, 1500);

  return (
    <section className="services section-shell" id="services">
      <SectionHeader
        eyebrow="Services"
        title="What I can build for you"
        description="End-to-end design and front-end development — from the first wireframe to the final deploy."
      />

      <motion.div
        className="services__grid horizontal-scroll-container"
        ref={autoScrollRef}
        variants={gridVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.02, margin: "60px 0px" }}
      >
        {services.map((service) => (
          <motion.article
            className="service-card glass-reflection"
            key={service.title}
            variants={cardVariants}
          >
            <div className="service-card__image">
              <img
                src={service.image}
                srcSet={`${service.image.replace("&sz=w800", "&sz=w480")} 480w, ${service.image} 800w`}
                sizes="(max-width: 640px) 72vw, (max-width: 900px) 33vw, 320px"
                alt={service.alt}
                loading="lazy"
                fetchPriority="low"
                decoding="async"
                width={640}
                height={420}
              />
              <span className="service-card__overlay" />
            </div>

            <div className="service-card__body">
              <h3>{service.title}</h3>
              <p>{service.body}</p>
              <div className="service-card__tags">
                {service.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}
