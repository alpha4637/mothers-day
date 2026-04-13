import { motion } from "framer-motion";
import Message from "./Message";

export default function Letter({ stage, lang, name }) {
  return (
    <motion.div
      className="letter"
      initial={{ y: 40, opacity: 0 }}
      animate={{
        y: stage === "opened" ? -140 : 40,
        opacity: stage === "opened" ? 1 : 0
      }}
      transition={{ duration: 1 }}
    >
      <Message stage={stage} lang={lang} name={name} />
    </motion.div>
  );
}