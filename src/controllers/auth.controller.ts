import { Request, Response, NextFunction } from "express";
import { AuthService } from "@services/index";
import { logger, success_response, bad_request_response } from "@utils/index";

// auth service
const authService = new AuthService();

export class AuthController {
  // Login controller function
  async login(req: Request, res: Response) {
    try {
      const login = await authService.login(req.body);
      return success_response(res, "User Successfully Logged In", login);
    } catch (error) {
      logger.error(error);
      return bad_request_response(res, error.message, null);
    }
  }

  // Logout controller function
  async logout(req: Request, res: Response) {
    try {
      const logout = await authService.logout(req.body);
      return success_response(res, "User Successfully Logged Out", logout);
    } catch (error) {
      logger.error(error);
      return bad_request_response(res, error.message, null);
    }
  }

  // Send Forgot password email
  async send_forgot_password(req: Request, res: Response) {
    try {
      const forgot_password = await authService.forgot_password(req.body);
      return success_response(
        res,
        "Forgot password message successfully sent",
        forgot_password
      );
    } catch (error) {
      logger.error(error);
      return bad_request_response(res, error.message, null);
    }
  }

  // Change password
  async change_password(req: Request, res: Response) {
    // password token
    req.body.token = req.params.token;
    try {
      const change_password = await authService.change_password(req.body);
      return success_response(
        res,
        "Password successfully changed",
        change_password
      );
    } catch (error) {
      logger.error(error);
      return bad_request_response(res, error.message, null);
    }
  }
}
