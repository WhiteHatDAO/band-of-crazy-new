import React, { createContext, useEffect, useState } from "react";
import { getRealContract, waitForTransaction } from "../utils/web3/genralUtils";
import { clubNFT } from "../utils/web3/configs";
import useIsMountedRef from "../hooks/useIsMounted";
import useWallet from "../hooks/useWallet";
import clubABI from "../utils/web3/abi/ClubABI";
import {
  getClubSalePrice,
  isUserOnPresaleList,
  mintClubNft,
} from "../utils/web3/clubUtils";
import { toast } from "react-toastify";

const ClubContext = createContext({
  readContract: null,
  writeContract: null,
  presalePrice: null,
  isWhitelisted: async (address) => {},
  mint: (amount) => {},
});

export const ClubProvider = ({ children }) => {
  const isMounted = useIsMountedRef();
  const wallet = useWallet();

  const [readContract, setReadContract] = useState();
  const [writeContract, setWriteContract] = useState();
  const [salePrice, setSalePrice] = useState();
  const [isWhitelisted, setIsWhitelisted] = useState();

  useEffect(() => {
    console.log("salePrice = " + salePrice);
  }, [salePrice]);

  useEffect(() => {
    getSalePrice();
  }, [readContract]);

  useEffect(() => {
    if (wallet.provider) {
      getRealContract(clubNFT, wallet.provider, clubABI).then(
        (realContract) => {
          if (isMounted) {
            setWriteContract(realContract);
          }
        }
      );
    }
  }, [wallet.provider]);

  useEffect(() => {
    if (wallet.readProvider) {
      getRealContract(clubNFT, wallet.readProvider, clubABI).then(
        (realContract) => {
          if (isMounted) {
            setReadContract(realContract);
          }
        }
      );
    }
  }, [wallet.readProvider]);

  useEffect(() => {
    initIsWhitelisted();
  }, [wallet.account]);

  const getSalePrice = () => {
    if (readContract) {
      getClubSalePrice(readContract, wallet.provider).then((price) => {
        if (isMounted) {
          setSalePrice(price);
        }
      });
    }
  };

  const mint = async (amount) => {
    console.log("salePrice = " + salePrice);
    console.log("nativeBalance = " + wallet.nativeBalance);
    const neededBalance = amount * salePrice;
    if (Number(neededBalance) >= wallet.nativeBalance) {
      toast.error("insufficient balance 😲");
      return false;
    }
    const tx = mintClubNft(
      writeContract,
      wallet.provider,
      wallet.account,
      amount,
      salePrice
    );
    return await handleTransactionPromise(
      tx,
      "Party Pack minted successfully",
      toast,
      wallet.provider
    );
  };

  const initIsWhitelisted = () => {
    if (
      wallet.account &&
      wallet.provider &&
      !wallet.wrongNet &&
      writeContract
    ) {
      isUserOnPresaleList(writeContract, wallet.account).then((isListed) => {
        if (isMounted) {
          setIsWhitelisted(isListed);
        }
      });
    }
  };

  return (
    <ClubContext.Provider
      value={{
        readContract,
        writeContract,
        salePrice,
        mint,
        isWhitelisted,
      }}
    >
      {children}
    </ClubContext.Provider>
  );
};

export const ClubConsumer = ClubContext.Consumer;

export default ClubContext;

/**
 *
 * @param transactionPromise
 * @param successMessage
 * @param toast
 * @param provider
 * @return {Promise<boolean>}
 */
export const handleTransactionPromise = async (
  transactionPromise,
  successMessage,
  toast,
  provider
) => {
  let tx;
  try {
    tx = await transactionPromise;
    const receipt = await waitForTransaction(tx, provider);

    if (receipt.status) {
      // transaction mined and did not revert
      if (toast) {
        toast.success(successMessage + " 👌");
      }
      return true;
    } else {
      // transaction mined and did revert
      if (toast) {
        toast.error("Transaction Reverted 😢");
      }
      return false;
    }
  } catch (error) {
    if (toast) {
      toast.error(error.message + " 😢");
    }
    return false;
  }
};
