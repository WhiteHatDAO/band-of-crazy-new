import React, { createContext, useState } from "react";

const HomeContext = createContext({
  visited: null,
  homeVisited: () => {},
});

export const HomeProvider = ({ children }) => {
  const [visited, setVisited] = useState(false);

  const homeVisited = () => {
    setVisited(true);
  };

  return (
    <HomeContext.Provider
      value={{
        visited,
        homeVisited,
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};

export const HomeConsumer = HomeContext.Consumer;

export default HomeContext;
