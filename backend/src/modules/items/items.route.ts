import { FastifyInstance } from "fastify";
import toJson from "zod-to-json-schema";
import {
  createItemHandler,
  deleteItemHandler,
  getItemHandler,
  updateItemHandler,
} from "./items.handler";
import { createItemBodySchema, itemsBodySchema, itemsParamsSchema } from "./items.schema";

export async function itemsRoutes(server: FastifyInstance) {
  server.get(
    "/:itemId",
    {
      schema: {
        params: toJson(itemsParamsSchema),
      },
    },
    getItemHandler
  );

  server.post(
    "/",
    {
      config: { protected: true },
      schema: {
        body: toJson(createItemBodySchema),
      },
    },
    createItemHandler
  );

  server.put(
    "/:itemId",
    {
      config: { protected: true },
      schema: {
        params: toJson(itemsParamsSchema),
        body: toJson(itemsBodySchema),
      },
    },
    updateItemHandler
  );

  server.delete(
    "/:itemId",
    {
      config: { protected: true },
      schema: {
        params: toJson(itemsParamsSchema),
      },
    },
    deleteItemHandler
  );
}
