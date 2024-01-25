import { FastifyInstance } from "fastify";
import toJson from "zod-to-json-schema";
import {
  createCollectionHandler,
  deleteCollectionHandler,
  getCollectionHandler,
  topCollectionsHandler,
  updateCollectionHandler,
} from "./collections.handler";
import {
  updateCollecitonBodySchema,
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
      config: { protected: true },
      schema: {
        body: toJson(createCollectionBodySchema),
      },
    },
    createCollectionHandler
  );
  server.put(
    "/:collectionId",
    {
      config: { protected: true },
      schema: {
        params: toJson(collectionsParamsSchema),
        body: toJson(updateCollecitonBodySchema),
      },
    },
    updateCollectionHandler
  );
  server.delete(
    "/:collectionId",
    {
      config: { protected: true },
      schema: {
        params: toJson(collectionsParamsSchema),
      },
    },
    deleteCollectionHandler
  );
  server.get("/top", topCollectionsHandler);
}
