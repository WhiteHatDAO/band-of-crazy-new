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
      style={{ height: "10vh" }}
    >
      <img
        src={logo}
        alt="logo"
        height={42}
        style={{
          height: isMobile ? 26 : 42,
          filter: transparent
            ? "invert(100%) sepia(93%) saturate(0%) hue-rotate(201deg) brightness(156%) contrast(106%)"
            : "none",
        }}
      />
      {hasMintPass ? (
        <div
          className={`text-sm sm:text-xl md:text-lg lg:text-3xl ${
            transparent ? "text-white" : "text-primary"
          } font-bold text-right`}
        >
          WHITELIST MINT PASS
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
