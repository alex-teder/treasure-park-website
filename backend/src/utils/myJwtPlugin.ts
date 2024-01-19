import fastifyJwt from "@fastify/jwt";
import fastifyPlugin from "fastify-plugin";
import { env } from "../config/env";

export const myJwtPlugin = fastifyPlugin(async function (fastify) {
  fastify.register(fastifyJwt, {
    secret: env.JWT_SECRET,
    cookie: {
      cookieName: "token",
      signed: false,
    },
    formatUser({ id, email, isAdmin }) {
      return { id, email, isAdmin };
    },
  });
  fastify.addHook("onRoute", (routeOptions) => {
    if (routeOptions.config && routeOptions.config.protected === true) {
      routeOptions.onRequest = async function authenticate(request, reply) {
        await request.jwtVerify();
      };
    }
  });
});
