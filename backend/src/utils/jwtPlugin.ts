import { FastifyReply, FastifyRequest } from "fastify";
import fastifyJwt from "@fastify/jwt";
import fastifyPlugin from "fastify-plugin";
import { AuthenticatedUser } from "../types";
import { env } from "../config/env";

export const jwtPlugin = fastifyPlugin(async function (fastify) {
  fastify.register(fastifyJwt, {
    secret: env.JWT_SECRET,
    cookie: {
      cookieName: "token",
      signed: false,
    },
    formatUser(payload) {
      return {
        id: payload.id,
        email: payload.email,
        isAdmin: payload.isAdmin,
      } as AuthenticatedUser;
    },
  });

  fastify.decorate(
    "authenticate",
    async function (request: FastifyRequest, reply: FastifyReply): Promise<void> {
      try {
        await request.jwtVerify();
      } catch (err) {
        reply.send(err);
      }
    }
  );
});
