import { COIN_TYPE_ARG_REGEX } from "@mysten/sui.js";
import "reflect-metadata";
import { Entity, PrimaryGeneratedColumn, Column, Index } from "typeorm";
@Entity("vault")
export class Vault {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Index({ unique: true })
  address: string;

  @Column({ nullable: true })
  BASIS_POINTS: string;

  @Column({ nullable: true })
  MAX_DEPOSIT_FEE: string;

  @Column({ nullable: true })
  PRECISION_FACTOR: string;

  @Column({ nullable: true })
  VAULT_FACTORY: string;

  @Column({ nullable: true })
  accTokenPerShare: string;

  @Column({ nullable: true })
  bonusEndBlock: string;

  @Column({ nullable: true })
  depositFee: string;

  @Column({ nullable: true })
  feeToAddress: string;

  @Column({ nullable: true })
  hasUserLimit: string;

  @Column({ nullable: true })
  isInitialized: string;

  @Column({ nullable: true })
  lastRewardBlock: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  owner: string;

  @Column({ nullable: true })
  pendingOwner: string;

  @Column({ nullable: true })
  pendingReward: string;

  @Column({ nullable: true })
  poolLimitPerUser: string;

  @Column({ nullable: true })
  rewardPerBlock: string;

  @Column({ nullable: true })
  rewardToken: string;

  @Column({ nullable: true })
  stakedToken: string;

  @Column({ nullable: true })
  startBlock: string;

  @Column({ nullable: true })
  userInfo: string;
}
