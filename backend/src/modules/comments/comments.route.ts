import { FastifyInstance } from "fastify";
import toJson from "zod-to-json-schema";
import {
  commentsBodySchema,
  commentsCountQuerySchema,
  commentsParamsSchema,
} from "./comments.schema";
import {
  createCommentHandler,
  deleteCommentHandler,
  getCommentsCountHandler,
} from "./comments.handler";

export async function commentsRoutes(server: FastifyInstance) {
  server.post(
    "/",
    { config: { protected: true }, schema: { body: toJson(commentsBodySchema) } },
    createCommentHandler
  );
  server.delete(
    "/:commentId",
    {
      config: { protected: true },
      schema: { params: toJson(commentsParamsSchema) },
    },
    deleteCommentHandler
  );
  server.get(
    "/count",
    { schema: { querystring: toJson(commentsCountQuerySchema) } },
    getCommentsCountHandler
  );
}
