import path from "node:path";
import Fastify from "fastify";
import cors from "@fastify/cors";
import fastifyStatic from "@fastify/static";
import fastifyCookie from "@fastify/cookie";
import { env } from "./config/env";
import { authRoutes } from "./modules/auth/auth.route";
import { jwtPlugin } from "./utils/jwtPlugin";

export async function buildServer() {
  const server = Fastify({
    logger: {
      transport: {
        target: "@fastify/one-line-logger",
      },
    },
  });

  if (env.FRONTEND_DEV_PORT) {
    await server.register(cors, {
      origin: `http://127.0.0.1:${env.FRONTEND_DEV_PORT}`,
      credentials: true,
    });
  }

  server.register(fastifyStatic, {
    root: path.join(__dirname, "../../frontend/dist"),
  });

  server.setNotFoundHandler((req, reply) => {
    if (!req.url.includes("/api")) {
      return reply.sendFile("index.html");
    }
    reply.code(404).send({ error: "Not Found" });
  });

  server.get("/api/ping", async () => {
    return "pong\n";
  });

  server.register(fastifyCookie, {});
  await server.register(jwtPlugin);

  server.register(authRoutes, { prefix: "/api/auth" });

  server.get("/api/protected", { onRequest: [server.authenticate] }, async (request, reply) => {
    reply.send("Protected data!");
  });

  return server;
}
