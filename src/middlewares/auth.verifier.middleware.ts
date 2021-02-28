import { app_config } from "../config";
import * as jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import {
  userRepository,
  userAuthsRepository,
  loginHashesRepository,
} from "../models/repository";
import { unauthorized_error_response } from "../utils/response_manager";

// import logger
import logger from "../utils/logger";

export const auth_verifier = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const auth_token = req.headers.authorization;

  try {
    if (!auth_token) {
      throw new Error("Unauthorized error.");
    }
    const decoded_auth_token: any = jwt.verify(
      auth_token,
      app_config.jwt_secret_key
    );

    const login_hash: any = await loginHashesRepository.findOne({
      raw: true,
      where: {
        user_id: decoded_auth_token.id,
      },
      attributes: ["id", "hash", "mismatch_message"],
    });

    if (
      decoded_auth_token &&
      login_hash &&
      decoded_auth_token.vh === login_hash.hash
    ) {
      req.body.user_id = decoded_auth_token.id;
      req.body.email = decoded_auth_token.email;
    } else {
      throw new Error(login_hash.mismatch_message || "Invalid token.");
    }

    const user: any = await userRepository.findOne({
      raw: true,
      where: {
        id: decoded_auth_token.id,
      },
      attributes: ["status", "is_admin"],
    });

    if (!user) throw new Error("No user record found.");

    if (user.status && user.status === "inactive")
      throw new Error("Account is inactive.");
    // add the admin to the request body
    req.body.is_admin = user.is_admin;
    next();
    return;
  } catch (error) {
    logger.error(error);
    if (error.name && error.name === "TokenExpiredError") {
      return unauthorized_error_response(res, "Unauthorized error.", null);
    } else {
      return unauthorized_error_response(res, error.message, null);
    }
  }
};
