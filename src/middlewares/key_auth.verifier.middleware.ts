import { app_config } from "../config";
import * as jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { userRepository, userBusinessRepository } from "../models/repository";
import { unauthorized_error_response } from "@utils/index";

// import logger
import logger from "../utils/logger";

export const key_auth_verifier = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  let auth_key: any = req.headers.authorization?.trim();
  if (auth_key && auth_key?.includes("Bearer ")) {
    auth_key = auth_key.split(" ");
    auth_key = auth_key[1];
  }

  try {
    if (!auth_key) {
      throw new Error("Unauthorized error.");
    }

    const userbusiness: any = await userBusinessRepository.findOne({
      raw: true,
      where: {
        auth_key: auth_key,
      },
      attributes: ["user_id"],
    });

    if (!userbusiness) {
      throw new Error("Invalid auth key.");
    }

    const user: any = await userRepository.findOne({
      raw: true,
      where: {
        id: userbusiness.user_id,
      },
      attributes: ["id", "status", "email"],
    });

    if (!user) throw new Error("No user record found.");

    if (user.status && user.status === "inactive")
      throw new Error("Account is inactive.");

    req.body.user_id = user.id;
    req.body.email = user.email;

    next();
  } catch (error) {
    logger.error(error);
    return unauthorized_error_response(res, error.message, null);
  }
};
