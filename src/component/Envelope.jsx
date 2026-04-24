import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Letter from "./Letter";
import Share from "./Share";
import CouponCard from "./CouponCode";


export default function Envelope({ stage, onOpen, lang, name, isReceiver, song }) {
  const [page, setPage] = useState(1);

  return (
    <div className="envelope-wrapper">

      {/* ENVELOPE BODY — only when not opened */}
    {stage === "opened" && (
  <div className="pages-wrapper">

    {/* VIEWPORT */}
    <div className="page-viewport">
      <AnimatePresence mode="wait">
        {page === 1 ? (
          <motion.div
            key="page1"
            className="page-content"
            initial={{ rotateY: 90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: -90, opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="paper-card">
              <Letter stage={stage} lang={lang} name={name} />
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="page2"
            className="page-content"
            initial={{ rotateY: 90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: -90, opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="paper-card">
              <CouponCard lang={lang} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>

    {/* 👇 NAV + SHARE (IMPORTANT FLOW FIX) */}
    <div className="bottom-controls">

      <div className="page-nav">
        <button onClick={() => setPage(1)} disabled={page === 1}>
          ←
        </button>
        <button onClick={() => setPage(2)} disabled={page === 2}>
          →
        </button>
      </div>

      {!isReceiver && (
        <Share name={name} lang={lang} song={song} />
      )}

    </div>

  </div>
)}

      {/* Open button */}
      {stage === "ready" && (
        <button className="open-btn" onClick={onOpen}>
          Open Letter 💌
        </button>
      )}

      {/* OPENED STATE */}
      {stage === "opened" && (
        <div className="pages-wrapper">

          {/* Page indicator */}
          <div className="page-indicator">
            <span className={page === 1 ? "dot active" : "dot"} />
            <span className={page === 2 ? "dot active" : "dot"} />
          </div>

          {/* Page content */}
          <div className="page-viewport">
            <AnimatePresence mode="wait" initial={false}>
              {page === 1 ? (
                <motion.div
                  key="letter"
                  className="page-content"
                  initial={{ opacity: 0, y: -80 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, rotateY: -90, x: -60 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="opened-letter">
                    <Letter stage={stage} lang={lang} name={name} />
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="coupon"
                  className="page-content"
                  initial={{ opacity: 0, rotateY: 90, x: 60 }}
                  animate={{ opacity: 1, rotateY: 0, x: 0 }}
                  exit={{ opacity: 0, y: -40 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <CouponCard lang={lang} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Arrow navigation */}
          <div className="page-nav">
            <button
              className={`nav-arrow ${page === 1 ? "disabled" : ""}`}
              onClick={() => page > 1 && setPage(1)}
            >
              ←
            </button>
            <button
              className={`nav-arrow ${page === 2 ? "disabled" : ""}`}
              onClick={() => page < 2 && setPage(2)}
            >
              →
            </button>
          </div>

          {/* Share button */}
          {!isReceiver && <Share name={name} lang={lang} song={song} />}
        </div>
      )}
    </div>
  );
}