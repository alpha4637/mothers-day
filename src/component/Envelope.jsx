import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Letter from "./Letter";
import Share from "./Share";
import CouponCard from "./CouponCode";

export default function Envelope({ stage, onOpen, lang, name, isReceiver, song }) {
  const [page, setPage] = useState(1);

  return (
    <div className="envelope-wrapper">

      {/* Original envelope — sirf jab opened nahi hai */}
      {stage !== "opened" && (
        <div className={`envelope ${stage}`}>
          <div className="body" />
          <Letter stage={stage} lang={lang} name={name} />
          <div className="pocket" />
          {stage !== "opened" && (
            <motion.div
              className="flap"
              initial={{ rotateX: 0 }}
              animate={{ rotateX: stage === "opening" ? 180 : 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            />
          )}
        </div>
      )}

      {/* Open button */}
      {stage === "ready" && (
        <button className="open-btn" onClick={onOpen}>
          Open Letter 💌
        </button>
      )}

      {/* Opened state — original letter animation + page 2 coupon */}
      {stage === "opened" && (
        <>
          <AnimatePresence mode="wait">
            {page === 1 ? (
              <motion.div
                key="letter"
                className="opened-page"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.4 }}
              >
                {/* Original envelope with letter animation */}
                <div className={`envelope ${stage}`}>
                  <div className="body" />
                  <Letter stage={stage} lang={lang} name={name} />
                  <div className="pocket" />
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="coupon"
                className="opened-page"
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 60 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <CouponCard lang={lang} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Arrows + dots */}
          <div className="page-nav">
            <button
              className={`nav-arrow ${page === 1 ? "disabled" : ""}`}
              onClick={() => setPage(1)}
            >←</button>
            <div className="page-indicator">
              <span className={page === 1 ? "dot active" : "dot"} />
              <span className={page === 2 ? "dot active" : "dot"} />
            </div>
            <button
              className={`nav-arrow ${page === 2 ? "disabled" : ""}`}
              onClick={() => setPage(2)}
            >→</button>
          </div>

          {/* Share — only sender */}
          {!isReceiver && <Share name={name} lang={lang} song={song} />}
        </>
      )}

    </div>
  );
}