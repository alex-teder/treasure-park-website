import { FastifyInstance } from "fastify";
import { changePermissionsHandler, deleteUserHandler, getUserHandler } from "./users.handler";
import toJson from "zod-to-json-schema";
import { permissionsBodySchema, usersParamsSchema } from "./users.schema";

export async function userRoutes(server: FastifyInstance) {
  server.get(
    "/:userId",
    {
      schema: { params: toJson(usersParamsSchema) },
    },
    getUserHandler
  );
  server.patch(
    "/:userId",
    {
      config: { protected: true, adminOnly: true },
      schema: { params: toJson(usersParamsSchema), body: toJson(permissionsBodySchema) },
    },
    changePermissionsHandler
  );
  server.delete(
    "/:userId",
    {
      config: { protected: true, adminOnly: true },
      schema: { params: toJson(usersParamsSchema) },
    },
    deleteUserHandler
  );
}
