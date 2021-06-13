import * as Joi from "joi";
import { validateAsyncSpec, unprocessible_entity_response } from "@utils/index";
import { Request, Response, NextFunction } from "express";
// import logger
import logger from "../utils/logger";

// user payload joi validator middleware

export const userPayloadValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<object> => {
  const signupSpec = Joi.object({
    fullname: Joi.string().required(),
    email: Joi.string().required().email({ minDomainSegments: 2 }).trim(),
    password: Joi.string().required().trim(),
    business_name: Joi.string().required().trim(),
    business_mobile: Joi.string()
      .required()
      .trim()
      .min(10)
      .max(14)
      .pattern(/^[0-9+]+$/),
    website: Joi.string().trim(),
    industry: Joi.string().trim(),
    business_email: Joi.string().email({ minDomainSegments: 2 }).trim(),
    country: Joi.string().required().trim().uppercase().length(2),
    description: Joi.string().trim(),
    req_ip: Joi.string().trim().ip(),
  });

  try {
    const validatedData = await validateAsyncSpec(signupSpec, data, {
      abortEarly: false,
    });
    req.body = validatedData;
    next();
  } catch (error) {
    return unprocessible_entity_response(res, error.message, null);
  }
};
