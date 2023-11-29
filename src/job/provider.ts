import { ethers } from "ethers";


export const providerKlaytn = new ethers.providers.JsonRpcBatchProvider(
  "https://rpc.ankr.com/klaytn_testnet",
  { name: "KLAY", chainId: 1001 }
);
