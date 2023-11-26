import { ethers } from "ethers";
import Web3 from "web3";
import { env } from "../config/config";
const EthCrypto = require("eth-crypto");

const providerCache: Record<number, ethers.providers.JsonRpcProvider> = {};

const getProvider = (chainId: number, rpcURL: string, name: string) => {
  console.log(chainId, rpcURL, name);
  if (!providerCache[chainId]) {
    providerCache[chainId] = new ethers.providers.JsonRpcProvider(rpcURL, {
      name: name,
      chainId: chainId,
    });
  }
  return providerCache[chainId];
};
const crawlEVMLogs = async (
  rpcUrl: string,
  fromBlock: number,
  toBlock: number,
  addresses: string[]
) => {
  const logs = new Web3(rpcUrl).eth.getPastLogs({
    fromBlock: fromBlock,
    toBlock: toBlock,
    address: addresses,
  });
  return logs;
};

const signMessage = async (messageToSign: any[]) => {
  const dataHash = EthCrypto.hash.keccak256(messageToSign);
  let dataHashBin = ethers.utils.arrayify(dataHash);
  let wallet = new ethers.Wallet(env.privateKey);
  // const signature = await wallet.signMessage(dataHashBin);

  const signature = await wallet.signMessage(dataHashBin);
  // const signature = EthCrypto.sign(config.blockchain.hot_wallet_private_key, dataHash);
  const r = signature.slice(0, 66);
  const s = "0x" + signature.slice(66, 130);
  const v = parseInt(signature.slice(130, 132), 16);
  return { sign: signature };
};
export { getProvider, crawlEVMLogs, signMessage };
