import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntityWithTimestamps } from "./Base";

@Entity("logs")
export class LogDatabase extends BaseEntityWithTimestamps {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "status_code" })
  statusCode: number;

  @Column()
  payload: string;
}
