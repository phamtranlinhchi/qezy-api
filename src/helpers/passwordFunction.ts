import { createHmac } from "crypto";
import vars from "../config/vars";

export const hashPassword = (input: string) => {
  return createHmac("sha256", vars.passwordHashKey).update(input).digest("hex");
};

