import React, { useEffect } from "react";
import NProgress from "nprogress";

const LoadingScreen = ({ transparent = true }) => {
  useEffect(() => {
    NProgress.start();

    return () => {
      NProgress.done();
    };
  }, []);

  return (
    <div>
      Loading...
      {/*
       * TODO add a circular progress here
       * */}
    </div>
  );
};

export default LoadingScreen;
