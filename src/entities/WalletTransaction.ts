import "reflect-metadata";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { BaseEntityWithTimestamps } from "./Base";
import { Currency } from "./Currency";
import { Contract } from "./Contract";
import { TransactionType } from "../utils/Enum";

@Entity("wallet_transactions")
export class WalletTransaction extends BaseEntityWithTimestamps {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Currency, (currency) => currency.contracts)
  @JoinColumn({ name: "currency_id" })
  currency: Currency;

  @Column({
    type: "enum",
    enum: TransactionType,
    default: TransactionType.Deposit, // Set a default value if needed
  })
  type: TransactionType;

  @ManyToOne(() => Contract, (contract) => contract.trxs)
  @JoinColumn({ name: "contract_id" })
  contract: Contract;

  @Column()
  address: string;

  @Column()
  signature: string;

  @Column()
  amount: string;

  @Column({ name: "approved_by" })
  approvedBy: string;

  @Column({ name: "tx_hash", type: "varchar", length: 66 }) // Assuming it's a hash, change length accordingly
  txHash: string;

  @Column({ type: "text" }) // Adjust data type based on the size and nature of the data
  data: string;
}
