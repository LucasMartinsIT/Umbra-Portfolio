import { useEffect, useRef, useState } from 'react';

const AMBIENT_VOLUME = 0.18;

export function useAmbientAudio() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    audioRef.current.volume = AMBIENT_VOLUME;
  }, []);

  const play = async () => {
    try {
      await audioRef.current.play();
      setPlaying(true);
      setFailed(false);
      return true;
    } catch {
      setFailed(true);
      return false;
    }
  };

  const mute = () => {
    audioRef.current.pause();
    setPlaying(false);
  };

  const toggle = () => (playing ? mute() : play());

  return { audioRef, playing, failed, play, mute, toggle };
}
