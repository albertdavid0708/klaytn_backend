import { NextFunction, Request, Response, Router } from "express";
import { IUserService } from "../../services/IUserService";
import { calculateReward } from "../../job/JobSyncVaultFactory";
import { RewardService } from "../../services/impl/RewardService";
import { IRewardService } from "../../services/IRewardService";

export class RewardRouter {
  private readonly _router = Router();

  constructor(private readonly rewardService: IRewardService) {
    this._configure();
    this.rewardService = rewardService;
  }

  get router() {
    return this._router;
  }

  private _configure() {
    this._router.get(
      "/reward/:address",
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const address: string = req.params.address.toString();
          res
            .status(200)
            .json({ data: { reward: await calculateReward(address) } });
        } catch (error) {
          next(error);
        }
      }
    );
    this._router.get(
      "/vaults",
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          res
            .status(200)
            .json({
              message: "Success",
              code: 200,
              data: await this.rewardService.getVaults(),
            });
        } catch (error) {
          next(error);
        }
      }
    );
  }
}
