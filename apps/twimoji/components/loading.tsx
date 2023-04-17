import { motion } from "framer-motion";

export const SpinningBox = (props: { size?: number }) => {
  const style = {
    height: props.size ?? 16,
    width: props.size ?? 16,
    backgroundColor: "#8b5cf6",
  };
  return (
    <motion.div
      className="box h-11 w-11 loader"
      style={style}
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

export const LoadingCircle = () => {
  const containerStyle = {
    // position: "relative",
    width: "3rem",
    height: "3rem",
  };

  const circleStyle = {
    display: "block",
    width: "3rem",
    height: "3rem",
    border: "0.25rem solid #d1d5db",
    borderTop: "#8b5cf6",
    borderRadius: "50%",
    // position: "absolute",
    top: 0,
    left: 0,
  };

  const spinTransition = {
    loop: Infinity,
    ease: "linear",
    duration: 1,
  };

  return (
    <div style={containerStyle}>
      <motion.span
        style={circleStyle}
        animate={{ rotate: 360 }}
        transition={spinTransition}
      />
    </div>
  );
};

export default function ThreeDotsWave() {
  const LoadingDot = {
    display: "block",
    width: "2rem",
    height: "2rem",
    backgroundColor: "#8b5cf6",
    borderRadius: "50%",
  };

  const LoadingContainer = {
    width: "5rem",
    height: "2rem",
    display: "flex",
    justifyContent: "space-around",
  };

  const ContainerVariants = {
    initial: {
      transition: {
        staggerChildren: 0.2,
      },
    },
    animate: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const DotVariants = {
    initial: {
      y: "0%",
    },
    animate: {
      y: "100%",
    },
  };

  const DotTransition = {
    duration: 0.5,
    yoyo: Infinity,
    ease: "easeInOut",
  };

  return (
    <div>
      <motion.div
        style={LoadingContainer}
        variants={ContainerVariants}
        initial="initial"
        animate="animate"
      >
        <motion.span
          style={LoadingDot}
          variants={DotVariants}
          transition={DotTransition}
        />
        <motion.span
          style={LoadingDot}
          variants={DotVariants}
          transition={DotTransition}
        />
        <motion.span
          style={LoadingDot}
          variants={DotVariants}
          transition={DotTransition}
        />
      </motion.div>
    </div>
  );
}

export const LoadingPage = () => {
  return (
    <div className="flex justify-center items-center h-[100dvh] twimoji">
      <SpinningBox size={60} />
    </div>
  );
};

export const ErrorPage = () => {
  return (
    <div className="flex justify-center items-center h-[100dvh] twimoji">
      Something went wrong.
    </div>
  );
};
