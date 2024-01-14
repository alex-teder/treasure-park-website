import path from "node:path";
import Fastify from "fastify";
import cors from "@fastify/cors";
import fastifyStatic from "@fastify/static";
import { env } from "./config/env";
import { authRoutes } from "./modules/auth/auth.route";

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
      origin: `http://localhost:${env.FRONTEND_DEV_PORT}`,
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

  server.register(authRoutes, { prefix: "/api/auth" });

  return server;
}
