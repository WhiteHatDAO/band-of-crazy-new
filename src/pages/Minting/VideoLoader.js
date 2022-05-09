import React, { lazy } from "react";
import c1m from "../../assets/videos-low/c1_m_42.webm";
import c1d from "../../assets/videos-low/c1_d_42.webm";
import cLoop from "../../assets/videos-low/c1_audio_loop.mp3";
import c21Loop from "../../assets/videos-low/c1_audio_loop.mp3";
import c1tm from "../../assets/videos-low/c1_m_42.webp";
import c1td from "../../assets/videos-low/c1_d_42.webp";
import c21m from "../../assets/videos-low/c21_m_19.webm";
import c21d from "../../assets/videos-low/c21_d_19.webm";
import c21tm from "../../assets/videos-low/c21_m_19.webp";
import c21td from "../../assets/videos-low/c21_d_19.webp";
import c22m from "../../assets/videos-low/c22_m_19.webm";
import c22d from "../../assets/videos-low/c22_d_19.webm";
import c22Loop from "../../assets/videos-low/c3_loop.mp3";
import c31Loop from "../../assets/videos-low/c3_loop.mp3";
import c32Loop from "../../assets/videos-low/c3_loop.mp3";
import c4Loop from "../../assets/videos-low/c3_loop.mp3";
import c22tm from "../../assets/videos-low/c22_m_19.webp";
import c22td from "../../assets/videos-low/c22_d_19.webp";
import c31m from "../../assets/videos-low/c31_m_22.webm";
import c31d from "../../assets/videos-low/c31_d_22.webm";
import c31tm from "../../assets/videos-low/c31_m_22.webp";
import c31td from "../../assets/videos-low/c31_d_22.webp";
import c32m from "../../assets/videos-low/c32_m_7.webm";
import c32d from "../../assets/videos-low/c32_d_7.webm";
import c32tm from "../../assets/videos-low/c32_m_7.webp";
import c32td from "../../assets/videos-low/c32_d_7.webp";
import c4m from "../../assets/videos-low/c4_m_14.webm";
import c4d from "../../assets/videos-low/c4_d_14.webm";
import c4tm from "../../assets/videos-low/c4_m_14.webp";
import c4td from "../../assets/videos-low/c4_d_14.webp";
import useMediaQuery from "../../hooks/useMediaQuery";
import ReactPlayer from "react-player";
import LoadingScreen from "../../components/LoadingScreen";
import useAudioLoop from "../../components/SoundPlayer/useAudioLoop";
import loadingImg from "../../assets/loading.gif";
import logo from "../../assets/logo.png";

const videos = [
  {
    mobile: c1m,
    desktop: c1d,
    audioLoop: cLoop,
    thumbMobile: c1tm,
    thumbDesktop: c1td,
  },
  // push bottons
  {
    mobile: c21m,
    desktop: c21d,
    audioLoop: c21Loop,
    thumbMobile: c21tm,
    thumbDesktop: c21td,
  },
  // kick buttons
  {
    mobile: c22m,
    desktop: c22d,
    audioLoop: c22Loop,
    thumbMobile: c22tm,
    thumbDesktop: c22td,
  },
  // rock machine
  {
    mobile: c31m,
    desktop: c31d,
    audioLoop: c31Loop,
    thumbMobile: c31tm,
    thumbDesktop: c31td,
  },

  {
    mobile: c32m,
    desktop: c32d,
    audioLoop: c32Loop,
    thumbMobile: c32tm,
    thumbDesktop: c32td,
  },
  {
    mobile: c4m,
    desktop: c4d,
    audioLoop: c4Loop,
    thumbMobile: c4tm,
    thumbDesktop: c4td,
  },
];

function loadImages(pathsArray, callback) {
  const images = {};
  let loadedImageCount = 0;

  // Make sure arr is actually an array and any other error checking
  for (let i = 0; i < pathsArray.length; i++) {
    const image = new Image();
    image.onload = imageLoaded;
    image.src = pathsArray[i];
    images[pathsArray[i]] = image;
  }

  function imageLoaded(e) {
    loadedImageCount++;
    if (loadedImageCount >= pathsArray.length) {
      callback(images);
    }
  }
}

export const VideoLoader = ({ callback }) => {
  const [videoLoaded, setVideoLoaded] = React.useState(0);
  const [images, setImages] = React.useState([]);
  const [loaded, setLoaded] = React.useState(false);

  const [videoPaused, setPaused] = React.useState(true);
  const isMobile = useMediaQuery("(max-width: 800px)");

  const bgLoop1 = useAudioLoop(cLoop, true);
  const bgLoop2 = useAudioLoop(c4Loop, true);

  React.useEffect(() => {
    if (videoLoaded >= 6) {
      console.log("calling callback");
      callback(true);
    }
  }, [videoLoaded, loaded]);

  React.useEffect(() => {
    if (!loaded && images.length > 0)
      loadImages(images, (images) => {
        setLoaded(true);
      });
  }, [images]);

  React.useEffect(() => {
    setImages(
      videos.map((v) => {
        return isMobile ? v.thumbMobile : v.desktop;
      })
    );
  }, [isMobile]);

  React.useEffect(() => {
    console.log(videoLoaded);
  }, [videoLoaded]);

  return (
    <div>
      {videos.map((v, i) => {
        return (
          <ReactPlayer
            key={i}
            width={100}
            style={{ position: "absolute" }}
            url={!isMobile ? v.desktop : v.mobile}
            playsinline
            playing={!videoPaused}
            onStart={() => setPaused(true)}
            muted={true}
            onBufferEnd={(e) => {
              setVideoLoaded((p) => p + 1);
            }}
            config={{
              file: {
                attributes: {
                  preload: "auto",
                  autoPlay: true,
                },
              },
            }}
          />
        );
      })}
      <div
        style={{
          position: "absolute",
          width: "100vw",
          height: "100vh",
          zIndex: 55,
        }}
      >
        <LoadingScreen showProgress progress={videoLoaded} totalProgress={6} />
      </div>
    </div>
  );
};
