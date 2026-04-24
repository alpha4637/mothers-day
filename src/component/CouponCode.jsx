import { motion } from "framer-motion";

const COUPON_CODE = "768adsjkansetc";

export default function CouponCard({ lang }) {
  const [copied, setCopied] = require("react").useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(COUPON_CODE).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <motion.div
      className="coupon-wrapper"
      initial={{ opacity: 0, scale: 0.85, y: 40 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.85, y: 40 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="coupon-card">
        <div className="coupon-top">
          <div className="coupon-icon">🎁</div>
          <h2 className="coupon-title">
            {lang === "hi" ? "आपका सरप्राइज़ गिफ्ट!" : "Your Surprise Gift!"}
          </h2>
          <p className="coupon-subtitle">
            {lang === "hi"
              ? "नीचे दिया गया कूपन कोड यूज़ करें"
              : "Use the coupon code below"}
          </p>
        </div>

        <div className="coupon-divider">
          <span /><span className="coupon-scissors">✂</span><span />
        </div>

        <div className="coupon-bottom">
          <p className="coupon-label">
            {lang === "hi" ? "कूपन कोड" : "COUPON CODE"}
          </p>
          <div className="coupon-code-box" onClick={handleCopy}>
            <span className="coupon-code">{COUPON_CODE}</span>
            <span className="coupon-copy-icon">{copied ? "✅" : "📋"}</span>
          </div>
          <p className="coupon-copy-hint">
            {copied
              ? (lang === "hi" ? "कॉपी हो गया!" : "Copied!")
              : (lang === "hi" ? "कोड कॉपी करने के लिए टैप करें" : "Tap to copy")}
          </p>
        </div>
      </div>
    </motion.div>
  );
}