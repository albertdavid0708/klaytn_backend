import { User } from "../../entities/User";
import {} from "typedi";
import { IUserService } from "../IUserService";
import { IUserRepo } from "../../repositories/IUserRepo";
import { IRewardService } from "../IRewardService";
import { DataSource } from "typeorm";
import { Vault } from "../../entities/Vault";

export class RewardService implements IRewardService {
  vaultRepo: any;

  constructor(private readonly dataSource: DataSource) {
    this.vaultRepo = this.dataSource.getRepository(Vault);
  }
  public async getVaults(): Promise<any> {
    return this.vaultRepo.find({});
  }
}
