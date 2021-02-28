import { Request, Response, NextFunction } from "express";
// import logger
import logger from "../utils/logger";
import { unauthorized_error_response } from "../utils/response_manager";

export const admin_verifier = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
    try {
        if(!req.body.is_admin)
        throw new Error('user is not an admin');

        next();
        return;
    } catch (error) {
        logger.error(error);
        return unauthorized_error_response(res, error.message, null);
    }
}
