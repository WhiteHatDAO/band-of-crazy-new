import { chainId } from "./configs";

/**
 * @param realContract{web3.eth.Contract}
 * @param provider {web3}
 * @return {Promise<BN>}
 */
export const getClubSalePrice = async (realContract, provider) => {
  //const realContract = getRealContract(clubNFT, provider,clubABI);
  return realContract.methods.mintPrice().call();
};

/**
 *
 * @param realContract{web3.eth.Contract}
 * @param account{string}
 * @return {Promise<boolean>}
 */
export const isUserOnPresaleList = async (realContract, account) => {
  return realContract.methods.presaleList(account).call();
};

/**
 *
 * @param realContract
 * @param provider
 * @param account
 * @param amount
 * @param salePrice in wei
 * @return {Promise<Transaction>}
 */
export const mintClubNft = async (
  realContract,
  provider,
  account,
  amount,
  salePrice
) => {
  if (provider.currentProvider) provider = provider.currentProvider;

  const data = realContract.methods.mint(amount).encodeABI();

  const transactionParams = {
    to: realContract.options.address,
    from: account,
    data: data,
    chainId: chainId,
    value: "0x" + (Number(salePrice) * Number(amount)).toString(16),
  };

  return provider.request({
    method: "eth_sendTransaction",
    params: [transactionParams],
  });
};
