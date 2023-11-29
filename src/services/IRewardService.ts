import { User } from "../entities/User";

export type IRewardService = {
  getVaults: () => Promise<any>;
};
