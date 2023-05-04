import { motion } from "framer-motion";

export const SpinningBox = (props: { size?: number; color?: string }) => {
  const style = {
    height: props.size ?? 16,
    width: props.size ?? 16,
    backgroundColor: props.color ?? "#8b5cf6",
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

export const Spin = (props: { size?: number; color?: string }) => {
  const style = {
    height: props.size ?? 16,
    width: props.size ?? 16,
  };
  return (
    <svg
      className="spinner spin"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      style={style}
    >
      <circle
        className="spinner-circle"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="spinner-path"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );
};

export const LoadingPage = ({ mt }: { mt?: string | number }) => {
  const style = {
    marginTop: mt ?? '4rem'
  }
  return (
    <div className="flex justify-center items-center" style={style}>
      <Spin size={36} />
    </div >
  );
};

export const ErrorPage = ({ mt }: { mt?: string | number }) => {
  const style = {
    marginTop: mt ?? '4rem'
  }
  return (
    <div className="flex justify-center items-center" style={style}>
      Something went wrong.
    </div>
  );
};
