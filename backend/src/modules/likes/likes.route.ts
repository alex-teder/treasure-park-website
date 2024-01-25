import { FastifyInstance } from "fastify";
import { likeItemHandler, unlikeItemHandler } from "./likes.handler";
import toJson from "zod-to-json-schema";
import { likeQuerySchema } from "./likes.schema";

export async function likesRoutes(server: FastifyInstance) {
  server.post(
    "/",
    { config: { protected: true }, schema: { querystring: toJson(likeQuerySchema) } },
    likeItemHandler
  );
  server.delete(
    "/",
    { config: { protected: true }, schema: { querystring: toJson(likeQuerySchema) } },
    unlikeItemHandler
  );
}
