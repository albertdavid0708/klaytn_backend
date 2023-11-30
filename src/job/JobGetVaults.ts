import { ethers } from "ethers";
import { env } from "../config/config";
import VaultFactoryABI from "../../assets/VaultFactoryABI.json";
import VaultABI from "../../assets/VaultABI.json";
import { baseJob } from "./JobBase";
import { providerKlaytn } from "./provider";
import { log } from "console";
import { mysqlDataSource } from "../database/MyDataSource";
import { DataSource } from "typeorm";
import { Vault } from "../entities/Vault";
import { BlockNumber } from "../entities/BlockNumber";

async function getVaultEvent(mysqlDataSource: DataSource) {
  const vaultRepository = mysqlDataSource.getRepository(Vault);
  const blockNumberRepository = mysqlDataSource.getRepository(BlockNumber);

  const contractKlaytn = new ethers.Contract(
    env.address.vaultFactory,
    VaultFactoryABI,
    providerKlaytn
  );

  let blockNumberDatabase = await blockNumberRepository.findOne({
    where: {
      address: env.address.vaultFactory,
    },
  });
  if (blockNumberDatabase === null) {
    blockNumberDatabase = new BlockNumber();
    blockNumberDatabase.address = env.address.vaultFactory;
    blockNumberDatabase.blockNumber = 0;
  }
  const eventName = "NewVault";
  const filter = contractKlaytn.filters[eventName]();
  const currentBlockNumber = await providerKlaytn.getBlockNumber();
  let fromBlock: number;
  fromBlock = currentBlockNumber - 1024;
  const logs = (
    await contractKlaytn.queryFilter(filter, fromBlock, currentBlockNumber)
  ).reverse();

  for (const l of logs) {
    const args: any = l.args;
    const vaultAddress = args.vault;

    const contractVault = new ethers.Contract(
      vaultAddress,
      VaultABI,
      providerKlaytn
    );
    const name = await contractVault.name();
    const newVault = new Vault();
    newVault.address = vaultAddress;
    newVault.name = name;
    try {
      await vaultRepository.save(newVault);
    } catch (e) {
      console.log(e);
    }
  }
  if (logs.length > 0) {
    blockNumberDatabase.blockNumber = logs[0].blockNumber;
  }
  await blockNumberRepository.save(blockNumberDatabase);

  return 0;
}
async function JobGetVault() {
  const dataSource = mysqlDataSource;
  await dataSource.initialize();
  const INTERVAL = 5 * 1000;
  let blockNumber = 4789648;
  baseJob(
    () => {
      return false;
    },
    async () => {
      blockNumber = await getVaultEvent(mysqlDataSource);
    },
    INTERVAL
  );
}

JobGetVault().then();
