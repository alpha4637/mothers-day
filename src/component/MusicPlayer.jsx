import { useRef} from "react";

export default function MusicPlayer({ song }) {
  const audioRef = useRef(null); 
  const getSongSrc = () => {
    switch (song) {
      case "maa":
        return "/maa.mp3";
      case "meri-maa":
        return "/meri-maa.mp3";
      default:
        return "/mumma.mp3";
    }
  };

  return (
    <audio ref={audioRef} loop>
      <source src={getSongSrc()} type="audio/mpeg" />
    </audio>
  );
}