import { motion } from "framer-motion";
import SectionHeader from "../SectionHeader";
import { useMobileAutoScroll } from "../../hooks/useMobileAutoScroll";

const photos = [
  {
    driveId: "1PWkbFWt1Y12I0l6ZDsnJknxexdb_g06N",
    title: "Waterways Congestion",
    badge: "Photography Collection",
    body: "A busy view of wooden boats moving and parking on the river.",
  },
  {
    driveId: "1FdfN3sISWDO9q3e7h4UOoNSkAxk0zCp1",
    title: "Misty Hillscape",
    badge: "Photography Collection",
    body: "Green hills covered with low clouds during the rainy season.",
  },
  {
    driveId: "1i3_k6pqK8OQim0LxJ8DevvnxIHm3_Nxu",
    title: "Golden Foam",
    badge: "Photography Collection",
    body: "A close-up look at light, details, and waves at the beach.",
  },
  {
    driveId: "1H-gclPZOKQ5XTK2JGuUDgS4C5d9qJMDT",
    title: "Lakefront Traditions",
    badge: "Photography Collection",
    body: "Colorful traditional boats parked by a quiet lake with hills in the background.",
  },
  {
    driveId: "1131_sxbO1Qa2eyZIAqhttK_gFfSA-1IC",
    title: "Neon Waves",
    badge: "Photography Collection",
    body: "Glowing green waves meeting a dark pink sunset sky.",
  },
];

const driveImg = (id: string, width = 800) =>
  `https://drive.google.com/thumbnail?id=${id}&sz=w${width}`;

export default function Photography() {
  const autoScrollRef = useMobileAutoScroll(photos.length, 1500);

  return (
    <section className="photography section-shell" id="photography">
      <SectionHeader
        eyebrow="Photography"
        title="Award-Winning Photography Collection"
        description="A visual side of Rafi's creative discipline, built around composition, light, patience, and detail."
      />
      <motion.p
        className="photography__award"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.35 }}
      >
        🏆 Won photography awards in Bangladesh.
      </motion.p>
      <div className="photography__grid horizontal-scroll-container" ref={autoScrollRef}>
        {photos.map((photo, index) => (
          <motion.article
            className="photo-card glass-reflection"
            key={photo.title}
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            whileHover={{ y: -6 }}
            viewport={{ once: true, amount: 0.05, margin: "50px 0px" }}
            transition={{ delay: Math.min(index, 3) * 0.03, duration: 0.35 }}
          >
            <div className="photo-card__image">
              <img
                src={driveImg(photo.driveId)}
                srcSet={`${driveImg(photo.driveId, 480)} 480w, ${driveImg(photo.driveId, 800)} 800w`}
                sizes="(max-width: 640px) 78vw, 300px"
                alt={`${photo.title} photography`}
                width={1200}
                height={938}
                loading="lazy"
                fetchPriority="low"
                decoding="async"
              />
              <span>{photo.badge}</span>
            </div>
            <div className="photo-card__body">
              <h3>{photo.title}</h3>
              <p>{photo.body}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
