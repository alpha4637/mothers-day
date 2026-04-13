import { useEffect, useState, useRef, useMemo } from "react";
import confetti from "canvas-confetti";

export default function Message({ stage, lang, name }) {
  const [text, setText] = useState("");
  const intervalRef = useRef(null);
  const hasFiredConfetti = useRef(false);

  // ✅ FIX: memoized messages
  const messages = useMemo(() => ({
    en: `Dear ${name || "Mom"},

Happy Mother's Day.
Your love is the quiet strength that carries me every day.

Thank you ❤️

Love,
thrive.co`,

    hi: `प्रिय ${name || "माँ"},

मदर्स डे की शुभकामनाएं।
आपका प्यार वो ताकत है जो मुझे हर दिन संभालता है।

धन्यवाद ❤️

आपका,
thrive.co`
  }), [name]);

  useEffect(() => {
    if (stage !== "opened") {
      setText("");
      hasFiredConfetti.current = false;
      return;
    }

    const fullText = messages[lang] || messages.en;
    let i = 0;

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      setText(fullText.slice(0, i));
      i++;

      if (i > fullText.length) {
        clearInterval(intervalRef.current);

        if (!hasFiredConfetti.current) {
          confetti({
            particleCount: 120,
            spread: 70,
            origin: { y: 0.6 }
          });
          hasFiredConfetti.current = true;
        }
      }
    }, 20);

    return () => clearInterval(intervalRef.current);
  }, [stage, lang, messages]); // ✅ FIXED

  return <pre className="message-text">{text}</pre>;
}