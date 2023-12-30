import path from "node:path";
import Fastify from "fastify";
import fastifyEnv from "@fastify/env";
import cors from "@fastify/cors";
import fastifyStatic from "@fastify/static";

declare module "fastify" {
  interface FastifyInstance {
    config: Record<string, any>;
  }
}

export async function buildServer() {
  const server = Fastify({
    logger: {
      transport: {
        target: "@fastify/one-line-logger",
      },
    },
  });

  // .env configuration
  await server.register(fastifyEnv, {
    dotenv: true,
    schema: {
      type: "object",
      properties: {
        FRONTEND_DEV_PORT: {
          type: "number",
        },
      },
    },
  });

  if (server.config.FRONTEND_DEV_PORT) {
    await server.register(cors, {
      origin: `http://localhost:${server.config.FRONTEND_DEV_PORT}`,
    });
  }

  server.register(fastifyStatic, {
    root: path.join(__dirname, "../../frontend/dist"),
  });

  server.get("/api/ping", async () => {
    return "pong\n";
  });

  return server;
}
