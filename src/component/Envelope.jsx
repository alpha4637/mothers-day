import { motion } from "framer-motion";
import Letter from "./Letter";
import Share from "./Share";

export default function Envelope({ stage, onOpen, lang, name }) {
  return (
    <div className="envelope-wrapper">
      <div className={`envelope ${stage}`}>

    <div className="body" />

    <Letter stage={stage} lang={lang} name={name} />

    <div className="pocket" />

          {/* 🔥 FLAP (no drag now) */}
          {stage !== "opened" && (
            <motion.div
              className="flap"
              initial={{ rotateX: 0 }}
              animate={{
                rotateX: stage === "opening" ? 180 : 0
              }}
              transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1]
              }}
            />
          )}
        </div>

      {/* 👇 OPEN BUTTON */}
      {stage === "ready" && (
        <button className="open-btn" onClick={onOpen}>
          Open Letter 💌
        </button>
      )}

      {/* 👇 SHARE BUTTON */}
      {stage === "opened" && (
        <Share name={name} />
      )}
    </div>
  );
}