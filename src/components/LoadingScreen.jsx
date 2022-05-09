import React, { useEffect } from "react";
import NProgress from "nprogress";
import loadingImg from "../assets/loading.gif";
import logo from "../assets/logo.png";
import useMediaQuery from "../hooks/useMediaQuery";
import ProgressBar from "@ramonak/react-progress-bar";

const LoadingScreen = ({
  transparent = true,
  showProgress,
  progress,
  totalProgress,
  ...rest
}) => {
  const isMobile = useMediaQuery("(max-width: 800px)");
  useEffect(() => {
    NProgress.start();

    return () => {
      NProgress.done();
    };
  }, []);

  return (
    <div
      style={{
        with: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        background: isMobile
          ? "linear-gradient(180deg, #FFFFFF 0%, #757FF0 100%)"
          : "linear-gradient(180deg, #FFFFFF 0%, #EE9067 100%)",
        justifyItems: "center",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img src={loadingImg} />
      <img
        src={logo}
        style={{
          marginTop: 8,
          filter:
            "invert(0%) sepia(93%) saturate(0%) hue-rotate(283deg) brightness(0%) contrast(103%)",
        }}
      />
      {showProgress && (
        <h3>
          Loading resources...{" "}
          {showProgress && `( ${progress}/${totalProgress} )`}
        </h3>
      )}
    </div>
  );
};

export default LoadingScreen;
