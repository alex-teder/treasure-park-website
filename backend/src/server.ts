import path from "node:path";
import Fastify from "fastify";
import cors from "@fastify/cors";
import fastifyStatic from "@fastify/static";
import fastifyCookie from "@fastify/cookie";
import { env } from "./config/env";
import { authRoutes } from "./modules/auth/auth.route";
import { myJwtPlugin } from "./utils/myJwtPlugin";
import { userRoutes } from "./modules/users/users.route";
import { collectionsRoutes } from "./modules/collections/collections.route";
import { myErrorHandler } from "./utils/errors";

export async function buildServer() {
  const server = Fastify({
    connectionTimeout: 3000,
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
    reply.code(404).send("Not Found");
  });
  server.setErrorHandler(myErrorHandler(server));
  server.get("/api/ping", async () => {
    return "pong\n";
  });
  server.register(fastifyCookie, {});
  await server.register(myJwtPlugin);
  server.register(authRoutes, { prefix: "/api/auth" });
  server.register(userRoutes, { prefix: "/api/users" });
  server.register(collectionsRoutes, { prefix: "/api/collections" });
  return server;
}
