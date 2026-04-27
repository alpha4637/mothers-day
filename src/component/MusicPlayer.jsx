import { useRef, useEffect, useState, useCallback } from "react";

export default function MusicPlayer({ song, stage }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const getSongSrc = useCallback(() => {
    switch (song) {
      case "maa":      return "/Maa_Taare_Zameen_Par.mp3";
      case "meri-maa": return "/Meri_Maa_Yaariyan.mp3";
      case "luka":     return "/Lukka_Chuppi.mp3";
      case "aisa":     return "/Aisa_Kyun_Maa_Neerja.mp3";
      default:         return "/mumma.mp3";
    }
  }, [song]);

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
  }, [shouldPlay, getSongSrc]);

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