import { Request, Response, NextFunction } from "express";
import { UserBusinessesService } from "@services/index";
import { success_response, bad_request_response, logger } from "@utils/index";

const userBusinessesService = new UserBusinessesService();

export class UserBusinessesController {
  constructor() {}

  // Get all user businesses for admin
  async get_userbusinesses(req: Request, res: Response) {
    if (req.query) {
      req.body = { ...req.body, ...req.query };
    }
    try {
      const user_businesses = await userBusinessesService.get_userbusinesses(
        req.body
      );
      return success_response(
        res,
        "Businesses successfully fetched",
        user_businesses
      );
    } catch (error) {
      logger.error(error);
      return bad_request_response(res, error.message, null);
    }
  }
}
