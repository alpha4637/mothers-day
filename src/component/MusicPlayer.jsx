import { useRef, useEffect, useState } from "react";

export default function MusicPlayer({ song, stage, isReceiver }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const getSongSrc = () => {
    switch (song) {
      case "maa":      return "/Maa_Taare_Zameen_Par.mp3";
      case "meri-maa": return "/Meri_Maa_Yaariyan.mp3";
      case "luka":     return "/Lukka_Chuppi.mp3";
      case "aisa":     return "/Aisa_Kyun_Maa_Neerja.mp3";
      default:         return "/mumma.mp3";
    }
  };

  // Dono ke liye "opening" ya "opened" pe play — "Open Letter" click se trigger hoga
  const shouldPlay = stage === "opening" || stage === "opened";

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (shouldPlay) {
      audio.src = getSongSrc();
      audio.loop = true;
      audio.muted = false;
      audio.load();
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      audio.pause();
      audio.currentTime = 0;
      setIsPlaying(false);
    }
  }, [shouldPlay, song]);

  const toggleMusic = (e) => {
    e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  return (
    <>
      <audio ref={audioRef} style={{ display: "none" }} />
      {shouldPlay && (
        <button
          className={`music-toggle-btn ${isPlaying ? "playing" : "paused"}`}
          onClick={toggleMusic}
          title={isPlaying ? "Pause music" : "Play music"}
        >
          {isPlaying ? "🎵" : "🔇"}
        </button>
      )}
    </>
  );
}