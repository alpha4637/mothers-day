import { useEffect, useState } from "react";
import "./styles.css";
import Envelope from "./component/Envelope";
import LanguageSelector from "./component/LanguageSelector";
import MusicPlayer from "./component/MusicPlayer";

export default function App() {
  const [stage, setStage] = useState("idle");
  const [lang, setLang] = useState(null);
  const [name, setName] = useState("");
  const [song, setSong] = useState("mumma");
  const [isReceiver, setIsReceiver] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlName = params.get("name");
    const urlLang = params.get("lang");
    const urlSong = params.get("song");

    if (urlName && urlLang) {
      setName(urlName);
      setLang(urlLang);
      if (urlSong) setSong(urlSong);
      setStage("ready");
      setIsReceiver(true);
    }
  }, []);

  const handleLanguage = (selectedLang, username, selectedSong) => {
    setLang(selectedLang);
    setName(username || "Your Child");
    setSong(selectedSong || "mumma");
    setStage("ready");
  };

  const handleOpen = () => {
    setStage("opening");
    setTimeout(() => setStage("opened"), 1200);
  };

  return (
    <div className="app">
      <MusicPlayer song={song} stage={stage} isReceiver={isReceiver} />

      {stage === "idle" && !isReceiver && (
        <LanguageSelector onSelect={handleLanguage} />
      )}

      {stage !== "idle" && (
        <Envelope
          stage={stage}
          onOpen={handleOpen}
          lang={lang}
          name={name}
          song={song}
          isReceiver={isReceiver}
        />
      )}
    </div>
  );
}