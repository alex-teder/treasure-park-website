import jwt from "jsonwebtoken";
import { v4 as uuid } from "uuid";
import { env } from "../config/env";
import { AuthenticatedUser } from "../types";

export function issueTokenPair(data: AuthenticatedUser) {
  const accessToken = jwt.sign(data, env.JWT_SECRET, {});
  const refreshToken = uuid();
  return { accessToken, refreshToken };
}
