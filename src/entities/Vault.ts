import { COIN_TYPE_ARG_REGEX } from "@mysten/sui.js";
import "reflect-metadata";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("vault")
export class Vault {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  address: string;

  @Column()
  BASIS_POINTS: string;

  @Column()
  MAX_DEPOSIT_FEE: string;

  @Column()
  PRECISION_FACTOR: string;
  @Column()
  VAULT_FACTORY: string;

  @Column()
  accTokenPerShare: string;

  @Column()
  bonusEndBlock: string;

  @Column()
  depositFee: string;

  @Column()
  feeToAddress: string;

  @Column()
  hasUserLimit: string;

  @Column()
  isInitialized: string;

  @Column()
  lastRewardBlock: string;

  @Column()
  name: string;

  @Column()
  owner: string;

  @Column()
  pendingOwner: string;

  @Column()
  pendingReward: string;

  @Column()
  poolLimitPerUser: string;

  @Column()
  rewardPerBlock: string;

  @Column()
  rewardToken: string;

  @Column()
  stakedToken: string;

  @Column()
  startBlock: string;

  @Column()
  userInfo: string;
}
