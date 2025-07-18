import { Request, Response, NextFunction } from "express";

type AsynControllerType = (req: Request, res: Response, next: NextFunction) => Promise<any>;

const asyncHandler =
  (controller: AsynControllerType): AsynControllerType =>
  async (req, res, next) => {
    try {
      await controller(req, res, next);
    } catch (error) {
      next(error);
    }
  };

export default asyncHandler;
