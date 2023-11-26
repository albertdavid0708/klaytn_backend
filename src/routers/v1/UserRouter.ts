import { NextFunction, Request, Response, Router } from "express";
import { IUserService } from "../../services/IUserService";
import { IAuthService } from "../../services/IAuthService";
import { IPaymentService } from "../../services/IPaymentService";

export class UserRouter {
  private readonly _router = Router();

  constructor(
    private readonly userService: IUserService,
    private readonly authService: IAuthService,
    private readonly paymentService: IPaymentService
  ) {
    this._configure();
  }

  get router() {
    return this._router;
  }

  private _configure() {
    this._router.get(
      "/:id",
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          res
            .status(200)
            .json(await this.userService.findOneById(parseInt(req.params.id)));
        } catch (error) {
          next(error);
        }
      }
    );

    this._router.post(
      "",
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          res
            .status(200)
            .json(await this.userService.findOneById(parseInt(req.params.id)));
        } catch (error) {
          next(error);
        }
      }
    );
    this._router.post(
      "/recover-address",
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          res
            .status(200)
            .json(
              await this.authService.recoverAddress(
                req.body.message,
                req.body.signature
              )
            );
        } catch (error) {
          next(error);
        }
      }
    );
    this._router.post(
      "/request-withdrawal",
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          res
            .status(200)
            .json(
              await this.paymentService.requestWithdrawal(
                req.body.address,
                req.body.amount,
                97,
                req.body.symbol,
                req.body.withdrawalId
              )
            );
        } catch (error) {
          next(error);
        }
      }
    );
  }
}
