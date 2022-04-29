const Web3 = require("web3");

/**
 * receives an eth provider as rpc url string or as a provider and converts it to a Web3 provider
 * @param provider
 * @return {Promise<Web3>}
 */
export const getRealProvider = async (provider) => {
  let realProvider;

  if (typeof provider === "string") {
    if (provider.includes("wss")) {
      realProvider = new Web3.providers.WebsocketProvider(provider, {
        timeout: 10000,
      });
    } else {
      realProvider = new Web3.providers.HttpProvider(provider, {
        timeout: 10000,
      });
    }
  } else {
    realProvider = provider;
  }

  return new Web3(realProvider);
};

/**
 * creates a web3 Contract object
 * @param address
 * @param provider
 * @param abi
 * @return {Promise<Contract>}
 */
export const getRealContract = async (address, provider, abi) => {
  return new provider.eth.Contract(abi, address);
};

// helper functions
export const waitForTransaction = async (pendingTxHash, provider) => {
  return new Promise(async (resolve, reject) => {
    let receipt;
    do {
      await sleep(2200); // this will be roughly one block on Polygon main net
      receipt = await provider.eth
        .getTransactionReceipt(pendingTxHash)
        .catch((error) => reject(error));
    } while (!receipt);
    //await sleep(4000); // lets wait for 2 more blocks to comfirm
    resolve(receipt);
  });
};

/**
 * @param provider
 * @param account
 * @return {Promise<string>}
 */
export const getNativeTokenBalance = async (provider, account) => {
  return provider.eth.getBalance(account);
};

/**
 * @param ms
 * @return {Promise<unknown>}
 */
export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
