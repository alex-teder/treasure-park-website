import path from "node:path";
import Fastify from "fastify";
import cors from "@fastify/cors";
import fastifyStatic from "@fastify/static";
import fastifyCookie from "@fastify/cookie";
import { env } from "./config/env";
import { authRoutes } from "./modules/auth/auth.route";
import { myJwtPlugin } from "./utils/myJwtPlugin";
import { myErrorHandler } from "./utils/errors";
import { userRoutes } from "./modules/users/users.route";
import { collectionsRoutes } from "./modules/collections/collections.route";
import { itemsRoutes } from "./modules/items/items.route";
import { categoriesRoutes } from "./modules/categories/categories.route";
import { tagsRoutes } from "./modules/tags/tags.route";
import { commentsRoutes } from "./modules/comments/comments.route";
import { feedRoutes } from "./modules/feed/feed.route";
import { likesRoutes } from "./modules/likes/likes.route";
import { searchRoutes } from "./modules/search/search.route";

export async function buildServer() {
  const server = Fastify({
    connectionTimeout: 3000,
    ajv: {
      customOptions: {
        allowUnionTypes: true,
      },
    },
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
  server.setErrorHandler(myErrorHandler(server));
  server.get("/api/ping", async () => {
    return "pong\n";
  });
  server.register(fastifyCookie, {});
  await server.register(myJwtPlugin);
  server.register(authRoutes, { prefix: "/api/auth" });
  server.register(userRoutes, { prefix: "/api/users" });
  server.register(collectionsRoutes, { prefix: "/api/collections" });
  server.register(itemsRoutes, { prefix: "/api/items" });
  server.register(categoriesRoutes, { prefix: "/api/categories" });
  server.register(tagsRoutes, { prefix: "/api/tags" });
  server.register(commentsRoutes, { prefix: "/api/comments" });
  server.register(likesRoutes, { prefix: "/api/likes" });
  server.register(feedRoutes, { prefix: "/api/feed" });
  server.register(searchRoutes, { prefix: "/api/search" });
  return server;
}
