import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="loading-container">
      <motion.div
        className="spinner"
        animate={{
          rotate: 360,
          scale: [1, 1.1, 1],
        }}
        transition={{
          rotate: {
            repeat: Infinity,
            duration: 1,
            ease: "linear",
          },
          scale: {
            repeat: Infinity,
            duration: 1.5,
            ease: "easeInOut",
          },
        }}
      />
      <motion.p
        className="loading-text"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{
          repeat: Infinity,
          duration: 1.5,
          ease: "easeInOut",
        }}
      >
        Loading...
      </motion.p>
    </div>
  );
}
