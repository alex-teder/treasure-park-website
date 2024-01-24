import { FastifyInstance } from "fastify";
import toJson from "zod-to-json-schema";
import { commentsBodySchema, commentsParamsSchema } from "./comments.schema";
import { createCommentHandler, deleteCommentHandler } from "./comments.handler";

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
}
