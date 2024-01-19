import jwt from "jsonwebtoken";
import { env } from "../config/env";

export function issueToken(data: any) {
  const accessToken = jwt.sign(data, env.JWT_SECRET, {});
  return { accessToken };
}
