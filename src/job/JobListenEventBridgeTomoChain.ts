import { ethers } from "ethers";
import { env } from "../config/config";
import sepoliaABI from "../../assets/sepoliaABI.json";
import Alphacado from "../../assets/Alphacado.json";
import { baseJob } from "./JobBase";
import { providerKlaytn, providerTomoChain } from "./provider";
import { createRedisClient } from "../database/Redis";

const connectionUrl = "https://ethereum-sepolia.blockpi.network/v1/rpc/public";
const network = {
  name: "ETH",
  chainId: 11155111,
};
const redis = createRedisClient();

const eventName = "CrossChainRequest";
async function listenEventBridge(
  blockNumber: number,
  providerBridgeChain: ethers.providers.JsonRpcProvider,
  alphacadoAddress: string
): Promise<number> {
  console.log("currentblock", blockNumber);
  const provider = new ethers.providers.JsonRpcProvider(connectionUrl, network);

  const wallet = new ethers.Wallet(env.privateKey, providerBridgeChain);

  const contract = new ethers.Contract(
    env.address.sepolia,
    sepoliaABI,
    provider
  );
  const contractKlaytn = new ethers.Contract(
    alphacadoAddress,
    Alphacado,
    wallet
  );

  const keyRedis = alphacadoAddress;

  const filter = contract.filters[eventName]();
  const currentBlockNumber = await provider.getBlockNumber();

  const fromBlock = currentBlockNumber - 1024;

  const logs = (
    await contract.queryFilter(filter, fromBlock, currentBlockNumber)
  ).reverse();
  if (logs.length === 0) {
    return blockNumber;
  }
  for (const l of logs) {
    if (l.blockNumber === blockNumber) {
      await redis.set(keyRedis, blockNumber);
      return logs[0].blockNumber;
    }
    const args: any = l.args;
    try {
      const tx = await contractKlaytn.receivePayloadAndTokens(
        args.payload,
        args.USDCAmount.toString(),
        {
          gasLimit: 500000,
        }
      );
      const receipt_2 = await tx.wait();
      console.log("Transaction mined:", receipt_2.transactionHash);
    } catch (error) {}
  }

  return logs[0].blockNumber;
}
async function JobBridge() {
  const INTERVAL = 1 * 1000;
  let blockNumber = 4789648;

  const test = await redis.get(env.address.alphacadoAddress)
  console.log(test)
  baseJob(
    () => {
      return false;
    },
    async () => {
      blockNumber = await listenEventBridge(
        blockNumber,
        providerTomoChain,
        env.address.alphacadoAddress
      );
    },
    INTERVAL
  );
}

JobBridge().then();
