import { useRef, useState } from "react";

export default function MusicPlayer() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (audioRef.current.paused) {
      audioRef.current.volume = 0.4; // soft background feel
      audioRef.current.play();
      setPlaying(true);
    } else {
      audioRef.current.pause();
      setPlaying(false);
    }
  };

  return (
    <>
      <button className="music-btn" onClick={toggleMusic}>
        {playing ? "🔊" : "🎵"}
      </button>

      <audio ref={audioRef} loop>
        <source src="/mumma.mp3" type="audio/mpeg" />
      </audio>
    </>
  );
}