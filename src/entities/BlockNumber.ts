import { number } from "joi";
import "reflect-metadata";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  Index,
} from "typeorm";
import { BaseEntityWithTimestamps } from "./Base";
import { Contract } from "./Contract";

@Entity("blocknumber")
export class BlockNumber extends BaseEntityWithTimestamps {
  @PrimaryGeneratedColumn()
  id: number;

  @Index({ unique: true })
  @Column({ name: "address" })
  address: string;

  @Column({ name: "blocknumber" })
  blockNumber: number;
}
