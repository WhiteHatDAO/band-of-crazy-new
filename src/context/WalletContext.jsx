import React, { createContext, useEffect, useState } from "react";
import {
  getNativeTokenBalance,
  getRealProvider,
  waitForTransaction,
} from "../utils/web3/genralUtils";
import {
  chainId,
  netAddRequest,
  rpcUrl,
  explorer,
} from "../utils/web3/configs";
import web3ModalSetup from "../utils/web3/web3ModelSetup";
import Web3 from "web3";
import useIsMountedRef from "../hooks/useIsMounted";
const web3Modal = web3ModalSetup();

const WalletContext = createContext({
  switchNetwork: null,
  nativeBalance: null,
  provider: null,
  getEthProvider: () => {},
  connect: () => {},
  wrongNet: false,
  connected: false,
  account: null,
  readProvider: null,
  disconnect: () => {},
});

export const WalletProvider = ({ children }) => {
  const isMounted = useIsMountedRef();

  const [provider, setProvider] = useState();
  const [readProvider, setReadProvider] = useState();
  const [account, setAccount] = useState();

  const [connected, setConnected] = useState(false);
  const [wrongNet, setWrongNet] = useState(false);
  const [nativeBalance, setNativeBalance] = useState();

  const [time, setTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setTime(performance.now()), 10000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    console.log("nativeBalance = " + nativeBalance);
  }, [nativeBalance]);

  useEffect(() => {
    if (account && provider)
      getNativeTokenBalance(provider, account).then((balance) => {
        if (isMounted) setNativeBalance(balance);
      });
  }, [account, provider, time]);

  useEffect(() => {
    if (provider) {
      // Subscribe to accounts change
      provider.currentProvider.on("accountsChanged", (accounts) => {
        if (!isMounted) return;
        setAccount(accounts[0]);
      });

      // Subscribe to chainId change
      provider.currentProvider.on("chainChanged", (chainIdArg) => {
        if (!isMounted) return;
        if (Number(chainIdArg) != chainId) setWrongNet(true);
        else setWrongNet(false);
      });

      // Subscribe to provider connection
      provider.currentProvider.on("connect", ({ chainId }) => {
        if (!isMounted) return;
        setConnected(true);
      });

      // Subscribe to provider disconnection
      provider.currentProvider.on("disconnect", ({ code, message }) => {
        if (!isMounted) return;
        setConnected(false);
        setAccount(null);
      });
    }
  }, [provider]);

  useEffect(() => {
    initReadProvider();
    if (web3Modal.cachedProvider) connect();
  }, []);

  const getEthProvider = async () =>
    connected && !wrongNet ? provider : readProvider;

  const switchNetwork = async () => {
    try {
      // try and switch network
      await provider.currentProvider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x" + chainId.toString(16) }], // chainId must be
        // in hexadecimal
        // numbers
      });
    } catch (error) {
      // This error code indicates that the chain has not been added to MetaMask
      // if it is not, then lets add it into the user MetaMask
      if (error.code === 4902) {
        try {
          await provider.currentProvider.request(netAddRequest);
        } catch (addError) {
          console.error(addError);
        }
      }
      console.error(error.message);
      /*
      enqueueSnackbar(error.message, {
        variant: "error",
        autoHideDuration: 2000,
      });
      */
    }
  };

  const initReadProvider = async () => {
    await getRealProvider(rpcUrl).then((prov) => {
      if (isMounted) setReadProvider(prov);
    });
  };

  const connect = () => {
    web3Modal
      .connect()
      .then((instance) => {
        setConnected(true);
        if (Number(instance.chainId) != chainId) setWrongNet(true);
        console.log(instance.selectedAddress);
        setProvider(new Web3(instance));
        setAccount(instance.selectedAddress);
      })
      .catch((error) => {});
  };

  const disconnect = async () => {
    web3Modal.clearCachedProvider();
    if (provider) {
      await provider.disconnect();
    }
    setConnected(false);
    setWrongNet(false);
  };

  return (
    <WalletContext.Provider
      value={{
        provider,
        connected,
        account,
        readProvider,
        wrongNet,
        nativeBalance,
        switchNetwork: switchNetwork,
        connect,
        disconnect,
        getEthProvider,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const WalletConsumer = WalletContext.Consumer;

export default WalletContext;

export const handleTransactionPromise = async ({
  transactionPromise,
  successMessage,
  enqueueSnackbar,
  ethereum,
}) => {
  let tx;
  try {
    tx = await transactionPromise;
    const receipt = await waitForTransaction(tx, ethereum);

    if (receipt.status) {
      // transaction mined and did not revert
      enqueueSnackbar(successMessage, {
        variant: "success",
        autoHideDuration: 2000,
      });
      return true;
    } else {
      // transaction mined and did revert
      enqueueSnackbar("Transaction Reverted 😢", { variant: "error" });
      return false;
    }
  } catch (error) {
    enqueueSnackbar(error.message + " 😢", { variant: "error" });
    return false;
  }
};
