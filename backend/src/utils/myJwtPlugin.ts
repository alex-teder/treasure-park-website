import fastifyJwt from "@fastify/jwt";
import fastifyPlugin from "fastify-plugin";
import { env } from "../config/env";
import { FastifyReply, FastifyRequest } from "fastify";
import { ErrorWithCode } from "./errors";
import { AuthenticatedUser } from "../types";

export const myJwtPlugin = fastifyPlugin(async function (fastify) {
  fastify.register(fastifyJwt, {
    secret: env.JWT_SECRET,
    cookie: {
      cookieName: "token",
      signed: false,
    },
  });
  fastify.addHook("onRoute", (routeOptions) => {
    if (!routeOptions.config) return;
    if (routeOptions.config.protected === true) {
      if (routeOptions.config.adminOnly === true) {
        routeOptions.onRequest = authenticateAdmin;
      } else {
        routeOptions.onRequest = authenticate;
      }
    }
  });
});

async function authenticate(request: FastifyRequest, reply: FastifyReply) {
  await request.jwtVerify();
}

async function authenticateAdmin(request: FastifyRequest, reply: FastifyReply) {
  await request.jwtVerify();
  const user = (await request.jwtDecode()) as AuthenticatedUser;
  if (user.isAdmin !== true) {
    throw new ErrorWithCode("Administrators only.", 403);
  }
}
