import { motion } from "framer-motion";

export default function Loader() {
  return (
    <motion.div
      className="loader"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.55, ease: "easeInOut" } }}
      aria-label="Loading portfolio"
    >
      <motion.div
        className="loader__mark"
        initial={{ scale: 0.86, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        IR
      </motion.div>
      <motion.div
        className="loader__line"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.05, ease: [0.65, 0, 0.35, 1] }}
      />
      <span>IMTIAJ AHMED RAFI</span>
    </motion.div>
  );
}
