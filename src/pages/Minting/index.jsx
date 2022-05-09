import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import giveItAKick from "../../assets/giveItAKick.png";
import payForGas from "../../assets/payForGas.png";
import payForPartyPack from "../../assets/payForPartyPack.png";
import tryPushingButtons from "../../assets/pushAFewButtons.png";
import rockTheMachine from "../../assets/rockTheMachine.png";
import useHome from "../../hooks/useHome";
import Header from "../../components/Header";
import { useHistory } from "react-router-dom";

import c1m from "../../assets/videos-low/c1_m_42.webm";
import c1d from "../../assets/videos-low/c1_d_42.webm";
import cLoop from "../../assets/videos-low/c1_audio_loop.mp3";
import c21Loop from "../../assets/videos-low/c1_audio_loop.mp3";
import c1td from "../../assets/videos-low/c1_d_42.webp";
import c1tm from "../../assets/videos-low/c1_m_42.webp";

import c21m from "../../assets/videos-low/c21_m_19.webm";
import c21d from "../../assets/videos-low/c21_d_19.webm";
import c21td from "../../assets/videos-low/c21_d_19.webp";
import c21tm from "../../assets/videos-low/c21_m_19.webp";

import c22m from "../../assets/videos-low/c22_m_19.webm";
import c22d from "../../assets/videos-low/c22_d_19.webm";
import c22Loop from "../../assets/videos-low/c3_loop.mp3";
import c31Loop from "../../assets/videos-low/c3_loop.mp3";
import c32Loop from "../../assets/videos-low/c3_loop.mp3";
import c4Loop from "../../assets/videos-low/c3_loop.mp3";
import c22td from "../../assets/videos-low/c22_d_19.webp";
import c22tm from "../../assets/videos-low/c22_m_19.webp";

import c31m from "../../assets/videos-low/c31_m_22.webm";
import c31d from "../../assets/videos-low/c31_d_22.webm";
import c31td from "../../assets/videos-low/c31_d_22.webp";
import c31tm from "../../assets/videos-low/c31_m_22.webp";

import c32m from "../../assets/videos-low/c32_m_7.webm";
import c32d from "../../assets/videos-low/c32_d_7.webm";
import c32td from "../../assets/videos-low/c32_d_7.webp";
import c32tm from "../../assets/videos-low/c32_m_7.webp";

import c4m from "../../assets/videos-low/c4_m_14.webm";
import c4d from "../../assets/videos-low/c4_d_14.webm";
import c4td from "../../assets/videos-low/c4_d_14.webp";
import c4tm from "../../assets/videos-low/c4_m_14.webp";
import useAudioLoop from "../../components/SoundPlayer/useAudioLoop";
import Page from "../../components/Page";
import { ROUTES_NAMES } from "../../constants";
import Redirect from "react-router-dom";
import useClub from "../../hooks/useClub";
import useMediaQuery from "../../hooks/useMediaQuery";
import HomeButton from "../../components/buttons/HomeButton";
import { VideoLoader } from "./VideoLoader";
import { PayContainer } from "./PayContainer";

const BUTTON_WITH = "20%";

const videos = {
  chapter1: {
    mobile: c1m,
    desktop: c1d,
    audioLoop: cLoop,
    thumbMobile: c1tm,
    thumbDesktop: c1td,
  },
  // push bottons
  chapter2_1: {
    mobile: c21m,
    desktop: c21d,
    audioLoop: c21Loop,
    thumbMobile: c21tm,
    thumbDesktop: c21td,
  },
  // kick buttons
  chapter2_2: {
    mobile: c22m,
    desktop: c22d,
    audioLoop: c22Loop,
    thumbMobile: c22tm,
    thumbDesktop: c22td,
  },
  // rock machine
  chapter3_1: {
    mobile: c31m,
    desktop: c31d,
    audioLoop: c31Loop,
    thumbMobile: c31tm,
    thumbDesktop: c31td,
  },

  chapter3_2: {
    mobile: c32m,
    desktop: c32d,
    audioLoop: c32Loop,
    thumbMobile: c32tm,
    thumbDesktop: c32td,
  },
  chapter4: {
    mobile: c4m,
    desktop: c4d,
    audioLoop: c4Loop,
    thumbMobile: c4tm,
    thumbDesktop: c4td,
  },
};

function Minting() {
  const history = useHistory();
  const club = useClub();
  const isMobile = useMediaQuery("(max-width: 800px)");

  const bgLoop1 = useAudioLoop(videos.chapter1.audioLoop);
  const bgLoop2 = useAudioLoop(videos.chapter3_1.audioLoop);

  const { visited } = useHome();

  const [loaded, setLoaded] = useState(false);
  const [videoControl, setVideoControl] = useState(false);
  const [showButtons1, setShowButtons1] = useState(false);
  const [showButtons2, setShowButtons2] = useState(false);
  const [showMintButton, setShowMintButton] = useState(false);
  const [chapter, setChapter] = useState(1);
  const [muted, setmuted] = useState(false);
  const [thumb, setThumb] = useState(1);
  const [tx, seTx] = useState("");

  useEffect(() => {
    if (!visited) history.push(ROUTES_NAMES.HOME);
  }, [visited]);

  useEffect(() => {
    setVideoControl(true);
    //setShowButtons1(true);
  }, []);

  const onProgressChange1 = (state) => {
    if (state.playedSeconds >= 1 && state.playedSeconds < 3) {
      setThumb(2);
      bgLoop1.setPlay(true);
    }
    if (state.playedSeconds >= 36) {
      setShowButtons1(true);
    }
    if (state.playedSeconds >= 42) {
      setVideoControl(false);
    }
  };

  const onProgressChange2 = (state) => {
    if (state.playedSeconds >= 1 && state.playedSeconds <= 3) {
      setThumb(3);
      bgLoop1.setPlay(false);
      bgLoop2.setPlay(true);
    }
    if (state.playedSeconds >= 11) {
      setShowButtons2(true);
    }
    if (state.playedSeconds >= 19) {
      setVideoControl(false);
    }
  };

  const onProgressChange25 = (state) => {
    if (state.playedSeconds >= 1 && state.playedSeconds <= 3) {
      setThumb(3);
      bgLoop1.setPlay(false);
      bgLoop2.setPlay(true);
    }

    if (state.playedSeconds >= 11) {
      setShowButtons2(true);
    }
    if (state.playedSeconds >= 19) {
      setVideoControl(false);
    }
  };

  const onProgressChange3 = (state) => {
    if (state.playedSeconds >= 1 && state.playedSeconds <= 3) {
      setThumb(4);
      bgLoop2.setPlay(true);
    }
    console.log("state ", state);
    if (state.playedSeconds >= 19) {
      setShowMintButton(true);
    }
    if (state.playedSeconds >= 22) {
      setVideoControl(false);
    }
  };

  const onProgressChange35 = (state) => {
    if (state.playedSeconds >= 1 && state.playedSeconds <= 3) {
      setThumb(4);
      bgLoop2.setPlay(true);
    }
    console.log("state ", state);
    if (state.playedSeconds >= 1) {
      setShowMintButton(true);
    }
    if (state.playedSeconds >= 7) {
      setVideoControl(false);
    }
  };

  const onProgressChange5 = (state) => {
    bgLoop2.setPlay(false);
  };

  const handleMintTx = () => {
    setShowMintButton(false);
    club.mint(1).then((success) => {
      if (success) {
        console.log(JSON.stringify(success));
        seTx(success);
        setChapter(4);
        setVideoControl(true);
      } else {
        setShowMintButton(true);
      }
    });
    /*
    writeContracts &&
      writeContracts.ClubNFT.mint(1).then(result => {
        console.log(result);
        setShowMintButton(false);
        setChapter(4);
      });
     */
  };

  const onError = (error) => {
    console.error(error);
  };

  const onDurationChange = (duration) => {
    console.log("duration", duration);
  };

  const onEnded = () => {
    console.log("Video has ended");
  };

  const handleToggleMuted = () => {
    setmuted(!muted);
  };

  const kickIt = () => {
    console.log("kicked");
    setChapter(2.5);
    setThumb(2.5);
    setVideoControl(true);
  };

  const pushButtons = () => {
    console.log("pushed buttons");
    setChapter(2);
    setThumb(2);
    setVideoControl(true);
  };

  const rockMachine = () => {
    console.log("rocked machine");
    setChapter(3);
    setThumb(3);
    setVideoControl(true);
  };

  const payForPack = () => {
    console.log("paid for a pack");
    setChapter(3.5);
    setThumb(3.5);
    setVideoControl(true);
  };

  const player = (obj, onProgress, play) => {
    return (
      <ReactPlayer
        url={!isMobile ? obj.desktop : obj.mobile}
        width="0"
        height="0"
        playsinline
        playing={videoControl}
        muted={muted}
        onEnded={onEnded}
        onProgress={onProgress}
        onError={onError}
        onDuration={onDurationChange}
        onBufferEnd={(e) => console.log("onBufferEnd" + JSON.stringify(e))}
        onBuffer={(e) => console.log("onBufferEnd" + JSON.stringify(e))}
        config={{
          file: {
            attributes: {
              preload: "auto",
            },
          },
        }}
      />
    );
  };

  const ButtonContainer = ({ children, ...rest }) => {
    return (
      <div
        style={{
          position: "absolute",
          bottom: isMobile ? "7vh" : "4.48vh",
          left: 0,
          right: 0,
          width: "100vw",
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          paddingLeft: "10.78%",
          paddingRight: "10.78%",
          justifyContent: isMobile ? "space-around" : "space-between",
          alignItems: "center",
          justifyItems: "start",
          textAlign: "center",
        }}
      >
        {children}
      </div>
    );
  };

  return (
    <Page title={"Minting"}>
      {!loaded ? (
        <VideoLoader callback={setLoaded} />
      ) : (
        <div className="flex flex-col">
          <Header hasMintPass={true} transparent />
          <div className={"thumbnail-container"}>
            <img
              className={"thumbnail"}
              src={
                thumb === 1
                  ? !isMobile
                    ? videos.chapter1.thumbDesktop
                    : videos.chapter1.thumbMobile
                  : thumb === 2
                  ? !isMobile
                    ? videos.chapter2_2.thumbDesktop
                    : videos.chapter2_2.thumbMobile
                  : thumb === 2.5
                  ? !isMobile
                    ? videos.chapter2_1.thumbDesktop
                    : videos.chapter2_1.thumbMobile
                  : thumb === 3
                  ? !isMobile
                    ? videos.chapter3_1.thumbDesktop
                    : videos.chapter3_1.thumbMobile
                  : thumb === 3.5
                  ? !isMobile
                    ? videos.chapter3_2.thumbDesktop
                    : videos.chapter3_2.thumbMobile
                  : thumb === 4
                  ? !isMobile
                    ? videos.chapter4.thumbDesktop
                    : videos.chapter4.thumbMobile
                  : ""
              }
            />
            {chapter === 1 ? (
              <div className="video-container">
                {player(videos.chapter1, onProgressChange1)}
                {showButtons1 && (
                  <ButtonContainer>
                    <img
                      width={!isMobile ? BUTTON_WITH : "60%"}
                      src={giveItAKick}
                      alt="give it a kick"
                      className="cursor-pointer"
                      onClick={() => {
                        kickIt();
                        setShowButtons1(false);
                      }}
                    />
                    <div
                      style={{
                        display: isMobile ? "block" : "none",
                        minHeight: 16,
                      }}
                    />
                    <img
                      width={!isMobile ? BUTTON_WITH : "60%"}
                      src={tryPushingButtons}
                      alt="try pushing"
                      className="cursor-pointer"
                      onClick={() => {
                        pushButtons();
                        setShowButtons1(false);
                      }}
                    />
                  </ButtonContainer>
                )}
              </div>
            ) : chapter === 2.5 ? (
              <div className="video-container">
                {player(videos.chapter2_1, onProgressChange2)}
                {showButtons2 ? (
                  <ButtonContainer>
                    <img
                      width={!isMobile ? BUTTON_WITH : "60%"}
                      src={payForPartyPack}
                      alt="git it"
                      className="cursor-pointer"
                      onClick={() => {
                        payForPack();
                        setVideoControl(true);
                        setShowButtons2(false);
                      }}
                    />
                    <div
                      style={{
                        display: isMobile ? "block" : "none",
                        minHeight: 16,
                      }}
                    />
                    <img
                      width={!isMobile ? BUTTON_WITH : "60%"}
                      src={rockTheMachine}
                      alt="try pushing"
                      className="cursor-pointer"
                      onClick={() => {
                        rockMachine();
                        setVideoControl(true);
                        setShowButtons2(false);
                      }}
                    />
                  </ButtonContainer>
                ) : (
                  <></>
                )}
              </div>
            ) : chapter === 2 ? (
              <div className="video-container">
                {player(videos.chapter2_2, onProgressChange25)}
                {showButtons2 ? (
                  <ButtonContainer>
                    <img
                      width={!isMobile ? BUTTON_WITH : "60%"}
                      src={payForPartyPack}
                      alt="pay for pack"
                      className="cursor-pointer"
                      onClick={() => {
                        payForPack();
                        setVideoControl(true);
                        setShowButtons2(false);
                      }}
                    />
                    <div
                      style={{
                        display: isMobile ? "block" : "none",
                        minHeight: 16,
                      }}
                    />
                    <img
                      width={!isMobile ? BUTTON_WITH : "60%"}
                      src={rockTheMachine}
                      alt="rock machine"
                      className="cursor-pointer"
                      onClick={() => {
                        rockMachine();
                        setVideoControl(true);
                        setShowButtons2(false);
                      }}
                    />
                  </ButtonContainer>
                ) : (
                  <></>
                )}
              </div>
            ) : chapter === 3 ? (
              <div className="video-container">
                {player(videos.chapter3_1, onProgressChange3)}
                {showMintButton ? (
                  <div
                    style={{
                      position: "absolute",
                      height: "100vh",
                      width: "100vw",
                      top: 0,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      textAlign: "center",
                    }}
                  >
                    <img
                      src={payForGas}
                      alt="pay money for gas"
                      //width={350}
                      style={{
                        marginTop: "auto",
                        margin: "auto",
                        width: isMobile ? "75%" : "400px",
                      }}
                      className="cursor-pointer"
                      onClick={() => {
                        handleMintTx();
                      }}
                    />
                  </div>
                ) : (
                  <></>
                )}
              </div>
            ) : chapter === 3.5 ? (
              <div className="video-container">
                {player(videos.chapter3_2, onProgressChange35)}
                {showMintButton ? (
                  <PayContainer onClick={handleMintTx} />
                ) : (
                  <></>
                )}
              </div>
            ) : chapter === 4 ? (
              <div className="video-container">
                {player(videos.chapter4, onProgressChange5)}
                <ButtonContainer style={{ justifyContent: "center" }}>
                  <div
                    style={{
                      display: isMobile ? "none" : "block",
                    }}
                  />
                  <div
                    style={{
                      display: isMobile ? "block" : "none",
                      minHeight: 48,
                    }}
                  />
                  <a
                    className="transition-all duration-500 home-button rounded-xl bg-blue text-white md:text-2xl sm:text-4xl sm:px-12  sm:py-6 md:py-3 md:px-12 cursor-pointer font-helvetica hover:bg-blueHover"
                    href={"https://rinkeby.etherscan.io/tx/" + tx}
                    target={"_blank"}
                  >
                    {" "}
                    See on Etherscan
                  </a>
                </ButtonContainer>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      )}
    </Page>
  );
}

export default Minting;
