import { motion } from "framer-motion";
import { FaUniversity } from "react-icons/fa";
import EducationCard from "../Education/EducationCard";
import SectionHeader from "../SectionHeader";

export default function About() {
  return (
    <section className="about section-shell" id="about">
      <SectionHeader
        title="Let me introduce myself!"
      />

      <div className="about__grid about__grid--two-columns">
        {/* Left Column - "About Me" Card */}
        <motion.article
          className="about-card about-card--intro about-card--no-icon glass-reflection"
          initial={{ opacity: 0, y: 22, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          whileHover={{ y: -5 }}
          viewport={{ once: true, amount: 0.05, margin: "60px 0px" }}
          transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="about-card__content">
            <h3>I am Imtiaj Ahmed</h3>

            <div className="about-card__paragraphs">
              <p>
                I enjoy creating <span className="highlight-body">digital solutions</span> that are visually appealing, easy to use, and designed to solve
                real-world problems. In every project, I strive to combine modern design, clean code, and exceptional
                user experience to deliver products that leave a lasting impression.
              </p>
              <p>
                I am passionate about learning new technologies, improving my skills, and continuously growing as a
                developer and designer. I believe that learning is a lifelong journey, and I embrace every new challenge
                as an opportunity to become more experienced, innovative, and capable.
              </p>
              <p>
                My goal is to build high-quality <span className="highlight-gradient">digital experiences</span> that are not only visually engaging but also fast,
                functional, and focused on meeting users’ needs.
              </p>
            </div>
          </div>
        </motion.article>

        {/* Right Column - highlighted education heading and compact journey card */}
        <div className="education-column">
          <h2 className="education-column__heading">
            <span className="education-column__heading-icon" aria-hidden="true">
              <FaUniversity />
            </span>
            <span className="education-column__title--desktop">Education Background</span>
            <span className="education-column__title--mobile">Education Background</span>
          </h2>
          <EducationCard />
        </div>

      </div>
    </section>
  );
}
