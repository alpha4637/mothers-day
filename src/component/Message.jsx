import { useEffect, useState, useRef, useMemo } from "react";
import confetti from "canvas-confetti";

const COUPON_HINT_EN = "\n\n🎁 Go to the next page for a surprise →";
const COUPON_HINT_HI = "\n\n🎁 सरप्राइज़ के लिए अगला पेज देखें →";

export default function Message({ stage, lang, name }) {
  const [text, setText] = useState("");
  const intervalRef = useRef(null);
  const hasFiredConfetti = useRef(false);

  const fullText = useMemo(() => {
    const messages = {
      en: `Dear Mom,

Happy Mother's Day.
Your love is the quiet strength that carries me every day.

Thank you ❤️

Love,
${name}${COUPON_HINT_EN}`,

      hi: `प्रिय ${name || "माँ"},

मदर्स डे की शुभकामनाएं।
आपका प्यार वो ताकत है जो मुझे हर दिन संभालता है।

धन्यवाद ❤️

आपका,
thrive.co${COUPON_HINT_HI}`
    };

    return messages[lang] || messages.en;
  }, [lang, name]);

  useEffect(() => {
    if (stage !== "opened") {
      setText("");
      hasFiredConfetti.current = false;
      return;
    }

    let i = 0;
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setText(fullText.slice(0, i));
      i++;

      if (i > fullText.length) {
        clearInterval(intervalRef.current);
        if (!hasFiredConfetti.current) {
          confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 } });
          hasFiredConfetti.current = true;
        }
      }
    }, 20);

    return () => clearInterval(intervalRef.current);
  }, [stage, fullText]);

  return <pre className="message-text">{text}</pre>;
}