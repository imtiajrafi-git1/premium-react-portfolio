import { motion } from "framer-motion";
import { FaCalendarAlt, FaGraduationCap, FaMapMarkerAlt } from "react-icons/fa";
import { CheckCircle2, Clock3 } from "lucide-react";

const educationData = [
  {
    id: 1,
    short: "B.Sc.",
    mobileTitle: "B.Sc. in Software Engineering",
    degree: "Bachelor of Science (B.Sc.)",
    field: "Software Engineering",
    institution: "Daffodil International University",
    year: "2020 - Present",
    status: "Present",
    description:
      "Currently pursuing B.Sc. in Software Engineering with focus on full-stack development, modern web technologies and software architecture.",
  },
  {
    id: 2,
    short: "HSC",
    mobileTitle: "Higher Secondary Certificate",
    degree: "Higher Secondary Certificate (HSC)",
    field: "Science",
    institution: "Milestone College",
    year: "2018 - 2020",
    status: "Completed",
    description:
      "Completed HSC in Science group with strong foundation in Physics, Chemistry and Mathematics. Developed analytical thinking and problem solving.",
  },
  {
    id: 3,
    short: "SSC",
    mobileTitle: "Secondary School Certificate",
    degree: "Secondary School Certificate (SSC)",
    field: "Science",
    institution: "Hirapur Ideal High School & College",
    year: "2016 - 2018",
    status: "Completed",
    description:
      "Completed SSC with excellent results, building core knowledge in science, mathematics and establishing academic discipline.",
  },
];

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function EducationCard() {
  return (
    <motion.article
      className="edu-timeline-wrapper"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15, margin: "80px 0px" }}
      transition={{ duration: 0.5, ease: EASE }}
    >
      {/* Compact card label; the highlighted section heading sits above this card. */}
      <div className="edu-timeline-header">
        <div className="edu-timeline-header-icon">
          <FaGraduationCap aria-hidden="true" />
        </div>
        <span className="edu-timeline-eyebrow">Academic Journey</span>
      </div>

      {/* Timeline Track */}
      <div className="edu-timeline">
        {/* Central vertical line */}
        <motion.span
          className="edu-timeline-line"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: EASE }}
          aria-hidden="true"
        />

        {educationData.map((edu, index) => {
          const isLeft = index % 2 === 0;

          return (
            <motion.div
              key={edu.id}
              className={`edu-timeline-item ${isLeft ? "edu-timeline-item--left" : "edu-timeline-item--right"}`}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ delay: 0.18 + index * 0.18, duration: 0.6, ease: EASE }}
            >
              {/* Card */}
              <motion.div
                className="edu-timeline-card"
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 280, damping: 20 }}
              >
                <div className="edu-timeline-card-top">
                  <span className={`edu-timeline-status ${edu.status === "Present" ? "edu-timeline-status--present" : ""}`}>
                    {edu.status === "Present" && <i className="edu-timeline-pulse" aria-hidden="true" />}
                    <FaCalendarAlt className="edu-timeline-status-icon" aria-hidden="true" />
                    {edu.status === "Present" ? (
                      <Clock3 className="edu-timeline-lucide-icon" aria-hidden="true" />
                    ) : (
                      <CheckCircle2 className="edu-timeline-lucide-icon" aria-hidden="true" />
                    )}
                    {edu.status}
                  </span>
                </div>

                <h4 className="edu-timeline-degree">{edu.degree}</h4>
                <h4 className="edu-timeline-mobile-title">{edu.mobileTitle}</h4>
                <p className="edu-timeline-field">{edu.field}</p>

                <p className="edu-timeline-institution">
                  <FaMapMarkerAlt aria-hidden="true" /> {edu.institution}
                </p>

                <p className="edu-timeline-desc">{edu.description}</p>
              </motion.div>

              {/* Center icon badge */}
              <motion.span
                className="edu-timeline-icon-badge"
                initial={{ scale: 0, rotate: -20 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: 0.32 + index * 0.18,
                  type: "spring",
                  stiffness: 260,
                  damping: 16,
                }}
                aria-hidden="true"
              >
                <FaGraduationCap />
                <span className="edu-timeline-short">{edu.short}</span>
              </motion.span>
            </motion.div>
          );
        })}
      </div>
    </motion.article>
  );
}
