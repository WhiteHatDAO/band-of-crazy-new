// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";

const useAudioLoop = (url, muted) => {
  const [audio] = useState(new Audio(url));
  const [playing, setPlaying] = useState(false);

  const setPlay = (play) => setPlaying(play);

  useEffect(() => {
    playing ? audio.play() : audio.pause();
    audio.muted = muted;
    audio.loop = true;
  }, [playing]);

  useEffect(() => {
    audio.addEventListener("ended", () => {
      setPlaying(true);
    });
    return () => {
      audio.removeEventListener("ended", () => setPlaying(false));
    };
  }, []);

  return { playing, setPlay };
};

export default useAudioLoop;
