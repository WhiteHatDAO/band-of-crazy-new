const testNetConfigs = {
  /* These are used to display the website even if no wallet is present on the browser
   *   if there is a wallet on the browser that RPC will be used instead
   *  */
  chainId: 4, // chain ID in decimals
  chainIdHex: "0x4",
  NetworkName: "Rinkeby", // network name
  rpcUrl: "https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161", // RPC url
  explorer: "https://rinkeby.etherscan.io/", // block explorer
  opensea: "https://testnets.opensea.io/assets/rinkeby/",

  // project info
  clubNFT: "0x161cD38c680708AeB310BfB7788435d5D8DfF25d", // put band of crazy contract here,

  netAddRequest: {
    method: "wallet_addEthereumChain",
    params: [
      {
        chainId: "0x4",
        chainName: "Rinkeby Test Network",
        nativeCurrency: {
          name: "Ethereum",
          symbol: "ETH", // 2-6 characters long
          decimals: 18,
        },
        blockExplorerUrls: ["https://rinkeby.etherscan.io/"],
        rpcUrls: [
          "https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
        ],
      },
    ],
  },
};

// put main net confogs here
const mainNetConfigs = {
  chainId: 1,
  NetworkName: "Ethereum Mainnet",
  rpcUrl: "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161", // RPC url
  explorer: "https://etherscan.io/", // block explorer

  mintContract: "",

  netAddRequest: {
    method: "wallet_addEthereumChain",
    params: [
      {
        chainId: "0x1",
        chainName: "Ethereum Mainnet",
        nativeCurrency: {
          name: "Ethereum",
          symbol: "ETH", // 2-6 characters long
          decimals: 18,
        },
        blockExplorerUrls: ["https://etherscan.io/"],
        rpcUrls: [
          "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
        ],
      },
    ],
  },
};

module.exports = testNetConfigs; // if main net change this to configs;
