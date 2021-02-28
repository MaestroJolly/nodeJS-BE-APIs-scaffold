import { v4 as uuidv4 } from "uuid";

export const auth_key_generator = (): string => {
  return `rbk_${uuidv4().replace(/-/g, "")}`;
};

