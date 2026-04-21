import { useEffect, useState } from "react";
import "./styles.css";
import Envelope from "./component/Envelope";
import LanguageSelector from "./component/LanguageSelector";
import MusicPlayer from "./component/MusicPlayer";

export default function App() {
  const [stage, setStage] = useState("idle");
  const [lang, setLang] = useState(null);
  const [name, setName] = useState("");
  const [isReceiver, setIsReceiver] = useState(false);

  // ✅ READ FROM URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const urlName = params.get("name");
    const urlLang = params.get("lang");

    if (urlName && urlLang) {
      setName(urlName);
      setLang(urlLang);
      setStage("ready");
      setIsReceiver(true); // 🔥 important
    }
  }, []);

  const handleLanguage = (lang, username) => {
    setLang(lang);
    setName(username || "Your Child");
    setStage("ready");
  };

  const handleOpen = () => {
    setStage("opening");
    setTimeout(() => setStage("opened"), 1200);
  };

  return (
    <div className="app">
      <MusicPlayer />

      {/* Sender only */}
      {stage === "idle" && !isReceiver && (
        <LanguageSelector onSelect={handleLanguage} />
      )}

      {stage !== "idle" && (
        <Envelope
          stage={stage}
          onOpen={handleOpen}
          lang={lang}
          name={name}
          isReceiver={isReceiver}
        />
      )}
    </div>
  );
}