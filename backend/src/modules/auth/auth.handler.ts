import { FastifyReply, FastifyRequest } from "fastify";
import { logInSchema, signUpSchema } from "./auth.schema";
import { logIn, signUp } from "./auth.service";
import { issueTokenPair } from "../../utils/issueTokenPair";
import { CookieSerializeOptions } from "@fastify/cookie";

const myCookieOptions: CookieSerializeOptions = {
  secure: true,
  httpOnly: true,
  sameSite: true,
  maxAge: 60,
  path: "/api",
};

export async function signUpHandler(request: FastifyRequest, reply: FastifyReply) {
  try {
    const input = signUpSchema.parse(request.body);
    const { user, error } = await signUp(input);
    if (error) {
      return reply.code(400).send({ error });
    }
    const { id, email } = user!;
    const { accessToken } = issueTokenPair({ id, email, isAdmin: false });
    reply.setCookie("token", accessToken, myCookieOptions);
    return reply.status(201).send(user);
  } catch (err) {
    console.error(err);
    return reply.code(500).send({ error: "Something went wrong" });
  }
}

export async function logInHandler(request: FastifyRequest, reply: FastifyReply) {
  try {
    const input = logInSchema.parse(request.body);
    const { user, error } = await logIn(input);
    if (error) {
      return reply.code(400).send({ error });
    }
    const { id, email, isAdmin } = user!;
    const { accessToken } = issueTokenPair({ id, email, isAdmin });
    reply.setCookie("token", accessToken, myCookieOptions);
    return reply.send(user);
  } catch (err) {
    console.error(err);
    return reply.code(500).send({ error: "Something went wrong" });
  }
}

export async function logOutHandler(request: FastifyRequest, reply: FastifyReply) {
  reply.setCookie("token", "", { path: "/api", expires: new Date(0) });
  return reply.send("ok");
}
