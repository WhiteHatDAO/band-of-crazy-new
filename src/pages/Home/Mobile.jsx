import ask_cover from "../../assets/ask_cover.png";
import HomeButton from "../../components/buttons/HomeButton";
import { ROUTES_NAMES } from "../../constants";
import React from "react";
import useWallet from "../../hooks/useWallet";
import { useHistory } from "react-router-dom";

const MobileHome = () => {
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

  return (
    <div
      className="md:hidden px-4 flex flex-col items-center text-center space-y-3"
      style={{
        background: "linear-gradient(180deg, #FFFFFF 0%, #757FF0 100%)",
        minHeight: "93vh",
      }}
    >
      <div
        className="text-4xl font-black text-primary font-fatfrank"
        style={{
          "font-kerning": "normal",
          letterSpacing: "-1px",
        }}
      >
        You’ve made it.
      </div>
      <div className="text-xl text-black font-helvetica">Well, Almost.</div>
      <img src={ask_cover} alt="question mark" width={130} />
      <div className="text-xl text-black px-8 pb-5 font-helvetica">
        We recommend you Mint on a laptop or desktop for the best experience.
        <br />
        <div style={{ minHeight: 10 }} />
        But hey, if you insist, Give it a try. <br />
        <div style={{ minHeight: 10 }} />
        We just gotta check your wallet to make sure you are who you say you
        are. <br />
        <div style={{ minHeight: 10 }} />
        Then we’ll go for a little walk.
      </div>
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
  );
};

export default MobileHome;
