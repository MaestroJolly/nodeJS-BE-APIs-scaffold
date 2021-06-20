import * as bcrypt from "bcrypt";
import { app_config } from "@config/index";
const salt = app_config.bcrypt_salt_rounds;

// encryption function with bcrypt lib
export const encrypt = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, salt);
};

// compare function with bcrypt lib
export const compare = async (
  password: string,
  hashed_password: string
): Promise<boolean> => {
  return await bcrypt.compare(password, hashed_password);
};
