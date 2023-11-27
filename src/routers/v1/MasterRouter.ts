import { Router } from "express";
import { UserRouter } from "./UserRouter";
import { RewardRouter } from "./RewardRouter";

export class MasterRouter {
  private readonly _router = Router();

  constructor(private readonly rewardRouter: RewardRouter) {
    this._configure();
  }

  get router() {
    return this._router;
  }

  /**
   * Connect routes to their matching routers.
   */
  private _configure() {
    this._router.use("/reward", this.rewardRouter.router);
  }
}
