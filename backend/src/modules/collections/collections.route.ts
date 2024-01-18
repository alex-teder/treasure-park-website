import { FastifyInstance } from "fastify";
import {
  createCollectionHandler,
  deleteCollectionHandler,
  getCollectionHandler,
  updateCollectionHandler,
} from "./collections.handler";
import toJson from "zod-to-json-schema";
import {
  collectionsBodySchema,
  collectionsParamsSchema,
  createCollectionBodySchema,
} from "./collections.schema";

export async function collectionsRoutes(server: FastifyInstance) {
  server.get(
    "/:collectionId",
    {
      schema: {
        params: toJson(collectionsParamsSchema),
      },
    },
    getCollectionHandler
  );
  server.post(
    "/",
    {
      onRequest: [server.authenticate],
      schema: {
        body: toJson(createCollectionBodySchema),
      },
    },
    createCollectionHandler
  );
  server.put(
    "/:collectionId",
    {
      onRequest: [server.authenticate],
      schema: {
        params: toJson(collectionsParamsSchema),
        body: toJson(collectionsBodySchema),
      },
    },
    updateCollectionHandler
  );
  server.delete(
    "/:collectionId",
    {
      onRequest: [server.authenticate],
      schema: {
        params: toJson(collectionsParamsSchema),
      },
    },
    deleteCollectionHandler
  );
}
