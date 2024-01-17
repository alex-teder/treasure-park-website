import { FastifyReply, FastifyRequest } from "fastify";
import { logInSchema, signUpSchema } from "./auth.schema";
import { logIn, relogIn, signUp } from "./auth.service";
import { CookieSerializeOptions } from "@fastify/cookie";
import { AuthenticatedUser } from "../../types";

const myCookieOptions: CookieSerializeOptions = {
  secure: true,
  httpOnly: true,
  sameSite: "none",
  maxAge: 300,
  path: "/",
};

export async function signUpHandler(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { user, accessToken, error } = await signUp(signUpSchema.parse(request.body));
    if (error) {
      return reply.code(400).send({ error });
    }
    reply.setCookie("token", accessToken!, myCookieOptions);
    return reply.status(201).send(user);
  } catch (err) {
    console.error(err);
    return reply.code(500).send({ error: "Something went wrong" });
  }
}

export async function logInHandler(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { user, accessToken, error } = await logIn(logInSchema.parse(request.body));
    if (error) {
      return reply.code(400).send({ error });
    }
    reply.setCookie("token", accessToken!, myCookieOptions);
    return reply.send(user);
  } catch (err) {
    console.error(err);
    return reply.code(500).send({ error: "Something went wrong" });
  }
}

export async function whoAmIHandler(request: FastifyRequest, reply: FastifyReply) {
  try {
    const userToFind = (await request.jwtDecode()) as AuthenticatedUser;
    const { user, accessToken, error } = await relogIn({ id: userToFind.id });
    if (error) {
      return reply.code(401).send({ error });
    }
    reply.setCookie("token", accessToken!, myCookieOptions);
    return reply.send(user);
  } catch (err) {
    console.error(err);
    return reply.code(401).send({ error: "Unauthorized" });
  }
}

export async function logOutHandler(request: FastifyRequest, reply: FastifyReply) {
  reply.setCookie("token", "", { path: "/", expires: new Date(0) });
  return reply.send("ok");
}
