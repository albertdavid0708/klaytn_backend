import { NextFunction, Request, Response, Router } from "express";
import { IUserService } from "../../services/IUserService";
import { calculateReward } from "../../job/JobSyncVaultFactory";

export class RewardRouter {
  private readonly _router = Router();

  constructor() {
    this._configure();
  }

  get router() {
    return this._router;
  }

  private _configure() {
    this._router.get(
      "/:address",
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
  }
}
