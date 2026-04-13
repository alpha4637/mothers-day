import { useState } from "react";
import "./styles.css";
import Envelope from "./component/Envelope";
import LanguageSelector from "./component/LanguageSelector"
import MusicPlayer from "./component/MusicPlayer";

export default function App() {
  const [stage, setStage] = useState("idle");
  const [lang, setLang] = useState(null);
  const [name, setName] = useState("");

  const handleLanguage = (lang, username) => {
    setLang(lang);
    setName(username || "Your Child");
    setStage("ready");
  };

  const handleOpen = () => {
    setStage("opening");

    setTimeout(() => {
      setStage("opened");
    }, 1200);
  };

  return (
    <div className="app">
       <MusicPlayer />
      {stage === "idle" && (
        <LanguageSelector onSelect={handleLanguage} />
      )}

      {stage !== "idle" && (
  <Envelope stage={stage} onOpen={handleOpen} lang={lang} name={name} />
)}
    </div>
  );
}