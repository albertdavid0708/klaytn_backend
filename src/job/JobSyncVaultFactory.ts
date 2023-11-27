import { ethers } from "ethers";
import { mysqlDataSource } from "../database/MyDataSource";
import VaultFactoryABI from "../../assets/VaultFactoryABI.json";
import VaultABI from "../../assets/VaultABI.json";
import stakeTokenABI from "../../assets/stakeTokenABI.json";
import { env } from "../config/config";
import { Vault } from "../entities/Vault";

function getMultiplier(_from: number, _to: number, bonusEndBlock: number) {
  if (_to <= bonusEndBlock) {
    return _to - _from;
  } else if (_from >= bonusEndBlock) {
    return 0;
  } else {
    return bonusEndBlock - _from;
  }
}
async function calculateReward(address: string) {
  const provider = new ethers.providers.JsonRpcProvider(
    "https://bsc-testnet.blockpi.network/v1/rpc/public",
    { name: "BSCTestnet", chainId: 97 }
  );
  const contract = new ethers.Contract(
    env.address.vaultFactory,
    VaultFactoryABI,
    provider
  );

  const contractVaultAddress = new ethers.Contract(
    env.address.vaultAddress,
    VaultABI,
    provider
  );

  const contractStakeToken = new ethers.Contract(
    "0x3675f46Da63a18Ba60bc5bbfD63ee8a9EFa0F554",
    stakeTokenABI,
    provider
  );

  console.log(await contractVaultAddress.PRECISION_FACTOR());
  const vault = new Vault();
  vault.address = env.address.vaultAddress;
  vault.BASIS_POINTS = await contractVaultAddress.BASIS_POINTS();
  vault.BASIS_POINTS = await contractVaultAddress.BASIS_POINTS();
  provider.getBlockNumber();

  const stakedTokenSupply = (
    await contractStakeToken.balanceOf(env.address.vaultAddress)
  ).toString();
  const blockNumber = await provider.getBlockNumber();
  const lastRewardBlock = +(
    await contractVaultAddress.lastRewardBlock()
  ).toString();
  const userInfo = await contractVaultAddress.userInfo(address);
  const userAmount = +userInfo[0].toString();
  const rewardDebt = +userInfo[1].toString();
  const PRECISION_FACTOR = +(
    await contractVaultAddress.PRECISION_FACTOR()
  ).toString();
  const accTokenPerShare = +(
    await contractVaultAddress.accTokenPerShare()
  ).toString();
  let reward = 0;

  if (blockNumber > +lastRewardBlock && stakedTokenSupply != 0) {
    const bonusEndBlock = +(
      await contractVaultAddress.bonusEndBlock()
    ).toString();

    const multiplier = getMultiplier(
      lastRewardBlock,
      blockNumber,
      bonusEndBlock
    );
    const cakeReward =
      multiplier * +(await contractVaultAddress.rewardPerBlock()).toString();
    const adjustedTokenPerShare =
      accTokenPerShare + (cakeReward * PRECISION_FACTOR) / stakedTokenSupply;
    console.log(adjustedTokenPerShare);
    reward =
      (userAmount * adjustedTokenPerShare) / PRECISION_FACTOR - rewardDebt;
  } else {
    reward = (userAmount * accTokenPerShare) / PRECISION_FACTOR - rewardDebt;
  }
  return reward;
}

async function syncVaultFactory() {
  const INTERVAL = 10 * 60 * 1000;
  const provider = new ethers.providers.JsonRpcProvider(
    "https://bsc-testnet.blockpi.network/v1/rpc/public",
    { name: "BSCTestnet", chainId: 97 }
  );
  const contract = new ethers.Contract(
    env.address.vaultFactory,
    VaultFactoryABI,
    provider
  );

  const contractVaultAddress = new ethers.Contract(
    env.address.vaultAddress,
    VaultABI,
    provider
  );

  const contractStakeToken = new ethers.Contract(
    "0x3675f46Da63a18Ba60bc5bbfD63ee8a9EFa0F554",
    stakeTokenABI,
    provider
  );

  console.log(await contractVaultAddress.PRECISION_FACTOR());
  const vault = new Vault();
  vault.address = env.address.vaultAddress;
  vault.BASIS_POINTS = await contractVaultAddress.BASIS_POINTS();
  vault.BASIS_POINTS = await contractVaultAddress.BASIS_POINTS();
  provider.getBlockNumber();

  const stakedTokenSupply = (
    await contractStakeToken.balanceOf(env.address.vaultAddress)
  ).toString();
  const blockNumber = await provider.getBlockNumber();
  const lastRewardBlock = +(
    await contractVaultAddress.lastRewardBlock()
  ).toString();
  const userInfo = await contractVaultAddress.userInfo(
    "0x6D00dA71e63bD0358556877FB1a329cEAD56f672"
  );
  const userAmount = +userInfo[0].toString();
  const rewardDebt = +userInfo[1].toString();
  const PRECISION_FACTOR = +(
    await contractVaultAddress.PRECISION_FACTOR()
  ).toString();
  const accTokenPerShare = +(
    await contractVaultAddress.accTokenPerShare()
  ).toString();
  let reward = 0;

  if (blockNumber > +lastRewardBlock && stakedTokenSupply != 0) {
    const bonusEndBlock = +(
      await contractVaultAddress.bonusEndBlock()
    ).toString();

    const multiplier = getMultiplier(
      lastRewardBlock,
      blockNumber,
      bonusEndBlock
    );
    const cakeReward =
      multiplier * +(await contractVaultAddress.rewardPerBlock()).toString();
    const adjustedTokenPerShare =
      accTokenPerShare + (cakeReward * PRECISION_FACTOR) / stakedTokenSupply;
    console.log(adjustedTokenPerShare);
    reward =
      (userAmount * adjustedTokenPerShare) / PRECISION_FACTOR - rewardDebt;
  } else {
    reward = (userAmount * accTokenPerShare) / PRECISION_FACTOR - rewardDebt;
  }
  console.log(reward);

  // const filter = {
  //   address: env.address.vaultFactory,
  // };
  // const currentBlock = await provider.getBlockNumber();
  // const logs = await provider.getLogs({
  //   address: env.address.vaultFactory,
  //   fromBlock: currentBlock - 1023,
  //   toBlock: currentBlock,
  // });
  // console.log(logs);

  const dataSource = mysqlDataSource;
  await dataSource.initialize();
  setInterval(async () => {
    try {
    } catch (error) {
      console.error(error);
    }
  }, INTERVAL);
}

export { calculateReward };
