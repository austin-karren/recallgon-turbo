import { motion } from "framer-motion";

export const LoadingBox = () => {
  return (
    <motion.div
      className="box h-11 w-11 loader"
      style={{ backgroundColor: "#8b5cf6" }}
      animate={{
        scale: [1, 2, 2, 1, 1],
        rotate: [0, 0, 180, 180, 0],
        borderRadius: ["0%", "0%", "50%", "50%", "0%"],
      }}
      transition={{
        duration: 2,
        ease: "easeInOut",
        times: [0, 0.2, 0.5, 0.8, 1],
        repeat: Infinity,
        repeatDelay: 1,
      }}
    />
  );
};
