import { Request, Response, NextFunction } from "express";
import { UsersService } from "../services/users.service";
import {
  success_response,
  bad_request_response,
} from "../utils/response_manager";

// import logger
import logger from "../utils/logger";

const usersService = new UsersService();

export class UsersController {
  constructor() {}

  async test(req: Request, res: Response) {
    const response = usersService.test(req.body);
    return res.send(response);
  }

  // User register controller function
  async register(req: Request, res: Response) {
    try {
      const register = await usersService.register(req.body);
      return success_response(res, "User Successfully registers", register);
    } catch (error) {
      logger.error(error);
      return bad_request_response(res, error.message, null);
    }
  }

  // Get user account details
  async get_user_details(req: Request, res: Response) {
    try {
      const user_details = await usersService.get_user_details(req.body);
      return success_response(
        res,
        "User details successfully fetched",
        user_details
      );
    } catch (error) {
      logger.error(error);
      return bad_request_response(res, error.message, null);
    }
  }

  // Get all user details for admin
  async get_users(req: Request, res: Response) {
    if (req.query) {
      req.body = { ...req.body, ...req.query };
    }
    try {
      const user_details = await usersService.get_users(req.body);
      return success_response(res, "Users successfully fetched", user_details);
    } catch (error) {
      logger.error(error);
      return bad_request_response(res, error.message, null);
    }
  }
}
