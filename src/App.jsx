import React from "react";
import { createBrowserHistory } from "history";
import routes, { renderRoutes } from "./routes";
import { HashRouter } from "react-router-dom";
import { WalletProvider } from "./context/WalletContext";
import { HomeProvider } from "./context/HomeContext";
import { ClubProvider } from "./context/ClubContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const history = createBrowserHistory();

const App = () => {
  return (
    <div className="App font-helvetica">
      <HomeProvider>
        <WalletProvider>
          <ClubProvider>
            <HashRouter history={history}>{renderRoutes(routes)}</HashRouter>
          </ClubProvider>
        </WalletProvider>
      </HomeProvider>
      <ToastContainer position="bottom-right" autoClose={2000} />
    </div>
  );
};
export default App;
