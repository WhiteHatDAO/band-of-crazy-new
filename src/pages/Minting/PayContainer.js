import React, { useState } from "react";
import useMediaQuery from "../../hooks/useMediaQuery";
import useWindowSize from "../../hooks/useWindowSize";
import { useEffect } from "react";

import m0_img from "../../assets/videos-low/video-buy-button-1-0.webp";
import m1_img from "../../assets/videos-low/video-buy-button-1-0.01.webp";
import m2_img from "../../assets/videos-low/video-buy-button-1.webp";

import d0_img from "../../assets/videos-low/video-buy-button-0-d.webp";
import d1_img from "../../assets/videos-low/video-buy-button-0.01-d.webp";
import d2_img from "../../assets/videos-low/video-buy-button-1-d.webp";

const FULL_WIDTH_D = 1720;
const FULL_HEiGHT_D = 1080;

const FULL_WIDTH_M = 884;
const FULL_HEiGHT_M = 1912;

const d0 = {
  x1: 1108 / FULL_WIDTH_D,
  x2: (1108 + 96) / FULL_WIDTH_D,
  y1: 548 / FULL_HEiGHT_D,
  y2: (548 + 87) / FULL_HEiGHT_D,
};

const d001 = {
  x1: 1108 / FULL_WIDTH_D,
  x2: (1108 + 96) / FULL_WIDTH_D,
  y1: 331 / FULL_HEiGHT_D,
  y2: (331 + 87) / FULL_HEiGHT_D,
};

const d1 = {
  x1: 1108 / FULL_WIDTH_D,
  x2: (1108 + 96) / FULL_WIDTH_D,
  y1: 108 / FULL_HEiGHT_D,
  y2: (108 + 87) / FULL_HEiGHT_D,
};

const m0 = {
  x1: 673 / FULL_WIDTH_M,
  x2: (673 + 96) / FULL_WIDTH_M,
  y1: 515 / FULL_HEiGHT_M,
  y2: (515 + 87) / FULL_HEiGHT_M,
};

const m001 = {
  x1: 673 / FULL_WIDTH_M,
  x2: (673 + 96) / FULL_WIDTH_M,
  y1: 308 / FULL_HEiGHT_M,
  y2: (308 + 87) / FULL_HEiGHT_M,
};

const m1 = {
  x1: 673 / FULL_WIDTH_M,
  x2: (673 + 96) / FULL_WIDTH_M,
  y1: 99 / FULL_HEiGHT_M,
  y2: (99 + 87) / FULL_HEiGHT_M,
};

const pointInReact = (x, y, rect) => {
  return rect.x1 <= x && x <= rect.x2 && rect.y1 <= y && y <= rect.y2;
};

export const PayContainer = ({ onClick }) => {
  const isMobile = useMediaQuery("(max-width: 800px)");
  const windowSize = useWindowSize();

  const [coord, setCoord] = useState({ x: 0, y: 0 });
  const [currentImage, setCurrentImage] = useState(-1);
  const [cursor, setCursor] = useState(-1);

  const handleMouseMove = (e) => {
    setCoord({ x: e.pageX / windowSize.width, y: e.pageY / windowSize.height });
  };

  useEffect(() => {
    if (pointInReact(coord.x, coord.y, isMobile ? m0 : d0)) setCurrentImage(0);
    else if (pointInReact(coord.x, coord.y, isMobile ? m001 : d001))
      setCurrentImage(1);
    else if (pointInReact(coord.x, coord.y, isMobile ? m1 : d1))
      setCurrentImage(2);
    else setCurrentImage(-1);
  }, [windowSize, coord]);

  useEffect(() => {
    setCursor(currentImage >= 0 ? "pointer" : "default");
  }, [currentImage]);

  return (
    <div
      className={"thumbnail-container"}
      style={{
        position: "absolute",
        width: "100vw",
        height: "100vh",
      }}
    >
      {currentImage === 0 && (
        <img
          style={{
            position: "absolute",
            width: "100vw",
            height: "100vh",
          }}
          src={isMobile ? m0_img : d0_img}
          width={"100%"}
          height={"100%"}
        />
      )}
      {currentImage === 1 && (
        <img
          style={{
            position: "absolute",
            width: "100vw",
            height: "100vh",
          }}
          src={isMobile ? m1_img : d1_img}
        />
      )}
      {currentImage === 2 && (
        <img
          style={{
            position: "absolute",
            width: "100vw",
            height: "100vh",
          }}
          src={isMobile ? m2_img : d2_img}
        />
      )}
      <div
        onMouseMove={handleMouseMove}
        onClick={() => {
          console.log("clicked");
          onClick();
        }}
        style={{
          cursor: cursor,
          position: "absolute",
          width: "100vw",
          height: "100vh",
          backgroundColor: "transparent",
          zIndex: 3000,
        }}
      />
    </div>
  );
};
