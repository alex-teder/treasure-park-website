import { FastifyInstance } from "fastify";
import { getUserHandler } from "./users.handler";
import toJson from "zod-to-json-schema";
import { usersParamsSchema } from "./users.schema";

export async function userRoutes(server: FastifyInstance) {
  server.get(
    "/:userId",
    {
      schema: { params: toJson(usersParamsSchema) },
    },
    getUserHandler
  );
}
