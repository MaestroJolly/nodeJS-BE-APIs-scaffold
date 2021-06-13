// import express
import { Response } from "express";

// unauthorize error method
export const unauthorized_error_response = async (
  res: Response,
  message: string,
  data: any
): Promise<object> => {
  return res.status(401).json({
    status: "error",
    message: message,
    data: data,
  });
};

// bad request error method
export const bad_request_response = async (
  res: Response,
  message: string,
  data: any
): Promise<object> => {
  return res.status(400).json({
    status: "error",
    message: message,
    data: data,
  });
};

// success message method
export const success_response = async (
  res: Response,
  message: string,
  data: any
): Promise<object> => {
  return res.status(200).json({
    status: "success",
    message: message,
    data: data,
  });
};

// params validation message method
export const unprocessible_entity_response = async (
  res: Response,
  message: string,
  data: any
): Promise<object> => {
  return res.status(422).json({
    status: "error",
    message: message,
    data: data.array(),
  });
};
