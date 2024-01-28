import { FastifyReply, FastifyRequest } from "fastify";
import type { LogInBody, SignUpBody } from "./auth.schema";
import { logIn, relogIn, signUp } from "./auth.service";
import { CookieSerializeOptions } from "@fastify/cookie";

const COOKIE_MAX_AGE = 60 * 60 * 24 * 7;

const myCookieOptions: CookieSerializeOptions = {
  secure: true,
  httpOnly: true,
  sameSite: "none",
  maxAge: COOKIE_MAX_AGE,
  path: "/",
};

export async function signUpHandler(
  request: FastifyRequest<{ Body: SignUpBody }>,
  reply: FastifyReply
) {
  const { user, accessToken } = await signUp(request.body);
  reply.setCookie("token", accessToken, myCookieOptions);
  return reply.status(201).send(user);
}

export async function logInHandler(
  request: FastifyRequest<{ Body: LogInBody }>,
  reply: FastifyReply
) {
  const { user, accessToken } = await logIn(request.body);
  reply.setCookie("token", accessToken, myCookieOptions);
  return reply.send(user);
}

export async function whoAmIHandler(request: FastifyRequest, reply: FastifyReply) {
  const { user, accessToken } = await relogIn({ id: request.user.id });
  reply.setCookie("token", accessToken, myCookieOptions);
  return reply.send(user);
}

export async function logOutHandler(request: FastifyRequest, reply: FastifyReply) {
  reply.setCookie("token", "", { path: "/", expires: new Date(0) });
  return reply.send("ok");
}
