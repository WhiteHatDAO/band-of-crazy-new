import React, { useEffect, useState } from "react";
import ask_cover from "../../assets/ask_cover.png";
import home_cover from "../../assets/home_cover.webp";
import useHome from "../../hooks/useHome";
import HomeButton from "../../components/buttons/HomeButton";
import MobileHome from "./Mobile";
import Header from "../../components/Header";
import useWallet from "../../hooks/useWallet";
import { ROUTES_NAMES } from "../../constants";
import { useHistory } from "react-router-dom";
import useMediaQuery from "../../hooks/useMediaQuery";

function Home() {
  //return <LoadingScreen />
  const {
    connected,
    account,
    connect,
    wrongNet,
    provider,
    readProvider,
    switchNetwork,
    disconnect,
  } = useWallet();
  const history = useHistory();
  const isMobile = useMediaQuery("(max-width: 800px)");

  const { visited, homeVisited } = useHome();

  useEffect(() => {
    homeVisited();
    console.log(" home visited = " + visited);
  }, []);

  return (
    <>
      <Header hasMintPass={true} address={account} />
      <div
        className="px-4 hidden md:flex flex-col items-center justify-center text-center"
        style={{
          background: "linear-gradient(180deg, #FFFFFF 0%, #EE9067 100%)",
          height: isMobile ? "93vh" : "90vh",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            maxWidth: "1280px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={home_cover}
            alt="home cover"
            style={{ maxHeight: "90vh", maxWidth: "50%" }}
          />
          <div
            className="flex flex-col items-center space-y-10"
            style={{
              maxWidth: 550,
            }}
          >
            <div
              className="text-6xl font-black text-primary font-fatfrank"
              style={{
                fontWeight: 900,
                fontSize: 72,
              }}
            >
              You’ve made it.
            </div>
            <div
              className="text-3xl text-primary font-helvetica"
              style={{
                fontWeight: 400,
                fontSize: 30,
              }}
            >
              We just gotta check your wallet to make sure you are who you say
              you are.
              <br />
              <br />
              Then we’ll go for a little walk.
            </div>
            <div style={{ minHeight: 24, padding: 0, margin: 0 }} />
            {
              <HomeButton
                onClick={(e) => {
                  if (!connected) {
                    connect();
                  } else if (connected && wrongNet) {
                    switchNetwork();
                  } else {
                    history.push(ROUTES_NAMES.MINTING);
                  }
                }}
              >
                {!connected
                  ? "Connect wallet"
                  : wrongNet
                  ? "Switch network"
                  : "Enter"}
              </HomeButton>
            }
          </div>
        </div>
      </div>
      <MobileHome />
    </>
  );
}

export default Home;
