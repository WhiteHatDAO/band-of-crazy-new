import React from "react";
import logo from "../assets/logo.png";
import useMediaQuery from "../hooks/useMediaQuery";

export default function Header({ hasMintPass, transparent }) {
  const isMobile = useMediaQuery("(max-width: 800px)");

  return (
    <div
      className={`px-4 md:px-20 flex flex-row items-center justify-between ${
        transparent ? "bg-transparent" : "bg-white"
      }`}
      style={{ height: isMobile ? "7vh" : "10vh" }}
    >
      <img
        src={logo}
        alt="logo"
        style={{
          height: isMobile ? 20 : 42,
          filter: transparent
            ? "invert(100%) sepia(93%) saturate(0%) hue-rotate(201deg) brightness(156%) contrast(106%)"
            : "none",
        }}
      />
    </div>
  );
}
